const fs = require('fs');
const path = require('path');
const { downloadImage, processImage, recordImage, PUBLIC_IMAGES_DIR } = require('./image-utils.cjs');

async function runBatchA() {
  console.log('=== STARTING BATCH A: 01-hero ===');

  const items = [
    {
      id: 'hero-01-toan-canh',
      file: '/images/01-hero/hero-01-toan-canh.webp',
      subDir: '01-hero',
      filename: 'hero-01-toan-canh.webp',
      place: 'Tràng An, Ninh Bình',
      alt: 'Toàn cảnh non nước Tràng An hùng vĩ nhìn từ trên cao, Ninh Bình',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vietnam,_Ninh_Binh,_Trang_An_Area.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Vietnam%2C_Ninh_Binh%2C_Trang_An_Area.jpg',
      author: 'Vyacheslav Argenberg',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
      isHero: true,
    },
    {
      id: 'hero-02-binh-minh',
      file: '/images/01-hero/hero-02-binh-minh.webp',
      subDir: '01-hero',
      filename: 'hero-02-binh-minh.webp',
      place: 'Ninh Hải, Tam Cốc, Ninh Bình',
      alt: 'Hoàng hôn buông trên rặng núi đá vôi Ninh Hải, Ninh Bình',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sunset_in_Ninh_H%E1%BA%A3i,_Ninh_Binh_province,_Vietnam,_20240202_1723_5411.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sunset_in_Ninh_H%E1%BA%A3i%2C_Ninh_Binh_province%2C_Vietnam%2C_20240202_1723_5411.jpg',
      author: 'Jakub Hałun',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
      isHero: true,
    },
    {
      id: 'hero-03-thuyen-nan',
      file: '/images/01-hero/hero-03-thuyen-nan.webp',
      subDir: '01-hero',
      filename: 'hero-03-thuyen-nan.webp',
      place: 'Tràng An, Ninh Bình',
      alt: 'Đoàn thuyền nan lướt giữa thung nước ngọc bích Tràng An',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Trang_An_Landscape_Complex,_Ninh_Binh_Province,_Vietnam,_20240202_1456_5313.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Trang_An_Landscape_Complex%2C_Ninh_Binh_Province%2C_Vietnam%2C_20240202_1456_5313.jpg',
      author: 'Jakub Hałun',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'gps', 'visual'],
      isHero: true,
    }
  ];

  for (const item of items) {
    console.log(`Processing: ${item.id}...`);
    const buffer = await downloadImage(item.imageUrl);
    const processed = await processImage(buffer, { isHero: true, targetWidth: 1920, maxKB: 400 });

    const destDir = path.join(PUBLIC_IMAGES_DIR, item.subDir);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const destPath = path.join(destDir, item.filename);
    fs.writeFileSync(destPath, processed.buffer);

    console.log(`Saved ${destPath}: ${processed.width}x${processed.height}, ${processed.sizeKB} KB (original: ${processed.originalWidth}x${processed.originalHeight})`);

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
  }

  console.log('=== BATCH A COMPLETED ===');
}

runBatchA().catch(err => {
  console.error('Batch A failed:', err);
  process.exit(1);
});
