import { useEffect, useRef } from 'react'
import { ArrowUpRight, Check, Image, X } from 'lucide-react'
import type { Project } from '../data/projects'
import { ProjectArtwork } from './ProjectArtwork'
import { assetUrl } from '../utils/assets'
import { caseStudies } from '../data/caseStudies'
import { MobileAppShowcase } from './MobileAppShowcase'

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!project) return
    const element = dialog.current
    const opener = document.activeElement as HTMLElement | null
    element?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      element?.close()
      document.body.style.overflow = overflow
      opener?.focus({ preventScroll: true })
    }
  }, [project])

  const study = project ? caseStudies[project.id] : null
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    {project && <div className="dialog-inner">
      <button type="button" className="dialog-close icon-button" aria-label="Close case study" onClick={onClose}><X/></button>
      <ProjectArtwork project={project}/>
      <div className="dialog-content">
        <p className="eyebrow">{project.category}</p><h2 id="project-dialog-title">{project.title}</h2>
        <p>{project.description}</p>
        {project.note && <p className="dialog-note">{project.note}</p>}
        {study && <><dl className="case-facts"><div><dt>My role</dt><dd>{study.role}</dd></div>{study.year && <div><dt>Year</dt><dd>{study.year}</dd></div>}</dl><h3>Project context</h3><p>{study.context}</p><h3>My contribution</h3><p>{study.contribution}</p>{study.approach && <><h3>Development approach</h3><p>{study.approach}</p></>}</>}
        {project.filters.includes('Application Development') && <MobileAppShowcase key={project.id} project={project}/>}
        {study?.sections?.map(section => <section className="case-study-section" key={section.title}><h3>{section.title}</h3><p>{section.body}</p>{section.items && <ul className="highlights">{section.items.map(item => <li key={item}><Check size={17} aria-hidden="true"/>{item}</li>)}</ul>}</section>)}
        {!project.filters.includes('Application Development') && <><h3>Project highlights</h3><ul className="highlights">{project.highlights.map(item => <li key={item}><Check size={17} aria-hidden="true"/>{item}</li>)}</ul></>}
        {project.technologies.length > 0 && <><h3>Technologies</h3><ul className="tags">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></>}
        {!project.filters.includes('Application Development') && project.gallery.length > 0 && <><h3>Project gallery</h3><p className="gallery-instruction">Open any screenshot for a full-size view.</p><div className="gallery website-gallery">{project.gallery.map((item, index) => item.src ? <figure key={item.src}><a href={assetUrl(item.src)} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.alt} at full size (opens in a new tab)`}><img src={assetUrl(item.src)} alt={item.alt} loading="lazy" decoding="async" width="1440" height="900"/></a><figcaption>{item.alt}</figcaption></figure> : <div className="gallery-placeholder" key={index}><Image size={24} aria-hidden="true"/><p>{item.alt}</p></div>)}</div></>}
        <div className="dialog-actions">
          <button className="button button-outline" type="button" onClick={onClose}>Back to projects</button>
          {project.liveUrl && project.liveLinkEnabled && <a className="button button-dark" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View live website <ArrowUpRight size={17}/><span className="sr-only"> (opens in a new tab)</span></a>}
          {project.githubUrl && <a className="button button-outline" href={project.githubUrl} target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={17}/><span className="sr-only"> (opens in a new tab)</span></a>}
        </div>
      </div>
    </div>}
  </dialog>
}
