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

// Guided Tour Pin divIcon
function createTourPinIcon(
  index: number,
  total: number,
  state: "current" | "passed" | "future",
  title: string
) {
  const pulseHtml = state === "current" ? `<span class="nb-tour-pulse"></span>` : "";
  const labelHtml =
    state === "current"
      ? `<div class="nb-tour-label">
           <span style="color: #D6AD72; font-weight: 800;">${index + 1}.</span>
           <span>${title}</span>
         </div>`
      : "";

  return L.divIcon({
    className: "nb-tour-marker-wrapper",
    html: `
      <div class="nb-tour-pin-container">
        ${pulseHtml}
        <div class="nb-tour-pin is-${state}">
          ${index + 1}
        </div>
        ${labelHtml}
      </div>
    `,
    iconSize: state === "current" ? [40, 40] : [32, 32],
    iconAnchor: state === "current" ? [20, 20] : [16, 16],
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

  // Guided Tour Polyline points & active stop index
  const [tourCurrentIdx, setTourCurrentIdx] = useState(0);

  useEffect(() => {
    setTourCurrentIdx(0);
  }, [activeTourId]);

  const tour = useMemo(
    () => TOURS.find((t) => t.id === activeTourId),
    [activeTourId]
  );

  const tourPolylinePassed = useMemo(() => {
    if (!tour) return [];
    return tour.stops.slice(0, tourCurrentIdx + 1).map((s) => [s.lat, s.lng] as [number, number]);
  }, [tour, tourCurrentIdx]);

  const tourPolylineFuture = useMemo(() => {
    if (!tour || tourCurrentIdx >= tour.stops.length - 1) return [];
    return tour.stops.slice(tourCurrentIdx).map((s) => [s.lat, s.lng] as [number, number]);
  }, [tour, tourCurrentIdx]);

  return (
    <>
      {/* Floating Control Toolbar (Responsive, không bị tràn viền ở 375px) */}
      <div className="absolute top-3.5 left-3.5 z-[999] flex flex-wrap items-center gap-1.5 max-w-[calc(100%-1rem)] sm:max-w-none">
        <Button
          type="button"
          size="sm"
          onClick={handleResetCore}
          className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs font-semibold px-2.5 sm:px-3 py-1.5 h-8 rounded-full shadow-lg shadow-black/25 gap-1 cursor-pointer shrink-0"
        >
          <Compass className="w-3.5 h-3.5 text-[#D6AD72]" />
          <span className="hidden sm:inline">Vùng Lõi Cố Đô</span>
          <span className="sm:hidden">Vùng Lõi</span>
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleFitAll}
          className="bg-white/95 hover:bg-white text-[#244B3B] border-[#DFD7C7] text-xs font-semibold px-2.5 sm:px-3 py-1.5 h-8 rounded-full shadow-md gap-1 cursor-pointer shrink-0"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#D6AD72]" />
          <span className="hidden sm:inline">Mở rộng: Ninh Bình mới</span>
          <span className="sm:hidden">Toàn cảnh</span>
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleLocateMe}
          disabled={isLocating}
          className="bg-white/95 hover:bg-white text-[#244B3B] border-[#DFD7C7] text-xs font-semibold px-2.5 sm:px-3 py-1.5 h-8 rounded-full shadow-md gap-1 cursor-pointer shrink-0"
          title="Định vị vị trí hiện tại của bạn"
        >
          <Crosshair className={`w-3.5 h-3.5 text-[#244B3B] ${isLocating ? "animate-spin" : ""}`} />
          <span className="text-xs">Quanh Tôi</span>
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

      {/* Tour Polyline 2 lớp: Nổi bật trên nền bản đồ OSM */}
      {tourPolylinePassed.length > 1 && (
        <>
          {/* Lớp nền xanh rừng dày 7px */}
          <Polyline
            positions={tourPolylinePassed}
            pathOptions={{
              color: "#244B3B",
              weight: 7,
              opacity: 0.95,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
          {/* Lớp trên vàng champagne dày 4px */}
          <Polyline
            positions={tourPolylinePassed}
            pathOptions={{
              color: "#D6AD72",
              weight: 4,
              opacity: 1,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        </>
      )}

      {/* Tuyến tương lai nét đứt */}
      {tourPolylineFuture.length > 1 && (
        <>
          <Polyline
            positions={tourPolylineFuture}
            pathOptions={{
              color: "#244B3B",
              weight: 5,
              opacity: 0.5,
              dashArray: "6, 8",
            }}
          />
          <Polyline
            positions={tourPolylineFuture}
            pathOptions={{
              color: "#D6AD72",
              weight: 2.5,
              opacity: 0.7,
              dashArray: "6, 8",
            }}
          />
        </>
      )}

      {/* Tour Stop Markers với số thứ tự, hiệu ứng nhịp và nhãn cố định */}
      {tour &&
        tour.stops.map((stop, sIdx) => {
          let state: "current" | "passed" | "future" = "future";
          if (sIdx === tourCurrentIdx) state = "current";
          else if (sIdx < tourCurrentIdx) state = "passed";

          return (
            <Marker
              key={`tour-stop-${stop.placeId}-${sIdx}`}
              position={[stop.lat, stop.lng]}
              icon={createTourPinIcon(sIdx, tour.stops.length, state, stop.title)}
              zIndexOffset={state === "current" ? 2000 : 800}
            />
          );
        })}

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
          onStopChange={(idx) => setTourCurrentIdx(idx)}
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
