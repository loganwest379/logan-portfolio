// Generates the "file" preview shown for each project inside the Work folders.
// Usage: npm run previews
// For every src/app/work/projects/*.mdx with a `logo` and `brandColor`, writes
// public/images/previews/<slug>.png (544x368, shown at 272x184).
// Re-run after adding a project or changing its title, logo, or color.
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const ROOT = process.cwd();
const PROJECTS = path.join(ROOT, "src/app/work/projects");
const OUT = path.join(ROOT, "public/images/previews");
const W = 544;
const H = 368;

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Greedy word wrap by an approximate character budget. */
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[.,;:]?$/, "")}…`;
    return kept;
  }
  return lines;
}

function shade(hex, amount) {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) =>
    Math.max(0, Math.min(255, Math.round(v + (amount < 0 ? v : 255 - v) * amount))),
  );
  return `rgb(${c.join(",")})`;
}

await fs.mkdir(OUT, { recursive: true });
const files = (await fs.readdir(PROJECTS)).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const { data } = matter(await fs.readFile(path.join(PROJECTS, file), "utf8"));
  if (!data.logo || !data.brandColor) {
    console.log(`skip ${slug}: needs logo and brandColor`);
    continue;
  }

  const color = data.brandColor;
  // Logo and headline sit in the top half: that's the part that shows when the
  // files fan out of the folder. The top ~64px is covered by the file's name bar.
  const LOGO = 96;
  const logoTop = 82;
  const textX = 36 + LOGO + 24;
  const lines = wrap(data.title, 19, 3);
  const lineH = 36;
  const textTop = logoTop + LOGO / 2 - ((lines.length - 1) * lineH) / 2 + 11;

  const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${shade(color, 0.12)}"/>
        <stop offset="1" stop-color="${shade(color, -0.45)}"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.85" cy="0.1" r="0.8">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <circle cx="${W - 40}" cy="${H + 60}" r="190" fill="#ffffff" fill-opacity="0.06"/>
    <circle cx="${W - 10}" cy="${H + 90}" r="120" fill="#ffffff" fill-opacity="0.05"/>
    ${lines
      .map(
        (l, i) =>
          `<text x="${textX}" y="${textTop + i * lineH}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="29" font-weight="700" fill="#ffffff" letter-spacing="-0.4">${escape(l)}</text>`,
      )
      .join("\n")}
  </svg>`);

  const mask = Buffer.from(
    `<svg width="${LOGO}" height="${LOGO}"><rect width="${LOGO}" height="${LOGO}" rx="22" ry="22"/></svg>`,
  );
  const logo = await sharp(path.join(ROOT, "public", data.logo))
    .resize(LOGO, LOGO, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
  const ring = Buffer.from(
    `<svg width="${LOGO + 6}" height="${LOGO + 6}"><rect x="1.5" y="1.5" width="${LOGO + 3}" height="${LOGO + 3}" rx="24" ry="24" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="3"/></svg>`,
  );

  await sharp(background)
    .composite([
      { input: logo, left: 36, top: logoTop },
      { input: ring, left: 33, top: logoTop - 3 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, `${slug}.png`));
  console.log(`wrote public/images/previews/${slug}.png`);
}
