import React, { useState, useEffect, useRef } from "react";

export interface VideoBackdropProps {
  src1080: string;
  src720?: string;
  poster: string;
  fallbackImage?: string;
  priority?: boolean;
  playbackRate?: number;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

/**
 * Component VideoBackdrop:
 * Hiển thị video nền mượt mà, sang trọng chuẩn Premium Editorial Travel:
 * - Không tiếng (muted, playsInline), tự động lặp (loop).
 * - Tự động chọn 720p trên màn hình nhỏ/mobile để tiết kiệm băng thông.
 * - Tiết kiệm tài nguyên: Chỉ phát khi nằm trong viewport (IntersectionObserver) & dừng khi chuyển tab (visibilitychange).
 * - Tôn trọng người dùng: Tắt video, chỉ hiện poster khi bật prefers-reduced-motion hoặc Save-Data/mạng 2G.
 * - Bền bỉ (Robust Fallback): Nếu video lỗi, hiển thị poster/ảnh tĩnh dự phòng mà không vỡ giao diện.
 */
export function VideoBackdrop({
  src1080,
  src720,
  poster,
  fallbackImage,
  priority = false,
  playbackRate = 1.0,
  className = "",
  overlayClassName = "bg-gradient-to-t from-[#0F231B] via-[#0F231B]/45 to-[#0F231B]/70",
  children,
  ariaLabel = "Video phong cảnh nền",
}: VideoBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hasVideoError, setHasVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
  const [isInViewport, setIsInViewport] = useState(priority);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // 1. Kiểm tra prefers-reduced-motion, Save-Data, mạng 2G
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prefers reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setShouldPlayVideo(false);
    }
    const motionHandler = (e: MediaQueryListEvent) => {
      if (e.matches) setShouldPlayVideo(false);
    };
    motionQuery.addEventListener("change", motionHandler);

    // Save-data / Slow connection
    const navConn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    if (navConn) {
      if (navConn.saveData || navConn.effectiveType === "2g" || navConn.effectiveType === "slow-2g") {
        setShouldPlayVideo(false);
      }
    }

    // Mobile screen check (dùng 720p)
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      motionQuery.removeEventListener("change", motionHandler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // 2. IntersectionObserver: Chỉ phát khi nằm trong viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3. Quản lý phát / tạm dừng dựa vào viewport, tab visibility và playbackRate
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlayVideo || hasVideoError) return;

    video.playbackRate = playbackRate;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isInViewport) {
        video.play().catch(() => {});
      }
    };

    if (isInViewport && !document.hidden) {
      const playPromise = video.play();
      if (playPromise !== undefined && typeof playPromise?.catch === "function") {
        playPromise.catch(() => {
          // Trình duyệt có thể chặn tự phát nếu chưa tương tác
        });
      }
    } else {
      video.pause();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isInViewport, shouldPlayVideo, hasVideoError, playbackRate]);

  const activeVideoSource = isMobileScreen && src720 ? src720 : src1080;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Lớp Poster / Fallback tĩnh (luôn sẵn sàng dưới nền) */}
      <img
        src={poster || fallbackImage}
        alt=""
        aria-hidden="true"
        fetchPriority={priority ? "high" : "auto"}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
          isVideoLoaded && !hasVideoError ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Lớp Video nền */}
      {shouldPlayVideo && !hasVideoError && (
        <video
          ref={videoRef}
          key={activeVideoSource}
          muted
          loop
          playsInline
          autoPlay={priority}
          preload={priority ? "auto" : "metadata"}
          poster={poster}
          aria-hidden="true"
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => {
            setHasVideoError(true);
            setIsVideoLoaded(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {src720 && <source src={src720} type="video/mp4" media="(max-width: 767px)" />}
          <source src={src1080} type="video/mp4" />
        </video>
      )}

      {/* Lớp phủ Overlay màu & Vignette đảm bảo độ tương phản đọc chữ */}
      {overlayClassName && (
        <div className={`absolute inset-0 z-10 pointer-events-none ${overlayClassName}`} />
      )}

      {/* Nội dung lồng bên trong nếu có */}
      {children && <div className="relative z-20 w-full h-full">{children}</div>}
    </div>
  );
}
export default VideoBackdrop;
