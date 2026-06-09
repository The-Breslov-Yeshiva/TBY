import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve("TBY Gallery", "TBY photos");
const publicDir = path.resolve("public", "gallery-archive");
const dataFile = path.resolve("data", "gallery-archive.ts");
const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);
const excludedItemIds = new Set(["gallery-0f23db1a431b59b5"]);
const publicAlbumNames = new Map([
  ["For Gallery Use", "Yeshiva Life"],
  ["Gemini Photos", "Community Moments"],
  ["TBY Photos", "Beis Midrash"]
]);

const photoCopyByFile = {
  "20f0551d-0d4d-4cff-ab6f-268c54f769bb.jpg": {
    title: "Learning Around the Table",
    eyebrow: "Small-Group Seder",
    category: "Learning",
    description: "Students sit with open sefarim in a focused table seder.",
    story: "The room is quiet enough for real work: chavrusas learning together, asking, listening, and building clarity one page at a time."
  },
  "69d2c585-0356-48b1-aa1a-735ce956d807.jpg": {
    title: "A Smile Between Sedarim",
    eyebrow: "Friendship",
    category: "Community",
    description: "A candid moment of friendship and warmth inside the yeshiva day.",
    story: "The learning is serious, but the atmosphere stays human: friendship, encouragement, and the simple joy of being part of the chevra."
  },
  "809b5a07-7166-45c4-85d4-891d1cf48e3e.jpg": {
    title: "Chavrusa Table",
    eyebrow: "Morning Learning",
    category: "Learning",
    description: "Students learn together around a shared table, turning discussion into steady growth.",
    story: "The table becomes the center of the day, with each chavrusa bringing its own questions, pace, and effort into the seder."
  },
  "827d7a29-9a81-469e-b821-05c0b0212f30.jpg": {
    title: "Face-to-Face Chavrusa",
    eyebrow: "Chavrusa Learning",
    category: "Learning",
    description: "A close chavrusa exchange with sefarim open and attention on the sugya.",
    story: "Growth often happens across the table: one question, one answer, one honest attempt to understand the sugya more deeply."
  },
  "ChatGPT Image May 11, 2026, 02_53_07 PM.png": {
    title: "Torah Reading for Soldiers",
    eyebrow: "Army Base Visit",
    album: "Chesed and Tefillah",
    category: "Community",
    description: "The chevra visits an army base to help soldiers hear the Torah reading and daven together.",
    story: "On an excursion to an army base, the yeshiva helped soldiers who had not yet heard the Torah reading that day, bringing the kriyas haTorah to them and joining them in tefillah."
  },
  "ChatGPT Image May 11, 2026, 03_17_41 PM.png": {
    title: "Rabbi Kivak Visits the Yeshiva",
    eyebrow: "Tzadik Visit",
    album: "Rabbi Kivak Visit",
    category: "Community",
    description: "Rabbi Nissan Dovid Kivak, shlita, visits the yeshiva and shares Torah and chizuk with the chevra.",
    story: "A visit from Rabbi Nissan Dovid Kivak, shlita, brings the broader Breslov mesorah into the room, giving students a direct encounter with a major voice of Torah, avodah, and guidance."
  },
  "ChatGPT Image May 11, 2026, 03_35_12 PM.png": {
    title: "Words from Rabbi Kivak",
    eyebrow: "Living Mesorah",
    album: "Rabbi Kivak Visit",
    category: "Community",
    description: "Rabbi Nissan Dovid Kivak, shlita, speaks with the yeshiva in a moment of Torah, warmth, and guidance.",
    story: "Around the table, Rabbi Nissan Dovid Kivak, shlita, turns the visit into a living moment of mesorah, with students gathered close to receive chizuk and direction."
  },
  "e112d17e-2f38-4d6d-98b6-60f88bd3605d.jpg": {
    title: "Faces of the Beis Midrash",
    eyebrow: "Student Life",
    category: "Community",
    description: "A candid portrait of students and friends around the beis midrash.",
    story: "Beyond the formal schedule, the yeshiva is built from real faces, shared time, and the friendships that carry the work forward."
  },
  "Gemini_Generated_Image_qyv4cvqyv4cvqyv4.png": {
    title: "Table Seder",
    eyebrow: "Focused Learning",
    category: "Learning",
    description: "A small group learning together with the quiet concentration of seder.",
    story: "The beis midrash rhythm is simple and demanding: sit down, open the sefer, and stay with the work."
  },
  "IMG-20250825-WA0057.jpeg": {
    title: "After Tefillah",
    eyebrow: "Tefillah",
    category: "Daily Life",
    description: "Students and rabbeim gather in the beis midrash around a moment of tefillah.",
    story: "The day is held together by more than learning alone; tefillah gives the seder its center and its direction."
  },
  "IMG-20250825-WA0061.jpeg": {
    title: "Tefillah in the Beis Midrash",
    eyebrow: "Avodah",
    category: "Daily Life",
    description: "The room gathers around avodah, linking learning with heartfelt tefillah.",
    story: "A beis midrash moment where learning and tefillah meet, shaping the atmosphere of the whole day."
  },
  "IMG-20250825-WA0063.jpeg": {
    title: "Gathered by the Aron",
    eyebrow: "Connection",
    category: "Daily Life",
    description: "A quiet moment of connection near the aron after tefillah.",
    story: "Some moments do not need much explanation: the room gathers, the pace slows, and the purpose of the day comes back into focus."
  },
  "IMG-20250903-WA0181.jpeg": {
    title: "Learning Rows",
    eyebrow: "Daily Seder",
    category: "Learning",
    description: "Students spread through the beis midrash for a steady seder.",
    story: "Across the room, each table carries its own rhythm of reading, asking, reviewing, and beginning again."
  },
  "IMG-20250930-WA0146.jpeg": {
    title: "A Full Beis Midrash",
    eyebrow: "Seder",
    category: "Learning",
    description: "A broad view of the room filled with learning and discussion.",
    story: "The beis midrash feels alive when the room is working: chavrusas learning, voices rising and falling, and the seder moving forward."
  },
  "IMG-20251029-WA0175.jpg": {
    title: "With the Rabbi",
    eyebrow: "Personal Connection",
    category: "Community",
    description: "A warm candid with a rebbi, reflecting the personal connection behind the learning.",
    story: "The yeshiva relationship is not only formal instruction; it is built through approachability, conversation, and trust."
  },
  "IMG-20251130-WA0284.jpg": {
    title: "Personal Guidance",
    eyebrow: "Rabbeim",
    category: "Community",
    description: "A close conversation with rabbeim, where learning becomes direction.",
    story: "The most important guidance often happens in the small moments, when a student can ask clearly and be heard fully."
  },
  "IMG-20251211-WA0216.jpeg": {
    title: "Around One Table",
    eyebrow: "Shared Learning",
    category: "Learning",
    description: "The beis midrash gathers around one table for shared learning.",
    story: "From above, the shape of the seder becomes clear: a group drawn together around Torah, conversation, and steady attention."
  },
  "IMG-20251211-WA0241.jpeg": {
    title: "Gathered Around Rabbi Kivak",
    eyebrow: "Tzadik Visit",
    album: "Rabbi Kivak Visit",
    category: "Community",
    description: "Students gather around Rabbi Nissan Dovid Kivak, shlita, during his visit to the yeshiva.",
    story: "The room gathers close as Rabbi Nissan Dovid Kivak, shlita, visits the yeshiva, creating a rare moment of connection to Breslov Torah and the guidance of a living tzadik."
  },
  "IMG-20251211-WA0243.jpeg": {
    title: "A Shiur with Rabbi Kivak",
    eyebrow: "Special Shiur",
    album: "Rabbi Kivak Visit",
    category: "Community",
    description: "Rabbi Nissan Dovid Kivak, shlita, gives a special shiur during his visit to the yeshiva.",
    story: "The visit becomes a focused shiur, with Rabbi Nissan Dovid Kivak, shlita, sharing Torah and chizuk while the chevra listens around the table."
  },
  "IMG-20251211-WA0246.jpeg": {
    title: "Listening to Rabbi Kivak",
    eyebrow: "Chizuk and Torah",
    album: "Rabbi Kivak Visit",
    category: "Community",
    description: "The chevra listens as Rabbi Nissan Dovid Kivak, shlita, shares Torah and chizuk in the beis midrash.",
    story: "A room full of students leans into the moment as Rabbi Nissan Dovid Kivak, shlita, speaks, bringing depth, warmth, and Breslov guidance into the yeshiva day."
  },
  "IMG-20251211-WA0266.jpg": {
    title: "Rabbi Kivak with the Chevra",
    eyebrow: "Tzadik Visit",
    album: "Rabbi Kivak Visit",
    category: "Community",
    description: "Rabbi Nissan Dovid Kivak, shlita, sits with the chevra during his visit to the yeshiva.",
    story: "Another moment from Rabbi Nissan Dovid Kivak's visit, with the chevra gathered close around the table to receive Torah, chizuk, and guidance from a major Breslov tzadik."
  },
  "IMG-20251216-WA0224.jpg": {
    title: "A Simcha in the Room",
    eyebrow: "Togetherness",
    category: "Community",
    description: "The yeshiva pauses for a moment of simcha and togetherness.",
    story: "Not every important yeshiva moment happens over a sefer; sometimes the growth is in celebrating together."
  },
  "IMG-20251217-WA0015.jpg": {
    title: "Shared Meal",
    eyebrow: "Chevra",
    category: "Daily Life",
    description: "A table full of students sharing food, conversation, and friendship.",
    story: "Meals become part of the yeshiva rhythm, giving the chevra time to connect beyond the formal seder."
  },
  "IMG-20251217-WA0016.jpg": {
    title: "Farbrengen Table",
    eyebrow: "Community",
    category: "Daily Life",
    description: "A lively table scene where conversation and warmth fill the room.",
    story: "The table carries the spirit of the yeshiva after seder: food, conversation, singing, and connection."
  },
  "IMG-20251222-WA0141.jpg": {
    title: "Tefillah with Soldiers",
    eyebrow: "Army Base Visit",
    album: "Chesed and Tefillah",
    category: "Community",
    description: "The chevra joins soldiers at an army base for tefillah and Torah reading.",
    story: "During the army base visit, the yeshiva helped soldiers who had not yet heard the Torah reading that day, joining them in tefillah and bringing the sound of kriyas haTorah into their day."
  },
  "67e112b1-0146-4402-a6f5-abf4b6d5c67e.jpg": {
    title: "A Room Around Torah",
    eyebrow: "Gathered Learning",
    category: "Learning",
    description: "Students and rabbeim gather around tables for learning and conversation.",
    story: "The beis midrash becomes a shared space where learning, guidance, and community all happen at once."
  },
  "72e5ea38-cef9-462a-bcc6-f3cccfc135c7.jpg": {
    title: "Beis Midrash Conversation",
    eyebrow: "Chavrusa",
    category: "Learning",
    description: "A table of students engaged in discussion with sefarim open.",
    story: "The learning moves through conversation, with each student bringing another angle into the sugya."
  },
  "84385023-ad16-4896-9620-004f46febd0c.jpg": {
    title: "Gathered for Shiur",
    eyebrow: "Shiur",
    category: "Learning",
    description: "The room gathers around a shiur, listening and learning together.",
    story: "A full-room learning moment, centered on the give-and-take between rebbi, students, and text."
  },
  "a5d388fd-c22d-4e02-8732-bf143d0f6ba8.jpg": {
    title: "Small Group Seder",
    eyebrow: "Focused Learning",
    category: "Learning",
    description: "A focused group learns around a long table, building clarity one page at a time.",
    story: "A smaller seder gives each student room to ask, respond, and stay present with the learning."
  },
  "f31e52f7-7145-456f-bec2-1696f34052bb.jpg": {
    title: "Open Sefarim",
    eyebrow: "Table Learning",
    category: "Learning",
    description: "Students sit close around the table with open sefarim and shared attention.",
    story: "The scene is simple and direct: sefarim open, students leaning in, and the work of learning underway."
  },
  "IMG-20250825-WA0148.jpg": {
    title: "Quiet Before Seder",
    eyebrow: "Beis Midrash",
    category: "Learning",
    description: "A still view of the beis midrash as students settle into learning.",
    story: "Before the room fills with sound, there is a quieter moment of preparation and focus."
  },
  "IMG-20250826-WA0105.jpg": {
    title: "Learning From Above",
    eyebrow: "Beis Midrash",
    category: "Learning",
    description: "An overhead view of the beis midrash centered around the seder.",
    story: "From above, the room shows the structure of the day: tables, sefarim, chavrusas, and a shared purpose."
  },
  "IMG-20250826-WA0203.jpg": {
    title: "Daily Seder",
    eyebrow: "Learning Rhythm",
    category: "Learning",
    description: "Students learning in the steady rhythm of the beis midrash.",
    story: "The strength of the yeshiva is built in consistent daily work, with each seder adding another layer."
  },
  "IMG-20250828-WA0065.jpeg": {
    title: "Morning Seder",
    eyebrow: "Chavrusa",
    category: "Learning",
    description: "Chavrusas fill the beis midrash during a quiet stretch of learning.",
    story: "The morning seder carries its own pace: calm, focused, and built around steady conversation."
  },
  "IMG-20250828-WA0067.jpeg": {
    title: "Across the Tables",
    eyebrow: "Beis Midrash",
    category: "Learning",
    description: "Students learning across the room, each table carrying its own conversation.",
    story: "Every table has its own rhythm, but together they create the sound and feel of the beis midrash."
  },
  "IMG-20250828-WA0156.jpeg": {
    title: "The Beis Midrash at Work",
    eyebrow: "Daily Learning",
    category: "Learning",
    description: "A wide view of the room alive with learning and focused discussion.",
    story: "This is the ordinary work that matters most: students showing up, learning together, and staying with the process."
  },
  "IMG-20250903-WA0200.jpg": {
    title: "Under the Eretz Yisrael Sky",
    eyebrow: "Chevra",
    category: "Community",
    description: "The group gathers outdoors, carrying the yeshiva bond beyond the beis midrash.",
    story: "The yeshiva experience stretches beyond the room, into the land, the chevra, and shared moments of perspective."
  },
  "IMG-20250903-WA0202.jpg": {
    title: "The Land Around Us",
    eyebrow: "Eretz Yisrael",
    category: "Community",
    description: "A wide outdoor moment in Eretz Yisrael with the chevra gathered under the tree.",
    story: "The landscape frames the group, reminding students that the learning is taking root in a living place."
  },
  "IMG-20250914-WA0343.jpeg": {
    title: "Learning With the Rebbe",
    eyebrow: "Guided Learning",
    category: "Learning",
    description: "Students listen and respond as the rebbi guides the table through the sugya.",
    story: "The table becomes a place of direction, where questions can be sharpened and the learning can open."
  },
  "IMG-20250914-WA0345.jpeg": {
    title: "Shiur Around the Table",
    eyebrow: "Shiur",
    category: "Learning",
    description: "A close shiur scene shaped by questions, conversation, and connection.",
    story: "The learning develops through relationship, with the rebbi and students working through the material together."
  },
  "IMG-20250914-WA0361.jpeg": {
    title: "Rabbi Chaim Kramer Visits",
    eyebrow: "Guest Shiur",
    category: "Learning",
    description: "Rabbi Chaim Kramer visits the yeshiva and gives shiur in the beis midrash.",
    story: "A special guest shiur with Rabbi Chaim Kramer brings the broader Breslov mesorah into the room, giving students another voice of Torah, chizuk, and connection."
  },
  "IMG-20250914-WA0364.jpeg": {
    title: "A Room Tuned In",
    eyebrow: "Shiur",
    category: "Learning",
    description: "The beis midrash turns toward the learning as the shiur unfolds.",
    story: "A room can feel unified when everyone is listening, thinking, and moving through the sugya together."
  },
  "IMG-20250919-WA0023.jpeg": {
    title: "Learning at The Ranch",
    eyebrow: "Uman Patio Seder",
    album: "Uman Rosh Hashana 2025",
    category: "Community",
    description: "The chevra learns outside on the patio at The Ranch with Rabbi Dovid Yisroel Kalmus during Uman Rosh Hashana 2025.",
    story: "Back at The Ranch, the hotel where the chevra stayed in Uman, the learning continued outside on the patio with Rabbi Dovid Yisroel Kalmus, carrying the Rosh Hashana atmosphere into a focused seder."
  },
  "8cb73d73-b3e9-4ac0-b024-d4e9acfffc29.jpg": {
    title: "Night Seder Gathering",
    eyebrow: "Evening Learning",
    category: "Learning",
    description: "Students gathered in the beis midrash for an evening seder.",
    story: "Evening learning has its own texture: a quieter room, a slower pace, and a deeper kind of focus."
  },
  "a05a18b8-3ad0-4660-b3d7-6e3d36700155.jpg": {
    title: "Focused Table Seder",
    eyebrow: "Chavrusa",
    category: "Learning",
    description: "A small group leans into learning around the table.",
    story: "The seder is built from close attention: students gathered around the table, working through the page together."
  },
  "IMG-20250903-WA0201.jpg": {
    title: "Chevra Under the Tree",
    eyebrow: "Eretz Yisrael",
    category: "Community",
    description: "The group gathers outdoors in Eretz Yisrael, framed by the land and sky.",
    story: "A yeshiva photo outside the beis midrash, showing the chevra together in the landscape that surrounds the learning."
  },
  "IMG-20250909-WA0247.jpeg": {
    title: "Conversation After the Day",
    eyebrow: "Night Gathering",
    category: "Community",
    description: "A nighttime circle of students and rabbeim in conversation and connection.",
    story: "After the formal day ends, the conversations often continue, giving students another way to process and connect."
  },
  "IMG-20250921-WA0138.jpeg": {
    title: "Rabbi Kalmus Speaking in Uman",
    eyebrow: "Uman Rosh Hashana",
    album: "Uman Rosh Hashana 2025",
    category: "Community",
    description: "Rabbi Dovid Yisroel Kalmus speaks publicly to the chevra during Uman Rosh Hashana 2025.",
    story: "In the atmosphere of Uman Rosh Hashana, Rabbi Dovid Yisroel Kalmus gives chizuk and Torah to a gathered room, bringing the yeshiva's learning into one of the year's most powerful moments."
  },
  "IMG-20250921-WA0139.jpeg": {
    title: "A Full Tent of Learning",
    eyebrow: "Community Shiur",
    category: "Community",
    description: "Rows of students and guests join together around a shared Torah experience.",
    story: "The larger gathering gives the learning a wider voice, with the room united around one message."
  },
  "IMG-20250921-WA0143.jpeg": {
    title: "Listening in Uman",
    eyebrow: "Rosh Hashana Shiur",
    album: "Uman Rosh Hashana 2025",
    category: "Community",
    description: "The room listens as Rabbi Dovid Yisroel Kalmus gives a public shiur in Uman.",
    story: "The crowd settles into a focused Torah moment during Uman Rosh Hashana 2025, with Rabbi Dovid Yisroel Kalmus guiding the room through words of clarity, connection, and chizuk."
  },
  "IMG-20250921-WA0150.jpeg": {
    title: "The Chevra at Uman",
    eyebrow: "Rosh Hashana Chevra",
    album: "Uman Rosh Hashana 2025",
    category: "Community",
    description: "The chevra gathers together during Uman Rosh Hashana 2025.",
    story: "Around the table in Uman, the yeshiva's learning and friendship continue into the Rosh Hashana atmosphere, where the chevra shares food, conversation, and connection."
  },
  "IMG-20251126-WA0201.jpeg": {
    title: "Quiet Beis Midrash",
    eyebrow: "Stillness",
    category: "Learning",
    description: "A calm beis midrash scene holding the quiet rhythm of daily learning.",
    story: "The quieter frames matter too, because they show the steady environment that makes consistent learning possible."
  },
  "IMG-20251211-WA0170.jpeg": {
    title: "A Circle of Simcha",
    eyebrow: "Togetherness",
    category: "Community",
    description: "Students join together in movement and simcha inside the beis midrash.",
    story: "The room becomes more than a place to learn; it becomes a place where students can share joy and belonging."
  }
};

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
  const rawAlbum = relativeDir ? relativeDir.split(path.sep).map(titleCase).join(" / ") : "TBY Photos";
  return publicAlbumNames.get(rawAlbum) ?? rawAlbum;
}

