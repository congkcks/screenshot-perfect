import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Compass,
  Headphones,
  MapPin,
  Search,
  Sparkles,
  SunMedium,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import trangAnImage from "@/assets/ninh-binh-trang-an.jpg";
import muaCaveImage from "@/assets/mua-cave-view.jpg";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onQuickFilter: (term: string) => void;
}

const heroSlides = [
  {
    id: "trang-an",
    title: "Tràng An",
    caption: "QUẦN THỂ DANH THẮNG TRÀNG AN",
    heritage: "DI SẢN VĂN HÓA & THIÊN NHIÊN THẾ GIỚI UNESCO",
    image: "/images/01-hero/hero-01-toan-canh.webp",
    fallback: trangAnImage,
    quote: "Ngồi thuyền nan, chui qua hang đá, nghe lịch sử nghìn năm thì thầm.",
  },
  {
    id: "hang-mua",
    title: "Hang Múa",
    caption: "ĐỈNH NGỌA LONG SƠN",
    heritage: "TẦM NHÌN 360° TOÀN CẢNH CỐ ĐÔ",
    image: "/images/04-hang-mua/hang-mua-01-tuong-rong-dinh-nui.webp",
    fallback: muaCaveImage,
    quote: "Một chuyến đi, ba lớp thời gian: thiên nhiên triệu năm, cố đô nghìn năm và bữa ăn đậm vị hôm nay.",
  },
  {
    id: "tam-coc",
    title: "Tam Cốc",
    caption: "NAM THIÊN ĐỆ NHỊ ĐỘNG",
    heritage: "SẮC VÀNG DÒNG NGÔ ĐỒNG UỐN LƯỢN",
    image: "/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp",
    fallback: trangAnImage,
    quote: "Thuyền nan lướt giữa thảm lúa vàng ươm, tiếng mái chèo khua rộn rã vách núi tai mèo.",
  },
  {
    id: "van-long",
    title: "Vân Long",
    caption: "VỊNH KHÔNG SÓNG & RAMSAR THẾ GIỚI",
    heritage: "VƯƠNG QUỐC VOỌC MÔNG TRẮNG QUÝ HIẾM",
    image: "/images/07-thung-nham-van-long/van-long-01-thuyen-hoang-hon.webp",
    fallback: trangAnImage,
    quote: "Vịnh không sóng, nơi đàn voọc và ngàn cánh cò trắng làm chủ giữa ráng chiều thủy mặc.",
  },
];

