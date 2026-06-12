const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const assetsDir = path.join(__dirname, '..', 'assets');
    if (!fs.existsSync(assetsDir)) {
      console.error('Assets directory not found:', assetsDir);
      process.exit(1);
    }

    const files = fs.readdirSync(assetsDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
    console.log('Found images to optimize:', files);

    for (const file of files) {
      const input = path.join(assetsDir, file);
      const name = path.parse(file).name;
      const avifOut = path.join(assetsDir, `${name}.avif`);
      const webpOut = path.join(assetsDir, `${name}.webp`);

      console.log(`Generating ${avifOut} and ${webpOut} from ${file}`);

      await sharp(input)
        .avif({ quality: 60 })
        .toFile(avifOut);

      await sharp(input)
        .webp({ quality: 75 })
        .toFile(webpOut);
    }

    // generate a 32x32 favicon.ico from the first image (if present)
    if (files.length > 0) {
      const first = path.join(assetsDir, files[0]);
      const icoOut = path.join(assetsDir, 'favicon.ico');
      await sharp(first).resize(32, 32).toFile(icoOut);
      console.log('Generated favicon.ico');
    }

    console.log('Image optimization complete.');
  } catch (err) {
    console.error('Error optimizing images:', err);
    process.exit(1);
  }
})();
