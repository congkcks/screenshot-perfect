export interface VideoMeta {
  id: string;
  title: string;
  place: string;
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  src1080: string;
  src720: string;
  poster: string;
  duration: number;
  fps: number;
  resolution: string;
  verifiedBy: string[];
  playbackRate?: number;
  note?: string;
}

export const videoManifest: VideoMeta[] = [
  {
    id: "v01-hero",
    title: "Aerial View of Trang An Landscapes in Vietnam",
    place: "Quần thể danh thắng Tràng An (Hero trang chủ)",
    author: "Sergey Guk",
    sourceUrl: "https://www.pexels.com/video/aerial-view-of-trang-an-landscapes-in-vietnam-30468239/",
    license: "Pexels License (Free to use)",
    licenseUrl: "https://www.pexels.com/license/",
    src1080: "/videos/hero/hero-trang-an-1080.mp4",
    src720: "/videos/hero/hero-trang-an-720.mp4",
    poster: "/videos/hero/hero-trang-an-poster.webp",
    duration: 9.0,
    fps: 30,
    resolution: "1920x1080 / 1280x720",
    verifiedBy: ["Pexels Metadata", "Visual Landmark Inspection (Tràng An Karst Valley)"],
    note: "Video đã được cắt ngắn (9s), giảm độ phân giải và bỏ âm thanh để phù hợp với website.",
  },
  {
    id: "v01-alt-trang-an",
    title: "Scenic Aerial View of Trang An, Vietnam",
    place: "Quần thể danh thắng Tràng An (Điểm dừng Tour ảo)",
    author: "Sergey Guk",
    sourceUrl: "https://www.pexels.com/video/scenic-aerial-view-of-trang-an-vietnam-30468300/",
    license: "Pexels License (Free to use)",
    licenseUrl: "https://www.pexels.com/license/",
    src1080: "/videos/trang-an/trang-an-aerial-1080.mp4",
    src720: "/videos/trang-an/trang-an-aerial-720.mp4",
    poster: "/videos/trang-an/trang-an-aerial-poster.webp",
    duration: 6.0,
    fps: 30,
    resolution: "1920x1080 / 1280x720",
    verifiedBy: ["Pexels Metadata", "Visual Landmark Inspection (Dãy núi đá vôi Tràng An)"],
    note: "Video đã được cắt ngắn (6s), chọn đoạn khác với Hero, giảm độ phân giải và bỏ âm thanh.",
  },
  {
    id: "v04-hang-mua",
    title: "A Timelapse Video of a Hang Mua Viewpoint Under the Cloudy Sky",
    place: "Đỉnh Ngọa Long Sơn – Hang Múa (Điểm dừng Tour ảo)",
    author: "GIANG VU",
    sourceUrl: "https://www.pexels.com/video/a-timelapse-video-of-a-hang-mua-viewpoint-under-the-cloudy-sky-15091934/",
    license: "Pexels License (Free to use)",
    licenseUrl: "https://www.pexels.com/license/",
    src1080: "/videos/hang-mua/hang-mua-viewpoint-1080.mp4",
    src720: "/videos/hang-mua/hang-mua-viewpoint-720.mp4",
    poster: "/videos/hang-mua/hang-mua-viewpoint-poster.webp",
    duration: 6.0,
    fps: 30,
    resolution: "1920x1080 / 1280x720",
    playbackRate: 0.8, // Phát êm hơn cho timelapse
    verifiedBy: ["Pexels Metadata", "Visual Landmark Inspection (Đỉnh Ngọa Long Hang Múa)"],
    note: "Video timelapse đã được cắt ngắn (6s), làm chậm tốc độ phát (0.8x) để mắt êm ái hơn.",
  },
];
