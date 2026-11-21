import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Compass,
  ExternalLink,
  Headphones,
  Heart,
  HelpCircle,
  MapPin,
  MessageSquare,
  Navigation,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { places, type Place } from "@/data/places";
import { useFavorites } from "@/hooks/useFavorites";
import { StreetViewPanel } from "./StreetViewPanel";
import { SeasonSlider } from "./SeasonSlider";

// Haversine formula
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

interface PlaceCardProps {
  place: Place;
  onClose: () => void;
  onSelectPlace: (place: Place) => void;
  onStartTour?: (tourId: string) => void;
  onOpenDetailModal?: (placeId: string) => void;
}

export function PlaceCard({
  place,
  onClose,
  onSelectPlace,
  onStartTour,
  onOpenDetailModal,
}: PlaceCardProps) {
  const { isSaved, toggleSave } = useFavorites();
  const saved = isSaved(place.id);

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

  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.mapQuery
  )}`;

  return (
    <div className="bg-white rounded-3xl border border-[#DFD7C7] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[82vh] overflow-y-auto">
      {/* Photo Header */}
      {place.image && (
        <div className="relative w-full h-44 sm:h-48 bg-stone-900 shrink-0">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors cursor-pointer"
            aria-label="Đóng thẻ thông tin"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Status & Layer Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs"
              style={{
                backgroundColor:
                  place.layer === "thien-nhien"
                    ? "#244B3B"
                    : place.layer === "tam-linh-lich-su"
                    ? "#B88E52"
                    : place.layer === "am-thuc"
                    ? "#DC2626"
                    : place.layer === "luu-tru"
                    ? "#2563EB"
                    : "#7C3AED",
                color: "#FFFFFF",
              }}
            >
              {place.coordStatus === "area" ? "Vùng Đặc Trưng" : "Điểm Danh Thắng"}
            </span>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-serif font-bold text-lg text-white drop-shadow-md leading-tight">
              {place.name}
            </h3>
            {place.address && (
              <p className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#D6AD72]" />
                <span className="truncate">{place.address}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* If no image was displayed */}
        {!place.image && (
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#244B3B] text-white">
                {place.coordStatus === "area" ? "Vùng Đặc Trưng" : "Điểm Danh Thắng"}
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1A3429] mt-1.5 leading-tight">
                {place.name}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#5A6D63] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tagline & Description */}
        <p className="text-xs sm:text-sm text-[#5A6D63] leading-relaxed">
          {place.tagline}
        </p>

        {place.description && (
          <p className="text-xs text-[#1A3429]/80 leading-relaxed bg-[#FAF8F4] p-3 rounded-2xl border border-[#DFD7C7]/60">
            {place.description}
          </p>
        )}

        {/* Food dishes tags */}
        {place.dishes && place.dishes.length > 0 && (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626] flex items-center gap-1 mb-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Món ngon nên thử tại vùng này:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {place.dishes.map((dish) => (
                <span
                  key={dish}
                  className="text-xs px-2.5 py-1 rounded-xl bg-[#FEE2E2] text-[#991B1B] font-medium"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price Hint */}
        {place.priceHint && (
          <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FAF8F4] border border-[#DFD7C7]/60 text-[#244B3B]">
            <span className="text-[#5A6D63]">Chi phí tham khảo:</span>
            <span className="font-bold text-[#244B3B]">{place.priceHint}</span>
          </div>
        )}

        {/* Rice Season Slider for Tam Cốc / Hang Múa */}
        {(place.id === "tam-coc" || place.id === "hang-mua") && (
          <SeasonSlider placeName={place.name} />
        )}

        {/* Primary Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* Street View if covered */}
          <div className="flex flex-wrap items-center gap-2">
            <StreetViewPanel lat={place.lat} lng={place.lng} placeName={place.name} />

            {place.tourStops && place.tourStops.length > 0 && onStartTour && (
              <Button
                type="button"
                size="sm"
                onClick={() => onStartTour(place.tourStops![0]!)}
                className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] text-xs font-bold gap-1.5 rounded-xl shadow-xs cursor-pointer"
              >
                <Headphones className="w-3.5 h-3.5 text-[#173428]" />
                Bắt Đầu Tour Ảo
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Food: Tìm Quán Gần Đây */}
            {place.layer === "am-thuc" ? (
              <Button
                asChild
                size="sm"
                className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold gap-1.5 rounded-xl shadow-sm cursor-pointer col-span-2"
              >
                <a href={gmapsUrl} target="_blank" rel="noopener noreferrer">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Tìm Quán Gần Đây (Google Maps)
                  <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                </a>
              </Button>
            ) : (
              <Button
                asChild
                size="sm"
                className="w-full bg-[#244B3B] hover:bg-[#173428] text-white text-xs font-semibold gap-1.5 rounded-xl shadow-sm cursor-pointer"
              >
                <a href={gmapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-3.5 h-3.5 text-[#D6AD72]" />
                  Chỉ Đường
                  <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                </a>
              </Button>
            )}

            {/* Save / Favorite Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => toggleSave(place.id)}
              className={`w-full text-xs font-semibold gap-1.5 rounded-xl cursor-pointer ${
                saved
                  ? "border-[#DC2626] text-[#DC2626] bg-[#FEE2E2]/50 hover:bg-[#FEE2E2]"
                  : "border-[#DFD7C7] text-[#5A6D63] hover:text-[#DC2626] hover:border-[#DC2626]"
              } ${place.layer === "am-thuc" ? "col-span-1" : ""}`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current text-[#DC2626]" : ""}`} />
              {saved ? "Đã Lưu" : "Yêu Thích"}
            </Button>

            {/* Detail Modal button */}
            {place.slug && onOpenDetailModal && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenDetailModal(place.slug!)}
                className="w-full border-[#244B3B]/40 text-[#244B3B] hover:bg-[#244B3B]/10 text-xs font-semibold rounded-xl cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" />
                Xem Chi Tiết
              </Button>
            )}

            {/* AI Guide Link */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-[#DFD7C7] text-[#244B3B] hover:bg-[#244B3B]/10 text-xs font-semibold gap-1.5 rounded-xl cursor-pointer"
            >
              <Link to="/hdv">
                <MessageSquare className="w-3.5 h-3.5 text-[#D6AD72]" />
                Hỏi HDV AI
              </Link>
            </Button>
          </div>
        </div>

        {/* Nearby Places within 10km */}
        {nearbyPlaces.length > 0 && (
          <div className="pt-3 border-t border-[#DFD7C7]/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5A6D63] flex items-center justify-between mb-2">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#244B3B]" />
                Điểm đến gần nơi này (Bán kính ≤ 10km):
              </span>
            </div>
            <div className="space-y-1.5">
              {nearbyPlaces.map((np) => (
                <button
                  key={np.id}
                  onClick={() => onSelectPlace(np)}
                  className="w-full p-2 rounded-xl bg-[#FAF8F4] hover:bg-[#E4EDE6] border border-[#DFD7C7]/40 text-left transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-serif font-bold text-[#1A3429] group-hover:text-[#244B3B] truncate">
                      {np.name}
                    </div>
                    <div className="text-[10px] text-[#5A6D63] truncate">{np.tagline}</div>
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
