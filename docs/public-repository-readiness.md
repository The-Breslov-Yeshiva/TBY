# Public Repository Readiness

Date: June 9, 2026

## Current Decision

Do not flip the existing repository public yet.

The current working tree has been cleaned for public readiness, but the existing git history still contains deleted legacy website artifacts. If the current GitHub repository is made public, old commits become public too.

Recommended public-release path:

1. Create a sanitized public repository from the cleaned working tree, without carrying old history.
2. Or rewrite/purge history first, then rotate any credential that could have appeared in history.

## Cleanup Completed

- Added stricter ignore rules for local secrets, Cloudflare local state, deploy keys, source-photo folders, build outputs, and legacy root static assets.
- Removed tracked root-level legacy static-site files and duplicate root assets from the source tree.
- Removed tracked source photos from `Directed photos/`; served website assets remain under `public/`.
- Rewrote public JPEG photo assets that had heavy metadata so EXIF-style metadata is stripped.
- Added `SECURITY.md`.
- Updated the Cloudflare Pages workflow to use `CLOUDFLARE_API_TOKEN` instead of a global API key plus email.

## Scan Results

Local tracked-source scan:

- No raw Cloudflare, GitHub, Stripe secret-key, or private-key values were found in the current tracked source scan.
- Public payment and form identifiers remain in source by design:
  - Stripe donation link
  - Cash App link
  - Venmo link
  - Formspree form endpoints

Git history pattern scan:

- Found references to Cloudflare secret variable names in workflow history.
- No raw value was printed or confirmed by this scan.

External scanner status:

- `gitleaks` was attempted through `npx`, but the package did not expose a runnable binary in this environment.
- Before making any existing repository public, run a dedicated secret scanner such as Gitleaks or TruffleHog against full git history.

## Remaining Required Steps

1. Enable GitHub secret scanning and push protection.
2. Add GitHub Actions secrets:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`
3. Remove old GitHub secrets no longer needed:
   - `CLOUDFLARE_EMAIL`
   - `CLOUDFLARE_API_KEY`
4. Use a scoped Cloudflare API token for Pages deployment, not a global API key.
5. Run a full-history secret scan outside npm if needed.
6. Decide whether public source should include all gallery photos.
7. Confirm photo consent for public-source distribution, not only public website display.
8. Add a license or "all rights reserved" notice before going public.

## Payment Notes

Donation links are public-facing and safe to publish if they are intended to be visible on the website.

Do not commit Stripe secret keys, webhook signing secrets, donor exports, payment reports, bank details, or private donor contact information.

## Photo Privacy Notes

The public website assets are downloadable by visitors already, but a public repository makes reuse and scraping easier. Public-source release should only include photos that are acceptable for public redistribution.

If a photo is only approved for website display, keep it out of the public repository and serve it from a controlled asset store instead.