export function HeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onQuickFilter,
}: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideImages, setSlideImages] = useState<string[]>(
    heroSlides.map((s) => s.image)
  );

  // Auto slide change every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[activeSlide] ?? heroSlides[0]!;

  return (
    <section
      id="trang-chu"
      aria-label="Khám phá Ninh Bình"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#0F231B] text-white pt-20 pb-16 scroll-mt-24"
    >
      {/* Cinematic Background Images with Crossfade */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slideImages[idx]}
            alt={slide.caption}
            className="w-full h-full object-cover object-center animate-kenburns"
            fetchPriority={idx === 0 ? "high" : "auto"}
            onError={() => {
              setSlideImages((prev) => {
                const next = [...prev];
                next[idx] = slide.fallback;
                return next;
              });
            }}
          />
        </div>
      ))}

      {/* Luxury Vignette & Gradient Overlays */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0F231B] via-[#0F231B]/45 to-[#0F231B]/70" />
      <div className="absolute inset-0 z-20 bg-radial-vignette opacity-60" />

      {/* Main Content Hero Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center my-auto">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D6AD72]/40 text-[#D6AD72] text-xs font-semibold uppercase tracking-widest mb-6 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" />
          <span>{current.heritage}</span>
        </div>

        {/* Master Heading */}
        <div className="space-y-1 mb-5">
          <p className="text-sm sm:text-base font-light tracking-[0.35em] uppercase text-white/80">
            Hành Trình Di Sản
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial-heading font-medium tracking-tight text-white leading-none">
            DISCOVER{" "}
            <span className="italic text-[#D6AD72] font-serif block sm:inline-block">
              NINH BÌNH
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-light font-serif text-[#FAF8F4]/90 pt-1">
            Chạm Vào Vẻ Đẹp Ngàn Năm
          </p>
        </div>

        {/* Emotional Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base text-white/85 font-light leading-relaxed mb-8 mx-auto drop-shadow-sm">
          {current.quote} Nơi non xanh nước biếc giao hòa cùng trầm tích cố đô ngàn thu.
          Bắt đầu chuyến hành trình thượng lưu khó quên.
        </p>

        {/* Realtime Weather & Best Season Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-white/90 mb-8 bg-black/30 backdrop-blur-md py-1.5 px-4 rounded-full border border-white/15">
          <span className="flex items-center gap-1.5 text-[#D6AD72] font-medium">
            <SunMedium className="w-4 h-4 text-amber-300" />
            Ninh Bình 24°C • Nắng nhẹ (dữ liệu mẫu)
          </span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Mùa đẹp nhất: Tháng 5 - Tháng 6 (Lúa vàng) & Tháng 1 - 3 (Lễ hội)</span>
        </div>

        {/* Luxury Search Bar */}
        <div className="w-full max-w-2xl mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/ban-do?q=${encodeURIComponent(searchQuery.trim())}`;
              } else {
                onSearchSubmit(e);
              }
            }}
            className="relative flex items-center p-2 rounded-2xl bg-[#173428]/85 backdrop-blur-xl border border-[#D6AD72]/40 shadow-2xl shadow-black/40 group focus-within:border-[#D6AD72] transition-all"
          >
            <div className="pl-3 sm:pl-4 pr-2 text-[#D6AD72]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Bạn muốn khám phá nơi nào? (Tràng An, Hang Múa, Dê núi...)"
              className="w-full bg-transparent border-none text-white placeholder-white/50 text-sm sm:text-base focus:outline-none focus:ring-0 py-2.5 font-light"
            />
            <Button
              type="submit"
              className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              Tìm Kiếm
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          {/* Popular Searches: direct link to /ban-do?q=... */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-xs text-white/80">
            <span className="text-white/50 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#D6AD72]" />
              Tìm kiếm phổ biến:
            </span>
            {["Tràng An", "Hang Múa", "Tam Cốc", "Dê núi", "Cơm cháy", "Bái Đính", "Cúc Phương"].map(
              (term) => (
                <Link
                  key={term}
                  to="/ban-do"
                  search={{ q: term }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#D6AD72] hover:text-[#173428] border border-white/15 text-white/90 text-[11px] transition-all inline-block"
                >
                  {term}
                </Link>
              )
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
          <Button
            asChild
            size="lg"
            className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-sm px-7 py-6 rounded-full shadow-xl shadow-[#D6AD72]/30 transition-all hover:scale-105"
          >
            <a href="#diem-den">
              Khám Phá Các Địa Danh
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md font-semibold text-sm px-6 py-6 rounded-full transition-all"
          >
            <a href="#lich-trinh">
              Xem Lịch Trình Gợi Ý
            </a>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-white/80 hover:text-white hover:bg-white/10 text-sm px-5 py-6 rounded-full transition-all"
          >
            <a href="#kham-pha">
              Về Vùng Đất Cố Đô
              <ArrowDown className="w-4 h-4 ml-1.5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Cinematic Slide Selector Tabs (Bottom Left) — Khắc phục mép cắt và tạo lối vào Tham Quan Ảo */}
      <div className="absolute bottom-6 left-4 sm:left-8 z-30 hidden md:flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 shadow-2xl max-w-[calc(100vw-5rem)] overflow-x-auto">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#D6AD72] pl-1 pr-1 shrink-0 flex items-center gap-1">
          <Headphones className="w-3 h-3 text-[#D6AD72]" />
          Tour ảo:
        </span>
        {heroSlides.map((slide, idx) => (
          <div key={slide.id} className="flex items-center shrink-0">
            <Link
              to="/ban-do"
              search={{ diem: slide.id, tour: "1" }}
              title={`Khám phá tham quan ảo 360° ${slide.title}`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                idx === activeSlide
                  ? "bg-[#D6AD72] text-[#173428] font-bold shadow-md"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              <span>
                0{idx + 1}. {slide.title}
              </span>
              <Headphones className="w-2.5 h-2.5 opacity-80" />
            </Link>
          </div>
        ))}
      </div>

      {/* Scroll Down Cue (Bottom Center/Right) */}
      <a
        href="#diem-den"
        aria-label="Cuộn xuống khám phá"
        className="absolute bottom-6 right-4 sm:right-8 z-30 flex items-center gap-3 text-xs uppercase tracking-widest text-white/70 hover:text-[#D6AD72] transition-colors group"
      >
        <span className="hidden sm:inline font-light">Cuộn để khám phá</span>
        <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#D6AD72] group-hover:bg-[#D6AD72]/10 transition-all">
          <ArrowDown className="w-4 h-4 animate-bounce text-[#D6AD72]" />
        </div>
      </a>
    </section>
  );
}
