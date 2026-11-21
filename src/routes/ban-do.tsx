import { useState, useEffect, useMemo, useCallback } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowLeft,
  Award,
  Compass,
  Headphones,
  Heart,
  Layers,
  Map,
  MapPin,
  Maximize2,
  Minimize2,
  Navigation,
  Search,
  Sparkles,
  UtensilsCrossed,
  Volume2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { places, LAYERS, REGIONS, unpinnedDishes, type Place, type Layer, type Region } from "@/data/places";
import { TOURS } from "@/data/tours";
import { useFavorites } from "@/hooks/useFavorites";
import { useAmbience } from "@/hooks/useAmbience";
import { MapClient } from "@/components/map/MapClient";
import { PlaceCard } from "@/components/map/PlaceCard";
import { OfficialTourCard } from "@/components/map/OfficialTourCard";
import { PassportStampDrawer } from "@/components/map/PassportStampDrawer";

// Zod Schema for URL Query Params validation
const mapSearchSchema = z.object({
  diem: z.string().optional(),
  lop: z.string().optional(),
  q: z.string().optional(),
  tour: z.string().optional(),
  debug: z.union([z.string(), z.number()]).optional(),
});

export const Route = createFileRoute("/ban-do")({
  validateSearch: (search) => mapSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Bản Đồ Số & Tham Quan Ảo 360° Ninh Bình | NinhBinhTravel" },
      {
        name: "description",
        content:
          "Khám phá trọn vẹn 64 danh thắng, di tích cố đô, làng nghề và ẩm thực đặc sản Ninh Bình trên bản đồ tương tác với trải nghiệm tham quan ảo dẫn đường bằng camera bay.",
      },
      { property: "og:title", content: "Bản Đồ Số Du Lịch & Tham Quan Ảo Ninh Bình" },
      {
        property: "og:description",
        content:
          "Bản đồ Google Maps trực quan với các lớp Thiên nhiên, Tâm linh, Ẩm thực, Lưu trú và âm thanh môi trường sống động.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate({ from: "/ban-do" });

  const [searchQuery, setSearchQuery] = useState(searchParams.q || "");
  const [activeLayer, setActiveLayer] = useState<string>(searchParams.lop || "all");
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [mobileView, setMobileView] = useState<"map" | "list">("map");

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(() => {
    if (searchParams.diem) {
      return (
        places.find((p) => p.id === searchParams.diem || p.slug === searchParams.diem) || null
      );
    }
    return null;
  });

  const [activeTourId, setActiveTourId] = useState<string | null>(() => {
    if (searchParams.tour) {
      return searchParams.tour === "1" ? "heritage-tour" : searchParams.tour;
    }
    return null;
  });

  const isDebug = searchParams.debug === "1" || searchParams.debug === 1;

  const { isSaved, savedCount, toggleSave } = useFavorites();
  const { isPlaying: isAudioPlaying, toggle: toggleAudio } = useAmbience();

  // Sync state with URL params
  const updateUrlParams = useCallback(
    (updates: { diem?: string | null; lop?: string | null; q?: string | null; tour?: string | null }) => {
      navigate({
        search: (prev) => {
          const next = { ...prev };
          if (updates.diem !== undefined) {
            if (updates.diem) next.diem = updates.diem;
            else delete next.diem;
          }
          if (updates.lop !== undefined) {
            if (updates.lop && updates.lop !== "all") next.lop = updates.lop;
            else delete next.lop;
          }
          if (updates.q !== undefined) {
            if (updates.q) next.q = updates.q;
            else delete next.q;
          }
          if (updates.tour !== undefined) {
            if (updates.tour) next.tour = updates.tour;
            else delete next.tour;
          }
          return next;
        },
        replace: true,
      });
    },
    [navigate]
  );

  // Sync when searchParams.diem changes
  useEffect(() => {
    if (searchParams.diem) {
      const found = places.find(
        (p) => p.id === searchParams.diem || p.slug === searchParams.diem
      );
      if (found) setSelectedPlace(found);
    }
  }, [searchParams.diem]);

  // Sync when searchParams.tour changes
  useEffect(() => {
    if (searchParams.tour) {
      setActiveTourId(searchParams.tour === "1" ? "heritage-tour" : searchParams.tour);
    }
  }, [searchParams.tour]);

  // Sync when searchParams.q changes
  useEffect(() => {
    if (searchParams.q !== undefined && searchParams.q !== searchQuery) {
      setSearchQuery(searchParams.q);
    }
  }, [searchParams.q]);

  // Filtered places list
  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      // Search text
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.dishes && p.dishes.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())));

      // Layer
      const matchLayer =
        activeLayer === "all"
          ? true
          : activeLayer === "favorites"
          ? isSaved(p.id)
          : p.layer === activeLayer;

      // Region
      const matchRegion = activeRegion === "all" ? true : p.region === activeRegion;

      return matchSearch && matchLayer && matchRegion;
    });
  }, [searchQuery, activeLayer, activeRegion, isSaved]);

  const handleSelectPlace = useCallback(
    (place: Place) => {
      setSelectedPlace(place);
      updateUrlParams({ diem: place.id });
      // If in mobile list view, switch to map view to view marker
      if (mobileView === "list") {
        setMobileView("map");
      }
    },
    [mobileView, updateUrlParams]
  );

  const handleClosePlaceCard = useCallback(() => {
    setSelectedPlace(null);
    updateUrlParams({ diem: null });
  }, [updateUrlParams]);

  const handleStartTour = useCallback(
    (tourId = "heritage-tour") => {
      setActiveTourId(tourId);
      updateUrlParams({ tour: tourId });
    },
    [updateUrlParams]
  );

  const handleCloseTour = useCallback(() => {
    setActiveTourId(null);
    updateUrlParams({ tour: null });
  }, [updateUrlParams]);

  // Esc key closes active card or tour
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedPlace) handleClosePlaceCard();
        if (activeTourId) handleCloseTour();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPlace, activeTourId, handleClosePlaceCard, handleCloseTour]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F5F1E8] text-[#1A3429] font-sans">
      {/* Top App Header */}
      <header className="h-14 sm:h-16 bg-[#244B3B] text-white border-b border-[#D6AD72]/20 px-3 sm:px-6 flex items-center justify-between shrink-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-white/90 hover:text-[#D6AD72] transition-colors text-xs sm:text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>

          <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#D6AD72] text-[#244B3B] flex items-center justify-center font-bold shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-sm sm:text-base tracking-wide">
              Bản Đồ Số <span className="text-[#D6AD72]">NinhBinhTravel</span>
            </span>
          </div>
        </div>

        {/* Header Right Actions: Audio, Wishlist, Tour button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Nature Audio button */}
          <button
            onClick={() => toggleAudio()}
            className={`p-2 rounded-full border text-xs flex items-center justify-center transition-all cursor-pointer ${
              isAudioPlaying
                ? "bg-[#D6AD72] border-[#D6AD72] text-[#173428] shadow-sm shadow-[#D6AD72]/30"
                : "bg-white/10 border-white/20 text-white/90 hover:bg-white/20"
            }`}
            title={isAudioPlaying ? "Tắt âm thanh thiên nhiên" : "Bật âm thanh thiên nhiên"}
            aria-label="Âm thanh thiên nhiên"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          {/* Passport Stamp collection */}
          <PassportStampDrawer />

          {/* Wishlist Link */}
          <Link
            to="/"
            search={{}}
            className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all flex items-center justify-center"
            title={`Điểm đến đã lưu (${savedCount})`}
          >
            <Heart className="w-3.5 h-3.5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D6AD72] text-[#173428] font-bold text-[9px] flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>

          {/* Start Tour CTA */}
          <Button
            size="sm"
            onClick={() => handleStartTour("heritage-tour")}
            className="bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-xs px-3 sm:px-4 h-8 rounded-full shadow-md gap-1.5 cursor-pointer hidden md:flex"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Tham Quan Ảo 360°</span>
          </Button>

          {/* Mobile View Toggle */}
          <div className="flex lg:hidden bg-white/10 p-0.5 rounded-full border border-white/15">
            <button
              onClick={() => setMobileView("map")}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mobileView === "map" ? "bg-[#D6AD72] text-[#173428]" : "text-white/80"
              }`}
            >
              Bản Đồ
            </button>
            <button
              onClick={() => setMobileView("list")}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mobileView === "list" ? "bg-[#D6AD72] text-[#173428]" : "text-white/80"
              }`}
            >
              Danh Sách
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar (Desktop always, Mobile when list view) */}
        <aside
          className={`w-full lg:w-[390px] xl:w-[420px] bg-[#FAF8F4] border-r border-[#DFD7C7] flex flex-col shrink-0 z-20 overflow-y-auto ${
            mobileView === "list" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Search Box */}
          <div className="p-4 border-b border-[#DFD7C7]/70 space-y-3 bg-white shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-[#769477] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateUrlParams({ q: e.target.value || null });
                }}
                placeholder="Tìm danh thắng, món ăn (Tràng An, Dê núi...)"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DFD7C7] text-sm text-[#1A3429] placeholder-[#5A6D63]/60 focus:outline-none focus:border-[#244B3B]"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    updateUrlParams({ q: null });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5A6D63] hover:text-[#1A3429] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Layer Chips */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D63]">
                Lớp hiển thị ({filteredPlaces.length} điểm)
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => {
                    setActiveLayer("all");
                    updateUrlParams({ lop: null });
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeLayer === "all"
                      ? "bg-[#244B3B] text-white shadow-xs"
                      : "bg-[#FAF8F4] border border-[#DFD7C7] text-[#5A6D63] hover:bg-white"
                  }`}
                >
                  Tất cả ({places.length})
                </button>

                <button
                  onClick={() => {
                    setActiveLayer("favorites");
                    updateUrlParams({ lop: "favorites" });
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                    activeLayer === "favorites"
                      ? "bg-[#DC2626] text-white shadow-xs"
                      : "bg-[#FAF8F4] border border-[#DFD7C7] text-[#DC2626] hover:bg-[#FEE2E2]"
                  }`}
                >
                  <Heart className="w-3 h-3 fill-current" />
                  Lưu ({savedCount})
                </button>

                {LAYERS.map((layer) => {
                  const count = places.filter((p) => p.layer === layer.id).length;
                  const isSelected = activeLayer === layer.id;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => {
                        setActiveLayer(layer.id);
                        updateUrlParams({ lop: layer.id });
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#244B3B] text-white shadow-xs"
                          : "bg-[#FAF8F4] border border-[#DFD7C7] text-[#5A6D63] hover:bg-white"
                      }`}
                    >
                      {layer.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#5A6D63]">
              <span className="text-[10px] uppercase font-bold text-[#5A6D63]">Vùng:</span>
              <button
                onClick={() => setActiveRegion("all")}
                className={`text-[11px] px-2 py-0.5 rounded-md cursor-pointer ${
                  activeRegion === "all"
                    ? "bg-[#244B3B]/10 text-[#244B3B] font-bold"
                    : "hover:text-[#244B3B]"
                }`}
              >
                Tất cả
              </button>
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRegion(r.id)}
                  className={`text-[11px] px-2 py-0.5 rounded-md cursor-pointer ${
                    activeRegion === r.id
                      ? "bg-[#244B3B]/10 text-[#244B3B] font-bold"
                      : "hover:text-[#244B3B]"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Places or Active Place Card */}
          <div className="p-4 space-y-3 flex-1 overflow-y-auto">
            {/* If a place is selected, show detail card */}
            {selectedPlace && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#244B3B] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" />
                    Đang xem chi tiết
                  </span>
                  <button
                    onClick={handleClosePlaceCard}
                    className="text-xs text-[#5A6D63] hover:text-[#244B3B] font-medium cursor-pointer"
                  >
                    Đóng xem danh sách
                  </button>
                </div>
                <PlaceCard
                  place={selectedPlace}
                  onClose={handleClosePlaceCard}
                  onSelectPlace={handleSelectPlace}
                  onStartTour={handleStartTour}
                />
              </div>
            )}

            {/* Official Virtual Tour Card */}
            <OfficialTourCard />

            {/* Places List Items */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D63] flex items-center justify-between">
                <span>Danh sách kết quả ({filteredPlaces.length})</span>
                {isDebug && <span className="text-amber-600 font-mono">DEBUG_MODE_ON</span>}
              </div>

              {filteredPlaces.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-white border border-[#DFD7C7] text-[#5A6D63]">
                  <p className="text-sm font-medium">Không tìm thấy địa điểm nào phù hợp.</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveLayer("all");
                      setActiveRegion("all");
                    }}
                    className="mt-3 text-xs"
                  >
                    Xóa bộ lọc tìm kiếm
                  </Button>
                </div>
              ) : (
                filteredPlaces.map((place) => {
                  const isCurrent = selectedPlace?.id === place.id;
                  const saved = isSaved(place.id);

                  return (
                    <article
                      key={place.id}
                      onClick={() => handleSelectPlace(place)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isCurrent
                          ? "bg-white border-[#244B3B] shadow-md ring-1 ring-[#244B3B]/20"
                          : "bg-white/80 border-[#DFD7C7] hover:bg-white hover:border-[#D6AD72] hover:shadow-sm"
                      }`}
                      aria-label={place.name}
                    >
                      <div className="truncate flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
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
                            }}
                          />
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1A3429] truncate">
                            {place.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-[#5A6D63] line-clamp-1 leading-normal">
                          {place.tagline}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(place.id);
                        }}
                        className={`p-1.5 rounded-full transition-colors shrink-0 cursor-pointer ${
                          saved
                            ? "text-[#DC2626] bg-[#FEE2E2]"
                            : "text-[#5A6D63]/40 hover:text-[#DC2626] hover:bg-black/5"
                        }`}
                        title={saved ? "Bỏ lưu" : "Lưu vào yêu thích"}
                        aria-label="Lưu vào yêu thích"
                      >
                        <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
                      </button>
                    </article>
                  );
                })
              )}
            </div>

            {/* Unpinned dishes note */}
            {activeLayer === "am-thuc" && (
              <div className="mt-4 p-3 rounded-2xl bg-[#FEE2E2]/40 border border-[#F87171]/40 text-xs text-[#991B1B] space-y-1.5">
                <div className="font-bold uppercase text-[10px] flex items-center gap-1">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Món đặc sản chưa ghim vùng cố định:
                </div>
                {unpinnedDishes.map((ud) => (
                  <div key={ud.name} className="pt-1 border-t border-[#F87171]/20">
                    <span className="font-bold">{ud.name}</span>: {ud.description}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Right Map View (Desktop always, Mobile when map view) */}
        <main
          className={`flex-1 h-full relative ${
            mobileView === "map" ? "flex" : "hidden lg:flex"
          }`}
        >
          <MapClient
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={handleSelectPlace}
            activeTourId={activeTourId}
            onCloseTour={handleCloseTour}
            debug={isDebug}
          />

          {/* Mobile Bottom Sheet for Selected Place */}
          {selectedPlace && mobileView === "map" && (
            <div className="lg:hidden absolute bottom-3 left-3 right-3 z-30 max-h-[70vh] overflow-y-auto shadow-2xl">
              <PlaceCard
                place={selectedPlace}
                onClose={handleClosePlaceCard}
                onSelectPlace={handleSelectPlace}
                onStartTour={handleStartTour}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
