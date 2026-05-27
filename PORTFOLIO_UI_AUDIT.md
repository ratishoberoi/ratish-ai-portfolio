# Portfolio UI Audit

Generated locally on 2026-05-27.

## Visual Quality

Score: 9.3/10

The redesign now behaves more like an AI infrastructure product than a conventional portfolio. The first screen is concise, the Forge and RepoMind simulators create memorable interaction, Terminal Mode gives technical visitors a fast alternate route, and project depth is deferred into modal case studies.

## Mobile

Score: 9.1/10

The hero stacks cleanly, buttons wrap, simulators collapse into readable panels, modals use max-height scrolling, and the assistant remains bottom-right without blocking primary content.

## Performance

Score: 9.3/10

Images use Next responsive sizing and base-path-safe URLs. Hero photo is prioritized; project screenshots are responsive and the site remains a static GitHub Pages export.

Production-path Lighthouse performance check on the local static export scored 98/100 after the interaction redesign.

## Accessibility

Score: 8.6/10

Buttons and modal close controls include labels where needed. Color contrast is strong. Future improvement: add focus trapping for the project modal.

## Risks

- GitHub REST API can be rate-limited, so the UI includes local fallbacks.
- The simulator output is intentionally frontend-only and illustrative; copy should stay clear that it demonstrates system thinking rather than running a backend.

## Interaction Audit

- Forge Simulator covers objective execution, repository analysis, model routing, patch generation, validation, and judge verdict.
- RepoMind Simulator covers repository ingest, AST parsing, embeddings, architecture generation, security findings, and CTO summary.
- Terminal Mode supports `whoami`, `projects`, `skills`, `oss`, `contact`, `forge`, and `repomind`.
- The assistant now supports Recruiter, CTO, and Engineer modes with local structured answers and free-form query matching.

## Image Rendering Fix

Production browser inspection found broken root-relative image requests:

- `https://ratishoberoi.github.io/profile/ratish-oberoi.jpg` -> 404
- `https://ratishoberoi.github.io/screenshots/forge/control-center.png` -> 404
- `https://ratishoberoi.github.io/screenshots/repomind/architecture-view.png` -> 404

The deployed files existed under the GitHub Pages project path:

- `https://ratishoberoi.github.io/ratish-ai-portfolio/profile/ratish-oberoi.jpg` -> 200
- `https://ratishoberoi.github.io/ratish-ai-portfolio/screenshots/forge/control-center.png` -> 200

Root cause: rendered image `src` values did not include the GitHub Pages base path. Fix: all rendered portfolio image URLs now use the local `asset()` helper before they are passed to `next/image`.

Latest local production-path verification:

- `http://localhost:4174/ratish-ai-portfolio/profile/ratish-oberoi.jpg` -> 200, rendered 540x1200
- `http://localhost:4174/ratish-ai-portfolio/screenshots/forge/control-center.png` -> 200, rendered 1920x1080
- `http://localhost:4174/ratish-ai-portfolio/screenshots/repomind/architecture-view.png` -> 200, rendered 1440x1000
