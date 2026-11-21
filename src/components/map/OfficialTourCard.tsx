import { ExternalLink, Sparkles } from "lucide-react";

export function OfficialTourCard() {
  return (
    <div className="bg-gradient-to-br from-[#244B3B] to-[#173428] rounded-2xl p-4 text-white border border-[#D6AD72]/40 shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[#D6AD72] text-[11px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Triển Lãm Số Chính Thức</span>
        </div>
        <span className="text-[10px] bg-[#D6AD72] text-[#173428] font-bold px-2 py-0.5 rounded-full">
          UNESCO & Arts
        </span>
      </div>

      <h4 className="font-serif font-bold text-sm sm:text-base mt-2 leading-snug">
        Du lịch ảo Quần thể danh thắng Tràng An
      </h4>
      <p className="text-xs text-white/80 mt-1 leading-relaxed">
        Trải nghiệm ảnh toàn cảnh độ phân giải cao do Cục Du lịch Quốc gia Việt Nam hợp tác cùng Google Arts & Culture thực hiện.
      </p>

      <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between">
        <span className="text-[10px] text-white/60">vietnam.travel & Google</span>
        <a
          href="https://artsandculture.google.com/story/trang-an-vietnam/YwWRAoT5FkF9Lg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#D6AD72] hover:text-[#FAF8F4] transition-colors"
        >
          <span>Khám phá ngay</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
