import { useState, useEffect, useRef, useId } from "react";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Loader2,
  Compass,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; url: string }[];
  isError?: boolean;
};

const SUGGESTIONS = [
  "Tràng An có gì đặc biệt?",
  "Gợi ý lịch trình 2 ngày 1 đêm",
  "Ninh Bình có món gì nên thử?",
  "Đi lễ hội đầu năm vào thời gian nào?",
];

const INITIAL_GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "Xin chào! Mình là Hướng dẫn viên Ninh Bình 🌿. Bạn muốn tìm hiểu về địa danh danh thắng, món ăn đặc sản, cẩm nang di chuyển hay gợi ý lịch trình khám phá cố đô?",
};

const STORAGE_KEY = "ninhbinh_chat_history";

export function ChatWidget({
  embedded = false,
  className = "",
}: {
  embedded?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [INITIAL_GREETING];
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Bỏ qua lỗi parse
    }
    return [INITIAL_GREETING];
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  // Lưu hội thoại vào sessionStorage (phi thương mại, không thu thập dữ liệu cá nhân)
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // QuotaExceeded hoặc Private mode
    }
  }, [messages]);

  // Cuộn mượt đến tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Lắng nghe phím ESC để đóng chat khi đang mở ở chế độ nổi
  useEffect(() => {
    if (embedded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, embedded]);

  // Tự động focus vào ô nhập khi mở
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
    setErrorMessage(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignored
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? input).trim();
    if (!text || isLoading) return;

    if (text.length > 500) {
      setErrorMessage("Câu hỏi không được vượt quá 500 ký tự.");
      return;
    }

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      // Chuẩn bị lịch sử 6 tin nhắn gần nhất (chỉ gồm user & assistant, loại bỏ greeting và error)
      const historyPayload = newMessages
        .filter((m) => m.id !== "greeting" && !m.isError)
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.content.slice(0, 800),
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Lỗi kết nối (${res.status})`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        role: "assistant",
        content:
          data.answer ||
          "Mình chưa có câu trả lời phù hợp, bạn thử hỏi lại giúp mình nhé.",
        sources: Array.isArray(data.sources) ? data.sources : [],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: unknown) {
      const errText =
        err instanceof Error ? err.message : "Không thể kết nối đến máy chủ.";
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        role: "assistant",
        content: `Rất tiếc, đã xảy ra sự cố kết nối: ${errText}. Bạn có thể bấm "Thử lại" bên dưới nhé.`,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryLast = () => {
    // Tìm tin nhắn user gần nhất
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNavigateSource = (url: string) => {
    if (url.startsWith("/#") || url.startsWith("#")) {
      const hash = url.startsWith("/#") ? url.slice(2) : url.slice(1);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        if (!embedded && window.innerWidth < 768) {
          setIsOpen(false);
        }
        return;
      }
    }
    window.location.href = url;
  };

  return (
    <>
      {/* Nút nổi (Floating Action Button) - Chỉ hiển thị khi không phải chế độ nhúng (embedded) */}
      {!embedded && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Mở Hướng dẫn viên Ninh Bình AI"
              className="group relative flex items-center gap-2.5 rounded-full bg-[#D6AD72] px-4 py-3 text-[#244B3B] font-medium shadow-xl hover:bg-[#c99f60] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-3 focus:ring-[#D6AD72]/50 border border-white/20"
            >
              <div className="relative">
                <Compass className="h-5 w-5 animate-[spin_10s_linear_infinite]" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <span className="text-sm font-semibold tracking-wide">
                Hướng dẫn viên Ninh Bình
              </span>
            </button>
          )}
        </div>
      )}

      {/* Khung chat */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          role="dialog"
          aria-label="Khung trò chuyện Hướng dẫn viên Ninh Bình"
          className={
            embedded
              ? `flex flex-col bg-white border border-[#244B3B]/10 rounded-2xl shadow-xl overflow-hidden h-full max-h-[780px] ${className}`
              : `fixed inset-x-3 bottom-3 top-16 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[410px] sm:h-[620px] max-h-[92vh] z-50 flex flex-col bg-white border border-[#D6AD72]/40 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${className}`
          }
        >
          {/* Header */}
          <div className="relative flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#244B3B] to-[#1b382c] text-white select-none border-b border-[#D6AD72]/20">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D6AD72] text-[#244B3B] shadow-inner">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold tracking-wide font-serif">
                    Hướng dẫn viên Ninh Bình
                  </h2>
                  <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-[#D6AD72]/20 text-[#D6AD72] border border-[#D6AD72]/30">
                    AI RAG
                  </span>
                </div>
                <p className="text-[11px] text-white/70">
                  Cẩm nang khám phá di sản & ẩm thực cố đô
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Làm mới cuộc trò chuyện"
                aria-label="Làm mới cuộc trò chuyện"
                className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6AD72]"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              {!embedded && (
                <button
                  onClick={() => setIsOpen(false)}
                  title="Đóng khung chat (Esc)"
                  aria-label="Đóng khung chat"
                  className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6AD72]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Vùng tin nhắn */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#FAF7F2] text-sm"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#244B3B] text-white rounded-br-none"
                      : msg.isError
                        ? "bg-red-50 text-red-900 border border-red-200 rounded-bl-none"
                        : "bg-white text-gray-800 border border-emerald-900/5 rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-line text-[13.5px]">
                    {msg.content}
                  </div>

                  {/* Nút thử lại nếu gặp lỗi */}
                  {msg.isError && (
                    <div className="mt-2.5 pt-2 border-t border-red-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> Kết nối gián đoạn
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRetryLast}
                        className="h-7 text-xs bg-white text-red-700 hover:bg-red-50 border-red-300"
                      >
                        Thử lại
                      </Button>
                    </div>
                  )}

                  {/* Nguồn tham khảo (Internal Links) */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[11px] text-gray-500 font-medium">
                        Xem thêm:
                      </span>
                      {msg.sources.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavigateSource(s.url)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#244B3B] hover:text-[#D6AD72] bg-[#244B3B]/5 hover:bg-[#244B3B]/10 px-2 py-0.5 rounded-full transition-colors"
                        >
                          {s.title}
                          <ExternalLink className="h-2.5 w-2.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Trạng thái đang soạn câu trả lời */}
            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white text-gray-600 border border-emerald-900/5 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-[#D6AD72]" />
                  <span className="text-xs text-gray-500 italic">
                    Hướng dẫn viên đang tìm kiếm cẩm nang...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Gợi ý câu hỏi nhanh (Quick suggestions) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3 py-2 bg-white/90 border-t border-emerald-900/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug)}
                  className="whitespace-nowrap rounded-full border border-[#D6AD72]/40 bg-[#FAF7F2] px-2.5 py-1 text-[11.5px] text-[#244B3B] hover:bg-[#D6AD72]/15 hover:border-[#D6AD72] transition-colors shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Cảnh báo lỗi độ dài */}
          {errorMessage && (
            <div className="px-3 py-1.5 bg-amber-50 border-t border-amber-200 text-amber-800 text-xs flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-emerald-900/10">
            <div className="relative flex items-center">
              <label htmlFor={inputId} className="sr-only">
                Nhập câu hỏi về du lịch Ninh Bình
              </label>
              <textarea
                id={inputId}
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={500}
                placeholder="Hỏi về địa danh, ẩm thực, lịch trình..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAF7F2] pl-3.5 pr-20 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-[#D6AD72] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D6AD72] transition-colors"
                style={{ maxHeight: "85px" }}
              />

              <div className="absolute right-2 flex items-center gap-1.5">
                <span className="text-[10px] text-gray-400 select-none">
                  {input.length}/500
                </span>
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Gửi tin nhắn"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#244B3B] text-[#D6AD72] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a382c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D6AD72]"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Dòng chú thích phi thương mại */}
            <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-gray-400">
              <span>Enter gửi · Shift+Enter xuống dòng</span>
              <span className="truncate max-w-[220px]">
                Tham khảo · Không bán tour hay đặt phòng
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
