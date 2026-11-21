import React, { useState, useEffect } from "react";

export type TourPhotoAccent = "temple" | "water" | "forest" | "karst";

interface TourPhotoProps {
  src: string;
  alt: string;
  accent?: TourPhotoAccent;
  paused?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Tranh đồ họa SVG dự phòng (SceneFallback)
 * Luôn vẽ núi đá vôi, mặt trời/mặt trăng, nước và thuyền nan theo bảng màu nhận diện Ninh Bình:
 * #244B3B (xanh rừng), #769477 (xanh rêu), #D6AD72 (vàng champagne), #F5F1E8 (kem cổ điển).
 */
export function SceneFallback({ accent = "karst" }: { accent?: TourPhotoAccent }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none bg-gradient-to-b from-[#1b382c] via-[#244B3B] to-[#12271e]">
      <svg
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-90"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient bầu trời */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#173428" />
            <stop offset="60%" stopColor="#244B3B" />
            <stop offset="100%" stopColor="#355e4c" />
          </linearGradient>

          {/* Gradient núi xa */}
          <linearGradient id="farKarst" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#416b57" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#244B3B" stopOpacity="0.8" />
          </linearGradient>

          {/* Gradient núi gần */}
          <linearGradient id="nearKarst" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d5845" />
            <stop offset="100%" stopColor="#142b20" />
          </linearGradient>

          {/* Gradient mặt nước */}
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#244B3B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#183629" />
            <stop offset="100%" stopColor="#0d1f17" />
          </linearGradient>
        </defs>

        {/* Nền trời */}
        <rect width="400" height="250" fill="url(#skyGrad)" />

        {/* Mặt trời / Trăng vàng champagne */}
        <circle cx="280" cy="70" r="32" fill="#D6AD72" opacity="0.35" />
        <circle cx="280" cy="70" r="22" fill="#D6AD72" opacity="0.75" />

        {/* Dãy núi vôi xa */}
        <path
          d="M-20 170 Q40 60 100 130 T220 110 T320 90 T420 150 L420 250 L-20 250 Z"
          fill="url(#farKarst)"
        />

        {/* Dãy núi vôi sừng sững tầm trung */}
        <path
          d="M-10 190 Q60 90 130 150 Q190 70 250 160 Q330 85 410 175 L410 250 L-10 250 Z"
          fill="url(#nearKarst)"
          opacity="0.9"
        />

        {/* Điểm nhấn theo chủ đề: temple / water / forest */}
        {accent === "temple" && (
          <g transform="translate(190, 115) scale(0.65)" fill="#D6AD72" opacity="0.95">
            {/* Mái chùa cong cố đô */}
            <path d="M10 25 Q35 0 60 25 Q35 15 10 25 Z" />
            <path d="M18 16 Q35 2 52 16 L52 14 Q35 0 18 14 Z" />
            <rect x="25" y="25" width="20" height="22" fill="#FAF8F4" opacity="0.85" />
            <rect x="31" y="32" width="8" height="15" fill="#142b20" />
            <circle cx="35" cy="1" r="2" fill="#D6AD72" />
          </g>
        )}

        {accent === "forest" && (
          <g fill="#769477" opacity="0.8">
            {/* Cây rừng nguyên sinh */}
            <path d="M50 160 L60 140 L70 160 Z M53 145 L60 130 L67 145 Z" />
            <path d="M75 165 L85 142 L95 165 Z" />
            <path d="M100 170 L110 148 L120 170 Z" />
            {/* Đàn chim Thung Nham */}
            <path d="M160 65 Q165 58 170 65 Q175 58 180 65" stroke="#FAF8F4" strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M190 55 Q194 49 198 55 Q202 49 206 55" stroke="#FAF8F4" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M215 70 Q218 65 221 70 Q224 65 227 70" stroke="#FAF8F4" strokeWidth="1.2" fill="none" opacity="0.6" />
          </g>
        )}

        {/* Mặt nước */}
        <rect x="0" y="175" width="400" height="75" fill="url(#waterGrad)" />

        {/* Làn sóng gợn vàng champagne nhẹ */}
        <line x1="40" y1="195" x2="160" y2="195" stroke="#D6AD72" strokeWidth="1" opacity="0.25" strokeDasharray="30 15 10 10" />
        <line x1="220" y1="210" x2="360" y2="210" stroke="#D6AD72" strokeWidth="1" opacity="0.3" strokeDasharray="40 20 20 10" />
        <line x1="80" y1="225" x2="260" y2="225" stroke="#FAF8F4" strokeWidth="0.8" opacity="0.2" strokeDasharray="50 30" />

        {/* Con thuyền nan Tràng An / Tam Cốc */}
        <g transform="translate(130, 185) scale(0.85)">
          {/* Mạn thuyền nan */}
          <path
            d="M0 12 Q30 22 70 12 Q40 18 0 12 Z"
            fill="#D6AD72"
            opacity="0.9"
          />
          {/* Bóng người chèo đò thanh mảnh */}
          <circle cx="28" cy="4" r="3" fill="#FAF8F4" opacity="0.85" />
          <path d="M28 7 L27 15" stroke="#FAF8F4" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
          <line x1="24" y1="12" x2="38" y2="22" stroke="#D6AD72" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Component hiển thị ảnh điểm dừng có tranh dự phòng kiên cố:
 * - Khi ảnh chưa tải hoặc tải lỗi: tranh SVG luôn hiện đẹp mắt, KHÔNG bao giờ bị khung đen / icon vỡ.
 * - Khi ảnh tải thành công: fade-in mượt mà + hiệu ứng Ken Burns nhẹ.
 * - Hỗ trợ prefers-reduced-motion tự động tắt Ken Burns.
 */
export function TourPhoto({
  src,
  alt,
  accent = "karst",
  paused = false,
  className = "",
  children,
}: TourPhotoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset trạng thái mỗi khi src thay đổi
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Kiểm tra giảm chuyển động (prefers-reduced-motion)
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full overflow-hidden rounded-2xl select-none ${className}`}
    >
      {/* 1. Lớp Tranh đồ họa SVG dự phòng thương hiệu (luôn nằm dưới đáy) */}
      <SceneFallback accent={accent} />

      {/* 2. Lớp Ảnh thật (nếu có lỗi thì gỡ hoàn toàn khỏi DOM để không lộ icon vỡ) */}
      {src && !hasError && (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          onLoad={() => {
            setIsLoaded(true);
            setHasError(false);
          }}
          onError={() => {
            setHasError(true);
            setIsLoaded(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${
            !reducedMotion && !paused && isLoaded ? "animate-kenburns" : ""
          }`}
        />
      )}

      {/* 3. Lớp gradient phủ tăng tương phản cho chữ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* 4. Nội dung chồng lên (Nhãn, Tiêu đề, Số điểm 3/6) */}
      {children && <div className="relative z-10 w-full h-full pointer-events-none">{children}</div>}
    </div>
  );
}
