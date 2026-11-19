// Cấu hình kết nối AI cho bản Demo
// File này được commit lên repo và tự động nhận key từ:
// 1. Biến môi trường Vercel (VITE_SHOPAIKEY_API_KEY hoặc SHOPAIKEY_API_KEY)
// 2. Nhập trực tiếp trên giao diện trình duyệt (lưu trong sessionStorage)
// 3. Không để lộ khóa cá nhân trên mã nguồn công khai

let overrideApiKey = "";

function getEnv(key: string): string {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const val = (import.meta.env as Record<string, string | undefined>)[key];
    if (val) return val;
  }
  if (typeof process !== "undefined" && process.env) {
    const val = process.env[key];
    if (val) return val;
  }
  return "";
}

function getClientStorageKey(): string {
  if (typeof window !== "undefined") {
    try {
      return (
        sessionStorage.getItem("ninhbinh_demo_key") ||
        localStorage.getItem("ninhbinh_demo_key") ||
        ""
      );
    } catch {
      return "";
    }
  }
  return "";
}

export function saveClientDemoKey(key: string): void {
  if (typeof window !== "undefined") {
    try {
      if (key.trim()) {
        sessionStorage.setItem("ninhbinh_demo_key", key.trim());
      } else {
        sessionStorage.removeItem("ninhbinh_demo_key");
      }
    } catch {
      // Ignored
    }
  }
}

export const DEMO_CONFIG = {
  get apiKey(): string {
    if (overrideApiKey) return overrideApiKey;
    const clientKey = getClientStorageKey();
    if (clientKey) return clientKey;
    const envKey = getEnv("VITE_SHOPAIKEY_API_KEY") || getEnv("SHOPAIKEY_API_KEY");
    return envKey;
  },
  set apiKey(val: string) {
    overrideApiKey = val;
  },
  baseUrl:
    getEnv("VITE_SHOPAIKEY_BASE_URL") ||
    getEnv("SHOPAIKEY_BASE_URL") ||
    "https://api.shopaikey.com/v1",
  model:
    getEnv("VITE_CHAT_MODEL") ||
    getEnv("CHAT_MODEL") ||
    "gemini-3.5-flash-lite",
};
