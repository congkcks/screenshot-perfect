/**
 * Các hàm tạo URL tiện ích mở trên Google Maps (Client-side URL Links)
 * HOÀN TOÀN MIỄN PHÍ - KHÔNG CẦN API KEY - KHÔNG TỐN HẠN MỨC
 */

export const directionsUrl = (lat: number, lng: number): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export const streetViewUrl = (lat: number, lng: number): string =>
  `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;

export const searchUrl = (q: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
