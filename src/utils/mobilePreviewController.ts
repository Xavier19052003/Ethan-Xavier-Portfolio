import { selectPreview } from './previewSelection.ts'

export function createMobilePreviewController(frames: HTMLElement[], paused: boolean, environment = window) {
    const { document } = environment
    const mobile = environment.matchMedia('(hover: none), (pointer: coarse)')
    const reduced = environment.matchMedia('(prefers-reduced-motion: reduce)')
    const ratios = new Map<HTMLElement, number>()
    let active: HTMLElement | null = null
    let timer = 0, frame = 0, disposed = false, away = false
    function activate(next: HTMLElement | null) {
      if (next === active) return
      active?.dispatchEvent(new environment.CustomEvent('portfolio:preview', { detail: false }))
      active = next
      active?.dispatchEvent(new environment.CustomEvent('portfolio:preview', { detail: true }))
    }
    const blocked = () => paused || away || document.hidden || !mobile.matches || reduced.matches || Boolean(document.querySelector('.project-dialog[open], .exp-experience[open]'))
    function choose() {
      frame = 0
      if (disposed || blocked()) { activate(null); return }
      const candidates = frames.map((element, order) => {
        const rect = element.getBoundingClientRect()
        return { id: String(order), ratio: ratios.get(element) || 0, distance: Math.abs(rect.top + rect.height / 2 - environment.innerHeight / 2), order }
      })
      const selected = selectPreview(candidates, active ? String(frames.indexOf(active)) : null)
      activate(selected === null ? null : frames[Number(selected)])
    }
    function schedule() {
      if (disposed) return
      if (blocked()) { environment.clearTimeout(timer); activate(null); return }
      if (active && (ratios.get(active) || 0) < .55) activate(null)
      environment.clearTimeout(timer)
      timer = environment.setTimeout(() => { if (!frame) frame = environment.requestAnimationFrame(choose) }, 180)
    }
    const observer = new environment.IntersectionObserver(entries => {
      entries.forEach(entry => ratios.set(entry.target as HTMLElement, entry.intersectionRatio))
      schedule()
    }, { threshold: [0, .3, .55, .6, .75, 1] })
    frames.forEach(element => observer.observe(element))
    const hide = () => { away = true; schedule() }
    const show = () => { away = false; schedule() }
    environment.addEventListener('scroll', schedule, { passive: true })
    environment.addEventListener('resize', schedule, { passive: true })
    environment.addEventListener('pagehide', hide)
    environment.addEventListener('pageshow', show)
    environment.addEventListener('portfolio:dialog-presence', schedule)
    document.addEventListener('visibilitychange', schedule)
    mobile.addEventListener('change', schedule)
    reduced.addEventListener('change', schedule)
    return () => {
      disposed = true
      activate(null)
      observer.disconnect()
      environment.clearTimeout(timer)
      environment.cancelAnimationFrame(frame)
      environment.removeEventListener('scroll', schedule)
      environment.removeEventListener('resize', schedule)
      environment.removeEventListener('pagehide', hide)
      environment.removeEventListener('pageshow', show)
      environment.removeEventListener('portfolio:dialog-presence', schedule)
      document.removeEventListener('visibilitychange', schedule)
      mobile.removeEventListener('change', schedule)
      reduced.removeEventListener('change', schedule)
    }
}
