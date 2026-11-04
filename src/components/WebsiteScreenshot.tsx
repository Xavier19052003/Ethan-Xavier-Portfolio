import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/projects'
import { assetUrl } from '../utils/assets'

export function WebsiteScreenshot({ project, interactive = false }: { project: Project; interactive?: boolean }) {
  const mobile = project.gallery.find(image => image.src.endsWith('/mobile.webp'))
  const frame = useRef<HTMLDivElement>(null)
  const fullImage = useRef<HTMLImageElement>(null)
  const [requested, setRequested] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)

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

  function requestPreview() {
    if (interactive && project.fullPageImage && window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) setRequested(true)
  }

  return <div ref={frame} onPointerEnter={requestPreview} className={`project-artwork has-image website-screenshot ${interactive ? 'interactive-screenshot' : ''} ${loaded ? 'preview-ready' : ''}`}>
    <picture className="screenshot-picture">
      {mobile && <source media="(max-width: 760px)" srcSet={assetUrl(mobile.src)}/>}
      <img className={`screenshot-thumbnail ${thumbnailLoaded ? 'is-loaded' : ''}`} src={assetUrl(project.image)} alt={project.imageAlt} loading="lazy" decoding="async" width="1440" height="900" onLoad={() => setThumbnailLoaded(true)}/>
    </picture>
    {requested && <img ref={fullImage} className="screenshot-full" src={assetUrl(project.fullPageImage!)} alt="" aria-hidden="true" decoding="async" onLoad={() => setLoaded(true)} onError={() => setLoaded(false)}/>}
    {interactive && <span className="screenshot-hint" aria-hidden="true">Explore project ↗</span>}
  </div>
}
