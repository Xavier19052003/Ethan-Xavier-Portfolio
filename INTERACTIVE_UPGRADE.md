# Interactive upgrade

## Existing foundation retained

The site remains a single-page React/TypeScript Vite app, with relative Vite asset paths (`base: './'`), native section anchors, custom CSS and GSAP. Existing portrait, EXP branding, CV, project links, contact details and all public/hidden project entries are preserved. The restore checkpoint is unchanged.

## Phase 1

- A coordinated GSAP hero timeline reveals two semantic heading lines, the purple full stop, supporting text, calls to action and artwork. Keyboard focus completes pending reveals.
- Existing section/portrait/experience/skill/award reveals remain scoped and cleaned up under Strict Mode and media-query changes.
- Project artwork lift, title-arrow motion and border feedback support hover and keyboard focus. Touch and reduced-motion rules avoid sticky movement.
- Native smooth anchor scrolling and sticky-header offsets remain. Active navigation is frame-throttled and updates React state only when the current section changes.
- A 3px decorative progress line responds to scroll and body resizing without React state updates. A floating, labelled back-to-top button appears after scrolling, respects reduced motion and remains keyboard accessible.

## Phase 2

- Project filters retain meaningful existing categories. GSAP Flip animates retained/repositioned cards, incoming entries and the grid container height. Result counts are announced and filter focus is preserved.
- Existing native dialogs now include factual context, role, contribution and development approach where verified. Unknown challenges, dates, outcomes and screenshots are omitted. Limited-data projects have concise overviews.
- Case studies use `#project/PROJECT_ID`, supporting refresh, direct links and browser Back/Forward on static/GitHub Pages hosting. Native dialogs trap focus, handle Escape, lock background scrolling and restore focus to the opener. No router dependency is required.
- The form integration from this phase was subsequently removed at the user’s request. Contact now uses prominent direct email/phone/GitHub links and copying. See `REFINEMENTS.md`.
- Copy email uses the Clipboard API, announces success/fallback and clears timers on unmount.
- Theme toggle supports saved light/dark selection and OS preference when no saved selection exists. An early script applies it before React paints. Storage failures are nonfatal. The original light palette is preserved; dark interface surfaces keep photographs and project artwork intact.

## Files

Core files: `CopyEmail.tsx`, `ThemeToggle.tsx`, `ScrollControls.tsx` in `src/components/`; `src/data/caseStudies.ts`; `src/styles/interactions.css`; `tests/interactions.test.mjs`. Former form-only files were removed during the later refinement.

Modified: `App.tsx`, `main.tsx`, `index.html`, hero/contact/projects sections, navigation/project cards/project dialogs and the shared animation hook.

No new package dependency was added. GSAP Flip comes from the installed GSAP package. The production JS bundle is approximately 420KB before gzip, 143KB gzipped, plus locally hosted fonts and images.

## Deployment and remaining work

Run `npm run lint`, `npm test`, `npm run build`. Deploy `dist/` using the existing static workflow. All case-study routes are hashes, so they do not need a server rewrite. The professional CV filename and base-aware download implementation are unchanged.

Contact is now handled through direct email and phone links; no delivery provider configuration is required. Screenshot slots remain labelled until you supply actual project screenshots. Source publishing uses the separate refinement branch; deployment remains a separate build/publish step. See `REFINEMENTS.md`.
