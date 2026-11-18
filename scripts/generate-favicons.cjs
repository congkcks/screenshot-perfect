const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Luxury SVG Favicon for NinhBinhTravel
// Colors: Deep Forest Green #244B3B, Warm Cream #F5F1E8, Champagne Gold #D6AD72
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#173428" />
      <stop offset="50%" stop-color="#244B3B" />
      <stop offset="100%" stop-color="#0F231B" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2D8A7" />
      <stop offset="50%" stop-color="#D6AD72" />
      <stop offset="100%" stop-color="#A67B38" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Rounded Squircle Luxury Badge -->
  <rect x="24" y="24" width="464" height="464" rx="108" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="12" />

  <!-- Inner delicate decorative frame -->
  <rect x="44" y="44" width="424" height="424" rx="90" fill="none" stroke="#D6AD72" stroke-width="2" stroke-opacity="0.4" />

  <!-- Mountain Silhouettes (Tràng An Karst Peaks) -->
  <path d="M120 360 L210 230 L270 310 L330 200 L410 360 Z" fill="#769477" fill-opacity="0.25" />
  <path d="M150 360 L240 250 L310 360 Z" fill="#D6AD72" fill-opacity="0.2" />

  <!-- Sinuous River Stream (Dòng Sông Ngô Đồng) -->
  <path d="M100 375 Q 190 350, 256 375 T 412 375" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" filter="url(#glow)" />
  <path d="M130 395 Q 210 375, 256 395 T 382 395" fill="none" stroke="#F5F1E8" stroke-width="3" stroke-opacity="0.6" stroke-linecap="round" />

  <!-- Iconic Letter "N" with Serif Elegance & Mountain Diagonal Peak -->
  <!-- Left Pillar -->
  <path d="M150 160 L185 160 L185 340 L150 340 Z" fill="url(#goldGrad)" filter="url(#glow)" />
  <!-- Left Serif top -->
  <path d="M136 160 L198 160 L198 172 L136 172 Z" fill="url(#goldGrad)" />
  <!-- Left Serif bottom -->
  <path d="M136 340 L198 340 L198 328 L136 328 Z" fill="url(#goldGrad)" />

  <!-- Right Pillar -->
  <path d="M327 160 L362 160 L362 340 L327 340 Z" fill="url(#goldGrad)" filter="url(#glow)" />
  <!-- Right Serif top -->
  <path d="M313 160 L376 160 L376 172 L313 172 Z" fill="url(#goldGrad)" />
  <!-- Right Serif bottom -->
  <path d="M313 340 L376 340 L376 328 L313 328 Z" fill="url(#goldGrad)" />

  <!-- Dynamic Diagonal (Carved Mountain Peak Slope) -->
  <polygon points="175,160 215,160 340,335 300,335" fill="#FAF8F4" filter="url(#glow)" />
  <polygon points="175,160 195,160 320,335 300,335" fill="url(#goldGrad)" />

  <!-- Shimmering Star at apex -->
  <circle cx="330" cy="180" r="10" fill="#FFFFFF" filter="url(#glow)" />
  <polygon points="330,162 334,176 348,180 334,184 330,198 326,184 312,180 326,176" fill="#F2D8A7" />
</svg>`;

async function run() {
  const publicDir = path.resolve(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  const applePath = path.join(publicDir, 'apple-touch-icon.png');
  const icoPath = path.join(publicDir, 'favicon.ico');
  const png32Path = path.join(publicDir, 'favicon-32x32.png');
  const png16Path = path.join(publicDir, 'favicon-16x16.png');

  // 1. Write favicon.svg
  fs.writeFileSync(svgPath, svgContent, 'utf-8');
  console.log('✓ Written', svgPath);

  // 2. Generate apple-touch-icon.png (180x180)
  const svgBuffer = Buffer.from(svgContent);
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(applePath);
  console.log('✓ Written', applePath);

  // 3. Generate favicon-32x32.png and 16x16.png
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(png32Path);
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(png16Path);

  // 4. Generate favicon.ico (using sharp with 48x48 png buffer packaged as ico)
  // A standard modern ICO file header + 48x48 PNG image
  const png48Buffer = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  
  // Create genuine ICO format wrapping PNG
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // 1 Image

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(48, 0); // Width 48
  icoEntry.writeUInt8(48, 1); // Height 48
  icoEntry.writeUInt8(0, 2);  // Color count
  icoEntry.writeUInt8(0, 3);  // Reserved
  icoEntry.writeUInt16LE(1, 4); // Color planes
  icoEntry.writeUInt16LE(32, 6); // Bits per pixel
  icoEntry.writeUInt32LE(png48Buffer.length, 8); // Size of image
  icoEntry.writeUInt32LE(22, 12); // Offset (6 header + 16 entry = 22)

  const finalIco = Buffer.concat([icoHeader, icoEntry, png48Buffer]);
  fs.writeFileSync(icoPath, finalIco);
  console.log('✓ Written', icoPath);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
