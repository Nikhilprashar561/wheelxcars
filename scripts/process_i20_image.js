const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '..', 'public', 'cars', 'hyundai-i20');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processI20() {
  const src = 'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787115574561.jpg';
  
  const meta = await sharp(src).metadata();
  console.log(`i20 image metadata: width ${meta.width}, height ${meta.height}`);

  await sharp(src)
    .sharpen({ sigma: 0.8, m1: 1.0, m2: 1.5 })
    .jpeg({
      quality: 96,
      chromaSubsampling: '4:4:4',
      trellisQuantisation: true,
      overshootDeringing: true,
      mozjpeg: true,
    })
    .toFile(path.join(outputDir, 'i20-1.jpg'));

  console.log('Successfully enhanced and saved i20-1.jpg');
}

processI20().catch(console.error);
