import { DEMO_CONFIG } from "@/config/demo";

export interface DemoChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DemoApiResponse {
  answer: string;
  sources: Array<{ title: string; url: string }>;
}

const NINH_BINH_SYSTEM_PROMPT = `Bạn là Hướng dẫn viên du lịch số của NinhBinhTravel – cẩm nang du lịch và di sản cố đô Ninh Bình.

Nhiệm vụ của bạn:
1. Tính cách: Thân thiện, chu đáo, hiểu biết sâu sắc về văn hóa, lịch sử và thiên nhiên Ninh Bình.
2. Nội dung tư vấn:
   - Danh thắng: Quần thể Tràng An, Tam Cốc - Bích Động, Hang Múa, Chùa Bái Đính, Cố đô Hoa Lư, Đầm Vân Long, Nhà thờ đá Phát Diệm, Vườn quốc gia Cúc Phương.
   - Ẩm thực: Cơm cháy chà bông, dê núi tái chanh/xào lăn, nem chua Yên Mạc, mắm tép Gia Viễn, xôi trứng kiến Nho Quan, cá kho gáo.
   - Làng nghề & Lễ hội: Thêu ren Văn Lâm, chạm đá Ninh Vân, cói Kim Sơn; Lễ hội Hoa Lư, Lễ hội Tràng An, Đêm khai ấn đền Trần.
   - Không gian mới: Kết nối di sản cố đô Ninh Bình với không gian văn hóa Trần/Mẫu (Nam Định) và Hà Nam sau sáp nhập 2025.
3. Nguyên tắc an toàn & chân thật:
   - Tuyệt đối không bịa đặt số điện thoại cá nhân, không bịa giá vé cố định hay số tiền cụ thể (luôn khuyên du khách đối chiếu với ban quản lý tại thời điểm đi).
   - Khuyên du khách giữ gìn vệ sinh môi trường, ứng xử văn minh nơi tôn nghiêm, bảo vệ cảnh quan di sản di tích.
4. Trả lời súc tích, mạch lạc, chia đoạn hoặc dùng dấu gạch đầu dòng rõ ràng bằng tiếng Việt.`;

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

  // Khử trùng lặp và giới hạn tối đa 3 nguồn
  const seen = new Set<string>();
  const uniqueSources: Array<{ title: string; url: string }> = [];
  for (const s of sources) {
    if (!seen.has(s.url)) {
      seen.add(s.url);
      uniqueSources.push(s);
    }
  }

  return uniqueSources.slice(0, 3);
}

export function isDemoConfigured(): boolean {
  return (
    Boolean(DEMO_CONFIG.apiKey) &&
    DEMO_CONFIG.apiKey.trim() !== "" &&
    DEMO_CONFIG.apiKey !== "PASTE_DEMO_KEY_HERE"
  );
}

function getCompletionsEndpoint(baseUrl: string): string {
  const clean = baseUrl.trim().replace(/\/+$/, "");
  if (clean.endsWith("/chat/completions")) return clean;
  if (clean.endsWith("/v1")) return `${clean}/chat/completions`;
  return `${clean}/v1/chat/completions`;
}

/**
 * Hàm gọi API duy nhất cho bản demo (Zero-logging, không lưu dữ liệu)
 */
export async function callDemoApi(
  message: string,
  history: DemoChatMessage[] = []
): Promise<DemoApiResponse> {
  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    throw new Error("Vui lòng nhập câu hỏi để được hướng dẫn.");
  }

  if (trimmedMessage.length > 500) {
    throw new Error("Câu hỏi quá dài (tối đa 500 ký tự).");
  }

  if (!isDemoConfigured()) {
    throw new Error(
      "Chưa cấu hình API Key. Bạn vui lòng mở file src/config/demo.ts và dán key của ShopAIKey vào nhé!"
    );
  }

  const endpoint = getCompletionsEndpoint(DEMO_CONFIG.baseUrl);

  // Chuẩn bị danh sách tin nhắn gửi đến OpenAI/ShopAIKey
  const payloadMessages = [
    { role: "system", content: NINH_BINH_SYSTEM_PROMPT },
    ...history.slice(-6).map((m) => ({
      role: m.role,
      content: m.content.slice(0, 800),
    })),
    { role: "user", content: trimmedMessage },
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

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
        temperature: 0.6,
        max_tokens: 800,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error(
          "Khóa API không hợp lệ hoặc đã hết hạn trên ShopAIKey. Vui lòng kiểm tra lại key trong src/config/demo.ts."
        );
      }
      if (res.status === 429) {
        throw new Error(
          "Tài khoản ShopAIKey đã hết hạn mức hoặc vượt tần suất gọi. Vui lòng kiểm tra số dư trên ShopAIKey."
        );
      }
      if (res.status === 404 || res.status === 400) {
        throw new Error(
          `Dịch vụ AI báo lỗi (${res.status}). Có thể tên model "${DEMO_CONFIG.model}" chưa được hỗ trợ.`
        );
      }
      throw new Error(`Dịch vụ AI tạm thời gián đoạn (Mã lỗi HTTP ${res.status}).`);
    }

    const data = await res.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error("Mô hình không trả về nội dung. Bạn vui lòng thử lại câu hỏi khác nhé.");
    }

    const sources = detectRelevantSources(trimmedMessage, answer);
    return {
      answer,
      sources,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        throw new Error("Yêu cầu phản hồi quá lâu (hơn 25 giây). Vui lòng thử lại.");
      }
      throw err;
    }
    throw new Error("Không thể kết nối đến dịch vụ AI.");
  }
}
