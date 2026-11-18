import { createServerFn } from "@tanstack/react-start";

export interface ContactPayload {
  fullName: string;
  phone: string;
  email?: string;
  departureDate?: string;
  groupSize?: string;
  tourType?: string;
  notes?: string;
}

export interface ContactResult {
  success: boolean;
  message: string;
  timestamp: string;
  recipient: string;
}

const DEFAULT_RECIPIENT = "congvanvu0000@gmail.com";

export const sendContactInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown): ContactPayload => {
    if (!data || typeof data !== "object") {
      throw new Error("Dữ liệu gửi lên không hợp lệ.");
    }
    const d = data as Record<string, unknown>;
    const fullName = String(d.fullName || "").trim();
    const phone = String(d.phone || "").trim();

    if (!fullName || fullName.length < 2) {
      throw new Error("Vui lòng nhập họ và tên của bạn.");
    }
    if (!phone || phone.length < 8) {
      throw new Error("Vui lòng nhập số điện thoại liên hệ hợp lệ.");
    }

    return {
      fullName,
      phone,
      email: d.email ? String(d.email).trim() : undefined,
      departureDate: d.departureDate ? String(d.departureDate).trim() : undefined,
      groupSize: d.groupSize ? String(d.groupSize).trim() : undefined,
      tourType: d.tourType ? String(d.tourType).trim() : undefined,
      notes: d.notes ? String(d.notes).trim() : undefined,
    };
  })
  .handler(async ({ data }): Promise<ContactResult> => {
    const recipient = process.env.CONTACT_RECEIVER_EMAIL || DEFAULT_RECIPIENT;
    const resendApiKey = process.env.RESEND_API_KEY;

    const emailSubject = `[NinhBinhTravel] Yêu Cầu Tư Vấn Tour: ${data.fullName} - ${data.phone}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DFD7C7; border-radius: 12px; background: #FAF8F4;">
        <div style="background: #244B3B; padding: 18px 24px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
          <h2 style="color: #D6AD72; margin: 0; font-size: 20px; letter-spacing: 1px;">NINHBINHTRAVEL</h2>
          <p style="color: #FFFFFF; margin: 4px 0 0; font-size: 13px;">Thông báo yêu cầu tư vấn tour mới</p>
        </div>
        
        <h3 style="color: #173428; border-bottom: 2px solid #D6AD72; padding-bottom: 8px;">Thông Tin Khách Hàng</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #5A6D63; width: 140px;"><strong>Họ và Tên:</strong></td>
            <td style="padding: 8px 0; color: #173428; font-weight: bold;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5A6D63;"><strong>Số Điện Thoại:</strong></td>
            <td style="padding: 8px 0; color: #173428; font-weight: bold;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5A6D63;"><strong>Email Khách:</strong></td>
            <td style="padding: 8px 0; color: #173428;">${data.email || "(Chưa cung cấp)"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5A6D63;"><strong>Chương Trình Tour:</strong></td>
            <td style="padding: 8px 0; color: #244B3B; font-weight: bold;">${data.tourType || "Tour 2N1Đ Di Sản & Cố Đô"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5A6D63;"><strong>Số Lượng Khách:</strong></td>
            <td style="padding: 8px 0; color: #173428;">${data.groupSize || "2 người"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #5A6D63;"><strong>Ngày Khởi Hành:</strong></td>
            <td style="padding: 8px 0; color: #173428;">${data.departureDate || "(Linh hoạt)"}</td>
          </tr>
        </table>

        ${
          data.notes
            ? `
          <div style="background: #FFFFFF; padding: 14px; border-radius: 8px; border-left: 4px solid #D6AD72; margin-bottom: 16px;">
            <strong style="color: #173428; font-size: 13px;">Ghi chú từ khách:</strong>
            <p style="color: #4A5568; margin: 6px 0 0; font-size: 13px; line-height: 1.5;">${data.notes}</p>
          </div>
        `
            : ""
        }

        <div style="font-size: 11px; color: #718096; border-top: 1px solid #E2E8F0; padding-top: 12px; margin-top: 20px; text-align: center;">
          Hệ thống NinhBinhTravel Mini App · Email nhận thông báo: <strong>${recipient}</strong>
        </div>
      </div>
    `;

    // Attempt to dispatch via Resend if RESEND_API_KEY is provided
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "NinhBinhTravel <onboarding@resend.dev>",
            to: [recipient],
            reply_to: data.email || undefined,
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          console.error("Resend API delivery error:", errBody);
        } else {
          console.log(`[Email Dispatched] Tour inquiry forwarded to ${recipient}`);
        }
      } catch (err) {
        console.error("Resend delivery exception:", err);
      }
    } else {
      // In development / demo mode, securely log the inquiry
      console.log(
        `[INQUIRY RECORDED] Tour inquiry from ${data.fullName} (${data.phone}) routed to ${recipient}`
      );
    }

    return {
      success: true,
      message: `Yêu cầu của bạn đã được ghi nhận và gửi đến chuyên viên phụ trách (${recipient}).`,
      timestamp: new Date().toISOString(),
      recipient,
    };
  });
