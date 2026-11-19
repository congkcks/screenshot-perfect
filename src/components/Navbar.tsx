import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Compass,
  Heart,
  Menu,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  ArrowRight,
  MapPin,
  UtensilsCrossed,
  Calendar,
  Layers,
  Calculator,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleNatureAudio, isNatureAudioPlaying } from "@/lib/nature-audio";
import { toast } from "sonner";
import { BLOG_PILLARS } from "@/data/blog";

interface NavbarProps {
  savedCount: number;
  onOpenWishlist: () => void;
}

export function Navbar({ savedCount, onOpenWishlist }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = toggleNatureAudio();
    setIsPlayingAudio(active);
    if (active) {
      toast.success("Đang phát âm thanh thiên nhiên Ninh Bình (tiếng suối Tràng An & chuông gió thanh tịnh)", {
        duration: 3500,
      });
    } else {
      toast.info("Đã tắt âm thanh thiên nhiên");
    }
  };

  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);

  const resolveHref = (href: string) => {
    if (href.startsWith("#")) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        return `/${href}`;
      }
    }
    return href;
  };

  const navLinks = [
    { label: "Điểm Đến", href: "#diem-den", icon: MapPin },
    { label: "Theo Vùng", href: "#vung-mien", icon: Layers },
    { label: "Ẩm Thực", href: "#am-thuc", icon: UtensilsCrossed },
    { label: "Lịch Trình", href: "#lich-trinh", icon: Calendar },
    { label: "Lên Kế Hoạch", href: "#len-ke-hoach", icon: Calculator },
    { label: "Cẩm Nang", href: "#cam-nang", icon: Sparkles },
    { label: "Khám Phá", href: "#kham-pha", icon: Compass },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#173428]/90 backdrop-blur-md border-b border-[#D6AD72]/20 py-3.5 shadow-lg shadow-black/10"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href={resolveHref("#trang-chu")}
            className="flex items-center gap-2.5 group text-white text-decoration-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#244B3B] to-[#D6AD72] p-0.5 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <div className="w-full h-full rounded-full bg-[#173428] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#D6AD72]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-wide font-normal leading-tight">
                NinhBinh<span className="text-[#D6AD72] font-semibold">Travel</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#FAF8F4]/70 font-sans -mt-0.5">
                Di Sản & Non Nước
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
            {/* Nhóm menu điều hướng chính */}
            <nav className="flex items-center gap-2 lg:gap-3 xl:gap-5" aria-label="Điều hướng chính">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={resolveHref(item.href)}
                  className="text-[11px] lg:text-xs uppercase tracking-wider text-white/90 hover:text-[#D6AD72] transition-colors font-medium relative group py-1 whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D6AD72] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Đường phân cách dọc ngăn cách Tạp Chí */}
            <div
              className="h-4.5 w-[1px] bg-white/20"
              aria-hidden="true"
            />

            {/* Khu vực độc lập: Dropdown Menu Tạp Chí Blog */}
            <div
              className="relative group py-1 shrink-0"
              onMouseEnter={() => setIsBlogDropdownOpen(true)}
              onMouseLeave={() => setIsBlogDropdownOpen(false)}
            >
              <Link
                to="/blog"
                className="text-[11px] lg:text-xs uppercase tracking-wider text-[#D6AD72] hover:text-[#E7C99B] font-semibold flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#D6AD72]/40 shadow-xs"
                aria-haspopup="true"
                aria-expanded={isBlogDropdownOpen}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Tạp Chí</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Dropdown Content */}
              {isBlogDropdownOpen && (
                <div className="absolute top-full right-0 lg:left-1/2 lg:-translate-x-1/2 pt-2 w-64 z-50 animate-in fade-in zoom-in-95">
                  <div className="bg-[#173428]/95 backdrop-blur-xl border border-[#D6AD72]/30 rounded-2xl p-2.5 shadow-2xl space-y-1">
                    <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#D6AD72]">
                      5 Trụ Cột Kể Chuyện
                    </div>
                    {Object.values(BLOG_PILLARS).map((pillar) => (
                      <Link
                        key={pillar.id}
                        to="/blog"
                        className="block px-3 py-1.5 rounded-lg text-xs text-white/90 hover:text-[#D6AD72] hover:bg-white/10 transition-colors"
                      >
                        {pillar.name}
                      </Link>
                    ))}
                    <div className="pt-1.5 border-t border-white/10">
                      <Link
                        to="/blog"
                        className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold text-[#D6AD72] hover:bg-white/10 transition-colors"
                      >
                        <span>Trọn bộ 20 bài viết</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions: Sound, Wishlist, CTA, Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Nature Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`p-2 rounded-full backdrop-blur-md transition-all text-xs flex items-center gap-1.5 border ${
                isPlayingAudio
                  ? "bg-[#D6AD72]/20 border-[#D6AD72] text-[#D6AD72] animate-pulse-subtle"
                  : "bg-white/10 border-white/20 text-white/80 hover:text-white hover:bg-white/20"
              }`}
              title={isPlayingAudio ? "Tắt âm thanh thiên nhiên" : "Bật âm thanh suối rừng Ninh Bình"}
              aria-label="Âm thanh thiên nhiên"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#D6AD72]" />
                  <span className="hidden xl:inline text-[11px] font-sans pr-1">Âm thanh Tràng An</span>
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-3 bg-[#D6AD72] animate-bounce" />
                    <span className="w-0.5 h-2 bg-[#D6AD72] animate-bounce delay-75" />
                    <span className="w-0.5 h-3.5 bg-[#D6AD72] animate-bounce delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden xl:inline text-[11px] font-sans pr-1">Âm thanh Tràng An</span>
                </>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              aria-label="Xem điểm đến đã lưu"
            >
              <Heart className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D6AD72] text-[#173428] font-bold text-[10px] flex items-center justify-center shadow-sm">
                  {savedCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-xs tracking-wide px-3.5 lg:px-4 rounded-full shadow-lg shadow-[#D6AD72]/20 transition-all hover:scale-105"
            >
              <a href="#diem-den">
                Khám Phá Ngay
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#173428]/95 backdrop-blur-xl md:hidden flex flex-col pt-24 pb-8 px-6 text-white overflow-y-auto">
          <div className="space-y-4 flex-1">
            <p className="text-xs uppercase tracking-widest text-[#D6AD72] font-semibold">
              Khám Phá Ninh Bình
            </p>
            <div className="divide-y divide-white/10">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={resolveHref(item.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-base font-serif text-white hover:text-[#D6AD72] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#D6AD72]" />
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/40" />
                  </a>
                );
              })}
            </div>

            {/* Khu vực độc lập Tạp Chí trên Mobile */}
            <div className="pt-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-[#D6AD72]/30 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#D6AD72]">
                  <span>Chuyên Mục Độc Lập</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#D6AD72]/20 text-[#D6AD72] text-[9px]">
                    20 Bài Viết
                  </span>
                </div>
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-1 text-base font-serif text-white hover:text-[#D6AD72] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#D6AD72]" />
                    Tạp Chí & Kể Chuyện Di Sản
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#D6AD72]" />
                </Link>
                <p className="text-xs text-stone-300 font-sans">
                  5 trụ cột di sản, lễ hội cổ truyền, mỹ vị dê núi và cẩm nang khám phá bốn mùa.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWishlist();
              }}
              variant="outline"
              className="w-full border-[#D6AD72]/40 text-[#D6AD72] hover:bg-[#D6AD72]/10 justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Điểm Đến Đã Lưu ({savedCount})
            </Button>

            <Button
              asChild
              className="w-full bg-[#D6AD72] text-[#173428] hover:bg-[#E7C99B] font-semibold justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <a href="#diem-den">
                Bắt Đầu Hành Trình
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
