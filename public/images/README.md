# Portrait and EXP branding

The supplied portrait appears in About, with 375px and 750px WebP versions. The EXP logo is transparent, with its original lettering and gradient preserved. The footer and favicon use a light backing for contrast.

Original copies are preserved in `src/assets/originals/`; the Documents originals are untouched. To regenerate the web assets, run `node scripts/prepare-brand-assets.mjs`. Sharp is a development-only dependency.

Portrait paths are configured in `src/data/profile.ts` (`portrait` and `portraitSmall`). The reusable logo is `src/components/BrandLogo.tsx`. Favicon references live in `index.html`.
