import { useState } from "react";
import {
  ArrowUp,
  Camera,
  Compass,
  Heart,
  Mail,
  Sparkles,
} from "lucide-react";
import { ImageCreditsModal } from "./ImageCreditsModal";

export function FooterSection() {
  const [showCredits, setShowCredits] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F231B] text-[#FAF8F4] pt-20 pb-10 border-t border-[#D6AD72]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#244B3B] to-[#D6AD72] p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#173428] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#D6AD72]" />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl tracking-wide font-normal leading-tight text-white">
                  NinhBinh<span className="text-[#D6AD72] font-semibold">Travel</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-[#FAF8F4]/60">
                  Di Sản & Non Nước Hữu Tình
                </span>
              </div>
            </div>

            <p className="text-xs text-white/75 font-light leading-relaxed max-w-sm">
              Ứng dụng khám phá du lịch và ẩm thực Ninh Bình — Tôn vinh vẻ đẹp nguyên sơ của di sản thế giới Tràng An, nét trầm mặc cố đô Hoa Lư và tinh hoa văn hóa đất Bắc.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-[#D6AD72]">
              <Sparkles className="w-4 h-4" />
              <span>Sản phẩm tham gia Cuộc thi Xây dựng Mini App bằng AI</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D6AD72]">
              Khám Phá
            </p>
            <ul className="space-y-2 text-xs text-white/80 font-light">
              <li>
                <a href="#diem-den" className="hover:text-[#D6AD72] transition-colors">
                  Điểm đến nổi bật
                </a>
              </li>
              <li>
                <a href="#am-thuc" className="hover:text-[#D6AD72] transition-colors">
                  Tạp chí ẩm thực
                </a>
              </li>
              <li>
                <a href="#trai-nghiem" className="hover:text-[#D6AD72] transition-colors">
                  Trải nghiệm đặc trưng
                </a>
              </li>
              <li>
                <a href="#ban-do" className="hover:text-[#D6AD72] transition-colors">
                  Bản đồ trực quan
                </a>
              </li>
              <li>
                <a href="#lich-trinh" className="hover:text-[#D6AD72] transition-colors">
                  Gợi ý lịch trình
                </a>
              </li>
            </ul>
          </div>

          {/* Highlights (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D6AD72]">
              Danh Thắng
            </p>
            <ul className="space-y-2 text-xs text-white/80 font-light">
              <li>
                <a href="#diem-den" className="hover:text-[#D6AD72] transition-colors">
                  Quần thể Tràng An
                </a>
              </li>
              <li>
                <a href="#diem-den" className="hover:text-[#D6AD72] transition-colors">
                  Tam Cốc – Bích Động
                </a>
              </li>
              <li>
                <a href="#diem-den" className="hover:text-[#D6AD72] transition-colors">
                  Đỉnh Núi Hang Múa
                </a>
              </li>
              <li>
                <a href="#diem-den" className="hover:text-[#D6AD72] transition-colors">
                  Cố Đô Hoa Lư
                </a>
              </li>
              <li>
                <a href="#diem-den" className="hover:text-[#D6AD72] transition-colors">
                  Đầm Vân Long
                </a>
              </li>
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D6AD72]">
              Liên Hệ
            </p>
            <div className="text-xs text-white/80 font-light">
              <a
                href="mailto:congvanvu0000@gmail.com"
                className="inline-flex items-center gap-2 text-white/90 hover:text-[#D6AD72] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D6AD72] flex-shrink-0" />
                <span>congvanvu0000@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 NinhBinhTravel. Bản quyền thuộc về Đội thi Mini App AI.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => setShowCredits(true)}
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-[#D6AD72] underline transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#D6AD72]" />
              <span>Ghi công bản quyền ảnh & video (Credits)</span>
            </button>
            <span className="hidden md:inline">Thiết kế theo chuẩn Luxury Editorial Travel</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-[#D6AD72] hover:text-[#173428] text-white transition-all flex items-center gap-1.5"
              aria-label="Về đầu trang"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] font-sans">Lên đầu trang</span>
            </button>
          </div>
        </div>

        {/* Image Credits Modal */}
        <ImageCreditsModal open={showCredits} onOpenChange={setShowCredits} />
      </div>
    </footer>
  );
}
