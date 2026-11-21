import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const src = readFileSync("src/data/tours.ts", "utf8");
const paths = [
  ...new Set([...src.matchAll(/["'`](\/(?:images|audio)\/[^"'`]+)["'`]/g)].map((m) => m[1])),
];

console.log("================================================================");
console.log(" KIỂM TRA TÀI NGUYÊN TOUR (ẢNH & AUDIO)");
console.log(` Tổng số tệp cần kiểm tra: ${paths.length}`);
console.log("================================================================");

let bad = 0;
for (const p of paths) {
  const parts = p.split("/").filter(Boolean);
  let dir = "public";
  let ok = true;

  for (const part of parts) {
    if (!existsSync(dir) || !readdirSync(dir).includes(part)) {
      ok = false;
      break;
    }
    dir = path.join(dir, part);
  }

  if (!ok) {
    console.error(" ❌ THIẾU hoặc SAI CHỮ HOA/THƯỜNG:", p);
    bad++;
    continue;
  }

  try {
    execSync(`git ls-files --error-unmatch "public${p}"`, { stdio: "ignore" });
    console.log("  ✓ Tồn tại, đúng chữ hoa/thường & đã commit:", p);
  } catch {
    console.error(" ❌ CHƯA COMMIT vào git:", p);
    bad++;
  }
}

console.log("================================================================");
console.log(bad ? ` KẾT QUẢ: ❌ ${bad} lỗi phát hiện!` : ` KẾT QUẢ: ✅ TẤT CẢ ${paths.length} TỆP HỢP LỆ!`);
console.log("================================================================");

process.exit(bad ? 1 : 0);
