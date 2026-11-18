import { statsImpressive } from "@/data/ninh-binh";
import { Sparkles, TrendingUp } from "lucide-react";

export function StatsCounterBar() {
  return (
    <section className="bg-[#173428] text-white py-12 border-y border-[#D6AD72]/30 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#D6AD72]/20 text-[#D6AD72]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D6AD72]">
              CON SỐ ẤN TƯỢNG VỀ CỐ ĐÔ
            </span>
          </div>
          <span className="text-xs text-white/60 hidden sm:inline font-light">
            Dữ liệu khảo cứu địa chí & di sản Ninh Bình
          </span>
        </div>

        {/* Horizontal Scrollable / Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {statsImpressive.slice(0, 6).map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6AD72]/60 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#D6AD72] group-hover:scale-105 transition-transform tracking-tight">
                  {item.num}
                </p>
                <h4 className="text-xs font-semibold text-white/95 mt-1 leading-snug">
                  {item.label}
                </h4>
              </div>
              <p className="text-[10px] text-white/60 font-light mt-2 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Second row of stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {statsImpressive.slice(6).map((item, idx) => (
            <div
              key={idx + 6}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6AD72]/60 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#D6AD72] group-hover:scale-105 transition-transform">
                  {item.num}
                </p>
                <h4 className="text-xs font-semibold text-white/95 mt-0.5 leading-snug">
                  {item.label}
                </h4>
              </div>
              <p className="text-[10px] text-white/60 font-light mt-1.5 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
