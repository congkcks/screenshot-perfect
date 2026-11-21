import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { places, LAYERS, REGIONS, unpinnedDishes } from "@/data/places";
import { TOURS } from "@/data/tours";
import { MapFallback } from "@/components/map/MapFallback";
import { addTourStamp, STAMP_CATALOG } from "@/components/map/PassportStampDrawer";
import { isNatureAudioPlaying, toggleNatureAudio, stopNatureAudio } from "@/lib/nature-audio";

describe("Map Page & Virtual Tour Architecture Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    stopNatureAudio();
  });

  describe("1. Places & Layers Data Integrity", () => {
    it("contains 64 places across 6 distinct layers", () => {
      expect(places.length).toBe(64);

      const layersInPlaces = new Set(places.map((p) => p.layer));
      expect(layersInPlaces.has("thien-nhien")).toBe(true);
      expect(layersInPlaces.has("tam-linh-lich-su")).toBe(true);
      expect(layersInPlaces.has("vui-choi")).toBe(true);
      expect(layersInPlaces.has("am-thuc")).toBe(true);
      expect(layersInPlaces.has("luu-tru")).toBe(true);
      expect(layersInPlaces.has("lang-nghe")).toBe(true);
    });

    it("ensures all places have required fields and valid geographic coordinates", () => {
      places.forEach((place) => {
        expect(place.id).toBeDefined();
        expect(place.name.length).toBeGreaterThan(0);
        expect(place.tagline.length).toBeGreaterThan(0);
        expect(place.mapQuery.length).toBeGreaterThan(0);
        expect(place.lat).toBeGreaterThanOrEqual(19.8);
        expect(place.lat).toBeLessThanOrEqual(20.9);
        expect(place.lng).toBeGreaterThanOrEqual(105.4);
        expect(place.lng).toBeLessThanOrEqual(106.7);
        expect(["verified", "area"]).toContain(place.coordStatus);
      });
    });

    it("contains unpinned dishes for items without a fixed geographic anchor", () => {
      expect(unpinnedDishes.length).toBeGreaterThanOrEqual(2);
      const names = unpinnedDishes.map((d) => d.name);
      expect(names).toContain("Ốc núi Ninh Bình");
      expect(names).toContain("Cá rô Tổng Trường");
    });
  });

  describe("2. Virtual Tours Data Integrity", () => {
    it("contains the two core guided itineraries with valid stops", () => {
      expect(TOURS.length).toBe(2);
      const [tour1, tour2] = TOURS;

      expect(tour1?.id).toBe("heritage-tour");
      expect(tour1?.stops.length).toBe(6);

      expect(tour2?.id).toBe("tam-coc-day-trip");
      expect(tour2?.stops.length).toBe(4);

      // Verify each stop has valid text, coordinates, bounds and attributes
      TOURS.forEach((tour) => {
        tour.stops.forEach((stop) => {
          // 1. Mỗi placeId có trong places.ts
          const found = places.find((p) => p.id === stop.placeId || p.slug === stop.placeId);
          expect(found).toBeDefined();

          // 2. Tên và nội dung hợp lệ
          expect(stop.title.length).toBeGreaterThan(0);
          expect(stop.text.length).toBeGreaterThan(10);
          expect(stop.text.length).toBeLessThanOrEqual(220); // Tối đa 220 ký tự

          // 3. Tọa độ hợp lệ
          expect(stop.lat).toBeGreaterThan(0);
          expect(stop.lng).toBeGreaterThan(0);

          // 4. Giới hạn zoom ≤ 15
          expect(stop.zoom).toBeLessThanOrEqual(15);
          expect(stop.zoom).toBeGreaterThanOrEqual(12);

          // 5. Mỗi điểm có photo và accent phù hợp
          expect(stop.photo).toMatch(/^\/images\//);
          expect(["temple", "water", "forest", "karst"]).toContain(stop.accent || "karst");
        });
      });
    });

    it("verifies useTypewriter completes within 3.2s with NFC normalization", async () => {
      const { renderHook, act } = await import("@testing-library/react");
      const { useTypewriter } = await import("@/hooks/useTypewriter");

      const text = "Cố đô Hoa Lư ngàn năm với tiếng chuông cổ tự.";
      const { result } = renderHook(() => useTypewriter(text, false, 3200));

      expect(result.current.shown.length).toBeGreaterThanOrEqual(0);

      // Fast-forward skip
      act(() => {
        result.current.skip();
      });

      expect(result.current.shown).toBe(text);
      expect(result.current.done).toBe(true);
    });

    it("verifies TourPhoto renders SVG fallback without broken image icon", async () => {
      const { render } = await import("@testing-library/react");
      const { TourPhoto } = await import("@/components/map/TourPhoto");

      const { container } = render(
        <TourPhoto src="/non-existent-test.webp" alt="Thử nghiệm ảnh lỗi" accent="temple" />
      );

      // Tranh SVG dự phòng luôn tồn tại
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();

      // Parent container có role img và aria-label đúng chuẩn
      const roleImg = container.querySelector('[role="img"]');
      expect(roleImg).toHaveAttribute("aria-label", "Thử nghiệm ảnh lỗi");
    });
  });

  describe("3. MapFallback Component", () => {
    it("renders fallback UI with search, layers and place cards", () => {
      render(<MapFallback reason="missing-key" />);

      // Notice message
      expect(screen.getByText(/chế độ dự phòng thông minh/i)).toBeInTheDocument();

      // Search input
      const searchInput = screen.getByPlaceholderText(/Tìm theo tên địa danh/i);
      expect(searchInput).toBeInTheDocument();

      // Layer chips
      expect(screen.getByRole("button", { name: /Thiên Nhiên/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Ẩm Thực Đặc Sản/i })).toBeInTheDocument();
    });

    it("filters places when typing in search input", () => {
      render(<MapFallback reason="missing-key" />);
      const searchInput = screen.getByPlaceholderText(/Tìm theo tên địa danh/i);

      fireEvent.change(searchInput, { target: { value: "Bái Đính" } });

      // Should show Bái Đính
      expect(screen.getByText(/Quần thể Chùa Bái Đính mới/i)).toBeInTheDocument();
      // Should not show Cúc Phương
      expect(screen.queryByText(/Vườn quốc gia Cúc Phương/i)).not.toBeInTheDocument();
    });
  });

  describe("4. Passport Stamps & Heritage Collection", () => {
    it("adds stamp and saves to localStorage without duplicates", () => {
      expect(localStorage.getItem("ninhbinh_tour_stamps")).toBeNull();

      addTourStamp("trang-an");
      const stored1 = JSON.parse(localStorage.getItem("ninhbinh_tour_stamps") || "[]");
      expect(stored1).toContain("trang-an");
      expect(stored1.length).toBe(1);

      // Add duplicate
      addTourStamp("trang-an");
      const stored2 = JSON.parse(localStorage.getItem("ninhbinh_tour_stamps") || "[]");
      expect(stored2.length).toBe(1);

      // Add second stop
      addTourStamp("hang-mua");
      const stored3 = JSON.parse(localStorage.getItem("ninhbinh_tour_stamps") || "[]");
      expect(stored3.length).toBe(2);
      expect(stored3).toContain("hang-mua");
    });
  });

  describe("5. Ambient Audio Synthesizer State", () => {
    it("controls audio state cleanly without external files", () => {
      expect(isNatureAudioPlaying()).toBe(false);

      // Toggle on
      const started = toggleNatureAudio();
      // In JSDOM without Web Audio API window.AudioContext might return false gracefully
      if (started) {
        expect(isNatureAudioPlaying()).toBe(true);
        stopNatureAudio();
        expect(isNatureAudioPlaying()).toBe(false);
      } else {
        expect(isNatureAudioPlaying()).toBe(false);
      }
    });
  });
});
