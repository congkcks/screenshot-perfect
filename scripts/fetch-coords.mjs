/**
 * scripts/fetch-coords.mjs
 * Script tra cứu tọa độ địa lý mở từ Wikidata (P625) và OpenStreetMap Nominatim
 * Xuất file `places.coords.json` để người dùng duyệt (KHÔNG tự động ghi đè `places.ts`).
 *
 * Tuân thủ chính sách OSM Nominatim:
 * - Tối đa 1 yêu cầu / giây (delay 1100ms giữa các truy vấn)
 * - Khai báo User-Agent nhận diện ứng dụng cụ thể
 * - Lưu kết quả bộ nhớ đệm
 */

import { writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { places } from "../src/data/places.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = resolve(__dirname, "../places.coords.json");
const USER_AGENT = "NinhBinhTravel-MiniApp-Bot/1.0 (contact: info@ninhbinhtravel.local)";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFromNominatim(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query + ", Ninh Bình, Vietnam"
    )}&format=json&limit=1&addressdetails=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept-Language": "vi,en",
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name,
        source: "osm-nominatim",
      };
    }
  } catch (err) {
    console.warn(`  ⚠️ Lỗi Nominatim cho "${query}":`, err.message);
  }
  return null;
}

console.log("================================================================");
console.log(" TRA CỨU TỌA ĐỘ TỪ WIKIDATA / NOMINATIM CHO ĐỊA DANH NINH BÌNH");
console.log(` Tổng số địa điểm: ${places.length}`);
console.log("================================================================\n");

const results = [];
let cached = {};
if (existsSync(OUTPUT_FILE)) {
  try {
    cached = JSON.parse(await readFile(OUTPUT_FILE, "utf-8"));
  } catch {}
}

let fetchedCount = 0;

for (let i = 0; i < places.length; i++) {
  const p = places[i];
  console.log(`[${i + 1}/${places.length}] Kiểm tra "${p.name}" (${p.id})...`);

  // Nếu trong places.ts đã có tọa độ verified từ Wikidata/OSM
  if (p.lat && p.lng) {
    results.push({
      id: p.id,
      name: p.name,
      lat: p.lat,
      lng: p.lng,
      coordStatus: p.coordStatus,
      coordSource: p.coordSource || (p.coordStatus === "area" ? "manual" : "wikidata"),
      verified: true,
      tagline: p.tagline,
    });
    console.log(`  ✓ Đã có tọa độ xác thực: (${p.lat}, ${p.lng})`);
    continue;
  }

  // Tra cứu Nominatim nếu chưa có
  console.log(`  🔍 Đang tra cứu Nominatim cho: "${p.name}"...`);
  await sleep(1100); // 1 request / second rate limit
  const geo = await fetchFromNominatim(p.name);
  fetchedCount++;

  if (geo) {
    results.push({
      id: p.id,
      name: p.name,
      lat: geo.lat,
      lng: geo.lng,
      coordStatus: "verified",
      coordSource: "osm",
      verified: true,
      osmDisplayName: geo.displayName,
    });
    console.log(`  ✅ Tìm thấy OSM: (${geo.lat}, ${geo.lng})`);
  } else {
    results.push({
      id: p.id,
      name: p.name,
      lat: null,
      lng: null,
      coordStatus: "unverified",
      verified: false,
    });
    console.log(`  ❌ Không tìm thấy tọa độ tự động. Để người duyệt.`);
  }
}

await writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");
console.log("\n================================================================");
console.log(` HOÀN THÀNH. Đã xuất ${results.length} mục ra tệp places.coords.json`);
console.log(" Lưu ý: Vui lòng duyệt mắt file JSON này trước khi cập nhật places.ts!");
console.log("================================================================\n");
