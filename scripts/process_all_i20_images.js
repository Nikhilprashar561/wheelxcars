const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '..', 'public', 'cars', 'hyundai-i20');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processAllI20Images() {
  // Let's set the front view as the primary car image (i20-1.jpg), and the two rear views as i20-2 and i20-3
  const images = [
    {
      src: 'C:/Users/nikhi/Downloads/WhatsApp Image 2026-08-19 at 9.49.55 AM.jpeg', // Front view
      dest: 'i20-1.jpg',
    },
    {
      src: 'C:/Users/nikhi/Downloads/WhatsApp Image 2026-08-19 at 9.48.40 AM.jpeg', // Rear close view
      dest: 'i20-2.jpg',
    },
    {
      src: 'C:/Users/nikhi/Downloads/WhatsApp Image 2026-08-19 at 9.49.00 AM.jpeg', // Rear wide view
      dest: 'i20-3.jpg',
    },
  ];

  for (const img of images) {
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
    
    console.log(`Processed and saved: ${img.dest}`);
  }
}

processAllI20Images().catch(console.error);
