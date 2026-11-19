import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isDemoConfigured, callDemoApi, clearDemoCache } from "@/lib/demo-api";
import { DEMO_CONFIG } from "@/config/demo";

describe("Demo API Client (ShopAIKey Zero-Logging & Short Context)", () => {
  let savedKey: string;

  beforeEach(() => {
    vi.restoreAllMocks();
    clearDemoCache();
    savedKey = DEMO_CONFIG.apiKey;
  });

  afterEach(() => {
    DEMO_CONFIG.apiKey = savedKey;
    clearDemoCache();
  });

  it("checks whether demo key is configured", () => {
    DEMO_CONFIG.apiKey = "PASTE_DEMO_KEY_HERE";
    expect(isDemoConfigured()).toBe(false);

    DEMO_CONFIG.apiKey = "";
    expect(isDemoConfigured()).toBe(false);

    DEMO_CONFIG.apiKey = "sk-valid-key";
    expect(isDemoConfigured()).toBe(true);
  });

  it("throws validation error when message is empty", async () => {
    await expect(callDemoApi("   ")).rejects.toThrow("Vui lòng nhập câu hỏi");
  });

  it("throws validation error when message exceeds 500 characters", async () => {
    const longMsg = "a".repeat(501);
    await expect(callDemoApi(longMsg)).rejects.toThrow("dưới 500 ký tự");
  });

  it("returns preset response instantly for suggestion question without calling fetch", async () => {
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy;

    // Kể cả khi chưa có API key, câu hỏi gợi ý vẫn trả lời ngay lập tức!
    DEMO_CONFIG.apiKey = "PASTE_DEMO_KEY_HERE";
    const result = await callDemoApi("Tràng An có gì đặc biệt?");
    expect(result.answer).toContain("Quần thể danh thắng Tràng An");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("caches repeated questions to save 100% tokens and network calls", async () => {
    DEMO_CONFIG.apiKey = "sk-valid-key";

    const fakeResponse = {
      choices: [
        {
          message: {
            content: "Ninh Bình có Hang Múa view thung lũng Tam Cốc tuyệt đẹp.",
          },
        },
      ],
    };

    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => fakeResponse,
    } as unknown as Response);

    globalThis.fetch = fetchSpy;

    // Lần 1: Gọi fetch
    const res1 = await callDemoApi("Hang Múa có gì đẹp?");
    expect(res1.answer).toContain("Hang Múa");
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // Lần 2: Cùng câu hỏi -> trả về từ RAM Cache ngay lập tức, không gọi fetch lần 2!
    const res2 = await callDemoApi("hang mua co gi dep");
    expect(res2.answer).toContain("Hang Múa");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("throws clear instructions when key is not configured for non-preset question", async () => {
    DEMO_CONFIG.apiKey = "";
    await expect(callDemoApi("Ninh Bình cách Hà Nội bao xa?")).rejects.toThrow(
      "Chưa có API Key"
    );
  });

  it("handles 401 unauthorized gracefully without echoing key", async () => {
    DEMO_CONFIG.apiKey = "sk-invalid-key";

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: "Invalid API key" }),
    } as unknown as Response);

    await expect(callDemoApi("Đi Vân Long mùa nào đẹp?")).rejects.toThrow(
      "Khóa API không hợp lệ hoặc đã hết hạn"
    );
  });

  it("handles 429 quota exhaustion with cooldown and backoff", async () => {
    DEMO_CONFIG.apiKey = "sk-valid-key";

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      headers: new Headers({ "Retry-After": "1" }),
      json: async () => ({ error: "Rate limit reached" }),
    } as unknown as Response);

    await expect(callDemoApi("Đi Bái Đính thế nào?")).rejects.toThrow(
      "hạn mức tần suất (RPM/TPM)"
    );
  });
});
