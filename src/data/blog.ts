export type BlogPillar =
  | "di-san"
  | "le-hoi"
  | "am-thuc-lang-nghe"
  | "cam-nang"
  | "ninh-binh-moi";

export interface BlogPillarMeta {
  id: BlogPillar;
  name: string;
  tagline: string;
  color: string;
}

export const BLOG_PILLARS: Record<BlogPillar, BlogPillarMeta> = {
  "di-san": {
    id: "di-san",
    name: "Kể chuyện di sản",
    tagline: "Lịch sử, truyền thuyết và tuyệt tác kiến trúc ngàn năm",
    color: "#244B3B",
  },
  "le-hoi": {
    id: "le-hoi",
    name: "Lễ hội & phong tục",
    tagline: "Nhịp sống tâm linh, phong tục cổ truyền theo vòng thời gian",
    color: "#D6AD72",
  },
  "am-thuc-lang-nghe": {
    id: "am-thuc-lang-nghe",
    name: "Ẩm thực & làng nghề",
    tagline: "Mỹ vị non nước và đôi bàn tay tài hoa của người thợ bản địa",
    color: "#9C413D",
  },
  "cam-nang": {
    id: "cam-nang",
    name: "Cẩm nang thực tế",
    tagline: "Kinh nghiệm thực địa, thời điểm vàng và văn hóa ứng xử văn minh",
    color: "#769477",
  },
  "ninh-binh-moi": {
    id: "ninh-binh-moi",
    name: "Ninh Bình mới",
    tagline: "Kết nối không gian văn hóa ba vùng sau sáp nhập 2025",
    color: "#3B5A6F",
  },
};

export interface BlogStorySection {
  subheading: string;
  paragraphs: string[];
  quote?: string;
  image?: {
    src: string;
    alt: string;
    caption: string;
    credit: string;
  };
}

