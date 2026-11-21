import { useState, useMemo } from "react";
import {
  AlertTriangle,
  Compass,
  ExternalLink,
  Heart,
  Layers,
  MapPin,
  Navigation,
  Search,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { places, LAYERS, type Place, type Layer } from "@/data/places";
import { useFavorites } from "@/hooks/useFavorites";

interface MapFallbackProps {
  reason?: "missing-key" | "load-error" | "offline";
  initialSearch?: string;
  initialLayer?: string;
  onSelectPlace?: (place: Place) => void;
}

export function MapFallback({
  reason = "missing-key",
  initialSearch = "",
  initialLayer,
  onSelectPlace,
}: MapFallbackProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeLayer, setActiveLayer] = useState<string>(initialLayer || "all");
  const { isSaved, toggleSave } = useFavorites();

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.dishes && p.dishes.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchLayer =
        activeLayer === "all"
          ? true
          : activeLayer === "favorites"
          ? isSaved(p.id)
          : p.layer === activeLayer;

      return matchSearch && matchLayer;
    });
  }, [searchQuery, activeLayer, isSaved]);

  return (
    <div className="w-full h-full min-h-[600px] flex flex-col bg-[#F5F1E8] text-[#1A3429] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* Notice Banner */}
      <div className="bg-[#FAF8F4] border border-[#D6AD72]/40 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-[#244B3B]/10 text-[#244B3B] shrink-0 mt-0.5">
            <Compass className="w-5 h-5 text-[#244B3B]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#244B3B]">
              Bản Đồ Số Du Lịch Ninh Bình (Chế độ Danh mục Toàn cảnh)
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6D63] mt-0.5 leading-relaxed">
              {reason === "missing-key"
                ? "Bản đồ vệ tinh đang ở chế độ dự phòng thông minh (chưa cấu hình API Key Google Maps trên môi trường này). Bạn vẫn có thể tra cứu toàn bộ 64 danh thắng, ẩm thực, làng nghề và mở trực tiếp trong Google Maps một chạm hoàn toàn miễn phí."
                : "Bản đồ đang chạy chế độ dự phòng danh mục số. Toàn bộ thông tin chỉ đường và tọa độ vẫn được bảo toàn đầy đủ."}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#244B3B] text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" />
            {filteredPlaces.length} Địa điểm
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#769477] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên địa danh, món ăn đặc sản (Tràng An, Dê núi, Bái Đính...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DFD7C7] text-sm text-[#1A3429] placeholder-[#5A6D63]/60 focus:outline-none focus:ring-2 focus:ring-[#244B3B]/30 focus:border-[#244B3B]"
            />
          </div>
        </div>

        {/* Layer Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveLayer("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeLayer === "all"
                ? "bg-[#244B3B] text-white shadow-sm"
                : "bg-white border border-[#DFD7C7] text-[#5A6D63] hover:bg-[#FAF8F4]"
            }`}
          >
            Tất cả ({places.length})
          </button>
          <button
            onClick={() => setActiveLayer("favorites")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
              activeLayer === "favorites"
                ? "bg-[#DC2626] text-white shadow-sm"
                : "bg-white border border-[#DFD7C7] text-[#DC2626] hover:bg-[#FEE2E2]"
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            Yêu thích
          </button>
          {LAYERS.map((layer) => {
            const count = places.filter((p) => p.layer === layer.id).length;
            const isSelected = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#244B3B] text-white shadow-sm"
                    : "bg-white border border-[#DFD7C7] text-[#5A6D63] hover:bg-[#FAF8F4]"
                }`}
              >
                {layer.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Places */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaces.map((place) => {
          const saved = isSaved(place.id);
          const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place.mapQuery
          )}`;

          return (
            <div
              key={place.id}
              onClick={() => onSelectPlace?.(place)}
              className="group bg-white rounded-2xl p-4 border border-[#DFD7C7] hover:border-[#D6AD72] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        place.layer === "thien-nhien"
                          ? "#E4EDE6"
                          : place.layer === "tam-linh-lich-su"
                          ? "#FAF4E8"
                          : place.layer === "am-thuc"
                          ? "#FEE2E2"
                          : place.layer === "luu-tru"
                          ? "#DBEAFE"
                          : "#EDE9FE",
                      color:
                        place.layer === "thien-nhien"
                          ? "#244B3B"
                          : place.layer === "tam-linh-lich-su"
                          ? "#B88E52"
                          : place.layer === "am-thuc"
                          ? "#DC2626"
                          : place.layer === "luu-tru"
                          ? "#2563EB"
                          : "#7C3AED",
                    }}
                  >
                    {place.coordStatus === "area" ? "Vùng đại diện" : "Điểm xác thực"}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(place.id);
                    }}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      saved
                        ? "text-[#DC2626] bg-[#FEE2E2]"
                        : "text-[#5A6D63] hover:text-[#DC2626] hover:bg-[#FAF8F4]"
                    }`}
                    title={saved ? "Bỏ lưu" : "Lưu vào yêu thích"}
                    aria-label="Lưu vào yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                  </button>
                </div>

                <h3 className="font-serif text-base font-bold text-[#1A3429] group-hover:text-[#244B3B] transition-colors leading-snug">
                  {place.name}
                </h3>
                <p className="text-xs text-[#5A6D63] mt-1.5 line-clamp-2 leading-relaxed">
                  {place.tagline}
                </p>

                {place.dishes && place.dishes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {place.dishes.map((dish) => (
                      <span
                        key={dish}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#FEE2E2]/60 text-[#991B1B]"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3.5 mt-3 border-t border-[#DFD7C7]/60 flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-[#769477] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#244B3B]" />
                  {place.region === "ninh-binh-cu"
                    ? "Ninh Bình"
                    : place.region === "nam-dinh-cu"
                    ? "Nam Định"
                    : "Hà Nam"}
                </span>

                <div className="flex items-center gap-1.5">
                  {place.layer === "am-thuc" ? (
                    <Button
                      asChild
                      size="sm"
                      className="h-8 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs px-3 rounded-xl gap-1 shadow-xs cursor-pointer"
                    >
                      <a href={gmapsUrl} target="_blank" rel="noopener noreferrer">
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        Tìm Quán
                      </a>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      className="h-8 bg-[#244B3B] hover:bg-[#173428] text-white text-xs px-3 rounded-xl gap-1 shadow-xs cursor-pointer"
                    >
                      <a href={gmapsUrl} target="_blank" rel="noopener noreferrer">
                        <Navigation className="w-3.5 h-3.5 text-[#D6AD72]" />
                        Mở Google Maps
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
