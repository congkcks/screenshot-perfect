import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Layers,
  MapPin,
  Navigation,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations, type Destination, type DestinationCategory } from "@/data/ninh-binh";

export function InteractiveMapSection({
  onSelectDestination,
}: {
  onSelectDestination: (dest: Destination) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [id: string]: any }>({});
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");
  const [activeLocationId, setActiveLocationId] = useState<string>("trang-an");
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize Leaflet Map on Client-side
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      try {
        const L = (await import("leaflet")).default;

        if (!mapInstanceRef.current && mapContainerRef.current) {
          // Centered at Ninh Binh
          const map = L.map(mapContainerRef.current, {
            center: [20.2562, 105.9038],
            zoom: 12,
            scrollWheelZoom: false,
          });

          // Elegant warm CartoDB Voyager tile layer
          L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: "abcd",
              maxZoom: 19,
            }
          ).addTo(map);

          mapInstanceRef.current = map;

          // Create custom Leaflet DivIcon
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
              <div style="min-width: 200px; padding: 2px;">
                <p style="color: #D6AD72; font-size: 9px; font-weight: 700; text-transform: uppercase; margin: 0 0 2px;">
                  ${dest.category}
                </p>
                <h4 style="color: #FFFFFF; font-size: 14px; font-family: 'Playfair Display', serif; margin: 0 0 4px; font-weight: 600;">
                  ${dest.name}
                </h4>
                <p style="color: #FAF8F4; opacity: 0.8; font-size: 11px; margin: 0 0 8px; line-height: 1.3;">
                  ${dest.area}
                </p>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  dest.mapQuery
                )}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; color: #D6AD72; font-size: 11px; font-weight: 600; text-decoration: none;">
                  Chỉ đường Google Maps &rarr;
                </a>
              </div>
            `;

            const marker = L.marker([dest.lat, dest.lng], { icon: customIcon })
              .addTo(map)
              .bindPopup(popupContent);

            marker.on("click", () => {
              setActiveLocationId(dest.id);
            });

            markersRef.current[dest.id] = marker;
          });

          if (isMounted) setIsMapLoaded(true);
        }
      } catch (err) {
        console.error("Leaflet load error:", err);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Filter markers when category changes
  const filteredList = destinations.filter(
    (d) => activeCategory === "Tất cả" || d.category === activeCategory
  );

  const flyToDestination = (dest: Destination) => {
    setActiveLocationId(dest.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([dest.lat, dest.lng], 14, {
        duration: 1.2,
      });

      const marker = markersRef.current[dest.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const currentActiveDest =
    destinations.find((d) => d.id === activeLocationId) || destinations[0]!;

  return (
    <section
      id="ban-do"
      className="py-24 bg-[#FAF8F4] border-t border-[#DFD7C7]"
      aria-labelledby="map-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-3">
              <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
              <span>BẢN ĐỒ DU LỊCH ĐỒNG BỘ</span>
            </div>
            <h2
              id="map-title"
              className="text-4xl sm:text-5xl font-editorial-heading text-[#1A3429]"
            >
              Ninh Bình,{" "}
              <span className="italic font-serif text-[#244B3B] font-normal">
                Trong Tầm Tay.
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6D63] max-w-xl font-light">
              Tương tác trực quan trên bản đồ danh thắng. Chọn một địa điểm để định vị chính xác và mở lộ trình di chuyển tối ưu nhất.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-[#244B3B] text-[#244B3B] hover:bg-[#F5F1E8] text-xs gap-1.5 self-start md:self-auto"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=du+l%E1%BB%8Bch+Ninh+B%C3%ACnh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mở Trên Ứng Dụng Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>

        {/* Category Filter Pills for Map */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {["Tất cả", "Thiên nhiên", "Check-in", "Văn hóa", "Tâm linh", "Sinh thái"].map(
            (cat) => (
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
            )
          )}
        </div>

        {/* Map Layout Grid: Sidebar List (4 cols) + Leaflet Container (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl p-4 sm:p-6 border border-[#DFD7C7] shadow-xl shadow-black/5">
          {/* Left Interactive Location Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#DFD7C7]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#769477] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#244B3B]" /> Danh Sách Điểm Đến ({filteredList.length})
              </span>
              <span className="text-[10px] text-[#5A6D63]">Chạm để định vị</span>
            </div>

            {/* Scrollable Location List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredList.map((dest) => {
                const isSelected = dest.id === activeLocationId;
                return (
                  <button
                    key={dest.id}
                    onClick={() => flyToDestination(dest)}
                    className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-3 ${
                      isSelected
                        ? "bg-[#244B3B] text-white border-[#244B3B] shadow-md"
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
                      <h4 className="text-xs font-semibold truncate leading-snug">
                        {dest.name}
                      </h4>
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
                <p className="text-[10px] uppercase font-bold text-[#769477]">
                  Đang chọn
                </p>
                <p className="text-xs font-bold text-[#244B3B] truncate max-w-[190px]">
                  {currentActiveDest.name}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => onSelectDestination(currentActiveDest)}
                className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs px-3 py-1.5 h-auto shadow-sm"
              >
                Chi Tiết
              </Button>
            </div>
          </div>

          {/* Right Leaflet Map Canvas (8 cols) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#DFD7C7] min-h-[400px] lg:h-[520px]">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Map Legend (Bottom Right Overlay) */}
            <div className="absolute bottom-3 right-3 z-[1000] bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-xl border border-[#DFD7C7] shadow-md flex items-center gap-3 text-[11px] text-[#1A3429]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#244B3B] border border-[#D6AD72]" />
                Điểm tham quan
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[#769477] text-[10px]">
                Di chuột hoặc chạm để xem thông tin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
