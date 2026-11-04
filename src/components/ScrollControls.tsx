import { useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollControls() {
  const line = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const available = document.documentElement.scrollHeight - window.innerHeight
      if (line.current) line.current.style.transform = `scaleX(${available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0})`
      if (button.current) button.current.hidden = window.scrollY < Math.max(600, window.innerHeight * .8)
    }
    const queue = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(queue)
    observer.observe(document.body)
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    document.addEventListener('focusin', queue)
    document.addEventListener('focusout', queue)
    update()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); document.removeEventListener('focusin', queue); document.removeEventListener('focusout', queue) }
  }, [])
  const top = () => {
    document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <><div ref={line} className="scroll-progress" aria-hidden="true"/><button ref={button} className="floating-top icon-button" type="button" hidden onClick={top} aria-label="Back to top"><ArrowUp size={20}/></button></>
}
