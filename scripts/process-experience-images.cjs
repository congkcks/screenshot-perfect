const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.resolve(__dirname, '../public/assets/experiences');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function convertToWebp(inputPath, outputName, width = 1600, height = 1067, fit = 'cover', position = 'center') {
  const outputPath = path.join(OUT_DIR, outputName);
  console.log(`Processing ${inputPath} -> ${outputName}`);
  
  let pipeline = sharp(inputPath);
  const meta = await pipeline.metadata();
  console.log(`Input: ${meta.width}x${meta.height}, format: ${meta.format}`);
  
  await pipeline
    .resize(width, height, { fit, position })
    .webp({ quality: 85, effort: 4 })
    .toFile(outputPath);
    
  const outStat = fs.statSync(outputPath);
  console.log(`Output: ${outputPath} (${(outStat.size / 1024).toFixed(1)} KB)`);
}

async function run() {
  // 1. Boat trip
  await convertToWebp(
    path.resolve(__dirname, '../public/images/02-trang-an/trang-an-01-thuyen-xuyen-hang.webp'),
    'trai-nghiem-du-thuyen.webp'
  );

  // 2. Hiking Hang Mua
  await convertToWebp(
    path.resolve(__dirname, '../public/images/04-hang-mua/hang-mua-01-tuong-rong-dinh-nui.webp'),
    'trai-nghiem-leo-nui.webp',
    1600, 1067, 'cover', 'center'
  );

  // 3. Cycling Tam Coc
  await convertToWebp(
    path.resolve(__dirname, '../tmp_inspect/crop_ideal_bike.jpg'),
    'trai-nghiem-dap-xe.webp',
    1600, 1067, 'cover', 'center'
  );

  // 4. Photo hunt (Am Tien / Tuyet Tinh Coc)
  await convertToWebp(
    path.resolve(__dirname, '../tmp_inspect/am_tien_valley.jpg'),
    'trai-nghiem-san-anh.webp',
    1600, 1067, 'cover', 'center'
  );

  // 5. Wildlife (Vooc mong trang Van Long)
  await convertToWebp(
    path.resolve(__dirname, '../public/images/07-thung-nham-van-long/van-long-02-voc-mong-trang.webp'),
    'trai-nghiem-ngam-chim.webp',
    1600, 1067, 'cover', 'center'
  );

  // 6. Hot spring (Kenh Ga / Gia Vien)
  await convertToWebp(
    path.resolve(__dirname, '../public/images/07-thung-nham-van-long/van-long-01-thuyen-hoang-hon.webp'),
    'trai-nghiem-khoang-nong.webp',
    1600, 1067, 'cover', 'center'
  );

  // Universal Fallback
  await convertToWebp(
    path.resolve(__dirname, '../public/images/01-hero/hero-01-toan-canh.webp'),
    'trai-nghiem-fallback.webp',
    1600, 1067, 'cover', 'center'
  );

  console.log('All images processed successfully into public/assets/experiences!');
}

run().catch(console.error);
