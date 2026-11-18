import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { whyBookWithUsList } from "@/data/ninh-binh";
import { toast } from "sonner";
import { sendContactInquiry } from "@/services/contact";

export function TourBookingSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    departureDate: "",
    groupSize: "2",
    tourType: "Tour 2N1Đ Di Sản & Cố Đô",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error("Vui lòng nhập Họ tên và Số điện thoại để nhận tư vấn!");
      return;
    }

    try {
      setIsSubmitting(true);
      await sendContactInquiry({
        data: formData,
      });

      toast.success(
        `Cảm ơn ${formData.fullName}! Yêu cầu tư vấn tour đã được chuyển đến bộ phận CSKH (congvanvu0000@gmail.com). Đội ngũ NinhBinhTravel sẽ liên hệ qua SĐT ${formData.phone} trong vòng 15 phút.`,
        { duration: 6000 }
      );

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        departureDate: "",
        groupSize: "2",
        tourType: "Tour 2N1Đ Di Sản & Cố Đô",
        notes: "",
      });
    } catch (err: any) {
      console.error("Booking submission error:", err);
      toast.error(
        err?.message ||
          "Chưa thể gửi yêu cầu lúc này. Vui lòng liên hệ trực tiếp qua congvanvu0000@gmail.com hoặc hotline 1900 6868!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-24 bg-[#0F231B] text-white relative overflow-hidden"
      id="dat-tour"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6AD72]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#244B3B]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Why book with us (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D6AD72] text-[#173428]">
              <Sparkles className="w-3.5 h-3.5" />
              Dịch Vụ Du Lịch Chuẩn Mực
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading text-white leading-tight">
              Tại Sao Đặt Tour{" "}
              <span className="italic font-serif text-[#D6AD72] font-normal block sm:inline">
                Cùng Chúng Tôi?
              </span>
            </h2>

            <p className="text-sm text-white/80 font-light leading-relaxed">
              Chúng tôi không chỉ bán một chuyến đi, chúng tôi mang đến trải nghiệm thấu hiểu bản địa, dịch vụ chu đáo và những khoảnh khắc chạm vào linh hồn non nước Ninh Bình.
            </p>

            {/* Checklist of guarantees */}
            <div className="space-y-3.5 pt-2">
              {whyBookWithUsList.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#D6AD72] text-[#173428] flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct Contact hotline */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6AD72]" />
                <span>
                  Hotline 24/7: <strong className="text-white text-sm">1900 6868</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6AD72]" />
                <a
                  href="mailto:congvanvu0000@gmail.com"
                  className="hover:text-[#D6AD72] transition-colors underline decoration-[#D6AD72]/40"
                >
                  congvanvu0000@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-[#173428] rounded-3xl p-6 sm:p-10 border border-[#D6AD72]/40 shadow-2xl relative">
              <div className="text-center mb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D6AD72]">
                  🎉 SẴN SÀNG KHÁM PHÁ NINH BÌNH?
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                  Nhận Báo Giá & Ưu Đãi Ngay
                </h3>
                <p className="text-xs text-white/70 font-light mt-1">
                  Để lại thông tin, chuyên viên sẽ phản hồi trực tiếp tới email hoặc điện thoại của bạn!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D6AD72]" />
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#D6AD72]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#D6AD72]" />
                      Số Điện Thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="0912 345 678"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#D6AD72]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#D6AD72]" />
                      Email Nhận Thông Tin
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#D6AD72]"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D6AD72]" />
                      Ngày Khởi Hành Dự Kiến
                    </label>
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) =>
                        setFormData({ ...formData, departureDate: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#D6AD72]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Group Size */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#D6AD72]" />
                      Số Lượng Khách
                    </label>
                    <select
                      value={formData.groupSize}
                      onChange={(e) =>
                        setFormData({ ...formData, groupSize: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#173428] border border-white/20 text-white text-xs focus:outline-none focus:border-[#D6AD72]"
                    >
                      <option value="1">1 người (Đi lẻ)</option>
                      <option value="2">2 người (Cặp đôi)</option>
                      <option value="3-5">3 — 5 người (Gia đình)</option>
                      <option value="6-10">6 — 10 người (Nhóm bạn)</option>
                      <option value="10+">Trên 10 người (Đoàn thể)</option>
                    </select>
                  </div>

                  {/* Tour Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" />
                      Chương Trình Quan Tâm
                    </label>
                    <select
                      value={formData.tourType}
                      onChange={(e) =>
                        setFormData({ ...formData, tourType: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#173428] border border-white/20 text-white text-xs focus:outline-none focus:border-[#D6AD72]"
                    >
                      <option value="Tour 2N1Đ Di Sản & Cố Đô">
                        Tour 2N1Đ — Di Sản & Cố Đô
                      </option>
                      <option value="Tour 3N2Đ Thiên Nhiên & Văn Hóa">
                        Tour 3N2Đ — Thiên Nhiên & Văn Hóa
                      </option>
                      <option value="Tour 1 Ngày Tinh Hoa Cố Đô">
                        Tour 1 Ngày — Tinh Hoa Cố Đô
                      </option>
                      <option value="Tour Thiết Kế Riêng">
                        Thiết Kế Tour Riêng Theo Yêu Cầu
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message / Special Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#D6AD72]" />
                    Nội Dung Ghi Chú / Yêu Cầu Đặc Biệt
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Ví dụ: Cần xe đưa đón từ Hà Nội, nhóm có trẻ nhỏ, tư vấn thực đơn dê núi..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#D6AD72] resize-none"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D6AD72] hover:bg-[#E7C99B] text-[#173428] font-bold text-sm py-6 rounded-xl shadow-xl shadow-[#D6AD72]/20 transition-all gap-2 mt-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Đang gửi yêu cầu..." : "GỬI YÊU CẦU TƯ VẤN MIỄN PHÍ"}
                </Button>

                {/* Disclaimer note */}
                <p className="text-[10px] text-white/60 italic text-center pt-2 leading-tight">
                  * Thông tin đặt tour sẽ được bảo mật và chuyển tiếp trực tiếp đến ban tư vấn phụ trách (<strong className="text-white/80">congvanvu0000@gmail.com</strong>).
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}