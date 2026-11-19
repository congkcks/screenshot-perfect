import index from "./index.json";
import { callApi } from "./api";

export type Chunk = {
  id: string;
  title: string;
  heading: string;
  text: string;
  type?: string;
  url: string | null;
  verified: boolean;
  embedding?: number[];
};

const rawChunks = (index as { chunks: Chunk[] }).chunks ?? [];

const dot = (a: number[], b: number[]) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    s += (a[i] ?? 0) * (b[i] ?? 0);
  }
  return s;
};

const unit = (v: number[]) => {
  const n = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => x / n);
};

export async function vectorSearch(q: string, k: number) {
  const model = process.env["EMBED_MODEL"];
  if (!model) throw new Error("NO_EMBED_MODEL");

  const r = await callApi<{ data: { embedding: number[] }[] }>(
    "/v1/embeddings",
    { model, input: q },
    15000,
    1,
  );

  const rawEmb = r.data?.[0]?.embedding;
  if (!rawEmb) throw new Error("NO_EMBEDDING_RETURNED");

  const qv = unit(rawEmb);
  return rawChunks
    .filter((c) => Array.isArray(c.embedding) && c.embedding.length > 0)
    .map((c) => ({ c, score: dot(qv, c.embedding!) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/đ/g, "d");

export function keywordSearch(q: string, k: number) {
  const words = fold(q)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1);

  if (words.length === 0) return [];

  return rawChunks
    .map((c) => {
      const t = fold(c.text);
      const h = fold(c.title + " " + c.heading);
      let score = 0;
      for (const w of words) {
        if (h.includes(w)) score += 3;
        if (t.includes(w)) score += 1;
      }
      return { c, score: score / (words.length * 4 || 1) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export async function retrieve(question: string, k = 5): Promise<Chunk[]> {
  const minScore = Number(process.env["RAG_MIN_SCORE"] ?? 0.25);
  let hits: { c: Chunk; score: number }[] = [];

  const hasEmbeddings = rawChunks.some((c) => Array.isArray(c.embedding) && c.embedding.length > 0);

  if (process.env["EMBED_MODEL"] && hasEmbeddings) {
    try {
      hits = await vectorSearch(question, k);
    } catch {
      hits = keywordSearch(question, k);
    }
  } else {
    hits = keywordSearch(question, k);
  }

  // Với tìm kiếm từ khóa dự phòng, hạ ngưỡng lọc xuống 0.08 nếu chưa có điểm cao
  const effectiveMin =
    process.env["EMBED_MODEL"] && hasEmbeddings ? minScore : Math.min(minScore, 0.08);

  return hits.filter((h) => h.score >= effectiveMin).map((h) => h.c);
}
