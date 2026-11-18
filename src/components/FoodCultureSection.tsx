import { useState } from "react";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Flame,
  Info,
  MapPin,
  Quote,
  Sparkles,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { localFoods, dailyMenu, type LocalFood } from "@/data/ninh-binh";
import { FoodModal } from "@/components/FoodModal";

export function FoodCultureSection() {
  const [activeDish, setActiveDish] = useState<number>(0);
  const [selectedFoodForModal, setSelectedFoodForModal] = useState<LocalFood | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const current = localFoods[activeDish] ?? localFoods[0]!;

  const handleOpenModal = (food: LocalFood) => {
    setSelectedFoodForModal(food);
    setIsModalOpen(true);
  };

  return (
    <section
      id="am-thuc"
      className="py-24 bg-[#EAE3D5]/60 border-y border-[#DFD7C7]"
      aria-labelledby="food-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Magazine Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-3">
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
            <span>TẠP CHÍ ẨM THỰC TRÀNG AN</span>
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
          </div>
          <h2
            id="food-title"
            className="text-4xl sm:text-5xl md:text-6xl font-editorial-heading text-[#1A3429]"
          >
            Đi Để Nhớ.{" "}
            <span className="italic font-serif text-[#244B3B] font-normal block sm:inline">
              Ăn Để Thương.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5A6D63] font-light leading-relaxed">
            Mâm cơm bản địa kể câu chuyện vùng đất này theo cách riêng — mộc mạc, thấm đượm hương vị đá vôi, lá rừng và bàn tay khéo léo lưu truyền qua nhiều thế hệ.
          </p>
        </div>

        {/* Featured Culinary Magazine Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          {/* Left Magazine Hero Visual (7 cols) */}
          <div
            className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl bg-[#173428] border border-[#DFD7C7] group h-[440px] sm:h-[500px] cursor-pointer"
            onClick={() => handleOpenModal(current)}
          >
            <img
              src={current.image}
              alt={current.imageAlt || current.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = current.fallbackImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F231B] via-[#0F231B]/35 to-transparent" />

            {/* Tag Badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D6AD72] text-[#173428] shadow-md font-sans">
                {current.tag}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-black/40 text-white backdrop-blur-md">
                Chạm để xem chi tiết
              </span>
            </div>

            {/* Quote Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-start gap-2 mb-2 text-[#D6AD72]">
                <Quote className="w-6 h-6 flex-shrink-0 opacity-80" />
                <p className="font-serif italic text-sm sm:text-base text-white/95 leading-snug">
                  "{current.editorialQuote}"
                </p>
              </div>
              <p className="text-xs text-white/70 font-sans pl-8">
                — Cẩm nang Ẩm thực Cố đô Ninh Bình
              </p>
            </div>
          </div>

          {/* Right Magazine Editorial Story (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#769477]">
                Đặc Sản Trứ Danh
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#1A3429] mt-1 font-normal leading-tight">
                {current.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#D6AD72] font-serif italic mt-1">
                "{current.slogan}"
              </p>
            </div>

            <p className="text-sm text-[#1A3429]/85 font-light leading-relaxed">
              {current.description}
            </p>

            {/* Taste Profile */}
            <div className="p-3.5 rounded-xl bg-white border border-[#DFD7C7]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#5A6D63] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" /> Cảm Nhận Vị Giác
              </p>
              <p className="text-xs text-[#1A3429] leading-relaxed font-medium">
                {current.tasteProfile}
              </p>
            </div>

            {/* Recommended Places */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#5A6D63] mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#244B3B]" /> Quán Chuẩn Vị Gợi Ý
              </p>
              <ul className="space-y-1 text-xs text-[#1A3429]">
                {current.recommendedPlaces.map((place, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#D6AD72] font-serif font-bold">0{idx + 1}.</span>
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => handleOpenModal(current)}
                className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs gap-1.5 shadow-md"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#D6AD72]" />
                Xem Chi Tiết Món Ăn
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-[#DFD7C7] text-xs text-[#244B3B] hover:bg-[#F5F1E8]"
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${current.name} quán ngon Ninh Bình`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tìm Quán Trên Maps
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Dishes Quick Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {localFoods.map((dish, idx) => {
            const isActive = idx === activeDish;
            return (
              <button
                key={dish.id}
                onClick={() => setActiveDish(idx)}
                className={`p-3.5 rounded-xl text-left transition-all border ${
                  isActive
                    ? "bg-[#244B3B] text-white border-[#244B3B] shadow-lg shadow-[#244B3B]/15"
                    : "bg-white hover:bg-[#FAF8F4] text-[#1A3429] border-[#DFD7C7]"
                }`}
              >
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider block mb-1 ${
                    isActive ? "text-[#D6AD72]" : "text-[#769477]"
                  }`}
                >
                  0{idx + 1} • {dish.tag}
                </span>
                <h4 className="font-serif text-xs sm:text-sm font-semibold leading-tight truncate">
                  {dish.name}
                </h4>
                <p
                  className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isActive ? "text-white/80" : "text-[#5A6D63]"
                  }`}
                >
                  {dish.slogan}
                </p>
              </button>
            );
          })}
        </div>

        {/* Daily Gourmet Menu Section (Gợi ý thực đơn 1 ngày) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DFD7C7] shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#DFD7C7]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#769477] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D6AD72]" /> HÀNH TRÌNH VỊ GIÁC
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A3429] mt-1 font-normal">
                Gợi Ý Thực Đơn Một Ngày{" "}
                <span className="italic text-[#244B3B]">Sành Ăn</span>
              </h3>
            </div>
            <p className="text-xs text-[#5A6D63] max-w-sm font-light">
              Lịch trình ẩm thực từ sáng sớm đến đêm muộn, bảo đảm nếm trọn tinh hoa đặc sản mà không bỏ lỡ mỹ vị nào.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {dailyMenu.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#DFD7C7] hover:border-[#D6AD72] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#244B3B] text-white">
                      {item.meal}
                    </span>
                    <span className="text-[10px] text-[#769477] font-medium">
                      {item.time}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#1A3429] mb-1.5 leading-snug">
                    {item.dishes}
                  </h4>
                  <p className="text-[11px] text-[#5A6D63] font-light leading-relaxed mb-3">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DFD7C7]/60 text-[10px] text-[#244B3B] font-medium flex items-center gap-1">
                  <Wine className="w-3 h-3 text-[#D6AD72]" />
                  <span className="truncate">{item.drink}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gift Suggestions Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF8F4] border border-[#D6AD72]/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="text-3xl p-3 rounded-2xl bg-white shadow-sm">🎁</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#244B3B]">
                Gợi Ý Quà Mang Về Từ Ninh Bình
              </p>
              <p className="text-xs text-[#5A6D63] mt-0.5 leading-relaxed">
                Cơm cháy ruốc chà bông · Chè búp Trại Quang Sỏi · Dứa tươi Đồng Giao · Rượu nếp Kim Sơn · Nem chua Yên Mạc
              </p>
            </div>
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-[#244B3B] text-[#244B3B] hover:bg-[#F5F1E8] text-xs flex-shrink-0"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=c%E1%BB%ADa+h%C3%A0ng+%C4%91%E1%BA%B7c+s%E1%BA%A3n+Ninh+B%C3%ACnh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tìm Điểm Bán Đặc Sản Uy Tín
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </Button>
        </div>
      </div>

      {/* Food Detail Modal */}
      <FoodModal
        food={selectedFoodForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
