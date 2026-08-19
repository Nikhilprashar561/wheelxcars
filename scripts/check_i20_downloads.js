const sharp = require('sharp');
const path = require('path');

const files = [
  'C:/Users/nikhi/Downloads/WhatsApp Image 2026-08-19 at 9.48.40 AM.jpeg',
  'C:/Users/nikhi/Downloads/WhatsApp Image 2026-08-19 at 9.49.00 AM.jpeg',
  'C:/Users/nikhi/Downloads/WhatsApp Image 2026-08-19 at 9.49.55 AM.jpeg',
];

async function check() {
  for (const f of files) {
    const meta = await sharp(f).metadata();
    console.log(`${path.basename(f)}: width=${meta.width}, height=${meta.height}, format=${meta.format}`);
  }
}

check().catch(console.error);
