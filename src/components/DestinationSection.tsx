import { useState, useMemo } from "react";
import {
  ArrowRight,
  Compass,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Star,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  destinations,
  type Destination,
  type DestinationCategory,
} from "@/data/ninh-binh";
import { toast } from "sonner";

interface DestinationSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: "Tất cả" | DestinationCategory;
  onCategoryChange: (cat: "Tất cả" | DestinationCategory) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
}

const categories: Array<"Tất cả" | DestinationCategory> = [
  "Tất cả",
  "Thiên nhiên",
  "Check-in",
  "Văn hóa",
  "Tâm linh",
  "Sinh thái",
];

export function DestinationSection({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  savedIds,
  onToggleSave,
  onSelectDestination,
}: DestinationSectionProps) {
  const filteredDestinations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return destinations.filter((dest) => {
      const matchCat =
        selectedCategory === "Tất cả" || dest.category === selectedCategory;
      const matchSearch =
        !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.area.toLowerCase().includes(q) ||
        dest.subtitle.toLowerCase().includes(q) ||
        dest.category.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section
      id="diem-den"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="destinations-title"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244B3B] mb-3">
            <span className="w-6 h-[1.5px] bg-[#D6AD72]" />
            <span>DANH THẮNG & DI TÍCH NỔI BẬT</span>
          </div>
          <h2
            id="destinations-title"
            className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-[#1A3429]"
          >
            Đi Đâu Ở{" "}
            <span className="italic font-serif text-[#244B3B] font-normal">
              Ninh Bình?
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6D63] max-w-xl font-light">
            Tuyển tập những kiệt tác non nước, đền đài ngàn năm và những góc nhìn triệu đô được chắt lọc tinh tế cho chuyến đi của bạn.
          </p>
        </div>

        {/* Search input quick indicator */}
        {searchQuery && (
          <div className="flex items-center gap-2 bg-[#EAE3D5] px-3.5 py-1.5 rounded-full text-xs text-[#244B3B]">
            <span>Đang tìm: <strong>"{searchQuery}"</strong></span>
            <button
              onClick={() => onSearchChange("")}
              className="text-[#A33A38] hover:underline font-bold ml-1"
            >
              Xóa
            </button>
          </div>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#DFD7C7]">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[#244B3B] text-white shadow-md shadow-[#244B3B]/20 font-semibold"
                    : "bg-white text-[#1A3429] hover:bg-[#EAE3D5] border border-[#DFD7C7]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Result Count */}
        <span className="text-xs text-[#5A6D63] font-medium">
          Hiển thị <strong>{filteredDestinations.length}</strong> điểm đến
        </span>
      </div>

      {/* Empty State */}
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#DFD7C7]">
          <div className="w-16 h-16 rounded-full bg-[#EAE3D5] text-[#244B3B] mx-auto flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-[#769477]" />
          </div>
          <h3 className="text-lg font-serif text-[#1A3429]">
            Không tìm thấy điểm đến phù hợp
          </h3>
          <p className="text-xs text-[#5A6D63] mt-1 max-w-sm mx-auto">
            Hãy thử tìm bằng từ khóa khác như "Tràng An", "Hang Múa", "Tam Cốc" hoặc đặt lại bộ lọc.
          </p>
          <Button
            onClick={() => {
              onSearchChange("");
              onCategoryChange("Tất cả");
            }}
            variant="outline"
            className="mt-4 border-[#244B3B] text-[#244B3B] hover:bg-[#F5F1E8]"
          >
            Đặt Lại Bộ Lọc
          </Button>
        </div>
      ) : (
        /* Asymmetric Editorial Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredDestinations.map((dest, index) => {
            const isSaved = savedIds.includes(dest.id);

            // Asymmetric layout logic for award-winning editorial look
            // Card 0: Featured Hero (8 cols or 12 cols, tall)
            // Card 1: 4 cols tall portrait
            // Card 2, 3, 4: 4 cols each
            // Card 5: 8 cols wide panoramic
            // Card 6: 4 cols
            let colSpan = "lg:col-span-4";
            let heightClass = "h-[420px]";

            if (index === 0 && selectedCategory === "Tất cả") {
              colSpan = "lg:col-span-8";
              heightClass = "h-[480px] sm:h-[520px]";
            } else if (index === 1 && selectedCategory === "Tất cả") {
              colSpan = "lg:col-span-4";
              heightClass = "h-[480px] sm:h-[520px]";
            } else if (index === 4 && selectedCategory === "Tất cả") {
              colSpan = "lg:col-span-7";
              heightClass = "h-[440px]";
            } else if (index === 5 && selectedCategory === "Tất cả") {
              colSpan = "lg:col-span-5";
              heightClass = "h-[440px]";
            }

            return (
              <article
                key={dest.id}
                className={`${colSpan} group relative rounded-2xl overflow-hidden shadow-lg shadow-black/5 bg-[#173428] border border-[#DFD7C7]/60 hover:border-[#D6AD72] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer`}
                onClick={() => onSelectDestination(dest)}
              >
                {/* Background Image Container */}
                <div className={`relative w-full ${heightClass} overflow-hidden`}>
                  <img
                    src={dest.image}
                    alt={dest.imageAlt || dest.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = dest.fallbackImage;
                    }}
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F231B] via-[#0F231B]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Top Badges & Actions */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#173428]/85 text-[#FAF8F4] backdrop-blur-md border border-white/20">
                        {dest.category}
                      </span>
                      {dest.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#D6AD72] text-[#173428] backdrop-blur-md shadow-sm font-serif">
                          {dest.badge}
                        </span>
                      )}
                    </div>

                    {/* Bookmark Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(dest.id);
                        toast.success(
                          isSaved
                            ? `Đã bỏ lưu ${dest.name}`
                            : `Đã lưu ${dest.name} vào danh sách!`
                        );
                      }}
                      className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all ${
                        isSaved
                          ? "bg-[#D6AD72] text-[#173428]"
                          : "bg-black/40 text-white hover:bg-black/70 hover:text-[#D6AD72]"
                      }`}
                      aria-label="Lưu điểm đến"
                    >
                      <Heart
                        className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Bottom Content Overlay directly on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-white flex flex-col justify-end">
                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-xs text-white/80 mb-1.5">
                      <span className="flex items-center gap-1 text-[#D6AD72] font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {dest.area}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {dest.rating}
                      </span>
                    </div>

                    {/* Destination Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-normal text-white group-hover:text-[#D6AD72] transition-colors leading-tight mb-2">
                      {dest.name}
                    </h3>

                    {/* Subtitle / Excerpt */}
                    <p className="text-xs text-white/80 font-light line-clamp-2 mb-4 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Action Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/15">
                      <span className="text-[11px] text-[#D6AD72] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Khám phá chi tiết
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          dest.mapQuery
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-[#D6AD72] hover:text-[#173428] transition-colors text-white"
                        title="Xem trên Google Maps"
                        aria-label="Xem trên Google Maps"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
