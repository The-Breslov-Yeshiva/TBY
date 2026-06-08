# Site Change Notes

## June 3, 2026

- Temporarily hid the Rabbi Nissan Dovid Kivak guidance sections on the Home and About pages.
- The sections were intentionally hidden, not deleted; their JSX, text, and image references remain in place.
- Restore path: set `showRabbiKivakGuidanceSection` to `true` in `data/site-flags.ts`.
- Reordered the About page "Meet Our Rebbeim" grid so the first desktop row shows the three Roshei Yeshiva:
  Rabbi Berel Simpser, Rabbi Yehoshua Gerzi, and Rabbi Dovid Yisroel Kalmus.
- Updated the second desktop row to show Rabbi Yehuda Kastel as Mashgiach, followed by Rabbi Nissim Black and Rabbi Sholom Brown with their existing titles.

## June 8, 2026

- Temporarily hid the homepage hero video on the live Home page and homepage vision preview page.
- The video component was intentionally hidden, not deleted; the `HeroVideo` component and references remain in place.
- Restore path: set `showHomeHeroVideo` to `true` in `data/site-flags.ts`.
