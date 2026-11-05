# Mobile preview motion and EduSwap screenshot update

Completed locally in the current main project directory on 5 November 2026. No branch switch, Git worktree, commit, push or deployment was used.

## Architecture and causes

The existing portfolio uses React 19, TypeScript, Vite, GSAP/ScrollTrigger for hero and section reveals, GSAP Flip for filters, CSS for desktop screenshot hover, and native dialog case studies driven by #project/id history entries. These systems remain in place. No dependencies or routing system were added.

Mobile previews were static because WebsiteScreenshot only requested full-page imagery for fine-pointer desktop hover, and mobile/coarse-pointer CSS hid it. Cases opened with showModal() and closed/unmounted immediately, with no presence retention or entrance/exit animation.

## Website previews

- Fine-pointer hover still loads a full-page image on demand and uses the existing measured CSS translation, easing and seven-second cap. This was verified in the browser; no GSAP mobile timeline runs on the desktop path.
- Touch-first media conditions now use one shared IntersectionObserver controller over website thumbnail frames only. Logo artwork and Android screenshots are excluded. It requires 60% visibility to start, chooses the card nearest the viewport centre, breaks ties by DOM order, and uses a 55% exit threshold plus 80px centre hysteresis and a 180ms selection delay.
- The selected frame requests its larger screenshot only when needed; inactive touch previews release their full-page image element. Rendered image height minus frame height determines the vertical travel; images with no extra content do not scroll.
- One GSAP timeline waits about 850ms, reveals downward over five to eight seconds, pauses 800ms, returns over 2.6 seconds, then fades back to the static thumbnail. It stops after one restrained demonstration until reactivated. Movement is confined to the existing overflow-hidden frame with transform/opacity; no page scrolling, layout dimensions or touch defaults are intercepted.
- A preview stops and resets when inactive, offscreen, a case study is present (including exit), the tab is hidden, pagehide fires, reduced motion is requested, a filter unmounts it or the component unmounts. Re-entry starts a new demonstration after the initial pause. Timers, animation frames, observers, event listeners and GSAP contexts are cleaned up.

## Dialog and gallery motion

All six projects share useProjectDialogMotion. Entrance overlaps a 380–480ms modal/backdrop reveal with a restrained hero fade and 450ms heading/supporting stagger. Case-study sections reveal as groups within the modal’s own scroll container. No fragile shared-element clones were introduced. Card press feedback is a subtle brightness response.

Closing retains the displayed project through a 280ms fade and small vertical movement, then closes the native dialog, releases the body lock and restores the saved page position and opener focus without animated scrolling. If the viewport width changes while open, restoration follows the original trigger’s relative position after responsive reflow. Filters remain in React state. Escape, backdrop, close buttons and browser Back share this path; Forward reopens correctly. Repeated close requests are guarded. Direct case-study links return to the corresponding card.

Gallery navigation decodes the destination before fading the previous screenshot out for 120ms and the new one in for 220ms. The frame has a fixed aspect ratio based on the gallery rather than the selected image. The next likely image is preloaded; the homepage does not eagerly load all eight screens. Rapid reversal cancels safely and restores visibility. Both projects retain arrows, keyboard navigation and practical horizontal swipe support.

Reduced motion disables autoplay, removes unnecessary movement and makes dialogs and gallery changes immediate. Preference changes settle active transitions, clear hidden states and keep navigation working. Existing theme colours, hero motion, cursor and magnetic-pointer guards, section reveals, contact actions and back-to-top behaviour remain unchanged.

## Exact EduSwap replacements

| Desktop original | Active web copy | Label |
| --- | --- | --- |
| Registration Screen.png | framed-registration.webp | Registration |
| Error message screen.png | framed-validation.webp | Input validation |
| Marketplace Screen.png | framed-marketplace.webp | Marketplace |
| Search Functionality.png | framed-search.webp | Search |
| Book Details Screen.png | framed-book-details.webp | Book details |
| Sell Book Screen.png | framed-sell.webp | Sell a textbook |
| Chat Screen.png | framed-inquiry.webp | Inquiry / chat |
| Profile Screen.png | framed-profile.webp | Student profile |

All eight were found on the OneDrive-redirected Desktop and visually inspected before import. The originals and black device borders are preserved. Web images retain natural proportions with contain-fit presentation, including the phone top and bottom navigation. EduSwap uses the existing preframed metadata and receives no second mockup border. Its project card centres the new Marketplace screenshot within the existing artwork dimensions and background.

The old ten-screen array has been replaced by the eight new paths, with no old/new mixing. Existing unused web files remain inactive. EduSwap’s academic in-memory MVP description and title-only search accuracy are preserved; no Room, Firebase, production authentication or cloud messaging was added. Kitabu’s images, project information, repository and case study are unchanged. Website screenshots were neither recaptured nor replaced.

## Verification

- npm.cmd run lint: passed, with existing rules retained.
- npm.cmd run build: passed; includes TypeScript checking. No separate type-check script exists.
- npm.cmd test: eleven tests passed. These include authentic gallery order and paths, deterministic preview choice, hysteresis, single-preview activation without hover under simulated touch media, modal/tab/reduced-motion/pagehide pauses and cleanup, plus desktop/paused-route suppression.
- git diff --check: passed.
- Browser smoke: every project opens and closes; entrance and retained exit were observed; Escape, Back/Forward, filter preservation, focus return and scroll restoration were checked. Rapid gallery reversal leaves opacity at 1. Desktop hover showed measured translation with the original seven-second cap.
- Responsive gallery checks passed at 320×568, 360×640, 375×667, 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1440×900 and 1920×1080: no page or dialog horizontal overflow, contain-fit screenshots and usable controls. Portrait and landscape dimensions are included.
- Dark dialog background remained the existing dark surface, and light mode was restored after testing. Browser console had no warnings/errors.
- SHA256 checks confirmed all 42 protected files (Desktop originals, Kitabu and website assets, branding/portrait assets and related retained material) unchanged. Original EduSwap app source was not edited.

### Testing limits

The in-app browser exposes viewport resizing but no touch or reduced-motion emulation capability. Firefox native mobile emulation was attempted, but the user was actively using that window, so it was left alone. Touch-media lifecycle and reduced-motion policy are covered by deterministic simulated-environment tests; actual touch autoplay, real-device performance and a live OS reduced-motion toggle have not been physically verified. Responsive resizing alone is not claimed as a real-device test. A final Android/iPhone check is recommended.

## Changed files

Modified: WebsiteScreenshot.tsx, ProjectDialog.tsx, MobileAppShowcase.tsx, AppProjectArtwork.tsx, Projects.tsx, appScreens.ts, projects.ts, main.tsx, screenshots.css, content.test.mjs, app-captures.json and screenshot documentation.

Added: useMobileProjectPreviews.ts, mobilePreviewController.ts, previewSelection.ts, useProjectDialogMotion.ts, useAppGalleryMotion.ts, project-motion.css, preview-selection.test.mjs, eight framed EduSwap WebP assets and this report.

No other portfolio sections, project links, card dimensions, grid spacing or professional descriptions were redesigned. Current branch remains main. No commit was created; nothing was pushed or deployed.
