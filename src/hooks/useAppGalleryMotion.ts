import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import type { ProjectScreen } from '../data/projects'
import { assetUrl } from '../utils/assets'
import { screenIndex } from '../utils/gallery'

export function useAppGalleryMotion(screens: ProjectScreen[]) {
  const [index, setIndex] = useState(0)
  const [shownIndex, setShownIndex] = useState(0)
  const image = useRef<HTMLImageElement>(null)
  const enter = useRef<gsap.core.Tween | null>(null)
  const leave = useRef<gsap.core.Tween | null>(null)
  useEffect(() => {
    if (index === shownIndex) {
      // Rapid Next/Previous can cancel an outgoing fade and return to the
      // already displayed screen. Restore it instead of leaving partial opacity.
      if (image.current && leave.current) {
        enter.current?.kill()
        enter.current = gsap.to(image.current, { opacity: 1, x: 0, duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : .22, clearProps: 'opacity,transform' })
      }
      return
    }
    if (!screens[index]) return
    let cancelled = false
    const preload = new Image()
    const ready = () => {
      if (cancelled) return
      enter.current?.kill()
      if (!image.current || matchMedia('(prefers-reduced-motion: reduce)').matches) { setShownIndex(index); return }
      leave.current = gsap.to(image.current, { opacity: 0, x: -4, duration: .12, ease: 'power1.in', onComplete: () => { if (!cancelled) setShownIndex(index) } })
    }
    preload.onload = () => { preload.decode().catch(() => undefined).then(ready) }
    preload.onerror = ready
    preload.src = assetUrl(screens[index].src)
    return () => { cancelled = true; preload.onload = null; preload.onerror = null; leave.current?.kill() }
  }, [index, shownIndex, screens])

  useEffect(() => {
    const next = screens[screenIndex(shownIndex, 1, screens.length)]
    if (next && screens.length > 1) { const preload = new Image(); preload.src = assetUrl(next.src) }
  }, [shownIndex, screens])

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const finish = () => { if (preference.matches) { enter.current?.progress(1); leave.current?.progress(1) } }
    preference.addEventListener('change', finish)
    return () => { preference.removeEventListener('change', finish); enter.current?.kill(); leave.current?.kill() }
  }, [])
  const imageLoaded = () => {
    if (!image.current) return
    enter.current?.kill()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.set(image.current, { clearProps: 'opacity,transform' })
    else enter.current = gsap.fromTo(image.current, { opacity: 0, x: 4 }, { opacity: 1, x: 0, duration: .22, ease: 'power2.out', clearProps: 'opacity,transform' })
  }
  return { index: shownIndex, pending: index !== shownIndex, image, imageLoaded, select: setIndex, change: (direction: number) => setIndex(value => screenIndex(value, direction, screens.length)) }
}
