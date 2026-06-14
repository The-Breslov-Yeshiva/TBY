type HttpsUrl = `https://${string}`;

export const fundraisingCampaign = {
  title: "The Breslov Yeshiva / Uvacharta Bachayim 2026",
  eyebrow: "Fundraising Campaign",
  tagline: "KNOW YOURSELF. GROW YOUR FUTURE",
  copy: "Help build an integrated Torah life for young men ready for real growth.",
  href: "https://www.charidy.com/breslov" as HttpsUrl,
  goal: "$150,000",
  bonusGoal: "$180,000",
  endsAt: "2026-06-17T23:59:00+03:00",
  endsAtLabel: "Wednesday night, Beit Shemesh time"
} as const;
