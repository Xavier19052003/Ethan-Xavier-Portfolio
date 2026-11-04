# Xavier Designs

The interactive upgrade adds coordinated hero motion, scroll progress, floating back-to-top, animated filtering, hash-linked case studies, copy email and persistent light/dark themes. See `INTERACTIVE_UPGRADE.md` for implementation details and verification. The contact section now uses prominent email, phone and GitHub details, with Let’s Talk and Copy Email actions. The form and provider setup have been removed. See `REFINEMENTS.md` for the latest changes and mobile screenshot requirements.

The supplied two-page professional CV is now included at `public/Ethan_Xavier_Peters_CV.pdf`. The four CV buttons are active. Profile and content match the CV, including final-year status and expected completion in 2026. Replace that PDF and rebuild to update all downloads. The original in Downloads is untouched.

A responsive portfolio for Ethan Xavier Peters, built with React, Vite, TypeScript, custom CSS, GSAP, and Lucide React. All project files live directly in this folder.

## Run locally

Use Node.js 22.18+ (or Node.js 24 LTS) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Fonts are bundled locally; no external font service is needed.

```sh
npm run lint
npm test
npm run build
npm run preview
```

`npm run build` checks TypeScript and creates the deployable `dist/` directory. `preview` serves that production build locally. Tests cover public project visibility, category filtering, and missing/invalid/valid CV handling.

## Update personal and contact information

Edit `src/data/profile.ts` for the verified email, phone, location and GitHub profile. LinkedIn is unset until a genuine URL is supplied. Contact uses `mailto:`, `tel:` and clipboard copying; no form or external delivery service is needed.

Your supplied portrait is integrated with responsive WebP images in `public/images/`. Update both `portrait` and `portraitSmall` when replacing it. The EXP logo is shared by the navigation and footer. Original image copies and the regeneration script are documented in `public/images/README.md`. Qualification, location, and CV filename are also in this file. Other biographical copy is in `src/sections/About.tsx` and `Hero.tsx`.

## Projects

Edit `src/data/projects.ts`. Every project supports `id`, `title`, `category`, `description`, `technologies`, `image`, `imageAlt`, `gallery`, `liveUrl`, `liveLinkEnabled`, `githubUrl`, `featured`, `status`, `verified`, `highlights`, `filters`, `theme`, and an optional `note`.

- Add an entry with a unique `id`; use only confirmed facts and technologies.
- Set `verified: true` and status `published` or `academic` to display it. Here `published` means the project entry is ready for the public grid, not that the website is live.
- Assign the relevant filter categories. Featured projects appear first; remaining academic projects have a separate group.
- Set `featured: true` to sort major work first within its group. Active Autism is featured as a university team collaboration. Set `archived: true` to retain a project in history while removing it from the grid.
- Leave missing URLs as empty strings. Repository buttons appear only when `githubUrl` is supplied.
- Disable a live link by setting `liveLinkEnabled: false`. This is especially relevant if the current Sneaker Pimps site no longer represents your contribution.
- MindMate AI, Kojo, Thirst for Change, and STUDIO CORE / BishopCourt Studios are stored but hidden pending verification. Fill in their descriptions, categories, highlights, and verified details before making them visible.

### Replace covers and add galleries

All current project covers are explicitly labelled original visual placeholders, not screenshots. Add approved images to `public/projects/` and set `image: 'projects/filename.webp'`, with accurate `imageAlt`. Use web-optimised WebP around 1400px wide; card images use a 3:2 crop, and academic cards a wider crop. Choose screenshots without important text at the outer edge.

For additional images, populate `gallery: [{ src: 'projects/screen.webp', alt: 'Description of this screen' }]`. Galleries appear in the accessible project dialog. Replace EduSwap’s three empty screenshot slots with real app images. Do not use images that misrepresent your contribution.

## Add the CV

Put the real PDF at `public/Ethan_Xavier_Peters_CV.pdf`. Rebuild and deploy. No component edits are needed. All four CV buttons share one fetch, verify the `%PDF-` signature, and offer a same-origin blob download with the correct filename. Missing files, HTML fallback pages, failed requests, and invalid content keep buttons disabled. The file is fetched when the page loads; refresh after adding it locally.

## Other content and design

- Skills: `src/data/skills.ts`
- Awards: `src/data/achievements.ts`
- Colours, layout, responsive breakpoints: `src/styles/global.css`
- Animation setup and cleanup: `src/hooks/useAnimations.ts`
- Reusable components: `src/components/`
- Main sections: `src/sections/`

GSAP uses scoped cleanup and respects `prefers-reduced-motion`. The site includes semantic landmarks, a skip link, active section navigation, labelled controls, native modal focus handling, and keyboard-accessible filters. No fake skills percentages, testimonials, achievements, employment dates, or unverified technical claims are included.

## Production deployment

The GitHub repository already has an older static Pages site. The upgrade is pushed on `refine-interactive-portfolio`. Follow `REFINEMENTS.md` before changing Pages publishing or merging this Vite source into the branch-served root.

This is a static site; no server, credentials, database, or API keys are required. It has not been deployed by this project setup.

1. Run `npm ci`, `npm run lint`, `npm test`, and `npm run build`.
2. Deploy the **contents of `dist/`** to a static hosting provider (for example Cloudflare Pages, Netlify, Vercel, or GitHub Pages). For build-based hosts use `npm run build` and output directory `dist`.
3. For GitHub Pages, use a Pages build workflow or upload the built artifact through your chosen deployment workflow. Do not serve the unbuilt TypeScript source. Relative Vite asset paths support repository subdirectories.
4. Add your chosen domain and HTTPS through the host, if desired.
5. Verify navigation, external links, downloaded CV, and mobile layout on the final URL.

### Before publishing

- Supply project screenshots and an optional verified LinkedIn URL. The real CV, portrait and contact details are integrated.
- Add Nature’s Nurture’s live URL when available.
- Review the current Sneaker Pimps website and disable its link if appropriate.
- Once the final domain is known, add an absolute canonical URL and `og:url` in `index.html`.
- `public/social-card.svg` is the editable sharing artwork. Run `npm run social` to regenerate the included 1200×630 PNG after editing. Once deployed, replace both social image meta values with the PNG’s **absolute deployed URL** for social crawlers. Never invent a deployment domain.

## Checks and known limits

The content tests deliberately avoid making claims about external sites. External URLs can change independently of this portfolio. The real CV and portrait are integrated; actual project/application screenshots are still needed. All placeholders are visible and documented, and no unverified project is shown publicly.
