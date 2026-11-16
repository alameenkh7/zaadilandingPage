#!/usr/bin/env node
/**
 * Generates QR PNGs in public/qr/
 * Run: node scripts/generate-app-qr.mjs
 * Requires: npm install qrcode --save-dev
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'qr');

const targets = {
  'app-store-qr.png': 'https://apps.apple.com/in/app/platio-meals/id6827652613',
  'google-play-qr.png':
    'https://play.google.com/store/apps/details?id=com.platio.kitchen',
};

async function main() {
  let QRCode;
  try {
    QRCode = (await import('qrcode')).default;
  } catch {
    console.error('Install qrcode first: npm install qrcode --save-dev');
    process.exit(1);
  }

  await mkdir(outDir, { recursive: true });
  for (const [file, url] of Object.entries(targets)) {
    const png = await QRCode.toBuffer(url, {
      type: 'png',
      width: 512,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#1B1614', light: '#FFFFFF' },
    });
    await writeFile(join(outDir, file), png);
    console.log('Wrote public/qr/' + file, '→', url);
  }
}

main();