export type MediaCategory = "Learning" | "Community" | "Daily Life";

export type ShowcaseItem = {
  id: string;
  title: string;
  eyebrow: string;
  category: MediaCategory;
  date: string;
  energy: number;
  src: string;
  webp: string;
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

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "beis-midrash-morning",
    title: "Morning in the Beis Midrash",
    eyebrow: "A day begins with clarity",
    category: "Learning",
    date: "2026-05-01",
    energy: 82,
    src: "/pic-bg.jpg",
    webp: "/gallery-pic-bg.webp",
    full: "/pic-bg.jpg",
    width: 1478,
    height: 718,
    alt: "Students learning in the yeshiva beis midrash",
    description: "The room settles into the steady rhythm of chavrusa learning and focused growth.",
    story: "A quiet morning frame where structure, warmth, and serious learning become the atmosphere of the day.",
    focalPoint: "50% 45%",
    ctaLabel: "Enter the morning",
    keywords: "learning beis midrash morning chavrusa"
  },
  {
    id: "focused-growth",
    title: "Focused Growth",
    eyebrow: "The work beneath the surface",
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
    id: "community-table",
    title: "Community at the Table",
    eyebrow: "Growth needs a home",
    category: "Community",
    date: "2026-04-19",
    energy: 74,
    src: "/pic-right.jpg",
    webp: "/gallery-pic-right.webp",
    full: "/pic-right.jpg",
    width: 740,
    height: 741,
    alt: "Yeshiva students sitting together",
    description: "The informal moments that turn a group of talmidim into a real community.",
    story: "Between shiurim and sedarim, the yeshiva breathes through friendship, shared meals, and honest conversation.",
    focalPoint: "50% 48%",
    ctaLabel: "Feel the community",
    keywords: "community connection talmidim"
  },
  {
    id: "tziyun-visit",
    title: "At the Tziyun",
    eyebrow: "A moment of connection",
    category: "Community",
    date: "2026-04-15",
    energy: 78,
    src: "/gallery-tziyun-visit.jpg",
    webp: "/gallery-tziyun-visit.webp",
    full: "/gallery-tziyun-visit.jpg",
    width: 3840,
    height: 5120,
    alt: "Yeshiva students and rabbeim gathered at the tziyun of Rebbe Nachman",
    description: "A group moment at the tziyun, carrying the yeshiva's learning into tefillah and connection.",
    story: "The yeshiva experience extends beyond the beis midrash into moments of tefillah, connection, and shared purpose.",
    focalPoint: "50% 42%",
    ctaLabel: "Open the moment",
    keywords: "community tziyun rebbe nachman travel tefillah gathering"
  },
  {
    id: "torah-avodah-simcha",
    title: "Torah, Avodah, Simcha",
    eyebrow: "A balanced path",
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

export const categories = ["All", ...Array.from(new Set(showcaseItems.map((item) => item.category)))] as const;
