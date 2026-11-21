import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  Circle,
  useMap,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  Compass,
  Crosshair,
  Layers,
  MapPin,
  Maximize2,
  Minimize2,
  Navigation,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Place, LAYERS } from "@/data/places";
import { MapFallback } from "./MapFallback";
import { TourPlayer } from "./TourPlayer";

// Bảng màu tạo kiểu bản đồ sang trọng (Luxury Editorial)
const luxuryMapStyles: google.maps.MapTypeStyle[] = [
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
    stylers: [{ color: "#D5E2D7" }],
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

const CORE_CENTER = { lat: 20.2562, lng: 105.92 }; // Tràng An - Hoa Lư - Tam Cốc
const CORE_ZOOM = 12;

interface MapViewProps {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  activeTourId?: string | null;
  onCloseTour?: () => void;
  debug?: boolean;
}

// Marker Pin Colors mapping
function getMarkerColors(place: Place) {
  switch (place.layer) {
    case "thien-nhien":
      return { bg: "#244B3B", border: "#769477", glyph: "#FAF8F4" };
    case "tam-linh-lich-su":
      return { bg: "#B88E52", border: "#D6AD72", glyph: "#FAF8F4" };
    case "vui-choi":
      return { bg: "#D97706", border: "#F59E0B", glyph: "#FAF8F4" };
    case "am-thuc":
      return { bg: "#DC2626", border: "#F87171", glyph: "#FFFFFF" };
    case "luu-tru":
      return { bg: "#2563EB", border: "#60A5FA", glyph: "#FFFFFF" };
    case "lang-nghe":
      return { bg: "#7C3AED", border: "#A78BFA", glyph: "#FFFFFF" };
    default:
      return { bg: "#244B3B", border: "#D6AD72", glyph: "#FAF8F4" };
  }
}

// Sub-component to access google map instance via useMap hook
function MapController({
  places,
  selectedPlace,
  onSelectPlace,
  activeTourId,
  onCloseTour,
  debug,
}: MapViewProps) {
  const map = useMap();
  const [userPos, setUserPos] = useState<google.maps.LatLngLiteral | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const markersRef = useRef<{ [id: string]: google.maps.marker.AdvancedMarkerElement }>({});
  const clustererRef = useRef<MarkerClusterer | null>(null);

  // Pan to selected place
  useEffect(() => {
    if (!map || !selectedPlace) return;
    map.panTo({ lat: selectedPlace.lat, lng: selectedPlace.lng });
    if ((map.getZoom() ?? 0) < 13) {
      map.setZoom(14);
    }
  }, [map, selectedPlace]);

  // Fit bounds to all places (Expanded view)
  const handleFitAll = useCallback(() => {
    if (!map || places.length === 0) return;
    const bounds = new google.maps.LatLngBounds();
    places.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
    map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });
  }, [map, places]);

  // Reset to Core view (Vùng lõi Cố đô)
  const handleResetCore = useCallback(() => {
    if (!map) return;
    map.panTo(CORE_CENTER);
    map.setZoom(CORE_ZOOM);
  }, [map]);

  // Geolocation "Quanh tôi"
  const handleLocateMe = useCallback(() => {
    if (!map || typeof window === "undefined" || !navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserPos(coords);
        map.panTo(coords);
        map.setZoom(14);
        setIsLocating(false);
      },
      (err) => {
        console.warn("Geolocation permission error:", err.message);
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  }, [map]);

  // Clusterer initialization
  useEffect(() => {
    if (!map) return;
    if (!clustererRef.current) {
      clustererRef.current = new MarkerClusterer({ map });
    }
    return () => {
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
        clustererRef.current = null;
      }
    };
  }, [map]);

  return (
    <>
      {/* Floating Control Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          onClick={handleResetCore}
          className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs font-semibold px-3 py-1.5 h-8 rounded-full shadow-lg shadow-black/20 gap-1.5 cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-[#D6AD72]" />
          <span>Vùng Lõi Cố Đô</span>
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleFitAll}
          className="bg-white/95 hover:bg-white text-[#244B3B] border-[#DFD7C7] text-xs font-semibold px-3 py-1.5 h-8 rounded-full shadow-md gap-1.5 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#D6AD72]" />
          <span>Mở rộng: Ninh Bình mới</span>
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleLocateMe}
          disabled={isLocating}
          className="bg-white/95 hover:bg-white text-[#244B3B] border-[#DFD7C7] text-xs font-semibold px-3 py-1.5 h-8 rounded-full shadow-md gap-1.5 cursor-pointer"
          title="Định vị vị trí hiện tại của bạn"
        >
          <Crosshair className={`w-3.5 h-3.5 text-[#244B3B] ${isLocating ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Quanh Tôi</span>
        </Button>
      </div>

      {/* 10 km Radius Circle when a place is selected */}
      {selectedPlace && (
        <Circle
          center={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          radius={10000}
          strokeColor="#D6AD72"
          strokeOpacity={0.65}
          strokeWeight={1.5}
          fillColor="#244B3B"
          fillOpacity={0.05}
        />
      )}

      {/* User Geolocation Marker */}
      {userPos && (
        <AdvancedMarker position={userPos} title="Vị trí của bạn">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-md" />
          </div>
        </AdvancedMarker>
      )}

      {/* Place Markers */}
      {places.map((place) => {
        const isSelected = selectedPlace?.id === place.id;
        const colors = getMarkerColors(place);

        return (
          <AdvancedMarker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            onClick={() => onSelectPlace(place)}
            title={place.name}
            zIndex={isSelected ? 999 : 1}
          >
            <div className="group relative cursor-pointer transition-transform duration-200 hover:scale-110">
              <Pin
                background={colors.bg}
                borderColor={isSelected ? "#FAF8F4" : colors.border}
                glyphColor={colors.glyph}
                scale={isSelected ? 1.25 : 1.0}
              />

              {/* Debug Name Label */}
              {debug && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded bg-black/85 text-white text-[9px] font-mono whitespace-nowrap shadow-md pointer-events-none">
                  {place.name} ({place.coordStatus})
                </div>
              )}
            </div>
          </AdvancedMarker>
        );
      })}

      {/* Guided Tour Player Component */}
      {activeTourId && (
        <TourPlayer
          map={map}
          tourId={activeTourId}
          onClose={() => onCloseTour?.()}
          onSelectPlace={(id) => {
            const found = places.find((p) => p.id === id);
            if (found) onSelectPlace(found);
          }}
        />
      )}
    </>
  );
}

export function MapView({
  places,
  selectedPlace,
  onSelectPlace,
  activeTourId,
  onCloseTour,
  debug,
}: MapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const mapId = import.meta.env.VITE_GOOGLE_MAP_ID || "NINHBINH_EDITORIAL_MAP";

  // Fallback if API Key is missing or invalid
  if (!apiKey || apiKey.trim() === "") {
    return (
      <MapFallback
        reason="missing-key"
        onSelectPlace={onSelectPlace}
      />
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-[#F5F1E8]">
      <APIProvider apiKey={apiKey} language="vi" region="VN">
        <Map
          mapId={mapId}
          defaultCenter={CORE_CENTER}
          defaultZoom={CORE_ZOOM}
          gestureHandling="greedy"
          styles={luxuryMapStyles}
          restriction={{
            latLngBounds: {
              north: 20.9,
              south: 19.8,
              east: 106.7,
              west: 105.4,
            },
            strictBounds: false,
          }}
          className="w-full h-full"
        >
          <MapController
            places={places}
            selectedPlace={selectedPlace}
            onSelectPlace={onSelectPlace}
            activeTourId={activeTourId}
            onCloseTour={onCloseTour}
            debug={debug}
          />
        </Map>
      </APIProvider>
    </div>
  );
}
