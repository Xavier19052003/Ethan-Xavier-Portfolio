# Portfolio refinement

## Implemented

- Refined the existing hero timeline; it runs once per normal page load and does not restart on breakpoint changes after it has begun. Heading, dot, supporting copy, buttons and artwork remain coordinated.
- Added small independent SVG float/rotation/sphere loops. An IntersectionObserver pauses them when the artwork leaves view, and visibility handling pauses them when the document is hidden. Reduced-motion users receive no decorative loops.
- Added selected CTA magnetism using bounded CSS translation, separate from GSAP entrance transforms. It is restricted to fine hover pointers, desktop widths and normal motion preferences; keyboard focus resets it.
- Added a pointer-transparent cursor companion with project/action states. The native cursor remains available, touch is excluded, and listeners/animation frames are cleaned up.
- Replaced the contact form with prominent email, Let’s Talk, Copy Email, clickable phone/GitHub and location. Removed the form component, validation/delivery utilities, environment template, form-only tests and setup documentation. No email service is required.
- Promoted the collaborative Active Autism & Neuro-Diversity Allyship project into the four-card featured grid. Sneaker Pimps remains in the data as archived professional work; its old hash-linked case study still works.
- Added reusable Android phone showcases with image counter, previous/next buttons, screen selectors, arrow-key navigation, swipe detection, transitions, load-error handling and an honest no-screenshots state. Controls appear only when real image assets exist.

## Missing assets and destinations

EduSwap and Kitabu now use authentic screenshots imported from Pictures and Desktop. Their typed galleries live in src/data/appScreens.ts. The reusable phone viewer includes screen-specific descriptions, arrows, keyboard controls and swipes; images use object-fit: contain. No APK download has been invented.

Nature’s Nurture and Active Autism have no verified live URL in the portfolio sources. Their live actions remain absent. Existing FRS VIP and BlaqPearl URLs were checked and returned HTTP 200. Project-specific technologies and outcomes remain factual.

## GitHub and deployment

The upgraded React/Vite site is on `main` in `https://github.com/Xavier19052003/Ethan-Xavier-Portfolio.git`. The original static version remains recoverable in Git history. `.github/workflows/pages.yml` runs lint, tests and the production build, then publishes only `dist/` with GitHub Pages Actions. Pushes to `main` deploy automatically after successful checks.

The workflow uses `/Ethan-Xavier-Portfolio/` as Vite’s deployment base, including CV and image paths. The default local Vite configuration remains relative for development and portable builds.

Run locally with `npm run dev`. Check with `npm run lint`, `npm test`, `npm run build`. No extra runtime dependency is needed. Live URL: https://xavier19052003.github.io/Ethan-Xavier-Portfolio/
