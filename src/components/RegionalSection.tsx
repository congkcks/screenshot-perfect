import { useState } from "react";
import { Compass, MapPin, Sparkles, ArrowRight, Layers } from "lucide-react";
import { regionalExploration } from "@/data/ninh-binh";
import { Button } from "@/components/ui/button";

export function RegionalSection() {
  const [activeRegion, setActiveRegion] = useState(0);

  const current = regionalExploration[activeRegion] ?? regionalExploration[0]!;

  return (
    <section className="py-24 bg-[#EAE3D5]/40 border-b border-[#DFD7C7]" id="vung-mien">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-2">
              <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
              <span>PHÂN VÙNG ĐỊA LÝ DU LỊCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-[#1A3429]">
              Khám Phá Theo{" "}
              <span className="italic font-serif text-[#244B3B] font-normal">
                Từng Vùng.
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6D63] max-w-xl font-light">
              Từ miền núi đá Hoa Lư trầm mặc, vùng trũng ngập nước Gia Viễn cho đến bờ biển Kim Sơn lộng gió — mỗi huyện thị đều mang một bản sắc độc bản.
            </p>
          </div>
        </div>

        {/* 7 Regional Selection Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {regionalExploration.map((region, idx) => {
            const isActive = idx === activeRegion;
            return (
              <button
                key={region.id}
                onClick={() => setActiveRegion(idx)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#244B3B] text-white border-[#244B3B] shadow-md font-semibold"
                    : "bg-white text-[#1A3429] hover:bg-[#FAF8F4] border-[#DFD7C7]"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isActive ? "text-[#D6AD72]" : "text-[#769477]"}`} />
                <span>{region.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full hidden sm:inline ${
                    isActive ? "bg-white/20 text-[#D6AD72]" : "bg-[#F5F1E8] text-[#5A6D63]"
                  }`}
                >
                  {region.accent}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Region Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DFD7C7] shadow-xl shadow-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info Col */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#D6AD72]/20 text-[#173428] border border-[#D6AD72]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#B88E52]" />
                {current.tagline}
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif text-[#1A3429] font-normal">
                {current.name}
              </h3>

              <p className="text-sm text-[#1A3429]/85 font-light leading-relaxed">
                {current.description}
              </p>

              {/* Landmarks List */}
              <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#DFD7C7]/80">
                <p className="text-xs font-bold uppercase tracking-wider text-[#769477] mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#244B3B]" /> Danh Thắng Nổi Bật
                </p>
                <p className="text-xs sm:text-sm text-[#1A3429] font-medium leading-relaxed">
                  {current.landmarks}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs gap-1.5 shadow-md"
                >
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `du lịch ${current.name} Ninh Bình`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" />
                    Xem Điểm Đến Trên Bản Đồ
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#DFD7C7] text-xs text-[#244B3B] hover:bg-[#F5F1E8]"
                >
                  <a href="#diem-den">Tìm Tour Điểm Này</a>
                </Button>
              </div>
            </div>

            {/* Quick Regional Comparison Table (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF8F4] p-5 sm:p-6 rounded-2xl border border-[#DFD7C7]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#244B3B] mb-4 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#D6AD72]" /> Bảng Tóm Tắt 7 Vùng Cố Đô
              </h4>
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {regionalExploration.map((r, i) => (
                  <div
                    key={r.id}
                    onClick={() => setActiveRegion(i)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all text-xs flex items-center justify-between ${
                      i === activeRegion
                        ? "bg-[#244B3B] text-white font-semibold"
                        : "bg-white text-[#1A3429] hover:bg-[#EAE3D5] border border-[#DFD7C7]/70"
                    }`}
                  >
                    <span className="truncate pr-2">{r.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${
                        i === activeRegion
                          ? "bg-white/20 text-[#D6AD72]"
                          : "bg-[#F5F1E8] text-[#769477]"
                      }`}
                    >
                      {r.accent}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
