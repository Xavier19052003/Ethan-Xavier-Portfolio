import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/projects'
import { assetUrl } from '../utils/assets'
import gsap from 'gsap'

export function WebsiteScreenshot({ project, interactive = false }: { project: Project; interactive?: boolean }) {
  const mobile = project.gallery.find(image => image.src.endsWith('/mobile.webp'))
  const frame = useRef<HTMLDivElement>(null)
  const fullImage = useRef<HTMLImageElement>(null)
  const [requested, setRequested] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const element = frame.current
    if (!interactive || !element) return
    const activate = (event: Event) => {
      const next = Boolean((event as CustomEvent<boolean>).detail)
      setActive(next)
      if (next) setRequested(true)
      else if (matchMedia('(hover: none), (pointer: coarse)').matches) { setRequested(false); setLoaded(false) }
    }
    element.addEventListener('portfolio:preview', activate)
    return () => element.removeEventListener('portfolio:preview', activate)
  }, [interactive])

  useEffect(() => {
    const element = frame.current
    const image = fullImage.current
    if (!loaded || !element || !image) return
    const measure = () => {
      const distance = Math.max(0, element.clientWidth * image.naturalHeight / image.naturalWidth - element.clientHeight)
      element.dataset.scrollable = String(distance > 1)
      element.style.setProperty('--preview-distance', `${distance}px`)
      element.style.setProperty('--preview-duration', `${Math.min(7, Math.max(2.5, distance / 180))}s`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [loaded])

  useEffect(() => {
    const element = frame.current, image = fullImage.current
    if (!active || !loaded || !element || !image) return
    let timeline: gsap.core.Timeline | undefined
    const context = gsap.context(() => {
      const distance = Math.max(0, element.clientWidth * image.naturalHeight / image.naturalWidth - element.clientHeight)
      if (distance <= 1 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
      element.dataset.previewState = 'waiting'
      timeline = gsap.timeline({ onComplete: () => { element.dataset.previewState = 'complete' } })
        .set(image, { y: 0, opacity: 0 })
        .to(image, { opacity: 1, duration: .25, onStart: () => { element.dataset.previewState = 'playing' } }, .85)
        .to(image, { y: -distance, duration: Math.min(8, Math.max(5, distance / 180)), ease: 'power1.inOut', force3D: true }, 1)
        .to(image, { y: 0, duration: 2.6, ease: 'power2.inOut', force3D: true }, '+=.8')
        .to(image, { opacity: 0, duration: .3 }, '+=.4')
    }, element)
    const resize = () => timeline?.invalidate().progress(1)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      context.revert()
      element.dataset.previewState = 'idle'
    }
  }, [active, loaded])

  function requestPreview() {
    if (interactive && project.fullPageImage && window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) setRequested(true)
  }

  return <div ref={frame} onPointerEnter={requestPreview} data-mobile-active={active || undefined} className={`project-artwork has-image website-screenshot ${interactive ? 'interactive-screenshot' : ''} ${loaded ? 'preview-ready' : ''}`}>
    <picture className="screenshot-picture">
      {mobile && <source media="(max-width: 760px)" srcSet={assetUrl(mobile.src)}/>}
      <img className={`screenshot-thumbnail ${thumbnailLoaded ? 'is-loaded' : ''}`} src={assetUrl(project.image)} alt={project.imageAlt} loading="lazy" decoding="async" width="1440" height="900" onLoad={() => setThumbnailLoaded(true)}/>
    </picture>
    {requested && <img ref={fullImage} className="screenshot-full" src={assetUrl(project.fullPageImage!)} alt="" aria-hidden="true" decoding="async" onLoad={() => setLoaded(true)} onError={() => setLoaded(false)}/>}
    {interactive && <span className="screenshot-hint" aria-hidden="true">Explore project ↗</span>}
  </div>
}
