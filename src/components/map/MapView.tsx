import { useState, useEffect, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Compass,
  Crosshair,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Place, type Layer } from "@/data/places";
import { TOURS } from "@/data/tours";
import { TourPlayer } from "./TourPlayer";

const LAYER_ICONS: Record<Layer, string> = {
  "thien-nhien": "🌿",
  "tam-linh-lich-su": "🛕",
  "vui-choi": "🎡",
  "am-thuc": "🍽️",
  "luu-tru": "🏡",
  "lang-nghe": "🧵",
};

// Tạo divIcon HTML + CSS sang trọng, không phụ thuộc ảnh gốc Leaflet (tránh 404 trên Vite)
function createPinIcon(layer: Layer, active = false, debug = false, name = "") {
  const icon = LAYER_ICONS[layer] || "📍";
  const activeClass = active ? "is-active" : "";
  const debugHtml = debug
    ? `<div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 4px; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.85); color: #FFFFFF; font-size: 9px; font-family: monospace; white-space: nowrap; pointer-events: none; z-index: 1000; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">${name}</div>`
    : "";

  return L.divIcon({
    className: "nb-pin",
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <span class="nb-pin__dot ${activeClass}" data-layer="${layer}">${icon}</span>
        ${debugHtml}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

// User location pulse icon
const userLocationIcon = L.divIcon({
  className: "nb-user-pin",
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;">
      <span style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background: #3b82f6; opacity: 0.5; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
      <span style="position: relative; width: 14px; height: 14px; border-radius: 50%; background: #2563eb; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></span>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface MapViewProps {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  activeTourId?: string | null;
  onCloseTour?: () => void;
  debug?: boolean;
}

const CORE_CENTER: [number, number] = [20.2562, 105.92]; // Tràng An – Hoa Lư – Tam Cốc
const CORE_ZOOM = 12;

// Bộ điều khiển bản đồ Leaflet thông qua hook useMap
function MapController({
  places,
  selectedPlace,
  onSelectPlace,
  activeTourId,
  onCloseTour,
  debug,
}: MapViewProps) {
  const map = useMap();
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Pan to selected place
  useEffect(() => {
    if (!map || !selectedPlace) return;
    map.flyTo([selectedPlace.lat, selectedPlace.lng], Math.max(map.getZoom(), 13), {
      duration: 1.2,
    });
  }, [map, selectedPlace]);

  // Fit bounds to all places
  const handleFitAll = useCallback(() => {
    if (!map || places.length === 0) return;
    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, places]);

  // Reset to Core view
  const handleResetCore = useCallback(() => {
    if (!map) return;
    map.flyTo(CORE_CENTER, CORE_ZOOM, { duration: 1.2 });
  }, [map]);

  // Geolocation "Quanh tôi"
  const handleLocateMe = useCallback(() => {
    if (!map || typeof window === "undefined" || !navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(coords);
        map.flyTo(coords, 14, { duration: 1.2 });
        setIsLocating(false);
      },
      (err) => {
        console.warn("Geolocation permission error:", err.message);
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  }, [map]);

  // Guided Tour Polyline points
  const tour = useMemo(
    () => TOURS.find((t) => t.id === activeTourId),
    [activeTourId]
  );
  const tourPolyline = useMemo(() => {
    if (!tour) return [];
    return tour.stops.map((s) => [s.lat, s.lng] as [number, number]);
  }, [tour]);

  return (
    <>
      {/* Floating Control Toolbar */}
      <div className="absolute top-4 left-4 z-[999] flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          onClick={handleResetCore}
          className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs font-semibold px-3 py-1.5 h-8 rounded-full shadow-lg shadow-black/25 gap-1.5 cursor-pointer"
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

      {/* 10 km Radius Circle when place is selected */}
      {selectedPlace && (
        <Circle
          center={[selectedPlace.lat, selectedPlace.lng]}
          radius={10000}
          pathOptions={{
            color: "#D6AD72",
            fillColor: "#244B3B",
            fillOpacity: 0.06,
            weight: 1.5,
            dashArray: "4, 6",
          }}
        />
      )}

      {/* Tour Polyline */}
      {tourPolyline.length > 0 && (
        <Polyline
          positions={tourPolyline}
          pathOptions={{
            color: "#D6AD72",
            weight: 4,
            opacity: 0.85,
            dashArray: "6, 8",
          }}
        />
      )}

      {/* User Location Marker */}
      {userPos && (
        <Marker
          position={userPos}
          icon={userLocationIcon}
          title="Vị trí của bạn"
        />
      )}

      {/* Markers for all places */}
      {places.map((place) => {
        const isSelected = selectedPlace?.id === place.id;
        const icon = createPinIcon(place.layer, isSelected, debug, place.name);

        return (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={icon}
            title={place.name}
            alt={place.name}
            keyboard
            zIndexOffset={isSelected ? 1000 : 1}
            eventHandlers={{
              click: () => onSelectPlace(place),
            }}
          />
        );
      })}

      {/* Tour Player Overlay */}
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

export default function MapView({
  places,
  selectedPlace,
  onSelectPlace,
  activeTourId,
  onCloseTour,
  debug,
}: MapViewProps) {
  const tileUrl =
    import.meta.env.VITE_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-[#F5F1E8]">
      <MapContainer
        center={CORE_CENTER}
        zoom={CORE_ZOOM}
        minZoom={8}
        maxBounds={[
          [19.6, 105.2],
          [21.1, 106.9],
        ]}
        maxBoundsViscosity={0.8}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          url={tileUrl}
          maxZoom={19}
          referrerPolicy="strict-origin-when-cross-origin"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        />
        <MapController
          places={places}
          selectedPlace={selectedPlace}
          onSelectPlace={onSelectPlace}
          activeTourId={activeTourId}
          onCloseTour={onCloseTour}
          debug={debug}
        />
      </MapContainer>
    </div>
  );
}
