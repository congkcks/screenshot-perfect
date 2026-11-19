// DEMO ONLY – File mẫu hướng dẫn cấu hình.
// Tạo file src/config/demo.ts và dán key của bạn vào đó để demo nhanh.
// Xóa file src/config/demo.ts và thu hồi (revoke) key sau khi kết thúc demo!

export const DEMO_CONFIG = {
  // Dán API Key demo từ ShopAIKey (hoặc OpenAI/OpenRouter/Groq...) vào đây
  apiKey: "PASTE_DEMO_KEY_HERE",

  // Base URL của dịch vụ (ShopAIKey: https://api.shopaikey.com/v1)
  baseUrl: "https://api.shopaikey.com/v1",

  // Tên model bạn muốn dùng (ví dụ: gpt-4o-mini, gpt-3.5-turbo, v.v.)
  model: "gpt-4o-mini",
};
