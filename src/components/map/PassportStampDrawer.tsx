import { useState, useEffect } from "react";
import { Award, CheckCircle2, Compass, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STAMP_STORAGE_KEY = "ninhbinh_tour_stamps";

export const STAMP_CATALOG = [
  { id: "bai-dinh", name: "Chùa Bái Đính", icon: "🛕", title: "Kỳ Lục Phật Giáo", color: "#B88E52" },
  { id: "trang-an", name: "Tràng An", icon: "🛶", title: "Di Sản UNESCO", color: "#244B3B" },
  { id: "hoa-lu", name: "Cố Đô Hoa Lư", icon: "👑", title: "Kinh Đô Đại Cồ Việt", color: "#7C3AED" },
  { id: "tam-coc", name: "Tam Cốc", icon: "🌾", title: "Mùa Vàng Ngô Đồng", color: "#D97706" },
  { id: "hang-mua", name: "Hang Múa", icon: "🐉", title: "Đỉnh Ngọa Long 360°", color: "#DC2626" },
  { id: "thung-nham", name: "Thung Nham", icon: "🕊️", title: "Thánh Địa Chim Trời", color: "#059669" },
];

export function addTourStamp(placeId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STAMP_STORAGE_KEY);
    const set = new Set(raw ? JSON.parse(raw) : []);
    set.add(placeId);
    localStorage.setItem(STAMP_STORAGE_KEY, JSON.stringify(Array.from(set)));
    window.dispatchEvent(new Event("ninhbinh_stamps_updated"));
  } catch {}
}

export function PassportStampDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [stampedIds, setStampedIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      try {
        const raw = localStorage.getItem(STAMP_STORAGE_KEY);
        setStampedIds(raw ? JSON.parse(raw) : []);
      } catch {}
    };
    sync();
    window.addEventListener("ninhbinh_stamps_updated", sync);
    return () => window.removeEventListener("ninhbinh_stamps_updated", sync);
  }, []);

  const progress = stampedIds.length;
  const total = STAMP_CATALOG.length;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative px-3 py-1.5 rounded-full bg-white/90 border border-[#D6AD72]/50 text-[#173428] text-xs font-semibold hover:bg-white hover:border-[#D6AD72] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        title="Xem Hộ chiếu tem di sản"
      >
        <Award className="w-3.5 h-3.5 text-[#D6AD72]" />
        <span>Tem di sản:</span>
        <span className="font-bold text-[#244B3B]">
          {progress}/{total}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FAF8F4] border border-[#D6AD72]/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#5A6D63] transition-colors cursor-pointer"
              aria-label="Đóng hộ chiếu"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-full bg-[#D6AD72]/20 text-[#244B3B]">
                <Award className="w-6 h-6 text-[#D6AD72]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#244B3B]">
                  Hộ Chiếu Tem Di Sản Ninh Bình
                </h3>
                <p className="text-xs text-[#5A6D63]">
                  Tự động thu thập tem khi tham gia Chuyến tham quan ảo trên bản đồ
                </p>
              </div>
            </div>

            {/* Tiến độ */}
            <div className="my-4 p-3 rounded-2xl bg-white border border-[#DFD7C7] flex items-center justify-between">
              <span className="text-xs font-medium text-[#1A3429]">Tiến độ thu thập:</span>
              <span className="text-xs font-bold text-[#244B3B] bg-[#244B3B]/10 px-3 py-1 rounded-full">
                {progress === total ? "🎉 Đã hoàn thành 100%" : `Đã đóng dấu ${progress}/${total} điểm`}
              </span>
            </div>

            {/* Lưới tem */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {STAMP_CATALOG.map((item) => {
                const collected = stampedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`relative p-3 rounded-2xl border flex flex-col items-center text-center transition-all ${
                      collected
                        ? "bg-white border-[#D6AD72] shadow-sm rotate-0 scale-100"
                        : "bg-black/5 border-dashed border-[#DFD7C7] opacity-50 grayscale"
                    }`}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="font-serif font-bold text-xs text-[#1A3429]">{item.name}</span>
                    <span className="text-[10px] text-[#5A6D63] mt-0.5">{item.title}</span>

                    {collected && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#244B3B] text-[#D6AD72] rounded-full p-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#DFD7C7] flex justify-end">
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-[#244B3B] hover:bg-[#173428] text-white text-xs px-5 rounded-full cursor-pointer"
              >
                Tiếp Tục Khám Phá
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
