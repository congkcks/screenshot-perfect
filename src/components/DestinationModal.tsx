import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Coins,
  Compass,
  Heart,
  HelpCircle,
  Lightbulb,
  MapPin,
  Navigation,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
  X,
  CheckCircle2,
} from "lucide-react";
import type { Destination } from "@/data/ninh-binh";
import { toast } from "sonner";

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function DestinationModal({
  destination,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}: DestinationModalProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  if (!destination) return null;

  const currentImage = imgSrc || destination.image;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    destination.mapQuery
  )}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-[#FAF8F4] border-[#DFD7C7] text-[#1A3429] max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Visual Hero Header */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#173428]">
          <img
            src={currentImage}
            alt={destination.imageAlt || destination.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onError={() => {
              setImgSrc(destination.fallbackImage);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173428] via-[#173428]/45 to-transparent" />
          {destination.imageCredit && (
            <span className="absolute bottom-3 right-4 text-[10px] text-white/75 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full z-10 font-mono">
              Ảnh: {destination.imageCredit}
            </span>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#244B3B]/90 text-white backdrop-blur-md border border-[#D6AD72]/40">
              {destination.category}
            </span>
            {destination.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#D6AD72] text-[#173428] font-serif flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                {destination.badge}
              </span>
            )}
          </div>

          {/* Save & Close Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => {
                onToggleSave(destination.id);
                toast.success(
                  isSaved
                    ? `Đã bỏ lưu ${destination.name}`
                    : `Đã lưu ${destination.name} vào danh sách yêu thích!`
                );
              }}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                isSaved
                  ? "bg-[#D6AD72] text-[#173428]"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
              aria-label="Lưu điểm đến"
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-all"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-xs text-[#D6AD72] font-medium mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{destination.area}</span>
              <span className="text-white/40">•</span>
              <div className="flex items-center text-amber-300">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                <span className="font-semibold text-white">{destination.rating}</span>
                <span className="text-white/70 text-[10px] ml-1">
                  ({destination.reviewCount.toLocaleString()} đánh giá)
                </span>
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-3xl font-serif text-white font-normal leading-tight">
                {destination.name}
              </DialogTitle>
            </DialogHeader>
            <p className="text-xs sm:text-sm text-[#D6AD72] font-serif italic mt-0.5">
              "{destination.slogan}"
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#769477] mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#D6AD72]" /> Giới Thiệu Điểm Đến
            </h4>
            <p className="text-sm leading-relaxed text-[#1A3429]/90 font-light">
              {destination.description}
            </p>
          </div>

          {/* Con số ấn tượng (Stats Badges) */}
          {destination.stats && destination.stats.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#769477] mb-2.5 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#D6AD72]" /> Con Số Ấn Tượng
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destination.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white border border-[#DFD7C7]/80 text-xs text-[#244B3B] font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD72]" />
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Info Grid (Timing, Duration, Ticket) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-[#DFD7C7]/80">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#244B3B] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-[#769477] uppercase tracking-wider">
                  Thời Gian Tham Quan
                </p>
                <p className="text-xs font-semibold text-[#1A3429] mt-0.5">
                  {destination.duration || "Khoảng 2 – 3 giờ"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#D6AD72] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-[#769477] uppercase tracking-wider">
                  Thời Điểm Vàng
                </p>
                <p className="text-xs font-semibold text-[#1A3429] mt-0.5 line-clamp-2">
                  {destination.bestTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Coins className="w-4 h-4 text-[#244B3B] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-[#769477] uppercase tracking-wider">
                  Chi Phí Tham Quan
                </p>
                <p className="text-xs font-semibold text-[#244B3B] mt-0.5">
                  {destination.ticketPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Trải nghiệm không thể bỏ lỡ */}
          {destination.mustTry && destination.mustTry.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#769477] mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" /> Trải Nghiệm Không Thể Bỏ Lỡ
              </h4>
              <div className="space-y-2">
                {destination.mustTry.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/70 border border-[#DFD7C7]/60 text-xs text-[#1A3429]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#769477] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mẹo thổ địa & Lời khuyên */}
          {destination.insiderTip && (
            <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#D6AD72]/40 flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-[#D6AD72] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-[#244B3B] uppercase tracking-wider">
                  Mẹo Thổ Địa
                </p>
                <p className="text-xs text-[#1A3429]/90 mt-0.5 leading-relaxed">
                  {destination.insiderTip}
                </p>
              </div>
            </div>
          )}

          {/* Bạn có biết? Trivia Card */}
          {destination.didYouKnow && (
            <div className="p-3.5 rounded-xl bg-white border border-[#DFD7C7] flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-[#769477] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-[#769477] uppercase tracking-wider">
                  Bạn Có Biết?
                </p>
                <p className="text-xs text-[#5A6D63] mt-0.5 leading-relaxed font-light">
                  {destination.didYouKnow}
                </p>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#DFD7C7]">
            <span className="text-xs text-[#769477]">
              Tọa độ: {destination.lat.toFixed(4)}° N, {destination.lng.toFixed(4)}° E
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="border-[#DFD7C7] hover:bg-[#F5F1E8] text-xs"
              >
                Đóng
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs gap-1.5 shadow-md"
              >
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-3.5 h-3.5 text-[#D6AD72]" />
                  Chỉ Đường Google Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
