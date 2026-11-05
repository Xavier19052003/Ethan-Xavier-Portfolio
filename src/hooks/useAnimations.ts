import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useAnimations(scope: RefObject<HTMLDivElement | null>) {
  const introPlayed = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 900px)',
    }, ({ conditions }) => {
      if (!conditions?.motion) return
      const distance = conditions.desktop ? 42 : 24
      const cleanups: (() => void)[] = []
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' }, delay: .12 })
        if (!introPlayed.current) {
        intro.call(() => { introPlayed.current = true })
          .from('.hero-eyebrow', { y: 20, opacity: 0, duration: .5 })
          .from('.hero-line', { y: 32, opacity: 0, duration: .75, stagger: .1 }, '-=.3')
          .from('.hero-period', { scale: .6, opacity: 0, duration: .35, transformOrigin: '50% 80%' }, '-=.3')
          .from('.hero-role, .hero-description', { y: 18, opacity: 0, duration: .5, stagger: .08 }, '-=.2')
          .from('.hero-actions > *', { y: 14, opacity: 0, duration: .45, stagger: .08 }, '-=.2')
          .from('.hero-heading-arrow, .hero-bottom', { opacity: 0, duration: .6, stagger: .06 }, .6)
          .from('.hero-visual', { y: 20, opacity: 0, duration: .9 }, 1.25)
        }
        const showHeroOnFocus = () => intro.progress(1)
        const hero = scope.current?.querySelector('#home')
        hero?.addEventListener('focusin', showHeroOnFocus)
        cleanups.push(() => hero?.removeEventListener('focusin', showHeroOnFocus))
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          const heading = element.classList.contains('section-heading')
          const targets = heading ? Array.from(element.children) : [element]
          const repeated = element.matches('.skill-group, .award, .principles article')
          const order = repeated ? Array.from(element.parentElement!.children).indexOf(element) % 3 : 0
          const reveal = gsap.from(targets, {
            y: distance,
            opacity: 0,
            duration: .85,
            delay: order * .07,
            stagger: heading ? .14 : 0,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          })
          // Keyboard navigation must never land on content waiting for a reveal.
          const showOnFocus = () => reveal.progress(1)
          element.addEventListener('focusin', showOnFocus)
          cleanups.push(() => element.removeEventListener('focusin', showOnFocus))
        })

        // Independent SVG layers keep decorative movement away from labels.
        const ambient = [
          gsap.to('.orbit-art', { y: -12, duration: 3.8, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true }),
          gsap.to('.orbit-motion', { rotation: 45, svgOrigin: '250 250', duration: 12, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true }),
          gsap.to('.hero-sphere', { y: -10, x: 7, scale: 1.07, svgOrigin: '250 250', duration: 4.2, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true }),
          gsap.to('.orbit-dot', { rotation: 360, svgOrigin: '250 250', duration: 18, ease: 'none', repeat: -1, paused: true }),
          gsap.to('.orbit-spark', { rotation: 45, scale: 1.25, svgOrigin: '94 356', duration: 2.8, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true }),
        ]
        let inView = false
        const playback = () => ambient.forEach(tween => { if (inView && !document.hidden && !document.body.dataset.expOpen && !document.body.dataset.projectOpen) tween.resume(); else tween.pause() })
        const observer = new IntersectionObserver(entries => { inView = entries[0]?.isIntersecting || false; playback() })
        const artwork = scope.current?.querySelector('.hero-art')
        if (artwork) observer.observe(artwork)
        document.addEventListener('visibilitychange', playback)
        window.addEventListener('portfolio:dialog-presence', playback)
        cleanups.push(() => { observer.disconnect(); document.removeEventListener('visibilitychange', playback); window.removeEventListener('portfolio:dialog-presence', playback) })
        if (conditions.desktop) {
          gsap.to('.art-sticker', {
            y: -22, rotation: 2, ease: 'none',
            scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 },
          })
        }
        gsap.utils.toArray<HTMLElement>('.heading-arrow, .contact-spark').forEach(element => {
          gsap.fromTo(element, { rotation: -18 }, {
            rotation: 12, ease: 'none',
            scrollTrigger: { trigger: element.closest('section'), start: 'top bottom', end: 'center top', scrub: 1 },
          })
        })
      }, scope)
      const refresh = () => { if (!disposed) ScrollTrigger.refresh() }
      let disposed = false
      // Font loading changes text wrapping and therefore trigger positions.
      void document.fonts.ready.then(refresh)
      return () => {
        disposed = true
        cleanups.forEach(cleanup => cleanup())
        context.revert()
      }
    })
    return () => media.revert()
  }, [scope])
}
