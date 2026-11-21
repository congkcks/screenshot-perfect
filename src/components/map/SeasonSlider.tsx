import { useState, useRef } from "react";
import { Sparkles, Sun, Leaf } from "lucide-react";

interface SeasonSliderProps {
  placeName?: string;
}

export function SeasonSlider({ placeName = "Tam Cốc – Bích Động" }: SeasonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#DFD7C7] shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D6AD72]" />
          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#244B3B]">
            Biến Chuyển Sắc Mùa: {placeName}
          </h4>
        </div>
        <span className="text-[10px] text-[#5A6D63] font-sans">Kéo thanh để so sánh</span>
      </div>

      <div
        ref={containerRef}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden select-none cursor-ew-resize border border-[#DFD7C7]"
      >
        {/* Layer 1: Mùa lúa chín vàng (Sau) */}
        <div className="absolute inset-0">
          <img
            src="/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp"
            alt="Tam Cốc mùa lúa chín vàng óng ả"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-bold backdrop-blur-md flex items-center gap-1 shadow-xs">
            <Sun className="w-3 h-3" />
            Mùa Lúa Chín (T5 - T6)
          </div>
        </div>

        {/* Layer 2: Mùa lúa xanh mát (Trước - Cắt theo vị trí thanh trượt) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full">
            <img
              src="/images/02-trang-an/trang-an-01-thuyen-xuyen-hang.webp"
              alt="Tam Cốc mùa lúa xanh mơn mởn"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current
                  ? `${containerRef.current.clientWidth}px`
                  : "100%",
              }}
            />
          </div>
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-700/90 text-white text-[10px] font-bold backdrop-blur-md flex items-center gap-1 shadow-xs">
            <Leaf className="w-3 h-3" />
            Mùa Lúa Xanh (T2 - T4)
          </div>
        </div>

        {/* Thanh phân chia và nút kéo */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-[#244B3B] border-2 border-[#D6AD72] shadow-xl flex items-center justify-center text-xs font-bold">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}
