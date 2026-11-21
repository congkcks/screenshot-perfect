import { useState, useEffect, useRef, useCallback } from "react";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import {
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  Headphones,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOURS, type Tour, type TourStop } from "@/data/tours";
import { useAmbience } from "@/hooks/useAmbience";
import { useTypewriter } from "@/hooks/useTypewriter";
import { TourPhoto } from "./TourPhoto";
import { flyWithOffset } from "@/lib/flyWithOffset";
import { addTourStamp } from "./PassportStampDrawer";

interface TourPlayerProps {
  map: LeafletMap | null;
  tourId?: string;
  onClose: () => void;
  onSelectPlace?: (placeId: string) => void;
  onStopChange?: (index: number, stop: TourStop) => void;
}

export function TourPlayer({
  map,
  tourId = "heritage-tour",
  onClose,
  onSelectPlace,
  onStopChange,
}: TourPlayerProps) {
  const tour = TOURS.find((t) => t.id === tourId) || TOURS[0]!;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dwellProgress, setDwellProgress] = useState(0);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTourFinished, setIsTourFinished] = useState(false);
  const [panelDimensions, setPanelDimensions] = useState<{ width: number; height: number }>({
    width: 380,
    height: 480,
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const titleHeadingRef = useRef<HTMLHeadingElement>(null);

  const { isPlaying: isAudioPlaying, toggle: toggleAudio, setTheme } = useAmbience();
  const currentStop = tour.stops[currentIdx]!;

  // Giảm chuyển động
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  // Hook gõ chữ an toàn cho tiếng Việt (tối đa 3.2s, NFC, bấm skip)
  const { shown: typedText, done: typingDone, skip: skipTyping } = useTypewriter(
    currentStop.text,
    prefersReducedMotion,
    3200
  );

  // Gắn cờ data-tour-active lên body để chatbot biết thu nhỏ không che bảng
  useEffect(() => {
    document.body.dataset.tourActive = "true";
    return () => {
      delete document.body.dataset.tourActive;
    };
  }, []);

  // Đo kích thước bảng bằng ResizeObserver để tính offset chính xác
  useEffect(() => {
    if (!panelRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPanelDimensions({
          width: entry.contentRect.width || 380,
          height: entry.contentRect.height || 480,
        });
      }
    });
    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, [isCollapsed]);

  // Focus tiêu đề khi mở
  useEffect(() => {
    titleHeadingRef.current?.focus();
  }, []);

  // Hàm điều khiển camera bay có bù trừ lệch tâm
  const flyToCurrentStop = useCallback(
    (targetIdx: number) => {
      if (!map) return;
      const stop = tour.stops[targetIdx];
      if (!stop) return;

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
      let offset = { x: 0, y: 0 };

      if (isDesktop) {
        // Trên máy tính: bảng điều khiển nằm bên phải, dịch tâm sang phải (offset.x > 0) để điểm nằm ở nửa trái
        const effectiveWidth = isCollapsed ? 80 : panelDimensions.width;
        offset = { x: effectiveWidth / 2, y: 0 };
      } else {
        // Trên điện thoại: bottom sheet nằm ở dưới, dịch tâm xuống dưới (offset.y > 0) để điểm nằm ở phần trên
        const effectiveHeight = isCollapsed ? 64 : panelDimensions.height;
        offset = { x: 0, y: effectiveHeight / 2 };
      }

      flyWithOffset(map, [stop.lat, stop.lng], stop.zoom, offset, {
        duration: prefersReducedMotion ? 0 : 1.8,
        animate: !prefersReducedMotion,
      });
    },
    [map, tour.stops, panelDimensions, isCollapsed, prefersReducedMotion]
  );

  // Mở đầu chuyến: fitBounds toàn tuyến khoảng 1.5s rồi bay vào điểm dừng đầu tiên
  const initialFitDoneRef = useRef(false);
  useEffect(() => {
    if (!map || initialFitDoneRef.current) return;
    initialFitDoneRef.current = true;

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    const routeBounds = L.latLngBounds(tour.stops.map((s) => [s.lat, s.lng]));

    map.fitBounds(routeBounds, {
      paddingTopLeft: [40, 40],
      paddingBottomRight: [isDesktop ? 380 : 40, isDesktop ? 40 : 280],
      maxZoom: 13,
      animate: !prefersReducedMotion,
    });

    const timer = setTimeout(() => {
      flyToCurrentStop(0);
    }, 1500);

    return () => clearTimeout(timer);
  }, [map, tour.stops, flyToCurrentStop, prefersReducedMotion]);

  // Thuyết minh bằng Speech Synthesis nếu người dùng bật
  const speakCurrentStop = useCallback(() => {
    if (!isSpeechEnabled || typeof window === "undefined") return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentStop.text);
      utterance.lang = "vi-VN";
      utterance.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find((v) => v.lang.startsWith("vi"));
      if (viVoice) utterance.voice = viVoice;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentStop, isSpeechEnabled]);

  // Cập nhật khi đổi điểm dừng (Stop transition)
  useEffect(() => {
    // Nếu vừa mới mở thì đã có timeout 1.5s xử lý, chỉ bay khi đổi điểm (currentIdx > 0 hoặc đã qua bước fit đầu)
    if (initialFitDoneRef.current) {
      flyToCurrentStop(currentIdx);
    }

    // Cập nhật chủ đề âm thanh môi trường
    if (currentStop.ambience) {
      setTheme(currentStop.ambience);
    }

    // Đọc giọng nói nếu bật
    speakCurrentStop();

    // Tặng tem hộ chiếu du lịch
    addTourStamp(currentStop.placeId);

    // Báo cho component cha (bản đồ, danh sách)
    onSelectPlace?.(currentStop.placeId);
    onStopChange?.(currentIdx, currentStop);

    // Tải trước ảnh điểm dừng kế tiếp (Next photo preload)
    if (currentIdx < tour.stops.length - 1) {
      const nextStop = tour.stops[currentIdx + 1];
      if (nextStop?.photo && typeof window !== "undefined") {
        const preImg = new Image();
        preImg.src = nextStop.photo;
      }
    }
  }, [currentIdx, currentStop, flyToCurrentStop, speakCurrentStop, onSelectPlace, onStopChange, setTheme, tour.stops]);

  // Bộ đếm thời gian tự động chuyển điểm (Dwell timer)
  useEffect(() => {
    if (!isPlaying || isTourFinished) return;

    const totalSeconds = currentStop.dwellSec || 10;
    const stepMs = 100;
    const delta = (stepMs / 1000 / totalSeconds) * 100;

    const timer = setInterval(() => {
      setDwellProgress((prev) => {
        if (prev >= 100) {
          if (currentIdx < tour.stops.length - 1) {
            setCurrentIdx((c) => c + 1);
            return 0;
          } else {
            setIsPlaying(false);
            setIsTourFinished(true);
            // Quay lại tổng quan toàn tuyến khi kết thúc
            if (map) {
              const routeBounds = L.latLngBounds(tour.stops.map((s) => [s.lat, s.lng]));
              map.fitBounds(routeBounds, { padding: [50, 50], maxZoom: 13 });
            }
            return 100;
          }
        }
        return prev + delta;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPlaying, isTourFinished, currentIdx, currentStop, tour.stops, map]);

  // Dọn dẹp giọng đọc khi unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Phím tắt bàn phím (ArrowLeft, ArrowRight, Space, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (currentIdx < tour.stops.length - 1) {
          setCurrentIdx((c) => c + 1);
          setDwellProgress(0);
          setIsTourFinished(false);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentIdx > 0) {
          setCurrentIdx((c) => c - 1);
          setDwellProgress(0);
          setIsTourFinished(false);
        }
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx, tour.stops.length, onClose]);

  const handleNext = () => {
    if (currentIdx < tour.stops.length - 1) {
      setCurrentIdx((c) => c + 1);
      setDwellProgress(0);
      setIsTourFinished(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((c) => c - 1);
      setDwellProgress(0);
      setIsTourFinished(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setDwellProgress(0);
    setIsTourFinished(false);
    setIsPlaying(true);
    flyToCurrentStop(0);
  };

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Bảng điều khiển chuyến tham quan có hướng dẫn"
      className={`fixed z-[1000] transition-all duration-300 ease-in-out bg-[#173428]/95 backdrop-blur-xl border border-[#D6AD72]/40 shadow-2xl text-white
        /* Mobile: Bottom Sheet */
        bottom-0 inset-x-0 rounded-t-3xl max-h-[82vh] overflow-hidden flex flex-col
        /* Desktop (≥1024px): Bảng điều khiển góc phải */
        lg:bottom-6 lg:right-6 lg:left-auto lg:top-auto lg:w-[clamp(340px,32vw,420px)] lg:rounded-3xl
        ${isCollapsed ? "h-auto" : "h-auto"}
      `}
      style={{
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Thanh kéo / Tiêu đề Header */}
      <div className="px-4 sm:px-5 pt-3 pb-2.5 border-b border-white/10 flex items-center justify-between select-none">
        {/* Mobile Drag Indicator */}
        <div className="absolute top-1.5 inset-x-0 flex justify-center lg:hidden">
          <div className="w-10 h-1 bg-white/30 rounded-full" />
        </div>

        <div className="flex items-center gap-2.5 pt-1 lg:pt-0">
          <span className="p-1.5 rounded-full bg-[#D6AD72] text-[#173428] shadow-xs shrink-0">
            <Compass className="w-4 h-4 animate-[spin_8s_linear_infinite]" />
          </span>
          <div>
            <h2
              ref={titleHeadingRef}
              tabIndex={-1}
              className="text-[10.5px] uppercase font-bold tracking-wider text-[#D6AD72] outline-none"
            >
              Chuyến tham quan có hướng dẫn
            </h2>
            <div className="text-xs font-semibold text-white/95 truncate max-w-[200px] sm:max-w-[240px]">
              {tour.title}
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {/* Nút thu gọn / mở rộng */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            title={isCollapsed ? "Mở rộng bảng điều khiển" : "Thu gọn bảng điều khiển"}
            aria-label={isCollapsed ? "Mở rộng bảng điều khiển" : "Thu gọn bảng điều khiển"}
          >
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Nút bật/tắt âm thanh môi trường (đồng bộ cùng Navbar) */}
          <button
            type="button"
            onClick={() => toggleAudio()}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isAudioPlaying ? "text-[#D6AD72] bg-white/10" : "text-white/50 hover:text-white"
            }`}
            title={isAudioPlaying ? "Tắt âm thanh môi trường" : "Bật âm thanh môi trường"}
            aria-label={isAudioPlaying ? "Tắt âm thanh môi trường" : "Bật âm thanh môi trường"}
          >
            <Headphones className="w-4 h-4" />
          </button>

          {/* Nút đóng chuyến đi */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Thoát chuyến tham quan (Esc)"
            title="Thoát chuyến tham quan (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KHI THU GỌN: Thanh điều khiển tối giản (Mini Bar 64px) */}
      {isCollapsed ? (
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-bold text-[#D6AD72] shrink-0">
              {currentIdx + 1}/{tour.stops.length}
            </span>
            <span className="text-xs text-white/90 font-medium truncate">
              {currentStop.title}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="h-9 w-9 p-0 text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30"
              aria-label="Điểm trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-9 px-3 bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-xs rounded-full"
              aria-label={isPlaying ? "Tạm dừng" : "Tiếp tục"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleNext}
              disabled={currentIdx === tour.stops.length - 1}
              className="h-9 w-9 p-0 text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30"
              aria-label="Điểm tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        /* KHI MỞ RỘNG ĐẦY ĐỦ */
        <div className="px-4 sm:px-5 py-3 overflow-y-auto max-h-[68vh] lg:max-h-[70vh]">
          {/* Màn hình kết thúc chuyến đi (Completion Card) */}
          {isTourFinished ? (
            <div className="py-4 text-center space-y-3 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#D6AD72]/20 border border-[#D6AD72] flex items-center justify-center text-[#D6AD72]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Hoàn thành chuyến tham quan!
              </h3>
              <p className="text-xs text-white/80 leading-relaxed max-w-xs mx-auto">
                Bạn đã bay qua trọn vẹn <strong>{tour.stops.length}/{tour.stops.length}</strong> danh thắng trong hành trình di sản. Mọi tem hành trình đã được lưu vào sổ tay du lịch.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <Button
                  size="sm"
                  onClick={handleRestart}
                  className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-xs h-9 px-4 rounded-full gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Xem lại chuyến đi
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onClose}
                  className="bg-white/10 border-white/20 text-white text-xs h-9 px-4 rounded-full cursor-pointer hover:bg-white/20"
                >
                  Đóng
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Khung ảnh có tranh đồ họa dự phòng (TourPhoto) */}
              <div className="my-1.5">
                <TourPhoto
                  src={currentStop.photo}
                  alt={`Cảnh ${currentStop.title}`}
                  accent={currentStop.accent || "karst"}
                  paused={!isPlaying}
                  className="w-full h-40 sm:h-44 border border-white/15"
                >
                  {/* Badge danh hiệu */}
                  {currentStop.badge && (
                    <span className="absolute left-3 top-3 px-2.5 py-0.5 rounded-full bg-[#D6AD72] text-[#173428] text-[10.5px] font-bold shadow-md">
                      {currentStop.badge}
                    </span>
                  )}

                  {/* Thanh tiêu đề và bộ đếm 3/6 */}
                  <div className="absolute inset-x-3.5 bottom-2.5 flex items-end justify-between">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-white drop-shadow-md truncate max-w-[220px]">
                      {currentStop.title}
                    </h3>
                    <span className="text-[10px] text-[#D6AD72] font-bold bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs border border-white/10">
                      {currentIdx + 1} / {tour.stops.length}
                    </span>
                  </div>
                </TourPhoto>
              </div>

              {/* Lời thuyết minh an toàn (NFC, chạm để hiện đủ) */}
              <div
                onClick={skipTyping}
                title="Chạm để hiển thị toàn bộ lời thuyết minh"
                className="min-h-[58px] my-2.5 cursor-pointer select-text focus:outline-none"
              >
                {/* Văn bản hiển thị thị giác */}
                <p className="text-xs text-[#FAF8F4]/90 font-light leading-relaxed" aria-hidden="true">
                  {typedText}
                  {!typingDone && (
                    <span className="inline-block w-1.5 h-3 bg-[#D6AD72] ml-0.5 animate-pulse" />
                  )}
                </p>
                {/* Văn bản ẩn hỗ trợ trình đọc màn hình screen reader */}
                <span className="sr-only">{currentStop.text}</span>

                {/* Mục "Bạn có biết" */}
                {currentStop.didYouKnow && (
                  <div className="mt-2 text-[11px] text-[#D6AD72] font-normal bg-black/25 rounded-xl p-2.5 border border-[#D6AD72]/20 flex items-start gap-1.5 leading-snug">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6AD72] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-white/90">Bạn có biết: </strong>
                      {currentStop.didYouKnow}
                    </span>
                  </div>
                )}
              </div>

              {/* Thanh tiến độ dừng ngắm (Dwell Progress Bar) */}
              <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden my-2.5">
                <div
                  className="h-full bg-gradient-to-r from-[#D6AD72] to-[#FAF8F4] transition-all duration-100 ease-linear"
                  style={{ width: `${dwellProgress}%` }}
                />
              </div>

              {/* Nút điều khiển: Trước, Tạm dừng, Tiếp */}
              <div className="flex items-center justify-between pt-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  className="text-white/85 hover:text-white hover:bg-white/10 text-xs px-3 h-10 min-w-[64px] disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 mr-0.5" />
                  Trước
                </Button>

                <Button
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-xs px-5 h-10 rounded-full shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 mr-1" />
                      Tạm Dừng
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 mr-1" />
                      Tiếp Tục
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleNext}
                  disabled={currentIdx === tour.stops.length - 1}
                  className="text-white/85 hover:text-white hover:bg-white/10 text-xs px-3 h-10 min-w-[64px] disabled:opacity-30 cursor-pointer"
                >
                  Tiếp
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
