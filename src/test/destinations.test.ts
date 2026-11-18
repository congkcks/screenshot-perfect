import { describe, expect, it } from "vitest";
import { destinations } from "@/data/ninh-binh";

describe("Ninh Binh 20 Destinations Data Integrity", () => {
  it("contains exactly 20 tourist destinations", () => {
    expect(destinations.length).toBe(20);
  });

  it("verifies every destination has valid geographic coordinates in Ninh Binh", () => {
    destinations.forEach((dest) => {
      expect(dest.lat).toBeGreaterThan(20.0);
      expect(dest.lat).toBeLessThan(20.5);
      expect(dest.lng).toBeGreaterThan(105.5);
      expect(dest.lng).toBeLessThan(106.2);
    });
  });

  it("verifies every destination has essential editorial properties", () => {
    const validCategories = ["Thiên nhiên", "Check-in", "Văn hóa", "Tâm linh", "Sinh thái"];

    destinations.forEach((dest) => {
      expect(dest.id).toBeTruthy();
      expect(dest.name).toBeTruthy();
      expect(dest.area).toBeTruthy();
      expect(validCategories).toContain(dest.category);
      expect(dest.rating).toBeGreaterThanOrEqual(4.0);
      expect(dest.rating).toBeLessThanOrEqual(5.0);
      expect(dest.image).toBeTruthy();
      expect(dest.stats.length).toBeGreaterThanOrEqual(3);
      expect(dest.highlights.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("verifies Tràng An is properly configured as the primary UNESCO destination", () => {
    const trangAn = destinations.find((d) => d.id === "trang-an");
    expect(trangAn).toBeDefined();
    expect(trangAn?.lat).toBeCloseTo(20.2562, 3);
    expect(trangAn?.lng).toBeCloseTo(105.9038, 3);
  });
});
