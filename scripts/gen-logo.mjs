import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const PIXEL_FONT = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "11110", "10001", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "11110", "10000", "10000", "10000", "11111"],
  F: ["11111", "10000", "11110", "10000", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "11111", "10001", "10001", "10001", "10001"],
  I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
  "!": ["00100", "00100", "00100", "00100", "00100", "00000", "00100"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
};

function pixelText(text, scale, fill, outline) {
  const rects = [];
  let x = 0;
  const glyphW = 5 * scale;
  const gap = scale;
  for (const ch of text.toUpperCase()) {
    const glyph = PIXEL_FONT[ch] ?? PIXEL_FONT[" "];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (glyph[row][col] === "1") {
          if (outline) {
            for (const [dx, dy] of [
              [-1, 0], [1, 0], [0, -1], [0, 1],
              [-1, -1], [1, -1], [-1, 1], [1, 1],
            ]) {
              rects.push(
                `<rect x="${x + col * scale + dx * scale}" y="${row * scale + dy * scale}" width="${scale}" height="${scale}" fill="${outline}"/>`
              );
            }
          }
          rects.push(
            `<rect x="${x + col * scale}" y="${row * scale}" width="${scale}" height="${scale}" fill="${fill}"/>`
          );
        }
      }
    }
    x += glyphW + gap;
  }
  return { rects, width: x - gap };
}

function iconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#1a1a1a"/>
  <rect x="4" y="4" width="56" height="56" fill="none" stroke="#ffd700" stroke-width="4"/>
  <g transform="rotate(-45 32 39)">
    <rect x="16" y="34" width="32" height="10" fill="#ffffff" stroke="#000000" stroke-width="2"/>
    <rect x="18" y="36" width="2" height="6" fill="#c9a227"/>
    <rect x="22" y="36" width="2" height="6" fill="#c9a227"/>
    <rect x="44" y="34" width="4" height="10" fill="#ff8800" stroke="#000000" stroke-width="2"/>
  </g>
  <path d="M16 16 L48 48 M48 16 L16 48" stroke="#e52521" stroke-width="8"/>
</svg>`;
}

function ogSvg() {
  const w = 1200;
  const h = 630;
  const title = pixelText("F-SMOKE", 10, "#ffd700", "#000000");
  const subtitle = pixelText("GAME BERHENTI MEROKOK", 5, "#ffffff", "#000000");
  const titleX = (w - title.width) / 2;
  const subtitleX = (w - subtitle.width) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#6ab8ff"/>
  <g fill="#ffffff">
    <rect x="80" y="60" width="120" height="30"/>
    <rect x="200" y="40" width="60" height="50"/>
    <rect x="260" y="70" width="90" height="20"/>
    <rect x="930" y="90" width="150" height="30"/>
    <rect x="1000" y="60" width="80" height="60"/>
    <rect x="1080" y="90" width="60" height="30"/>
  </g>
  <g transform="translate(472, 130) scale(4)">
    ${iconSvg(64).replace(/<svg[^>]*>|<\/svg>/g, "")}
  </g>
  <g transform="translate(${titleX}, 300)">
    ${title.rects.join("")}
  </g>
  <g transform="translate(${subtitleX}, 400)">
    ${subtitle.rects.join("")}
  </g>
  <rect x="0" y="520" width="${w}" height="60" fill="#00a800"/>
  <rect x="0" y="580" width="${w}" height="50" fill="#8a5a2b"/>
  <rect x="0" y="580" width="${w}" height="8" fill="#000000"/>
  ${[...Array(8).keys()]
    .map((i) => `<rect x="${70 + i * 150}" y="600" width="60" height="8" fill="#000000"/>`)
    .join("")}
  <rect x="0" y="520" width="${w}" height="8" fill="#000000"/>
</svg>`;
}

async function main() {
  const icon = sharp(Buffer.from(iconSvg(512))).png();
  const iconPng = await icon.toBuffer();
  mkdirSync(join(root, "src/app"), { recursive: true });
  writeFileSync(join(root, "src/app/icon.png"), iconPng);
  writeFileSync(join(root, "public/logo.png"), iconPng);

  const apple = await sharp(iconPng).resize(180, 180).png().toBuffer();
  writeFileSync(join(root, "src/app/apple-icon.png"), apple);

  const faviconBmp = await sharp(iconPng).resize(32, 32).raw().toBuffer();
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);
  header.writeInt32LE(32, 4);
  header.writeInt32LE(64, 8);
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  header.writeUInt32LE(32 * 32 * 4 + 32 * 4, 20);
  const xorData = Buffer.alloc(32 * 32 * 4);
  for (let y = 0; y < 32; y++) {
    const srcRow = y * 32 * 4;
    const dstRow = (31 - y) * 32 * 4;
    for (let x = 0; x < 32; x++) {
      const s = srcRow + x * 4;
      const d = dstRow + x * 4;
      xorData[d] = faviconBmp[s + 2];
      xorData[d + 1] = faviconBmp[s + 1];
      xorData[d + 2] = faviconBmp[s];
      xorData[d + 3] = faviconBmp[s + 3];
    }
  }
  const andMask = Buffer.alloc(32 * 4, 0);
  const icoBody = Buffer.concat([header, xorData, andMask]);
  const ico = Buffer.concat([
    Buffer.from([0, 0, 1, 0, 1, 0]),
    Buffer.from([32, 32, 0, 0, 1, 0, 32, 0]),
    (() => {
      const b = Buffer.alloc(4);
      b.writeUInt32LE(icoBody.length, 0);
      return b;
    })(),
    (() => {
      const b = Buffer.alloc(4);
      b.writeUInt32LE(22, 0);
      return b;
    })(),
    icoBody,
  ]);
  writeFileSync(join(root, "src/app/favicon.ico"), ico);

  const og = await sharp(Buffer.from(ogSvg())).png().toBuffer();
  writeFileSync(join(root, "src/app/opengraph-image.png"), og);
  writeFileSync(join(root, "src/app/twitter-image.png"), og);

  console.log("logo assets generated");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});