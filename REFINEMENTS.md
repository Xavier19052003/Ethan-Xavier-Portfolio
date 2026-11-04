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

No actual Android screenshots or shareable APK files were present. Add approved EduSwap screenshots for registration, home, textbook search, book details, selling listings, inbox and in-app messaging under `public/projects/eduswap/`, then populate the `gallery` array in `src/data/projects.ts` with public-relative `src` and descriptive `alt` values. Use `gallery` the same way for CampusConnect. The phone display uses `object-fit: contain` and does not stretch images. APK links have not been invented.

Nature’s Nurture and Active Autism have no verified live URL in the portfolio sources. Their live actions remain absent. Existing FRS VIP and BlaqPearl URLs were checked and returned HTTP 200. Project-specific technologies and outcomes remain factual.

## GitHub and deployment

The supplied remote is `https://github.com/Xavier19052003/Ethan-Xavier-Portfolio.git`. Its existing `main` commit contains an older static portfolio and original image files, which are preserved. This React/Vite upgrade is prepared on `refine-interactive-portfolio` so it does not replace an existing branch-served GitHub Pages site with unbuilt source.

For publishing the upgrade, configure GitHub Pages to receive a build of `dist/` through an approved deployment workflow. Build with `npm ci` and `npm run build`; deploy the contents of `dist/`. Do not merge the new source `index.html` into a branch-served Pages root without updating publishing, because browsers cannot execute raw TypeScript/TSX. No deployment is performed as part of this refinement.

Run locally with `npm run dev`. Check with `npm run lint`, `npm test`, `npm run build`. No new package dependency was introduced by this refinement. The existing CV and its filename are preserved.
