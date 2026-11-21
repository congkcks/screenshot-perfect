import { lazy, Suspense, useEffect, useState } from "react";
import { Compass, Sparkles } from "lucide-react";
import type { Place } from "@/data/places";
import { MapFallback } from "./MapFallback";

// Lazy-load MapView to ensure Leaflet and window are never evaluated during SSR
const LazyMapView = lazy(() => import("./MapView"));

interface MapClientProps {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  activeTourId?: string | null;
  onCloseTour?: () => void;
  debug?: boolean;
}

export function MapClient({
  places,
  selectedPlace,
  onSelectPlace,
  activeTourId,
  onCloseTour,
  debug,
}: MapClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // While SSR or before client mount: show luxury skeleton placeholder
  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-[#F5F1E8] text-[#244B3B] p-6 text-center select-none animate-pulse">
        <div className="w-12 h-12 rounded-full bg-[#244B3B]/10 flex items-center justify-center mb-3">
          <Compass className="w-6 h-6 text-[#D6AD72] animate-spin" />
        </div>
        <h3 className="font-serif font-bold text-base text-[#244B3B]">
          Đang tải Bản đồ số Ninh Bình...
        </h3>
        <p className="text-xs text-[#5A6D63] mt-1 max-w-sm">
          Khởi tạo không gian bản đồ mở OpenStreetMap & 64 danh thắng di sản
        </p>
      </div>
    );
  }

  if (hasError) {
    return <MapFallback reason="load-error" onSelectPlace={onSelectPlace} />;
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-[#F5F1E8] text-[#244B3B]">
          <Compass className="w-8 h-8 text-[#D6AD72] animate-spin mb-2" />
          <span className="text-xs font-semibold text-[#5A6D63]">Đang kết nối ô bản đồ...</span>
        </div>
      }
    >
      <LazyMapView
        places={places}
        selectedPlace={selectedPlace}
        onSelectPlace={onSelectPlace}
        activeTourId={activeTourId}
        onCloseTour={onCloseTour}
        debug={debug}
      />
    </Suspense>
  );
}
