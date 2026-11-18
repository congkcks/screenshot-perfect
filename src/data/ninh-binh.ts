import trangAnImage from "@/assets/ninh-binh-trang-an.jpg";
import muaCaveImage from "@/assets/mua-cave-view.jpg";
import localFoodImage from "@/assets/ninh-binh-food.jpg";

export type DestinationCategory = "Thiên nhiên" | "Check-in" | "Văn hóa" | "Tâm linh" | "Sinh thái";

export type Destination = {
  name: string;
  area: string;
  category: DestinationCategory;
  description: string;
  image: string;
  mapQuery: string;
};

export const destinations: Destination[] = [
  { name: "Quần thể danh thắng Tràng An", area: "Hoa Lư", category: "Thiên nhiên", description: "Theo dòng thuyền qua những dãy núi đá vôi và hang động kỳ thú.", image: trangAnImage, mapQuery: "Tràng An Ninh Bình" },
  { name: "Tam Cốc – Bích Động", area: "Ninh Hải", category: "Thiên nhiên", description: "Một miền sông nước thanh bình giữa cánh đồng và núi đá.", image: trangAnImage, mapQuery: "Tam Cốc Bích Động Ninh Bình" },
  { name: "Hang Múa", area: "Ninh Xuân", category: "Check-in", description: "Đường lên đỉnh núi mở ra tầm nhìn rộng khắp vùng Tam Cốc.", image: muaCaveImage, mapQuery: "Hang Múa Ninh Bình" },
  { name: "Cố đô Hoa Lư", area: "Trường Yên", category: "Văn hóa", description: "Dấu tích kinh đô xưa giữa một thung lũng núi đá trầm mặc.", image: muaCaveImage, mapQuery: "Cố đô Hoa Lư Ninh Bình" },
  { name: "Chùa Bái Đính", area: "Gia Sinh", category: "Tâm linh", description: "Quần thể chùa nằm giữa núi rừng và không gian rộng mở.", image: muaCaveImage, mapQuery: "Chùa Bái Đính Ninh Bình" },
  { name: "Vườn chim Thung Nham", area: "Ninh Hải", category: "Sinh thái", description: "Khám phá hang động và vùng sinh thái ngập nước xanh mát.", image: trangAnImage, mapQuery: "Thung Nham Ninh Bình" },
  { name: "Đầm Vân Long", area: "Gia Viễn", category: "Thiên nhiên", description: "Vùng đất ngập nước yên ả nép dưới chân những vách núi.", image: trangAnImage, mapQuery: "Đầm Vân Long Ninh Bình" },
  { name: "Tuyệt Tình Cốc", area: "Trường Yên", category: "Check-in", description: "Hồ nước xanh nằm gọn giữa những vách núi đá vôi.", image: muaCaveImage, mapQuery: "Động Am Tiên Ninh Bình" },
  { name: "Vườn quốc gia Cúc Phương", area: "Nho Quan", category: "Sinh thái", description: "Rừng nguyên sinh với những cung đường đi bộ dưới tán cây.", image: trangAnImage, mapQuery: "Vườn quốc gia Cúc Phương" },
  { name: "Thung Nắng", area: "Ninh Hải", category: "Thiên nhiên", description: "Một chuyến thuyền nhẹ nhàng giữa đồng nước và vách núi.", image: trangAnImage, mapQuery: "Thung Nắng Ninh Bình" },
  { name: "Đền vua Đinh Tiên Hoàng", area: "Trường Yên", category: "Văn hóa", description: "Ngôi đền cổ lưu giữ câu chuyện về vị vua đầu triều Đinh.", image: muaCaveImage, mapQuery: "Đền vua Đinh Tiên Hoàng Ninh Bình" },
  { name: "Đền vua Lê Đại Hành", area: "Trường Yên", category: "Văn hóa", description: "Không gian kiến trúc cổ kính trong vùng đất cố đô.", image: muaCaveImage, mapQuery: "Đền vua Lê Đại Hành Ninh Bình" },
  { name: "Nhà thờ đá Phát Diệm", area: "Kim Sơn", category: "Văn hóa", description: "Công trình đá độc đáo giao thoa kiến trúc Việt và phương Tây.", image: muaCaveImage, mapQuery: "Nhà thờ đá Phát Diệm" },
  { name: "Hồ Đồng Chương", area: "Nho Quan", category: "Thiên nhiên", description: "Hồ nước tĩnh lặng được bao quanh bởi rừng thông xanh.", image: trangAnImage, mapQuery: "Hồ Đồng Chương Ninh Bình" },
  { name: "Khu bảo tồn đất ngập nước Vân Long", area: "Gia Viễn", category: "Sinh thái", description: "Lênh đênh trên mặt nước phẳng lặng giữa thiên nhiên hoang sơ.", image: trangAnImage, mapQuery: "Khu bảo tồn Vân Long Ninh Bình" },
  { name: "Động Thiên Hà", area: "Sơn Hà", category: "Thiên nhiên", description: "Khám phá hang động nằm ẩn mình trong dãy núi Tướng.", image: muaCaveImage, mapQuery: "Động Thiên Hà Ninh Bình" },
  { name: "Đan viện Châu Sơn", area: "Phú Sơn", category: "Văn hóa", description: "Kiến trúc gạch đỏ yên tĩnh giữa khung cảnh làng quê.", image: muaCaveImage, mapQuery: "Đan viện Châu Sơn Ninh Bình" },
  { name: "Động Am Tiên", area: "Trường Yên", category: "Check-in", description: "Thung lũng khép kín với hồ nước và những vách núi cao.", image: muaCaveImage, mapQuery: "Động Am Tiên Ninh Bình" },
  { name: "Khu du lịch sinh thái Tràng An", area: "Hoa Lư", category: "Sinh thái", description: "Ghé thăm các tuyến hang và điểm dừng chân trên sông.", image: trangAnImage, mapQuery: "Khu du lịch sinh thái Tràng An" },
  { name: "Chùa Bích Động", area: "Ninh Hải", category: "Tâm linh", description: "Ngôi chùa cổ nép theo triền núi giữa không gian tĩnh lặng.", image: muaCaveImage, mapQuery: "Chùa Bích Động Ninh Bình" },
];

