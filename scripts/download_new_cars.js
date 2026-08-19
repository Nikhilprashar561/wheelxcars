const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const carOneImages = [
  'https://res.cloudinary.com/da9c3vejh/image/upload/v1787118784/swift_4_odxrrt.jpg',
  'https://res.cloudinary.com/da9c3vejh/image/upload/v1787118778/swift_3_o1z2xn.jpg',
  'https://res.cloudinary.com/da9c3vejh/image/upload/v1787118767/swift_2_gfx77n.jpg',
  'https://res.cloudinary.com/da9c3vejh/image/upload/v1787118763/swift_1_ocyuwc.jpg',
];

const carTwoImages = [
  'https://res.cloudinary.com/da9c3vejh/image/upload/v1787119089/v1_onxj8x.jpg',
  'https://res.cloudinary.com/da9c3vejh/image/upload/v1787119093/v2_wdgxt1.jpg',
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(resolve);
      });
    }).on('error', reject);
  });
}

async function run() {
  const dirOne = path.join(__dirname, '..', 'public', 'cars', 'maruti-swift');
  const dirTwo = path.join(__dirname, '..', 'public', 'cars', 'car-two');
  if (!fs.existsSync(dirOne)) fs.mkdirSync(dirOne, { recursive: true });
  if (!fs.existsSync(dirTwo)) fs.mkdirSync(dirTwo, { recursive: true });

  console.log('Downloading Car One (Swift)...');
  for (let i = 0; i < carOneImages.length; i++) {
    const dest = path.join(dirOne, `swift-${i + 1}.jpg`);
    await downloadFile(carOneImages[i], dest);
    const meta = await sharp(dest).metadata();
    console.log(`Swift img ${i + 1}: ${meta.width}x${meta.height}`);
  }

  console.log('Downloading Car Two...');
  for (let i = 0; i < carTwoImages.length; i++) {
    const dest = path.join(dirTwo, `car2-${i + 1}.jpg`);
    await downloadFile(carTwoImages[i], dest);
    const meta = await sharp(dest).metadata();
    console.log(`Car 2 img ${i + 1}: ${meta.width}x${meta.height}`);
  }
  console.log('Done downloading!');
}

run().catch(console.error);
