const { searchWikimedia, downloadImage, processImage, recordImage, PUBLIC_IMAGES_DIR } = require('./image-utils.cjs');
const fs = require('fs');
const path = require('path');

async function fixBatchD() {
  const items = [
    {
      query: 'Temple commémoratif de Le Hoan (Hoa Lu).jpg',
      id: 'hoa-lu-02-den-vua-le',
      file: '/images/06-co-do-hoa-lu/hoa-lu-02-den-vua-le.webp',
      subDir: '06-co-do-hoa-lu',
      filename: 'hoa-lu-02-den-vua-le.webp',
      place: 'Cố đô Hoa Lư, Ninh Bình',
      alt: 'Đền thờ Vua Lê Đại Hành tại quần thể Cố đô Hoa Lư',
    },
    {
      query: 'Codohoalu2010k3.jpg',
      id: 'hoa-lu-03-le-hoi-truong-yen',
      file: '/images/06-co-do-hoa-lu/hoa-lu-03-le-hoi-truong-yen.webp',
      subDir: '06-co-do-hoa-lu',
      filename: 'hoa-lu-03-le-hoi-truong-yen.webp',
      place: 'Cố đô Hoa Lư, Ninh Bình',
      alt: 'Lễ hội truyền thống Cố đô Hoa Lư Trường Yên',
    },
    {
      query: 'File:Nem chua.jpg',
      id: 'am-thuc-06-nem-chua-yen-mac',
      file: '/images/12-dac-san-am-thuc/am-thuc-06-nem-chua-yen-mac.webp',
      subDir: '12-dac-san-am-thuc',
      filename: 'am-thuc-06-nem-chua-yen-mac.webp',
      place: 'Ninh Bình (Minh họa)',
      alt: 'Đặc sản nem chua Yên Mạc ăn kèm lá ổi lá sung nước mắm tỏi ớt',
      illustrative: true,
    },
    {
      query: 'File:Bun Moc Ha Noi.jpg',
      id: 'am-thuc-04-bun-moc',
      file: '/images/12-dac-san-am-thuc/am-thuc-04-bun-moc.webp',
      subDir: '12-dac-san-am-thuc',
      filename: 'am-thuc-04-bun-moc.webp',
      place: 'Ninh Bình (Minh họa)',
      alt: 'Bát bún mọc sườn viên thơm ngọt nước dùng thanh trong',
      illustrative: true,
    }
  ];

  for (const it of items) {
    const res = await searchWikimedia(it.query, 1);
    if (!res || res.length === 0) {
      console.warn('Could not find:', it.query);
      continue;
    }
    const found = res[0];
    console.log(`Downloading ${it.id} from ${found.url}...`);
    const buffer = await downloadImage(found.url);
    const processed = await processImage(buffer, { isHero: false, targetWidth: 1600, maxKB: 300 });

    const destDir = path.join(PUBLIC_IMAGES_DIR, it.subDir);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const destPath = path.join(destDir, it.filename);
    fs.writeFileSync(destPath, processed.buffer);

    console.log(` -> Saved ${it.filename}: ${processed.width}x${processed.height}, ${processed.sizeKB} KB`);

    const record = {
      id: it.id,
      file: it.file,
      place: it.place,
      alt: it.alt,
      sourceUrl: found.sourcePage,
      author: found.artist,
      license: found.license,
      licenseUrl: found.licenseUrl,
      attributionRequired: found.license !== 'CC0' && found.license !== 'Public domain',
      illustrative: Boolean(it.illustrative),
      verifiedBy: it.illustrative ? ['visual'] : ['category', 'visual'],
      width: processed.width,
      height: processed.height,
      sizeKB: processed.sizeKB,
    };

    recordImage(record);
    await new Promise(r => setTimeout(r, 600));
  }

  console.log('=== FIX BATCH D DONE ===');
}

fixBatchD().catch(e => {
  console.error(e);
  process.exit(1);
});
