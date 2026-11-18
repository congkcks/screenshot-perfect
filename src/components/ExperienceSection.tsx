import { useState } from "react";
import {
  ArrowRight,
  Clock,
  Compass,
  Footprints,
  MapPin,
  Sparkles,
  Sun,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { experiences, type Experience } from "@/data/ninh-binh";

export function ExperienceSection() {
  const [selectedExp, setSelectedExp] = useState<number>(0);

  const current = experiences[selectedExp] ?? experiences[0]!;

  return (
    <section
      id="trai-nghiem"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="experience-title"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-3">
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
            <span>KỂ CHUYỆN BẰNG HÌNH ẢNH</span>
          </div>
          <h2
            id="experience-title"
            className="text-4xl sm:text-5xl md:text-6xl font-editorial-heading text-[#1A3429]"
          >
            Nhịp Đi Của Riêng{" "}
            <span className="italic font-serif text-[#244B3B] font-normal">
              Bạn.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6D63] max-w-xl font-light">
            Không chỉ là những điểm đến trên bản đồ. Ninh Bình là những khoảnh khắc bạn lắng nghe tiếng chèo khua nước, chạm tay vào vách đá ngàn năm hay thả mình giữa biển lúa vàng rực rỡ.
          </p>
        </div>

        {/* Categories Tab Pill */}
        <div className="flex flex-wrap gap-2">
          {experiences.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => setSelectedExp(idx)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedExp === idx
                  ? "bg-[#244B3B] text-white shadow-md font-semibold"
                  : "bg-white text-[#1A3429] hover:bg-[#EAE3D5] border border-[#DFD7C7]"
              }`}
            >
              0{idx + 1}. {exp.category}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Storytelling Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F4] rounded-3xl p-6 sm:p-10 border border-[#DFD7C7] shadow-xl shadow-black/5">
        {/* Photographic Story Card (7 cols) */}
        <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg group">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F231B] via-[#0F231B]/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#173428]/90 text-white backdrop-blur-md border border-[#D6AD72]/40">
              {current.category}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#D6AD72] text-[#173428] shadow-sm">
              Mức độ: {current.intensity}
            </span>
          </div>

          {/* Bottom Card Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xs text-[#D6AD72] font-semibold tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {current.location}
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal leading-tight">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light mt-1">
              {current.tagline}
            </p>
          </div>
        </div>

        {/* Narrative & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#769477] font-bold uppercase tracking-widest mb-2">
              <Footprints className="w-4 h-4 text-[#D6AD72]" /> Trải Nghiệm Điển Hình
            </div>
            <h4 className="text-2xl sm:text-3xl font-serif text-[#1A3429] font-normal leading-tight">
              {current.title}
            </h4>
            <p className="text-xs text-[#5A6D63] font-serif italic mt-1">
              "{current.tagline}"
            </p>
          </div>

          <p className="text-sm text-[#1A3429]/90 font-light leading-relaxed">
            {current.description}
          </p>

          {/* Practical Info Pill Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white border border-[#DFD7C7]">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#244B3B] mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-[#769477] tracking-wider">
                  Thời Lượng
                </p>
                <p className="text-xs font-semibold text-[#1A3429] mt-0.5">
                  {current.duration}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Sun className="w-4 h-4 text-[#D6AD72] mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-[#769477] tracking-wider">
                  Thời Điểm Vàng
                </p>
                <p className="text-xs font-semibold text-[#1A3429] mt-0.5">
                  {current.bestTime}
                </p>
              </div>
            </div>
          </div>

          {/* Tips Checklist */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#5A6D63] mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" /> Mẹo Trải Nghiệm Đắt Giá
            </p>
            <div className="space-y-2">
              {current.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-[#1A3429]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#769477] flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            asChild
            className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs gap-2 shadow-md w-full sm:w-auto"
          >
            <a href="#lich-trinh">
              Xem Lịch Trình Tương Thích
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
