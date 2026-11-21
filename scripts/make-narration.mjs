/**
 * scripts/make-narration.mjs
 * Script tạo trước (pre-generate) file âm thanh thuyết minh mp3 cho các điểm dừng tour ảo
 * Sử dụng API Text-to-Speech (ShopAIKey hoặc OpenAI tương thích).
 *
 * Chạy cục bộ:
 *   node --env-file-if-exists=.env scripts/make-narration.mjs
 *
 * Các file sinh ra được lưu tại `public/audio/narration/<placeId>.mp3`.
 * Trên trình duyệt, nếu chưa có file mp3, ứng dụng sẽ tự động chuyển sang Web Speech API (speechSynthesis) hoàn toàn miễn phí.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { TOURS } from "../src/data/tours.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/audio/narration");

const API_KEY = process.env.SHOPAIKEY_API_KEY || process.env.OPENAI_API_KEY;
const BASE_URL = process.env.SHOPAIKEY_BASE_URL || "https://api.shopaikey.com";
const TTS_MODEL = process.env.TTS_MODEL || "tts-1";
const TTS_VOICE = process.env.TTS_VOICE || "alloy";

console.log("================================================================");
console.log(" TẠO FILE THUYẾT MINH ÂM THANH TOUR ẢO (PRE-GENERATION)");
console.log("================================================================\n");

if (!API_KEY) {
  console.log("ℹ️  Không tìm thấy API Key (SHOPAIKEY_API_KEY hoặc OPENAI_API_KEY) trong .env.");
  console.log("ℹ️  Hệ thống trên client sẽ sử dụng Web Speech API (speechSynthesis) tự nhiên của trình duyệt.");
  console.log("ℹ️  Khi bạn có key, hãy điền vào .env và chạy lại lệnh này để xuất file MP3 chất lượng cao.\n");
  process.exit(0);
}

if (!existsSync(OUT_DIR)) {
  await mkdir(OUT_DIR, { recursive: true });
}

// Gom danh sách tất cả các điểm dừng không trùng lặp
const stopMap = new Map();
TOURS.forEach((tour) => {
  tour.stops.forEach((stop) => {
    if (!stopMap.has(stop.placeId)) {
      stopMap.set(stop.placeId, stop);
    }
  });
});

console.log(`Tìm thấy ${stopMap.size} điểm dừng cần sinh thuyết minh...\n`);

for (const [placeId, stop] of stopMap.entries()) {
  const filePath = resolve(OUT_DIR, `${placeId}.mp3`);
  if (existsSync(filePath)) {
    console.log(`⏩ [${placeId}] File đã tồn tại, bỏ qua.`);
    continue;
  }

  console.log(`🎙️  Đang tạo giọng đọc cho [${stop.title}]...`);
  try {
    const res = await fetch(`${BASE_URL}/v1/audio/speech`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: TTS_MODEL,
        voice: TTS_VOICE,
        input: stop.text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`  ⚠️ Lỗi khi gọi TTS API cho [${placeId}]: HTTP ${res.status} - ${errText}`);
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(filePath, buffer);
    console.log(`  ✅ Đã lưu ${filePath} (${(buffer.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ❌ Lỗi kết nối khi sinh âm thanh cho [${placeId}]:`, err.message);
  }
}

console.log("\n================================================================");
console.log(" HOÀN TẤT TIẾN TRÌNH XUẤT THUYẾT MINH MP3!");
console.log(" Ghi chú bản quyền: Giọng đọc được tạo bằng trí tuệ nhân tạo (AI-generated speech).");
console.log("================================================================\n");
