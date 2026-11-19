import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isDemoConfigured, callDemoApi } from "@/lib/demo-api";
import { DEMO_CONFIG } from "@/config/demo";

describe("Demo API Client (ShopAIKey Zero-Logging)", () => {
  let savedKey: string;

  beforeEach(() => {
    vi.restoreAllMocks();
    savedKey = DEMO_CONFIG.apiKey;
  });

  afterEach(() => {
    DEMO_CONFIG.apiKey = savedKey;
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
    await expect(callDemoApi(longMsg)).rejects.toThrow("tối đa 500 ký tự");
  });

  it("throws clear instructions when key is not configured", async () => {
    DEMO_CONFIG.apiKey = "PASTE_DEMO_KEY_HERE";
    await expect(callDemoApi("Tràng An có gì đẹp?")).rejects.toThrow(
      "src/config/demo.ts"
    );
  });

  it("handles successful response and detects sources when key is set", async () => {
    DEMO_CONFIG.apiKey = "sk-test-demo-key";

    const fakeResponse = {
      choices: [
        {
          message: {
            content: "Tràng An là quần thể danh thắng di sản thế giới kép với phong cảnh hữu tình và đò chèo qua các hang động kỳ thú.",
          },
        },
      ],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => fakeResponse,
    } as unknown as Response);

    const result = await callDemoApi("Tràng An có gì đặc sắc?");
    expect(result.answer).toContain("Tràng An là quần thể danh thắng");
    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.sources.some((s) => s.url.includes("diem-den") || s.url.includes("trang-an"))).toBe(true);
  });

  it("handles 401 unauthorized gracefully without echoing key", async () => {
    DEMO_CONFIG.apiKey = "sk-invalid-key";

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: "Invalid API key" }),
    } as unknown as Response);

    await expect(callDemoApi("Ninh Bình ăn gì ngon?")).rejects.toThrow(
      "Khóa API không hợp lệ hoặc đã hết hạn"
    );
  });

  it("handles 429 quota exhaustion gracefully", async () => {
    DEMO_CONFIG.apiKey = "sk-valid-key";

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: "Rate limit reached or balance exhausted" }),
    } as unknown as Response);

    await expect(callDemoApi("Đi Bái Đính thế nào?")).rejects.toThrow(
      "hết hạn mức hoặc vượt tần suất"
    );
  });
});
