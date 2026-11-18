const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/ninh-binh.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Update Destination type to include imageAlt and imageCredit
if (!content.includes('imageAlt?: string;')) {
  content = content.replace(
    'image: string;\n  fallbackImage: string;',
    'image: string;\n  imageAlt?: string;\n  imageCredit?: string;\n  fallbackImage: string;'
  );
}

// 2. Mapping of destination updates
const destUpdates = {
  'trang-an': {
    image: '/images/02-trang-an/trang-an-01-thuyen-xuyen-hang.webp',
    alt: 'Thuyền nan chở khách đi qua cửa hang đá Tràng An, Ninh Bình',
    credit: 'Vyacheslav Argenberg (CC BY 4.0)',
  },
  'tam-coc': {
    image: '/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp',
    alt: 'Dòng sông Ngô Đồng uốn lượn giữa hai vách núi đá vôi Tam Cốc',
    credit: 'Tuan Mai (CC BY 2.0)',
  },
  'hang-mua': {
    image: '/images/04-hang-mua/hang-mua-01-tuong-rong-dinh-nui.webp',
    alt: 'Tượng rồng đá uốn lượn trên đỉnh Ngọa Long Sơn, Hang Múa',
    credit: 'Rod Waddington (CC BY-SA 2.0)',
  },
  'bai-dinh': {
    image: '/images/05-chua-bai-dinh/bai-dinh-01-bao-thap.webp',
    alt: 'Bảo tháp 13 tầng cao 100m uy nghiêm tại Chùa Bái Đính',
    credit: 'Felix Nagel (CC BY 2.0)',
  },
  'hoa-lu': {
    image: '/images/06-co-do-hoa-lu/hoa-lu-01-den-vua-dinh.webp',
    alt: 'Nghi môn ngoại và sân đền thờ Vua Đinh Tiên Hoàng, Cố đô Hoa Lư',
    credit: 'Jakub Hałun (CC BY 4.0)',
  },
  'thung-nham': {
    image: '/images/07-thung-nham-van-long/thung-nham-01-dan-chim.webp',
    alt: 'Khu bảo tồn sinh thái vườn chim Thung Nham với hồ nước và núi đá',
    credit: 'Shyamal (CC BY-SA 4.0)',
  },
  'van-long': {
    image: '/images/07-thung-nham-van-long/van-long-01-thuyen-hoang-hon.webp',
    alt: 'Thuyền nan lướt nhẹ trên đầm Vân Long hoang sơ tĩnh lặng',
    credit: 'Hòa Nguyễn (CC BY 2.0)',
  },
  'cuc-phuong': {
    image: '/images/08-cuc-phuong-thien-ha/cuc-phuong-01-duong-rung.webp',
    alt: 'Đường mòn xuyên rừng nguyên sinh rợp bóng cây cổ thụ Vườn quốc gia Cúc Phương',
    credit: 'hds (CC BY 2.0)',
  },
  'phat-diem': {
    image: '/images/09-phat-diem-kim-son/phat-diem-01-nha-tho-da.webp',
    alt: 'Kiến trúc Phương Đình bằng đá giao thoa Đông Tây độc đáo tại Nhà thờ Phát Diệm',
    credit: 'Hoangvantoanajc (CC BY-SA 3.0)',
  },
  'tp-ninh-binh-landmarks': {
    image: '/images/11-pho-di-bo-chua-vang/chua-vang-01-ve-dem.webp',
    alt: 'Chùa Vàng soi bóng lung linh trên mặt hồ Kỳ Lân, trung tâm thành phố Ninh Bình',
    credit: 'Kien1980v (CC0)',
  },
};

for (const [id, data] of Object.entries(destUpdates)) {
  // Regex to find destination object block by id
  const destRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?image:\\s*)"[^"]+"`, 'm');
  if (destRegex.test(content)) {
    content = content.replace(destRegex, `$1"${data.image}",\n    imageAlt: "${data.alt}",\n    imageCredit: "${data.credit}"`);
    console.log(`Updated destination: ${id}`);
  } else {
    console.warn(`Could not find id: ${id}`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('src/data/ninh-binh.ts successfully updated with Batch B images!');
