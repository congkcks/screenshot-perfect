import { Calendar, CheckCircle2, Sparkles, Sun } from "lucide-react";
import { seasonalGuide } from "@/data/ninh-binh";

export function SeasonalGuideSection() {
  return (
    <section className="py-24 bg-[#FAF8F4] border-b border-[#DFD7C7]" id="thoi-diem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-2">
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
            <span>CẨM NANG BỐN MÙA</span>
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-[#1A3429]">
            Thời Điểm{" "}
            <span className="italic font-serif text-[#244B3B] font-normal">
              Đẹp Nhất.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6D63] font-light">
            Ninh Bình bốn mùa đều mang nét quyến rũ riêng. Chọn mùa khởi hành phù hợp nhất với sở thích của bạn.
          </p>
        </div>

        {/* 4 Seasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalGuide.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#DFD7C7] hover:border-[#D6AD72] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-2xl bg-[#F5F1E8]">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#EAE3D5] text-[#244B3B]">
                    {item.timing}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#1A3429] mb-1">
                  {item.season}
                </h3>
                <p className="text-xs font-serif italic text-[#D6AD72] mb-3">
                  {item.title}
                </p>

                {"image" in item && Boolean((item as any).image) && (
                  <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-3">
                    <img
                      src={(item as any).image}
                      alt={(item as any).imageAlt || item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <p className="text-xs text-[#5A6D63] font-light leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DFD7C7]/70 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#769477]">
                  Trải nghiệm lý tưởng:
                </p>
                {item.activities.map((act, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-[#1A3429]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6AD72] flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