export interface BlogInternalLink {
  title: string;
  url: string;
  description: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  metaDescription: string;
  pillar: BlogPillar;
  pillarLabel: string;
  publishDate: string;
  scheduledMonth: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageCredit: string;
  excerpt: string;
  tags: string[];
  openingScene: string;
  mainStory: BlogStorySection[];
  travelGuide: {
    bestTime: string;
    etiquette: string;
    tips: string[];
    note: string;
  };
  internalLinks: BlogInternalLink[];
  references: string[];
  isFeatured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "phat-diem-mua-giang-sinh",
    title: "Phát Diệm mùa Giáng sinh: nhà thờ đá nơi đình chùa gặp thánh đường",
    metaDescription: "Khám phá nét kiến trúc giao thoa Đông – Tây độc nhất vô nhị tại Nhà thờ đá Phát Diệm trong không khí thiêng liêng mùa lễ Giáng sinh Kim Sơn.",
    pillar: "di-san",
    pillarLabel: "Kể chuyện di sản",
    publishDate: "Tháng 12/2026",
    scheduledMonth: "12/2026",
    readTime: "6 phút đọc",
    isFeatured: true,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Biên khảo di sản kiến trúc",
    },
    featuredImage: "/images/09-phat-diem-kim-son/phat-diem-01-nha-tho-da.webp",
    featuredImageAlt: "Toàn cảnh Phương Đình và tháp mái cong Nhà thờ đá Phát Diệm",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Giữa miền đất bãi bồi ven biển Kim Sơn, tiếng chuông đồng 1,4 tấn ngân vang qua những tầng mái ngói mũi hài cong vút, mở ra một bản hòa âm kỳ diệu giữa văn hóa đình chùa Á Đông và thánh đường Công giáo.",
    tags: ["Nhà thờ đá", "Phát Diệm", "Kim Sơn", "Giáng sinh", "Kiến trúc Á Đông", "Cụ Sáu"],
    openingScene: "Đêm mùa đông ven biển Kim Sơn buông xuống với làn gió lạnh thổi từ cửa sông Đáy. Trước mặt chúng tôi không phải một chóp nhọn Gothic vươn thẳng lên trời theo lối phương Tây thường thấy, mà là Phương Đình ba tầng mái cong mũi thuyền, tựa như cửa Khổng sân Trình hay một góc chùa cổ Bắc Bộ. Dưới ánh đèn vàng rực mùa lễ Giáng sinh, từng khối đá xanh nguyên khối và hàng cột gỗ lim nghìn năm tuổi trầm mặc tỏa ra vẻ đẹp uy nghiêm tĩnh tại.",
    mainStory: [
      {
        subheading: "Hành trình 24 năm đục đá, kéo lim của Cụ Sáu",
        paragraphs: [
          "Khởi dựng từ năm 1875 và hoàn thành trọn vẹn vào năm 1898, quần thể Nhà thờ chính tòa Phát Diệm là công trình cả đời của linh mục Phêrô Trần Lục (thường được người dân trìu mến gọi là Cụ Sáu). Vào cuối thế kỷ 19, vùng đất Kim Sơn vẫn còn là đồng lầy phù sa ngập mặn. Để xây dựng một thánh đường đá nặng hàng chục nghìn tấn trên nền đất yếu, Cụ Sáu đã cho đóng hàng triệu cọc tre, gỗ lim sâu xuống lòng đất, tạo nên một mạng lưới móng nổi kiên cố trước khi đặt những phiến đá đầu tiên.",
          "Hàng nghìn mét khối đá xanh được khai thác thủ công từ núi Nhồi (Thanh Hóa) và núi Thiện Dưỡng (Ninh Bình), kết hợp với những thân gỗ lim cổ thụ ngút ngàn từ rừng Nghệ An, Hà Tĩnh bè mảng theo đường sông biển về bến Kim Sơn. Không hề có máy móc hiện đại, tất cả được vận chuyển bằng sức người và bè mảng trên con nước triều lên.",
        ],
        quote: "Nhà thờ Phát Diệm không áp đặt một hình thức kiến trúc ngoại lai lên cảnh quan Việt, mà mượn chính hồn cốt đình chùa dân tộc để đón nhận một đức tin mới.",
      },
      {
        subheading: "Phương Đình và trái tim bằng đá xanh nguyên khối",
        paragraphs: [
          "Điểm nhấn độc nhất vô nhị của quần thể là Phương Đình cao 25 m. Tầng dưới xây bằng đá phiến lớn, giữa có sập đá nguyên khối từng là nơi hội họp quan viên. Tầng hai treo trống cái bằng da trâu khổng lồ. Tầng ba treo quả đại hồng chuông bằng đồng nặng 1,4 tấn đúc năm 1890, tiếng vang xa tới ba huyện lân cận.",
          "Phía sau Phương Đình là Nhà thờ Lớn dài 74 m với 6 hàng cột gỗ lim nguyên thân (chu vi hơn 2,3 m) nâng đỡ hệ vì kèo chồng rường truyền thống. Đặc biệt nhất là 'Nhà thờ Trái Tim Vô Nhiễm Đức Mẹ' (thường gọi là Nhà thờ Đá Nhỏ) — từ nền, cột, xà, chấn song cho đến bàn thờ đều chạm khắc hoàn toàn từ đá xanh nguyên khối, phủ đầy họa tiết hoa sen, tùng cúc trúc mai và rồng phượng tinh xảo mang đậm tinh thần Việt Nam.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Tháng 12 (đặc biệt đêm 24/12 Giáng sinh với hàng vạn ánh đèn và hang đá lung linh) hoặc các ngày lễ đầu xuân.",
      etiquette: "Trang phục lịch sự kín đáo nơi tôn nghiêm. Giữ yên tĩnh khi đi lại trong thánh đường, đặc biệt khi giáo xứ đang cử hành phụng vụ thánh lễ.",
      tips: [
        "Nên đến vào khoảng 14:30 – 16:30 để chiêm ngưỡng ánh nắng chiều rọi qua các chấn song đá của Phương Đình.",
        "Kết hợp thưởng thức đặc sản bún mọc Tố Như và mua rượu nếp men lá Kim Sơn làm quà lưu niệm.",
      ],
      note: "Nhà thờ đá Phát Diệm mở cửa đón khách tham quan miễn phí tất cả các ngày trong tuần. Giờ giấc tham quan nội điện có thể linh hoạt theo lịch lễ của giáo xứ.",
    },
    internalLinks: [
      {
        title: "Quần thể Nhà thờ đá Phát Diệm",
        url: "/#diem-den",
        description: "Thông tin chi tiết tọa độ và hướng dẫn di chuyển từ trung tâm TP Ninh Bình.",
      },
      {
        title: "Bún mọc Tố Như & Ẩm thực Kim Sơn",
        url: "/#am-thuc",
        description: "Khám phá món bún sợi rời chấm nước dùng mọc thơm ngọt nức tiếng.",
      },
      {
        title: "Lịch trình 3 ngày 2 đêm cố đô",
        url: "/#lich-trinh",
        description: "Kết nối tuyến Tràng An – Tam Cốc – Phát Diệm trọn vẹn non nước.",
      },
    ],
    references: [
      "Hồ sơ tư liệu Di tích Lịch sử – Văn hóa Quốc gia Quần thể Nhà thờ đá Phát Diệm (Bộ Văn hóa, Thể thao và Du lịch).",
      "Kỷ yếu Hội thảo Khoa học 'Linh mục Trần Lục và công trình kiến trúc tôn giáo Phát Diệm', Viện Kiến trúc Quốc gia.",
      "Cẩm nang Di sản Văn hóa Ninh Bình, Sở Du lịch tỉnh Ninh Bình.",
    ],
  },
  {
    id: 2,
    slug: "mot-ngay-an-gi-o-ninh-binh",
    title: "Một ngày ăn gì ở Ninh Bình: bản đồ hương vị từ sáng sớm đến đêm muộn",
    metaDescription: "Cẩm nang ẩm thực một ngày trọn vẹn tại Ninh Bình: bún mọc sáng mai, thịt dê núi cơm cháy trưa hè và ốc núi ấm nồng bên sông chiều muộn.",
    pillar: "am-thuc-lang-nghe",
    pillarLabel: "Ẩm thực & làng nghề",
    publishDate: "Tháng 12/2026",
    scheduledMonth: "12/2026",
    readTime: "5 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Chuyên mục Văn hóa Ẩm thực",
    },
    featuredImage: "/images/12-dac-san-am-thuc/am-thuc-01-de-nui-tai-chanh.webp",
    featuredImageAlt: "Đĩa thịt dê núi tái chanh Ninh Bình rắc vừng ăn kèm lá mơ chuối chát",
    featuredImageCredit: "NinhBinhTravel Media Collection",
    excerpt: "Không chỉ có dê núi và cơm cháy, ẩm thực Ninh Bình là sự hòa quyện tinh tế giữa sản vật rừng đá vôi và đồng bằng trũng nước châu thổ sông Hồng.",
    tags: ["Ẩm thực Ninh Bình", "Dê núi", "Cơm cháy", "Bún mọc", "Ốc núi", "Ăn gì ở Ninh Bình"],
    openingScene: "Sương sớm còn giăng mờ trên mặt nước sông Vân, hơi nước bốc lên từ những nồi nước dùng ninh xương heo thơm mùi hành nướng góc phố cổ. Tại Ninh Bình, một ngày khám phá không bao giờ bắt đầu vội vã. Người bản địa thưởng thức buổi sáng bằng sự thong dong, vị ngọt thanh của nước dùng bún mọc và ngụm trà xanh ấm bụng.",
    mainStory: [
      {
        subheading: "Buổi sáng: Thức giấc cùng bún mọc sợi rời",
        paragraphs: [
          "Khác với bún mọc Hà Nội nơi mọc được thả chung vào bát bún đầy nước, bún mọc truyền thống gốc Kim Sơn được dọn riêng ra đĩa nhỏ. Sợi bún trắng muốt, dẻo dai làm từ gạo tẻ đồng chiêm. Bên cạnh là bát nước dùng trong veo, điểm xuyết những viên mọc giã tay giòn sần sật nấm hương mộc nhĩ, thơm tiêu sọ và hành hoa.",
          "Gắp một đũa bún trắng, nhúng vào bát nước dùng nóng rẫy, thêm cọng rau kinh giới và lát ớt tươi — vị ngọt sâu lắng của xương hầm đánh thức mọi giác quan sau giấc ngủ dài.",
        ],
      },
      {
        subheading: "Buổi trưa: Bản giao hưởng dê núi và cơm cháy xì xèo",
        paragraphs: [
          "Trưa đến, sau chuyến thuyền nan Tràng An hay leo bậc đá Hang Múa, cơ thể cần được nạp lại năng lượng dồi dào. Món dê núi Ninh Bình nổi tiếng nhờ những đàn dê leo trèo vách đá tai mèo, ăn các loại lá thuốc rừng ngải cứu, giảo cổ lam, bách bộ.",
          "Món khai vị không gì hợp hơn Dê tái chanh: từng lát thịt dê chín tái thái mỏng tang, bóp nước cốt chanh tươi, gừng già, ớt chỉ thiên và lá chanh thái chỉ. Cuốn thịt trong lá sung non, lá mơ lông tím, thêm lát chuối xanh chát chát rồi chấm đẫm vào bát tương bần gừng ngọt hậu.",
          "Kế tiếp là đĩa Cơm cháy sốt dê nóng hổi: miếng cơm cháy nếp hương phồng xốp giòn rụm được rưới nước sốt tim cật xào nấm sánh quyện. Tiếng reo 'xèo xèo' trên bàn ăn chính là thanh âm ẩm thực đặc trưng nhất của đất cố đô.",
        ],
      },
      {
        subheading: "Chiều muộn & tối: Cá chuối nướng rơm và ốc núi đá vôi",
        paragraphs: [
          "Khi hoàng hôn ngả tím trên đỉnh Ngọa Long, bữa tối đưa du khách về với phong vị mộc mạc của đầm nước Vân Long. Cá chuối đầm tự nhiên nướng trui trong rơm rạ giữ nguyên lớp da cháy xém thơm lừng và thớ thịt trắng ngần ngọt lịm.",
          "Vào những ngày đầu mùa mưa, món ốc núi đá vôi luộc sả gừng chấm mắm gừng ớt là thức nhắm tuyệt hảo bên chén rượu nếp cái hoa vàng Kim Sơn ấm sực lòng bàn tay.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mọi mùa trong năm. Mùa mưa (tháng 4 – 8) là thời điểm duy nhất có ốc núi đá tươi sống.",
      etiquette: "Nên hỏi trước khẩu phần để tránh gọi quá nhiều món dê cùng lúc. Ăn chín uống sôi và thử tương bần với lượng vừa phải nếu bụng yếu.",
      tips: [
        "Nên chọn các quán ăn tập trung tại khu vực Trường Yên, bến thuyền Tam Cốc hoặc trung tâm TP Ninh Bình.",
        "Tra cứu đánh giá mới nhất trên Google Maps theo cụm từ 'dê núi đặc sản Tràng An' để chọn quán có lượng khách địa phương đông đảo.",
      ],
      note: "Mức giá ẩm thực tại Ninh Bình rất đa dạng (bình dân từ 40.000đ/bát bún, tiệc dê từ 180.000 – 250.000đ/người). Hãy luôn tham khảo thực đơn niêm yết tại quán.",
    },
    internalLinks: [
      {
        title: "Đặc sản thịt dê núi cố đô",
        url: "/#am-thuc",
        description: "Tìm hiểu chi tiết các món dê núi 7 món và bí quyết làm tương bần gừng.",
      },
      {
        title: "Ước tính chi phí ăn uống",
        url: "/#len-ke-hoach",
        description: "Dự toán ngân sách ẩm thực theo 3 phân khúc: tiết kiệm, đặc sản và cao cấp.",
      },
    ],
    references: [
      "Kỷ lục Ẩm thực Châu Á dành cho Cơm cháy Ninh Bình (Tổ chức Kỷ lục Châu Á, 2012).",
      "Top 50 món ăn đặc sản nổi tiếng Việt Nam (Tổ chức Kỷ lục Việt Nam - VietKings).",
    ],
  },
  {
    id: 3,
    slug: "trang-an-hay-tam-coc",
    title: "Tràng An hay Tam Cốc: nên chọn nơi nào cho chuyến đi đầu tiên?",
    metaDescription: "So sánh trải nghiệm ngồi thuyền giữa Tràng An và Tam Cốc: hang xuyên thủy kỳ vĩ hay dải lụa sông Ngô Đồng uốn lượn bên bờ lúa vàng.",
    pillar: "cam-nang",
    pillarLabel: "Cẩm nang thực tế",
    publishDate: "Tháng 12/2026",
    scheduledMonth: "12/2026",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Tư vấn trải nghiệm thực địa",
    },
    featuredImage: "/images/02-trang-an/trang-an-02-toan-canh-song-nui.webp",
    featuredImageAlt: "Cảnh sắc sông nước và núi đá vôi hùng vĩ tại Quần thể danh thắng Tràng An",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Cả hai đều là tuyệt tác thuyền nan trên miền di sản, nhưng một nơi đưa bạn xuyên qua lòng núi triệu năm, còn một nơi dẫn lối giữa cánh đồng lúa chín vàng óng ả.",
    tags: ["Tràng An", "Tam Cốc", "Thuyền nan", "So sánh", "Kinh nghiệm du lịch", "Cẩm nang"],
    openingScene: "Đứng trước ngã rẽ giữa Tràng An và Tam Cốc, rất nhiều du khách lần đầu đến Ninh Bình băn khoăn: nếu chỉ có nửa ngày, tôi nên chọn dòng sông nào? Câu trả lời không nằm ở chi phí hay khoảng cách, mà nằm ở cảm xúc và trải nghiệm thị giác mà tâm hồn bạn đang tìm kiếm.",
    mainStory: [
      {
        subheading: "Tràng An: Bản trường ca của hang ngầm và thung nước biệt lập",
        paragraphs: [
          "Tràng An là một quần thể thung nước khép kín nối thông bởi 48 hang xuyên thủy ngập nước. Khi chiếc thuyền nan lướt nhẹ dưới mái chèo, không gian xung quanh bạn hoàn toàn tách biệt khỏi nhịp sống hiện đại. Không có nhà cửa, không có đường xe chạy — chỉ có tiếng mái chèo khua nước bì bõm và tiếng chim rừng gọi bầy.",
          "Điểm đặc sắc nhất ở Tràng An là sự đa dạng của 3 tuyến thuyền. Bạn sẽ lần lượt chui qua những hang đá vôi tối mát lạnh dài hàng trăm mét như Hang Địa Linh, Hang Nấu Rượu, nơi đầu người gần chạm vào thạch nhũ rủ xuống lấp lánh; sau đó vỡ òa khi thuyền trôi ra một thung lũng nước xanh ngọc bích phẳng lặng in bóng đền đài cổ kính thời Trần.",
        ],
      },
      {
        subheading: "Tam Cốc: Nét duyên đồng quê bên dòng Ngô Đồng uốn lượn",
        paragraphs: [
          "Nếu Tràng An mang vẻ đẹp nguyên sinh kỳ vĩ, thì Tam Cốc lại mang vẻ đẹp thanh bình, gần gũi của làng quê Bắc Bộ. Dòng sông Ngô Đồng không chảy trong thung lũng khép kín mà uốn lượn mềm mại men theo chân núi và những thửa ruộng bậc bằng của người nông dân xã Ninh Hải.",
          "Hành trình Tam Cốc đưa bạn qua 3 hang tự nhiên (Hang Cả, Hang Hai, Hang Ba). Điều làm nên thương hiệu của Tam Cốc chính là đôi bờ sông: vào cuối tháng 5, đây là dải lụa vàng rực rỡ của mùa lúa chín thơm nức mũi. Đặc biệt, du khách còn được tận mắt chứng kiến kỹ thuật chèo thuyền bằng hai bàn chân độc đáo của các cô chú lái đò làng Văn Lâm — một hình ảnh đậm chất dân gian mộc mạc.",
        ],
      },
      {
        subheading: "Bảng tóm tắt để bạn dễ dàng lựa chọn",
        paragraphs: [
          "• Chọn Tràng An nếu bạn: Yêu thích sự kỳ bí của hang động ngập nước, muốn vãn cảnh các đền thờ tâm linh cổ thời Đinh – Trần, thích đi một vòng tròn khép kín không phải quay đầu lại bến cũ.",
          "• Chọn Tam Cốc nếu bạn: Đi vào mùa lúa chín vàng (cuối tháng 5 – tháng 6), muốn ngắm cảnh đồng quê gắn liền với đời sống sinh hoạt, thích kết hợp thuê xe đạp dạo quanh chùa Bích Động và đền Thái Vi rêu phong ngay sau chuyến đò.",
          "• Nếu có 2 ngày 1 đêm: Lời khuyên tuyệt vời nhất là hãy dành chiều ngày thứ nhất cho Tràng An và sáng ngày thứ hai cho Tam Cốc!",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Tràng An đẹp quanh năm (đặc biệt sáng sớm 07:30 hoặc chiều 14:30). Tam Cốc đẹp nhất vào mùa lúa chín tháng 5 – 6 và mùa thu tháng 9 – 10.",
      etiquette: "Luôn mặc áo phao cứu sinh đúng quy định khi thuyền rời bến. Tránh xả rác xuống dòng sông để giữ gìn dòng nước trong xanh cho di sản.",
      tips: [
        "Tại Tràng An, Tuyến 2 và Tuyến 3 là lựa chọn cân bằng nhất giữa số lượng hang và cảnh quan di tích Hành cung Vũ Lâm.",
        "Tại Tam Cốc, hãy mang theo nón lá hoặc ô che nắng vì hành trình sông Ngô Đồng hầu như không có bóng râm che phủ.",
      ],
      note: "Giá vé tham quan và vé đò tại cả hai khu du lịch đều được niêm yết công khai tại quầy vé chính thức. Vui lòng kiểm tra lại bảng giá trước khi mua vé.",
    },
    internalLinks: [
      {
        title: "Chi tiết Quần thể danh thắng Tràng An",
        url: "/#diem-den",
        description: "Khám phá 3 tuyến thuyền nan và các hang xuyên thủy Tràng An.",
      },
      {
        title: "Danh thắng Tam Cốc – Bích Động",
        url: "/#diem-den",
        description: "Chiêm ngưỡng sông Ngô Đồng và 'Nam thiên đệ nhị động'.",
      },
      {
        title: "Lịch trình 2 ngày 1 đêm trọn vẹn",
        url: "/#lich-trinh",
        description: "Kết hợp cả Tràng An và Tam Cốc trong hành trình tối ưu thời gian.",
      },
    ],
    references: [
      "Hồ sơ đệ trình UNESCO Quần thể danh thắng Tràng An (2014).",
      "Báo cáo đánh giá du lịch bền vững vùng đệm Tam Cốc, Ban Quản lý Di sản Tràng An.",
    ],
  },
  {
    id: 4,
    slug: "rong-vang-song-hoang-long",
    title: "Rồng vàng sông Hoàng Long và nghi lễ rước nước linh thiêng",
    metaDescription: "Tìm hiểu truyền thuyết rồng vàng chở Đinh Bộ Lĩnh qua sông Hoàng Long và nghi thức lấy nước thiêng nghìn năm trong lễ hội Cố đô Hoa Lư.",
    pillar: "le-hoi",
    pillarLabel: "Lễ hội & phong tục",
    publishDate: "Tháng 1/2027",
    scheduledMonth: "01/2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Nghiên cứu văn hóa dân gian",
    },
    featuredImage: "/images/06-co-do-hoa-lu/hoa-lu-03-le-hoi-truong-yen.webp",
    featuredImageAlt: "Đoàn rước thuyền rồng lấy nước thiêng trên dòng sông trong lễ hội Trường Yên",
    featuredImageCredit: "Sở Du lịch Ninh Bình",
    excerpt: "Từ huyền tích thuở ấu thơ cờ lau tập trận đến đoàn thuyền rồng rẽ sóng sông Hoàng Long lấy nước mộc dục bài vị tiên đế, nghi lễ rước nước là linh hồn của hội làng Trường Yên.",
    tags: ["Sông Hoàng Long", "Đinh Bộ Lĩnh", "Rước nước", "Lễ hội Hoa Lư", "Huyền tích", "Phong tục"],
    openingScene: "Sương sớm giăng mờ trên dòng sông Hoàng Long cuộn đỏ phù sa. Giữa lòng sông, một vòng tròn dây thừng đỏ kết hoa sen bồng bềnh neo lại điểm nước sâu và trong nhất. Tiếng trống khẩu rộn rã, tiếng tù và gióng lên từng hồi trầm hùng khi vị bồi tế áo thụng xanh kính cẩn múc từng gáo đồng nước mát đổ vào bình gốm bọc vải điều.",
    mainStory: [
      {
        subheading: "Huyền tích rồng vàng cõng chúa cờ lau",
        paragraphs: [
          "Sông Hoàng Long (sông Rồng Vàng) gắn chặt với tuổi thơ của Đinh Bộ Lĩnh. Dân gian truyền rằng, thuở nhỏ khi chăn trâu tập trận cờ lau ở thung Lau, Đinh Bộ Lĩnh mổ trâu của chú khao quân. Người chú cầm dao đuổi bắt, Bộ Lĩnh chạy đến bờ sông Hoàng Long cùng đường.",
          "Bỗng từ dưới lòng sông, hai con rồng vàng hiện lên rẽ sóng, cõng cậu bé sang bờ bên kia an toàn. Người chú nhìn thấy điềm lạ rồng thần hộ mệnh, kinh sợ cắm dao sụp lạy. Từ huyền tích ấy, dòng sông mang tên Hoàng Long, chứng nhân cho sự trỗi dậy của vị anh hùng thống nhất giang sơn.",
        ],
        quote: "Nước sông Hoàng Long không chỉ là dòng nước tự nhiên, mà là dòng chảy của ký ức lập quốc Đại Cồ Việt.",
      },
      {
        subheading: "Nghi thức rước nước mộc dục linh thiêng",
        paragraphs: [
          "Trong lễ hội Cố đô Hoa Lư (tháng 3 âm lịch), nghi thức rước nước là phần lễ quan trọng bậc nhất mở đầu hội làng. Đoàn rước xuất phát từ Đền vua Đinh Tiên Hoàng, rước kiệu bài vị ra bến sông, xuống thuyền rồng lướt ra giữa dòng.",
          "Nước được lấy từ giữa dòng Hoàng Long mang về đền để làm lễ mộc dục (lau rửa bài vị, tượng thờ của hai triều đại Đinh – Tiền Lê). Nghi thức này không chỉ cầu cho mưa thuận gió hòa, mùa màng tươi tốt, mà còn nhắc nhở con cháu đời sau nhớ ơn cội nguồn sông mẹ đã nuôi dưỡng bậc đế vương mở nền độc lập.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mùng 8 đến mùng 10 tháng 3 âm lịch hàng năm trong dịp diễn ra Lễ hội Cố đô Hoa Lư.",
      etiquette: "Giữ thái độ trang nghiêm, không chen lấn xô đẩy khu vực bến sông khi các bồi tế đang thực hiện nghi thức múc nước thiêng.",
      tips: [
        "Nên có mặt tại bến sông Hoàng Long từ 06:30 sáng để chọn vị trí quan sát đoàn rước thuyền rồng.",
        "Kết hợp ghé thăm Đền vua Đinh Tiên Hoàng và xem trò diễn cờ lau tập trận của các em thiếu nhi Trường Yên.",
      ],
      note: "Ngày lễ hội tính theo âm lịch nên ngày dương lịch sẽ thay đổi hàng năm. Du khách cần đối chiếu lịch chính thức trước khi lên đường.",
    },
    internalLinks: [
      {
        title: "Khu di tích lịch sử Cố Đô Hoa Lư",
        url: "/#diem-den",
        description: "Khám phá kiến trúc đền vua Đinh và sập đá long sàng thế kỷ 17.",
      },
      {
        title: "Bảng thời gian các lễ hội Ninh Bình",
        url: "/#cam-nang",
        description: "Theo dõi lịch tổ chức các lễ hội truyền thống lớn trong năm.",
      },
    ],
    references: [
      "Đại Việt Sử Ký Toàn Thư (Bản dịch Viện Khoa học Xã hội Việt Nam), Tập I, Kỷ Nhà Đinh.",
      "Địa chí Văn hóa Dân gian Ninh Bình, Hội Văn nghệ Dân gian Việt Nam.",
    ],
  },
  {
    id: 5,
    slug: "vi-sao-hoa-lu-kinh-do-da",
    title: "Vì sao Hoa Lư được gọi là \"kinh đô đá\": giải mã phòng tuyến quân sự hiểm trở",
    metaDescription: "Khám phá cấu trúc phòng thủ thiên nhiên của Cố đô Hoa Lư: núi làm thành, sông làm hào, tạo nên tòa thành đá bất khả xâm phạm thời Đinh – Lê.",
    pillar: "di-san",
    pillarLabel: "Kể chuyện di sản",
    publishDate: "Tháng 1/2027",
    scheduledMonth: "01/2027",
    readTime: "7 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Biên khảo lịch sử quân sự cổ",
    },
    featuredImage: "/images/06-co-do-hoa-lu/hoa-lu-01-den-vua-dinh.webp",
    featuredImageAlt: "Cổng đền vua Đinh Tiên Hoàng nép mình dưới chân các dãy núi đá vôi Hoa Lư",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Khác với thành lũy bằng đất hay gạch nung ở đồng bằng, Hoa Lư là một kiệt tác thành lũy tự nhiên: dựa vào những bức tường đá vôi dựng đứng hàng triệu năm tuổi.",
    tags: ["Cố đô Hoa Lư", "Kinh đô đá", "Đinh Tiên Hoàng", "Lịch sử Việt Nam", "Thành cổ", "Kiến trúc quân sự"],
    openingScene: "Đứng từ cổng thành Ngoại nhìn về dãy núi Mã Yên và dãy núi Cột Cờ, bạn sẽ thấy những bức tường đá dựng đứng sừng sững như vươn tận mây xanh. Năm 968, khi bước lên ngôi Hoàng đế sau khi dẹp loạn 12 sứ quân, Đinh Bộ Lĩnh không chọn đồng bằng Cổ Loa hay thành Đại La bằng phẳng, mà lui về thung lũng đá vôi này đặt quốc đô Đại Cồ Việt.",
    mainStory: [
      {
        subheading: "Tận dụng địa hình: Núi làm tường thành, sông làm chiến hào",
        paragraphs: [
          "Kinh thành Hoa Lư rộng khoảng 300 ha, bao gồm Thành Đông (Thành Ngoại) và Thành Tây (Thành Nội). Điểm kỳ tài của người xưa là không tốn sức xây những bức tường thành nhân tạo khổng lồ, mà triệt để lợi dụng các dãy núi đá vôi karst hiểm trở bao bọc khép kín.",
          "Những chỗ khe hở giữa hai ngọn núi mới được người thời Đinh đắp lũy đất, xếp đá hộc ken chặt và cắm cọc gỗ lim kiên cố tạo thành cổng thành. Dòng sông Hoàng Long và sông Sào Khê chảy quanh co tự nhiên trở thành những hào lũy thủy quân ngập nước, vừa phục vụ phòng ngự vừa là đường tiếp tế lương thảo bí mật.",
        ],
      },
      {
        subheading: "Bảo vật sập đá long sàng và dấu tích cung điện thế kỷ 10",
        paragraphs: [
          "Dấu ấn đá không chỉ nằm ở tường thành, mà hiện diện trong từng chi tiết cung điện. Trước bái đường Đền vua Đinh Tiên Hoàng ngày nay là sập đá long sàng bằng đá xanh nguyên khối chạm nổi rồng uy nghi thế kỷ 17 được công nhận là Bảo vật Quốc gia.",
          "Các đợt khai quật khảo cổ học tại Trường Yên đã phát lộ hàng vạn viên gạch 'Đại Việt quốc quân thành chuyên' in hoa văn hoa sen và những tảng đá chân cột chạm trổ tinh mỹ, minh chứng cho một kinh thành nguy nga từng ngự trị giữa thung lũng đá.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mùa thu hoặc mùa xuân dịu mát, thích hợp đi bộ dạo quanh các chân núi và đền đài.",
      etiquette: "Trang phục lịch sự khi vào đền thờ. Không leo trèo lên sập đá long sàng và các hiện vật đá cổ có rào chắn bảo vệ.",
      tips: [
        "Nên leo lên đồi Mã Yên viếng lăng mộ vua Đinh Tiên Hoàng để ngắm toàn cảnh thung lũng thành cổ từ trên cao.",
        "Thời lượng tham quan đền vua Đinh và đền vua Lê khoảng 1,5 giờ.",
      ],
      note: "Vé tham quan Cố Đô Hoa Lư được bán tại cổng vào di tích với mức giá tham khảo khoảng 20.000đ/người lớn.",
    },
    internalLinks: [
      {
        title: "Khu di tích lịch sử Cố Đô Hoa Lư",
        url: "/#diem-den",
        description: "Chi tiết kiến trúc đền vua Đinh, đền vua Lê và lăng Mã Yên.",
      },
      {
        title: "Tuyệt Tình Cốc (Động Am Tiên)",
        url: "/#diem-den",
        description: "Ghé thăm pháp trường đá cổ cách đền vua Đinh chỉ 1,8 km.",
      },
    ],
    references: [
      "Báo cáo Khai quật khảo cổ học Cố đô Hoa Lư (Viện Khảo cổ học Việt Nam).",
      "Đại Việt Sử Ký Toàn Thư, Kỷ Nhà Đinh và Nhà Tiền Lê.",
    ],
  },
  {
    id: 6,
    slug: "ve-ninh-binh-dau-nam-di-le",
    title: "Về Ninh Bình đầu năm: đền, chùa và cách đi lễ văn minh, an lạc",
    metaDescription: "Cẩm nang trẩy hội mùa xuân Ninh Bình: cung đường tâm linh Bái Đính – Hoa Lư – Duyên Ninh, trang phục và ứng xử văn minh nơi cửa thiền.",
    pillar: "cam-nang",
    pillarLabel: "Cẩm nang thực tế",
    publishDate: "Tháng 1/2027",
    scheduledMonth: "01/2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Tư vấn văn hóa & phong tục",
    },
    featuredImage: "/images/05-chua-bai-dinh/bai-dinh-01-bao-thap.webp",
    featuredImageAlt: "Bảo tháp 13 tầng sừng sững trong sương mờ mùa xuân tại Chùa Bái Đính",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Mùa xuân cố đô rộn rã bước chân khách hành hương. Đi lễ đầu năm không chỉ để cầu xin tài lộc, mà là chuyến trở về tìm sự tĩnh tại trong tâm hồn giữa non thiêng.",
    tags: ["Chùa Bái Đính", "Đi lễ đầu năm", "Chùa Duyên Ninh", "Cầu duyên", "Phong tục tết", "Cẩm nang tâm linh"],
    openingScene: "Mưa phùn lất phất bay trên những triền đồi hoa ban trắng nở muộn của sườn núi Đính. Khói hương trầm thoang thoảng quyện trong tiếng chuông đồng Bái Đính ngân nga giữa màn sương. Từng dòng người thong thả bước trên con đường đá dẫn vào cửa thiền, gác lại sau lưng những ồn ào lo toan của một năm cũ vừa qua.",
    mainStory: [
      {
        subheading: "Tam giác tâm linh: Bái Đính – Cố Đô – Duyên Ninh",
        paragraphs: [
          "Một cung đường đi lễ đầu năm trọn vẹn tại Ninh Bình thường kết hợp ba điểm đến đặc trưng: Chùa Bái Đính (cầu quốc thái dân an, sức khỏe và trí tuệ), Đền vua Đinh - vua Lê tại Cố Đô Hoa Lư (tri ân tiền nhân dựng nước), và Chùa Duyên Ninh (ngôi chùa cầu duyên, hòa hợp gia đạo nức tiếng nghìn năm).",
          "Tại Chùa Bái Đính, bên cạnh khu chùa mới tráng lệ, du khách không nên bỏ lỡ Bái Đính Cổ Tự nằm sâu trong hang đá trên núi, nơi Quốc sư Nguyễn Minh Không thời Lý từng lập đàn tu hành sắc thuốc cứu người.",
        ],
      },
      {
        subheading: "Quy tắc ứng xử và nghi thức đi lễ thanh tịnh",
        paragraphs: [
          "Đi lễ chùa cốt ở tâm thành. Người xưa có câu 'Phật tại tâm, lễ bạc lòng thành'. Hãy ưu tiên lễ chay hoa quả, trầu cau và nén hương thơm; hạn chế tối đa việc đốt vàng mã để bảo vệ môi trường trong lành nơi cửa Phật.",
          "Trang phục là yếu tố quan trọng: hãy chọn quần áo kín đáo, lịch sự, màu sắc nhã nhặn. Tránh đi dép lê trơn trượt hoặc mặc váy ngắn quá gối vào nội điện.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Từ mùng 6 tháng Giêng (khai hội Bái Đính) đến hết tháng 3 âm lịch.",
      etiquette: "Bỏ mũ nón, nói khẽ bước nhẹ khi vào chính điện. Không rải tiền lẻ lên tay tượng hay vách đá hang động.",
      tips: [
        "Khuôn viên Bái Đính rộng hơn 500 ha, hãy chuẩn bị giày thể thao êm chân và mua vé xe điện nếu có người lớn tuổi đi cùng.",
        "Nếu muốn tránh đông đúc, nên viếng chùa vào sáng sớm (07:00 – 08:30) hoặc các ngày trong tuần.",
      ],
      note: "Vào cửa khuôn viên chùa Bái Đính hoàn toàn miễn phí. Các dịch vụ xe điện và vé lên bảo tháp được niêm yết theo quy định của ban quản lý.",
    },
    internalLinks: [
      {
        title: "Quần thể Chùa Bái Đính",
        url: "/#diem-den",
        description: "Khám phá các kỷ lục Đông Nam Á và Bái Đính cổ tự nghìn năm tuổi.",
      },
      {
        title: "Chùa Duyên Ninh cầu duyên",
        url: "/#diem-den",
        description: "Tìm hiểu ngôi chùa cổ thời Đinh linh thiêng về tình duyên gia đạo.",
      },
    ],
    references: [
      "Quy chế Quản lý Di tích Lịch sử và Danh lam Thắng cảnh tỉnh Ninh Bình.",
      "Tập san Nghiên cứu Phật học, Giáo hội Phật giáo Việt Nam tỉnh Ninh Bình.",
    ],
  },
  {
    id: 7,
    slug: "mua-qua-gi-tu-ninh-binh",
    title: "Mua quà gì từ Ninh Bình: cẩm nang chọn đặc sản chuẩn vị và cách bảo quản",
    metaDescription: "Kinh nghiệm chọn mua quà đặc sản Ninh Bình trước Tết: cơm cháy chà bông giòn rụm, nem chua Yên Mạc lên men tự nhiên và mắm tép Gia Viễn.",
    pillar: "am-thuc-lang-nghe",
    pillarLabel: "Ẩm thực & làng nghề",
    publishDate: "Trước Tết Nguyên Đán",
    scheduledMonth: "Trước Tết",
    readTime: "5 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Góc Quà Tặng Đặc Sản",
    },
    featuredImage: "/images/12-dac-san-am-thuc/am-thuc-02-com-chay.webp",
    featuredImageAlt: "Gói cơm cháy chà bông đặc sản Ninh Bình vàng ươm giòn rụm",
    featuredImageCredit: "NinhBinhTravel Media Collection",
    excerpt: "Một gói cơm cháy nếp hương giòn rụm, một xâu nem chua Yên Mạc gói lá chuối thơm nồng hay vò rượu nếp Kim Sơn chính là gói trọn phong vị cố đô mang về làm quà sum vầy ngày Tết.",
    tags: ["Quà Ninh Bình", "Cơm cháy", "Nem Yên Mạc", "Rượu Kim Sơn", "Đặc sản làm quà", "Tết Nguyên Đán"],
    openingScene: "Những ngày giáp Tết, các quầy đặc sản dọc phố cổ Hoa Lư và bến xe Ninh Bình ngào ngạt mùi gạo nếp rang vàng và hương thơm nồng của lá chuối ủ men. Du khách tay xách nách mang những túi quà đượm phong vị đồng quê, hân hoan chuẩn bị cho chuyến xe trở về sum họp bên gia đình.",
    mainStory: [
      {
        subheading: "Top 4 món quà đặc sản nức tiếng cố đô",
        paragraphs: [
          "1. Cơm cháy chà bông: Món quà quốc dân dễ mua, dễ ăn và phù hợp mọi lứa tuổi. Nên chọn loại hạt gạo nếp tròn đều, lớp ruốc thịt bông tơi vàng ruộm, không bị bết dầu và có hạn sử dụng in dập rõ ràng trên bao bì hút chân không.",
          "2. Nem chua Yên Mạc: Món nem thủ công truyền thống thái thịt bằng tay (chứ không xay nhuyễn), trộn thính gạo rang vàng và ủ lên men tự nhiên cùng lá ổi. Vị chua thanh, dai giòn của sợi bì lợn cuốn lá sung chấm nước mắm tỏi ớt là mồi nhắm tuyệt đỉnh ngày Tết.",
          "3. Rượu nếp Kim Sơn: Chưng cất từ gạo nếp cái hoa vàng và men 36 vị thuốc bắc thảo mộc, nồng nàn êm dịu, ấm bụng trong bữa cơm sum họp đầu xuân.",
          "4. Mắm tép Gia Viễn: Tép riu béo mầm đánh bắt từ đầm nước ngọt Vân Long ủ muối và thính gạo, chưng thịt băm thơm nức mũi ăn cùng cơm trắng nóng hổi ngày đông.",
        ],
      },
      {
        subheading: "Mẹo bảo quản đặc sản mang đi xa",
        paragraphs: [
          "Cơm cháy cần được bọc kín tránh không khí ẩm để giữ độ giòn xốp suốt 2–3 tháng. Nem chua Yên Mạc sau khi mua về nếu chưa ăn ngay nên bảo quản trong ngăn mát tủ lạnh (dùng tốt nhất trong vòng 5–7 ngày).",
          "Rượu Kim Sơn nên bảo quản trong chum sành hoặc chai thủy tinh đậy kín nút lá chuối ở nơi râm mát, càng để lâu uống càng êm và đượm vị.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mọi dịp ghé thăm Ninh Bình, đặc biệt các tháng cận Tết Nguyên Đán.",
      etiquette: "Nên nếm thử trước khi mua số lượng lớn tại các cơ sở sản xuất uy tín. Kiểm tra kỹ tem mác và địa chỉ sản xuất.",
      tips: [
        "Tại khu vực TP Ninh Bình và Tràng An có nhiều cửa hàng đặc sản OCOP đạt chuẩn 3–4 sao của tỉnh.",
        "Mức giá tham khảo: Cơm cháy từ 35.000 – 60.000đ/gói; Nem Yên Mạc từ 60.000 – 80.000đ/xâu.",
      ],
      note: "Ứng dụng NinhBinhTravel không kinh doanh và không bán hàng trực tuyến. Du khách vui lòng mua sắm trực tiếp tại các cơ sở đặc sản địa phương.",
    },
    internalLinks: [
      {
        title: "Cơm cháy & Tinh hoa ẩm thực",
        url: "/#am-thuc",
        description: "Khám phá câu chuyện ra đời của món cơm cháy hơn 100 năm tuổi.",
      },
      {
        title: "Nem chua Yên Mạc truyền thống",
        url: "/#am-thuc",
        description: "Bí quyết thái thịt bằng tay và lá ổi lên men nem cung đình.",
      },
    ],
    references: [
      "Danh mục Sản phẩm OCOP tiêu biểu tỉnh Ninh Bình, Sở Nông nghiệp & PTNT.",
      "Kỷ lục Đặc sản Quà tặng Việt Nam (VietKings).",
    ],
  },
  {
    id: 8,
    slug: "dem-khai-an-den-tran",
    title: "Đêm khai ấn đền Trần và tục thức đêm đầu năm của người cố đô",
    metaDescription: "Trải nghiệm không khí linh thiêng đêm rằm tháng Giêng tại đền Trần: dòng người thức đêm xin lộc ấn và ước nguyện một năm hanh thông.",
    pillar: "le-hoi",
    pillarLabel: "Lễ hội & phong tục",
    publishDate: "Trước rằm tháng Giêng 2027",
    scheduledMonth: "Rằm tháng Giêng 2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Phóng sự lễ hội văn hóa",
    },
    featuredImage: "/images/06-co-do-hoa-lu/hoa-lu-02-den-vua-le.webp",
    featuredImageAlt: "Ánh nến lung linh trong đêm lễ hội tại đền đài di tích lịch sử triều Trần",
    featuredImageCredit: "NinhBinhTravel Media Collection",
    excerpt: "Khi chuông đồng điểm đúng nửa đêm rằm tháng Giêng, hàng vạn người lặng lẽ đón nhận lá lộc ấn đỏ tươi mang dòng chữ 'Tích Phúc Vô Cương', gửi gắm ước nguyện hướng thiện và bền chí.",
    tags: ["Đền Trần", "Khai ấn", "Lễ hội đầu năm", "Văn hóa triều Trần", "Nam Định", "Ninh Bình mới"],
    openingScene: "Đồng hồ điểm 23 giờ đêm 14 tháng Giêng. Gió xuân se sắt mang theo hơi sương ẩm ướt thổi qua những rặng tùng cổ thụ trăm tuổi. Hàng nghìn người đứng kín sân đền trong trật tự trang nghiêm, ánh nến lung linh soi rõ những gương mặt thành kính đang chờ đón thời khắc thiêng liêng khai ấn.",
    mainStory: [
      {
        subheading: "Ý nghĩa chân chính của lá ấn 'Tích Phúc Vô Cương'",
        paragraphs: [
          "Nghi thức Khai ấn đền Trần có nguồn gốc từ thời nhà Trần. Hàng năm vào ngày rằm tháng Giêng, triều đình tổ chức tế tự tổ tiên và khai ấn ấn chỉ để mở đầu cho các hoạt động hành chính của bộ máy nhà nước trong năm mới.",
          "Bốn chữ Hán khắc trên ấn tín triều Trần là 'Tích Phúc Vô Cương' (Tích lũy phúc đức vô lượng, không bao giờ cùng tận). Người xưa răn dạy: chiếc ấn không phải bùa hộ mệnh ban phát công danh thần tốc, mà là lời nhắc nhở mỗi người phải chăm lo tu nhân tích đức, làm việc thiện cho đời thì phúc lộc tự nhiên bền vững muôn đời.",
        ],
        quote: "Lộc ấn đền Trần không ban chức quyền bổng lộc, mà ban lời nhắc nhở tích đức hành thiện.",
      },
      {
        subheading: "Tục thức đêm đầu xuân và sự kết nối hai bờ sông Đáy",
        paragraphs: [
          "Tục thức đêm chờ xin ấn đầu năm đã trở thành nét sinh hoạt tâm linh quen thuộc của người dân vùng Nam Định và Ninh Bình. Khoảng cách giữa trung tâm TP Ninh Bình và Đền Trần Nam Định chỉ chừng 30 km theo Quốc lộ 10.",
          "Sau đêm thức trắng dâng hương đền Trần, sáng hôm sau du khách thường xuôi thuyền về lại Tràng An hoặc chùa Bái Đính viếng Phật, tạo thành cung đường văn hóa tâm linh trọn vẹn đầu năm của cả vùng hạ lưu sông Hồng.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Đêm ngày 14 rạng sáng ngày 15 tháng Giêng âm lịch (chính hội Khai ấn).",
      etiquette: "Xếp hàng văn minh, không chen lấn xô đẩy tranh cướp lộc ấn. Giữ gìn an ninh trật tự và tư trang cá nhân.",
      tips: [
        "Nên gửi xe từ sớm tại các bãi xe quy định của Ban tổ chức và đi bộ vào đền.",
        "Ấn đền Trần được Ban tổ chức phát liên tục suốt nhiều ngày sau rằm tháng Giêng, du khách không nhất thiết phải chen chúc xin ấn ngay trong đêm khai ấn.",
      ],
      note: "Thời gian và phương thức phát ấn hàng năm đều được Ban quản lý công bố chính thức trên các phương tiện truyền thông trước lễ hội.",
    },
    internalLinks: [
      {
        title: "Đền Thái Vi thờ các vua Trần",
        url: "/#diem-den",
        description: "Khám phá Hành cung Vũ Lâm và dấu ấn các vị vua triều Trần tại Ninh Bình.",
      },
      {
        title: "Lịch trình kết nối vùng Cố Đô",
        url: "/#lich-trinh",
        description: "Hành trình giao thoa văn hóa giữa Hoa Lư và các di tích triều Trần lân cận.",
      },
    ],
    references: [
      "Nghiên cứu Lễ hội Đền Trần và Tín ngưỡng Vương triều Trần, Viện Văn hóa Dân gian.",
      "Thông cáo Lễ hội Khai ấn Đền Trần của UBND thành phố Nam Định.",
    ],
  },
  {
    id: 9,
    slug: "phu-day-tin-nguong-tho-mau",
    title: "Phủ Dầy và tín ngưỡng thờ Mẫu Tam phủ: di sản văn hóa phi vật thể của nhân loại",
    metaDescription: "Khám phá Quần thể Phủ Dầy và nghệ thuật hát văn, hầu đồng trong Di sản Văn hóa Phi vật thể UNESCO 'Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt'.",
    pillar: "le-hoi",
    pillarLabel: "Lễ hội & phong tục",
    publishDate: "Tháng 2/2027",
    scheduledMonth: "02/2027",
    readTime: "7 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Nghiên cứu Di sản UNESCO",
    },
    featuredImage: "/images/06-co-do-hoa-lu/hoa-lu-03-le-hoi-truong-yen.webp",
    featuredImageAlt: "Không gian lễ hội truyền thống và tín ngưỡng thờ Mẫu dân gian",
    featuredImageCredit: "NinhBinhTravel Media Collection",
    excerpt: "Ngày 02/12/2016, UNESCO chính thức ghi danh 'Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt' là Di sản Văn hóa Phi vật thể đại diện của nhân loại, tôn vinh hình tượng người Mẹ che chở muôn loài.",
    tags: ["Phủ Dầy", "Thờ Mẫu Tam phủ", "UNESCO", "Hát văn", "Hầu đồng", "Ninh Bình mới"],
    openingScene: "Tiếng đàn nguyệt réo rắt cất lên hòa cùng nhịp phách giòn giã của người cung văn. Khói trầm hương bảng lảng quyện lấy sắc áo điều, áo lục rực rỡ của thanh đồng đang nhập bóng giá Quan Lớn, giá Chầu Bé. Tại Phủ Tiên Hương, không gian tín ngưỡng thờ Mẫu mở ra như một bức tranh sân khấu tâm linh sống động của người Việt.",
    mainStory: [
      {
        subheading: "Thánh Mẫu Liễu Hạnh và trung tâm tín ngưỡng Phủ Dầy",
        paragraphs: [
          "Nằm tại xã Kim Thái, huyện Vụ Bản (giáp ranh TP Ninh Bình chỉ 18 km), Quần thể Di tích Lịch sử – Văn hóa Phủ Dầy là trung tâm lớn nhất của tín ngưỡng thờ Thánh Mẫu Liễu Hạnh — một trong 'Tứ bất tử' của tín ngưỡng dân gian Việt Nam.",
          "Quần thể gồm gần 20 di tích đền phủ cổ kính, tiêu biểu là Phủ Tiên Hương (nơi Mẫu giáng sinh), Phủ Vân Cát và Lăng Mẫu Liễu Hạnh xây dựng hoàn toàn bằng đá xanh chạm khắc hoa sen trang nhã.",
        ],
      },
      {
        subheading: "Hát văn hầu đồng và hội Kéo chữ (Hoa trượng hội)",
        paragraphs: [
          "Nét đặc sắc nhất của Lễ hội Phủ Dầy (tháng 3 âm lịch) là nghệ thuật Hát văn hầu đồng và trò diễn Kéo chữ độc đáo. Hàng trăm trinh nữ, thanh niên cầm gậy hoa (trượng) kết thành các chữ Hán mang ý nghĩa cát tường như 'Mẫu Nghi Thiên Hạ', 'Quốc Thái Dân An', 'Thiên Hạ Thái Bình'.",
          "Tín ngưỡng thờ Mẫu không chỉ thể hiện ước vọng về mùa màng tươi tốt, gia đình hòa thuận, mà còn tôn vinh người phụ nữ Việt Nam thông qua hình tượng người Mẹ của muôn loài (Mẫu Thượng Thiên, Mẫu Thượng Ngàn, Mẫu Thoải).",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Tháng 3 âm lịch hàng năm (chính hội mùng 3 tháng 3 âm lịch).",
      etiquette: "Mặc trang phục lịch sự khi vào đền phủ. Tôn trọng nghi lễ hầu đồng, không chạm vào y phục và đạo cụ của thanh đồng khi đang hành lễ.",
      tips: [
        "Có thể dễ dàng kết hợp tham quan Tràng An – Bái Đính và ghé Phủ Dầy chỉ trong 30 phút lái xe.",
        "Thưởng thức đặc sản thịt bò thưng, bánh dày giò truyền thống của làng Vụ Bản.",
      ],
      note: "Lễ hội Phủ Dầy thu hút hàng chục vạn đồng bào khắp cả nước, du khách nên chủ động về phương tiện và tư trang cá nhân.",
    },
    internalLinks: [
      {
        title: "Khám phá Ninh Bình mở rộng",
        url: "/#cam-nang",
        description: "Tìm hiểu vị trí địa lý và cung đường di chuyển liên vùng giữa Ninh Bình và Nam Định.",
      },
      {
        title: "Bản đồ 20 danh thắng cố đô",
        url: "/#diem-den",
        description: "Tra cứu tọa độ và khoảng cách giữa các điểm tham quan văn hóa tâm linh.",
      },
    ],
    references: [
      "Hồ sơ đề cử UNESCO: Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt (UNESCO, ghi danh ngày 02/12/2016).",
      "Giáo sư Ngô Đức Thịnh, Tín ngưỡng thờ Mẫu ở Việt Nam, NXB Văn hóa Dân tộc.",
    ],
  },
  {
    id: 10,
    slug: "le-hoi-hoa-lu-nghi-thuc",
    title: "Lễ hội Hoa Lư từng nghi thức một: cẩm nang cho người lần đầu trẩy hội",
    metaDescription: "Tìm hiểu chi tiết các nghi thức cổ truyền trong Lễ hội Cố đô Hoa Lư: Lễ mở cửa đền, Rước nước sông Hoàng Long, Rước lửa và trò diễn cờ lau.",
    pillar: "le-hoi",
    pillarLabel: "Lễ hội & phong tục",
    publishDate: "Tháng 3/2027",
    scheduledMonth: "03/2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Nghiên cứu Lễ hội Cố đô",
    },
    featuredImage: "/images/06-co-do-hoa-lu/hoa-lu-03-le-hoi-truong-yen.webp",
    featuredImageAlt: "Đoàn kiệu rước rực rỡ cờ hoa tiến vào sân rồng đền vua Đinh Tiên Hoàng",
    featuredImageCredit: "Sở Du lịch Ninh Bình",
    excerpt: "Diễn ra từ mùng 8 đến mùng 10 tháng 3 âm lịch, Lễ hội Hoa Lư tái hiện hào khí dẹp loạn 12 sứ quân và mở ra bức tranh văn hóa dân gian rực rỡ sắc màu cố đô.",
    tags: ["Lễ hội Hoa Lư", "Hội Trường Yên", "Cờ lau tập trận", "Nghi thức rước nước", "Đinh Tiên Hoàng"],
    openingScene: "Đúng 7 giờ sáng ngày mùng 8 tháng 3 âm lịch, hồi trống hội Trường Yên vang rền khắp thung lũng đá Hoa Lư. Những lá cờ ngũ sắc bay phần phật trong gió xuân. Hàng nghìn người dân làng cổ Trường Yên trong trang phục áo the khăn xếp, đội hình tế lễ uy nghiêm tề tựu trước sân rồng Đền vua Đinh Tiên Hoàng.",
    mainStory: [
      {
        subheading: "Trình tự các nghi thức tế lễ cổ truyền",
        paragraphs: [
          "Lễ hội Cố đô Hoa Lư (trước đây gọi là Hội Trường Yên) có lịch sử nghìn năm từ thời nhà Lý dời đô. Trình tự nghi thức được gìn giữ nghiêm ngặt qua nhiều thế hệ:",
          "1. Lễ Mở cửa đền: Thực hiện lúc rạng sáng, xin phép thần linh và tiên đế cho mở hội làng.",
          "2. Lễ Rước nước: Đoàn thuyền rồng rước hũ gốm ra giữa dòng sông Hoàng Long lấy nước mộc dục bài vị.",
          "3. Lễ Dâng hương và Tế lễ: Đọc chúc văn ôn lại công đức dẹp loạn 12 sứ quân của Đinh Tiên Hoàng và chiến thắng phá Tống bình Chiêm của Lê Đại Hành.",
          "4. Lễ Thả rồng bay và thả đèn hoa đăng: Cầu nguyện quốc thái dân an, mùa màng bội thu.",
        ],
      },
      {
        subheading: "Phần hội dân gian sôi động và trò tập trận cờ lau",
        paragraphs: [
          "Điểm thu hút đông đảo du khách nhất là màn tái hiện 'Tập trận cờ lau': các thiếu nhi Trường Yên cưỡi trâu, tay cầm bông lau trắng giả làm cờ trận, rước kiệu che lọng râm ran tiếng reo hò gợi nhớ tuổi thơ hào kiệt của chúa cờ lau Đinh Bộ Lĩnh.",
          "Bên cạnh đó là các trò chơi dân gian như thi cờ người trên sân gạch, kéo co, bơi chèo thuyền nan, đấu vật truyền thống và hội hát chèo, hát xẩm trên bến sông.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mùng 8, 9, 10 tháng 3 âm lịch hàng năm (thường rơi vào tháng 4 dương lịch).",
      etiquette: "Giữ trật tự khi ban tế lễ đọc chúc văn. Ăn mặc lịch sự khi bước vào khuôn viên đền vua Đinh - vua Lê.",
      tips: [
        "Nên đến sớm trước 07:30 để có vị trí theo dõi lễ rước kiệu từ đền vua Đinh sang đền vua Lê.",
        "Khu vực sân khấu ngoài trời có nhiều trò chơi dân gian rất phù hợp cho gia đình có trẻ em.",
      ],
      note: "Vé vào cổng di tích trong những ngày chính hội có thể được miễn hoặc áp dụng theo quy định của Ban tổ chức lễ hội.",
    },
    internalLinks: [
      {
        title: "Cố Đô Hoa Lư lịch sử ngàn năm",
        url: "/#diem-den",
        description: "Khám phá kinh đô đá đầu tiên của nước Đại Cồ Việt.",
      },
      {
        title: "Rồng vàng sông Hoàng Long",
        url: "/blog/rong-vang-song-hoang-long",
        description: "Đọc thêm huyền tích gắn liền với nghi thức rước nước thiêng.",
      },
    ],
    references: [
      "Di sản Văn hóa Phi vật thể Quốc gia Lễ hội Hoa Lư (Quyết định của Bộ VHTTDL).",
      "Ban Quản lý Quần thể Danh thắng Tràng An và Khu Di tích Cố đô Hoa Lư.",
    ],
  },
  {
    id: 11,
    slug: "theu-ren-van-lam",
    title: "Thêu ren Văn Lâm: nghề hơn 700 năm bên bến thuyền Tam Cốc",
    metaDescription: "Khám phá làng nghề thêu ren Văn Lâm 700 năm tuổi: đường kim mũi chỉ tài hoa của những người thợ bên dòng sông Ngô Đồng thơ mộng.",
    pillar: "am-thuc-lang-nghe",
    pillarLabel: "Ẩm thực & làng nghề",
    publishDate: "Tháng 3/2027",
    scheduledMonth: "03/2027",
    readTime: "5 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Khám phá Làng nghề truyền thống",
    },
    featuredImage: "/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp",
    featuredImageAlt: "Khung cảnh làng quê thanh bình ven bến thuyền Tam Cốc làng Văn Lâm",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Ngay sát bến đò sông Ngô Đồng, làng cổ Văn Lâm đã gắn liền với nghề thêu ren hơn bảy thế kỷ, nơi mỗi bức tranh thêu phong cảnh là một kiệt tác tỉ mỉ của người phụ nữ cố đô.",
    tags: ["Thêu ren Văn Lâm", "Làng nghề", "Tam Cốc", "Văn hóa dân gian", "Nghệ nhân thêu"],
    openingScene: "Bên hiên nhà cổ lát gạch ngói đỏ làng Văn Lâm, tiếng lách cách của khung thêu gỗ vang lên nhịp nhàng. Dưới bàn tay thoăn thoắt của bà thợ thêu luống tuổi, sợi chỉ tơ mỏng mảnh luồn qua lớp vải lanh, dần hiện lên hình bóng cây cầu đá Bích Động và dải sông Ngô Đồng mềm như dải lụa.",
    mainStory: [
      {
        subheading: "Nghề thêu hoàng gia từ thuở nhà Trần",
        paragraphs: [
          "Làng Văn Lâm (xã Ninh Hải, Hoa Lư) có bề dày lịch sử thêu ren hơn 700 năm. Tương truyền vào thế kỷ 13, khi vua Trần Thái Tông về vùng núi này lập Hành cung Vũ Lâm, bà Trần Thị Dung (vợ Thái sư Trần Thủ Độ) đã truyền dạy kỹ thuật thêu tay cho phụ nữ địa phương.",
          "Ban đầu, các sản phẩm thêu phục vụ nghi lễ cung đình, thêu cờ trướng, long bào, câu đối đền miếu. Đến đầu thế kỷ 20, các nghệ nhân Văn Lâm tiếp thu thêm kỹ thuật ren của Pháp (kỹ thuật thùa ren, rút sợi), tạo nên thương hiệu 'thêu ren Văn Lâm' độc đáo xuất khẩu sang châu Âu và Nhật Bản.",
        ],
      },
      {
        subheading: "Đường kim mũi chỉ giữ hồn di sản",
        paragraphs: [
          "Một bức tranh thêu phong cảnh Tam Cốc cỡ trung bình cần từ 15 đến 30 ngày làm việc liên tục của người thợ lành nghề. Từng sắc thái của vách đá vôi xám rêu, từng ngọn lúa vàng hay sóng nước lăn tăn đều đòi hỏi sự phối màu chỉ tơ công phu đến từng chi tiết.",
          "Ngày nay, du khách sau chuyến thuyền nan Tam Cốc có thể ghé thăm các xưởng thêu gia đình quanh bến đò, thử cầm kim thêu và chọn mua những chiếc khăn trải bàn, túi vải lanh thêu tay tinh xảo làm quà lưu niệm.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Quanh năm. Thuận tiện nhất là kết hợp ghé thăm ngay sau chuyến đi thuyền Tam Cốc.",
      etiquette: "Xin phép trước khi chụp ảnh nghệ nhân đang tập trung làm việc bên khung thêu.",
      tips: [
        "Nên đi bộ dạo quanh các ngõ cổ làng Văn Lâm để ngắm nhìn nhịp sống thủ công yên ả.",
        "Khăn tay và lót ly thêu ren có giá rất phải chăng (từ 30.000 – 80.000đ/chiếc), là món quà nhỏ gọn ý nghĩa.",
      ],
      note: "Sản phẩm thêu thủ công Văn Lâm được bảo hộ nhãn hiệu tập thể. Hãy ủng hộ các nghệ nhân bằng cách mua sản phẩm chính gốc tại làng.",
    },
    internalLinks: [
      {
        title: "Làng nghề thủ công Ninh Bình",
        url: "/#cam-nang",
        description: "Tìm hiểu thêu ren Văn Lâm, chạm đá Ninh Vân và gốm Bồ Bát.",
      },
      {
        title: "Danh thắng Tam Cốc – Bích Động",
        url: "/#diem-den",
        description: "Khám phá bến đò Văn Lâm và hành trình thuyền nan sông Ngô Đồng.",
      },
    ],
    references: [
      "Hồ sơ Làng nghề truyền thống Thêu ren Văn Lâm, Sở Công Thương tỉnh Ninh Bình.",
      "Tư liệu lịch sử Hành cung Vũ Lâm và làng cổ Ninh Hải.",
    ],
  },
  {
    id: 12,
    slug: "coi-kim-son",
    title: "Cói Kim Sơn từ thuở Nguyễn Công Trứ khai hoang: bản hùng ca mở đất lấn biển",
    metaDescription: "Tìm hiểu lịch sử khai hoang mở đất Kim Sơn năm 1829 của Doanh điền sứ Nguyễn Công Trứ và nghề dệt chiếu cói truyền thống ven biển Ninh Bình.",
    pillar: "am-thuc-lang-nghe",
    pillarLabel: "Ẩm thực & làng nghề",
    publishDate: "Tháng 4/2027",
    scheduledMonth: "04/2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Lịch sử & Đời sống Làng nghề",
    },
    featuredImage: "/images/09-phat-diem-kim-son/phat-diem-01-nha-tho-da.webp",
    featuredImageAlt: "Vùng đất trù phú Kim Sơn nơi cây cói xanh ngát bãi bồi ven biển",
    featuredImageCredit: "NinhBinhTravel Media Collection",
    excerpt: "Năm 1829, cụ Nguyễn Công Trứ đem dân nghèo về quai đê lấn biển lập nên huyện Kim Sơn ('núi vàng'). Cây cói bám rễ trên đất mặn, hóa thành những manh chiếu hoa thơm ngát cả trăm năm.",
    tags: ["Cói Kim Sơn", "Nguyễn Công Trứ", "Khai hoang 1829", "Chiếu cói", "Làng nghề ven biển"],
    openingScene: "Gió biển thổi ào ạt qua những cánh đồng cói xanh mướt ngút ngàn tầm mắt tại vùng bãi bồi ven đê Bình Minh. Mùi phù sa mặn mòi quyện với mùi cói tươi phơi khô dưới nắng giòn. Tiếng dập go lách cách từ những khung dệt chiếu rộn ràng khắp các xóm làng trù phú huyện Kim Sơn.",
    mainStory: [
      {
        subheading: "Bản lĩnh khai phá của Doanh điền sứ Nguyễn Công Trứ",
        paragraphs: [
          "Mùa xuân năm Kỷ Sửu 1829, dưới triều vua Minh Mạng, nhà kinh tế – quân sự kiệt xuất Nguyễn Công Trứ được cử về vùng duyên hải làm Doanh điền sứ. Nhận thấy bãi bồi phù sa sông Đáy màu mỡ nhưng ngập mặn hoang hóa, cụ đã huy động dân nghèo đắp đê ngăn mặn, đào kênh xẻ rãnh thau chua.",
          "Chỉ trong một thời gian ngắn, hơn 14.000 mẫu đất mới được khai hoang, lập nên 7 tổng và 63 ấp làng trù phú. Cụ đặt tên huyện mới là 'Kim Sơn' với ước vọng biến mảnh đất bùn lầy thành 'Núi Vàng' nuôi sống muôn dân.",
        ],
      },
      {
        subheading: "Cây cói xanh bám rễ đất mặn",
        paragraphs: [
          "Trên đất mặn mới bồi đắp, cây lúa chưa thể mọc, nhưng cây cói lại bén rễ tươi tốt lạ thường. Người dân Kim Sơn bắt đầu nghề trồng cói, chẻ cói, nhuộm cói ngũ sắc và dệt nên những đôi chiếu hoa bền đẹp nổi tiếng khắp xứ Đàng Ngoài.",
          "Ngày nay, bên cạnh chiếu cói truyền thống, các nghệ nhân Kim Sơn đã sáng tạo hàng trăm sản phẩm mỹ nghệ xuất khẩu: làn cói, thảm cói, hộp đựng đồ và mũ cói thân thiện với môi trường, được du khách quốc tế đặc biệt ưa chuộng.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mùa thu hoạch cói (tháng 5 – 6 và tháng 9 – 10) khi những con đường làng rực đỏ màu cói nhuộm phơi nắng.",
      etiquette: "Tôn trọng không gian lao động của người dân phơi cói ven đường.",
      tips: [
        "Kết hợp viếng Đền thờ cụ Nguyễn Công Trứ tại xã Quang Thiện và Nhà thờ đá Phát Diệm.",
        "Mua giỏ cói, mũ cói làm quà lưu niệm trực tiếp tại các xưởng đan lát thủ công thị trấn Phát Diệm.",
      ],
      note: "Huyện Kim Sơn cách TP Ninh Bình khoảng 28 km, đường trải nhựa phẳng phiu rất thuận tiện cho xe máy hoặc ô tô du lịch.",
    },
    internalLinks: [
      {
        title: "Nhà thờ đá Phát Diệm Kim Sơn",
        url: "/blog/phat-diem-mua-giang-sinh",
        description: "Khám phá tuyệt tác kiến trúc đá lim cùng nằm trên vùng đất Kim Sơn.",
      },
      {
        title: "Làng nghề thủ công truyền thống",
        url: "/#cam-nang",
        description: "Tìm hiểu các làng nghề truyền thống lâu đời của Ninh Bình.",
      },
    ],
    references: [
      "Nguyễn Công Trứ Toàn Tập, NXB Văn học.",
      "Địa chí Huyện Kim Sơn: 190 năm hình thành và phát triển (1829 – 2019).",
    ],
  },
  {
    id: 13,
    slug: "ba-vung-van-hoa-ninh-binh-moi",
    title: "Ba vùng văn hóa của Ninh Bình mới: sự giao hòa giữa Di sản, Vương triều và Sông Hồng",
    metaDescription: "Khám phá chiều sâu không gian ba vùng văn hóa sau sáp nhập 2025: Di sản thiên nhiên Tràng An, Đất phát tích nhà Trần và Miền cửa sông Đồng bằng Sông Hồng.",
    pillar: "ninh-binh-moi",
    pillarLabel: "Ninh Bình mới",
    publishDate: "Tháng 4/2027",
    scheduledMonth: "04/2027",
    readTime: "7 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Nghiên cứu Quy hoạch Văn hóa",
    },
    featuredImage: "/images/01-hero/hero-01-toan-canh.webp",
    featuredImageAlt: "Toàn cảnh non nước và đồng bằng châu thổ sông Hồng nhìn từ trên cao",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Quy hoạch không gian đô thị di sản mở rộng đưa Ninh Bình trở thành tâm điểm kết nối ba dòng chảy lịch sử – văn hóa độc đáo bậc nhất miền Bắc.",
    tags: ["Ninh Bình mới", "Ba vùng văn hóa", "Quy hoạch 2025", "Đô thị di sản", "Sông Đáy", "Sông Hồng"],
    openingScene: "Đứng trên đỉnh núi Non Nước nhìn ra ngã ba sông Đáy và sông Vân, bạn sẽ nhận ra Ninh Bình chưa bao giờ là một ốc đảo biệt lập. Dòng sông Đáy hiền hòa chảy từ dãy núi đá vôi phía Tây xuôi về đồng bằng châu thổ sông Hồng phía Đông, như sợi chỉ đỏ kết nối những tầng văn hóa ngàn năm của dân tộc.",
    mainStory: [
      {
        subheading: "1. Vùng lõi Di sản Thiên nhiên & Kinh đô Cố đô (Hoa Lư – Gia Viễn – Nho Quan)",
        paragraphs: [
          "Đây là trái tim của Ninh Bình: nơi có Quần thể Di sản Thế giới Tràng An, kinh đô ngàn năm Hoa Lư thời Đinh – Tiền Lê, rừng nguyên sinh Cúc Phương và đầm ngập nước Vân Long.",
          "Đặc trưng của vùng này là địa hình núi đá vôi karst nhiệt đới ngập nước hàng triệu năm tuổi, mang vẻ đẹp hoang sơ, hùng vĩ và trầm mặc của cội nguồn lập quốc.",
        ],
      },
      {
        subheading: "2. Vùng Vương triều Trần & Tín ngưỡng dân gian (Ý Yên – Nam Định giáp ranh)",
        paragraphs: [
          "Bên kia bờ sông Đáy là vùng đất phát tích nhà Trần và trung tâm tín ngưỡng thờ Mẫu Tam phủ Phủ Dầy. Đây là không gian gắn liền với hào khí Đông A ba lần đánh tan giặc Nguyên Mông.",
          "Sự kết nối giữa Hành cung Vũ Lâm (Tràng An) và Hành cung Tức Mặc (Nam Định) tạo nên một bức tranh hoàn chỉnh về chiến lược quân sự và tu hành Phật giáo thời Trần.",
        ],
      },
      {
        subheading: "3. Vùng Phù sa cửa sông & Làng nghề ven biển (Kim Sơn – Nghĩa Hưng)",
        paragraphs: [
          "Về phía Đông Nam là dải đất phù sa trẻ do bàn tay con người quai đê lấn biển từ thế kỷ 19. Nơi đây mang đậm hơi thở văn hóa làng nghề cói dệt, ruộng muối, đầm nuôi trồng thủy sản và tuyệt tác Nhà thờ đá Phát Diệm.",
          "Đây là minh chứng cho sức sống bền bỉ của người Việt trong công cuộc chinh phục thiên nhiên, mở cõi hướng ra biển lớn.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mùa thu hoặc mùa xuân khi thời tiết mát mẻ, thuận tiện cho các chuyến đi liên vùng 3 ngày 2 đêm.",
      etiquette: "Tôn trọng các nét văn hóa đặc thù của từng tiểu vùng (từ cửa Phật thanh tịnh đến không gian tín ngưỡng thờ Mẫu dân gian).",
      tips: [
        "Sử dụng tuyến đường Quốc lộ 10 và cao tốc Bắc – Nam để di chuyển nhanh chóng giữa 3 vùng.",
        "Thiết kế lịch trình theo chủ đề: Ngày 1 non nước Tràng An, Ngày 2 văn hóa triều Trần, Ngày 3 miền biển Kim Sơn.",
      ],
      note: "Các thông tin về ranh giới hành chính và quy hoạch đô thị di sản được cập nhật theo định hướng phát triển du lịch của tỉnh Ninh Bình.",
    },
    internalLinks: [
      {
        title: "Bản đồ tương tác 20 danh thắng",
        url: "/#diem-den",
        description: "Xem tọa độ địa lý và khám phá các vùng lân cận trên bản đồ vệ tinh.",
      },
      {
        title: "Cụm địa điểm gần nhau",
        url: "/#len-ke-hoach",
        description: "Bảng tra cứu khoảng cách và 4 cụm điểm thuận tiện ghép tuyến trong ngày.",
      },
    ],
    references: [
      "Quy hoạch tỉnh Ninh Bình thời kỳ 2021 – 2030, tầm nhìn đến năm 2050 (Quyết định của Thủ tướng Chính phủ).",
      "Kỷ yếu Hội thảo 'Bảo tồn và phát huy giá trị Đô thị Di sản Thiên niên kỷ Ninh Bình'.",
    ],
  },
  {
    id: 14,
    slug: "tam-coc-mua-lua-vang",
    title: "Tam Cốc mùa lúa vàng: đi thế nào cho đẹp mà không chen lấn?",
    metaDescription: "Kinh nghiệm săn ảnh lúa chín Tam Cốc cuối tháng 5 – đầu tháng 6: khung giờ vàng chụp ảnh thuyền nan, vị trí ngắm đỉnh cao và mẹo tránh đông đúc.",
    pillar: "cam-nang",
    pillarLabel: "Cẩm nang thực tế",
    publishDate: "Tháng 5/2027",
    scheduledMonth: "05/2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Săn ảnh & Trải nghiệm Mùa vàng",
    },
    featuredImage: "/images/03-tam-coc-bich-dong/tam-coc-02-lua-chin-vang.webp",
    featuredImageAlt: "Dòng sông Ngô Đồng uốn lượn giữa những cánh đồng lúa chín vàng óng ả Tam Cốc",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Chỉ kéo dài vỏn vẹn hai tuần từ cuối tháng 5 đến đầu tháng 6, mùa lúa chín Tam Cốc là khoảnh khắc kỳ diệu khi dòng sông Ngô Đồng hóa thành dải lụa vàng rực rỡ nhất miền Bắc.",
    tags: ["Tam Cốc", "Mùa lúa chín", "Sông Ngô Đồng", "Săn ảnh", "Mùa vàng", "Kinh nghiệm du lịch"],
    openingScene: "Ánh nắng ban mai 6 giờ 30 rọi xiên qua những vách đá vôi sẫm màu, làm bừng sáng cả thung lũng sông Ngô Đồng. Mặt nước lấp lánh như dát bạc. Những bông lúa chín trĩu hạt tỏa ra mùi hương ngọt ngào nồng nàn của vụ chiêm no ấm. Tiếng mái chèo khua nước nhẹ tênh đón đoàn khách đầu tiên rời bến Văn Lâm.",
    mainStory: [
      {
        subheading: "Thời điểm vàng: 2 tuần ngắn ngủi trong năm",
        paragraphs: [
          "Khác với ruộng bậc thang vùng cao Tây Bắc cấy nhiều trà lúa rải rác, lúa Tam Cốc là lúa nước trồng dọc hai bên bãi bồi sông Ngô Đồng. Toàn bộ thung lũng thường chín đồng loạt chỉ trong khoảng từ ngày 20/5 đến 05/6 hàng năm.",
          "Chỉ sau khi lúa chín vàng ruộm khoảng một tuần, người nông dân bắt đầu chèo thuyền nan ra gặt lúa để tránh lũ tiểu mãn. Bởi vậy, việc canh đúng thời điểm là yếu tố quyết định để bạn chiêm ngưỡng trọn vẹn cảnh sắc ngoạn mục này.",
        ],
      },
      {
        subheading: "Hai góc ngắm mùa vàng đắt giá nhất",
        paragraphs: [
          "1. Góc nhìn từ thuyền nan trên sông: Ngồi trên thuyền lướt sát gốc lúa, bạn có thể với tay chạm vào từng bông lúa trĩu hạt, cảm nhận trọn vẹn hương thơm mát của rơm rạ và chụp những bức ảnh cận cảnh đầy cảm xúc.",
          "2. Góc nhìn từ đỉnh Hang Múa: Leo 486 bậc thang lên đỉnh Ngọa Long vào sáng sớm, phóng tầm mắt xuống thung lũng Tam Cốc từ độ cao gần 140 m. Toàn bộ dòng sông uốn lượn như một bức tranh thủy mặc khổng lồ với những chấm thuyền nan rực rỡ trôi giữa biển vàng.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Khoảng ngày 20 tháng 5 đến 05 tháng 6 hàng năm. Khung giờ vàng: 06:30 – 08:30 sáng hoặc 16:00 – 17:30 chiều.",
      etiquette: "Không bẻ lúa, không giẫm đạp lên ruộng lúa của người dân khi thuyền dừng chân. Giữ gìn vệ sinh chung.",
      tips: [
        "Mùa này nắng đầu hè khá gay gắt, bắt buộc mang theo nón lá hoặc ô, kem chống nắng và nước bùn khoáng.",
        "Nên đặt trước homestay tại khu vực Tam Cốc ít nhất 2–3 tuần vì phòng thường kín chỗ vào dịp Tuần lễ Du lịch Sắc vàng Tam Cốc.",
      ],
      note: "Lịch lúa chín phụ thuộc vào thời tiết thực tế từng năm. Hãy theo dõi các cập nhật mới nhất từ fanpage chính thức của Sở Du lịch Ninh Bình trước khi đi.",
    },
    internalLinks: [
      {
        title: "Tam Cốc – Bích Động chi tiết",
        url: "/#diem-den",
        description: "Khám phá 3 hang tự nhiên và chùa Bích Động rêu phong.",
      },
      {
        title: "Hang Múa – Đỉnh Ngọa Long",
        url: "/#diem-den",
        description: "Chinh phục 486 bậc đá ngắm trọn thung lũng Tam Cốc từ trên cao.",
      },
    ],
    references: [
      "Bản tin Khuyến nông mùa vụ lúa xuân huyện Hoa Lư, Sở Nông nghiệp & PTNT Ninh Bình.",
      "Tạp chí Di sản Văn hóa & Du lịch Ninh Bình.",
    ],
  },
  {
    id: 15,
    slug: "tuan-du-lich-sac-vang",
    title: "Tuần Du lịch \"Sắc vàng Tam Cốc – Tràng An\": bữa tiệc nghệ thuật giữa đồng lúa",
    metaDescription: "Khám phá lễ hội mùa lúa chín độc đáo nhất Ninh Bình: bức tranh nghệ thuật khổng lồ trên cánh đồng lúa và các nghi thức diễu hành thuyền hoa.",
    pillar: "le-hoi",
    pillarLabel: "Lễ hội & phong tục",
    publishDate: "Tháng 5/2027",
    scheduledMonth: "05/2027",
    readTime: "5 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Sự kiện & Lễ hội",
    },
    featuredImage: "/images/03-tam-coc-bich-dong/tam-coc-05-cheo-thuyen-bang-chan.webp",
    featuredImageAlt: "Đoàn thuyền hoa rực rỡ diễu hành trên dòng sông Ngô Đồng ngày khai mạc tuần du lịch",
    featuredImageCredit: "Sở Du lịch Ninh Bình",
    excerpt: "Mỗi mùa lúa chín về, cánh đồng Tam Cốc lại biến thành tấm toan khổng lồ khắc họa những bức tranh dân gian Việt Nam, kết hợp cùng tiếng hát chèo xẩm ngân vang trên sông.",
    tags: ["Sắc vàng Tam Cốc", "Tuần du lịch", "Thuyền hoa", "Hát chèo trên sông", "Lễ hội Ninh Bình"],
    openingScene: "Một dải cờ hoa rực rỡ trải dài từ bến đò Văn Lâm đến tận cửa Hang Cả. Hàng trăm chiếc thuyền nan chở các nghệ sĩ hát chèo, hát xẩm trong trang phục quan họ và áo tứ thân truyền thống từ từ rẽ nước lướt ra giữa đồng lúa chín vàng. Tiếng đàn bầu ngân nga hòa trong tiếng vỗ tay rộn rã của du khách trong và ngoài nước.",
    mainStory: [
      {
        subheading: "Tác phẩm nghệ thuật tạo hình trên cánh đồng lúa",
        paragraphs: [
          "Điểm nhấn sáng tạo nhất của Tuần Du lịch 'Sắc vàng Tam Cốc – Tràng An' những năm gần đây là nghệ thuật khắc họa tranh dân gian ngay trên ruộng lúa. Bằng cách phối hợp gieo cấy giữa các giống lúa có màu sắc lá và hạt khác nhau, người nông dân Tam Cốc đã tạo nên những bức tranh khổng lồ rộng hàng nghìn mét vuông.",
          "Những bức tranh biểu tượng như 'Lý ngư vọng nguyệt' (Cá chép trông trăng) hay 'Mục đồng thổi sáo' hiện lên sống động giữa cánh đồng nhìn từ trên cao, tôn vinh ước vọng mùa màng bội thu và cuộc sống thanh bình của người dân đất Việt.",
        ],
      },
      {
        subheading: "Âm vang dân ca trên dòng sông Ngô Đồng",
        paragraphs: [
          "Suốt tuần lễ diễn ra sự kiện, du khách ngồi thuyền nan không chỉ được ngắm lúa vàng mà còn được thưởng thức những làn điệu dân ca chèo, ca trù, hát then do các nghệ nhân biểu diễn trên những bè nứa nổi giữa sông.",
          "Phố đi bộ Tam Cốc về đêm trở thành không gian ẩm thực sôi động với các quầy hàng bày bán nem chua Yên Mạc, dê núi nướng tảng, chè sen long nhãn và các mặt hàng thêu ren thủ công.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Thường tổ chức vào cuối tháng 5 hàng năm theo thông báo của UBND tỉnh Ninh Bình.",
      etiquette: "Tôn trọng các đoàn biểu diễn nghệ thuật trên sông. Mua vé thuyền theo đúng quy trình hướng dẫn tại bến đò.",
      tips: [
        "Vào ngày khai mạc, lượng khách đổ về bến thuyền rất đông, hãy có mặt từ 06:30 để mua vé thuận lợi.",
        "Mang theo ống kính tele nếu bạn muốn chụp lại cận cảnh các màn biểu diễn thuyền hoa từ trên bờ kè.",
      ],
      note: "Lịch trình chính xác và các hoạt động trong Tuần Du lịch được Sở Du lịch Ninh Bình công bố trước sự kiện khoảng 1 tháng.",
    },
    internalLinks: [
      {
        title: "Tam Cốc mùa lúa vàng",
        url: "/blog/tam-coc-mua-lua-vang",
        description: "Kinh nghiệm săn ảnh và khung giờ vàng ngắm lúa chín không chen lấn.",
      },
      {
        title: "Tạp chí ẩm thực bản địa",
        url: "/#am-thuc",
        description: "Khám phá ẩm thực phố đêm Tam Cốc sau ngày hội lúa vàng.",
      },
    ],
    references: [
      "Kế hoạch tổ chức Tuần Du lịch 'Sắc vàng Tam Cốc – Tràng An' của UBND tỉnh Ninh Bình.",
      "Cổng thông tin Điện tử Sở Du lịch tỉnh Ninh Bình.",
    ],
  },
  {
    id: 16,
    slug: "mua-sen-trang-an-van-long",
    title: "Mùa sen ở Tràng An và Vân Long: vẻ đẹp thanh tao giữa thung lũng đá vôi",
    metaDescription: "Khám phá mùa sen nở rộ tháng 6 tại Ninh Bình: cầu gỗ chữ Tâm Hang Múa, đầm sen thơm ngát Tràng An và đầm sen bạt ngàn Vân Long.",
    pillar: "cam-nang",
    pillarLabel: "Cẩm nang thực tế",
    publishDate: "Tháng 6/2027",
    scheduledMonth: "06/2027",
    readTime: "5 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Khám phá Thiên nhiên Bốn mùa",
    },
    featuredImage: "/images/04-hang-mua/hang-mua-02-bac-da-van-ly-truong-thanh.webp",
    featuredImageAlt: "Cầu gỗ uốn lượn giữa đầm sen bạt ngàn dưới chân núi Hang Múa",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Khi cái nắng tháng 6 đổ lửa khắp đồng bằng, những đầm sen dưới chân núi đá vôi Ninh Bình bung nở hồng thắm, tỏa hương thơm ngát làm dịu mát cả non nước cố đô.",
    tags: ["Mùa sen", "Hang Múa", "Đầm Vân Long", "Tràng An", "Săn ảnh sen", "Cẩm nang du lịch"],
    openingScene: "Sương sớm còn đọng từng giọt long lanh trên những chiếc lá sen xanh thẫm to như chiếc nón quai thao. Dưới chân ngọn núi đá dựng đứng, hàng vạn đóa sen hồng, sen trắng hé nở đón ánh nắng đầu tiên trong ngày. Mùi hương sen thanh khiết thoang thoảng theo làn gió sớm, xua tan hoàn toàn cái oi nồng của mùa hè Bắc Bộ.",
    mainStory: [
      {
        subheading: "Cầu gỗ chữ Tâm giữa hồ sen Hang Múa",
        paragraphs: [
          "Hồ sen dưới chân núi Múa là một trong những tọa độ ngắm sen nổi tiếng nhất miền Bắc. Điểm độc đáo ở đây là cây cầu gỗ hình chữ Tâm uốn lượn mềm mại giữa hồ sen rộng hàng héc-ta, tựa lưng vào vách núi đá vôi sừng sững.",
          "Đi dạo trên cầu gỗ vào sáng sớm, du khách có thể chạm tay vào những đóa sen nở rộ, chiêm ngưỡng đàn cá bơi lội dưới làn nước trong veo và chụp những bức ảnh áo dài, áo cổ phục tuyệt đẹp.",
        ],
      },
      {
        subheading: "Đầm sen tự nhiên tại Vân Long và thung lũng Tràng An",
        paragraphs: [
          "Khác với vẻ rực rỡ của hồ sen Hang Múa, sen ở Đầm Vân Long mang vẻ đẹp hoang sơ tự nhiên. Những vạt sen hồng và hoa súng tím mọc đan xen giữa rặng lau sậy trên mặt 'vịnh không sóng'.",
          "Khi thuyền nan lướt nhẹ qua đầm sen vào chiều mát, du khách có cơ hội vừa hít hà hương sen thơm mát vừa ngắm nhìn những chú voọc mông trắng chuyền cành trên vách đá tai mèo gần đó.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Tháng 6 đến tháng 7 hàng năm. Thời điểm ngắm sen đẹp nhất trong ngày: 06:00 – 08:00 sáng khi hoa vừa nở và tỏa hương đậm nhất.",
      etiquette: "Không hái hoa bẻ cành bừa bãi. Giữ gìn cầu gỗ và cảnh quan tự nhiên của hồ sen.",
      tips: [
        "Nên chuẩn bị trang phục màu trắng, be hoặc hồng nhạt để có những bức ảnh hài hòa nhất với nền sen xanh.",
        "Thưởng thức một tách trà ướp hoa sen Tràng An thơm nồng sau buổi chụp ảnh sáng sớm.",
      ],
      note: "Vé tham quan hồ sen tại Hang Múa đã bao gồm trong vé tham quan khu du lịch Hang Múa (tham khảo 100.000đ/người).",
    },
    internalLinks: [
      {
        title: "Khu du lịch Hang Múa",
        url: "/#diem-den",
        description: "Khám phá 486 bậc thang đá và cầu gỗ hồ sen chữ Tâm.",
      },
      {
        title: "Khu bảo tồn Đầm Vân Long",
        url: "/#diem-den",
        description: "Khám phá miền đầm nước ngập mặn phẳng lặng như gương.",
      },
    ],
    references: [
      "Hồ sơ tài nguyên sinh học Quần thể Di sản Thế giới Tràng An.",
      "Tạp chí Sinh vật cảnh Việt Nam.",
    ],
  },
  {
    id: 17,
    slug: "cuc-phuong-di-rung-trach-nhiem",
    title: "Cúc Phương: đi rừng có trách nhiệm để giữ màu xanh cho muôn đời sau",
    metaDescription: "Cẩm nang du lịch rừng bền vững tại Vườn Quốc Gia Cúc Phương: quy tắc không để lại dấu chân, bảo vệ động vật hoang dã và an toàn đi rừng.",
    pillar: "cam-nang",
    pillarLabel: "Cẩm nang thực tế",
    publishDate: "Tháng 7/2027",
    scheduledMonth: "07/2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Bảo tồn & Du lịch Sinh thái",
    },
    featuredImage: "/images/08-cuc-phuong-thien-ha/cuc-phuong-01-duong-rung.webp",
    featuredImageAlt: "Con đường rừng nguyên sinh râm mát với những tán cây cổ thụ tại Vườn Quốc Gia Cúc Phương",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Là vườn quốc gia đầu tiên của Việt Nam, Cúc Phương không phải công viên giải trí để ồn ào check-in, mà là thánh đường thiên nhiên cần được lắng nghe và tôn trọng bằng sự tử tế.",
    tags: ["Cúc Phương", "Đi rừng", "Bảo vệ môi trường", "Du lịch bền vững", "Cây chò ngàn năm", "Cẩm nang"],
    openingScene: "Bước qua cổng rừng Cúc Phương, nhiệt độ lập tức giảm xuống 4–5 độ C dưới vòm lá đại ngàn rậm rạp. Tiếng ve sầu râm ran hòa cùng tiếng suối róc rách và tiếng gọi đàn của chim gõ kiến vang vọng giữa rừng già. Một cảm giác thanh khiết, mát lành bao bọc lấy tâm trí sau những ngày dài ngột ngạt nơi phố thị.",
    mainStory: [
      {
        subheading: "Nguyên tắc 'Không để lại gì ngoài những dấu chân'",
        paragraphs: [
          "Vườn Quốc Gia Cúc Phương rộng hơn 22.200 ha, là cái nôi đa dạng sinh học rừng mưa nhiệt đới trên núi đá vôi. Để giữ gìn sự nguyên vẹn này, mỗi du khách cần thực hành nghiêm ngặt nguyên tắc du lịch có trách nhiệm:",
          "• Không xả rác: Tuyệt đối mang toàn bộ vỏ chai nhựa, túi nilon, vỏ bánh kẹo ra khỏi cửa rừng. Rác thải nhựa có thể giết chết các loài thú rừng nếu chúng vô tình nuốt phải.",
          "• Giữ trọn tĩnh lặng: Không mang loa kéo, không bật nhạc ồn ào làm hoảng sợ các loài chim và linh trưởng đang làm tổ.",
          "• Tôn trọng thảm thực vật: Không khắc tên lên thân cây chò ngàn năm tuổi, không bẻ cành lan rừng hay săn bắt bướm làm tiêu bản.",
        ],
      },
      {
        subheading: "Thăm trung tâm cứu hộ linh trưởng và rùa quý hiếm",
        paragraphs: [
          "Một trải nghiệm giáo dục môi trường sâu sắc tại Cúc Phương là ghé thăm Trung tâm Cứu hộ Linh trưởng Nguy cấp (EPRC) và Trung tâm Bảo tồn Rùa. Tại đây, bạn sẽ được các chuyên gia kể về hành trình cứu chữa những chú voọc mông trắng, vượn má hung thoát khỏi bẫy thú trộm.",
          "Mỗi tấm vé tham quan chính là một đóng góp trực tiếp vào quỹ chăm sóc, phục hồi sức khỏe và tái thả các loài động vật hoang dã về với tự nhiên.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mùa khô từ tháng 11 đến tháng 5 năm sau (đặc biệt tháng 4 – 5 mùa bướm). Tránh những ngày mưa lớn vì đường rừng trơn trượt.",
      etiquette: "Tuyệt đối không hút thuốc hoặc đốt lửa trong rừng. Mặc quần áo dài tay và tất cao cổ để phòng chống vắt rừng.",
      tips: [
        "Chuẩn bị giày đi bộ leo núi có độ bám tốt, thuốc xịt côn trùng và bình nước cá nhân có thể tái sử dụng.",
        "Thuê xe đạp tại cổng vườn để đạp xe 20 km đường rừng vào trung tâm Bống là trải nghiệm tuyệt vời nhất.",
      ],
      note: "Giá vé vào cổng Vườn Quốc Gia Cúc Phương tham khảo 60.000đ/người lớn; 20.000đ/học sinh, sinh viên; trẻ em 10.000đ.",
    },
    internalLinks: [
      {
        title: "Vườn Quốc Gia Cúc Phương",
        url: "/#diem-den",
        description: "Khám phá cây chò ngàn năm, động Người Xưa và mùa bướm rừng rực rỡ.",
      },
      {
        title: "Mẹo du lịch an toàn Ninh Bình",
        url: "/#cam-nang",
        description: "Những lưu ý thiết thực về trang phục, thời tiết và ứng xử văn minh.",
      },
    ],
    references: [
      "Chiến lược Phát triển Du lịch Sinh thái Vườn Quốc Gia Cúc Phương giai đoạn 2021 – 2030.",
      "Tổ chức Bảo tồn Động vật Hoang dã Quốc tế (Fauna & Flora International).",
    ],
  },
  {
    id: 18,
    slug: "nguoi-muong-nho-quan",
    title: "Người Mường Nho Quan: cồng chiêng, rượu cần và phong tục đám cưới cổ truyền",
    metaDescription: "Khám phá nét đẹp văn hóa người Mường tại rẻo cao Nho Quan: thanh âm cồng chiêng vang vọng bản làng, ché rượu cần ấm nồng và phong tục cưới cổ.",
    pillar: "le-hoi",
    pillarLabel: "Lễ hội & phong tục",
    publishDate: "Tháng 8/2027",
    scheduledMonth: "08/2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Văn hóa Dân tộc Bản địa",
    },
    featuredImage: "/images/08-cuc-phuong-thien-ha/cuc-phuong-01-duong-rung.webp",
    featuredImageAlt: "Bản làng yên bình của đồng bào dân tộc Mường dưới chân rừng Nho Quan",
    featuredImageCredit: "NinhBinhTravel Media Collection",
    excerpt: "Ẩn mình dưới chân rừng nguyên sinh Cúc Phương, các bản Mường Nho Quan vẫn giữ trọn nếp nhà sàn truyền thống, nhịp chiêng khai hội và ché rượu cần thơm nồng tình người sơn cước.",
    tags: ["Người Mường", "Nho Quan", "Cồng chiêng", "Rượu cần", "Đám cưới Mường", "Văn hóa dân tộc"],
    openingScene: "Đêm ở bản người Mường Kỳ Phú, bếp lửa bập bùng giữa gian nhà sàn gỗ lim ấm sực. Bên ngoài hiên, các mế trong trang phục áo pắn trắng viền hoa cạp váy dệt thổ cẩm tinh xảo đang cùng nhau đánh bài chiêng đón khách. Tiếng cồng, tiếng chiêng âm vang trầm bổng dội vào vách núi đá vôi tĩnh mịch.",
    mainStory: [
      {
        subheading: "Thanh âm thiêng liêng của dàn cồng chiêng Mường",
        paragraphs: [
          "Tại vùng cao Nho Quan, đồng bào dân tộc Mường chiếm tỷ lệ dân số đáng kể, tạo nên một mảng màu văn hóa độc đáo bên cạnh văn hóa đồng bằng cố đô. Dàn cồng chiêng 12 chiếc tượng trưng cho 12 tháng trong năm, gắn chặt với vòng đời người Mường từ khi sinh ra, dựng vợ gả chồng cho đến ngày về với tổ tiên.",
          "Mỗi bài chiêng mang một giai điệu riêng: bài mừng nhà mới, bài đón rước dâu hiền, bài mừng lúa mới về bồ. Thanh âm chiêng Mường không xô bồ mà sâu lắng, ấm áp như tấm lòng đôn hậu của con người vùng đất rừng.",
        ],
      },
      {
        subheading: "Phong tục cưới xin cổ truyền và ché rượu cần vít cong",
        paragraphs: [
          "Đám cưới của người Mường Nho Quan lưu giữ nhiều phong tục đẹp như tục dạm ngõ, tục dâng cơm nếp trứng kiến và mâm cỗ lá chuối thơm nức. Giữa gian nhà sàn, ché rượu cần được vít những chiếc cần trúc dài cong vút.",
          "Chủ và khách cùng quây quần bên ché rượu, vừa hút rượu vừa đối đáp những câu chúc tốt lành. Rượu cần Mường được ủ từ men lá rừng và gạo nếp nương, ngọt thanh, thơm dịu, uống say lúc nào không hay mà sớm mai thức dậy đầu óc vẫn nhẹ nhõm khoan khoái.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Mùa thu hoặc mùa xuân (tháng 8 đến tháng 3 âm lịch) khi bản làng tổ chức nhiều lễ hội lúa mới và đám cưới truyền thống.",
      etiquette: "Bước lên nhà sàn cần rửa chân hoặc tháo giày dép sạch sẽ. Tôn trọng vị trí ngồi của người cao tuổi bên bếp lửa.",
      tips: [
        "Có thể kết hợp trải nghiệm homestay nhà sàn Mường tại các xã Cúc Phương, Kỳ Phú, Thạch Bình.",
        "Thưởng thức đặc sản xôi trứng kiến, cá suối nướng và rau rừng luộc chấm mẻ chua.",
      ],
      note: "Bản làng Mường là cộng đồng dân cư sinh sống, du khách nên giữ thái độ hòa nhã, tôn trọng nếp sống sinh hoạt của bà con.",
    },
    internalLinks: [
      {
        title: "Xôi trứng kiến Nho Quan",
        url: "/#am-thuc",
        description: "Khám phá món xôi nếp nương béo ngậy hạt trứng kiến mùa xuân.",
      },
      {
        title: "Vườn Quốc Gia Cúc Phương",
        url: "/#diem-den",
        description: "Điểm đến sinh thái nằm ngay trên địa bàn huyện Nho Quan.",
      },
    ],
    references: [
      "Văn hóa Dân gian Dân tộc Mường tỉnh Ninh Bình, Hội Văn nghệ Dân gian.",
      "Địa chí Văn hóa Huyện Nho Quan.",
    ],
  },
  {
    id: 19,
    slug: "vu-lua-thu-hai-tam-coc",
    title: "Vụ lúa thứ hai ở Tam Cốc: khoảng thời gian vàng mùa thu ít người biết",
    metaDescription: "Khám phá Tam Cốc mùa lúa chín thứ hai vào cuối tháng 9 – giữa tháng 10: tiết trời thu se lạnh, nắng vàng dịu và không gian thanh bình vắng bóng khách đông.",
    pillar: "cam-nang",
    pillarLabel: "Cẩm nang thực tế",
    publishDate: "Tháng 9/2027",
    scheduledMonth: "09/2027",
    readTime: "5 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Góc Du Lịch Mùa Thu",
    },
    featuredImage: "/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp",
    featuredImageAlt: "Dòng sông Ngô Đồng phẳng lặng trong nắng thu dịu dàng mùa lúa thứ hai",
    featuredImageCredit: "Vyacheslav Argenberg (CC BY 4.0)",
    excerpt: "Nếu lỡ hẹn với mùa lúa tháng 5 oi ả, mùa thu tháng 9 – 10 mang đến cho Tam Cốc một vụ mùa thứ hai thanh bình đến nao lòng, khi trời thu trong vắt và dòng sông phẳng lặng không một gợn sóng.",
    tags: ["Tam Cốc mùa thu", "Vụ lúa thứ hai", "Sông Ngô Đồng", "Du lịch mùa thu", "Thuyền nan", "Cẩm nang"],
    openingScene: "Nắng mùa thu tháng 10 không còn cái gắt gỏng của mùa hè, mà vàng sánh như mật ong trải đều trên những thửa ruộng lúa mười ven sông Ngô Đồng. Mặt nước sông phẳng lặng như tờ, trong veo soi rõ từng cụm rong đuôi chồn đung đưa dưới đáy. Một vài chú bói cá lông xanh biếc đậu hờ hững trên mỏm đá rêu phong, khẽ nghiêng đầu ngắm nhìn chiếc thuyền nan lướt qua.",
    mainStory: [
      {
        subheading: "Vụ lúa mùa: Bí mật ngọt ngào của người nông dân Ninh Hải",
        paragraphs: [
          "Rất nhiều du khách lầm tưởng Tam Cốc chỉ có duy nhất một vụ lúa vào cuối tháng 5. Trên thực tế, tùy theo con nước và thời tiết hàng năm, một số dải ruộng cao ráo ven sông Ngô Đồng được người dân cấy thêm vụ lúa mùa thứ hai, chín rộ từ cuối tháng 9 đến giữa tháng 10.",
          "Mùa lúa thứ hai không có những đám đông du khách chen chúc hay các sự kiện lễ hội ồn ã. Tam Cốc mùa này trở về đúng với vẻ đẹp mộc mạc, bình yên vốn có của một làng quê thuần nông Bắc Bộ.",
        ],
      },
      {
        subheading: "Trải nghiệm đạp xe mùa thu quanh Chùa Bích Động",
        paragraphs: [
          "Tiết trời mùa thu se lạnh (khoảng 22–26 độ C) cực kỳ lý tưởng để thuê một chiếc xe đạp dạo quanh cung đường làng từ bến đò Văn Lâm đến Chùa Bích Động và Đền Thái Vi.",
          "Hai bên đường làng là những hàng cây râm mát, những hồ sen tàn đang kết gương hạt mẩy tròn, và những bức tường đá rêu phong cổ kính. Dừng chân bên quán cóc ven đường uống chén nước chè xanh, cảm nhận nhịp sống êm ả trôi đi thật chậm.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Khoảng cuối tháng 9 đến ngày 20 tháng 10 hàng năm.",
      etiquette: "Tôn trọng người chèo đò và người dân gặt lúa trên sông.",
      tips: [
        "Mang theo một chiếc áo khoác mỏng vì sáng sớm và chiều muộn ven sông thời tiết se lạnh.",
        "Thời điểm chụp ảnh đẹp nhất là lúc 15:00 – 17:00 khi ánh nắng chiều mùa thu xiên ngang vách núi tạo bóng đổ tuyệt đẹp.",
      ],
      note: "Diện tích vụ lúa thứ hai có thể thay đổi tùy theo quy hoạch nông nghiệp của xã Ninh Hải từng năm.",
    },
    internalLinks: [
      {
        title: "Tam Cốc mùa lúa vàng tháng 5",
        url: "/blog/tam-coc-mua-lua-vang",
        description: "So sánh với vụ lúa chiêm rực rỡ vào đầu hè.",
      },
      {
        title: "Cẩm nang du lịch bốn mùa",
        url: "/#cam-nang",
        description: "Khám phá nét đẹp bốn mùa: xuân lễ hội, hạ lúa vàng, thu sông nước, đông săn mây.",
      },
    ],
    references: [
      "Niên giám Thống kê Nông nghiệp huyện Hoa Lư.",
      "Ký sự Du hành Sông nước Ninh Bình, Tạp chí Du lịch Việt Nam.",
    ],
  },
  {
    id: 20,
    slug: "ngay-hoi-to-nghe-cham-da-ninh-van",
    title: "Ngày hội tổ nghề chạm đá Ninh Vân: tiếng đục trầm hùng bốn thế kỷ dưới chân núi",
    metaDescription: "Khám phá làng nghề đá mỹ nghệ Ninh Vân và ngày giỗ tổ nghề 15 tháng 8 âm lịch: bàn tay tài hoa biến đá thô ráp thành linh hồn di sản.",
    pillar: "am-thuc-lang-nghe",
    pillarLabel: "Ẩm thực & làng nghề",
    publishDate: "Tháng 10/2027",
    scheduledMonth: "10/2027",
    readTime: "6 phút đọc",
    isFeatured: false,
    author: {
      name: "Ban Biên Tập NinhBinhTravel",
      role: "Khám phá Làng nghề Di sản",
    },
    featuredImage: "/images/06-co-do-hoa-lu/hoa-lu-01-den-vua-dinh.webp",
    featuredImageAlt: "Các tác phẩm điêu khắc đá rồng uy nghiêm do nghệ nhân làng đá Ninh Vân chế tác",
    featuredImageCredit: "NinhBinhTravel Media Collection",
    excerpt: "Hơn 400 năm qua, dưới chân núi Xuân Vũ, tiếng đục đẽo đá rộn ràng chưa từng ngơi nghỉ. Ngày rằm tháng Tám, thợ đá Ninh Vân quây quần dâng hương tri ân cụ tổ nghề Hoàng Sùng.",
    tags: ["Đá mỹ nghệ Ninh Vân", "Giỗ tổ nghề", "Làng đá Ninh Vân", "Điêu khắc đá", "Di sản văn hóa"],
    openingScene: "Dọc theo con đường vào xã Ninh Vân, bụi đá xanh bám mờ trên những rặng phi lao ven đường. Tiếng đục đá ken két, tiếng mài máy xì xèo vang lên không dứt từ hàng trăm xưởng chế tác. Những khối đá vôi xám xịt thô ráp nằm ngổn ngang dưới bàn tay tài hoa của người thợ đang dần hé lộ hình hài những pho tượng Phật từ bi, những con rồng cuộn sóng uy nghi.",
    mainStory: [
      {
        subheading: "Lịch sử hơn 400 năm và ông tổ nghề Hoàng Sùng",
        paragraphs: [
          "Theo truyền tích gia phả làng nghề, nghề chạm đá Ninh Vân khởi nguồn từ thời Hậu Lê (khoảng thế kỷ 17), do cụ tổ Hoàng Sùng (người gốc Thanh Hóa) di cư về đây lập nghiệp và truyền dạy cho dân làng Xuân Vũ.",
          "Từ việc đục đẽo những dụng cụ sinh hoạt mộc mạc như cối xay, cối giã gạo, chân cột nhà gỗ, qua nhiều thế hệ, thợ đá Ninh Vân đã nâng tầm thành nghệ thuật điêu khắc kiến trúc cung đình đỉnh cao. Rất nhiều công trình đá nổi tiếng tại Cố Đô Hoa Lư, Nhà thờ đá Phát Diệm, lăng Khải Định (Huế) hay Chùa Bái Đính đều có sự đóng góp trực tiếp của các nghệ nhân Ninh Vân.",
        ],
        quote: "Đá không vô tri. Người thợ đá Ninh Vân truyền vào khối đá lạnh hơi thở, linh hồn và hào khí của non sông.",
      },
      {
        subheading: "Ngày hội giỗ tổ nghề rằm tháng Tám",
        paragraphs: [
          "Ngày 15 tháng 8 âm lịch hàng năm là ngày Giỗ tổ nghề chạm đá Ninh Vân. Từ các nghệ nhân cao niên tóc bạc phơ đến những chàng trai trẻ mới học nghề đều hội tụ về Đền thờ Tổ nghề Xuân Vũ dâng hương tưởng niệm.",
          "Họ kính cẩn báo công những công trình đá tiêu biểu đã hoàn thành trong năm, cầu xin tổ nghề phù hộ cho đôi tay thêm khéo léo, đôi mắt thêm tinh tường và giữ vững đạo đức nghề nghiệp: trung thực với đá, trung thực với đời.",
        ],
      },
    ],
    travelGuide: {
      bestTime: "Dịp rằm tháng 8 âm lịch (ngày hội giỗ tổ) hoặc các ngày mùa thu mát mẻ.",
      etiquette: "Mang khẩu trang và kính bảo hộ nếu đi bộ sâu vào các xưởng gia công đá lớn vì có nhiều bụi đá.",
      tips: [
        "Làng Ninh Vân chỉ cách trung tâm TP Ninh Bình khoảng 8 km theo hướng Tây Nam.",
        "Du khách có thể chọn mua các món quà lưu niệm bằng đá xanh tự nhiên nhỏ xinh như vòng tay phong thủy, tượng linh vật để bàn, chặn giấy chạm hoa sen.",
      ],
      note: "Làng đá Ninh Vân đã được công nhận là Di sản Văn hóa Phi vật thể Quốc gia.",
    },
    internalLinks: [
      {
        title: "Làng nghề thủ công truyền thống",
        url: "/#cam-nang",
        description: "Khám phá thêu ren Văn Lâm, chạm đá Ninh Vân và gốm Bồ Bát.",
      },
      {
        title: "Nhà thờ đá Phát Diệm",
        url: "/#diem-den",
        description: "Tuyệt tác đá xanh nguyên khối ghi dấu ấn bàn tay thợ đá cố đô.",
      },
    ],
    references: [
      "Di sản Văn hóa Phi vật thể Quốc gia Nghề đá mỹ nghệ Ninh Vân (Quyết định của Bộ VHTTDL).",
      "Lịch sử Làng nghề Truyền thống Việt Nam, NXB Khoa học Xã hội.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByPillar(pillar: BlogPillar): BlogPost[] {
  return blogPosts.filter((p) => p.pillar === pillar);
}

export const BLOG_POSTS = blogPosts;

export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, limit);

  // Ưu tiên bài cùng pillar
  const samePillar = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.pillar === current.pillar,
  );
  if (samePillar.length >= limit) return samePillar.slice(0, limit);

  const others = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.pillar !== current.pillar,
  );
  return [...samePillar, ...others].slice(0, limit);
}
