import { useState, useMemo } from "react";
import {
  BookOpen,
  Compass,
  ExternalLink,
  Eye,
  Headphones,
  Heart,
  HelpCircle,
  MapPin,
  MessageSquare,
  Navigation,
  Sparkles,
  Tag,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { places, type Place, type Layer } from "@/data/places";
import { useFavorites } from "@/hooks/useFavorites";
import { directionsUrl, streetViewUrl, searchUrl } from "@/lib/mapLinks";
import { SeasonSlider } from "./SeasonSlider";
import { SceneFallback, type TourPhotoAccent } from "./TourPhoto";

// Haversine formula tính khoảng cách chim bay theo km
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const LAYER_CONFIG: Record<
  Layer,
  { label: string; accent: TourPhotoAccent; color: string; bgColor: string }
> = {
  "thien-nhien": { label: "Danh Thắng & Sinh Thái", accent: "water", color: "#244B3B", bgColor: "#E8F0EC" },
  "tam-linh-lich-su": { label: "Di Tích & Tâm Linh", accent: "temple", color: "#B88E52", bgColor: "#FAF2E6" },
  "vui-choi": { label: "Vui Chơi & Trải Nghiệm", accent: "karst", color: "#D97706", bgColor: "#FEF3C7" },
  "am-thuc": { label: "Ẩm Thực Đặc Sản", accent: "karst", color: "#DC2626", bgColor: "#FEE2E2" },
  "luu-tru": { label: "Điểm Lưu Trú", accent: "karst", color: "#2563EB", bgColor: "#DBEAFE" },
  "lang-nghe": { label: "Làng Nghề Truyền Thống", accent: "karst", color: "#7C3AED", bgColor: "#EDE9FE" },
};

interface PlaceCardProps {
  place: Place;
  onClose: () => void;
  onSelectPlace: (place: Place) => void;
  onStartTour?: (tourId: string) => void;
}

export function PlaceCard({
  place,
  onClose,
  onSelectPlace,
  onStartTour,
}: PlaceCardProps) {
  const { isSaved, toggleSave } = useFavorites();
  const saved = isSaved(place.id);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [osmFoodLoading, setOsmFoodLoading] = useState(false);
  const [osmFoodList, setOsmFoodList] = useState<{ id: number; name: string }[] | null>(null);

  const layerInfo = LAYER_CONFIG[place.layer] || LAYER_CONFIG["thien-nhien"];

  // Tìm các điểm lân cận trong bán kính 10 km
  const nearbyPlaces = useMemo(() => {
    return places
      .filter((p) => p.id !== place.id)
      .map((p) => ({
        ...p,
        distance: getDistanceKm(place.lat, place.lng, p.lat, p.lng),
      }))
      .filter((p) => p.distance <= 10)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);
  }, [place]);

  const dirUrl = directionsUrl(place.lat, place.lng);
  const svUrl = streetViewUrl(place.lat, place.lng);
  const foodSearchUrl = searchUrl(place.mapQuery);

  // Tra cứu quán ăn lân cận qua Overpass API
  const handleFetchOsmFood = async () => {
    if (osmFoodList) return;
    setOsmFoodLoading(true);
    try {
      const qry = `[out:json][timeout:10];(node["amenity"~"restaurant|cafe"](around:3000,${place.lat},${place.lng}););out 5;`;
      const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(qry)}`);
      if (res.ok) {
        const data = await res.json();
        const items = (data.elements || [])
          .filter((el: { tags?: { name?: string } }) => el.tags?.name)
          .map((el: { id: number; tags: { name: string } }) => ({ id: el.id, name: el.tags.name }))
          .slice(0, 4);
        setOsmFoodList(items);
      } else {
        setOsmFoodList([]);
      }
    } catch {
      setOsmFoodList([]);
    } finally {
      setOsmFoodLoading(false);
    }
  };

  return (
    <div className="relative z-10 bg-white rounded-3xl border border-[#DFD7C7] shadow-xl overflow-hidden animate-in fade-in duration-200 flex flex-col">
      {/* 1. Header Banner Image với Fallback SVG vững chắc (Không bao giờ bị khung đen) */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#173428] shrink-0 select-none">
        {/* Lớp nền vector SVG dự phòng theo tông màu địa danh */}
        <SceneFallback accent={layerInfo.accent} />

        {/* Ảnh thực tế phủ đầy khu vực banner */}
        {place.image && !imgError && (
          <img
            key={place.image}
            src={place.image}
            alt={place.name}
            loading="eager"
            decoding="async"
            onLoad={() => {
              setImgLoaded(true);
              setImgError(false);
            }}
            onError={() => {
              setImgError(true);
              setImgLoaded(false);
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Lớp gradient tương phản nhẹ giúp chữ nổi bật */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

        {/* Nút Đóng thẻ chi tiết ở góc trên bên phải */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors cursor-pointer backdrop-blur-xs border border-white/20 shadow-md"
          aria-label="Đóng thẻ thông tin địa danh"
          title="Đóng thẻ thông tin địa danh"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge Danh mục ở góc trên bên trái */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs border border-white/20"
            style={{
              backgroundColor: layerInfo.color,
              color: "#FFFFFF",
            }}
          >
            {layerInfo.label}
          </span>
          {place.coordStatus === "area" && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/50 text-[#D6AD72] border border-[#D6AD72]/40 backdrop-blur-xs shadow-md">
              Vùng Đặc Trưng
            </span>
          )}
        </div>

        {/* Tên địa danh & Địa chỉ ở đáy banner */}
        <div className="absolute bottom-3.5 left-4 right-4 z-20 pointer-events-none">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-white drop-shadow-md leading-tight line-clamp-2">
            {place.name}
          </h3>
          {place.address && (
            <p className="text-[11.5px] text-white/90 flex items-center gap-1.5 mt-1 drop-shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#D6AD72] shrink-0" />
              <span className="truncate">{place.address}</span>
            </p>
          )}
        </div>
      </div>

      {/* 2. Nội dung chi tiết (Body) */}
      <div className="p-4 sm:p-5 space-y-3.5 bg-white">
        {/* Tagline giới thiệu */}
        <div className="text-xs sm:text-sm text-[#244B3B] font-medium leading-relaxed italic border-l-2 border-[#D6AD72] pl-3 py-0.5">
          &ldquo;{place.tagline}&rdquo;
        </div>

        {/* Câu chuyện lịch sử / Bối cảnh văn hóa */}
        {place.description && (
          <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#DFD7C7]/70 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#244B3B] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#D6AD72]" />
              <span>Câu chuyện lịch sử & văn hóa</span>
            </div>
            <p className="text-xs text-[#1A3429]/85 leading-relaxed">
              {place.description}
            </p>
          </div>
        )}

        {/* Món ăn đặc sản (nếu có) */}
        {place.dishes && place.dishes.length > 0 && (
          <div className="p-3 rounded-2xl bg-[#FEE2E2]/30 border border-[#F87171]/30 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626] flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Món ngon nên thử tại vùng này:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {place.dishes.map((dish) => (
                <span
                  key={dish}
                  className="text-xs px-2.5 py-1 rounded-xl bg-white border border-[#F87171]/40 text-[#991B1B] font-medium shadow-xs"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chi phí tham khảo */}
        {place.priceHint && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#244B3B]/5 border border-[#244B3B]/10 text-xs">
            <span className="text-[#5A6D63] font-medium flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#244B3B]" />
              Chi phí tham khảo:
            </span>
            <span className="font-bold text-[#244B3B]">{place.priceHint}</span>
          </div>
        )}

        {/* So sánh mùa lúa chín Tam Cốc / Hang Múa */}
        {(place.id === "tam-coc" || place.id === "hang-mua") && (
          <SeasonSlider placeName={place.name} />
        )}

        {/* 3. Nút hành động chính */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            {/* Chỉ Đường / Tìm Quán */}
            {place.layer === "am-thuc" ? (
              <Button
                asChild
                size="sm"
                className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold gap-1.5 rounded-xl shadow-xs cursor-pointer col-span-2 h-9"
              >
                <a href={foodSearchUrl} target="_blank" rel="noopener noreferrer">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Tìm Quán Gần Đây (Google Maps)
                  <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                </a>
              </Button>
            ) : (
              <Button
                asChild
                size="sm"
                className="w-full bg-[#244B3B] hover:bg-[#173428] text-white text-xs font-semibold gap-1.5 rounded-xl shadow-xs cursor-pointer h-9"
              >
                <a href={dirUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-3.5 h-3.5 text-[#D6AD72]" />
                  Chỉ Đường
                  <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                </a>
              </Button>
            )}

            {/* Street View Link button */}
            {place.layer !== "am-thuc" && (
              <Button
                asChild
                type="button"
                size="sm"
                variant="outline"
                className="w-full border-[#DFD7C7] hover:border-[#D6AD72] text-[#244B3B] hover:bg-[#FAF8F4] text-xs gap-1.5 rounded-xl font-medium cursor-pointer h-9"
              >
                <a
                  href={svUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Mở Street View thực tế trên Google Maps"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D6AD72]" />
                  Street View ↗
                </a>
              </Button>
            )}

            {/* Lưu Yêu Thích */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => toggleSave(place.id)}
              className={`w-full text-xs font-semibold gap-1.5 rounded-xl cursor-pointer h-9 ${
                saved
                  ? "border-[#DC2626] text-[#DC2626] bg-[#FEE2E2]/50 hover:bg-[#FEE2E2]"
                  : "border-[#DFD7C7] text-[#5A6D63] hover:text-[#DC2626] hover:border-[#DC2626]"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current text-[#DC2626]" : ""}`} />
              {saved ? "Đã Lưu" : "Yêu Thích"}
            </Button>

            {/* Link Hỏi Hướng Dẫn Viên */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-[#DFD7C7] text-[#244B3B] hover:bg-[#244B3B]/10 text-xs font-semibold gap-1.5 rounded-xl cursor-pointer h-9"
            >
              <a href="/hdv">
                <MessageSquare className="w-3.5 h-3.5 text-[#D6AD72]" />
                Hỏi Hướng Dẫn Viên
              </a>
            </Button>
          </div>

          {/* Tour CTA (nếu điểm nằm trong chuyến tham quan có hướng dẫn) */}
          {place.tourStops && place.tourStops.length > 0 && onStartTour && (
            <Button
              type="button"
              size="sm"
              onClick={() => onStartTour(place.tourStops![0]!)}
              className="w-full bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] text-xs font-bold gap-1.5 rounded-xl shadow-xs cursor-pointer h-9"
            >
              <Headphones className="w-3.5 h-3.5 text-[#173428]" />
              Bắt Đầu Chuyến Tham Quan Ảo
            </Button>
          )}
        </div>

        {/* 4. Tra cứu quán ăn OSM (tùy chọn) */}
        {place.layer === "am-thuc" && (
          <div className="pt-2 border-t border-[#DFD7C7]/50">
            <button
              onClick={handleFetchOsmFood}
              disabled={osmFoodLoading}
              className="text-[11px] text-[#244B3B] font-semibold underline flex items-center gap-1 cursor-pointer"
            >
              <UtensilsCrossed className="w-3 h-3 text-[#DC2626]" />
              {osmFoodLoading ? "Đang tra cứu từ OpenStreetMap..." : "Tra cứu quán vẽ trên bản đồ OpenStreetMap"}
            </button>

            {osmFoodList && osmFoodList.length > 0 && (
              <div className="mt-2 p-2.5 rounded-xl bg-[#FAF8F4] border border-[#DFD7C7] text-xs space-y-1">
                <div className="font-bold text-[10px] text-[#5A6D63]">
                  Quán ghi nhận trên OpenStreetMap (bán kính 3 km):
                </div>
                {osmFoodList.map((item) => (
                  <div key={item.id} className="text-[#1A3429] flex items-center gap-1">
                    <span>• {item.name}</span>
                  </div>
                ))}
              </div>
            )}
            {osmFoodList && osmFoodList.length === 0 && (
              <div className="text-[10px] text-[#5A6D63] italic mt-1">
                Chưa có quán nào được đánh dấu tại tọa độ này trên OSM. Bạn có thể bấm nút &ldquo;Tìm Quán Gần Đây&rdquo; phía trên để xem kết quả đầy đủ.
              </div>
            )}
          </div>
        )}

        {/* 5. Điểm đến lân cận (≤ 10km) */}
        {nearbyPlaces.length > 0 && (
          <div className="pt-3 border-t border-[#DFD7C7]/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] flex items-center justify-between mb-2">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#244B3B]" />
                Điểm đến gần nơi này (≤ 10km):
              </span>
            </div>
            <div className="space-y-1.5">
              {nearbyPlaces.map((np) => (
                <button
                  key={np.id}
                  onClick={() => onSelectPlace(np)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#E4EDE6] border border-[#DFD7C7]/40 text-left transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-serif font-bold text-[#1A3429] group-hover:text-[#244B3B] truncate">
                      {np.name}
                    </div>
                    <div className="text-[10.5px] text-[#5A6D63] truncate">{np.tagline}</div>
                  </div>
                  <span className="text-[10px] font-bold text-[#244B3B] bg-white px-2 py-0.5 rounded-full border border-[#DFD7C7] shrink-0">
                    ~{np.distance.toFixed(1)} km
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
