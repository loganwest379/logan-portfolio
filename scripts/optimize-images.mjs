// Shrinks oversized photos in public/images so the site stays fast.
// Usage: npm run optimize-images
// Resizes any JPEG/PNG wider or taller than MAX px (keeps aspect ratio) and
// re-encodes it in place. Images already small enough are left untouched.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const MAX = 2560;
const exts = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (exts.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

let changed = 0;
for await (const file of walk(ROOT)) {
  const { width = 0, height = 0 } = await sharp(file).metadata();
  if (Math.max(width, height) <= MAX) continue;

  const before = (await fs.stat(file)).size;
  const pipeline = sharp(file).rotate().resize(MAX, MAX, { fit: "inside" });
  const buffer = /\.png$/i.test(file)
    ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
    : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await fs.writeFile(file, buffer);
  changed++;
  console.log(
    `${path.relative(process.cwd(), file)}: ${width}x${height} ${(before / 1e6).toFixed(1)}MB -> ${(buffer.length / 1e6).toFixed(1)}MB`,
  );
}
console.log(changed ? `Optimized ${changed} image(s).` : "All images are already web-sized.");
