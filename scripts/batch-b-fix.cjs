const fs = require('fs');
const path = require('path');
const { downloadImage, processImage, recordImage, PUBLIC_IMAGES_DIR } = require('./image-utils.cjs');

async function fixBatchB() {
  const items = [
    {
      id: 'tam-coc-02-lua-chin-vang',
      file: '/images/03-tam-coc-bich-dong/tam-coc-02-lua-chin-vang.webp',
      subDir: '03-tam-coc-bich-dong',
      filename: 'tam-coc-02-lua-chin-vang.webp',
      place: 'Tam Cốc – Bích Động, Ninh Bình',
      alt: 'Cánh đồng lúa chín vàng óng đôi bờ sông Ngô Đồng, Tam Cốc',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rice_plantation_in_Tam_Coc_-_August_2023.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Rice_plantation_in_Tam_Coc_-_August_2023.jpg',
      author: 'Anass Sedrati',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'hang-mua-02-bac-da-van-ly-truong-thanh',
      file: '/images/04-hang-mua/hang-mua-02-bac-da-van-ly-truong-thanh.webp',
      subDir: '04-hang-mua',
      filename: 'hang-mua-02-bac-da-van-ly-truong-thanh.webp',
      place: 'Hang Múa, Ninh Bình',
      alt: 'Gần 500 bậc đá uốn lượn như Vạn Lý Trường Thành thu nhỏ tại Hang Múa',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:View_from_Hang_Mua.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/View_from_Hang_Mua.jpg',
      author: 'Shyamal',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'bai-dinh-01-bao-thap',
      file: '/images/05-chua-bai-dinh/bai-dinh-01-bao-thap.webp',
      subDir: '05-chua-bai-dinh',
      filename: 'bai-dinh-01-bao-thap.webp',
      place: 'Chùa Bái Đính, Ninh Bình',
      alt: 'Bảo tháp 13 tầng cao 100m uy nghiêm tại Chùa Bái Đính',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bai_Dinh_Pagoda_(36519413585).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Bai_Dinh_Pagoda_%2836519413585%29.jpg',
      author: 'Felix Nagel',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'hoa-lu-01-den-vua-dinh',
      file: '/images/06-co-do-hoa-lu/hoa-lu-01-den-vua-dinh.webp',
      subDir: '06-co-do-hoa-lu',
      filename: 'hoa-lu-01-den-vua-dinh.webp',
      place: 'Cố đô Hoa Lư, Ninh Bình',
      alt: 'Nghi môn ngoại và sân đền thờ Vua Đinh Tiên Hoàng, Cố đô Hoa Lư',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dinh_Bo_Linh_Shrine,_Hoa_L%C6%B0,_Ninh_B%C3%ACnh,_Vietnam,_20240203_1502_5693.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Dinh_Bo_Linh_Shrine%2C_Hoa_L%C6%B0%2C_Ninh_B%C3%ACnh%2C_Vietnam%2C_20240203_1502_5693.jpg',
      author: 'Jakub Hałun',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'gps', 'visual'],
    }
  ];

  for (const item of items) {
    console.log(`Downloading & Processing: ${item.id}...`);
    const buffer = await downloadImage(item.imageUrl);
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

  console.log('=== BATCH B FIX COMPLETED ===');
}

fixBatchB().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
