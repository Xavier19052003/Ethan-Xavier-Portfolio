import { ArrowUpRight, BookOpen, Command, Leaf, ShieldCheck, Smartphone } from 'lucide-react'
import type { Project } from '../data/projects'
import { assetUrl } from '../utils/assets'
import { WebsiteScreenshot } from './WebsiteScreenshot'
import { AppProjectArtwork } from './AppProjectArtwork'

export function ProjectArtwork({ project, interactive = false }: { project: Project; interactive?: boolean }) {
  if (project.image && project.filters.includes('Application Development')) return <AppProjectArtwork project={project}/>
  if (project.fullPageImage && project.image) return <WebsiteScreenshot key={project.id} project={project} interactive={interactive}/>
  if (project.image) return <div className="project-artwork has-image"><img src={assetUrl(project.image)} alt={project.imageAlt || `${project.title} project screenshot`} loading="lazy" width="1200" height="800" /></div>
  return <div className={`project-artwork artwork-${project.theme}`}>
    <span className="cover-label">PROJECT COVER / SCREENSHOT TO COME</span>
    <div className="cover-composition" aria-hidden="true">
      {project.theme === 'nature' && <><div className="nature-rings"/><Leaf className="cover-icon" strokeWidth={1}/><span className="nature-title">Nature’s<br/><i>Nurture.</i></span><span className="cover-caption">ROOTED IN EVERYDAY POSSIBILITIES</span></>}
      {project.theme === 'frs' && <><div className="frs-lines"/><ShieldCheck className="cover-icon" strokeWidth={1}/><span className="frs-title">FRS<span>VIP PROTECTION</span></span><span className="cover-caption">A PROFESSIONAL DIGITAL PRESENCE</span></>}
      {project.theme === 'blaq' && <><span className="blaq-monogram">bp.</span><span className="blaq-title">BLAQPEARL</span><span className="cover-caption">A FRESH PERSPECTIVE ON EYEWEAR</span></>}
      {project.theme === 'sneaker' && <><ArrowUpRight className="sneaker-arrow" strokeWidth={.7}/><span className="sneaker-title">SNEAKER<br/><i>PIMPS.</i></span><span className="cover-caption">COMMERCE. WITH CHARACTER.</span></>}
      {(project.theme === 'edu' || project.theme === 'campus') && <><div className="app-cover-icon">{project.theme === 'edu' ? <BookOpen size={45} strokeWidth={1.3}/> : <Command size={45} strokeWidth={1.3}/>}</div><span className="app-cover-title">{project.title}</span><span className="cover-caption"><Smartphone size={12}/> {project.filters.includes('Application Development') ? 'ANDROID APPLICATION' : 'COLLABORATIVE WEB PROJECT'}</span></>}
    </div>
  </div>
}
