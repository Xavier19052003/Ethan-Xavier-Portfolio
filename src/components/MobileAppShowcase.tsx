import { useId, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ImageOff, Smartphone } from 'lucide-react'
import type { Project } from '../data/projects'
import { assetUrl } from '../utils/assets'
import { screenIndex, swipeDirection } from '../utils/gallery'

export function MobileAppShowcase({ project }: { project: Project }) {
  const screens = project.gallery.filter(screen => screen.src)
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState<string[]>([])
  const [loaded, setLoaded] = useState<string[]>([])
  const headingId = useId()
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const current = screens[index]
  const change = (direction: number) => setIndex(value => screenIndex(value, direction, screens.length))
  return <section className="app-showcase" aria-label={`${project.title} application screenshots`} onKeyDown={event => {
    if (screens.length > 1 && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); change(event.key === 'ArrowRight' ? 1 : -1) }
  }}>
    <div className="app-showcase-phone">
      <div className={`phone-frame ${project.screensIncludeDeviceFrame ? 'includes-device' : ''}`} style={current?.width && current?.height ? { aspectRatio: `${current.width} / ${current.height}` } : undefined} tabIndex={screens.length > 1 ? 0 : undefined} role="group" aria-label="Application screen viewer. Use left and right arrow keys to change screens." aria-describedby={current ? headingId : undefined} onTouchStart={event => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY } }} onTouchCancel={() => { touchStart.current = null }} onTouchEnd={event => {
        const start = touchStart.current; touchStart.current = null
        if (!start || screens.length < 2) return
        const touch = event.changedTouches[0], dx = touch.clientX - start.x, dy = touch.clientY - start.y
        const direction = swipeDirection(dx, dy)
        if (direction) change(direction)
      }}>
        {current && !loaded.includes(current.src) && !failed.includes(current.src) && <span className="screen-loading" role="status">Loading screen…</span>}
        {current && !failed.includes(current.src) ? <img key={current.src} className="phone-screen" src={assetUrl(current.src)} alt={current.alt} width={current.width || 360} height={current.height || 780} loading="lazy" decoding="async" onLoad={() => setLoaded(list => list.includes(current.src) ? list : [...list, current.src])} onError={() => setFailed(list => [...list, current.src])}/> : <div className="phone-empty"><Smartphone size={42} strokeWidth={1}/><strong>{project.title}</strong><ImageOff size={20}/><p>{current ? 'This screenshot could not be loaded.' : 'Application screenshots coming soon.'}</p><span>Real screens will appear here.</span></div>}
      </div>
      {screens.length > 0 && <div className="screen-controls"><button type="button" className="icon-button" disabled={screens.length < 2} aria-label="Previous app screen" onClick={() => change(-1)}><ArrowLeft size={18}/></button><span role="status" aria-live="polite">{index + 1} / {screens.length}</span><button type="button" className="icon-button" disabled={screens.length < 2} aria-label="Next app screen" onClick={() => change(1)}><ArrowRight size={18}/></button></div>}
      {screens.length > 1 && <div className="screen-thumbnails" role="group" aria-label="Choose an app screen">{screens.map((screen, position) => <button type="button" key={screen.src} aria-label={`Show screen ${position + 1}: ${screen.alt}`} aria-pressed={index === position} onClick={() => setIndex(position)}>{position + 1}</button>)}</div>}
    </div>
    <div className="app-showcase-copy"><p className="eyebrow">{project.title} · ANDROID APPLICATION</p>{current ? <div className="current-screen-copy" aria-live="polite" aria-atomic="true"><h3 id={headingId}>{current.title || current.alt}</h3><p>{current.description || current.alt}</p></div> : <><h3>Built for the<br/><span className="serif-word">small screen.</span></h3><p>{project.description}</p></>}<h4>Application features</h4><ul className="highlights">{project.highlights.map(feature => <li key={feature}>{feature}</li>)}</ul>{screens.length === 0 && <p className="app-empty-note">No screenshots have been supplied yet. This preview will show the actual application once they are added.</p>}{current && <a className="text-link" href={assetUrl(current.src)} target="_blank" rel="noopener noreferrer">Open screenshot at full size<span className="sr-only"> (opens in a new tab)</span></a>}</div>
  </section>
}
