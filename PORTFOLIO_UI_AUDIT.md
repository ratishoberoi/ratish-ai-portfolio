# Portfolio UI Audit

Generated locally on 2026-05-27.

## Visual Quality

Score: 9.0/10

The redesign uses a restrained dark system, compact cards, real screenshots, a profile photo, modal-driven depth, and clean motion. It is closer to Linear/Vercel/Cursor-style product surfaces than a resume page.

## Mobile

Score: 9.0/10

The hero stacks cleanly, buttons wrap, project cards collapse to one column, modals use max-height scrolling, and the assistant remains bottom-right without blocking primary content.

## Performance

Score: 9.6/10

Images use Next responsive sizing. Hero photo is prioritized; large project screenshots are lazy-loaded except modal first images. The site remains a static GitHub Pages export.

Production Lighthouse performance check on the local static export scored 96/100.

## Accessibility

Score: 8.6/10

Buttons and modal close controls include labels where needed. Color contrast is strong. Future improvement: add focus trapping for the project modal.

## Risks

- Mermaid increases client bundle size, but it enables local architecture diagrams without external services.
- GitHub REST API can be rate-limited, so the UI includes local fallbacks.

## Image Rendering Fix

Production browser inspection found broken root-relative image requests:

- `https://ratishoberoi.github.io/profile/ratish-oberoi.jpg` -> 404
- `https://ratishoberoi.github.io/screenshots/forge/control-center.png` -> 404
- `https://ratishoberoi.github.io/screenshots/repomind/architecture-view.png` -> 404

The deployed files existed under the GitHub Pages project path:

- `https://ratishoberoi.github.io/ratish-ai-portfolio/profile/ratish-oberoi.jpg` -> 200
- `https://ratishoberoi.github.io/ratish-ai-portfolio/screenshots/forge/control-center.png` -> 200

Root cause: rendered image `src` values did not include the GitHub Pages base path. Fix: all rendered portfolio image URLs now use the local `asset()` helper before they are passed to `next/image`.
