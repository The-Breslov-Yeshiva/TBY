import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve("TBY Gallery", "TBY photos");
const publicDir = path.resolve("public", "gallery-archive");
const dataFile = path.resolve("data", "gallery-archive.ts");
const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);
const excludedItemIds = new Set(["gallery-0f23db1a431b59b5"]);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      if (!entry.isFile()) return [];
      return imageExtensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
    })
    .sort((a, b) => a.localeCompare(b));
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function imageSize(buffer) {
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20)
    };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);

      if (isStartOfFrame) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7)
        };
      }

      offset += 2 + length;
    }
  }

  throw new Error("Unsupported image format or missing dimensions");
}

function titleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function albumName(filePath) {
  const relativeDir = path.relative(rootDir, path.dirname(filePath));
  if (!relativeDir) return "TBY Photos";
  return relativeDir.split(path.sep).map(titleCase).join(" / ");
}

function categoryForAlbum(album) {
  if (album.includes("Gemini")) return "Community";
  if (album.includes("For Gallery")) return "Daily Life";
  return "Learning";
}

function dateForFile(filePath) {
  const base = path.basename(filePath);
  const whatsappMatch = base.match(/IMG-(\d{4})(\d{2})(\d{2})/);
  if (whatsappMatch) return `${whatsappMatch[1]}-${whatsappMatch[2]}-${whatsappMatch[3]}`;

  const chatGptMatch = base.match(/ChatGPT Image ([A-Za-z]+) (\d{1,2}), (\d{4})/);
  if (chatGptMatch) {
    const month = new Date(`${chatGptMatch[1]} 1, ${chatGptMatch[3]}`).getMonth() + 1;
    return `${chatGptMatch[3]}-${String(month).padStart(2, "0")}-${String(chatGptMatch[2]).padStart(2, "0")}`;
  }

  const mtime = statSync(filePath).mtime;
  return mtime.toISOString().slice(0, 10);
}

function publicName(hash, filePath) {
  const ext = path.extname(filePath).toLowerCase() === ".png" ? ".png" : ".jpg";
  return `gallery-${hash.slice(0, 16)}${ext}`;
}

function makeId(hash) {
  return `gallery-${hash.slice(0, 16)}`;
}

function makeItems() {
  if (!existsSync(rootDir)) {
    throw new Error(`Missing gallery source directory: ${rootDir}`);
  }

  mkdirSync(publicDir, { recursive: true });

  const seen = new Set();
  const albumCounts = new Map();
  const expectedFiles = new Set();
  const items = [];

  for (const filePath of walk(rootDir)) {
    const buffer = readFileSync(filePath);
    const hash = sha256(buffer);
    if (seen.has(hash)) continue;
    seen.add(hash);

    const id = makeId(hash);
    const album = albumName(filePath);
    const count = (albumCounts.get(album) ?? 0) + 1;
    albumCounts.set(album, count);

    if (excludedItemIds.has(id)) continue;

    const size = imageSize(buffer);

    const fileName = publicName(hash, filePath);
    expectedFiles.add(fileName);
    const destination = path.join(publicDir, fileName);
    if (!existsSync(destination)) copyFileSync(filePath, destination);

    const publicPath = `/gallery-archive/${fileName}`;
    const title = `${album} Moment ${String(count).padStart(2, "0")}`;
    const category = categoryForAlbum(album);
    const originalName = path.basename(filePath, path.extname(filePath));
    const relativePath = path.relative(rootDir, filePath).split(path.sep).join(" / ");

    items.push({
      id,
      title,
      eyebrow: album,
      album,
      category,
      date: dateForFile(filePath),
      energy: 42 + (Number.parseInt(hash.slice(0, 2), 16) % 53),
      src: publicPath,
      full: publicPath,
      width: size.width,
      height: size.height,
      alt: `Gallery photo from ${album}`,
      description: `A moment from ${album.toLowerCase()} in The Breslov Yeshiva archive.`,
      story: `Part of the growing yeshiva photo archive, preserved from ${relativePath}.`,
      focalPoint: "50% 50%",
      ctaLabel: "Open moment",
      keywords: `${album} ${titleCase(originalName)} ${relativePath}`.toLowerCase()
    });
  }

  for (const entry of readdirSync(publicDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.startsWith("gallery-") && !expectedFiles.has(entry.name)) {
      unlinkSync(path.join(publicDir, entry.name));
    }
  }

  return items.sort((a, b) => b.date.localeCompare(a.date) || a.album.localeCompare(b.album) || a.id.localeCompare(b.id));
}

const items = makeItems();
const output = `import type { ShowcaseItem } from "./media";

export const galleryArchiveItems = ${JSON.stringify(items, null, 2)} satisfies ShowcaseItem[];
`;

writeFileSync(dataFile, output);
console.log(`Synced ${items.length} unique gallery photos to ${path.relative(process.cwd(), publicDir)}`);
