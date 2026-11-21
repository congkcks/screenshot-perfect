import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { VideoBackdrop } from "@/components/VideoBackdrop";
import { videoManifest } from "@/data/video-manifest";
import { TOURS } from "@/data/tours";
import { TourPhoto } from "@/components/map/TourPhoto";

describe("Video Backdrop & Pexels Assets Integration Tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("1. Video Manifest Integrity", () => {
    it("contains all 3 approved Pexels video entries with complete metadata", () => {
      expect(videoManifest.length).toBe(3);

      const [hero, trangAn, hangMua] = videoManifest;

      // V01 Hero
      expect(hero?.id).toBe("v01-hero");
      expect(hero?.license).toContain("Pexels");
      expect(hero?.src1080).toBe("/videos/hero/hero-trang-an-1080.mp4");
      expect(hero?.src720).toBe("/videos/hero/hero-trang-an-720.mp4");
      expect(hero?.poster).toBe("/videos/hero/hero-trang-an-poster.webp");
      expect(hero?.duration).toBe(9.0);
      expect(hero?.fps).toBe(30);

      // V01-alt Tràng An
      expect(trangAn?.id).toBe("v01-alt-trang-an");
      expect(trangAn?.src1080).toBe("/videos/trang-an/trang-an-aerial-1080.mp4");
      expect(trangAn?.duration).toBe(6.0);

      // V04 Hang Múa
      expect(hangMua?.id).toBe("v04-hang-mua");
      expect(hangMua?.src1080).toBe("/videos/hang-mua/hang-mua-viewpoint-1080.mp4");
      expect(hangMua?.playbackRate).toBe(0.8);
    });

    it("ensures Tour stops have video attached only for Tràng An and Hang Múa", () => {
      const heritageTour = TOURS.find((t) => t.id === "heritage-tour")!;
      expect(heritageTour).toBeDefined();

      const baiDinh = heritageTour.stops.find((s) => s.placeId === "bai-dinh");
      const trangAn = heritageTour.stops.find((s) => s.placeId === "trang-an");
      const hangMua = heritageTour.stops.find((s) => s.placeId === "hang-mua");
      const hoaLu = heritageTour.stops.find((s) => s.placeId === "hoa-lu");

      expect(baiDinh?.video).toBeUndefined();
      expect(hoaLu?.video).toBeUndefined();

      expect(trangAn?.video).toBeDefined();
      expect(trangAn?.video?.src1080).toBe("/videos/trang-an/trang-an-aerial-1080.mp4");

      expect(hangMua?.video).toBeDefined();
      expect(hangMua?.video?.src1080).toBe("/videos/hang-mua/hang-mua-viewpoint-1080.mp4");
      expect(hangMua?.video?.playbackRate).toBe(0.8);
    });
  });

  describe("2. VideoBackdrop Component Behavior", () => {
    it("renders video element with muted, loop, playsInline attributes", () => {
      const { container } = render(
        <VideoBackdrop
          src1080="/videos/hero/hero-trang-an-1080.mp4"
          src720="/videos/hero/hero-trang-an-720.mp4"
          poster="/videos/hero/hero-trang-an-poster.webp"
          priority={true}
        />
      );

      const video = container.querySelector("video");
      expect(video).toBeInTheDocument();
      expect(video?.muted).toBe(true);
      expect(video).toHaveAttribute("loop");
      expect(video).toHaveAttribute("playsinline");
      expect(video?.poster).toContain("/videos/hero/hero-trang-an-poster.webp");

      // Poster fallback image is also rendered
      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();
      expect(img?.src).toContain("/videos/hero/hero-trang-an-poster.webp");
    });

    it("handles video error by showing fallback image without breaking", () => {
      const { container } = render(
        <VideoBackdrop
          src1080="/videos/hero/hero-trang-an-1080.mp4"
          poster="/videos/hero/hero-trang-an-poster.webp"
          priority={true}
        />
      );

      const video = container.querySelector("video");
      expect(video).toBeInTheDocument();

      // Trigger video error
      if (video) {
        fireEvent.error(video);
      }

      // Poster image becomes visible
      const img = container.querySelector("img");
      expect(img).toHaveClass("opacity-100");
    });

    it("renders children with proper z-index and overlays", () => {
      const { getByText } = render(
        <VideoBackdrop
          src1080="/videos/hero/hero-trang-an-1080.mp4"
          poster="/videos/hero/hero-trang-an-poster.webp"
        >
          <h1>Discover Ninh Bình</h1>
        </VideoBackdrop>
      );

      expect(getByText("Discover Ninh Bình")).toBeInTheDocument();
    });
  });

  describe("3. TourPhoto Video Integration", () => {
    it("renders video in TourPhoto when video prop is provided", () => {
      const { container } = render(
        <TourPhoto
          src="/images/02-trang-an/trang-an-01-thuyen-xuyen-hang.webp"
          alt="Tràng An Aerial"
          video={{
            src1080: "/videos/trang-an/trang-an-aerial-1080.mp4",
            src720: "/videos/trang-an/trang-an-aerial-720.mp4",
            poster: "/videos/trang-an/trang-an-aerial-poster.webp",
          }}
          paused={false}
        />
      );

      const video = container.querySelector("video");
      expect(video).toBeInTheDocument();
      expect(video?.muted).toBe(true);
      expect(video).toHaveAttribute("loop");
    });

    it("renders only static photo and SVG fallback when no video prop is provided", () => {
      const { container } = render(
        <TourPhoto
          src="/images/05-chua-bai-dinh/bai-dinh-01-bao-thap.webp"
          alt="Chùa Bái Đính"
          accent="temple"
          paused={false}
        />
      );

      const video = container.querySelector("video");
      expect(video).toBeNull();

      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();

      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });
});
