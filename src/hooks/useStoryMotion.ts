import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function useStoryMotion(scope: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add({ motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 760px)' }, ({ conditions }) => {
      if (!conditions?.motion) return
      const distance = conditions.mobile ? 8 : 20
      const ctx = gsap.context(() => {
        gsap.fromTo('.portrait', { y: -distance }, { y: distance, ease: 'none', scrollTrigger: { trigger: '.about-grid', start: 'top bottom', end: 'bottom top', scrub: .5 } })
        gsap.fromTo('.about-story-heading', { y: distance }, { y: -distance, ease: 'none', scrollTrigger: { trigger: '.about-grid', start: 'top bottom', end: 'bottom top', scrub: .5 } })
        gsap.fromTo('#projects-title', { x: 0 }, { x: conditions.mobile ? 5 : 14, ease: 'none', scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'top top', scrub: .5 } })
        gsap.fromTo('.award-progress > span', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.awards-list', start: 'top 80%', end: 'bottom 55%', scrub: .3 } })
        gsap.utils.toArray<HTMLElement>('.award').forEach(award => ScrollTrigger.create({ trigger: award, start: 'top 65%', onEnter: () => award.classList.add('is-progress-active'), onLeaveBack: () => award.classList.remove('is-progress-active') }))
      }, scope)
      return () => { ctx.revert(); document.querySelectorAll('.award.is-progress-active').forEach(node => node.classList.remove('is-progress-active')) }
    })
    return () => media.revert()
  }, [scope])
}

export function useProjectDepth(scope: RefObject<HTMLDivElement | null>, filter: string) {
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.project-depth').forEach(element => gsap.fromTo(element, { y: 8, scale: .985 }, { y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'center 60%', scrub: .4 } }))
      }, scope)
      return () => ctx.revert()
    })
    return () => media.revert()
  }, [scope, filter])
}
