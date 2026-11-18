const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/ninh-binh.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Update LocalFood interface
if (!content.includes('interface LocalFood') && content.includes('export type LocalFood = {')) {
  content = content.replace(
    'image: string;\n  fallbackImage: string;',
    'image: string;\n  imageAlt?: string;\n  imageCredit?: string;\n  fallbackImage: string;'
  );
}

// Update foods
const foodUpdates = {
  'de-nui': {
    image: '/images/12-dac-san-am-thuc/am-thuc-01-de-nui-tai-chanh.webp',
    alt: 'Món thịt dê núi đặc sản Ninh Bình bóp tương ghém đậm đà',
    credit: 'Nguyễn Thanh Quang (CC BY-SA 3.0)',
  },
  'com-chay': {
    image: '/images/12-dac-san-am-thuc/am-thuc-02-com-chay.webp',
    alt: 'Cơm cháy chà bông chiên giòn rụm vàng óng đặc sản cố đô',
    credit: 'Interaccoonale (CC0 - Minh họa)',
  },
  'ca-chuoi-nuong': {
    image: '/images/12-dac-san-am-thuc/am-thuc-03-ca-chuoi-nuong.webp',
    alt: 'Cá chuối nướng trui cuộn bánh tráng và rau rừng',
    credit: 'Memberofc1 (CC BY-SA 3.0 - Minh họa)',
  },
};

for (const [id, data] of Object.entries(foodUpdates)) {
  const reg = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?image:\\s*)"[^"]+"`, 'm');
  if (reg.test(content)) {
    content = content.replace(reg, `$1"${data.image}",\n    imageAlt: "${data.alt}",\n    imageCredit: "${data.credit}"`);
    console.log(`Updated food: ${id}`);
  }
}

// Update seasonalGuide for Mùa Hè / Mùa Lúa Chín
const summerReg = /(title:\s*"Mùa Sen Nở Rộ & Sắc Xanh Tràn Đầy"[\s\S]*?description:\s*"[^"]+")/m;
if (summerReg.test(content)) {
  content = content.replace(
    summerReg,
    `$1,\n    image: "/images/14-bon-mua/mua-01-lua-chin.webp",\n    imageAlt: "Mùa lúa chín vàng ươm bên dòng Ngô Đồng và núi đá vôi Tam Cốc",\n    imageCredit: "Wolfgang B (CC BY-SA 3.0)"`
  );
  console.log('Updated seasonalGuide with Batch C image!');
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Batch C data update completed!');
