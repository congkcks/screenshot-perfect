import { DEMO_CONFIG } from "@/config/demo";

export interface DemoChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DemoApiResponse {
  answer: string;
  sources: Array<{ title: string; url: string }>;
}

// 1. System prompt siêu ngắn gọn (~45 từ) giúp tiết kiệm tối đa TPM / context window
const COMPACT_SYSTEM_PROMPT =
  "Bạn là Hướng dẫn viên du lịch Ninh Bình. Trả lời súc tích trong 1-2 đoạn ngắn (dưới 150 từ), giọng thân thiện, giới thiệu địa danh, ẩm thực, lịch trình cố đô, không bịa giá vé hay số điện thoại.";

// Giới hạn context ngắn
const MAX_INPUT_CHARS = 350;
const MAX_HISTORY_TURNS = 2; // Chỉ giữ tối đa 1 lượt hỏi-đáp trước đó
const MAX_RESPONSE_TOKENS = 350;

// Trạng thái chống gọi dồn dập (in-flight & cooldown)
let inFlight = false;
let cooldownUntil = 0;

// Bộ nhớ đệm câu trả lời trong phiên (RAM Cache)
const RESPONSE_CACHE = new Map<string, DemoApiResponse>();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeKey(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .trim()
    .replace(/[?!.,;:_'"()-]/g, "")
    .replace(/\s+/g, " ");
}

// 2. Đáp án soạn sẵn cho các câu hỏi mẫu (0 token, 0ms latency, không bao giờ chạm rate limit)
const PRESET_ANSWERS: Record<string, DemoApiResponse> = {
  "trang an co gi dac biet": {
    answer:
      "Quần thể danh thắng Tràng An là Di sản Văn hóa & Thiên nhiên Thế giới kép duy nhất tại Đông Nam Á. Nơi đây nổi tiếng với hệ thống núi đá vôi karst hàng triệu năm, các thung lũng ngập nước và những hang động xuyên thủy kỳ ảo (hang Địa Linh, hang Tối, hang Sáng...). Trải nghiệm đặc sắc nhất là ngồi thuyền nan ngắm cảnh non nước hữu tình và viếng thăm các ngôi đền cổ linh thiêng.",
    sources: [
      { title: "Danh thắng Tràng An", url: "/#diem-den" },
      { title: "So sánh Tràng An & Tam Cốc", url: "/blog/trang-an-hay-tam-coc-nen-chon-noi-nao" },
    ],
  },
  "goi y lich trinh 2 ngay 1 dem": {
    answer:
      "Lịch trình 2 ngày 1 đêm lý tưởng khám phá Ninh Bình:\n• Ngày 1: Khám phá Cố đô Hoa Lư (đền Đinh - Lê) → Chinh phục đỉnh Hang Múa ngắm toàn cảnh thung lũng Tam Cốc → Chiều chèo thuyền Tam Cốc / Bích Động → Tối thưởng thức đặc sản thịt dê cơm cháy.\n• Ngày 2: Ngồi đò xuyên thủy Quần thể Tràng An (khoảng 3 tiếng) → Chiều ghé thăm Chùa Bái Đính thanh tịnh trước khi về Hà Nội.",
    sources: [
      { title: "Công cụ Lập kế hoạch", url: "/#len-ke-hoach" },
      { title: "Hành trình di sản", url: "/#lich-trinh" },
    ],
  },
  "ninh binh co mon gi nen thu": {
    answer:
      "Ẩm thực cố đô nổi bật với 4 món trứ danh bạn nhất định nên thử:\n1. Thịt dê núi đá: Thịt săn chắc, ngọt mềm, ngon nhất là dê tái chanh cuốn lá sung hoặc xào lăn chấm tương gừng.\n2. Cơm cháy chà bông: Giòn rụm, vàng ươm ăn kèm nước sốt dê gia truyền.\n3. Nem chua Yên Mạc: Đậm đà vị thịt chua bọc lá ổi, chấm nước mắm tỏi ớt chanh.\n4. Mắm tép Gia Viễn & ốc núi đá mùa mưa.",
    sources: [
      { title: "Ẩm thực cố đô", url: "/#am-thuc" },
      { title: "Một ngày ăn gì ở Ninh Bình", url: "/blog/mot-ngay-an-gi-o-ninh-binh" },
    ],
  },
  "di le hoi dau nam vao thoi gian nao": {
    answer:
      "Mùa lễ hội đầu năm ở Ninh Bình diễn ra sôi nổi từ tháng Giêng đến tháng Ba âm lịch:\n• Khai hội Chùa Bái Đính: Mùng 6 tháng Giêng âm lịch, kéo dài suốt mùa xuân.\n• Lễ hội Khai ấn Đền Trần (Nam Định liền kề): Đêm rằm tháng Giêng (14-15 âm lịch).\n• Lễ hội truyền thống Cố đô Hoa Lư: Mùng 8 đến mùng 10 tháng 3 âm lịch, tưởng nhớ vua Đinh Tiên Hoàng với nghi lễ rước nước sông Hoàng Long độc đáo.",
    sources: [
      { title: "Tạp chí Lễ hội & Phong tục", url: "/blog" },
      { title: "Lễ hội Hoa Lư từng nghi thức", url: "/blog/le-hoi-hoa-lu-tung-nghi-thuc-mot" },
    ],
  },
};

// Gợi ý nguồn tài liệu nội bộ dựa theo từ khóa
function detectRelevantSources(query: string, answer: string): Array<{ title: string; url: string }> {
  const text = (query + " " + answer).toLowerCase();
  const sources: Array<{ title: string; url: string }> = [];

  if (text.includes("tràng an") || text.includes("tam cốc") || text.includes("hang múa") || text.includes("bái đính")) {
    sources.push({ title: "Danh mục Danh thắng Cố đô", url: "/#diem-den" });
  }
  if (text.includes("tràng an hay tam cốc") || (text.includes("tràng an") && text.includes("tam cốc"))) {
    sources.push({ title: "Bài viết: Tràng An hay Tam Cốc", url: "/blog/trang-an-hay-tam-coc-nen-chon-noi-nao" });
  }
  if (text.includes("phát diệm") || text.includes("nhà thờ đá")) {
    sources.push({ title: "Bài viết: Phát Diệm mùa Giáng sinh", url: "/blog/phat-diem-mua-giang-sinh" });
  }
  if (text.includes("ăn gì") || text.includes("ẩm thực") || text.includes("dê") || text.includes("cơm cháy") || text.includes("nem")) {
    sources.push({ title: "Cẩm nang Ẩm thực Cố đô", url: "/#am-thuc" });
    sources.push({ title: "Bài viết: Một ngày ăn gì ở Ninh Bình", url: "/blog/mot-ngay-an-gi-o-ninh-binh" });
  }
  if (text.includes("lịch trình") || text.includes("kế hoạch") || text.includes("ngày")) {
    sources.push({ title: "Công cụ Lập kế hoạch & Dự toán", url: "/#len-ke-hoach" });
  }
  if (text.includes("lễ hội") || text.includes("đền trần") || text.includes("phủ dầy") || text.includes("hoa lư")) {
    sources.push({ title: "Tạp chí Di sản & Lễ hội Ninh Bình", url: "/blog" });
  }

  const seen = new Set<string>();
  const uniqueSources: Array<{ title: string; url: string }> = [];
  for (const s of sources) {
    if (!seen.has(s.url)) {
      seen.add(s.url);
      uniqueSources.push(s);
    }
  }

  return uniqueSources.slice(0, 2);
}

export function isDemoConfigured(): boolean {
  return (
    Boolean(DEMO_CONFIG.apiKey) &&
    DEMO_CONFIG.apiKey.trim() !== "" &&
    DEMO_CONFIG.apiKey !== "PASTE_DEMO_KEY_HERE"
  );
}

export function getRemainingCooldown(): number {
  const remaining = cooldownUntil - Date.now();
  return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
}

export function clearDemoCache(): void {
  RESPONSE_CACHE.clear();
  inFlight = false;
  cooldownUntil = 0;
}

function getCompletionsEndpoint(baseUrl: string): string {
  const clean = baseUrl.trim().replace(/\/+$/, "");
  if (clean.endsWith("/chat/completions")) return clean;
  if (clean.endsWith("/v1")) return `${clean}/chat/completions`;
  return `${clean}/v1/chat/completions`;
}

/**
 * Hàm gọi API duy nhất cho bản demo:
 * - Context siêu ngắn (tiết kiệm TPM/RPM)
 * - Cache câu hỏi lặp & câu hỏi mẫu
 * - In-flight lock chống click spam
 * - Tự động thử lại (Retry with Backoff) khi gặp 429
 * - Zero-logging (không in key hay log rác)
 */
export async function callDemoApi(
  message: string,
  history: DemoChatMessage[] = []
): Promise<DemoApiResponse> {
  const rawInput = message.trim();
  if (!rawInput) {
    throw new Error("Vui lòng nhập câu hỏi để được hướng dẫn.");
  }

  if (rawInput.length > 500) {
    throw new Error("Câu hỏi quá dài (vui lòng dưới 500 ký tự).");
  }

  // 1. Kiểm tra Cooldown sau khi bị 429 quá tải
  const remainingCooldown = getRemainingCooldown();
  if (remainingCooldown > 0) {
    throw new Error(
      `Hệ thống AI đang tạm nghỉ để làm mát (cooldown). Vui lòng đợi ${remainingCooldown} giây rồi thử lại nhé!`
    );
  }

  // 2. Chống click gửi dồn dập nhiều yêu cầu cùng lúc (In-flight Lock)
  if (inFlight) {
    throw new Error("Hướng dẫn viên đang trả lời câu hỏi trước, vui lòng đợi trong giây lát!");
  }

  // 3. Chuẩn hóa câu hỏi & Kiểm tra Preset / In-memory Cache
  const cleanInput = rawInput.slice(0, MAX_INPUT_CHARS);
  const cacheKey = normalizeKey(cleanInput);

  // A. Kiểm tra đáp án soạn trước cho câu hỏi mẫu
  if (PRESET_ANSWERS[cacheKey]) {
    return PRESET_ANSWERS[cacheKey]!;
  }

  // B. Kiểm tra Cache câu hỏi lặp lại
  if (RESPONSE_CACHE.has(cacheKey)) {
    return RESPONSE_CACHE.get(cacheKey)!;
  }

  if (!isDemoConfigured()) {
    throw new Error(
      "Chưa cấu hình API Key. Bạn vui lòng mở file src/config/demo.ts và dán key của ShopAIKey vào nhé!"
    );
  }

  // 4. Chuẩn bị payload Context SIÊU NGẮN (chỉ 2 lượt gần nhất, cắt ngắn 150 ký tự mỗi lượt)
  const compactHistory = history
    .filter((m) => m.content.trim().length > 0)
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 150),
    }));

  const payloadMessages = [
    { role: "system", content: COMPACT_SYSTEM_PROMPT },
    ...compactHistory,
    { role: "user", content: cleanInput },
  ];

  const endpoint = getCompletionsEndpoint(DEMO_CONFIG.baseUrl);

  inFlight = true;

  try {
    // 5. Vòng lặp Retry với Exponential Backoff + Jitter khi gặp mã 429
    const MAX_ATTEMPTS = 3;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEMO_CONFIG.apiKey.trim()}`,
          },
          body: JSON.stringify({
            model: DEMO_CONFIG.model || "gpt-4o-mini",
            messages: payloadMessages,
            temperature: 0.5,
            max_tokens: MAX_RESPONSE_TOKENS,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Nếu thành công -> lưu cache và trả lời ngay
        if (res.ok) {
          const data = await res.json();
          const answer = data?.choices?.[0]?.message?.content?.trim();
          if (!answer) {
            throw new Error("Mô hình không trả về nội dung. Bạn vui lòng thử lại nhé.");
          }

          const sources = detectRelevantSources(cleanInput, answer);
          const result: DemoApiResponse = { answer, sources };

          // Lưu cache cho lần hỏi sau
          RESPONSE_CACHE.set(cacheKey, result);
          return result;
        }

        // Nếu gặp 429 (Rate Limit / Quota TPM/RPM): Thử lại có chờ tăng dần
        if (res.status === 429) {
          const retryAfterHeader = res.headers.get("Retry-After");
          const retryAfterSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 0;
          const waitMs =
            !isNaN(retryAfterSec) && retryAfterSec > 0
              ? retryAfterSec * 1000
              : 1000 * Math.pow(2, attempt) + Math.random() * 400;

          // Nếu chưa hết lượt thử lại -> ngủ một chút rồi thử lại
          if (attempt < MAX_ATTEMPTS - 1) {
            await sleep(waitMs);
            continue;
          }

          // Đã thử hết lượt mà vẫn 429 -> đặt cooldown 15s
          cooldownUntil = Date.now() + 15000;
          throw new Error(
            "Tài khoản AI đang chạm hạn mức tần suất (RPM/TPM). Hệ thống sẽ tự động làm mát trong 15 giây, bạn vui lòng đợi chút nhé!"
          );
        }

        if (res.status === 401) {
          throw new Error(
            "Khóa API không hợp lệ hoặc đã hết hạn trên ShopAIKey. Vui lòng kiểm tra lại key trong src/config/demo.ts."
          );
        }

        if (res.status === 404 || res.status === 400) {
          throw new Error(
            `Dịch vụ AI báo lỗi (${res.status}). Model "${DEMO_CONFIG.model}" có thể không hỗ trợ.`
          );
        }

        throw new Error(`Dịch vụ AI tạm thời gián đoạn (Mã lỗi ${res.status}).`);
      } catch (err: unknown) {
        clearTimeout(timeoutId);
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            throw new Error("Yêu cầu phản hồi quá lâu (hơn 20 giây). Vui lòng thử lại.");
          }
          lastError = err;
        } else {
          lastError = new Error("Không thể kết nối đến dịch vụ AI.");
        }

        // Nếu lỗi rate limit thì ngắt ngay để báo người dùng
        if (lastError.message.includes("hạn mức tần suất")) {
          throw lastError;
        }

        // Nếu đã hết lượt thử
        if (attempt >= MAX_ATTEMPTS - 1) {
          throw lastError;
        }
      }
    }

    throw lastError || new Error("Không thể kết nối đến dịch vụ AI.");
  } finally {
    inFlight = false;
  }
}
