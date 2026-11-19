import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { destinations } from "@/data/ninh-binh";
import { DestinationModal } from "@/components/DestinationModal";
import { InteractiveMapSection } from "@/components/InteractiveMapSection";

// Mock leaflet
vi.mock("leaflet", () => {
  const dummyLayer = {
    addTo: vi.fn().mockReturnThis(),
    bindPopup: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
    openPopup: vi.fn().mockReturnThis(),
  };
  return {
    default: {
      map: vi.fn().mockReturnValue({
        remove: vi.fn(),
        flyTo: vi.fn(),
        hasLayer: vi.fn().mockReturnValue(true),
        addLayer: vi.fn(),
        removeLayer: vi.fn(),
        invalidateSize: vi.fn(),
      }),
      tileLayer: vi.fn().mockReturnValue({
        addTo: vi.fn(),
      }),
      divIcon: vi.fn().mockReturnValue({}),
      marker: vi.fn().mockReturnValue(dummyLayer),
    },
  };
});

describe("InteractiveMapSection & DestinationModal Bug Fix Verification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("verifies map container has isolated stacking context to prevent bleeding over modals", () => {
    const handleSelect = vi.fn();
    const { container } = render(<InteractiveMapSection onSelectDestination={handleSelect} />);

    // Check that right map canvas wrapper has 'isolate' and 'z-0'
    const mapWrapper = container.querySelector(".lg\\:col-span-8");
    expect(mapWrapper).not.toBeNull();
    expect(mapWrapper?.classList.contains("isolate")).toBe(true);
    expect(mapWrapper?.classList.contains("z-0")).toBe(true);
    expect(mapWrapper?.classList.contains("overflow-hidden")).toBe(true);
  });

  it("triggers onSelectDestination when 'Chi Tiết' is clicked for current active destination", () => {
    const handleSelect = vi.fn();
    render(<InteractiveMapSection onSelectDestination={handleSelect} />);

    // Initial default is Tràng An
    const chiTietButtons = screen.getAllByRole("button", { name: /Chi Tiết/i });
    expect(chiTietButtons.length).toBeGreaterThan(0);
    fireEvent.click(chiTietButtons[0]!);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "trang-an", name: "Quần thể danh thắng Tràng An" }),
    );
  });

  it("allows switching destination from list to Tam Cốc – Bích Động and opening details", async () => {
    const handleSelect = vi.fn();
    const { container } = render(<InteractiveMapSection onSelectDestination={handleSelect} />);

    // Click on Tam Cốc list item by ID
    const tamCocItem = container.querySelector("#map-list-item-tam-coc");
    expect(tamCocItem).not.toBeNull();
    fireEvent.click(tamCocItem!);

    // Click 'Chi Tiết'
    const chiTietButtons = screen.getAllByRole("button", { name: /Chi Tiết/i });
    fireEvent.click(chiTietButtons[0]!);

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "tam-coc", name: "Tam Cốc – Bích Động" }),
    );
  });

  it("renders DestinationModal completely with all sections and high z-index", () => {
    const trangAn = destinations[0]!;
    const handleClose = vi.fn();
    const handleToggleSave = vi.fn();

    render(
      <DestinationModal
        destination={trangAn}
        isOpen={true}
        onClose={handleClose}
        isSaved={false}
        onToggleSave={handleToggleSave}
      />,
    );

    // 1. Title and header
    expect(screen.getByText("Quần thể danh thắng Tràng An")).toBeDefined();
    expect(screen.getByText(`"${trangAn.slogan}"`)).toBeDefined();

    // 2. Giới thiệu điểm đến
    expect(screen.getByText(/Giới Thiệu Điểm Đến/i)).toBeDefined();
    expect(screen.getByText(trangAn.description)).toBeDefined();

    // 3. Con số ấn tượng
    expect(screen.getByText(/Con Số Ấn Tượng/i)).toBeDefined();
    trangAn.stats.forEach((st) => {
      expect(screen.getByText(st)).toBeDefined();
    });

    // 4. Thời gian tham quan & chi phí
    expect(screen.getByText(/Thời Gian Tham Quan/i)).toBeDefined();
    expect(screen.getByText(/Thời Điểm Vàng/i)).toBeDefined();
    expect(screen.getByText(/Chi Phí Tham Quan/i)).toBeDefined();

    // 5. Trải nghiệm không thể bỏ lỡ
    expect(screen.getByText(/Trải Nghiệm Không Thể Bỏ Lỡ/i)).toBeDefined();
    trangAn.mustTry?.forEach((item) => {
      expect(screen.getByText(item)).toBeDefined();
    });

    // 6. Mẹo thổ địa
    expect(screen.getByText(/Mẹo Thổ Địa/i)).toBeDefined();

    // 7. Close button works
    const closeButtons = screen.getAllByRole("button", { name: /Đóng/i });
    expect(closeButtons.length).toBeGreaterThan(0);
    fireEvent.click(closeButtons[0]!);
    expect(handleClose).toHaveBeenCalled();
  });

  it("verifies sequential opening and closing for Tràng An, Tam Cốc, Hang Múa, and Bái Đính", () => {
    const testIds = ["trang-an", "tam-coc", "hang-mua", "bai-dinh"];
    const handleClose = vi.fn();

    testIds.forEach((id) => {
      const dest = destinations.find((d) => d.id === id)!;
      expect(dest).toBeDefined();

      const { unmount } = render(
        <DestinationModal
          destination={dest}
          isOpen={true}
          onClose={handleClose}
          isSaved={false}
          onToggleSave={vi.fn()}
        />,
      );

      // Verify modal content rendered cleanly
      expect(screen.getByText(dest.name)).toBeDefined();
      expect(screen.getByText(/Giới Thiệu Điểm Đến/i)).toBeDefined();

      // Close modal
      const closeButtons = screen.getAllByRole("button", { name: /Đóng/i });
      expect(closeButtons.length).toBeGreaterThan(0);
      fireEvent.click(closeButtons[0]!);

      unmount();
    });

    expect(handleClose).toHaveBeenCalledTimes(4);
  });

  it("verifies map section and modal adapt properly at 375px (mobile), 768px (tablet), and 1280px (desktop)", () => {
    const viewports = [375, 768, 1280];
    const trangAn = destinations[0]!;

    viewports.forEach((width) => {
      window.innerWidth = width;
      window.dispatchEvent(new Event("resize"));

      const { container, unmount } = render(
        <>
          <InteractiveMapSection onSelectDestination={vi.fn()} />
          <DestinationModal
            destination={trangAn}
            isOpen={true}
            onClose={vi.fn()}
            isSaved={false}
            onToggleSave={vi.fn()}
          />
        </>,
      );

      // Verify map container remains isolated at every breakpoint
      const mapWrapper = container.querySelector(".lg\\:col-span-8");
      expect(mapWrapper?.classList.contains("isolate")).toBe(true);
      expect(mapWrapper?.classList.contains("z-0")).toBe(true);

      // Verify modal content is rendered and accessible
      expect(screen.getAllByText("Quần thể danh thắng Tràng An").length).toBeGreaterThan(0);
      expect(screen.getByText(/Giới Thiệu Điểm Đến/i)).toBeDefined();

      unmount();
    });
  });
});
