import { signatureExperiences } from "@/data/ninh-binh";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignatureExperiencesSection() {
  return (
    <section className="py-20 bg-[#FAF8F4] border-b border-[#DFD7C7]" id="signature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-2">
              <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
              <span>TRẢI NGHIỆM ĐẶC QUYỀN CỐ ĐÔ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-[#1A3429]">
              5 Trải Nghiệm{" "}
              <span className="italic font-serif text-[#244B3B] font-normal">
                Signature.
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6D63] max-w-xl font-light">
              Năm khoảnh khắc tinh túy nhất làm nên linh hồn du lịch Ninh Bình, nơi bạn chạm vào ba lớp thời gian: thiên nhiên triệu năm, cố đô nghìn năm và hương vị hôm nay.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-[#244B3B] text-[#244B3B] hover:bg-[#F5F1E8] text-xs gap-1.5 self-start md:self-auto"
          >
            <a href="#diem-den">
              Khám Phá Các Địa Danh
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {signatureExperiences.map((sig) => (
            <div
              key={sig.id}
              className="p-5 rounded-2xl bg-white border border-[#DFD7C7] hover:border-[#D6AD72] hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-serif font-bold text-[#D6AD72] group-hover:scale-110 transition-transform">
                    {sig.number}
                  </span>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAE3D5] text-[#244B3B]">
                    {sig.badge}
                  </span>
                </div>

                <h3 className="font-serif text-base font-semibold text-[#1A3429] mb-1 leading-snug group-hover:text-[#244B3B] transition-colors">
                  {sig.title}
                </h3>
                <p className="text-[11px] font-serif italic text-[#769477] mb-3">
                  {sig.tagline}
                </p>

                <p className="text-xs text-[#5A6D63] font-light leading-relaxed">
                  {sig.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#DFD7C7]/60 flex items-center justify-between text-xs text-[#244B3B] font-medium">
                <span className="text-[11px] text-[#769477]">Điểm nhấn hàng đầu</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
