import { useEffect, useRef, useState, type ReactNode } from 'react'
import { RotateCcw, RotateCw } from 'lucide-react'
import gsap from 'gsap'
import { clamp, phoneAngles } from '../utils/motionGeometry.ts'

export function PhoneStage({ title, children }: { title: string; children: ReactNode }) {
  const model = useRef<HTMLDivElement>(null)
  const surface = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; x: number; y: number; touch: boolean } | null>(null)
  const angle = useRef({ x: 0, y: 0 })
  const move = useRef<(x: number, y: number) => void>(() => undefined)
  const [touchRotation, setTouchRotation] = useState(false)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const element = model.current
    if (!element) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const x = gsap.quickTo(element, 'rotationX', { duration: .24, ease: 'power2.out' })
    const y = gsap.quickTo(element, 'rotationY', { duration: .24, ease: 'power2.out' })
    move.current = (rx, ry) => { if (!preference.matches) { angle.current = { x: rx, y: ry }; x(rx); y(ry) } }
    const reset = () => { x.tween.pause(); y.tween.pause(); gsap.set(element, { rotationX: 0, rotationY: 0 }); angle.current = { x: 0, y: 0 }; drag.current = null }
    const changed = () => { setReduced(preference.matches); if (preference.matches) reset() }
    const hidden = () => { if (document.hidden) reset() }
    const observer = new IntersectionObserver(entries => { if (!entries[0]?.isIntersecting) reset() })
    if (surface.current) observer.observe(surface.current)
    preference.addEventListener('change', changed)
    document.addEventListener('visibilitychange', hidden)
    return () => { observer.disconnect(); preference.removeEventListener('change', changed); document.removeEventListener('visibilitychange', hidden); x.tween.kill(); y.tween.kill(); gsap.set(element, { clearProps: 'transform' }) }
  }, [])
  const reset = () => { drag.current = null; move.current(0, 0) }
  return <div className="phone-3d" data-rotation-mode={touchRotation && !reduced ? 'true' : 'false'}>
    <div ref={surface} className="phone-perspective" onPointerDown={event => {
      if (reduced || event.button !== 0 || (event.pointerType !== 'mouse' && !touchRotation)) return
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, touch: event.pointerType !== 'mouse' }
      if (event.pointerType === 'mouse') event.currentTarget.setPointerCapture(event.pointerId)
    }} onPointerMove={event => {
      const start = drag.current
      if (!start || start.id !== event.pointerId) return
      const dx = event.clientX - start.x, dy = event.clientY - start.y
      if (start.touch && Math.abs(dy) > Math.abs(dx) + 8) { drag.current = null; return }
      if (start.touch && Math.abs(dx) < 8) return
      event.currentTarget.setPointerCapture(event.pointerId)
      const next = phoneAngles(dx, dy); move.current(next.x, next.y)
    }} onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); reset() }} onPointerCancel={reset}>
      <div ref={model} className="phone-tilt" role="group" aria-label={`${title} 3D phone presentation`}>{children}</div>
    </div>
    <fieldset className="phone-rotation-controls" onKeyDown={event => { if (!reduced && ['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); move.current(angle.current.x, clamp(angle.current.y + (event.key === 'ArrowRight' ? 8 : -8), -16, 16)) } }}><legend>3D view</legend><button type="button" className="icon-button" aria-label="Rotate phone left" disabled={reduced} onClick={() => move.current(angle.current.x, clamp(angle.current.y - 8, -16, 16))}><RotateCcw size={17}/></button><button type="button" className="text-link" onClick={reset}>Reset view</button><button type="button" className="icon-button" aria-label="Rotate phone right" disabled={reduced} onClick={() => move.current(angle.current.x, clamp(angle.current.y + 8, -16, 16))}><RotateCw size={17}/></button></fieldset>
    <button type="button" className="phone-touch-mode text-link" aria-pressed={touchRotation} disabled={reduced} onClick={() => { reset(); setTouchRotation(value => !value) }}>{touchRotation ? 'Turn off touch rotation' : 'Enable touch rotation'}</button>
    <p className="phone-gesture-hint">{reduced ? 'Static view for reduced motion. Screen navigation stays available.' : touchRotation ? 'Drag horizontally to rotate. Vertical scrolling stays available.' : 'Drag with a mouse to rotate. On touch, swipe to change screens or enable rotation.'}</p>
  </div>
}
