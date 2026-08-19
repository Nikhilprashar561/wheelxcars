const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '..', 'public', 'cars', 'mahindra-bolero');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function restoreAndEnhanceImages() {
  const images = [
    {
      src: 'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533421.jpg',
      dest: 'bolero-1.jpg',
    },
    {
      src: 'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533430.jpg',
      dest: 'bolero-2.jpg',
    },
    {
      src: 'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533437.jpg',
      dest: 'bolero-3.jpg',
    },
  ];

  for (const img of images) {
    // Subtle unsharp mask for crispness & clarity without artificial artifacts
    await sharp(img.src)
      .sharpen({ sigma: 0.8, m1: 1.0, m2: 1.5 })
      .jpeg({
        quality: 96,
        chromaSubsampling: '4:4:4',
        trellisQuantisation: true,
        overshootDeringing: true,
        mozjpeg: true,
      })
      .toFile(path.join(outputDir, img.dest));
    
    console.log(`Restored original and enhanced: ${img.dest}`);
  }
}

restoreAndEnhanceImages().catch(console.error);
