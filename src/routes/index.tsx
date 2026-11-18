import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsCounterBar } from "@/components/StatsCounterBar";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { SignatureExperiencesSection } from "@/components/SignatureExperiencesSection";
import { DestinationSection } from "@/components/DestinationSection";
import { DestinationModal } from "@/components/DestinationModal";
import { RegionalSection } from "@/components/RegionalSection";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { FoodCultureSection } from "@/components/FoodCultureSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { CraftCultureSection } from "@/components/CraftCultureSection";
import { SeasonalGuideSection } from "@/components/SeasonalGuideSection";
import { InteractiveMapSection } from "@/components/InteractiveMapSection";
import { ItinerarySection } from "@/components/ItinerarySection";
import { TravelTipsTransportSection } from "@/components/TravelTipsTransportSection";
import { TourBookingSection } from "@/components/TourBookingSection";
import { FooterSection } from "@/components/FooterSection";
import {
  destinations,
  type Destination,
  type DestinationCategory,
} from "@/data/ninh-binh";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "NinhBinhTravel — Vịnh Hạ Long Trên Cạn | Di Sản Thế Giới UNESCO",
      },
      {
        name: "description",
        content:
          "Non nước hữu tình, di sản thế giới, đặc sản khó quên. Khám phá Tràng An, Tam Cốc, Hang Múa, Cố Đô Hoa Lư, ẩm thực dê núi cơm cháy và đặt tour trọn gói ưu đãi.",
      },
      {
        property: "og:title",
        content: "NinhBinhTravel — Vịnh Hạ Long Trên Cạn & Di Sản UNESCO",
      },
      {
        property: "og:description",
        content:
          "Chỉ cách Hà Nội khoảng 93–100 km, Ninh Bình mở ra một thế giới khác: núi đá vôi trùng điệp, dòng sông lặng lờ, hang động huyền ảo và nghìn năm lịch sử cố đô.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "Tất cả" | DestinationCategory
  >("Tất cả");
  const [savedIds, setSavedIds] = useState<string[]>(["trang-an", "hang-mua"]);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Load saved destinations from localStorage on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ninhbinh_saved_places");
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("ninhbinh_saved_places", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleClearSaved = () => {
    setSavedIds([]);
    try {
      localStorage.removeItem("ninhbinh_saved_places");
    } catch {}
  };

  const handleOpenDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsModalOpen(true);
  };

  const handleOpenDestinationById = (id: string) => {
    const found = destinations.find((d) => d.id === id);
    if (found) {
      setSelectedDestination(found);
      setIsModalOpen(true);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById("diem-den")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickFilter = (term: string) => {
    setSearchQuery(term);
    if (term === "Dê núi" || term === "Cơm cháy") {
      document.getElementById("am-thuc")?.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById("diem-den")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBooking = () => {
    document.getElementById("dat-tour")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#F5F1E8] text-[#1A3429] selection:bg-[#D6AD72] selection:text-[#173428]">
      {/* Navigation Header */}
      <Navbar
        savedCount={savedIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onQuickFilter={handleQuickFilter}
      />

      {/* Con số ấn tượng (Stats Counter Bar) */}
      <StatsCounterBar />

      {/* Why Choose Ninh Binh Section */}
      <WhyChooseSection onOpenBooking={scrollToBooking} />

      {/* 5 Signature Experiences Section */}
      <SignatureExperiencesSection />

      {/* Destination Section (Asymmetric Editorial Grid) */}
      <DestinationSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        savedIds={savedIds}
        onToggleSave={handleToggleSave}
        onSelectDestination={handleOpenDestination}
      />

      {/* Regional Exploration Section (7 Vùng Cố Đô) */}
      <RegionalSection />

      {/* Food & Culture Magazine Section (Tạp chí ẩm thực, thực đơn 1 ngày & FoodModal) */}
      <FoodCultureSection />

      {/* Experience Visual Storytelling Section */}
      <ExperienceSection />

      {/* Traditional Craft Villages & Culture Section */}
      <CraftCultureSection />

      {/* Seasonal Guide Section (Bốn Mùa Ninh Bình) */}
      <SeasonalGuideSection />

      {/* Synchronized Interactive Map Section */}
      <InteractiveMapSection onSelectDestination={handleOpenDestination} />

      {/* Itinerary Timeline Section (2N1Đ, 3N2Đ, 1 Ngày) */}
      <ItinerarySection />

      {/* Travel Tips & Transportation Section */}
      <TravelTipsTransportSection />

      {/* Tour Booking & Free Consultation Form Section */}
      <TourBookingSection />

      {/* Footer Section */}
      <FooterSection />

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSaved={selectedDestination ? savedIds.includes(selectedDestination.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedIds={savedIds}
        onRemove={handleToggleSave}
        onClear={handleClearSaved}
        onSelectDestination={handleOpenDestinationById}
      />
    </main>
  );
}
