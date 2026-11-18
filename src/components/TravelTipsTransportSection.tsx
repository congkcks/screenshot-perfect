import { Car, Compass, Info, Lightbulb, MapPin, Navigation, ShieldAlert, Sparkles } from "lucide-react";
import { travelTipsList, transportGuide } from "@/data/ninh-binh";

export function TravelTipsTransportSection() {
  return (
    <section className="py-24 bg-[#EAE3D5]/30 border-b border-[#DFD7C7]" id="cam-nang">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-2">
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
            <span>KINH NGHIỆM THỰC TẾ & DI CHUYỂN</span>
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-[#1A3429]">
            Mẹo Nhỏ Cho Chuyến Đi{" "}
            <span className="italic font-serif text-[#244B3B] font-normal">
              Trọn Vẹn.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6D63] font-light">
            Những lưu ý thiết thực từ kinh nghiệm của người bản địa giúp bạn có một hành trình suôn sẻ, an toàn và lưu giữ nhiều kỷ niệm đẹp.
          </p>
        </div>

        {/* 6 Travel Tips Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {travelTipsList.map((tip, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#DFD7C7] hover:border-[#D6AD72] transition-all duration-300 shadow-sm flex items-start gap-4"
            >
              <span className="text-3xl p-2.5 rounded-xl bg-[#FAF8F4] flex-shrink-0">
                {tip.icon}
              </span>
              <div>
                <h4 className="font-serif text-base font-semibold text-[#1A3429] mb-1">
                  {tip.title}
                </h4>
                <p className="text-xs text-[#5A6D63] font-light leading-relaxed">
                  {tip.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transportation Guide Card */}
        <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-10 border border-[#DFD7C7] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#244B3B] text-white">
                <Car className="w-3.5 h-3.5 text-[#D6AD72]" />
                Di Chuyển Đến Ninh Bình
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A3429]">
                Chỉ Cách Hà Nội ~100 km
              </h3>
              <p className="text-xs text-[#5A6D63] font-light leading-relaxed">
                Khoảng cách lý tưởng cho kỳ nghỉ cuối tuần. Giao thông hiện đại kết nối nhanh chóng từ khắp các tỉnh thành.
              </p>
              <div className="p-3 rounded-xl bg-white border border-[#DFD7C7] space-y-1">
                <p className="text-xs font-semibold text-[#1A3429]">
                  Thời gian di chuyển:
                </p>
                <p className="text-xs text-[#769477]">{transportGuide.time}</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#769477] mb-2 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-[#D6AD72]" /> Các Tuyến Đường Cao Tốc Huyết Mạch
                </p>
                <div className="space-y-2">
                  {transportGuide.expressways.map((exp, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-[#DFD7C7] text-xs text-[#1A3429] flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#244B3B]" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D6AD72]/40">
                <p className="text-xs font-bold uppercase tracking-wider text-[#244B3B] mb-1">
                  Phương tiện di chuyển tại điểm đến:
                </p>
                <p className="text-xs text-[#5A6D63] leading-relaxed">
                  {transportGuide.localTransport}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
