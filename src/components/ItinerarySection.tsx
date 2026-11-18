import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Compass,
  Lightbulb,
  MapPin,
  Moon,
  Mountain,
  Navigation,
  Ship,
  Sparkles,
  Sun,
  Trees,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { itineraries, type Itinerary } from "@/data/ninh-binh";

export function ItinerarySection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const current = itineraries[activeTab] ?? itineraries[0]!;

  const getStepIcon = (type: string) => {
    switch (type) {
      case "mountain":
        return <Mountain className="w-4 h-4 text-[#D6AD72]" />;
      case "boat":
        return <Ship className="w-4 h-4 text-[#769477]" />;
      case "food":
        return <UtensilsCrossed className="w-4 h-4 text-amber-500" />;
      case "tree":
        return <Trees className="w-4 h-4 text-[#244B3B]" />;
      case "moon":
        return <Moon className="w-4 h-4 text-indigo-400" />;
      case "sun":
      default:
        return <Sun className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section
      id="lich-trinh"
      className="py-24 bg-[#EAE3D5]/40 border-t border-[#DFD7C7]"
      aria-labelledby="itinerary-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-3">
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
            <span>GỢI Ý HÀNH TRÌNH CHUẨN XÁC</span>
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
          </div>
          <h2
            id="itinerary-title"
            className="text-4xl sm:text-5xl md:text-6xl font-editorial-heading text-[#1A3429]"
          >
            Chọn Chuyến Đi{" "}
            <span className="italic font-serif text-[#244B3B] font-normal block sm:inline">
              Của Bạn.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A6D63] font-light leading-relaxed">
            Mỗi hành trình được thiết kế tỉ mỉ theo từng mốc thời gian thực tế, tối ưu cung đường di chuyển và đảm bảo bạn tận hưởng trọn vẹn từng khoảnh khắc đắt giá nhất.
          </p>
        </div>

        {/* 3 Itinerary Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {itineraries.map((itin, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={itin.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2.5 border ${
                  isActive
                    ? "bg-[#244B3B] text-white border-[#244B3B] shadow-lg shadow-[#244B3B]/20 font-semibold scale-105"
                    : "bg-white text-[#1A3429] hover:bg-[#FAF8F4] border-[#DFD7C7]"
                }`}
              >
                <Calendar className={`w-4 h-4 ${isActive ? "text-[#D6AD72]" : "text-[#769477]"}`} />
                <span>{itin.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-[#D6AD72]" : "bg-[#F5F1E8] text-[#5A6D63]"
                  }`}
                >
                  {itin.duration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Itinerary Story & Practical Info Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DFD7C7] shadow-xl shadow-black/5 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-[#DFD7C7]">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#769477]">
                Hành Trình Tuyển Chọn
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A3429] mt-1 font-normal">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D6AD72] font-serif italic mt-0.5">
                {current.subtitle}
              </p>
              <p className="text-xs text-[#5A6D63] mt-3 font-light leading-relaxed flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#244B3B] flex-shrink-0" />
                <span><strong>Tuyến đường:</strong> {current.highlightRoute}</span>
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#DFD7C7]/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#769477] mb-1">
                  <Users className="w-4 h-4 text-[#244B3B]" />
                  Phù Hợp Cho
                </div>
                <p className="text-xs text-[#1A3429] font-medium leading-snug">
                  {current.targetAudience}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#DFD7C7]/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#769477] mb-1">
                  <Coins className="w-4 h-4 text-[#D6AD72]" />
                  Chi Phí Dự Kiến
                </div>
                <p className="text-xs text-[#1A3429] font-semibold leading-snug text-[#244B3B]">
                  {current.estimatedBudget}
                </p>
              </div>
            </div>
          </div>

          {/* Modern Timeline Flow */}
          <div className="pt-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#769477] mb-8 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D6AD72]" /> Dòng Thời Gian Chi Tiết
            </h4>

            <div className="relative border-l-2 border-[#D6AD72]/40 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
              {current.timeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Icon Circle */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#173428] border-2 border-[#D6AD72] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    {getStepIcon(step.iconType)}
                  </div>

                  {/* Step Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F4] border border-[#DFD7C7] hover:border-[#D6AD72] transition-all shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#244B3B] text-white">
                        {step.time}
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${step.place} Ninh Bình`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#769477] hover:text-[#244B3B] font-medium flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3 text-[#D6AD72]" />
                        Xem trên bản đồ
                      </a>
                    </div>
                    <h5 className="font-serif text-base sm:text-lg font-semibold text-[#1A3429] mb-1">
                      {step.place}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#5A6D63] font-light leading-relaxed">
                      {step.activity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insider Advice Note */}
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-[#FAF8F4] border border-[#D6AD72]/50 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-[#D6AD72]/20 text-[#173428] flex-shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5 text-[#B88E52]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#244B3B]">
                Lời Khuyên Từ Thổ Địa Ninh Bình
              </p>
              <p className="text-xs text-[#1A3429]/90 mt-1 leading-relaxed">
                {current.insiderAdvice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
