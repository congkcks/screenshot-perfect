const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const MANIFEST_PATH = path.join(IMAGES_DIR, 'manifest.json');
const DATA_FILE = path.join(ROOT_DIR, 'src/data/ninh-binh.ts');

console.log('=== RUNNING IMAGE AUDIT SCRIPT ===');

let hasError = false;

// 1. Read manifest
if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('FAIL: manifest.json does not exist!');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
console.log(`Manifest loaded: ${manifest.length} entries.`);

// 2. Check all files in manifest exist and size <= 400KB
manifest.forEach(item => {
  const relPath = item.file.startsWith('/') ? item.file.slice(1) : item.file;
  const fullPath = path.join(PUBLIC_DIR, relPath);

  if (!fs.existsSync(fullPath)) {
    console.error(`FAIL: File in manifest does not exist on disk: ${fullPath}`);
    hasError = true;
  } else {
    const stats = fs.statSync(fullPath);
    const sizeKB = Math.round(stats.size / 1024);
    const maxKB = item.id.startsWith('hero-') ? 400 : 300;
    if (sizeKB > maxKB) {
      console.error(`FAIL: File ${item.file} is ${sizeKB}KB (limit: ${maxKB}KB)`);
      hasError = true;
    }
  }
});

// 3. Check all webp files in public/images exist in manifest
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (file.endsWith('.webp')) {
      results.push(filePath);
    }
  });
  return results;
}

const diskWebpFiles = getFilesRecursively(IMAGES_DIR);
console.log(`Found ${diskWebpFiles.length} WebP files on disk in public/images/`);

diskWebpFiles.forEach(fp => {
  const relToPublic = '/' + path.relative(PUBLIC_DIR, fp).replace(/\\/g, '/');
  const found = manifest.find(m => m.file === relToPublic);
  if (!found) {
    console.error(`FAIL: WebP file on disk not in manifest: ${relToPublic}`);
    hasError = true;
  }
});

// 4. Check all local image references in src/data/ninh-binh.ts exist in public/
const dataContent = fs.readFileSync(DATA_FILE, 'utf-8');
const localImageMatches = [...dataContent.matchAll(/"(\/images\/[^"]+)"/g)];
console.log(`Found ${localImageMatches.length} references to /images/ in src/data/ninh-binh.ts`);

localImageMatches.forEach(m => {
  const imgUrl = m[1];
  const diskPath = path.join(PUBLIC_DIR, imgUrl.slice(1));
  if (!fs.existsSync(diskPath)) {
    console.error(`FAIL: Path referenced in ninh-binh.ts does not exist: ${imgUrl}`);
    hasError = true;
  }
});

if (hasError) {
  console.error('=== AUDIT FAILED WITH ERRORS ===');
  process.exit(1);
} else {
  console.log('=== ALL IMAGE AUDIT CHECKS PASSED 100%! ===');
}
