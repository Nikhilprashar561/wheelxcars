const https = require('https');
const fs = require('fs');
const path = require('path');

const car1 = [
  'https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/775261313_4453132388307698_6747876319747383786_n.jpg?stp=dst-jpg_tt6&cstp=mx1240x2772&ctp=s1240x2772&_nc_cat=109&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=xkj7Qd18IZ4Q7kNvwEtriya&_nc_oc=Ado8Rf79VSAuNky4U5EYoz0rJBBFFlT3r701QkGvgZDqycD7wbtfIkEM-c7blk5uKq8&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=VPNIi9Xouqi5FbIorFG-HA&_nc_ss=7b2a8&oh=00_AQHVFDd9tR-mubNQaTYGachxNDOQYtpMpMKIYRHdDTEB2Q&oe=6A8B211D',
  'https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/775156571_4453132261641044_4959840427745693285_n.jpg?stp=dst-jpg_tt6&cstp=mx1240x2772&ctp=s1240x2772&_nc_cat=101&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=NP2mjcbmpE4Q7kNvwHbn73r&_nc_oc=AdqqaI3k14CQP3TgA0Zp1nhfBfdMFb4OYMZIs0oRbZvfFgY6SaYaLw6Ard9bySBiE7c&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=f5MDehHcknpAfsz-bSoHvg&_nc_ss=7b2a8&oh=00_AQEXpvUr3Mjly36i2zTWUy1269YVyiWrIOVhuOQFoydRjw&oe=6A8B0B4C',
];

const car2 = [
  'https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/778061216_2855635558126352_4009559534661350761_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=ClfUjHduM0MQ7kNvwFXAt7k&_nc_oc=AdpChYcTqlCQkqgTVWc9FtQSZ3kvBUk2dtQIDcd5yFcSi5P0h7rjefG2UQ7GBHZPkm0&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=bwEGXMYl-t0XyIrGZgoVkA&_nc_ss=7b2a8&oh=00_AQEqoKpJjOAiQ1fuWTMsjXolwQkHh8F2i7EC9lp3u2fg3A&oe=6A8B1646',
  'https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/775377429_2855635568126351_3183882611473441044_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=DbpX35ZsCaMQ7kNvwGASdYz&_nc_oc=Adpzm6AKiYgdxLrtWuF_jUmjgclF2KZm8G7c1-4Tdf0D27-OxXjTm_4Sn9gxjc-PlpI&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=2hu0gBbppdSou1y3fCoCUQ&_nc_ss=7b2a8&oh=00_AQGE8EYFCHfg9eI_g7FFW62Wv-uED92AAcCgVl6qxPeyzg&oe=6A8B0B55',
];

function downloadTemp(url, name) {
  return new Promise((resolve, reject) => {
    const dest = path.join(__dirname, '..', 'scratch', name);
    https.get(url, (res) => {
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  const scratchDir = path.join(__dirname, '..', 'scratch');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });
  await downloadTemp(car1[0], 'temp_car1_1.jpg');
  await downloadTemp(car1[1], 'temp_car1_2.jpg');
  await downloadTemp(car2[0], 'temp_car2_1.jpg');
  await downloadTemp(car2[1], 'temp_car2_2.jpg');
  console.log('Downloaded temp previews for identification');
}

run().catch(console.error);
