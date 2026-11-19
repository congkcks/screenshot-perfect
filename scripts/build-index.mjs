// scripts/build-index.mjs (Node 20+)
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Tự động nạp .env nếu tồn tại khi chạy độc lập
if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(".env");
  } catch {
    // Không có file .env, tiếp tục với các biến môi trường hệ thống
  }
}

const BASE = process.env.SHOPAIKEY_BASE_URL ?? "https://api.shopaikey.com";
const KEY = process.env.SHOPAIKEY_API_KEY;
const MODEL = process.env.EMBED_MODEL;

const walk = async (dir) =>
  (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
      ),
    )
  ).flat();

function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2] };
}

function chunkBody(title, body, max = 1000, overlap = 150) {
  const out = [];
  const sections = body.split(/\r?\n(?=## )/);
  for (const sec of sections) {
    const headingMatch = sec.match(/^##\s+(.+)/);
    const heading = headingMatch ? headingMatch[1].trim() : "Tổng quan";
    const text = sec.replace(/^##\s+.+\r?\n?/, "").trim();
    if (!text) continue;
    for (let s = 0; s < text.length; s += max - overlap) {
      const piece = text.slice(s, s + max).trim();
      if (piece.length > 40) {
        out.push({ heading, text: `${title} – ${heading}: ${piece}` });
      }
      if (s + max >= text.length) break;
    }
  }
  return out;
}

const unit = (v) => {
  const n = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => +(x / n).toFixed(5));
};

async function embed(inputs) {
  const res = await fetch(`${BASE}/v1/embeddings`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, input: inputs }),
  });
  if (!res.ok) throw new Error(`Embeddings lỗi ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.data.map((d) => unit(d.embedding));
}

async function main() {
  console.log("Đang quét kho tri thức knowledge/...");
  const files = (await walk("knowledge")).filter((f) => f.endsWith(".md"));
  const chunks = [];

  for (const f of files) {
    const raw = await readFile(f, "utf8");
    const { meta, body } = parseFrontMatter(raw);
    const title = meta.title ?? path.basename(f, ".md");
    const pieces = chunkBody(title, body);
    for (const c of pieces) {
      chunks.push({
        id: `${path.basename(f, ".md")}-${chunks.length}`,
        title,
        heading: c.heading,
        text: c.text,
        type: meta.type ?? "khac",
        url: meta.url ?? null,
        verified: meta.verified !== "false",
      });
    }
  }

  console.log(`Đã tạo ${chunks.length} đoạn kiến thức từ ${files.length} file markdown.`);

  if (KEY && MODEL) {
    console.log(`Bắt đầu tạo vector embeddings với model: ${MODEL}...`);
    for (let i = 0; i < chunks.length; i += 16) {
      const batch = chunks.slice(i, i + 16);
      const vecs = await embed(batch.map((c) => c.text));
      vecs.forEach((v, j) => {
        chunks[i + j].embedding = v;
      });
      console.log(`Đã embed ${Math.min(i + 16, chunks.length)}/${chunks.length}`);
    }
    console.log("Hoàn tất tạo embeddings.");
  } else {
    console.log(
      "LƯU Ý: Chưa có SHOPAIKEY_API_KEY hoặc EMBED_MODEL trong .env. Chỉ mục được lưu ở chế độ từ khóa (keyword search fallback).",
    );
  }

  const outPath = "src/server/rag/index.json";
  await writeFile(
    outPath,
    JSON.stringify(
      {
        model: MODEL ?? null,
        dims: chunks[0]?.embedding ? chunks[0].embedding.length : null,
        updatedAt: new Date().toISOString(),
        chunks,
      },
      null,
      2,
    ),
    "utf8",
  );
  console.log(`Đã ghi chỉ mục RAG vào ${outPath} (${chunks.length} đoạn)`);
}

main().catch((err) => {
  console.error("Lỗi khi tạo chỉ mục RAG:", err);
  process.exit(1);
});
