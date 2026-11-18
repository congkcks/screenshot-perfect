import { craftVillages } from "@/data/ninh-binh";
import { Compass, Hammer, MapPin, Sparkles } from "lucide-react";

export function CraftCultureSection() {
  return (
    <section className="py-20 bg-[#FAF8F4] border-b border-[#DFD7C7]" id="lang-nghe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-2">
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
            <span>CHIỀU SÂU VĂN HÓA CỐ ĐÔ</span>
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-[#1A3429]">
            Làng Nghề & Di Sản{" "}
            <span className="italic font-serif text-[#244B3B] font-normal">
              Dân Gian.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6D63] font-light">
            Không chỉ có danh lam thắng cảnh, Ninh Bình còn lưu giữ tinh hoa bàn tay khéo léo của các nghệ nhân làng nghề truyền thống hàng trăm năm tuổi.
          </p>
        </div>

        {/* 5 Craft Villages & Culture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {craftVillages.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-[#DFD7C7] hover:border-[#D6AD72] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#769477]">
                    <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" />
                    {item.location}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAE3D5] text-[#244B3B]">
                    Làng Nghề
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#1A3429] mb-1">
                  {item.name}
                </h3>
                <p className="text-xs font-serif italic text-[#D6AD72] mb-3">
                  {item.heritage}
                </p>

                <p className="text-xs text-[#5A6D63] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#DFD7C7]/60 flex items-center gap-2 text-xs text-[#244B3B]">
                <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" />
                <span className="text-[11px]">Trải nghiệm văn hóa nên ghé thăm</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
