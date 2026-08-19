const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processNewCars() {
  const dirRS = path.join(__dirname, '..', 'public', 'cars', 'maruti-swift-rs');
  const dirVDi = path.join(__dirname, '..', 'public', 'cars', 'maruti-swift-vdi');
  if (!fs.existsSync(dirRS)) fs.mkdirSync(dirRS, { recursive: true });
  if (!fs.existsSync(dirVDi)) fs.mkdirSync(dirVDi, { recursive: true });

  // 1. Maruti Swift RS
  // Make swift-4 (3/4 front view) the primary cover image, followed by front, rear-3/4, rear
  const rsImages = [
    { src: 'public/cars/maruti-swift/swift-4.jpg', dest: 'swift-1.jpg' }, // 3/4 front
    { src: 'public/cars/maruti-swift/swift-2.jpg', dest: 'swift-2.jpg' }, // direct front
    { src: 'public/cars/maruti-swift/swift-1.jpg', dest: 'swift-3.jpg' }, // rear 3/4
    { src: 'public/cars/maruti-swift/swift-3.jpg', dest: 'swift-4.jpg' }, // direct rear
  ];

  for (const item of rsImages) {
    await sharp(path.join(__dirname, '..', item.src))
      .sharpen({ sigma: 0.8, m1: 1.0, m2: 1.5 })
      .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
      .toFile(path.join(dirRS, item.dest));
    console.log(`Saved RS: ${item.dest}`);
  }

  // 2. Maruti Swift VDi
  const vdiImages = [
    { src: 'public/cars/car-two/car2-1.jpg', dest: 'swift-vdi-1.jpg' }, // front
    { src: 'public/cars/car-two/car2-2.jpg', dest: 'swift-vdi-2.jpg' }, // side profile
  ];

  for (const item of vdiImages) {
    await sharp(path.join(__dirname, '..', item.src))
      .sharpen({ sigma: 0.8, m1: 1.0, m2: 1.5 })
      .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
      .toFile(path.join(dirVDi, item.dest));
    console.log(`Saved VDi: ${item.dest}`);
  }
}

processNewCars().catch(console.error);
