/**
 * Dữ liệu hành trình "Tham Quan Ảo" (Virtual Tours) NinhBinhTravel
 * Tọa độ, độ cao zoom, lời thuyết minh văn hóa và âm thanh môi trường tương ứng.
 */

export type TourStop = {
  placeId: string;
  title: string;
  text: string; // Lời thuyết minh truyền cảm hứng
  photo: string;
  narration?: string; // Đường dẫn file mp3 hoặc giọng đọc
  ambience?: "water-chime" | "temple-bell" | "bird-forest" | "mountain-breeze";
  zoom: number;
  dwellSec: number; // Thời gian dừng ngắm mặc định (giây)
  lat: number;
  lng: number;
  badge?: string;
  didYouKnow?: string;
};

export type Tour = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  stops: TourStop[];
};

export const TOURS: Tour[] = [
  {
    id: "heritage-tour",
    title: "Di Sản & Cố Đô (2N1Đ)",
    subtitle: "Chuyến bay kỳ vĩ qua trái tim Quần thể Di sản Thế giới UNESCO",
    duration: "6 điểm dừng · Trải nghiệm 2N1Đ",
    description:
      "Hành trình bay camera dẫn lối từ đại cổ tự Bái Đính, thung nước Tràng An, kinh thành Hoa Lư nghìn năm, sông lúa Tam Cốc đến đỉnh Ngọa Long Sơn lộng gió.",
    stops: [
      {
        placeId: "bai-dinh",
        title: "Quần thể Chùa Bái Đính",
        text: "Khởi đầu từ chân núi Đính linh thiêng, tiếng chuông đồng 36 tấn vang vọng qua hành lang 500 vị La Hán đá xanh, mở ra không gian thiền định bao la giữa đại ngàn.",
        photo: "/images/05-bai-dinh/bai-dinh-01-toan-canh-chua.webp",
        ambience: "temple-bell",
        zoom: 15,
        dwellSec: 10,
        lat: 20.2683,
        lng: 105.8572,
        badge: "Kỷ lục Phật giáo",
        didYouKnow: "Bảo tháp Bái Đính cao 100m, nơi tôn trí xá lợi Phật nghìn năm được rước từ Ấn Độ và Myanmar.",
      },
      {
        placeId: "trang-an",
        title: "Quần thể danh thắng Tràng An",
        text: "Camera hạ cánh xuống bến thuyền nan Tràng An. Mái chèo khẽ khua làn nước trong vắt, lướt qua hang Địa Linh, Nấu Rượu và Hành cung Vũ Lâm cổ kính giữa thung lũng đá ngọc bích.",
        photo: "/images/02-trang-an/trang-an-01-thuyen-xuyen-hang.webp",
        ambience: "water-chime",
        zoom: 15.5,
        dwellSec: 12,
        lat: 20.2562,
        lng: 105.9038,
        badge: "Di sản Thế giới UNESCO",
        didYouKnow: "Tràng An là di sản thế giới hỗn hợp đầu tiên của Đông Nam Á, dung hòa trọn vẹn cả tiêu chí văn hóa và thiên nhiên.",
      },
      {
        placeId: "hoa-lu",
        title: "Cố đô Hoa Lư ngàn năm",
        text: "Kinh đô của nhà nước phong kiến độc lập Đại Cồ Việt thế kỷ thứ X. Đền vua Đinh, đền vua Lê đứng uy nghiêm trước núi Mã Yên, ghi dấu thời khắc định hình giang sơn bờ cõi.",
        photo: "/images/06-hoa-lu/hoa-lu-01-cong-co-do.webp",
        ambience: "temple-bell",
        zoom: 15,
        dwellSec: 10,
        lat: 20.2833,
        lng: 105.9042,
        badge: "Kinh đô Đại Cồ Việt",
        didYouKnow: "Núi Mã Yên mang hình yên ngựa, nơi an nghỉ của Hoàng đế Đinh Tiên Hoàng nhìn bao quát trọn kinh thành cổ.",
      },
      {
        placeId: "tam-coc",
        title: "Tam Cốc bên dòng Ngô Đồng",
        text: "Dòng Ngô Đồng uốn lượn như dải lụa vàng giữa hai vách đá vôi sừng sững. Thuyền nan trôi nhẹ xuyên qua Hang Cả, Hang Hai, Hang Ba trong hương lúa chín ngào ngạt đầu hè.",
        photo: "/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp",
        ambience: "water-chime",
        zoom: 15.2,
        dwellSec: 10,
        lat: 20.2198,
        lng: 105.9392,
        badge: "Vịnh Hạ Long trên cạn",
        didYouKnow: "Người chèo đò Tam Cốc có kỹ năng chèo thuyền bằng hai bàn chân độc đáo, vừa dẻo dai vừa khéo léo.",
      },
      {
        placeId: "hang-mua",
        title: "Đỉnh Ngọa Long Sơn – Hang Múa",
        text: "Chinh phục 486 bậc thang đá trắng tựa Vạn Lý Trường Thành thu nhỏ. Tượng rồng đá sừng sững trên đỉnh núi đón hoàng hôn rực rỡ, thu trọn sông Ngô Đồng vào tầm mắt 360 độ.",
        photo: "/images/04-hang-mua/hang-mua-01-tuong-rong-dinh-nui.webp",
        ambience: "mountain-breeze",
        zoom: 16,
        dwellSec: 12,
        lat: 20.2312,
        lng: 105.9419,
        badge: "Góc nhìn 360° Đỉnh Cao",
        didYouKnow: "Tương truyền vua Trần Thái Tông thường đến đây nghe các cung nữ múa hát nên ngọn núi mới có tên gọi là Hang Múa.",
      },
      {
        placeId: "thung-nham",
        title: "Vườn chim Thung Nham hoàng hôn",
        text: "Điểm dừng chân an lành khi hoàng hôn buông xuống. Từng đàn cò trắng, vạc, hạc hàng ngàn con chao liệng rợp trời trở về tổ ấm giữa rừng ngập nước nguyên sơ.",
        photo: "/images/07-thung-nham-van-long/thung-nham-01-dan-chim-bay.webp",
        ambience: "bird-forest",
        zoom: 15,
        dwellSec: 10,
        lat: 20.1986,
        lng: 105.9228,
        badge: "Thánh địa chim di trú",
        didYouKnow: "Thung Nham bảo tồn hơn 46 loài chim quý hiếm, trong đó có chim Phượng Hoàng (Hồng Hoàng) nằm trong Sách Đỏ Việt Nam.",
      },
    ],
  },
  {
    id: "tam-coc-day-trip",
    title: "Một Ngày ở Tam Cốc – Bích Động",
    subtitle: "Dạo bước giữa thung lũng đá, chùa cổ ngàn năm và đền đá xanh",
    duration: "4 điểm dừng · Trải nghiệm 1 Ngày",
    description:
      "Hành trình trọn vẹn khám phá bến thuyền Tam Cốc, đền thờ vua Trần Thái Vi, cổ tự Bích Động ba tầng vách núi và ngắm thung lũng từ đỉnh Hang Múa.",
    stops: [
      {
        placeId: "tam-coc",
        title: "Bến thuyền Tam Cốc",
        text: "Buổi sớm mai trên dòng Ngô Đồng tĩnh lặng, sương mờ bảng lảng vương trên ngọn cỏ lau và vách núi đá vôi.",
        photo: "/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp",
        ambience: "water-chime",
        zoom: 15.5,
        dwellSec: 10,
        lat: 20.2198,
        lng: 105.9392,
        badge: "Bến sông Ngô Đồng",
      },
      {
        placeId: "den-thai-vi",
        title: "Đền Thái Vi – Hành cung Vũ Lâm",
        text: "Men theo con đường làng Văn Lâm rợp bóng lúa vào đền Thái Vi, nơi các cột đá xanh nghìn năm chạm trổ rồng mây tinh tế thời nhà Trần.",
        photo: "/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp",
        ambience: "temple-bell",
        zoom: 16,
        dwellSec: 9,
        lat: 20.2248,
        lng: 105.9312,
        badge: "Di tích lịch sử nhà Trần",
      },
      {
        placeId: "chua-bich-dong",
        title: "Chùa Bích Động",
        text: "Nam thiên đệ nhị động với cây cầu đá rêu phong soi bóng hồ sen. Ba tầng chùa Hạ, Trung, Thượng hòa lẫn hoàn hảo vào vách đá tự nhiên.",
        photo: "/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp",
        ambience: "temple-bell",
        zoom: 16.2,
        dwellSec: 10,
        lat: 20.2185,
        lng: 105.9182,
        badge: "Cổ tự 3 tầng vách núi",
      },
      {
        placeId: "hang-mua",
        title: "Hang Múa & Đầm sen",
        text: "Kết thúc ngày dài bằng bước chân leo đỉnh núi Ngọa Long đón ráng chiều buông xuống thung lũng đá Tam Cốc huyền hoặc.",
        photo: "/images/04-hang-mua/hang-mua-01-tuong-rong-dinh-nui.webp",
        ambience: "mountain-breeze",
        zoom: 16,
        dwellSec: 12,
        lat: 20.2312,
        lng: 105.9419,
        badge: "Hoàng hôn cố đô",
      },
    ],
  },
];
