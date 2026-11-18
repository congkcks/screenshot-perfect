import { useState, useId } from "react";
import {
  Car,
  Bike,
  Ship,
  Train,
  UtensilsCrossed,
  Bed,
  Hotel,
  Home,
  MapPin,
  Calculator,
  ArrowRight,
  ExternalLink,
  Users,
  Calendar,
  Check,
  CheckCircle2,
  Sparkles,
  Info,
  Clock,
  Compass,
  DollarSign,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ==========================================================================
   CONSTANTS & DATA SOURCES (TICKETS, COST, STAY_LEVELS, FOOD_LEVELS, SPOTS)
   Toàn bộ thông tin được tổng hợp tham khảo từ các nguồn Internet.
   ========================================================================== */

export interface SpotTicket {
  id: string;
  name: string;
  cluster: string;
  priceDisplay: string;
  priceValue: number; // VNĐ per person for calculation
  note: string;
  defaultSelected: boolean;
  googleMapQuery: string;
}

export const TICKETS: Record<string, SpotTicket> = {
  "trang-an": {
    id: "trang-an",
    name: "Quần thể Tràng An",
    cluster: "Tràng An – Hoa Lư",
    priceDisplay: "250.000 – 300.000đ",
    priceValue: 250000,
    note: "Đã bao gồm vé thắng cảnh & thuyền nan 3 tuyến khám phá hang xuyên thủy",
    defaultSelected: true,
    googleMapQuery: "Khu du lich sinh thai Trang An Ninh Binh",
  },
  "tam-coc": {
    id: "tam-coc",
    name: "Tam Cốc – Bích Động",
    cluster: "Tam Cốc",
    priceDisplay: "120.000đ vé + 150.000đ đò / 2 người",
    priceValue: 195000,
    note: "Vé thắng cảnh sông Ngô Đồng và thuyền nan qua Hang Cả, Hang Hai, Hang Ba",
    defaultSelected: true,
    googleMapQuery: "Tam Coc Bich Dong Ninh Binh",
  },
  "hang-mua": {
    id: "hang-mua",
    name: "Hang Múa – Đỉnh Ngọa Long",
    cluster: "Tam Cốc – Hang Múa",
    priceDisplay: "100.000 – 150.000đ",
    priceValue: 100000,
    note: "Chinh phục 486 bậc thang đá vôi ngắm trọn thung lũng lúa Tam Cốc từ trên cao",
    defaultSelected: true,
    googleMapQuery: "Hang Mua Ninh Binh",
  },
  "hoa-lu": {
    id: "hoa-lu",
    name: "Cố Đô Hoa Lư",
    cluster: "Tràng An – Hoa Lư",
    priceDisplay: "20.000đ",
    priceValue: 20000,
    note: "Vé tham quan đền vua Đinh Tiên Hoàng và đền vua Lê Đại Hành linh thiêng",
    defaultSelected: true,
    googleMapQuery: "Co do Hoa Lu Ninh Binh",
  },
  "bai-dinh": {
    id: "bai-dinh",
    name: "Chùa Bái Đính (Xe điện/Bảo tháp)",
    cluster: "Gia Viễn",
    priceDisplay: "Vào cửa tự do · 60.000 – 110.000đ dịch vụ",
    priceValue: 60000,
    note: "Miễn phí khuôn viên; xe điện 30k/lượt, vé lên đỉnh bảo tháp xá lợi 50k",
    defaultSelected: true,
    googleMapQuery: "Chua Bai Dinh Ninh Binh",
  },
  "tuyet-tinh-coc": {
    id: "tuyet-tinh-coc",
    name: "Tuyệt Tình Cốc (Động Am Tiên)",
    cluster: "Tràng An – Hoa Lư",
    priceDisplay: "50.000đ",
    priceValue: 50000,
    note: "Hồ nước ngọc bích trong veo bao quanh bởi vách đá dựng đứng kỳ bí",
    defaultSelected: false,
    googleMapQuery: "Tuyet Tinh Coc Dong Am Tien Ninh Binh",
  },
  "thung-nham": {
    id: "thung-nham",
    name: "Vườn Chim Thung Nham",
    cluster: "Tam Cốc",
    priceDisplay: "150.000đ",
    priceValue: 150000,
    note: "Đã gồm thuyền nan thăm đảo chim tự nhiên và các hang động sinh thái",
    defaultSelected: false,
    googleMapQuery: "Vuon chim Thung Nham Ninh Binh",
  },
  "van-long": {
    id: "van-long",
    name: "Khu Bảo Tồn Đầm Vân Long",
    cluster: "Gia Viễn",
    priceDisplay: "100.000đ",
    priceValue: 100000,
    note: "Vé thắng cảnh và thuyền nan khám phá vịnh không sóng ngắm voọc mông trắng",
    defaultSelected: false,
    googleMapQuery: "Dam Van Long Gia Vien Ninh Binh",
  },
  "cuc-phuong": {
    id: "cuc-phuong",
    name: "Vườn Quốc Gia Cúc Phương",
    cluster: "Nho Quan",
    priceDisplay: "60.000đ người lớn / 10.000đ trẻ em",
    priceValue: 60000,
    note: "Vé cổng rừng nguyên sinh, cây chò ngàn năm và trung tâm cứu hộ linh trưởng",
    defaultSelected: false,
    googleMapQuery: "Vuon quoc gia Cuc Phuong Ninh Binh",
  },
};

export const SPOTS: SpotTicket[] = Object.values(TICKETS);

export interface StayLevel {
  id: string;
  name: string;
  desc: string;
  pricePerPersonPerNight: number;
  displayPrice: string;
  mapQuery: string;
}

export const STAY_LEVELS: StayLevel[] = [
  {
    id: "homestay",
    name: "Homestay Sinh Thái Thiên Nhiên",
    desc: "Gần gũi đời sống bản địa, view núi đá vôi và thung lũng sông nước tại Tràng An hoặc Tam Cốc.",
    pricePerPersonPerNight: 280000,
    displayPrice: "250.000 – 350.000đ / người / đêm",
    mapQuery: "homestay+Trang+An+Tam+Coc+Ninh+Binh",
  },
  {
    id: "hotel",
    name: "Khách Sạn Tiêu Chuẩn (3 Sao)",
    desc: "Phòng nghỉ hiện đại, tiện nghi chu đáo ngay khu vực phố du lịch Tam Cốc hoặc trung tâm TP Ninh Bình.",
    pricePerPersonPerNight: 500000,
    displayPrice: "450.000 – 600.000đ / người / đêm",
    mapQuery: "khach+san+3+sao+Tam+Coc+thanh+pho+Ninh+Binh",
  },
  {
    id: "resort",
    name: "Resort Nghỉ Dưỡng Sinh Thái (4 – 5 Sao)",
    desc: "Không gian biệt lập hòa vào thiên nhiên, hồ bơi sân vườn, dịch vụ spa và ẩm thực cao cấp.",
    pricePerPersonPerNight: 1350000,
    displayPrice: "1.200.000 – 1.800.000đ / người / đêm",
    mapQuery: "resort+nghi+duong+Tam+Coc+Trang+An+Ninh+Binh",
  },
];

export interface FoodLevel {
  id: string;
  name: string;
  desc: string;
  pricePerPersonPerDay: number;
  displayPrice: string;
  mapQuery: string;
}

export const FOOD_LEVELS: FoodLevel[] = [
  {
    id: "budget",
    name: "Tiết Kiệm & Đặc Sản Đường Phố",
    desc: "Cơm bình dân truyền thống, bún mọc Kim Sơn, bánh cuốn chả thịt nướng, xôi trứng kiến.",
    pricePerPersonPerDay: 140000,
    displayPrice: "120.000 – 160.000đ / người / ngày",
    mapQuery: "quan+an+binh+dan+bun+moc+Ninh+Binh",
  },
  {
    id: "specialty",
    name: "Trải Nghiệm Đặc Sản Dê Núi Cố Đô",
    desc: "Thịt dê núi 7 món thơm ngon, cơm cháy sốt dê đậm vị, ốc núi xào sả ớt, cá chuối nướng trui.",
    pricePerPersonPerDay: 280000,
    displayPrice: "250.000 – 350.000đ / người / ngày",
    mapQuery: "quan+de+nui+dac+san+Trang+An+Tam+Coc+Ninh+Binh",
  },
  {
    id: "premium",
    name: "Ẩm Thực Cao Cấp / Nhà Hàng View Núi",
    desc: "Thực đơn phong phú tại nhà hàng cảnh quan rộng lớn, nguyên liệu tươi ngon chọn lọc.",
    pricePerPersonPerDay: 480000,
    displayPrice: "450.000 – 600.000đ / người / ngày",
    mapQuery: "nha+hang+am+thuc+view+nui+Ninh+Binh",
  },
];

export const COST = {
  transportOptions: [
    {
      id: "motorbike",
      name: "Xe Máy Tự Túc / Phượt",
      desc: "Chạy theo Quốc lộ 1A từ Hà Nội, chủ động dừng đỗ chụp ảnh trên đường đi.",
      pricePerPersonTotal: 120000,
      displayPrice: "~100.000 – 150.000đ / người (xăng xe)",
    },
    {
      id: "limousine",
      name: "Xe Khách / Limousine Khứ Hồi",
      desc: "Xe đưa đón tận nơi từ Hà Nội đến tận homestay / điểm du lịch tại Ninh Bình.",
      pricePerPersonTotal: 320000,
      displayPrice: "~300.000 – 360.000đ / người (vé khứ hồi)",
    },
    {
      id: "car",
      name: "Ô Tô Riêng / Xe Gia Đình",
      desc: "Chạy cao tốc Pháp Vân – Cao Bồ chỉ 80 – 90 phút, phí cầu đường chia đều theo xe.",
      pricePerPersonTotal: 200000,
      displayPrice: "~180.000 – 250.000đ / người (xăng + trạm phí)",
    },
  ],
  internalTransports: [
    {
      title: "Thuê xe máy tự lái",
      price: "120.000 – 150.000đ / xe / ngày",
      desc: "Phương tiện lý tưởng nhất để tự do di chuyển qua các làng cổ, bờ lúa và chân núi.",
    },
    {
      title: "Xe đạp ngắm cảnh đồng quê",
      price: "50.000 – 80.000đ / xe / ngày",
      desc: "Cực kỳ thích hợp cho cung đường Tam Cốc – Bích Động – Đền Thái Vi vào buổi sớm mai.",
    },
    {
      title: "Xe điện & Thuyền nan truyền thống",
      price: "30.000 – 60.000đ / lượt (xe điện) · Đã gồm trong vé tham quan (thuyền)",
      desc: "Thư thái thưởng ngoạn không gian di sản thanh tịnh mà không cần tốn nhiều thể lực.",
    },
  ],
  nearbyClusters: [
    {
      clusterName: "Cụm 1: Tràng An – Cố Đô Hoa Lư – Tuyệt Tình Cốc",
      radius: "Bán kính di chuyển 3 – 5 km (khoảng 6 – 10 phút xe máy)",
      highlight: "Kinh đô ngàn năm & cảnh sắc thiên nhiên thung lũng nước ngọc bích",
      suggestedDay: "Lý tưởng cho Ngày 1: Sáng ngồi thuyền Tràng An 3 giờ, trưa ghé Động Am Tiên, chiều thăm Đền vua Đinh - vua Lê.",
      spots: ["Tràng An", "Cố Đô Hoa Lư", "Tuyệt Tình Cốc", "Chùa Duyên Ninh"],
    },
    {
      clusterName: "Cụm 2: Tam Cốc – Bích Động – Hang Múa – Thung Nham",
      radius: "Bán kính di chuyển 2 – 6 km (khoảng 5 – 12 phút)",
      highlight: "Dòng sông lúa chín vàng, đỉnh rồng đá triệu view và vườn chim hoàng hôn",
      suggestedDay: "Lý tưởng cho Ngày 2: Sáng sớm leo 486 bậc đỉnh Hang Múa đón gió, đạp xe ngắm chùa Bích Động, chiều đón đàn chim Thung Nham.",
      spots: ["Tam Cốc", "Chùa Bích Động", "Hang Múa", "Đền Thái Vi", "Vườn chim Thung Nham"],
    },
    {
      clusterName: "Cụm 3: Chùa Bái Đính – Đầm Vân Long – Suối Kênh Gà",
      radius: "Bán kính di chuyển 12 – 16 km (khoảng 15 – 22 phút)",
      highlight: "Đại cảnh tâm linh Phật giáo và miền đầm nước tĩnh lặng không một gợn sóng",
      suggestedDay: "Lý tưởng cho buổi sáng chiêm bái Bái Đính thanh tịnh, chiều ngồi thuyền nan ngắm voọc mông trắng tại Vân Long.",
      spots: ["Chùa Bái Đính", "Đầm Vân Long", "Khoáng nóng Kênh Gà"],
    },
    {
      clusterName: "Cụm 4: Rừng Cúc Phương – Châu Sơn – Hồ Đồng Chương",
      radius: "Khu vực phía Tây (cách trung tâm ~40 – 45 km)",
      highlight: "Rừng mưa nhiệt đới nguyên sinh đại ngàn và kiến trúc thánh đường thanh bình",
      suggestedDay: "Dành riêng 1 ngày trọn vẹn khám phá thiên nhiên hoang sơ, cây chò ngàn năm và đan viện Châu Sơn tĩnh mịch.",
      spots: ["Rừng Cúc Phương", "Đan viện Châu Sơn", "Hồ Đồng Chương"],
    },
  ],
  distanceMatrix: [
    { from: "Tràng An", to: "Hang Múa", distance: "4.5 km", time: "Khoảng 8 – 10 phút" },
    { from: "Tràng An", to: "Cố Đô Hoa Lư", distance: "3.5 km", time: "Khoảng 6 – 8 phút" },
    { from: "Tràng An", to: "Tam Cốc", distance: "7.0 km", time: "Khoảng 12 – 15 phút" },
    { from: "Tràng An", to: "Chùa Bái Đính", distance: "12.0 km", time: "Khoảng 18 – 20 phút" },
    { from: "Tràng An", to: "Đầm Vân Long", distance: "18.0 km", time: "Khoảng 25 – 30 phút" },
    { from: "Tam Cốc", to: "Hang Múa", distance: "4.8 km", time: "Khoảng 10 – 12 phút" },
    { from: "Tam Cốc", to: "Chùa Bích Động", distance: "2.5 km", time: "Khoảng 5 phút (đạp xe tuyệt đẹp)" },
    { from: "Tam Cốc", to: "Vườn Chim Thung Nham", distance: "6.0 km", time: "Khoảng 10 – 12 phút" },
    { from: "Tam Cốc", to: "Đền Thái Vi", distance: "1.5 km", time: "Khoảng 4 phút (đường bờ lúa)" },
    { from: "Cố Đô Hoa Lư", to: "Tuyệt Tình Cốc", distance: "1.8 km", time: "Khoảng 4 phút" },
    { from: "Cố Đô Hoa Lư", to: "Chùa Bái Đính", distance: "11.0 km", time: "Khoảng 15 – 18 phút" },
    { from: "Chùa Bái Đính", to: "Đầm Vân Long", distance: "16.0 km", time: "Khoảng 20 – 25 phút" },
    { from: "Bái Đính / Hoa Lư", to: "Rừng Cúc Phương", distance: "36.0 km", time: "Khoảng 45 – 50 phút" },
    { from: "TP Ninh Bình", to: "Tràng An", distance: "7.0 km", time: "Khoảng 12 – 15 phút" },
  ],
};

/* ==========================================================================
   FORMAT HELPERS
   ========================================================================== */

function formatVnd(amount: number): string {
  if (isNaN(amount) || amount < 0) return "0 VNĐ";
  return new Intl.NumberFormat("vi-VN").format(Math.round(amount)) + " VNĐ";
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export function TripPlannerSection() {
  const sectionId = useId();
  const [activeTab, setActiveTab] = useState<
    "transport" | "food" | "stay" | "clusters" | "calculator"
  >("calculator");

  // Calculator Interactive State
  const [durationDays, setDurationDays] = useState<1 | 2 | 3>(2);
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [selectedTransportId, setSelectedTransportId] = useState<string>("limousine");
  const [selectedStayId, setSelectedStayId] = useState<string>("homestay");
  const [selectedFoodId, setSelectedFoodId] = useState<string>("specialty");
  const [selectedSpotIds, setSelectedSpotIds] = useState<string[]>([
    "trang-an",
    "tam-coc",
    "hang-mua",
    "bai-dinh",
  ]);

  // Derived Values for Calculation (No NaN guaranteed)
  const safePeople = Math.min(12, Math.max(1, Number(peopleCount) || 1));
  const safeDays = durationDays === 1 ? 1 : durationDays === 2 ? 2 : 3;
  const stayNights = safeDays === 1 ? 0 : safeDays - 1;

  // Selected Option Objects
  const currentTransport =
    COST.transportOptions.find((t) => t.id === selectedTransportId) ||
    COST.transportOptions[1]!;

  const currentStay =
    STAY_LEVELS.find((s) => s.id === selectedStayId) || STAY_LEVELS[0]!;

  const currentFood =
    FOOD_LEVELS.find((f) => f.id === selectedFoodId) || FOOD_LEVELS[1]!;

  // Cost Computations
  const transportCostTotal = (currentTransport.pricePerPersonTotal || 0) * safePeople;
  const stayCostTotal =
    stayNights === 0 ? 0 : (currentStay.pricePerPersonPerNight || 0) * stayNights * safePeople;
  const foodCostTotal = (currentFood.pricePerPersonPerDay || 0) * safeDays * safePeople;

  const ticketsCostPerPerson = selectedSpotIds.reduce((sum, spotId) => {
    const spot = TICKETS[spotId];
    return sum + (spot ? spot.priceValue : 0);
  }, 0);
  const ticketsCostTotal = ticketsCostPerPerson * safePeople;

  const grandTotal = transportCostTotal + stayCostTotal + foodCostTotal + ticketsCostTotal;
  const grandTotalPerPerson = safePeople > 0 ? grandTotal / safePeople : 0;

  // Toggle Spot Selection
  const handleToggleSpot = (spotId: string) => {
    setSelectedSpotIds((prev) =>
      prev.includes(spotId) ? prev.filter((id) => id !== spotId) : [...prev, spotId]
    );
  };

  const handleSelectAllSpots = () => {
    setSelectedSpotIds(SPOTS.map((s) => s.id));
  };

  const handleClearSpots = () => {
    setSelectedSpotIds([]);
  };

  const tabs = [
    { id: "calculator", label: "Ước tính chi phí", icon: Calculator },
    { id: "clusters", label: "Địa điểm gần nhau", icon: MapPin },
    { id: "transport", label: "Di chuyển", icon: Car },
    { id: "food", label: "Ăn uống", icon: UtensilsCrossed },
    { id: "stay", label: "Lưu trú", icon: Bed },
  ] as const;

  return (
    <section
      id="len-ke-hoach"
      aria-labelledby={`${sectionId}-heading`}
      className="py-20 md:py-28 bg-[#F5F1E8] text-[#1A3429] relative overflow-hidden border-b border-[#E3DAC9]"
    >
      {/* Subtle organic background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-[#769477]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#D6AD72]/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#244B3B]/10 border border-[#244B3B]/20 text-[#244B3B] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D6AD72]" />
            CẨM NANG & DỰ TOÁN DU LỊCH TỰ TÚC
          </div>

          <h2
            id={`${sectionId}-heading`}
            className="text-3xl sm:text-4xl md:text-5xl font-editorial-heading font-serif text-[#173428] tracking-tight"
          >
            Lên Kế Hoạch Chuyến Đi{" "}
            <span className="italic font-serif text-[#244B3B] font-normal block sm:inline">
              Ninh Bình.
            </span>
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-[#465F53] font-light leading-relaxed">
            Tra cứu phương tiện di chuyển, gợi ý ẩm thực, nơi lưu trú, cụm danh lam thắng cảnh gần
            nhau và công cụ ước tính ngân sách minh bạch cho chuyến du ngoạn tự túc.
          </p>
        </div>

        {/* 5 Tabs Navigation Bar (Horizontally scrollable on mobile) */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div
            role="tablist"
            aria-label="Danh mục kế hoạch du lịch Ninh Bình"
            className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#EAE3D5] border border-[#DFD7C7] max-w-full overflow-x-auto no-scrollbar scroll-smooth"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[42px] px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#244B3B] focus:ring-offset-2 ${
                    isActive
                      ? "bg-[#244B3B] text-white shadow-md shadow-[#244B3B]/20 font-bold"
                      : "text-[#354E42] hover:text-[#173428] hover:bg-white/60"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#D6AD72]" : "text-[#769477]"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Calculator (Ước tính chi phí) */}
        {activeTab === "calculator" && (
          <div
            role="tabpanel"
            id="panel-calculator"
            aria-labelledby="tab-calculator"
            className="space-y-8 animate-fadeIn"
          >
            {/* Calculator Card Container */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-[#DFD7C7] shadow-xl shadow-[#244B3B]/5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left Controls Column (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Step 1: Duration & People */}
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#173428] flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-[#244B3B] text-[#D6AD72] text-xs flex items-center justify-center font-bold">
                        1
                      </span>
                      Thời Gian & Số Lượng Khách
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Duration Selector */}
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#DFD7C7]">
                        <label className="text-xs font-semibold text-[#465F53] uppercase tracking-wider block mb-2">
                          Thời gian chuyến đi
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: 1, label: "1 Ngày", desc: "Sáng đi tối về" },
                            { value: 2, label: "2N1Đ", desc: "1 đêm nghỉ" },
                            { value: 3, label: "3N2Đ", desc: "2 đêm nghỉ" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setDurationDays(opt.value as 1 | 2 | 3)}
                              className={`min-h-[44px] py-2 px-1 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                                durationDays === opt.value
                                  ? "bg-[#244B3B] text-white border-[#244B3B] shadow-sm"
                                  : "bg-white text-[#244B3B] border-[#DFD7C7] hover:bg-[#FAF8F4]"
                              }`}
                            >
                              <div className="leading-tight">{opt.label}</div>
                              <div className="text-[10px] font-normal opacity-80">
                                {opt.desc}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* People Selector */}
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#DFD7C7]">
                        <label className="text-xs font-semibold text-[#465F53] uppercase tracking-wider block mb-2">
                          Số lượng người tham gia
                        </label>
                        <div className="flex items-center justify-between bg-white rounded-xl border border-[#DFD7C7] p-1.5">
                          <button
                            type="button"
                            aria-label="Giảm 1 người"
                            disabled={peopleCount <= 1}
                            onClick={() => setPeopleCount((p) => Math.max(1, p - 1))}
                            className="w-10 h-10 rounded-lg bg-[#FAF8F4] hover:bg-[#EAE3D5] text-[#173428] font-bold text-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#244B3B]"
                          >
                            –
                          </button>
                          <div className="text-center px-4">
                            <span className="text-lg font-bold text-[#173428]">
                              {safePeople}
                            </span>
                            <span className="text-xs text-[#5A6D63] ml-1">người</span>
                          </div>
                          <button
                            type="button"
                            aria-label="Tăng 1 người"
                            disabled={peopleCount >= 12}
                            onClick={() => setPeopleCount((p) => Math.min(12, p + 1))}
                            className="w-10 h-10 rounded-lg bg-[#FAF8F4] hover:bg-[#EAE3D5] text-[#173428] font-bold text-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#244B3B]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Transportation & Food & Stay Mode */}
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#173428] flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-[#244B3B] text-[#D6AD72] text-xs flex items-center justify-center font-bold">
                        2
                      </span>
                      Phương Tiện, Chỗ Nghỉ & Ẩm Thực
                    </h3>

                    <div className="space-y-3.5">
                      {/* Transport Options */}
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#DFD7C7]">
                        <span className="text-xs font-semibold text-[#465F53] uppercase tracking-wider block mb-2">
                          Phương tiện từ Hà Nội & Nội tỉnh
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {COST.transportOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setSelectedTransportId(opt.id)}
                              className={`min-h-[44px] p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                                selectedTransportId === opt.id
                                  ? "bg-[#244B3B] text-white border-[#244B3B] shadow-sm"
                                  : "bg-white text-[#173428] border-[#DFD7C7] hover:bg-[#FAF8F4]"
                              }`}
                            >
                              <div className="text-xs font-bold leading-tight line-clamp-1">
                                {opt.name}
                              </div>
                              <div
                                className={`text-[11px] mt-0.5 font-medium ${
                                  selectedTransportId === opt.id
                                    ? "text-[#D6AD72]"
                                    : "text-[#769477]"
                                }`}
                              >
                                {opt.displayPrice}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Stay Level Options */}
                      <div
                        className={`p-3.5 rounded-2xl border transition-all ${
                          stayNights === 0
                            ? "bg-[#EAE3D5]/40 border-[#DFD7C7] opacity-75"
                            : "bg-[#FAF8F4] border-[#DFD7C7]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-[#465F53] uppercase tracking-wider">
                            Mức lưu trú ({stayNights} đêm)
                          </span>
                          {stayNights === 0 && (
                            <span className="text-[11px] text-[#769477] font-semibold italic">
                              * Chuyến đi 1 ngày: Lưu trú = 0đ
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {STAY_LEVELS.map((opt) => {
                            const isSelected = selectedStayId === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                disabled={stayNights === 0}
                                onClick={() => setSelectedStayId(opt.id)}
                                className={`min-h-[44px] p-2.5 rounded-xl text-left transition-all border ${
                                  stayNights === 0
                                    ? "bg-white/50 text-[#8C9E95] border-[#DFD7C7] cursor-not-allowed"
                                    : isSelected
                                    ? "bg-[#244B3B] text-white border-[#244B3B] shadow-sm cursor-pointer"
                                    : "bg-white text-[#173428] border-[#DFD7C7] hover:bg-[#FAF8F4] cursor-pointer"
                                }`}
                              >
                                <div className="text-xs font-bold leading-tight line-clamp-1">
                                  {opt.name}
                                </div>
                                <div
                                  className={`text-[11px] mt-0.5 font-medium ${
                                    stayNights === 0
                                      ? "text-[#8C9E95]"
                                      : isSelected
                                      ? "text-[#D6AD72]"
                                      : "text-[#769477]"
                                  }`}
                                >
                                  {stayNights === 0 ? "0 VNĐ" : opt.displayPrice}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Food Level Options */}
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#DFD7C7]">
                        <span className="text-xs font-semibold text-[#465F53] uppercase tracking-wider block mb-2">
                          Phong cách ẩm thực ({safeDays} ngày)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {FOOD_LEVELS.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setSelectedFoodId(opt.id)}
                              className={`min-h-[44px] p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                                selectedFoodId === opt.id
                                  ? "bg-[#244B3B] text-white border-[#244B3B] shadow-sm"
                                  : "bg-white text-[#173428] border-[#DFD7C7] hover:bg-[#FAF8F4]"
                              }`}
                            >
                              <div className="text-xs font-bold leading-tight line-clamp-1">
                                {opt.name}
                              </div>
                              <div
                                className={`text-[11px] mt-0.5 font-medium ${
                                  selectedFoodId === opt.id
                                    ? "text-[#D6AD72]"
                                    : "text-[#769477]"
                                }`}
                              >
                                {opt.displayPrice}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Attraction Spots Selection (SPOTS / TICKETS) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#173428] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#244B3B] text-[#D6AD72] text-xs flex items-center justify-center font-bold">
                          3
                        </span>
                        Chọn Các Điểm Tham Quan (Vé Tham Khảo)
                      </h3>

                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={handleSelectAllSpots}
                          className="text-[#244B3B] font-semibold hover:underline cursor-pointer"
                        >
                          Chọn tất cả
                        </button>
                        <span className="text-[#8C9E95]">·</span>
                        <button
                          type="button"
                          onClick={handleClearSpots}
                          className="text-[#8C9E95] hover:text-[#173428] cursor-pointer"
                        >
                          Bỏ chọn
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                      {SPOTS.map((spot) => {
                        const isChecked = selectedSpotIds.includes(spot.id);
                        return (
                          <div
                            key={spot.id}
                            onClick={() => handleToggleSpot(spot.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                              isChecked
                                ? "bg-[#244B3B]/5 border-[#244B3B] shadow-xs"
                                : "bg-white border-[#DFD7C7] hover:border-[#769477]"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-colors flex-shrink-0 ${
                                isChecked
                                  ? "bg-[#244B3B] border-[#244B3B] text-white"
                                  : "border-[#DFD7C7] bg-white"
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold text-[#173428] truncate">
                                  {spot.name}
                                </span>
                                <span className="text-[11px] font-bold text-[#244B3B] flex-shrink-0">
                                  {spot.priceDisplay}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#5A6D63] font-light mt-0.5 line-clamp-1">
                                {spot.note}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Result Column: Cost Breakdown & Summary (5 cols) */}
                <div className="lg:col-span-5 bg-[#173428] text-white rounded-3xl p-6 sm:p-7 border border-[#D6AD72]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  <div
                    className="absolute top-0 right-0 w-64 h-64 bg-[#D6AD72]/10 rounded-full blur-2xl pointer-events-none"
                    aria-hidden="true"
                  />

                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-[#D6AD72] font-semibold">
                        <DollarSign className="w-3.5 h-3.5" />
                        Dự Toán Ngân Sách Tự Túc
                      </div>
                      <span className="text-xs text-white/70">
                        {safeDays} ngày · {stayNights} đêm
                      </span>
                    </div>

                    {/* Grand Total Hero Box */}
                    <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 mb-5 backdrop-blur-sm">
                      <div className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-1">
                        Tổng Chi Phí Ước Tính (Đoàn {safePeople} người)
                      </div>
                      <div className="text-2xl sm:text-3xl font-serif font-bold text-[#D6AD72] tracking-tight">
                        {formatVnd(grandTotal)}
                      </div>
                      <div className="mt-1.5 text-xs text-white/80 flex items-center justify-between">
                        <span>Trung bình mỗi người:</span>
                        <span className="font-bold text-white bg-white/15 px-2.5 py-0.5 rounded-full text-xs">
                          ~{formatVnd(grandTotalPerPerson)} / người
                        </span>
                      </div>
                    </div>

                    {/* Detailed Breakdown List */}
                    <div className="space-y-3 text-xs mb-6">
                      <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                        <span className="text-white/80 flex items-center gap-2">
                          <Car className="w-3.5 h-3.5 text-[#D6AD72]" />
                          Di chuyển ({currentTransport.name}):
                        </span>
                        <span className="font-semibold text-white">
                          {formatVnd(transportCostTotal)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                        <span className="text-white/80 flex items-center gap-2">
                          <Bed className="w-3.5 h-3.5 text-[#D6AD72]" />
                          Lưu trú ({stayNights} đêm · {currentStay.name}):
                        </span>
                        <span className="font-semibold text-white">
                          {formatVnd(stayCostTotal)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                        <span className="text-white/80 flex items-center gap-2">
                          <UtensilsCrossed className="w-3.5 h-3.5 text-[#D6AD72]" />
                          Ăn uống ({safeDays} ngày · {currentFood.name}):
                        </span>
                        <span className="font-semibold text-white">
                          {formatVnd(foodCostTotal)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                        <span className="text-white/80 flex items-center gap-2">
                          <Compass className="w-3.5 h-3.5 text-[#D6AD72]" />
                          Vé thắng cảnh ({selectedSpotIds.length} địa điểm đã chọn):
                        </span>
                        <span className="font-semibold text-white">
                          {formatVnd(ticketsCostTotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps Search Link Helper */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <p className="text-[11px] text-white/60 italic leading-relaxed">
                      💡 Mức chi phí dựa trên giá vé tham khảo và chi tiêu du lịch tự túc bình quân tại Ninh Bình.
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://www.google.com/maps/search/quan+an+ngon+dac+san+Trang+An+Tam+Coc+Ninh+Binh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors border border-white/15"
                      >
                        <ExternalLink className="w-3 h-3 text-[#D6AD72]" />
                        Tìm Quán Ăn
                      </a>

                      <a
                        href="https://www.google.com/maps/search/homestay+resort+Trang+An+Tam+Coc+Ninh+Binh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors border border-white/15"
                      >
                        <ExternalLink className="w-3 h-3 text-[#D6AD72]" />
                        Xem Chỗ Nghỉ
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Clusters & Distances (Địa điểm gần nhau) */}
        {activeTab === "clusters" && (
          <div
            role="tabpanel"
            id="panel-clusters"
            aria-labelledby="tab-clusters"
            className="space-y-8 animate-fadeIn"
          >
            {/* 4 Geographic Clusters Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COST.nearbyClusters.map((cluster, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DFD7C7] shadow-md hover:border-[#D6AD72] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#244B3B]/10 text-[#244B3B]">
                      <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" />
                      {cluster.radius}
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#173428]">
                      {cluster.clusterName}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#465F53] font-light leading-relaxed">
                      {cluster.highlight}
                    </p>

                    <div className="p-3 rounded-2xl bg-[#FAF8F4] border border-[#E3DAC9] text-xs text-[#2E453A] leading-relaxed">
                      <strong className="text-[#173428]">Gợi ý lịch trình:</strong> {cluster.suggestedDay}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#DFD7C7] flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-semibold text-[#8C9E95] mr-1">Điểm đến:</span>
                    {cluster.spots.map((spot, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-[#EAE3D5] text-[#173428] text-xs font-medium"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Distance Matrix Table (Scrollable within container) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DFD7C7] shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#173428] flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#244B3B]" />
                    Bảng Tra Cứu Khoảng Cách Giữa Các Danh Thắng
                  </h3>
                  <p className="text-xs text-[#5A6D63] mt-1 font-light">
                    Ước tính theo cung đường bộ thực tế bằng ô tô / xe máy giữa các điểm tham quan chính.
                  </p>
                </div>

                <a
                  href="#ban-do"
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-[#244B3B] hover:bg-[#173428] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D6AD72]" />
                  Xem Trên Bản Đồ
                </a>
              </div>

              {/* Table Wrapper for Horizontal Scroll */}
              <div className="overflow-x-auto rounded-2xl border border-[#DFD7C7]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF8F4] text-[#173428] font-serif border-b border-[#DFD7C7]">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Điểm Xuất Phát</th>
                      <th className="py-3.5 px-4 font-bold">Điểm Đến</th>
                      <th className="py-3.5 px-4 font-bold text-center">Khoảng Cách</th>
                      <th className="py-3.5 px-4 font-bold">Thời Gian Dự Kiến</th>
                      <th className="py-3.5 px-4 font-bold text-center">Bản Đồ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DFD7C7] text-[#354E42]">
                    {COST.distanceMatrix.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F4]/80 transition-colors">
                        <td className="py-3 px-4 font-semibold text-[#173428] whitespace-nowrap">
                          {item.from}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#173428] whitespace-nowrap">
                          {item.to}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-[#244B3B] whitespace-nowrap">
                          {item.distance}
                        </td>
                        <td className="py-3 px-4 font-light text-[#5A6D63] whitespace-nowrap">
                          {item.time}
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <a
                            href={`https://www.google.com/maps/dir/${encodeURIComponent(
                              item.from + " Ninh Binh"
                            )}/${encodeURIComponent(item.to + " Ninh Binh")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#244B3B] hover:text-[#D6AD72] hover:underline"
                          >
                            <span>Dẫn đường</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Transport (Di chuyển) */}
        {activeTab === "transport" && (
          <div
            role="tabpanel"
            id="panel-transport"
            aria-labelledby="tab-transport"
            className="space-y-8 animate-fadeIn"
          >
            {/* Hanoi to Ninh Binh Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Limousine */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DFD7C7] shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#244B3B] text-[#D6AD72] flex items-center justify-center shadow-md">
                    <Car className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#173428]">
                    Xe Limousine Cao Cấp
                  </h3>
                  <div className="text-xs font-bold text-[#244B3B] bg-[#244B3B]/10 px-3 py-1 rounded-full inline-block">
                    130.000 – 180.000đ / lượt
                  </div>
                  <p className="text-xs sm:text-sm text-[#465F53] font-light leading-relaxed">
                    Đón trả tận nơi tại các quận nội thành Hà Nội và trả khách thẳng về homestay/resort tại Tràng An, Tam Cốc hoặc TP Ninh Bình. Thời gian di chuyển chỉ 80 – 90 phút.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#DFD7C7] text-xs text-[#5A6D63]">
                  💡 <strong>Ưu điểm:</strong> Ghế bọc da massage, máy lạnh, wifi, không phải trung chuyển taxi.
                </div>
              </div>

              {/* Option 2: Train */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DFD7C7] shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#244B3B] text-[#D6AD72] flex items-center justify-center shadow-md">
                    <Train className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#173428]">
                    Tàu Hỏa Ga Hà Nội
                  </h3>
                  <div className="text-xs font-bold text-[#244B3B] bg-[#244B3B]/10 px-3 py-1 rounded-full inline-block">
                    80.000 – 140.000đ / vé
                  </div>
                  <p className="text-xs sm:text-sm text-[#465F53] font-light leading-relaxed">
                    Các chuyến tàu SE5, SE7, SE19 xuất phát từ Ga Hà Nội đến Ga Ninh Bình (trung tâm thành phố) mất khoảng 2 giờ 15 phút. Trải nghiệm ngắm đồng lúa miền Bắc qua khung cửa sổ toa tàu.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#DFD7C7] text-xs text-[#5A6D63]">
                  💡 <strong>Ưu điểm:</strong> Đúng giờ, an toàn tuyệt đối, rất thú vị cho bạn trẻ thích check-in vintage.
                </div>
              </div>

              {/* Option 3: Motorbike / Personal Car */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DFD7C7] shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#244B3B] text-[#D6AD72] flex items-center justify-center shadow-md">
                    <Bike className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#173428]">
                    Xe Máy & Ô Tô Riêng
                  </h3>
                  <div className="text-xs font-bold text-[#244B3B] bg-[#244B3B]/10 px-3 py-1 rounded-full inline-block">
                    ~100.000 – 200.000đ (xăng xe/phí)
                  </div>
                  <p className="text-xs sm:text-sm text-[#465F53] font-light leading-relaxed">
                    Khoảng cách 93 – 100 km qua cao tốc Pháp Vân – Cầu Giẽ – Cao Bồ (cho ô tô) hoặc Quốc lộ 1A qua Phủ Lý (cho xe máy). Hoàn toàn chủ động thời gian đi và về.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#DFD7C7] text-xs text-[#5A6D63]">
                  💡 <strong>Ưu điểm:</strong> Linh hoạt khám phá mọi góc nhỏ tại Ninh Bình mà không cần thuê thêm xe.
                </div>
              </div>
            </div>

            {/* Internal Transportation Tips */}
            <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-8 border border-[#DFD7C7]">
              <h3 className="text-xl font-serif font-bold text-[#173428] mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#244B3B]" />
                Kinh Nghiệm Di Chuyển Nội Tỉnh Ninh Bình
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COST.internalTransports.map((tip, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#DFD7C7] space-y-2">
                    <h4 className="text-sm font-bold text-[#173428]">{tip.title}</h4>
                    <div className="text-xs font-semibold text-[#244B3B]">{tip.price}</div>
                    <p className="text-xs text-[#5A6D63] font-light leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Food & Dining (Ăn uống) */}
        {activeTab === "food" && (
          <div
            role="tabpanel"
            id="panel-food"
            aria-labelledby="tab-food"
            className="space-y-8 animate-fadeIn"
          >
            {/* 3 Food Budget Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FOOD_LEVELS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DFD7C7] shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#244B3B] text-[#D6AD72] flex items-center justify-center shadow-md">
                      <UtensilsCrossed className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#173428]">{item.name}</h3>
                    <div className="text-xs font-bold text-[#244B3B] bg-[#244B3B]/10 px-3 py-1 rounded-full inline-block">
                      {item.displayPrice}
                    </div>
                    <p className="text-xs sm:text-sm text-[#465F53] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#DFD7C7]">
                    <a
                      href={`https://www.google.com/maps/search/${item.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE3D5] text-[#173428] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#DFD7C7]"
                    >
                      <span>Tìm Quán Theo Khu Vực Trên Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#244B3B]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Specialty Highlights Box */}
            <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-8 border border-[#DFD7C7]">
              <h3 className="text-xl font-serif font-bold text-[#173428] mb-2 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-[#244B3B]" />
                Top 6 Đặc Sản Nhất Định Phải Thử Tại Ninh Bình
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6D63] font-light mb-6">
                Ẩm thực cố đô kết tinh từ sản vật núi đá và dòng nước ngọt lành của vùng châu thổ.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "Thịt Dê Núi Ninh Bình",
                    desc: "Dê chạy nhảy trên núi đá ăn thảo mộc, thịt săn chắc, thơm mềm không hôi. Chế biến dê tái chanh, dê nướng tảng, dê xào lăn.",
                  },
                  {
                    name: "Cơm Cháy Chà Bông Sốt Dê",
                    desc: "Cơm nếp hương chiên vàng giòn rụm, quết nước sốt thịt dê đậm đà nóng hổi ăn kèm chà bông thơm bùi.",
                  },
                  {
                    name: "Ốc Núi Tam Điệp",
                    desc: "Loài ốc chỉ xuất hiện vào mùa mưa (tháng 4 – 8) sống trong hốc đá, ăn lá cây rừng thuốc nam, thịt dai giòn sần sật.",
                  },
                  {
                    name: "Xôi Trứng Kiến Nho Quan",
                    desc: "Trứng kiến nâu béo ngậy được phi thơm hành mỡ rồi đồ cùng xôi nếp dẻo thơm nức mũi vùng đất Nho Quan.",
                  },
                  {
                    name: "Bún Mọc Tố Như Kim Sơn",
                    desc: "Viên mọc thịt tươi ngọt tự nhiên, nước dùng trong vắt thanh tao ăn kèm đĩa bún sợi nhỏ và rau sống thanh mát.",
                  },
                  {
                    name: "Gỏi Cá Nhệch Kim Sơn",
                    desc: "Cá nhệch tươi trộn thính gạo rang vàng, cuộn lá ổi lá mơ chấm cùng chẻo nóng sánh ngậy thơm nồng riềng mẻ.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#DFD7C7] space-y-1.5">
                    <h4 className="text-sm font-bold text-[#173428]">{item.name}</h4>
                    <p className="text-xs text-[#5A6D63] font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Stay & Accommodation (Lưu trú) */}
        {activeTab === "stay" && (
          <div
            role="tabpanel"
            id="panel-stay"
            aria-labelledby="tab-stay"
            className="space-y-8 animate-fadeIn"
          >
            {/* 3 Stay Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STAY_LEVELS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DFD7C7] shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#244B3B] text-[#D6AD72] flex items-center justify-center shadow-md">
                      {item.id === "homestay" ? (
                        <Home className="w-5 h-5" />
                      ) : item.id === "hotel" ? (
                        <Hotel className="w-5 h-5" />
                      ) : (
                        <Bed className="w-5 h-5" />
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#173428]">{item.name}</h3>
                    <div className="text-xs font-bold text-[#244B3B] bg-[#244B3B]/10 px-3 py-1 rounded-full inline-block">
                      {item.displayPrice}
                    </div>
                    <p className="text-xs sm:text-sm text-[#465F53] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#DFD7C7]">
                    <a
                      href={`https://www.google.com/maps/search/${item.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE3D5] text-[#173428] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#DFD7C7]"
                    >
                      <span>Xem Chỗ Nghỉ Theo Khu Vực Trên Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#244B3B]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Area Recommendation Guide */}
            <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-8 border border-[#DFD7C7]">
              <h3 className="text-xl font-serif font-bold text-[#173428] mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#244B3B]" />
                Nên Chọn Ở Khu Vực Nào Tại Ninh Bình?
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6D63] font-light mb-6">
                Tùy theo sở thích không gian yên tĩnh hay nhộn nhịp, bạn có thể lựa chọn 3 khu vực chính:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-white border border-[#DFD7C7] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#244B3B]">
                    Khu Vực Tam Cốc
                  </span>
                  <p className="text-xs text-[#5A6D63] font-light leading-relaxed">
                    Tập trung nhiều homestay đẹp, quán cà phê chill, phố đi bộ buổi tối nhộn nhịp và dịch vụ xe đạp dạo đồng lúa thuận tiện.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DFD7C7] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#244B3B]">
                    Khu Vực Tràng An – Hoa Lư
                  </span>
                  <p className="text-xs text-[#5A6D63] font-light leading-relaxed">
                    Không gian thanh bình, tĩnh mịch nép mình bên dãy núi đá vôi. Rất thích hợp cho những ai tìm kiếm sự tĩnh tại và thức dậy nghe tiếng chim hót.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DFD7C7] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#244B3B]">
                    Trung Tâm TP. Ninh Bình
                  </span>
                  <p className="text-xs text-[#5A6D63] font-light leading-relaxed">
                    Gần ga tàu, bến xe, nhiều khách sạn tiêu chuẩn hiện đại, chợ rồng và các quán ăn đêm đặc sản phong phú.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Required Disclaimer Banner at Bottom */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-5 rounded-2xl bg-[#EAE3D5]/70 border border-[#D6AD72]/40 text-center max-w-4xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-[#3E5649] font-medium leading-relaxed">
            <span className="font-bold text-[#1A3429]">Lưu ý:</span> Thông tin, giá vé, chi phí và
            khoảng cách được tổng hợp từ các nguồn tham khảo trên Internet, chỉ mang tính chất ước
            tính và có thể thay đổi theo thời gian. Vui lòng kiểm tra thông tin thực tế trước khi tham
            quan.
          </p>
        </div>
      </div>
    </section>
  );
}
