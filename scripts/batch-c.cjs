const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { downloadImage, processImage, recordImage, PUBLIC_IMAGES_DIR } = require('./image-utils.cjs');

async function runBatchC() {
  console.log('=== STARTING BATCH C: CULINARY & SEASONAL STARS ===');

  const items = [
    {
      id: 'am-thuc-01-de-nui-tai-chanh',
      file: '/images/12-dac-san-am-thuc/am-thuc-01-de-nui-tai-chanh.webp',
      subDir: '12-dac-san-am-thuc',
      filename: 'am-thuc-01-de-nui-tai-chanh.webp',
      place: 'Ninh Bình',
      alt: 'Món thịt dê núi đặc sản Ninh Bình bóp tương ghém đậm đà',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Th%E1%BB%8Bt_d%C3%AA_Ninh_B%C3%ACnh.JPG',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Th%E1%BB%8Bt_d%C3%AA_Ninh_B%C3%ACnh.JPG',
      author: 'Nguyễn Thanh Quang',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      attributionRequired: true,
      illustrative: false,
      cropCover: true,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'am-thuc-02-com-chay',
      file: '/images/12-dac-san-am-thuc/am-thuc-02-com-chay.webp',
      subDir: '12-dac-san-am-thuc',
      filename: 'am-thuc-02-com-chay.webp',
      place: 'Ninh Bình (Minh họa)',
      alt: 'Cơm cháy chà bông chiên giòn rụm vàng óng đặc sản cố đô',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Freshippo_salted_egg_yolk_dried_meat_floss_glutinous_rice.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Freshippo_salted_egg_yolk_dried_meat_floss_glutinous_rice.jpg',
      author: 'Interaccoonale',
      license: 'CC0',
      licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      attributionRequired: false,
      illustrative: true,
      cropCover: false,
      verifiedBy: ['visual'],
    },
    {
      id: 'am-thuc-03-ca-chuoi-nuong',
      file: '/images/12-dac-san-am-thuc/am-thuc-03-ca-chuoi-nuong.webp',
      subDir: '12-dac-san-am-thuc',
      filename: 'am-thuc-03-ca-chuoi-nuong.webp',
      place: 'Ninh Bình (Minh họa ẩm thực dân dã)',
      alt: 'Cá chuối nướng trui cuộn bánh tráng và rau rừng',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:C%C3%A1_l%C3%B3c_n%C6%B0%E1%BB%9Bng_trui.JPG',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/C%C3%A1_l%C3%B3c_n%C6%B0%E1%BB%9Bng_trui.JPG',
      author: 'Memberofc1',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      attributionRequired: true,
      illustrative: true,
      cropCover: false,
      verifiedBy: ['visual'],
    },
    {
      id: 'mua-01-lua-chin',
      file: '/images/14-bon-mua/mua-01-lua-chin.webp',
      subDir: '14-bon-mua',
      filename: 'mua-01-lua-chin.webp',
      place: 'Tam Cốc, Ninh Bình',
      alt: 'Mùa lúa chín vàng ươm bên dòng Ngô Đồng và núi đá vôi Tam Cốc',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tam_Coc_(85925447).jpeg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Tam_Coc_%2885925447%29.jpeg',
      author: 'Wolfgang B',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      attributionRequired: true,
      illustrative: false,
      cropCover: false,
      verifiedBy: ['category', 'gps', 'visual'],
    }
  ];

  for (const item of items) {
    console.log(`Downloading & Processing: ${item.id}...`);
    let buffer = await downloadImage(item.imageUrl);

    if (item.cropCover) {
      // Convert portrait 3000x4000 to landscape 1600x1067
      buffer = await sharp(buffer)
        .resize({ width: 1600, height: 1067, fit: 'cover', position: 'center' })
        .toBuffer();
    }

    const processed = await processImage(buffer, { isHero: false, targetWidth: 1600, maxKB: 300 });

    const destDir = path.join(PUBLIC_IMAGES_DIR, item.subDir);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const destPath = path.join(destDir, item.filename);
    fs.writeFileSync(destPath, processed.buffer);

    console.log(` -> Saved ${item.filename}: ${processed.width}x${processed.height}, ${processed.sizeKB} KB`);

    const record = {
      id: item.id,
      file: item.file,
      place: item.place,
      alt: item.alt,
      sourceUrl: item.sourceUrl,
      author: item.author,
      license: item.license,
      licenseUrl: item.licenseUrl,
      attributionRequired: item.attributionRequired,
      illustrative: item.illustrative,
      verifiedBy: item.verifiedBy,
      width: processed.width,
      height: processed.height,
      sizeKB: processed.sizeKB,
    };

    recordImage(record);
    await new Promise(r => setTimeout(r, 600));
  }

  console.log('=== BATCH C COMPLETED ===');
}

runBatchC().catch(err => {
  console.error('Batch C failed:', err);
  process.exit(1);
});
