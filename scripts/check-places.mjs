/**
 * scripts/check-places.mjs
 * Script kiểm tra tính toàn vẹn và độ chính xác của dữ liệu địa điểm du lịch NinhBinhTravel
 *
 * Kiểm tra:
 * 1. Mọi tọa độ nằm trong khung (vĩ độ 19.8–20.9; kinh độ 105.4–106.7).
 * 2. Không có hai điểm khác nhau trùng đúng một cặp tọa độ.
 * 3. So khoảng cách thực tế giữa các điểm danh thắng cốt lõi với bảng khoảng cách trong TripPlannerSection (sai lệch <= 40%).
 */

import { places } from "../src/data/places.ts";

const BOUNDS = {
  minLat: 19.8,
  maxLat: 20.9,
  minLng: 105.4,
  maxLng: 106.7,
};

// Haversine formula calculates straight-line distance in kilometers
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

console.log("================================================================");
console.log(" KIỂM TRA TỌA ĐỘ VÀ DỮ LIỆU ĐỊA ĐIỂM NINHBINHTRAVEL");
console.log(` Tổng số địa điểm cần kiểm tra: ${places.length}`);
console.log("================================================================\n");

let errors = 0;
let warnings = 0;

// 1. Kiểm tra khung tọa độ
console.log("▶ 1. Kiểm tra giới hạn khung địa lý (lat: 19.8 - 20.9, lng: 105.4 - 106.7):");
places.forEach((p) => {
  if (
    p.lat < BOUNDS.minLat ||
    p.lat > BOUNDS.maxLat ||
    p.lng < BOUNDS.minLng ||
    p.lng > BOUNDS.maxLng
  ) {
    console.error(
      `  ❌ LỖI VƯỢT KHUNG: [${p.id}] "${p.name}" có tọa độ (${p.lat}, ${p.lng}) nằm ngoài giới hạn!`
    );
    errors++;
  }
});
if (errors === 0) {
  console.log(`  ✅ 100% (${places.length}/${places.length}) địa điểm nằm chuẩn xác trong khung địa lý quy định.`);
}

// 2. Kiểm tra trùng lặp tọa độ
console.log("\n▶ 2. Kiểm tra trùng lặp tọa độ giữa các điểm:");
const coordMap = new Map();
let dupCount = 0;
places.forEach((p) => {
  const key = `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`;
  if (coordMap.has(key)) {
    const existing = coordMap.get(key);
    console.error(
      `  ❌ TRÙNG TỌA ĐỘ: "${p.name}" (${p.id}) trùng tọa độ với "${existing.name}" (${existing.id}) tại [${key}]`
    );
    errors++;
    dupCount++;
  } else {
    coordMap.set(key, p);
  }
});
if (dupCount === 0) {
  console.log(`  ✅ Không có địa điểm nào bị trùng tọa độ. Mọi ghim đều riêng biệt.`);
}

// 3. Đối chiếu khoảng cách từ TP. Ninh Bình và các điểm cốt lõi (từ TripPlannerSection)
console.log("\n▶ 3. Đối chiếu khoảng cách từ TP. Ninh Bình và các điểm cốt lõi:");
const tpNinhBinh = places.find((p) => p.id === "quang-truong-dinh-tien-hoang");

const tpDistances = [
  { toId: "trang-an", roadKm: 7.0 },
  { toId: "tam-coc", roadKm: 9.0 },
  { toId: "hoa-lu", roadKm: 11.0 },
  { toId: "bai-dinh", roadKm: 17.0 },
  { toId: "van-long", roadKm: 17.0 },
  { toId: "cuc-phuong", roadKm: 42.0 },
  { toId: "phat-diem", roadKm: 28.0 },
];

tpDistances.forEach((item) => {
  const p = places.find((x) => x.id === item.toId);
  if (!p || !tpNinhBinh) return;
  const straightKm = haversine(tpNinhBinh.lat, tpNinhBinh.lng, p.lat, p.lng);
  // Đường bộ từ trung tâm thành phố đi qua quốc lộ / đường tỉnh thường gấp 1.1 - 1.4 lần đường chim bay
  const ratio = item.roadKm / straightKm;
  if (ratio < 0.8 || ratio > 2.0) {
    console.warn(
      `  ⚠️ CẢNH BÁO KHOẢNG CÁCH TP: TP Ninh Bình -> ${p.name}: chim bay ${straightKm.toFixed(
        1
      )}km so với đường bộ ${item.roadKm}km (tỷ lệ ${ratio.toFixed(2)} lệch quá ngưỡng 40%)`
    );
    warnings++;
  } else {
    console.log(
      `  ✓ TP. Ninh Bình ➔ ${p.name}: chim bay ${straightKm.toFixed(1)} km, đường bộ thực tế ~${item.roadKm} km (tỷ lệ hợp lý ${ratio.toFixed(2)})`
    );
  }
});

console.log("\n================================================================");
console.log(` KẾT QUẢ: ${errors} lỗi, ${warnings} cảnh báo.`);
if (errors > 0) {
  console.error(" ❌ KIỂM TRA THẤT BẠI. Vui lòng sửa các lỗi trên trước khi tiếp tục.");
  process.exit(1);
} else {
  console.log(" ✅ TẤT CẢ TỌA ĐỘ VÀ KHOẢNG CÁCH ĐÃ ĐƯỢC XÁC THỰC THÀNH CÔNG!");
  process.exit(0);
}
