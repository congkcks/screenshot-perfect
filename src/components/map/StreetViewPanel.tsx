import { useEffect, useState, useRef } from "react";
import { Eye, X, Compass, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StreetViewPanelProps {
  lat: number;
  lng: number;
  placeName: string;
}

export function StreetViewPanel({ lat, lng, placeName }: StreetViewPanelProps) {
  const [hasStreetView, setHasStreetView] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<google.maps.StreetViewPanorama | null>(null);

  // Kiểm tra độ phủ thực tế của Street View
  useEffect(() => {
    setHasStreetView(null);
    setIsOpen(false);

    if (typeof window === "undefined" || !window.google?.maps?.StreetViewService) {
      setHasStreetView(false);
      return;
    }

    try {
      const sv = new google.maps.StreetViewService();
      sv.getPanorama(
        {
          location: { lat, lng },
          radius: 350,
          source: google.maps.StreetViewSource.OUTDOOR,
        },
        (_data, status) => {
          setHasStreetView(status === google.maps.StreetViewStatus.OK);
        }
      );
    } catch {
      setHasStreetView(false);
    }
  }, [lat, lng]);

  // Khởi tạo panorama khi người dùng bấm mở
  useEffect(() => {
    if (isOpen && containerRef.current && window.google?.maps?.StreetViewPanorama) {
      panoRef.current = new google.maps.StreetViewPanorama(containerRef.current, {
        position: { lat, lng },
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
        addressControl: false,
        linksControl: true,
        panControl: true,
        enableCloseButton: false,
      });
    }
    return () => {
      panoRef.current = null;
    };
  }, [isOpen, lat, lng]);

  if (hasStreetView === false) {
    // Không có Street View tại tọa độ này -> ẩn hoàn toàn theo đúng nguyên tắc
    return null;
  }

  if (hasStreetView === null) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="border-[#D6AD72] text-[#244B3B] hover:bg-[#D6AD72]/15 text-xs gap-1.5 rounded-xl font-medium cursor-pointer"
        title="Xem toàn cảnh 360° Street View thực tế"
      >
        <Eye className="w-3.5 h-3.5 text-[#D6AD72]" />
        Xem 360° (Street View)
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 text-white max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#D6AD72] animate-spin" />
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base">
                  Toàn cảnh 360° Street View — {placeName}
                </h3>
                <p className="text-[11px] text-white/70">
                  Dùng chuột kéo để xoay góc nhìn 360° hoặc di chuyển dọc theo tuyến đường
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Đóng toàn cảnh 360"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={containerRef}
            className="flex-1 max-w-5xl mx-auto w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black"
          />
        </div>
      )}
    </>
  );
}