export const localFoods = [
  { name: "Dê núi Ninh Bình", note: "Thử cùng cơm cháy, rau rừng và nước chấm địa phương.", image: localFoodImage },
  { name: "Cơm cháy", note: "Lớp cơm vàng giòn, thường dùng kèm nước sốt đậm đà.", image: localFoodImage },
  { name: "Ốc núi", note: "Đặc sản theo mùa, thường được chế biến cùng sả và lá thơm.", image: localFoodImage },
  { name: "Miến lươn", note: "Món ăn địa phương dân dã, thích hợp cho bữa sáng.", image: localFoodImage },
];

export const itineraries = [
  { title: "Một ngày giữa non nước", duration: "1 ngày", stops: ["Tràng An", "Hang Múa", "Thưởng thức đặc sản địa phương"], detail: "Bắt đầu trên sông ở Tràng An, dành buổi chiều cho Hang Múa và khép lại bằng một bữa ăn mang hương vị Ninh Bình." },
  { title: "Ninh Bình thong thả", duration: "2 ngày 1 đêm", stops: ["Cố đô Hoa Lư", "Tràng An", "Tam Cốc", "Hang Múa"], detail: "Kết hợp một ngày khám phá di sản và một ngày đi thuyền, đạp xe quanh vùng Tam Cốc." },
  { title: "Theo dấu thiên nhiên", duration: "2 ngày", stops: ["Đầm Vân Long", "Thung Nham", "Cúc Phương"], detail: "Một gợi ý dành cho người yêu vùng đất ngập nước, rừng xanh và những cung đường ngoài trời." },
  { title: "Một vòng cố đô", duration: "1 ngày", stops: ["Cố đô Hoa Lư", "Đền vua Đinh", "Đền vua Lê", "Chùa Bái Đính"], detail: "Dành thời gian tìm hiểu dấu tích kinh đô xưa và các điểm đến văn hóa, tâm linh quanh Hoa Lư." },
];