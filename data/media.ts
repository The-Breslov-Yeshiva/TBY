import { galleryArchiveItems } from "./gallery-archive";

export type MediaCategory = "Learning" | "Community" | "Daily Life";

export type ShowcaseItem = {
  id: string;
  title: string;
  eyebrow: string;
  album: string;
  category: MediaCategory;
  date: string;
  energy: number;
  src: string;
  webp?: string;
  full: string;
  width: number;
  height: number;
  alt: string;
  description: string;
  story: string;
  focalPoint: string;
  ctaLabel: string;
  keywords: string;
};

export const featuredShowcaseItems: ShowcaseItem[] = [
  {
    id: "focused-growth",
    title: "Focused Growth",
    eyebrow: "The work beneath the surface",
    album: "Featured",
    category: "Learning",
    date: "2026-04-25",
    energy: 64,
    src: "/pic-left.jpg",
    webp: "/gallery-pic-left.webp",
    full: "/pic-left.jpg",
    width: 740,
    height: 741,
    alt: "Students gathered for Torah learning",
    description: "A quieter frame from the daily work of building clarity, confidence, and consistency.",
    story: "The yeshiva is built around steady personal motion: one seder, one conversation, one real choice at a time.",
    focalPoint: "48% 44%",
    ctaLabel: "See the focus",
    keywords: "torah learning focus students"
  },
  {
    id: "torah-avodah-simcha",
    title: "Torah, Avodah, Simcha",
    eyebrow: "A balanced path",
    album: "Featured",
    category: "Daily Life",
    date: "2026-04-08",
    energy: 88,
    src: "/pic-01.jpg",
    webp: "/gallery-pic-01.webp",
    full: "/pic-01.jpg",
    width: 802,
    height: 588,
    alt: "Students at The Breslov Yeshiva",
    description: "Daily life at the intersection of serious learning and healthy joy.",
    story: "The goal is not only to learn more, but to become more alive in Torah, tefillah, and avodas Hashem.",
    focalPoint: "50% 44%",
    ctaLabel: "Explore daily life",
    keywords: "daily life simcha avodas hashem"
  },
  {
    id: "quiet-study",
    title: "Quiet Study",
    eyebrow: "Stillness has a sound",
    album: "Featured",
    category: "Daily Life",
    date: "2026-03-28",
    energy: 42,
    src: "/black.jpg",
    webp: "/gallery-black.webp",
    full: "/black.jpg",
    width: 631,
    height: 631,
    alt: "A quiet portrait-style image from the yeshiva archive",
    description: "Stillness, patience, and the inner work that gives the day its shape.",
    story: "Some of the most important moments are the least dramatic: a page open, the room quiet, the heart choosing again.",
    focalPoint: "50% 48%",
    ctaLabel: "Pause here",
    keywords: "quiet study archive"
  }
];

export const directedShowcaseItems: ShowcaseItem[] = [
  {
    id: "at-the-tziyun",
    title: "At the Tziyun",
    eyebrow: "A moment of connection",
    album: "Directed Photos",
    category: "Community",
    date: "2025-11-20",
    energy: 78,
    src: "/directed-photos/at-the-tziyun-4k.jpg",
    webp: "/directed-photos/at-the-tziyun-4k.webp",
    full: "/directed-photos/at-the-tziyun-4k.jpg",
    width: 3840,
    height: 5120,
    alt: "Yeshiva students and rabbeim gathered at the tziyun of Rebbe Nachman",
    description: "A group moment at the tziyun, carrying the yeshiva's learning into tefillah and connection.",
    story: "The yeshiva experience extends beyond the beis midrash into moments of tefillah, connection, and shared purpose.",
    focalPoint: "50% 42%",
    ctaLabel: "Open the moment",
    keywords: "community tziyun rebbe nachman travel tefillah gathering directed photos"
  }
];

const FOUR_K_PIXEL_COUNT = 3840 * 2160;
const HOMEPAGE_SHOWCASE_LIMIT = 18;

function uniqueByImage(items: ShowcaseItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.full || item.src;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function mediaQualityScore(item: ShowcaseItem) {
  const pixels = item.width * item.height;
  const megapixels = pixels / 1_000_000;
  const resolutionScore = Math.min(megapixels, 24) * 100;
  const fourKBonus = pixels >= FOUR_K_PIXEL_COUNT ? 700 : 0;
  const directedBonus = item.album === "Directed Photos" ? 900 : 0;
  const webpBonus = item.webp ? 50 : 0;
  const sourceBonus = item.full.includes("/gallery-archive/") ? 80 : 0;

  return directedBonus + fourKBonus + resolutionScore + webpBonus + sourceBonus + item.energy / 10;
}

function sortQualityFirst(items: ShowcaseItem[]) {
  return [...items].sort((a, b) => {
    const scoreDelta = mediaQualityScore(b) - mediaQualityScore(a);
    if (scoreDelta !== 0) return scoreDelta;

    const dateDelta = b.date.localeCompare(a.date);
    if (dateDelta !== 0) return dateDelta;

    return a.title.localeCompare(b.title);
  });
}

export const showcaseItems: ShowcaseItem[] = sortQualityFirst(uniqueByImage([...featuredShowcaseItems, ...directedShowcaseItems, ...galleryArchiveItems]));
export const homepageShowcaseItems: ShowcaseItem[] = showcaseItems.slice(0, HOMEPAGE_SHOWCASE_LIMIT);
export const categories = ["All", ...Array.from(new Set(showcaseItems.map((item) => item.category)))] as const;
export const albums = ["All Albums", ...Array.from(new Set(showcaseItems.map((item) => item.album)))] as const;
