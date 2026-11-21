import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Headphones,
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
import { addTourStamp } from "./PassportStampDrawer";

// Camera flight interpolation with easing
export function flyTo(
  map: google.maps.Map,
  to: google.maps.LatLngLiteral,
  targetZoom: number,
  durationMs = 1800
) {
  if (typeof window === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    map.moveCamera({ center: to, zoom: targetZoom });
    return;
  }

  const center = map.getCenter();
  if (!center) {
    map.moveCamera({ center: to, zoom: targetZoom });
    return;
  }

  const from = center.toJSON();
  const z0 = map.getZoom() ?? 12;
  const t0 = performance.now();

  const ease = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const step = (now: number) => {
    const elapsed = now - t0;
    const progress = Math.min(1, elapsed / durationMs);
    const k = ease(progress);

    map.moveCamera({
      center: {
        lat: from.lat + (to.lat - from.lat) * k,
        lng: from.lng + (to.lng - from.lng) * k,
      },
      zoom: z0 + (targetZoom - z0) * k,
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

interface TourPlayerProps {
  map: google.maps.Map | null;
  tourId?: string;
  onClose: () => void;
  onSelectPlace?: (placeId: string) => void;
}

export function TourPlayer({
  map,
  tourId = "heritage-tour",
  onClose,
  onSelectPlace,
}: TourPlayerProps) {
  const tour = TOURS.find((t) => t.id === tourId) || TOURS[0]!;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [typedChars, setTypedChars] = useState(0);
  const [dwellProgress, setDwellProgress] = useState(0);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);

  const { play: playAmbience, setTheme } = useAmbience();
  const currentStop = tour.stops[currentIdx]!;
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  // Typewriter effect
  useEffect(() => {
    setTypedChars(0);
    const text = currentStop.text;
    const interval = setInterval(() => {
      setTypedChars((prev) => {
        if (prev < text.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 28);
    return () => clearInterval(interval);
  }, [currentStop]);

  // Read narration via speech synthesis or audio
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

  // Handle stop transition
  useEffect(() => {
    if (!map) return;

    // Fly camera to stop
    flyTo(
      map,
      { lat: currentStop.lat, lng: currentStop.lng },
      currentStop.zoom,
      1800
    );

    // Update ambient sound theme
    if (currentStop.ambience) {
      setTheme(currentStop.ambience);
    }

    // Voice narration
    speakCurrentStop();

    // Award passport stamp
    addTourStamp(currentStop.placeId);

    // Notify parent
    onSelectPlace?.(currentStop.placeId);

    // Update Polyline
    if (window.google?.maps?.Polyline) {
      if (!polylineRef.current) {
        polylineRef.current = new google.maps.Polyline({
          map,
          path: [],
          strokeColor: "#D6AD72",
          strokeWeight: 4,
          strokeOpacity: 0.85,
        });
      }
      const traveledStops = tour.stops
        .slice(0, currentIdx + 1)
        .map((s) => ({ lat: s.lat, lng: s.lng }));
      polylineRef.current.setPath(traveledStops);
    }
  }, [currentIdx, currentStop, map, speakCurrentStop, tour.stops, onSelectPlace, setTheme]);

  // Auto advancement timer
  useEffect(() => {
    if (!isPlaying) return;

    const totalSeconds = currentStop.dwellSec;
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
            return 100;
          }
        }
        return prev + delta;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentIdx, currentStop, tour.stops.length]);

  // Cleanup polyline and speech when unmounted
  useEffect(() => {
    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (currentIdx < tour.stops.length - 1) {
          setCurrentIdx((c) => c + 1);
          setDwellProgress(0);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentIdx > 0) {
          setCurrentIdx((c) => c - 1);
          setDwellProgress(0);
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
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((c) => c - 1);
      setDwellProgress(0);
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#173428]/95 backdrop-blur-xl border border-[#D6AD72]/40 rounded-3xl p-4 sm:p-5 text-white shadow-2xl animate-in slide-in-from-top-4 duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-full bg-[#D6AD72] text-[#173428]">
            <Compass className="w-4 h-4 animate-spin" />
          </span>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#D6AD72]">
              Tham Quan Ảo 360°
            </div>
            <div className="text-xs font-semibold text-white/90 truncate max-w-[190px]">
              {tour.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setIsSpeechEnabled(!isSpeechEnabled);
              if (isSpeechEnabled && typeof window !== "undefined") {
                window.speechSynthesis?.cancel();
              }
            }}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isSpeechEnabled ? "text-[#D6AD72] bg-white/10" : "text-white/40 hover:text-white"
            }`}
            title={isSpeechEnabled ? "Tắt thuyết minh giọng nói" : "Bật thuyết minh giọng nói"}
          >
            {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Thoát chuyến tham quan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Photo with Ken Burns Animation */}
      <div className="relative w-full h-36 rounded-2xl overflow-hidden my-3 border border-white/15 bg-black">
        <img
          key={currentStop.placeId}
          src={currentStop.photo}
          alt={currentStop.title}
          className="w-full h-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {currentStop.badge && (
          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#D6AD72] text-[#173428] text-[10px] font-bold shadow-md">
            {currentStop.badge}
          </div>
        )}

        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <div className="font-serif font-bold text-sm text-white drop-shadow-md">
            {currentStop.title}
          </div>
          <span className="text-[10px] text-[#D6AD72] font-semibold bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-xs">
            {currentIdx + 1} / {tour.stops.length}
          </span>
        </div>
      </div>

      {/* Narration Typewriter Text */}
      <div className="min-h-[64px] mb-3">
        <p className="text-xs text-[#FAF8F4]/90 font-light leading-relaxed">
          {currentStop.text.slice(0, typedChars)}
          {typedChars < currentStop.text.length && (
            <span className="inline-block w-1.5 h-3 bg-[#D6AD72] ml-0.5 animate-pulse" />
          )}
        </p>

        {currentStop.didYouKnow && (
          <div className="mt-2 text-[11px] text-[#D6AD72] font-medium bg-black/20 rounded-xl p-2 border border-[#D6AD72]/20 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D6AD72] shrink-0 mt-0.5" />
            <span>{currentStop.didYouKnow}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-[#D6AD72] to-[#F5F1E8] transition-all duration-100 ease-linear"
          style={{ width: `${dwellProgress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="text-white/80 hover:text-white hover:bg-white/10 text-xs px-2.5 h-8 disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5" />
          Trước
        </Button>

        <Button
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-xs px-4 h-8 rounded-full shadow-md cursor-pointer"
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
          className="text-white/80 hover:text-white hover:bg-white/10 text-xs px-2.5 h-8 disabled:opacity-30 cursor-pointer"
        >
          Tiếp
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </Button>
      </div>
    </div>
  );
}
