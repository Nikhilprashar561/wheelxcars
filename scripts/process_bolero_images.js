const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '..', 'public', 'cars', 'mahindra-bolero');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const img1Path = 'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533421.jpg';
  const img2Path = 'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533430.jpg';
  const img3Path = 'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533437.jpg';

  // 1. Image 1 (media_1787113533421.jpg - 533 x 494)
  const svgPlate1 = Buffer.from(`
    <svg width="533" height="494" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#e2e2e2"/>
        </linearGradient>
      </defs>
      <!-- Clean plate over bottom-left bumper plate area -->
      <g transform="translate(6, 400) rotate(8)">
        <rect x="0" y="0" width="48" height="24" rx="2" fill="url(#g1)" stroke="#111" stroke-width="1.2"/>
        <rect x="1" y="1" width="5" height="22" fill="#003399" rx="0.8"/>
        <text x="27" y="15" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-weight="900" font-size="6.5" fill="#000000" text-anchor="middle" letter-spacing="0.2px">wheelxcars</text>
      </g>
    </svg>
  `);

  await sharp(img1Path)
    .composite([{ input: svgPlate1, top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, 'bolero-1.jpg'));

  // 2. Image 2 (media_1787113533430.jpg - 527 x 551)
  const svgPlate2 = Buffer.from(`
    <svg width="527" height="551" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#eeeeee"/>
        </linearGradient>
        <filter id="shadow2" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.3"/>
        </filter>
      </defs>
      <g transform="translate(191, 410)" filter="url(#shadow2)">
        <rect x="0" y="0" width="166" height="46" rx="4" fill="url(#g2)" stroke="#1a1a1a" stroke-width="2"/>
        <rect x="3" y="3" width="15" height="40" fill="#003893" rx="2"/>
        <circle cx="10.5" cy="14" r="3.5" fill="#ffcc00"/>
        <text x="10.5" y="34" font-family="Arial, sans-serif" font-weight="bold" font-size="7" fill="#ffffff" text-anchor="middle">IND</text>
        <text x="94" y="30" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-weight="900" font-size="19" fill="#111111" text-anchor="middle" letter-spacing="1.2px">wheelxcars</text>
      </g>
    </svg>
  `);

  await sharp(img2Path)
    .composite([{ input: svgPlate2, top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, 'bolero-2.jpg'));

  // 3. Image 3 (media_1787113533437.jpg - 533 x 603)
  const svgPlate3 = Buffer.from(`
    <svg width="533" height="603" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#eeeeee"/>
        </linearGradient>
        <filter id="shadow3" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.3"/>
        </filter>
      </defs>
      <g transform="translate(191, 506)" filter="url(#shadow3)">
        <rect x="0" y="0" width="144" height="38" rx="3.5" fill="url(#g3)" stroke="#1a1a1a" stroke-width="1.8"/>
        <rect x="2.5" y="2.5" width="12" height="33" fill="#003893" rx="1.5"/>
        <circle cx="8.5" cy="11" r="2.8" fill="#ffcc00"/>
        <text x="8.5" y="27" font-family="Arial, sans-serif" font-weight="bold" font-size="5.5" fill="#ffffff" text-anchor="middle">IND</text>
        <text x="80" y="25" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-weight="900" font-size="16" fill="#111111" text-anchor="middle" letter-spacing="1px">wheelxcars</text>
      </g>
    </svg>
  `);

  await sharp(img3Path)
    .composite([{ input: svgPlate3, top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, 'bolero-3.jpg'));

  console.log('Successfully masked all 3 images with high-resolution "wheelxcars" plates.');
}

processImages().catch(console.error);
