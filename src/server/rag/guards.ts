const hits = new Map<string, number[]>();
let currentDay = new Date().toDateString();
let dailyCount = 0;
const cache = new Map<string, { at: number; value: unknown }>();

/**
 * Giới hạn tần suất gọi API theo từng địa chỉ IP (mặc định 10 lượt / phút).
 */
export function checkRate(ip: string, perMinute = 10): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (arr.length >= perMinute) {
    return false;
  }
  arr.push(now);
  hits.set(ip, arr);
  return true;
}

/**
 * Kiểm soát tổng số lượt yêu cầu trong một ngày để bảo vệ số dư tài khoản API.
 */
export function checkDaily(): boolean {
  const today = new Date().toDateString();
  if (today !== currentDay) {
    currentDay = today;
    dailyCount = 0;
  }
  const cap = Number(process.env["DAILY_REQUEST_CAP"] ?? 300);
  if (dailyCount >= cap) {
    return false;
  }
  dailyCount++;
  return true;
}

/**
 * Chuẩn hóa chuỗi câu hỏi để làm khóa lưu trữ bộ nhớ đệm (cache).
 */
export const norm = (s: string): string =>
  s.trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Lấy kết quả đã lưu trong cache nếu chưa quá thời hạn 1 giờ (3.600.000 ms).
 */
export function getCache<T = unknown>(q: string): T | null {
  const entry = cache.get(q);
  if (entry && Date.now() - entry.at < 3_600_000) {
    return entry.value as T;
  }
  if (entry) {
    cache.delete(q);
  }
  return null;
}

/**
 * Lưu kết quả vào cache bộ nhớ trong, giới hạn tối đa 200 câu hỏi phổ biến.
 */
export function setCache(q: string, value: unknown): void {
  if (cache.size > 200) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) cache.delete(oldestKey);
  }
  cache.set(q, { at: Date.now(), value });
}

/**
 * Hàm hỗ trợ reset bộ đếm cho kiểm thử tự động (testing).
 */
export function _resetGuardsForTest(): void {
  hits.clear();
  dailyCount = 0;
  cache.clear();
}
