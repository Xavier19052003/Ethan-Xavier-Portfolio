import { ArrowUpRight, Plus } from 'lucide-react'
import type { Project } from '../data/projects'
import { ProjectArtwork } from './ProjectArtwork'

export function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  return <article data-flip-id={project.id} className={`project-card ${project.status === 'academic' && !project.featured ? 'academic-card' : ''}`}>
    <button className="project-cover-button" onClick={() => onOpen(project)} aria-label={`Explore ${project.title}`}>
      <ProjectArtwork project={project} interactive/><span className="project-open-icon"><Plus size={23}/></span>
    </button>
    <div className="project-info">
      <p className="project-category"><span>{String(index + 1).padStart(2, '0')}</span>{project.category}</p>
      <h3><button onClick={() => onOpen(project)}>{project.title}<ArrowUpRight size={25} aria-hidden="true"/></button></h3>
      <p className="project-description">{project.description}</p>
      {project.technologies.length > 0 && <ul className="tags" aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
      {project.note && <p className="project-note">{project.note}</p>}
      <div className="project-actions">
        <button className="text-link" onClick={() => onOpen(project)}>{project.filters.includes('Application Development') ? 'Explore app' : 'View case study'} <Plus size={15} aria-hidden="true"/></button>
        {project.liveUrl && project.liveLinkEnabled ? <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a> : project.status !== 'academic' && <span className="unavailable-note">Live link coming soon</span>}
        {project.githubUrl && <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">View source code <ArrowUpRight size={16}/><span className="sr-only"> (opens in a new tab)</span></a>}
      </div>
    </div>
  </article>
}
