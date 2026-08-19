const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533421.jpg',
  'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533430.jpg',
  'C:/Users/nikhi/.gemini/antigravity/brain/1ecd2374-d5e0-40fc-bacb-085c140d770b/.user_uploaded/media_1787113533437.jpg'
];

async function inspect() {
  for (let i = 0; i < images.length; i++) {
    const meta = await sharp(images[i]).metadata();
    console.log(`Image ${i + 1}: ${path.basename(images[i])} - width: ${meta.width}, height: ${meta.height}`);
  }
}

inspect();
