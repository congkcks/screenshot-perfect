import { createFileRoute, Link } from "@tanstack/react-router";
import { ChatWidget } from "@/components/ChatWidget";
import { Compass, ArrowLeft, Shield, Sparkles, BookOpen } from "lucide-react";

export const Route = createFileRoute("/hdv")({
  head: () => ({
    meta: [
      { title: "Hướng dẫn viên Ninh Bình | NinhBinhTravel" },
      {
        name: "description",
        content:
          "Trò chuyện trực tiếp cùng Hướng dẫn viên Ninh Bình: giải đáp thông tin danh thắng Tràng An, Tam Cốc, ẩm thực đặc sản và gợi ý lịch trình du lịch Cố đô.",
      },
    ],
  }),
  component: HdvPage,
});

function HdvPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1F2937]">
      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#244B3B] text-white border-b border-[#D6AD72]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/90 hover:text-[#D6AD72] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay về trang chủ NinhBinhTravel</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[#D6AD72] text-[#244B3B] flex items-center justify-center font-bold">
              <Compass className="h-4 w-4" />
            </div>
            <span className="font-serif font-semibold text-sm hidden sm:inline">
              Hướng dẫn viên Ninh Bình
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột giới thiệu bên trái */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#244B3B]/10 text-[#244B3B]">
                <Sparkles className="h-3.5 w-3.5 text-[#D6AD72]" />
                Bạn đồng hành Cố Đô Ninh Bình
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#244B3B] tracking-tight">
                Hướng dẫn viên Ninh Bình
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Cẩm nang khám phá danh thắng & ẩm thực Cố đô, luôn sẵn sàng đồng hành cùng bạn trên mọi nẻo đường khám phá di sản non nước Ninh Bình.
              </p>
            </div>

            {/* Các chủ đề gợi ý */}
            <div className="bg-white/80 rounded-2xl p-5 border border-[#244B3B]/10 space-y-3 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#244B3B] flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#D6AD72]" /> Chủ đề bạn có thể hỏi
              </h2>
              <ul className="text-xs text-gray-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#D6AD72] font-bold">•</span>
                  <span><strong>Di sản & Thắng cảnh:</strong> Tuyến thuyền Tràng An, 486 bậc Hang Múa, Chùa Bái Đính, Tam Cốc...</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D6AD72] font-bold">•</span>
                  <span><strong>Ẩm thực:</strong> Thịt dê núi 7 món, cơm cháy sốt dê, ốc núi Tam Điệp, cá chuối nướng...</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D6AD72] font-bold">•</span>
                  <span><strong>Lịch trình & Chi phí:</strong> Gợi ý lịch trình 1 ngày, 2N1Đ, 3N2Đ và dự toán ngân sách tự túc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D6AD72] font-bold">•</span>
                  <span><strong>Mùa đẹp & Lễ hội:</strong> Mùa lúa chín vàng Tam Cốc tháng 5-6, lễ hội Hoa Lư, lễ hội Bái Đính.</span>
                </li>
              </ul>
            </div>

            {/* Khẳng định phi thương mại */}
            <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200/60 text-xs text-emerald-900 flex items-start gap-3">
              <Shield className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Cam kết phi thương mại:</strong> Mini App NinhBinhTravel hoạt động hoàn toàn miễn phí, không bán tour, không nhận đặt phòng, không thu thập thông tin cá nhân.
              </p>
            </div>
          </div>

          {/* Cột Khung Chat bên phải */}
          <div className="lg:col-span-7 h-[640px]">
            <ChatWidget embedded={true} className="h-full w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
