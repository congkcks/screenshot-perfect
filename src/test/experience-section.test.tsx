import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ExperienceSection } from "@/components/ExperienceSection";
import { experiences } from "@/data/ninh-binh";

describe("ExperienceSection Component", () => {
  it("renders with the first experience selected by default", () => {
    render(<ExperienceSection />);
    const firstExp = experiences[0];
    expect(screen.getByRole("heading", { name: "Nhịp Đi Của Riêng Bạn." })).toBeDefined();
    // The title appears in the story card and in the details side
    expect(screen.getAllByText(firstExp.title).length).toBeGreaterThan(0);
    expect(screen.getAllByText(firstExp.location).length).toBeGreaterThan(0);
  });

  it("verifies all experiences have local assets in /assets/experiences/", () => {
    for (const exp of experiences) {
      expect(exp.image).toMatch(/^\/assets\/experiences\/.*\.webp$/);
      if (exp.fallbackImage) {
        expect(exp.fallbackImage).toMatch(/^\/(assets|images)\//);
      }
    }
  });

  it("allows switching tabs across all experiences", () => {
    render(<ExperienceSection />);

    experiences.forEach((exp, idx) => {
      const button = screen.getByText(new RegExp(`0${idx + 1}\\.\\s*${exp.category}`));
      fireEvent.click(button);
      expect(screen.getAllByText(exp.title).length).toBeGreaterThan(0);
    });
  });

  it("handles image error and falls back gracefully", async () => {
    render(<ExperienceSection />);
    const img = document.querySelector("img");
    expect(img).not.toBeNull();
    const initialSrc = img?.getAttribute("src");
    expect(initialSrc).toBe(experiences[0].image);

    // Simulate image error
    fireEvent.error(img!);

    // Should switch to fallback image asynchronously
    await waitFor(() => {
      const updatedImg = document.querySelector("img");
      expect(updatedImg?.getAttribute("src")).toBe(experiences[0].fallbackImage);
    });
  });
});
