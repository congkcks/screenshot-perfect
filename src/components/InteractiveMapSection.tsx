import { useEffect, useRef, useState, useMemo } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import {
  ExternalLink,
  Layers,
  MapPin,
  Navigation,
  Sparkles,
  Star,
  Info,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations, type Destination, type DestinationCategory } from "@/data/ninh-binh";

interface CustomWindow {
  google?: typeof google;
  gm_authFailure?: () => void;
}

// Google Maps luxury styling matching #244B3B, #F5F1E8, and #D6AD72
const googleMapLuxuryStyles: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#244B3B" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#FAF8F4" }, { weight: 3 }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#F5F1E8" }],
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry",
    stylers: [{ color: "#EBE5D8" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#E2DDD0" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#D3E2D5" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#FFFFFF" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#DFD7C7" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#EADBCA" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#D6AD72" }, { lightness: 20 }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#A8CEBE" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#173428" }],
  },
];

export function InteractiveMapSection({
  onSelectDestination,
}: {
  onSelectDestination: (dest: Destination) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");
  const [activeLocationId, setActiveLocationId] = useState<string>("trang-an");
  const [mapEngine, setMapEngine] = useState<"google" | "osm">("osm");

  // References for Google Maps
  const googleMapInstanceRef = useRef<google.maps.Map | null>(null);
  const googleMarkersRef = useRef<{ [id: string]: google.maps.Marker }>({});
  const googleInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // References for Leaflet Fallback (OpenStreetMap standard tiles, NO CARTO)
  const leafletMapRef = useRef<LeafletMap | null>(null);
  const leafletMarkersRef = useRef<{ [id: string]: LeafletMarker }>({});

  const apiKey = (import.meta.env["VITE_GOOGLE_MAPS_API_KEY"] as string | undefined)?.trim();

  // Filtered destinations by active category
  const filteredList = useMemo(() => {
    return destinations.filter((d) => activeCategory === "Tất cả" || d.category === activeCategory);
  }, [activeCategory]);

  const currentActiveDest = destinations.find((d) => d.id === activeLocationId) || destinations[0]!;

  // -------------------------------------------------------------
  // 1. Initialize Map: Either Google Maps or Clean OpenStreetMap
  // -------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    // Check if a real Google Maps API key is configured
    const hasValidKey = !!apiKey && apiKey.length > 10 && !apiKey.includes("YOUR_");

    if (hasValidKey) {
      // Try to load Google Maps JS API dynamically
      loadGoogleMapsScript(apiKey)
        .then(() => {
          if (!isMounted || !mapContainerRef.current) return;
          initGoogleMap();
          setMapEngine("google");
        })
        .catch((err) => {
          console.warn("Google Maps failed to load, falling back to OpenStreetMap:", err);
          if (isMounted) {
            initLeafletOSMMap();
            setMapEngine("osm");
          }
        });
    } else {
      // Fallback directly to clean OpenStreetMap (no broken Carto watermark)
      initLeafletOSMMap();
      setMapEngine("osm");
    }

    return () => {
      isMounted = false;
      // Clean up Leaflet
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      leafletMarkersRef.current = {};
      // Clean up Google Maps markers
      Object.values(googleMarkersRef.current).forEach((m) => m.setMap(null));
      googleMarkersRef.current = {};
    };
  }, []);

  // -------------------------------------------------------------
  // Dynamic Google Maps Script Loader
  // -------------------------------------------------------------
  function loadGoogleMapsScript(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const win = typeof window !== "undefined" ? (window as CustomWindow) : undefined;
      if (win?.google?.maps) {
        resolve();
        return;
      }

      const existingScript = document.getElementById("google-maps-script");
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", (e) => reject(e));
        return;
      }

      // Handle auth failure callback
      if (win) {
        win.gm_authFailure = () => {
          console.warn("Google Maps authentication failure. Falling back to OSM.");
          initLeafletOSMMap();
          setMapEngine("osm");
        };
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        key,
      )}&libraries=places,geometry&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  // -------------------------------------------------------------
  // Initialize Google Maps instance
  // -------------------------------------------------------------
  function initGoogleMap() {
    const win = typeof window !== "undefined" ? (window as CustomWindow) : undefined;
    if (!mapContainerRef.current || !win?.google?.maps) return;

    // Ninh Binh center: Tràng An – Hoa Lư
    const center = { lat: 20.2562, lng: 105.9038 };

    const map = new google.maps.Map(mapContainerRef.current, {
      center,
      zoom: 11.5,
      mapTypeId: "roadmap",
      styles: googleMapLuxuryStyles,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });

    googleMapInstanceRef.current = map;
    const infoWindow = new google.maps.InfoWindow();
    googleInfoWindowRef.current = infoWindow;

    // SVG Marker Icons
    const createMarkerIcon = (isSelected: boolean) => {
      const pinColor = isSelected ? "#D6AD72" : "#244B3B";
      const strokeColor = isSelected ? "#173428" : "#D6AD72";
      const centerColor = isSelected ? "#173428" : "#D6AD72";
      const dotColor = isSelected ? "#FFFFFF" : "#FAF8F4";
      const w = isSelected ? 38 : 32;
      const h = isSelected ? 48 : 40;

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 34 42">
          <defs>
            <filter id="sh" x="-20%" y="-10%" width="140%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.35"/>
            </filter>
          </defs>
          <path d="M17 0C7.61 0 0 7.61 0 17c0 12.5 17 25 17 25s17-12.5 17-25c0-9.39-7.61-17-17-17z" fill="${pinColor}" stroke="${strokeColor}" stroke-width="2" filter="url(#sh)"/>
          <circle cx="17" cy="17" r="6" fill="${centerColor}"/>
          <circle cx="17" cy="17" r="3" fill="${dotColor}"/>
        </svg>
      `;

      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(w, h),
        anchor: new google.maps.Point(w / 2, h),
      };
    };

    // Add markers for all 20 destinations
    destinations.forEach((dest) => {
      const marker = new google.maps.Marker({
        position: { lat: dest.lat, lng: dest.lng },
        map,
        title: dest.name,
        icon: createMarkerIcon(dest.id === activeLocationId),
        animation: google.maps.Animation.DROP,
      });

      marker.addListener("click", () => {
        handleSelectLocation(dest);
        openGoogleInfoWindow(dest, marker);
      });

      googleMarkersRef.current[dest.id] = marker;
    });

    // Auto open Tràng An InfoWindow on load
    const defaultMarker = googleMarkersRef.current["trang-an"];
    if (defaultMarker) {
      setTimeout(() => {
        openGoogleInfoWindow(destinations[0]!, defaultMarker);
      }, 500);
    }
  }

  // Open custom InfoWindow on Google Maps
  function openGoogleInfoWindow(dest: Destination, marker: google.maps.Marker) {
    if (!googleInfoWindowRef.current || !googleMapInstanceRef.current) return;

    const infoContent = document.createElement("div");
    infoContent.style.minWidth = "220px";
    infoContent.style.maxWidth = "260px";
    infoContent.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    infoContent.style.padding = "4px";

    infoContent.innerHTML = `
      <div style="position: relative; overflow: hidden; border-radius: 8px; margin-bottom: 8px; height: 110px; background: #e5decb;">
        <img src="${dest.image}" alt="${dest.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${dest.fallbackImage}'" />
        <span style="position: absolute; top: 6px; left: 6px; background: rgba(36, 75, 59, 0.9); color: #D6AD72; font-size: 9px; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: 4px;">
          ${dest.category}
        </span>
      </div>
      <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14px; font-weight: 700; color: #173428; margin: 0 0 4px; line-height: 1.3;">
        ${dest.name}
      </h4>
      <div style="font-size: 11px; color: #5A6D63; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
        <span>📍 ${dest.area}</span>
        <span style="color: #b45309; font-weight: 700;">★ ${dest.rating}</span>
      </div>
      <div style="display: flex; gap: 6px;">
        <button id="view-modal-btn-${dest.id}" style="flex: 1; background: #244B3B; color: #FFFFFF; font-size: 11px; font-weight: 600; padding: 7px 10px; border-radius: 6px; border: none; cursor: pointer; text-align: center; transition: opacity 0.2s;">
          Xem Chi Tiết
        </button>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.mapQuery)}" target="_blank" rel="noopener noreferrer" style="background: #F5F1E8; color: #244B3B; font-size: 11px; font-weight: 600; padding: 7px 10px; border-radius: 6px; border: 1px solid #DFD7C7; text-decoration: none; text-align: center;">
          Chỉ Đường ↗
        </a>
      </div>
    `;

    // Attach click handler for "Xem chi tiết" button inside InfoWindow
    const viewBtn = infoContent.querySelector(`#view-modal-btn-${dest.id}`);
    if (viewBtn) {
      viewBtn.addEventListener("click", () => {
        onSelectDestination(dest);
      });
    }

    googleInfoWindowRef.current.setContent(infoContent);
    googleInfoWindowRef.current.open(googleMapInstanceRef.current, marker);
  }

  // -------------------------------------------------------------
  // 2. Leaflet Fallback with Pure OpenStreetMap (NO CARTO / NO API KEY)
  // -------------------------------------------------------------
  async function initLeafletOSMMap() {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    try {
      const L = (await import("leaflet")).default;

      if (!leafletMapRef.current && mapContainerRef.current) {
        // Clear any orphaned leaflet id to prevent "Map container is already initialized"
        const el = mapContainerRef.current as HTMLElement & { _leaflet_id?: number };
        if (el._leaflet_id) {
          delete el._leaflet_id;
        }

        // Centered at Ninh Binh: Tràng An – Hoa Lư
        const map = L.map(mapContainerRef.current, {
          center: [20.2562, 105.9038],
          zoom: 12,
          scrollWheelZoom: false,
        });

        // 100% Free OpenStreetMap Standard Tile Layer (Zero watermarks, Zero API key required)
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        leafletMapRef.current = map;

        // Automatically recalculate map dimensions if container resizes
        if (typeof ResizeObserver !== "undefined" && mapContainerRef.current) {
          const ro = new ResizeObserver(() => {
            if (leafletMapRef.current) {
              leafletMapRef.current.invalidateSize();
            }
          });
          ro.observe(mapContainerRef.current);
        }

        // Custom Leaflet DivIcon
        destinations.forEach((dest) => {
          const customIcon = L.divIcon({
            className: "custom-leaflet-marker",
            html: `
              <div class="marker-pulse"></div>
              <div class="marker-pin"></div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -30],
          });

          const popupContent = `
            <div style="min-width: 220px; max-width: 260px; padding: 2px; font-family: 'Plus Jakarta Sans', sans-serif;">
              <div style="position: relative; border-radius: 8px; overflow: hidden; margin-bottom: 8px; height: 110px; background: #e5decb;">
                <img src="${dest.image}" alt="${dest.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${dest.fallbackImage}'" />
                <span style="position: absolute; top: 6px; left: 6px; background: rgba(36, 75, 59, 0.9); color: #D6AD72; font-size: 9px; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: 4px;">
                  ${dest.category}
                </span>
              </div>
              <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14px; font-weight: 700; color: #FAF8F4; margin: 0 0 4px; line-height: 1.3;">
                ${dest.name}
              </h4>
              <div style="font-size: 11px; color: #FAF8F4; opacity: 0.9; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                <span>📍 ${dest.area}</span>
                <span style="color: #D6AD72; font-weight: 700;">★ ${dest.rating}</span>
              </div>
              <div style="display: flex; gap: 6px;">
                <button id="leaflet-modal-btn-${dest.id}" style="flex: 1; background: #D6AD72; color: #173428; font-size: 11px; font-weight: 700; padding: 7px 10px; border-radius: 6px; border: none; cursor: pointer; text-align: center; transition: opacity 0.2s;">
                  Xem Chi Tiết
                </button>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  dest.mapQuery,
                )}" target="_blank" rel="noopener noreferrer" style="background: rgba(245, 241, 232, 0.15); color: #FAF8F4; font-size: 11px; font-weight: 600; padding: 7px 10px; border-radius: 6px; border: 1px solid rgba(223, 215, 199, 0.4); text-decoration: none; text-align: center;">
                  Chỉ Đường ↗
                </a>
              </div>
            </div>
          `;

          const marker = L.marker([dest.lat, dest.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(popupContent);

          marker.on("click", () => {
            handleSelectLocation(dest);
          });

          marker.on("popupopen", () => {
            const btn = document.getElementById(`leaflet-modal-btn-${dest.id}`);
            if (btn) {
              btn.onclick = () => {
                onSelectDestination(dest);
              };
            }
          });

          leafletMarkersRef.current[dest.id] = marker;
        });
      }
    } catch (err) {
      console.error("Leaflet OSM load error:", err);
    }
  }

  // -------------------------------------------------------------
  // Filter Markers when Category Changes
  // -------------------------------------------------------------
  useEffect(() => {
    // If Google Maps is active
    const win = typeof window !== "undefined" ? (window as CustomWindow) : undefined;
    if (googleMapInstanceRef.current && win?.google?.maps) {
      const bounds = new google.maps.LatLngBounds();
      let hasVisible = false;

      destinations.forEach((dest) => {
        const marker = googleMarkersRef.current[dest.id];
        const isMatch = activeCategory === "Tất cả" || dest.category === activeCategory;
        if (marker) {
          if (isMatch) {
            marker.setMap(googleMapInstanceRef.current);
            bounds.extend(marker.getPosition()!);
            hasVisible = true;
          } else {
            marker.setMap(null);
          }
        }
      });

      if (hasVisible && activeCategory !== "Tất cả") {
        googleMapInstanceRef.current.fitBounds(bounds, {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        });
      }
    }

    // If Leaflet OSM is active
    if (leafletMapRef.current) {
      destinations.forEach((dest) => {
        const marker = leafletMarkersRef.current[dest.id];
        const isMatch = activeCategory === "Tất cả" || dest.category === activeCategory;
        if (marker) {
          if (isMatch) {
            if (!leafletMapRef.current.hasLayer(marker)) {
              leafletMapRef.current.addLayer(marker);
            }
          } else {
            if (leafletMapRef.current.hasLayer(marker)) {
              leafletMapRef.current.removeLayer(marker);
            }
          }
        }
      });
    }
  }, [activeCategory]);

  // -------------------------------------------------------------
  // Two-way interaction: Fly / Pan to destination
  // -------------------------------------------------------------
  const handleSelectLocation = (dest: Destination) => {
    setActiveLocationId(dest.id);

    // Scroll left list item into view smoothly
    const listItemEl = document.getElementById(`map-list-item-${dest.id}`);
    if (listItemEl && typeof listItemEl.scrollIntoView === "function") {
      listItemEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // 1. Pan Google Map
    const win = typeof window !== "undefined" ? (window as CustomWindow) : undefined;
    if (googleMapInstanceRef.current && win?.google?.maps) {
      googleMapInstanceRef.current.panTo({ lat: dest.lat, lng: dest.lng });
      googleMapInstanceRef.current.setZoom(14);

      const marker = googleMarkersRef.current[dest.id];
      if (marker) {
        openGoogleInfoWindow(dest, marker);
      }
    }

    // 2. Fly Leaflet OSM map
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([dest.lat, dest.lng], 14, {
        duration: 1.2,
      });

      const marker = leafletMarkersRef.current[dest.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <section
      id="ban-do"
      className="py-24 bg-[#FAF8F4] border-t border-[#DFD7C7]"
      aria-labelledby="map-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-3">
              <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
              <span>BẢN ĐỒ DU LỊCH ĐỒNG BỘ 20 ĐIỂM ĐẾN</span>
            </div>
            <h2
              id="map-title"
              className="text-4xl sm:text-5xl font-editorial-heading text-[#1A3429]"
            >
              Ninh Bình,{" "}
              <span className="italic font-serif text-[#244B3B] font-normal">Trong Tầm Tay.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6D63] max-w-2xl font-light">
              Tương tác trực quan trên bản đồ địa lý thực tế Ninh Bình với 20 danh thắng tiêu biểu.
              Chọn điểm đến để định vị tọa độ, xem đánh giá và mở lộ trình Google Maps tối ưu.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-[#244B3B] text-[#244B3B] hover:bg-[#F5F1E8] text-xs gap-1.5"
            >
              <a
                href="https://www.google.com/maps/search/?api=1&query=du+l%E1%BB%8Bch+Ninh+B%C3%ACnh"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mở Google Maps App
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Category Filter Pills for Map */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {["Tất cả", "Thiên nhiên", "Check-in", "Văn hóa", "Tâm linh", "Sinh thái"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#244B3B] text-white shadow-sm font-semibold"
                  : "bg-white text-[#1A3429] hover:bg-[#EAE3D5] border border-[#DFD7C7]"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-[#769477] ml-auto font-medium hidden sm:inline">
            Hiển thị {filteredList.length} / {destinations.length} danh thắng
          </span>
        </div>

        {/* Map Layout Grid: Sidebar List (4 cols) + Google Maps / OSM Container (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl p-4 sm:p-6 border border-[#DFD7C7] shadow-xl shadow-black/5">
          {/* Left Interactive Location Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col h-[540px]">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#DFD7C7]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#769477] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#244B3B]" /> Danh Sách Điểm Đến (
                {filteredList.length})
              </span>
              <span className="text-[10px] text-[#5A6D63]">Chạm để định vị</span>
            </div>

            {/* Scrollable Location List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1.5">
              {filteredList.map((dest) => {
                const isSelected = dest.id === activeLocationId;
                return (
                  <button
                    key={dest.id}
                    id={`map-list-item-${dest.id}`}
                    onClick={() => handleSelectLocation(dest)}
                    className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-3 ${
                      isSelected
                        ? "bg-[#244B3B] text-white border-[#244B3B] shadow-md ring-2 ring-[#D6AD72]/50"
                        : "bg-[#FAF8F4] hover:bg-[#EAE3D5] text-[#1A3429] border-[#DFD7C7]"
                    }`}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = dest.fallbackImage;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider ${
                            isSelected ? "text-[#D6AD72]" : "text-[#769477]"
                          }`}
                        >
                          {dest.category}
                        </span>
                        <span
                          className={`text-[10px] font-semibold ${
                            isSelected ? "text-amber-300" : "text-amber-600"
                          }`}
                        >
                          ★ {dest.rating}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold truncate leading-snug">{dest.name}</h4>
                      <p
                        className={`text-[11px] truncate ${
                          isSelected ? "text-white/80" : "text-[#5A6D63]"
                        }`}
                      >
                        {dest.area}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Destination Quick Card */}
            <div className="pt-3 mt-3 border-t border-[#DFD7C7] flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#769477]">Đang chọn</p>
                <p className="text-xs font-bold text-[#244B3B] truncate max-w-[190px]">
                  {currentActiveDest.name}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => onSelectDestination(currentActiveDest)}
                className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs px-3.5 py-1.5 h-auto shadow-sm"
              >
                Chi Tiết
              </Button>
            </div>
          </div>

          {/* Right Map Canvas (8 cols) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#DFD7C7] min-h-[420px] lg:h-[540px] isolate z-0">
            {/* Map Canvas Element */}
            <div
              ref={mapContainerRef}
              className="w-full h-full bg-[#F5F1E8] relative isolate z-0"
            />

            {/* Map Indicator Badge (Top Left Overlay) */}
            <div className="absolute top-3 left-3 z-[10] bg-white/95 backdrop-blur-md py-1.5 px-3 rounded-full border border-[#DFD7C7] shadow-sm flex items-center gap-2 text-[11px] text-[#1A3429]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-[#244B3B]">Bản Đồ Du Lịch Ninh Bình</span>
            </div>

            {/* Map Legend (Bottom Right Overlay) */}
            <div className="absolute bottom-3 right-3 z-[10] bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-xl border border-[#DFD7C7] shadow-md flex items-center gap-3 text-[11px] text-[#1A3429]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#244B3B] border border-[#D6AD72]" />
                <span className="font-medium text-[#1A3429]">Danh thắng (20 điểm)</span>
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[#769477] text-[10px]">Chạm marker để mở thông tin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
