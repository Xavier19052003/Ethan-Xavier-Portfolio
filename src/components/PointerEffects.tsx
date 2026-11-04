import { useEffect, useRef } from 'react'

/** A decorative cursor companion; the native pointer is always retained. */
export function PointerEffects() {
  const cursor = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const preference = matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let cleanup = () => {}
    function setup() {
      cleanup()
      const dot = cursor.current
      if (!preference.matches || !dot) return
      let frame = 0
      let magnetic: HTMLElement | null = null
      let x = 0, y = 0
      const reset = () => {
        magnetic?.style.removeProperty('--magnet-x')
        magnetic?.style.removeProperty('--magnet-y')
        magnetic = null
      }
      const draw = () => {
        frame = 0
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        if (magnetic && !magnetic.matches(':focus-visible')) {
          const bounds = magnetic.getBoundingClientRect()
          magnetic.style.setProperty('--magnet-x', `${Math.max(-6, Math.min(6, (x - bounds.left - bounds.width / 2) * .12))}`)
          magnetic.style.setProperty('--magnet-y', `${Math.max(-5, Math.min(5, (y - bounds.top - bounds.height / 2) * .15))}`)
        }
      }
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') { hide(); return }
        x = event.clientX; y = event.clientY
        const target = event.target instanceof Element ? event.target : null
        const editing = !!target?.closest('input, textarea, [contenteditable="true"]')
        dot.dataset.visible = editing ? 'false' : 'true'
        dot.dataset.state = target?.closest('.project-cover-button') ? 'project' : target?.closest('a,button') ? 'action' : 'default'
        const next = target?.closest<HTMLElement>('[data-magnetic]:not(:disabled)') || null
        if (next !== magnetic) { reset(); magnetic = next }
        if (!frame) frame = requestAnimationFrame(draw)
      }
      const hide = () => { dot.dataset.visible = 'false'; reset() }
      const visibility = () => { if (document.hidden) hide() }
      document.addEventListener('pointermove', move, { passive: true })
      document.documentElement.addEventListener('pointerleave', hide)
      document.addEventListener('focusin', reset)
      document.addEventListener('visibilitychange', visibility)
      window.addEventListener('blur', hide)
      window.addEventListener('scroll', hide, { passive: true })
      cleanup = () => {
        cancelAnimationFrame(frame); hide()
        document.removeEventListener('pointermove', move)
        document.documentElement.removeEventListener('pointerleave', hide)
        document.removeEventListener('focusin', reset)
        document.removeEventListener('visibilitychange', visibility)
        window.removeEventListener('blur', hide); window.removeEventListener('scroll', hide)
      }
    }
    setup(); preference.addEventListener('change', setup)
    return () => { cleanup(); preference.removeEventListener('change', setup) }
  }, [])
  return <div ref={cursor} className="cursor-companion" aria-hidden="true" data-visible="false"><span>View</span></div>
}
