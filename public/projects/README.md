# Authentic project captures

Captured on 4 November 2026 from the exact public websites. Capture provenance, dimensions and compressed sizes are recorded in captures.json. Original PNG captures remain in the ignored preview/captures directory.

- BlaqPearl: desktop homepage, mobile homepage, full homepage and mobile product catalogue.
- FRS VIP Protection: desktop homepage, mobile homepage, full homepage and desktop services page. The source page scrolls its body rather than the root document; a full-height browser capture was used to include all content.
- Nature’s Nurture: desktop homepage, mobile homepage and full homepage. Verified against the matching local Nature Nurture repository remote and branding. Source scroll reveals were activated before the final full-page capture.
- Active Autism: desktop, mobile and full homepage captured from https://autism-allyship.pages.dev/; public-facing team contribution remains explicit.
- EduSwap and Kitabu: eight new preframed EduSwap screens and nine unchanged Kitabu screens are imported. See MOBILE_SCREENSHOTS.md for provenance and resolution limitations.

Each website folder contains thumbnail.webp (800px wide), desktop.webp, mobile.webp and full-page.webp. Cards lazy-load the thumbnail, use the mobile screenshot below 760px, and fetch full-page imagery only after a fine-pointer hover with motion enabled. Galleries load their images lazily. All paths use the existing Vite base-aware assetUrl helper.

To replace a capture, keep its filename and update captures.json. Only use authentic screenshots approved for the portfolio. Full-page captures should be checked for untriggered scroll reveals and lazy images.
