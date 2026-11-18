import { useState } from "react";
import {
  Compass,
  MapPin,
  Sparkles,
  Mountain,
  Landmark,
  HeartHandshake,
  UtensilsCrossed,
  ArrowRight,
  Eye,
  Camera,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations, type Destination } from "@/data/ninh-binh";

interface ShowcaseLocation {
  id: string;
  tabLabel: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  image: string;
  fallbackImage: string;
  stats: string;
}

const showcaseList: ShowcaseLocation[] = [
  {
    id: "trang-an",
    tabLabel: "Tràng An",
    name: "Quần thể danh thắng Tràng An",
    tagline: "Trái tim di sản văn hóa & thiên nhiên thế giới UNESCO",
    description:
      "Vùng lõi di sản với 31 đầm nước nối thông bởi 48 hang ngầm. Ngồi thuyền nan lướt êm trên làn nước trong vắt soi thấu đáy rong rêu giữa thung lũng đá vôi triệu năm kiến tạo.",
    badge: "UNESCO World Heritage",
    image: "/images/02-trang-an/trang-an-02-toan-canh-song-nui.webp",
    fallbackImage: "/images/02-trang-an/trang-an-01-thuyen-xuyen-hang.webp",
    stats: "31 đầm nước · 48 hang động xuyên thủy",
  },
  {
    id: "tam-coc",
    tabLabel: "Tam Cốc",
    name: "Tam Cốc – Bích Động",
    tagline: "Vịnh Hạ Long trên cạn bên dòng Ngô Đồng uốn lượn",
    description:
      "Dòng sông thơ mộng xuyên qua Hang Cả, Hang Hai, Hang Ba. Mỗi độ tháng 5 – 6, hai bên bờ rực rỡ dải lúa chín vàng óng ả nép mình dưới chân những dãy núi đá uy nghiêm.",
    badge: "Nam Thiên Đệ Nhị Động",
    image: "/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp",
    fallbackImage: "/images/03-tam-coc-bich-dong/tam-coc-02-lua-chin-vang.webp",
    stats: "3 hang ngầm · Dòng sông lúa chín vàng",
  },
  {
    id: "hang-mua",
    tabLabel: "Hang Múa",
    name: "Hang Múa – Đỉnh Ngọa Long",
    tagline: "Triệu view từ đỉnh rồng đá ngắm trọn thung lũng Tam Cốc",
    description:
      "Chinh phục cung đường 486 bậc đá trắng uốn lượn tựa vạn lý trường thành thu nhỏ. Từ đỉnh núi Ngọa Long, toàn cảnh sông núi Ninh Bình mở ra kỳ vĩ tựa bức tranh thủy mặc.",
    badge: "Toàn Cảnh Triệu View",
    image: "/images/04-hang-mua/hang-mua-01-tuong-rong-dinh-nui.webp",
    fallbackImage: "/images/04-hang-mua/hang-mua-02-bac-da-van-ly-truong-thanh.webp",
    stats: "486 bậc đá · Tầm nhìn 360° sông núi",
  },
];

