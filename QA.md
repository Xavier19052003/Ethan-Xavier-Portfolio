# Verification notes

## Refinement and mobile showcase

- Refined the existing hero timeline and added independent SVG float, rotation and sphere movement; ambient loops pause outside the viewport and when the document is hidden. Reduced motion disables these effects.
- Added bounded magnetic CTAs and a native-cursor-preserving companion for fine hover pointers at desktop widths. Both are disabled on smaller screens/reduced motion.
- Removed the form, provider setup and form-only validation. Contact now prominently exposes email, phone, GitHub, location, Let’s Talk, Copy Email and the real CV.
- Active Autism now occupies the fourth featured position, explicitly labelled university team collaboration. Sneaker Pimps remains archived in project data and accessible through its existing case-study hash.
- Android phone previews use honest empty states because no real screenshots/APKs were supplied. Gallery wrapping and horizontal-versus-vertical swipe logic are tested; real screenshot presentation still requires assets.
- Browser verified contact/phone/dialog layouts at 1440, 1280, 1024, 768, 430, 390, 375 and 320px with no page/dialog horizontal overflow. Mobile copying announced success. The cursor companion is hidden below 900px. Light/dark rendering checked; no console errors observed.
- FRS VIP and BlaqPearl returned HTTP 200. No verified Nature’s Nurture or Autism live deployment was found, so no URL was fabricated.
- The supplied GitHub repository has an older static main-branch site. The React upgrade is committed on a separate branch to preserve the existing publication; deployments require a Vite `dist/` publishing workflow.

## Interactive upgrade

- TypeScript/Vite production build, ESLint and all six tests passed. New tests cover invalid/oversized contact fields, provider rejection/acknowledgement, honeypot handling and pre-paint theme selection with saved/system preferences and unavailable storage.
- Browser checked all requested widths (1440, 1280, 1024, 768, 430, 390, 375, 320px): no horizontal overflow; theme/menu controls fit.
- Theme toggle persisted after refresh. Dark hero, filters and case-study surfaces were inspected; branded artwork, portrait and EXP logo remain intact.
- Commercial/academic/mobile filters and rapid changes returned the correct cards without console errors.
- Case studies opened with focus in the dialog. Escape restored the originating control. Browser Forward and refresh reopened the selected case study. Shift+Tab stayed within the modal. Direct `#project/natures-nurture` and refresh worked under `/portfolio/`.
- All four CV controls activated under `/portfolio/`; production PDF returned 200 with the expected PDF signature. The root production-served PDF was byte-identical to the saved original.
- Copy email announced successful clipboard copying. Invalid email was identified by the browser's field validity API. Unconfigured form button was disabled with explicit setup guidance; no email was sent.
- Reduced-motion paths are guarded in GSAP and CSS, including filter completion on preference changes. An actual OS preference switch was not exercised in the browser.
- Real provider setup, server-side abuse rules and inbox delivery are outstanding, as documented in `CONTACT_SETUP.md`. No delivery success or accessibility certification is claimed.

## Professional CV synchronisation — 4 November 2026

Read both source PDF pages. Updated hero, biography, professional/freelance experience, project data, skills, education, achievements and contact details. Removed formal graduation claims in favour of expected completion in 2026. Preserved existing links, portrait, logo and animations.

Build/type checks, lint and three content/CV tests passed. Production preview downloaded `Ethan_Xavier_Peters_CV.pdf`; SHA-256 matched the source, public copy and built copy: `588BC9CD7B6A78104E3F627D48CAA26F4CD02AF4B8D67434706EF6C920397397`. All four buttons share the verified PDF and correct download filename. Desktop and 390px checks showed no horizontal overflow.

Verified locally on 3 November 2026.

- TypeScript and Vite production build passed.
- The built `dist/` site was also served with `npm run preview` and loaded in the browser: six projects, seven top-level content sections, and four disabled CV controls appeared correctly with no console errors.
- ESLint passed.
- Node tests passed: public/hidden content, all project filter groups, missing CV, SPA HTML fallback, and valid PDF signature handling.
- Browser checks: desktop, 768px tablet, 390px phone, and 320px narrow phone. Document width matches the available viewport at each checked breakpoint.
- Browser checks: commercial/academic filters display the correct entries; restoring All Projects displays six projects.
- EduSwap dialog opens with the supplied highlights and three labelled screenshot slots. Escape closes it and returns focus to the opener.
- Mobile menu opens, follows navigation links, closes on selection, and closes with Escape while returning focus to its toggle.
- Missing CV produces disabled buttons. No fake CV is included. Actual CV download needs a real supplied PDF; the valid-file loading branch is covered with an isolated test response.
- Browser console had no errors or warnings during the checks.
- Supplied FRS VIP, BlaqPearl, Sneaker Pimps, and derived GitHub profile URLs returned HTTP 200 when checked. Their content may change independently.
- Reduced-motion preference is handled by both GSAP media-query guards and CSS. No continuous background animation runs.

Not deployed. Missing personal assets and final-domain metadata are documented in README.md.

## Portrait and EXP logo — 4 November 2026

- Inspected the supplied 1200×1600 JPEG and 2000×2000 transparent PNG. Preserved original copies under `src/assets/originals/`; Documents originals were not modified.
- Prepared 375px/750px WebP portrait crops, a trimmed transparent logo, and 32px/48px/180px icons. No retouching, recolouring, or logo redrawing.
- Integrated portrait in About and reusable logo in navigation/footer; new PNG favicon references replace the old SVG reference.
- Checked 1440, 1024, 768, 390, and 375px widths: no horizontal overflow and portrait retains a 4:5 display ratio. Mobile menu still opens and navigates; all six projects and four unavailable-CV controls remain present.
- Build/type checking, ESLint, and all three existing tests passed. The CV remains unavailable until a genuine PDF is supplied.

## Readability and scroll-motion refinement

- Body copy now scales from 16px on phones to 18px on desktop; navigation, controls, skill tags, and supporting copy use 14px or larger. Small decorative captions use 12px.
- Added staggered heading/project entrances, scroll-linked hero orbit rotation, desktop sticker parallax, and rotating section accents. All motion respects the system’s reduced-motion preference, including changes made while the page is open.
- Keyboard focus completes a pending reveal immediately. Animation contexts, scroll triggers, and focus listeners are cleaned up on unmount, breakpoint changes, and project filtering.
- Rechecked 1440px desktop, 390px phone, and 320px phone: no horizontal page overflow; project filtering still returns the correct cards; completed reveals restore normal opacity and transforms.
- TypeScript/Vite build and ESLint passed after these changes.
