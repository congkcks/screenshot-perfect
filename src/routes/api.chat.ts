import { createFileRoute } from "@tanstack/react-router";
import { answer } from "../server/rag/answer";
import {
  checkRate,
  checkDaily,
  norm,
  getCache,
  setCache,
} from "../server/rag/guards";

const FRIENDLY = {
  busy: "Hướng dẫn viên đang hơi bận, bạn thử lại sau ít phút nhé.",
  cap: "Hôm nay hướng dẫn viên đã trả lời khá nhiều rồi, mời bạn quay lại vào ngày mai nhé.",
  error: "Mình gặp trục trặc nhỏ khi kết nối. Bạn thử lại giúp mình nhé.",
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            "local";
          const body = await request.json().catch(() => null);
          const question =
            typeof body?.message === "string" ? body.message.trim() : "";

          if (!question || question.length > 500) {
            return Response.json(
              { error: "Câu hỏi cần từ 1 đến 500 ký tự." },
              { status: 400 },
            );
          }

          const rawHistory = Array.isArray(body?.history) ? body.history : [];
          const history = rawHistory
            .filter(
              (m: unknown) =>
                m != null &&
                typeof m === "object" &&
                "role" in m &&
                "content" in m &&
                (m.role === "user" || m.role === "assistant") &&
                typeof m.content === "string",
            )
            .slice(-6)
            .map((m: { role: "user" | "assistant"; content: string }) => ({
              role: m.role,
              content: String(m.content).slice(0, 800),
            }));

          // Kiểm tra giới hạn tốc độ (Rate Limit 10 req/phút/IP)
          if (!checkRate(ip)) {
            return Response.json(
              { answer: FRIENDLY.busy, sources: [] },
              { status: 429 },
            );
          }

          // Kiểm tra cache câu hỏi lặp đối với tin nhắn mở đầu
          const key = norm(question);
          const cached = history.length === 0 ? getCache(key) : null;
          if (cached) {
            return Response.json(cached);
          }

          // Kiểm tra trần hạn mức số lượt trong ngày (DAILY_REQUEST_CAP)
          if (!checkDaily()) {
            return Response.json(
              { answer: FRIENDLY.cap, sources: [] },
              { status: 429 },
            );
          }

          const result = await answer(history, question);

          if (history.length === 0) {
            setCache(key, result);
          }

          return Response.json(result);
        } catch {
          // Trả về thông báo thân thiện, không làm sập client hay lộ lỗi nội bộ
          return Response.json(
            { answer: FRIENDLY.error, sources: [] },
            { status: 200 },
          );
        }
      },
    },
  },
});
