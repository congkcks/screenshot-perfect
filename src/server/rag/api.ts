const BASE =
  process.env["SHOPAIKEY_BASE_URL"] ||
  process.env["VITE_SHOPAIKEY_BASE_URL"] ||
  "https://api.shopaikey.com";

export async function callApi<T>(
  path: string,
  body: unknown,
  timeoutMs = 30000,
  retries = 1,
): Promise<T> {
  const key =
    process.env["SHOPAIKEY_API_KEY"] ||
    process.env["VITE_SHOPAIKEY_API_KEY"];
  if (!key) {
    throw new Error("MISSING_KEY");
  }

  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(`${BASE}${path}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (res.ok) {
        return (await res.json()) as T;
      }

      lastErr = new Error(`UPSTREAM_${res.status}`);
      // Lỗi 4xx (trừ 429 rate limit): không thử lại vì request không hợp lệ
      if (!(res.status === 429 || res.status >= 500)) {
        break;
      }
    } catch (e) {
      lastErr = e; // timeout hoặc lỗi kết nối mạng: thử lại
    }

    if (i < retries) {
      await new Promise((r) => setTimeout(r, 700 * (i + 1)));
    }
  }

  throw lastErr;
}
