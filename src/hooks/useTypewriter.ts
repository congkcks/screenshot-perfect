import { useEffect, useMemo, useState, useCallback } from "react";

/**
 * Hook máy đánh chữ an toàn cho tiếng Việt:
 * - Chuẩn hóa chuỗi bằng NFC (Unicode Normalization Form C) tránh bị lỗi hiển thị dấu tổ hợp giữa chừng.
 * - Tổng thời gian gõ tối đa <= 3.2 giây (maxMs), tự động tăng tốc với câu dài.
 * - Hỗ trợ chạm/bấm skip() để hiển thị ngay lập tức toàn bộ câu chữ.
 * - Tự động hiển thị toàn bộ ngay khi người dùng bật prefers-reduced-motion.
 */
export function useTypewriter(text: string, reduced = false, maxMs = 3200) {
  const chars = useMemo(() => Array.from((text || "").normalize("NFC")), [text]);
  const [n, setN] = useState(reduced ? chars.length : 0);

  useEffect(() => {
    if (reduced) {
      setN(chars.length);
      return;
    }
    setN(0);
    // Tính khoảng nghỉ giữa mỗi ký tự để tổng thời gian hoàn tất không vượt quá maxMs
    const delay = Math.min(34, Math.max(12, maxMs / Math.max(1, chars.length)));
    const id = setInterval(() => {
      setN((v) => (v >= chars.length ? v : v + 1));
    }, delay);
    return () => clearInterval(id);
  }, [chars, reduced, maxMs]);

  const skip = useCallback(() => {
    setN(chars.length);
  }, [chars.length]);

  return {
    shown: chars.slice(0, n).join(""),
    done: n >= chars.length,
    skip,
  };
}
