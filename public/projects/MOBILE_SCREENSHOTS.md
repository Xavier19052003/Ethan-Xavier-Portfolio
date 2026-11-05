# Android screenshot presentation

EduSwap now uses eight new, authentic preframed screenshots from the redirected Windows Desktop, imported on 5 November 2026. The active order is Registration, Input validation, Marketplace, Search, Book details, Sell a textbook, Inquiry / chat and Student profile. All active image paths begin projects/eduswap/framed-. Old web copies are retained as inactive assets; none appears in the active gallery or card.

The Desktop originals are 1466×3101 PNGs. Optimised WebP copies are 720px wide, preserve the entire phone border and interface, and total about 965 KB. The new Marketplace screen is the centred card image. Existing phone borders are not duplicated by the portfolio.

Kitabu’s nine image assets and project information are unchanged. Its screenshots already contain device framing.

The shared viewer keeps a fixed portrait frame, uses contain-fit images, decodes a requested image before a 120ms outgoing fade and 220ms entrance, and preloads only the next likely screen. Arrows, keyboard controls, numbered selectors and horizontal swipes remain available. Reduced motion uses immediate image changes.

Original files are untouched. Current web dimensions and paths are recorded in app-captures.json. See MOBILE_MOTION_EDUSWAP_UPDATE.md at the project root for motion architecture, responsive results and testing limits.
