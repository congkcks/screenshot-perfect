import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Flame,
  Gift,
  MapPin,
  Quote,
  Sparkles,
  UtensilsCrossed,
  Wine,
  X,
} from "lucide-react";
import type { LocalFood } from "@/data/ninh-binh";

interface FoodModalProps {
  food: LocalFood | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FoodModal({ food, isOpen, onClose }: FoodModalProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  if (!food) return null;

  const currentImage = imgSrc || food.image;

  const mapsQuery = `quán ${food.name} ngon Ninh Bình`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapsQuery
  )}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-[#FAF8F4] border-[#DFD7C7] text-[#1A3429] max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Visual Hero Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#173428]">
          <img
            src={currentImage}
            alt={food.imageAlt || food.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onError={() => {
              setImgSrc(food.fallbackImage);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173428] via-[#173428]/40 to-transparent" />
          {food.imageCredit && (
            <span className="absolute top-4 right-16 text-[10px] text-white/80 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full z-10 font-mono">
              Ảnh: {food.imageCredit}
            </span>
          )}

          {/* Tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D6AD72] text-[#173428] shadow-md font-sans">
              {food.tag}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-all"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-3xl font-serif text-white font-normal leading-tight">
                {food.name}
              </DialogTitle>
            </DialogHeader>
            <p className="text-xs sm:text-sm text-[#D6AD72] font-serif italic mt-0.5">
              "{food.slogan}"
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Introduction */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#769477] mb-1.5 flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#D6AD72]" /> Giới Thiệu Món Ăn
            </h4>
            <p className="text-sm leading-relaxed text-[#1A3429]/90 font-light">
              {food.description}
            </p>
          </div>

          {/* Taste Profile */}
          <div className="p-3.5 rounded-xl bg-white border border-[#DFD7C7]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#769477] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" /> Cảm Nhận Vị Giác & Hương Thơm
            </p>
            <p className="text-xs text-[#1A3429] leading-relaxed font-medium">
              {food.tasteProfile}
            </p>
          </div>

          {/* How to eat & Pairing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-white border border-[#DFD7C7]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#244B3B] mb-1">
                <Flame className="w-3.5 h-3.5 text-[#D6AD72]" />
                Cách Thưởng Thức
              </div>
              <p className="text-xs text-[#5A6D63] leading-relaxed">
                {food.howToEat}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#DFD7C7]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#244B3B] mb-1">
                <Wine className="w-3.5 h-3.5 text-[#D6AD72]" />
                Gợi Ý Đồ Uống & Kèm
              </div>
              <p className="text-xs text-[#5A6D63] leading-relaxed">
                {food.pairing}
              </p>
            </div>
          </div>

          {/* Where to buy / Addresses */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#DFD7C7]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#244B3B] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" /> Địa Chỉ Chuẩn Vị & Mua Quà
            </p>
            <p className="text-xs text-[#1A3429] leading-relaxed font-medium">
              {food.whereToBuy}
            </p>
          </div>

          {/* Editorial Quote */}
          {food.editorialQuote && (
            <div className="p-3.5 rounded-xl bg-white border border-[#D6AD72]/40 flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-[#D6AD72] flex-shrink-0 mt-0.5" />
              <p className="text-xs font-serif italic text-[#173428] leading-relaxed">
                "{food.editorialQuote}"
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DFD7C7]">
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
                <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" />
                Tìm Quán Gần Đây Trên Maps
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
