const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const USER_AGENT = 'NinhBinhTravelPhotoBot/1.0 (edu contest; contact@ninhbinhtravel.vn)';

const PUBLIC_IMAGES_DIR = path.resolve(__dirname, '../public/images');
const MANIFEST_PATH = path.join(PUBLIC_IMAGES_DIR, 'manifest.json');
const CREDITS_PATH = path.join(PUBLIC_IMAGES_DIR, 'CREDITS.md');

/**
 * Download an image from URL and return Buffer
 */
async function downloadImage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Process image with sharp: check landscape, minimum width, compress to WebP <= limitKB
 */
async function processImage(inputBuffer, options = {}) {
  const {
    isHero = false,
    targetWidth = isHero ? 1920 : 1600,
    maxKB = isHero ? 400 : 300,
  } = options;

  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Could not read image dimensions');
  }

  // Check landscape orientation
  if (metadata.width < metadata.height) {
    console.warn(`Warning: Image is portrait (${metadata.width}x${metadata.height})`);
  }

  // Check minimum dimension
  if (metadata.width < 1200) {
    throw new Error(`Image width ${metadata.width} is below minimum 1200px`);
  }

  // Determine resize dimensions
  let resizeWidth = metadata.width;
  if (metadata.width > targetWidth) {
    resizeWidth = targetWidth;
  }

  let quality = 80;
  let currentWidth = resizeWidth;
  let outputBuffer;

  while (quality >= 35) {
    let pipeline = sharp(inputBuffer);
    if (metadata.width > currentWidth) {
      pipeline = pipeline.resize({ width: Math.round(currentWidth), withoutEnlargement: true });
    }
    outputBuffer = await pipeline
      .webp({ quality, effort: 4 })
      .toBuffer();

    const sizeKB = outputBuffer.length / 1024;
    if (sizeKB <= maxKB) {
      break;
    }
    quality -= 5;
    if (quality < 50 && sizeKB > maxKB && currentWidth > 1200) {
      currentWidth *= 0.92;
    }
  }

  const finalMeta = await sharp(outputBuffer).metadata();
  const finalSizeKB = Math.round(outputBuffer.length / 1024);

  return {
    buffer: outputBuffer,
    width: finalMeta.width,
    height: finalMeta.height,
    sizeKB: finalSizeKB,
    originalWidth: metadata.width,
    originalHeight: metadata.height,
  };
}

/**
 * Append or update record in manifest.json and CREDITS.md
 */
function recordImage(entry) {
  let manifest = [];
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    } catch (e) {
      manifest = [];
    }
  }

  const existingIndex = manifest.findIndex(m => m.id === entry.id);
  if (existingIndex >= 0) {
    manifest[existingIndex] = entry;
  } else {
    manifest.push(entry);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');

  // Update CREDITS.md
  updateCreditsFile(manifest);
}

function updateCreditsFile(manifest) {
  let lines = [
    '# GHI CÔNG BẢN QUYỀN HÌNH ẢNH (IMAGE CREDITS) - NINH BINH TRAVEL',
    '',
    'Danh sách bản quyền hình ảnh sử dụng từ Wikimedia Commons, Unsplash, Pexels và Pixabay tuân thủ đúng giấy phép tự do (CC0, Public Domain, CC BY, CC BY-SA).',
    '',
    '| STT | Mã ảnh | Địa điểm / Tên | Tác giả | Giấy phép | Nguồn gốc |',
    '|---|---|---|---|---|---|',
  ];

  manifest.forEach((m, idx) => {
    const author = m.author || 'Đang cập nhật';
    const license = m.licenseUrl ? `[${m.license}](${m.licenseUrl})` : m.license;
    const source = m.sourceUrl ? `[Nguồn](${m.sourceUrl})` : 'N/A';
    lines.push(`| ${idx + 1} | \`${m.id}\` | ${m.place} | ${author} | ${license} | ${source} |`);
  });

  lines.push('');
  fs.writeFileSync(CREDITS_PATH, lines.join('\n'), 'utf-8');
}

/**
 * Search Wikimedia Commons
 */
async function searchWikimedia(query, limit = 10) {
  const encQuery = encodeURIComponent(query);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encQuery}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|size|extmetadata`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`Wikimedia API error: ${res.status}`);
  const data = await res.json();
  if (!data.query || !data.query.pages) return [];

  return Object.values(data.query.pages).map(p => {
    const info = p.imageinfo?.[0] || {};
    const meta = info.extmetadata || {};
    const artist = meta.Artist ? meta.Artist.value.replace(/<[^>]+>/g, '').trim() : 'Unknown';
    const license = meta.LicenseShortName ? meta.LicenseShortName.value : 'Unknown';
    const licenseUrl = meta.LicenseUrl ? meta.LicenseUrl.value : '';
    const desc = meta.ImageDescription ? meta.ImageDescription.value.replace(/<[^>]+>/g, '').trim() : '';
    const lat = meta.GPSLatitude ? parseFloat(meta.GPSLatitude.value) : null;
    const lon = meta.GPSLongitude ? parseFloat(meta.GPSLongitude.value) : null;
    return {
      title: p.title,
      url: info.url,
      width: info.width,
      height: info.height,
      artist,
      license,
      licenseUrl,
      description: desc,
      lat,
      lon,
      sourcePage: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`
    };
  });
}

/**
 * Search Wikimedia Category
 */
async function searchWikimediaCategory(category, limit = 20) {
  const encCat = encodeURIComponent(category);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=categorymembers&gcmtitle=${encCat}&gcmnamespace=6&gcmlimit=${limit}&prop=imageinfo&iiprop=url|size|extmetadata`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`Wikimedia API category error: ${res.status}`);
  const data = await res.json();
  if (!data.query || !data.query.pages) return [];

  return Object.values(data.query.pages).map(p => {
    const info = p.imageinfo?.[0] || {};
    const meta = info.extmetadata || {};
    const artist = meta.Artist ? meta.Artist.value.replace(/<[^>]+>/g, '').trim() : 'Unknown';
    const license = meta.LicenseShortName ? meta.LicenseShortName.value : 'Unknown';
    const licenseUrl = meta.LicenseUrl ? meta.LicenseUrl.value : '';
    const desc = meta.ImageDescription ? meta.ImageDescription.value.replace(/<[^>]+>/g, '').trim() : '';
    const lat = meta.GPSLatitude ? parseFloat(meta.GPSLatitude.value) : null;
    const lon = meta.GPSLongitude ? parseFloat(meta.GPSLongitude.value) : null;
    return {
      title: p.title,
      url: info.url,
      width: info.width,
      height: info.height,
      artist,
      license,
      licenseUrl,
      description: desc,
      lat,
      lon,
      sourcePage: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`
    };
  });
}

module.exports = {
  downloadImage,
  processImage,
  recordImage,
  searchWikimedia,
  searchWikimediaCategory,
  PUBLIC_IMAGES_DIR,
  MANIFEST_PATH,
  CREDITS_PATH,
};
