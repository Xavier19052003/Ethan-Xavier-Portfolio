import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { cinematicPose } from '../utils/motionGeometry.ts'

export function useProjectDialogMotion(dialog: RefObject<HTMLDialogElement | null>, visible: boolean, projectId: string | undefined, onExited: () => void) {
  const origin = useRef<DOMRect | null>(null)
  // Presence outlives the route selection so Escape, buttons and browser Back
  // all finish the same exit before releasing focus and the page scroll lock.
  useLayoutEffect(() => {
    const element = dialog.current
    if (!element || !projectId) return
    const card = document.querySelector<HTMLElement>(`[data-flip-id="${projectId}"] .project-cover-button`)
    origin.current = card?.querySelector('.project-artwork')?.getBoundingClientRect() || null
    const opener = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : card
    const fromCard = Boolean(history.state?.portfolioCaseStudy)
    const top = fromCard ? scrollY : Math.max(0, (card?.getBoundingClientRect().top || 110) + scrollY - 110)
    const anchor = fromCard && opener?.closest('.project-card') ? opener : card
    const anchorTop = anchor?.getBoundingClientRect().top || 0
    const width = innerWidth
    const left = scrollX
    const overflow = document.body.style.overflow
    const restoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    element.showModal()
    element.scrollTo({ top: 0, behavior: 'instant' })
    document.body.style.overflow = 'hidden'
    document.body.dataset.projectOpen = 'true'
    window.dispatchEvent(new Event('portfolio:dialog-presence'))
    return () => {
      element.close()
      document.body.style.overflow = overflow
      delete document.body.dataset.projectOpen
      const returnTop = innerWidth !== width && anchor?.isConnected ? Math.max(0, anchor.getBoundingClientRect().top + scrollY - anchorTop) : top
      window.scrollTo({ top: returnTop, left, behavior: 'instant' })
      if (opener?.isConnected) opener.focus({ preventScroll: true })
      history.scrollRestoration = restoration
      window.dispatchEvent(new Event('portfolio:dialog-presence'))
    }
  }, [dialog, projectId])

  useLayoutEffect(() => {
    const element = dialog.current
    if (!element || !projectId) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = matchMedia('(max-width: 760px)').matches
    const content = element.querySelector('.dialog-content')
    const intro = Array.from(content?.children || []).slice(0, 4)
    const hero = element.querySelector('.project-artwork')
    const groups = Array.from(element.querySelectorAll<HTMLElement>('.case-facts, .app-showcase, .case-study-section, .website-gallery, .dialog-actions'))
    const targets = [element, ...intro, ...groups, ...(hero ? [hero] : [])]
    const animations: gsap.core.Animation[] = []
    let observer: IntersectionObserver | undefined
    let disposed = false
    function settle() {
      animations.forEach(animation => animation.kill())
      observer?.disconnect()
      gsap.set(targets, { clearProps: 'opacity,transform' })
      gsap.set(element, { '--dialog-backdrop-opacity': 1 })
      if (!visible) onExited()
    }
    if (reduced.matches) settle()
    else if (visible) {
      element.setAttribute('data-cinematic', origin.current ? 'thumbnail' : 'direct')
      animations.push(gsap.fromTo(element, { opacity: 0, '--dialog-backdrop-opacity': 0 }, {
        opacity: 1, '--dialog-backdrop-opacity': 1, duration: .4, ease: 'power3.out', clearProps: 'opacity,transform',
      }))
      if (hero) {
        const pose = cinematicPose(origin.current, hero.getBoundingClientRect(), mobile)
        animations.push(gsap.fromTo(hero, { ...pose, opacity: .25, transformOrigin: '50% 50%' }, { x: 0, y: 0, scale: 1, opacity: 1, duration: mobile ? .48 : .62, ease: 'power3.inOut', clearProps: 'opacity,transform,transformOrigin' }))
      }
      animations.push(gsap.fromTo(intro, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .45, stagger: .07, delay: .06, ease: 'power2.out', clearProps: 'opacity,transform' }))
      gsap.set(groups, { opacity: 0, y: 12 })
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (disposed || !entry.isIntersecting) return
        animations.push(gsap.to(entry.target, { opacity: 1, y: 0, duration: .45, ease: 'power2.out', clearProps: 'opacity,transform' }))
        observer?.unobserve(entry.target)
      }), { root: element, threshold: .05 })
      groups.forEach(group => observer!.observe(group))
    } else {
      element.setAttribute('data-cinematic', 'returning')
      const source = document.querySelector(`[data-flip-id="${projectId}"] .project-artwork`)?.getBoundingClientRect() || origin.current
      const heroBounds = hero?.getBoundingClientRect()
      if (hero && heroBounds && heroBounds.bottom > element.getBoundingClientRect().top && heroBounds.top < element.getBoundingClientRect().bottom) {
        animations.push(gsap.to(hero, { ...cinematicPose(source, heroBounds, mobile), opacity: .15, duration: .4, ease: 'power2.inOut' }))
      }
      animations.push(gsap.to(intro, { opacity: 0, y: -6, duration: .2 }))
      animations.push(gsap.to(element, { opacity: 0, scale: .98, '--dialog-backdrop-opacity': 0, duration: .42, ease: 'power2.inOut', onComplete: onExited }))
    }
    const preferenceChanged = () => { if (reduced.matches) settle() }
    const focused = (event: FocusEvent) => {
      const group = groups.find(group => group.contains(event.target as Node))
      if (group) { gsap.killTweensOf(group); gsap.set(group, { clearProps: 'opacity,transform' }); observer?.unobserve(group) }
    }
    reduced.addEventListener('change', preferenceChanged)
    element.addEventListener('focusin', focused)
    return () => {
      disposed = true
      animations.forEach(animation => animation.kill())
      observer?.disconnect()
      reduced.removeEventListener('change', preferenceChanged)
      element.removeEventListener('focusin', focused)
      gsap.set(targets, { clearProps: 'opacity,transform' })
      element.style.removeProperty('--dialog-backdrop-opacity')
    }
  }, [dialog, visible, projectId, onExited])
}
