import { callApi } from "./api";
import { retrieve } from "./retrieve";
import { buildMessages, type HistoryMessage } from "./prompt";

export type SourceItem = {
  title: string;
  url: string;
};

export type AnswerResult = {
  answer: string;
  sources: SourceItem[];
};

export async function answer(
  history: HistoryMessage[],
  question: string,
): Promise<AnswerResult> {
  const ctx = await retrieve(question, 5);

  const model =
    process.env["CHAT_MODEL"] ||
    process.env["VITE_CHAT_MODEL"] ||
    "gemini-3.5-flash-lite";

  const response = await callApi<{
    choices?: { message?: { content?: string } }[];
  }>(
    "/v1/chat/completions",
    {
      model,
      messages: buildMessages(history, question, ctx),
      temperature: 0.3, // Thấp để bám sát dữ liệu thực tế
      max_tokens: 700, // Trần chi phí và độ dài câu trả lời
    },
    30000,
    1,
  );

  const rawAnswer = response.choices?.[0]?.message?.content?.trim() ?? "";
  const text =
    rawAnswer ||
    "Mình chưa có đầy đủ thông tin để trả lời câu hỏi này. Bạn thử hỏi thêm về các điểm đến, ẩm thực hoặc lịch trình Ninh Bình nhé!";

  // Thu thập các nguồn tham khảo độc nhất (unique) có link nội bộ
  const sourceMap = new Map<string, SourceItem>();
  for (const c of ctx) {
    if (c.url && !sourceMap.has(c.url)) {
      sourceMap.set(c.url, { title: c.title, url: c.url });
    }
  }

  const sources = Array.from(sourceMap.values());

  return { answer: text, sources };
}
