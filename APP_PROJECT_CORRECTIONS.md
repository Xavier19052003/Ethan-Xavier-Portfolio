# Portfolio project corrections and Android case studies

Completed locally on 4 November 2026. No commit, push or deployment was performed.

## Projects and evidence

The visible lineup is Nature’s Nurture, FRS VIP Protection, BlaqPearl, Active Autism & Neuro-Diversity Allyship, EduSwap and Kitabu. Kitabu replaces the incorrectly named Android project throughout current project data and case studies. Sneaker Pimps remains archived outside the grid.

Both Android assignments were read: MADA_SS4__1_.docx and EthanPeters_MADB372_SF1(11).docx from Downloads. Local Android source in AndroidStudioProjects/EduSwap and AndroidStudioProjects/Kitabu_MADB372_SF1 was inspected for implementation details. Originals were opened read-only.

- EduSwap: ten genuine Pictures-folder screenshots, in the requested order. Its case study describes Activities, XML, ViewBinding, RecyclerView/TextbookAdapter and temporary in-memory Kotlin collections. Source confirms title searching; full MVVM, persistent storage, production authentication and cloud messaging are not claimed.
- Kitabu: nine numbered Desktop screenshots, catalogue through empty reservations. A separate pickup-action screenshot was not supplied; pending and active screens illustrate that transition. Its case study explains MVVM, Room entities, DAO/CRUD operations, Coroutines, Flow/StateFlow, booking transitions, documented tests and local-only limitations.
- Autism Allyship: captured the exact supplied website at https://autism-allyship.pages.dev/. Added desktop, mobile, full homepage and lightweight thumbnail assets. The university team context and specific front-end contribution remain explicit.
- Existing Nature’s Nurture, FRS VIP and BlaqPearl captures remain genuine and unchanged from the preceding screenshot update.

## Verified links

- Autism: https://autism-allyship.pages.dev/ — HTTP 200 and browser render verified.
- Nature’s Nurture: https://xavier19052003.github.io/Nature-Nurture/ — HTTP 200.
- FRS VIP: https://xavier19052003.github.io/FRS-VIP/ — HTTP 200.
- BlaqPearl: https://blaqpearl.co.za/ — latest automated request returned HTTP 429; previously verified browser captures and the exact URL were retained. No unrelated site was substituted.
- Kitabu source: https://github.com/Xavier19052003/Kitabu_MADB372_SF1 — public repository metadata verified, HTTP 200.
- EduSwap source: https://github.com/Xavier19052003/EduSwap-MADA372-App — discovered from the local Git remote and confirmed public, HTTP 200.

No APK, store listing, payment integration or cloud feature has been invented.

## Images and reusable viewer

All 19 original PNGs have identical before/after SHA256 hashes. Lossless WebP copies are stored under public/projects/eduswap and public/projects/kitabu. EduSwap retains original dimensions; Kitabu is resized proportionally to 720px wide. App assets total approximately 3.42 MB and are lazy-loaded; only the current gallery screen is rendered. The source images and documents were not modified or deleted.

EduSwap’s supplied images are low-resolution (some only 135–186px wide). Higher-resolution device exports would improve readability. No synthetic enhancement or fictional interface was created. Privacy review found demonstration account details and already-softened feedback input fields; no additional personal identifiers were added to captions, metadata or project copy.

MobileAppShowcase is shared by both applications. It supports typed image metadata, screen-specific titles/descriptions, previous/next controls, a screen counter, keyboard navigation, horizontal touch swipes, loading/error states and full-size links. Kitabu’s existing captured device frame is preserved without a duplicate frame or decorative speaker obscuring controls. Mobile uses one column with centred phone and supporting copy below. Existing reduced-motion CSS disables screen transitions.

AppProjectArtwork composes three actual application screens within the existing artwork area. Project grid/card dimensions, branding, navigation, typography, hero, GSAP effects, contact section, portrait and CV are preserved.

## Files changed

New: src/data/appScreens.ts; src/components/AppProjectArtwork.tsx; public/projects/app-captures.json; app and Autism WebP assets; this report.

Updated: src/data/projects.ts; src/data/caseStudies.ts; src/components/ProjectArtwork.tsx; src/components/MobileAppShowcase.tsx; src/components/ProjectDialog.tsx; src/components/ProjectCard.tsx; src/styles/refinements.css; tests/content.test.mjs; tsconfig.json; public/projects/captures.json; public/projects/README.md; public/projects/MOBILE_SCREENSHOTS.md; REFINEMENTS.md; historical SCREENSHOT_UPGRADE.md. The TypeScript option allows explicit .ts imports required by the existing Node test runner.

Earlier pending website-screenshot changes are retained. Deployment configuration is unchanged: main pushes would deploy via GitHub Pages, but no push was made.

## Validation

- TypeScript and Vite production build with --base=/Ethan-Xavier-Portfolio/: passed.
- ESLint: passed. Seven tests: passed, including gallery separation, actual asset files, corrected filters and verified destinations.
- Desktop 1440px, tablet 768px and mobile 390px: gallery controls, contain-fit image proportions and no horizontal overflow verified.
- EduSwap keyboard navigation reached Marketplace (3/10); Kitabu arrows and keyboard reached Reserve a book (3/9). App filter shows EduSwap and Kitabu. Light and dark themes render correctly.
- All 37 screenshot assets returned HTTP 200 and image/webp through the production preview beneath /Ethan-Xavier-Portfolio/.
- Logo and portrait are included correctly as image/png and image/webp; a stale dev-server asset issue was resolved by restarting the existing local preview. No branding files changed. Browser reports no broken images after restart.
- CV: four download links ready; production PDF HTTP 200 with unchanged SHA256 588bc9cd7b6a78104e3f627d48caa26f4cd02af4b8d67434706ef6c920397397.
- Real-device touch gestures and a live OS reduced-motion setting were not exercised. Swipe direction tests pass and reduced-motion rules remain in place. Android functional results are attributed to the assignment; Android instrumentation tests were not rerun.

No requested screenshot files are missing. A separate pickup-action image and higher-resolution EduSwap exports are optional improvements.
