import { Calendar, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whyChooseNinhBinh } from "@/data/ninh-binh";

interface WhyChooseSectionProps {
  onExplore?: () => void;
}

export function WhyChooseSection({ onExplore }: WhyChooseSectionProps) {
  return (
    <section className="py-20 bg-[#FAF8F4] border-b border-[#DFD7C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner callout */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#173428] via-[#244B3B] to-[#173428] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D6AD72]/40">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D6AD72] text-[#173428]">
              <Sparkles className="w-3.5 h-3.5" />
              Vịnh Hạ Long Trên Cạn
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal">
              Non Nước Hữu Tình · Di Sản Thế Giới · Đặc Sản Khó Quên
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light max-w-2xl">
              Chỉ cách Hà Nội khoảng 93–100 km, Ninh Bình mở ra một thế giới khác: núi đá vôi trùng điệp, dòng sông lặng lờ, hang động huyền ảo và nghìn năm lịch sử cố đô.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <Button
              asChild
              className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-xs sm:text-sm px-6 py-5 rounded-full shadow-lg shadow-[#D6AD72]/20 gap-2 cursor-pointer"
            >
              <a href="#diem-den">
                <Compass className="w-4 h-4" />
                KHÁM PHÁ CÁC ĐỊA DANH
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs sm:text-sm px-5 py-5 rounded-full gap-2 cursor-pointer"
            >
              <a href="#lich-trinh">
                <Calendar className="w-4 h-4 text-[#D6AD72]" />
                XEM LỊCH TRÌNH GỢI Ý
              </a>
            </Button>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-2">
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
            <span>TẠI SAO DU KHÁCH YÊU MẾN NINH BÌNH?</span>
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-[#1A3429]">
            Vì Sao Chọn{" "}
            <span className="italic font-serif text-[#244B3B] font-normal">
              Ninh Bình?
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6D63] font-light">
            Sự kết hợp hoàn hảo hiếm có giữa kỳ quan địa chất triệu năm, bề dày lịch sử vàng son và ẩm thực dân dã đậm đà.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseNinhBinh.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#DFD7C7] hover:border-[#D6AD72] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md group"
            >
              <div className="text-4xl mb-4 p-3 w-16 h-16 rounded-2xl bg-[#F5F1E8] group-hover:bg-[#244B3B] transition-colors flex items-center justify-center">
                <span>{item.icon}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1A3429] group-hover:text-[#244B3B] transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6D63] font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
