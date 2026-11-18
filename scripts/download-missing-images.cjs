const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NinhBinhTravelMiniApp/1.0 (edu contest; congvanvu0000@gmail.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function processImage(url, destPath, targetWidth = 1600) {
  console.log(`Downloading ${url}...`);
  const rawBuffer = await downloadBuffer(url);
  console.log(`Downloaded ${rawBuffer.length} bytes. Processing with sharp...`);

  // Ensure directory exists
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const processed = await sharp(rawBuffer)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(destPath);

  console.log(`Saved ${destPath}: ${processed.width}x${processed.height}, ${(processed.size / 1024).toFixed(1)} KB`);
  return processed;
}

async function run() {
  const publicDir = path.resolve(__dirname, '..', 'public', 'images');

  // 1. Đền Thái Vi (Thai Vi Temple)
  const thaiViUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/48/Thai_Vi_Temple.jpg';
  const thaiViDest = path.join(publicDir, '03-tam-coc-bich-dong', 'tam-coc-den-thai-vi.webp');
  await processImage(thaiViUrl, thaiViDest, 1600);

  // 2. Hồ Đồng Chương (Ho Dong Chuong)
  const dongChuongUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/HoDongChuong1.jpg';
  const dongChuongDest = path.join(publicDir, '08-cuc-phuong-thien-ha', 'ho-dong-chuong.webp');
  await processImage(dongChuongUrl, dongChuongDest, 1600);

  console.log('ALL IMAGES DOWNLOADED AND CONVERTED TO WEBP SUCCESSFULLY!');
}

run().catch(console.error);
