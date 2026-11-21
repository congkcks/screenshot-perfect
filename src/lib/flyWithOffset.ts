import type L from "leaflet";

/**
 * Di chuyển camera bản đồ Leaflet có bù trừ lệch tâm (offset)
 * Giúp điểm đến luôn nằm ở vùng bản đồ nhìn thấy rõ (không bị bảng điều khiển hoặc bottom sheet che khuất).
 *
 * @param map Đối tượng Leaflet Map
 * @param target Tọa độ điểm dừng [lat, lng] hoặc L.LatLng
 * @param zoom Mức zoom mong muốn (tự động giới hạn trần <= 15)
 * @param offset Pixel bù trừ: x > 0 đẩy điểm sang trái (cho panel bên phải); y > 0 đẩy điểm lên trên (cho bottom sheet)
 * @param opts Tùy chọn thời gian bay hoặc tắt hoạt họa
 */
export function flyWithOffset(
  map: L.Map,
  target: L.LatLngExpression,
  zoom: number,
  offset: { x: number; y: number },
  opts: { duration?: number; animate?: boolean } = {}
) {
  const z = Math.min(zoom, 15);

  const targetLatLng = (
    Array.isArray(target)
      ? { lat: (target as [number, number])[0], lng: (target as [number, number])[1] }
      : target
  ) as L.LatLngLiteral;

  // Chiếu điểm mục tiêu sang pixel tại mức zoom z, cộng offset bù trừ, rồi chiếu ngược lại LatLng
  const p = map.project(targetLatLng, z).add([offset.x, offset.y]);
  const center = map.unproject(p, z);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (opts.animate === false || prefersReducedMotion) {
    map.setView(center, z, { animate: false });
  } else {
    map.flyTo(center, z, { duration: opts.duration ?? 1.8 });
  }
}
