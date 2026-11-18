import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TripPlannerSection, TICKETS, STAY_LEVELS, FOOD_LEVELS, COST, SPOTS } from "@/components/TripPlannerSection";

describe("TripPlannerSection Component", () => {
  it("renders heading and 5 main navigation tabs", () => {
    render(<TripPlannerSection />);
    expect(screen.getByText(/Lên Kế Hoạch Chuyến Đi/i)).toBeDefined();
    expect(screen.getByRole("tab", { name: /Ước tính chi phí/i })).toBeDefined();
    expect(screen.getByRole("tab", { name: /Địa điểm gần nhau/i })).toBeDefined();
    expect(screen.getByRole("tab", { name: /Di chuyển/i })).toBeDefined();
    expect(screen.getByRole("tab", { name: /Ăn uống/i })).toBeDefined();
    expect(screen.getByRole("tab", { name: /Lưu trú/i })).toBeDefined();
  });

  it("calculates cost dynamically without NaN", () => {
    render(<TripPlannerSection />);
    // Grand total element exists and does not contain NaN
    const totalHeading = screen.getByText(/Tổng Chi Phí Ước Tính/i);
    expect(totalHeading).toBeDefined();
    expect(document.body.textContent).not.toContain("NaN");
  });

  it("handles 1-day trip correctly (stay cost becomes 0 VNĐ)", () => {
    render(<TripPlannerSection />);
    const oneDayBtn = screen.getByRole("button", { name: /1 Ngày/i });
    fireEvent.click(oneDayBtn);

    expect(screen.getByText(/Chuyến đi 1 ngày: Lưu trú = 0đ/i)).toBeDefined();
    expect(document.body.textContent).not.toContain("NaN");
  });

  it("increments and decrements people count within bounds [1, 12]", () => {
    render(<TripPlannerSection />);
    const plusBtn = screen.getByRole("button", { name: /Tăng 1 người/i });
    const minusBtn = screen.getByRole("button", { name: /Giảm 1 người/i });

    // Initial is 2
    expect(screen.getByText(/Tổng Chi Phí Ước Tính \(Đoàn 2 người\)/i)).toBeDefined();

    // Click increment to 3
    fireEvent.click(plusBtn);
    expect(screen.getByText(/Tổng Chi Phí Ước Tính \(Đoàn 3 người\)/i)).toBeDefined();

    // Click decrement back to 2
    fireEvent.click(minusBtn);
    expect(screen.getByText(/Tổng Chi Phí Ước Tính \(Đoàn 2 người\)/i)).toBeDefined();
    expect(document.body.textContent).not.toContain("NaN");
  });

  it("switches tabs between Clusters, Transport, Food, Stay", () => {
    render(<TripPlannerSection />);

    // Switch to Clusters tab
    fireEvent.click(screen.getByRole("tab", { name: /Địa điểm gần nhau/i }));
    expect(screen.getByText(/Bảng Tra Cứu Khoảng Cách Giữa Các Danh Thắng/i)).toBeDefined();

    // Switch to Transport tab
    fireEvent.click(screen.getByRole("tab", { name: /Di chuyển/i }));
    expect(screen.getByText(/Xe Limousine Cao Cấp/i)).toBeDefined();

    // Switch to Food tab
    fireEvent.click(screen.getByRole("tab", { name: /Ăn uống/i }));
    expect(screen.getByText(/Top 6 Đặc Sản Nhất Định Phải Thử/i)).toBeDefined();

    // Switch to Stay tab
    fireEvent.click(screen.getByRole("tab", { name: /Lưu trú/i }));
    expect(screen.getByText(/Nên Chọn Ở Khu Vực Nào Tại Ninh Bình/i)).toBeDefined();
  });

  it("includes the required official disclaimer note at the bottom", () => {
    render(<TripPlannerSection />);
    const requiredDisclaimer =
      "Thông tin, giá vé, chi phí và khoảng cách được tổng hợp từ các nguồn tham khảo trên Internet, chỉ mang tính chất ước tính và có thể thay đổi theo thời gian. Vui lòng kiểm tra thông tin thực tế trước khi tham quan.";
    expect(document.body.textContent).toContain(requiredDisclaimer);
  });

  it("has exported constants TICKETS, STAY_LEVELS, FOOD_LEVELS, COST, SPOTS", () => {
    expect(TICKETS).toBeDefined();
    expect(Object.keys(TICKETS).length).toBeGreaterThan(5);
    expect(STAY_LEVELS.length).toBeGreaterThanOrEqual(3);
    expect(FOOD_LEVELS.length).toBeGreaterThanOrEqual(3);
    expect(COST.transportOptions.length).toBeGreaterThanOrEqual(3);
    expect(COST.distanceMatrix.length).toBeGreaterThanOrEqual(10);
    expect(SPOTS.length).toBeGreaterThanOrEqual(5);
  });
});
