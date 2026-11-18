const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/ninh-binh.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Update bun-moc and nem-yen-mac in localFoods
const foodUpdates = {
  'bun-moc-kim-son': {
    image: '/images/12-dac-san-am-thuc/am-thuc-04-bun-moc.webp',
    alt: 'Bát bún mọc sườn viên thơm ngọt nước dùng thanh trong',
    credit: 'Stu Spivack (CC BY 2.0 - Minh họa)',
  },
  'nem-yen-mac': {
    image: '/images/12-dac-san-am-thuc/am-thuc-06-nem-chua-yen-mac.webp',
    alt: 'Đặc sản nem chua Yên Mạc ăn kèm lá ổi lá sung nước mắm tỏi ớt',
    credit: 'Stu Spivack (CC BY 2.0 - Minh họa)',
  },
};

for (const [id, data] of Object.entries(foodUpdates)) {
  const reg = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?image:\\s*)"[^"]+"`, 'm');
  if (reg.test(content)) {
    content = content.replace(reg, `$1"${data.image}",\n    imageAlt: "${data.alt}",\n    imageCredit: "${data.credit}"`);
    console.log(`Updated food: ${id}`);
  }
}

// Update craftVillages
const craftUpdates = {
  'cheo-do-chan': {
    image: '/images/03-tam-coc-bich-dong/tam-coc-05-cheo-thuyen-bang-chan.webp',
  },
  'le-hoi-co-do': {
    image: '/images/06-co-do-hoa-lu/hoa-lu-03-le-hoi-truong-yen.webp',
  },
};

for (const [id, data] of Object.entries(craftUpdates)) {
  const reg = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?desc:\\s*"[^"]+")`, 'm');
  if (reg.test(content) && !content.includes(data.image)) {
    content = content.replace(reg, `$1,\n    image: "${data.image}"`);
    console.log(`Updated craft: ${id}`);
  }
}

// Update experiences: boat-trip, hiking, wildlife
content = content.replace(
  /(id:\s*"boat-trip"[\s\\S]*?image:\s*)"[^"]+"/,
  '$1"/images/02-trang-an/trang-an-01-thuyen-xuyen-hang.webp"'
);
content = content.replace(
  /(id:\s*"hiking"[\s\\S]*?image:\s*)"[^"]+"/,
  '$1"/images/04-hang-mua/hang-mua-01-tuong-rong-dinh-nui.webp"'
);
content = content.replace(
  /(id:\s*"wildlife"[\s\\S]*?image:\s*)"[^"]+"/,
  '$1"/images/07-thung-nham-van-long/van-long-02-voc-mong-trang.webp"'
);
console.log('Updated experiences: boat-trip, hiking, wildlife');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Batch D data update completed!');
