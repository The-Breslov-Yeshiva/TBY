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
- Replaced Cloudflare Pages deployment with GitHub Pages deployment.
- Added `public/CNAME` for `thebreslovyeshiva.com`.
- Added `public/.nojekyll` so GitHub Pages serves Next.js static assets under `_next`.

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
2. In GitHub repository settings, enable GitHub Pages with "GitHub Actions" as the source.
3. In GitHub Pages custom domain settings, use `thebreslovyeshiva.com`.
4. Verify the custom domain in GitHub Pages before relying on it publicly.
5. In Cloudflare DNS, point `thebreslovyeshiva.com` to GitHub Pages using GitHub's required apex records.
6. In Cloudflare DNS, point `www.thebreslovyeshiva.com` to the repository owner's GitHub Pages hostname with a CNAME record if `www` should work.
7. Remove old GitHub repository secrets no longer needed for deployment:
   - `CLOUDFLARE_EMAIL`
   - `CLOUDFLARE_API_KEY`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`
8. Run a full-history secret scan outside npm if needed.
9. Decide whether public source should include all gallery photos.
10. Confirm photo consent for public-source distribution, not only public website display.
11. Add a license or "all rights reserved" notice before going public.

## Hosting Plan

- GitHub Pages hosts the static Next.js export from `out/`.
- Cloudflare is DNS/domain hosting only.
- No Cloudflare API key or token is required for repository deployment.
- `thebreslovyeshiva.com` is connected through `public/CNAME`.

Cloudflare DNS records for the apex domain should use GitHub Pages' current required records:

```text
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

Optional `www` record:

```text
CNAME    www    <github-owner>.github.io
```

Replace `<github-owner>` with the GitHub account or organization that owns the public repository.

## Payment Notes

Donation links are public-facing and safe to publish if they are intended to be visible on the website.

Do not commit Stripe secret keys, webhook signing secrets, donor exports, payment reports, bank details, or private donor contact information.

## Photo Privacy Notes

The public website assets are downloadable by visitors already, but a public repository makes reuse and scraping easier. Public-source release should only include photos that are acceptable for public redistribution.

If a photo is only approved for website display, keep it out of the public repository and serve it from a controlled asset store instead.
