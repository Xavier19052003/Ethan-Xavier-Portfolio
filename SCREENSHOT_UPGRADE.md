> Historical report from the first screenshot update. For the current Android galleries and verified Autism URL, see APP_PROJECT_CORRECTIONS.md.

# Project screenshot upgrade — 4 November 2026

Implemented locally; nothing committed, pushed or deployed.

## Captures and verified links

| Project | Source | Captures | Public source |
| --- | --- | --- | --- |
| BlaqPearl | https://blaqpearl.co.za/ | Desktop, mobile, full homepage, mobile catalogue | Not supplied; no source link added |
| FRS VIP Protection | https://xavier19052003.github.io/FRS-VIP/ | Desktop, mobile, full homepage, services | https://github.com/Xavier19052003/FRS-VIP |
| Nature’s Nurture | https://xavier19052003.github.io/Nature-Nurture/ | Desktop, mobile, full homepage | https://github.com/Xavier19052003/Nature-Nurture |

Nature’s Nurture was identified from the existing local project's Git remote and verified against the live branding and content. Both linked source repositories returned public metadata (HTTP 200). Additional pages captured: BlaqPearl /collections/all and FRS VIP /services.html.

Active Autism’s public URL remains unverified. Local screenshots were inspected but are admin workflow documentation, so its existing artwork remains. EduSwap and Kitabu still need genuine device/emulator screenshots; their current placeholders and phone viewer remain intact. No fictional images or substitute businesses were used.

## Implementation

- Added 14 WebP assets under public/projects/{blaqpearl,frs-vip,natures-nurture}, plus captures.json with provenance, dimensions and sizes. Three lightweight card thumbnails total approximately 105 KB. Large full-page assets are requested only on fine-pointer hover with motion enabled.
- Added src/components/WebsiteScreenshot.tsx and src/styles/screenshots.css. ResizeObserver measures actual scaled image height minus frame height, with a maximum seven-second transition. Leaving the card returns to the top. Short images retain the normal zoom. Touch/coarse-pointer and reduced-motion contexts use static imagery.
- Updated ProjectArtwork.tsx, ProjectCard.tsx and ProjectDialog.tsx for responsive screenshots and labelled gallery images linking to full-size versions.
- Updated src/data/projects.ts with authentic asset paths, the verified Nature’s Nurture live URL and public source links. Existing descriptions, contributions, categories, technology tags and archived projects are preserved.
- Imported screenshot styles in src/main.tsx; excluded full-page overlays from the existing global image zoom in src/styles/global.css to avoid competing transforms.
- Updated tests/content.test.mjs to reflect the newly verified Nature’s Nurture URL, and public/projects/README.md with capture and replacement guidance.

The existing grid, card dimensions, spacing and typography were retained. No dependencies were added. Logo, portrait and CV files are unchanged.

## Verification

- TypeScript and production build with --base=/Ethan-Xavier-Portfolio/: passed.
- ESLint: passed. Six existing tests: passed.
- Browser checks: desktop cards, mobile static thumbnails, filters (Android filter shows EduSwap and Kitabu), light/dark mode, BlaqPearl case study and all three gallery images, lazy hover request and measured transform. No console warnings/errors or horizontal overflow at 390px and 1440px.
- All 14 WebP files returned HTTP 200 with image/webp through the production preview under /Ethan-Xavier-Portfolio/.
- CV download completed through the UI; production PDF returns HTTP 200 with %PDF- signature and its unchanged SHA256: 588bc9cd7b6a78104e3f627d48caa26f4cd02af4b8d67434706ef6c920397397.
- Motion and responsive rules explicitly disable decorative movement for reduced-motion and coarse-pointer users. A real touch device and OS reduced-motion setting were not exercised.

Original PNG captures and QA previews are retained in the ignored preview directory. The public live site remains unchanged pending a separate deployment request.