function categoryForAlbum(album) {
  if (album.includes("Community")) return "Community";
  if (album.includes("Yeshiva Life")) return "Daily Life";
  return "Learning";
}

function fallbackCopy(filePath, album, count) {
  const fallbackTitle = `${album} ${String(count).padStart(2, "0")}`;
  if (album === "Community Moments") {
    return {
      title: fallbackTitle,
      eyebrow: "Community",
      category: "Community",
      description: "A shared yeshiva moment of friendship, connection, and belonging.",
      story: "Part of the yeshiva's growing archive of moments that show the chevra, the atmosphere, and the life around the learning."
    };
  }

  if (album === "Yeshiva Life") {
    return {
      title: fallbackTitle,
      eyebrow: "Daily Life",
      category: "Daily Life",
      description: "A moment from the daily rhythm of learning, tefillah, and yeshiva life.",
      story: "Part of the yeshiva's growing archive, preserving the ordinary scenes that give the day its shape."
    };
  }

  return {
    title: fallbackTitle,
    eyebrow: "Learning",
    category: "Learning",
    description: "A beis midrash moment centered on Torah learning and steady growth.",
    story: "Part of the yeshiva's growing archive of learning, conversation, and focused work in the beis midrash."
  };
}

function copyForFile(filePath, album, count) {
  const fileName = path.basename(filePath);
  return photoCopyByFile[fileName] ?? fallbackCopy(filePath, album, count);
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
    const sourceAlbum = albumName(filePath);
    const count = (albumCounts.get(sourceAlbum) ?? 0) + 1;
    albumCounts.set(sourceAlbum, count);

    if (excludedItemIds.has(id)) continue;

    const size = imageSize(buffer);

    const fileName = publicName(hash, filePath);
    expectedFiles.add(fileName);
    const destination = path.join(publicDir, fileName);
    if (!existsSync(destination)) copyFileSync(filePath, destination);

    const publicPath = `/gallery-archive/${fileName}`;
    const copy = copyForFile(filePath, sourceAlbum, count);
    const album = copy.album ?? sourceAlbum;
    const category = copy.category ?? categoryForAlbum(album);
    const searchText = `${album} ${category} ${copy.title} ${copy.eyebrow} ${copy.description} ${copy.story}`;

    items.push({
      id,
      title: copy.title,
      eyebrow: copy.eyebrow,
      album,
      category,
      date: dateForFile(filePath),
      energy: 42 + (Number.parseInt(hash.slice(0, 2), 16) % 53),
      src: publicPath,
      full: publicPath,
      width: size.width,
      height: size.height,
      alt: copy.alt ?? `${copy.title} at The Breslov Yeshiva`,
      description: copy.description,
      story: copy.story,
      focalPoint: copy.focalPoint ?? "50% 50%",
      ctaLabel: copy.ctaLabel ?? "Open moment",
      keywords: (copy.keywords ?? searchText).toLowerCase()
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
