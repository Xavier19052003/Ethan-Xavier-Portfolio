import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const source = new URL('../src/assets/originals/', import.meta.url)
const output = new URL('../public/images/', import.meta.url)
await mkdir(output, { recursive: true })

// A portrait crop from the original, without retouching or colour changes.
for (const width of [375, 750]) {
  await sharp(fileURLToPath(new URL('ethan-xavier.jpeg', source)))
    .rotate().extract({ left: 100, top: 250, width: 750, height: 1000 })
    .resize({ width }).webp({ quality: 85 })
    .toFile(fileURLToPath(new URL(`ethan-xavier-${width}.webp`, output)))
}

// The supplied PNG is already transparent. Trim only transparent margins.
const { data, info } = await sharp(fileURLToPath(new URL('exp-logo.png', source))).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
let left = info.width, top = info.height, right = 0, bottom = 0
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * 4 + 3] > 0) {
      left = Math.min(left, x); right = Math.max(right, x)
      top = Math.min(top, y); bottom = Math.max(bottom, y)
    }
  }
}
const crop = { left, top, width: right - left + 1, height: bottom - top + 1 }
const logo = await sharp(data, { raw: info }).extract(crop).png().toBuffer()
await sharp(logo).resize({ width: 320 }).png().toFile(fileURLToPath(new URL('exp-logo.png', output)))
for (const size of [32, 48, 180]) {
  await sharp(logo).resize(size - 4, size - 4, { fit: 'contain', background: '#faf9f6' })
    .flatten({ background: '#faf9f6' }).extend({ top: 2, bottom: 2, left: 2, right: 2, background: '#faf9f6' })
    .png().toFile(fileURLToPath(new URL(`exp-icon-${size}.png`, output)))
}
console.log('Created responsive portrait, transparent EXP logo, and 32/48/180px icons.')