export function TourBookingSection({
  onSelectDestination,
}: {
  onSelectDestination?: (dest: Destination) => void;
}) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentShowcase = showcaseList[activeTab] ?? showcaseList[0]!;

  const handleOpenShowcaseModal = () => {
    if (!onSelectDestination) return;
    const dest = destinations.find((d) => d.id === currentShowcase.id);
    if (dest) {
      onSelectDestination(dest);
    }
  };

  return (
    <section
      className="py-24 bg-[#0F231B] text-white relative overflow-hidden"
      id="kham-pha-ninh-binh"
      aria-labelledby="heritage-intro-title"
    >
      {/* Anchor alias to ensure old links scroll smoothly without 404 */}
      <span id="dat-tour" className="sr-only" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D6AD72]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#244B3B]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Heritage Storytelling (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D6AD72] text-[#173428]">
              <Sparkles className="w-3.5 h-3.5" />
              Quảng Bá & Tôn Vinh Di Sản Địa Phương
            </div>

            <h2
              id="heritage-intro-title"
              className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-white leading-tight"
            >
              Khám Phá Ninh Bình{" "}
              <span className="italic font-serif text-[#D6AD72] font-normal block sm:inline">
                Cùng Chúng Tôi
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed">
              Cách thủ đô Hà Nội chưa đầy 100 km, Ninh Bình mở ra một thế giới kỳ vĩ với ba lớp thời gian đan quyện:{" "}
              <strong className="text-white font-medium">thiên nhiên triệu năm</strong> kiến tạo karst nhiệt đới ngập nước,{" "}
              <strong className="text-white font-medium">cố đô nghìn năm</strong> vàng son thời Đinh – Tiền Lê – Lý, và{" "}
              <strong className="text-white font-medium">nét đẹp bản địa mộc mạc</strong> đậm đà văn hóa xứ Bắc.
            </p>

            {/* 4 Thematic Heritage Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#D6AD72]">
                  <Mountain className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Thiên Nhiên Triệu Năm
                  </span>
                </div>
                <p className="text-xs text-white/75 font-light leading-relaxed">
                  Quần thể tháp karst ngập nước kỳ vĩ, thung lũng sông xanh ngọc bích và rừng nguyên sinh Cúc Phương đại ngàn.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#D6AD72]">
                  <Landmark className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Kinh Đô Nghìn Năm
                  </span>
                </div>
                <p className="text-xs text-white/75 font-light leading-relaxed">
                  Cố đô Hoa Lư linh thiêng (968 – 1010) nơi vua Đinh Tiên Hoàng dựng nền độc lập, mở ra kỷ nguyên Đại Cồ Việt rực rỡ.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#D6AD72]">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Nếp Sống Bản Địa
                  </span>
                </div>
                <p className="text-xs text-white/75 font-light leading-relaxed">
                  Nụ cười bình dị của người lái đò bến sông, tiếng chuông chùa thanh tịnh và làng nghề thêu ren, chạm đá ngàn xưa.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#D6AD72]">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Ẩm Thực Đậm Vị
                  </span>
                </div>
                <p className="text-xs text-white/75 font-light leading-relaxed">
                  Dê núi thảo dược thơm mềm, cơm cháy vàng giòn chấm sốt dê, xôi trứng kiến và ốc núi ấm nồng phong vị cố đô.
                </p>
              </div>
            </div>

            {/* CTAs: Discover Destinations & Interactive Map */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-sm px-7 py-6 rounded-2xl shadow-xl shadow-[#D6AD72]/20 transition-all hover:scale-105 gap-2 cursor-pointer"
              >
                <a href="#diem-den">
                  <Compass className="w-4 h-4" />
                  Khám Phá Các Địa Danh
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm text-sm px-6 py-6 rounded-2xl transition-all gap-2"
              >
                <a href="#ban-do">
                  <MapPin className="w-4 h-4 text-[#D6AD72]" />
                  Bản Đồ 20 Danh Thắng
                </a>
              </Button>
            </div>

            {/* Cultural Information Inquiries Note */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6AD72]" />
                <span>
                  Đường dây nóng hỗ trợ du khách: <strong className="text-white">1900 6868</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6AD72]" />
                <a
                  href="mailto:congvanvu0000@gmail.com"
                  className="hover:text-[#D6AD72] transition-colors underline decoration-[#D6AD72]/40"
                >
                  congvanvu0000@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Photography Showcase (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-[#173428] rounded-3xl p-4 sm:p-6 border border-[#D6AD72]/40 shadow-2xl relative overflow-hidden group">
              {/* Sights Tab Navigation Switcher */}
              <div className="flex items-center justify-between gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/30 border border-white/10">
                  {showcaseList.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(idx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        activeTab === idx
                          ? "bg-[#D6AD72] text-[#173428] shadow-md"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  ))}
                </div>

                <span className="text-[11px] text-[#D6AD72] font-mono hidden sm:inline-flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" />
                  {activeTab + 1} / {showcaseList.length}
                </span>
              </div>

              {/* Expansive Hero Picture Showcase */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/11] border border-white/10 shadow-lg group-hover:border-[#D6AD72]/60 transition-colors">
                <img
                  src={currentShowcase.image}
                  alt={currentShowcase.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = currentShowcase.fallbackImage;
                  }}
                />

                {/* Dark Gradient Overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#244B3B]/90 text-[#D6AD72] border border-[#D6AD72]/50 backdrop-blur-md shadow-md">
                    {currentShowcase.badge}
                  </span>
                </div>

                {/* Bottom Narrative Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-white space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                    {currentShowcase.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D6AD72] italic font-serif leading-snug">
                    "{currentShowcase.tagline}"
                  </p>
                  <p className="text-xs text-white/80 font-light line-clamp-2 leading-relaxed hidden sm:block">
                    {currentShowcase.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                    <span className="text-[11px] text-white/70 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" />
                      {currentShowcase.stats}
                    </span>

                    {onSelectDestination && (
                      <button
                        onClick={handleOpenShowcaseModal}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6AD72] hover:text-white transition-colors cursor-pointer bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Xem chi tiết
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Showcase Micro-thumbnails */}
              <div className="grid grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-white/10">
                {showcaseList.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(idx)}
                    className={`text-left p-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === idx
                        ? "bg-white/15 border-[#D6AD72] ring-1 ring-[#D6AD72]"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = item.fallbackImage;
                      }}
                    />
                    <div className="min-w-0 flex-1 hidden sm:block">
                      <p
                        className={`text-[11px] font-semibold truncate ${
                          activeTab === idx ? "text-[#D6AD72]" : "text-white/80"
                        }`}
                      >
                        {item.tabLabel}
                      </p>
                      <p className="text-[9px] text-white/50 truncate">
                        {item.badge}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}