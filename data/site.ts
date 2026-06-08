const siteUrl = "https://thebreslovyeshiva.com";

export const site = {
  url: siteUrl,
  name: "The Breslov Yeshiva",
  logoAlt: "Yeshivas Uvacharta Bachayim",
  logo: "/yeshiva-logo-web.png",
  description: "An English-speaking yeshiva dedicated to healthy, balanced growth in Torah and avodas Hashem.",
  address: "32 Nachal Lachish, Ramat Beit Shemesh, Israel",
  email: "info@tbye.org",
  applyHref: "/#register",
  forms: {
    action: "https://formspree.io/f/meojeeyg",
    receivedUrl: `${siteUrl}/received`
  },
  donationLinks: {
    stripe: "https://donate.stripe.com/fZebL4dC66aQaHe144",
    cashApp: "https://cash.app/$TBYeshiva",
    venmo: "https://venmo.com/TheBreslov-Yeshiva"
  }
} as const;
