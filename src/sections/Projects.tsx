import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { ArrowDownRight } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectDialog } from '../components/ProjectDialog'
import { getVisibleProjects, projects, projectFilters, type Project, type ProjectFilter } from '../data/projects'
import { profile } from '../data/profile'
import { useProjectDepth } from '../hooks/useStoryMotion'
import { useMobileProjectPreviews } from '../hooks/useMobileProjectPreviews'

gsap.registerPlugin(Flip)
const projectFromHash = () => projects.find(project => project.verified && `#project/${project.id}` === window.location.hash) || null

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All Projects')
  const [selected, setSelected] = useState<Project | null>(projectFromHash)
  const content = useRef<HTMLDivElement>(null)
  const previousLayout = useRef<ReturnType<typeof Flip.getState> | null>(null)
  const previousHeight = useRef(0)
  const filterAnimation = useRef<gsap.core.Timeline | null>(null)
  const closePending = useRef(false)
  useMobileProjectPreviews(content, Boolean(selected), filter)
  useProjectDepth(content, filter)
  const visible = getVisibleProjects(filter)
  const commercial = visible.filter(project => project.featured)
  const academic = visible.filter(project => !project.featured)
  useEffect(() => {
    const sync = () => { const next = projectFromHash(); if (next) closePending.current = false; setSelected(next) }
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finish = () => { if (preference.matches) filterAnimation.current?.progress(1) }
    preference.addEventListener('change', finish)
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); preference.removeEventListener('change', finish) }
  }, [])
  function openProject(project: Project) {
    closePending.current = false
    history.pushState({ portfolioCaseStudy: true }, '', `#project/${project.id}`)
    setSelected(project)
  }
  function closeProject() {
    if (closePending.current) return
    closePending.current = true
    if (history.state?.portfolioCaseStudy) history.back()
    else {
      history.replaceState(null, '', '#projects')
      setSelected(null)
    }
  }
  function changeFilter(next: ProjectFilter) {
    if (next === filter) return
    filterAnimation.current?.progress(1)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && content.current) {
      const cards = Array.from(content.current.querySelectorAll<HTMLElement>('.project-card'))
      gsap.getTweensOf(cards).forEach(tween => tween.progress(1))
      previousLayout.current = Flip.getState(cards)
      previousHeight.current = content.current.offsetHeight
    }
    setFilter(next)
  }
  useLayoutEffect(() => {
    if (!previousLayout.current || !content.current) return
    const snapshot = previousLayout.current
    previousLayout.current = null
    const context = gsap.context(() => {
      const nextHeight = content.current!.offsetHeight
      filterAnimation.current = Flip.from(snapshot, {
        targets: content.current!.querySelectorAll('.project-card'),
        duration: .5, ease: 'power2.inOut', absoluteOnLeave: true,
        onEnter: elements => gsap.fromTo(elements, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .4, clearProps: 'all' }),
        onComplete: () => ScrollTrigger.refresh(),
      })
      filterAnimation.current.add(gsap.fromTo(content.current, { height: previousHeight.current }, {
        height: nextHeight, duration: .5, ease: 'power2.inOut', clearProps: 'height',
      }), 0)
    }, content)
    return () => context.revert()
  }, [filter])
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add({ motion: '(prefers-reduced-motion: no-preference)', columns: '(min-width: 761px)' }, ({ conditions }) => {
      if (!conditions?.motion) return
      const cleanups: (() => void)[] = []
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, index) => {
          if (filterAnimation.current?.isActive()) return
          const reveal = gsap.from(card, {
            opacity: 0, y: 32, duration: .75,
            delay: conditions.columns ? (index % 2) * .1 : 0,
            ease: 'power3.out', clearProps: 'all',
            scrollTrigger: { trigger: card, start: 'top 94%', once: true },
          })
          const showOnFocus = () => reveal.progress(1)
          card.addEventListener('focusin', showOnFocus)
          cleanups.push(() => card.removeEventListener('focusin', showOnFocus))
        })
      }, content)
      return () => { cleanups.forEach(cleanup => cleanup()); context.revert() }
    })
    ScrollTrigger.refresh()
    return () => media.revert()
  }, [filter])

  return <section id="projects" className="projects section-spacing" aria-labelledby="projects-title"><div className="section-shell">
    <SectionHeading number="02" label="SELECTED WORK" description="Real clients. Practical challenges. Ideas brought to life through design and development."><span id="projects-title">A few things<br/>I’ve <span className="serif-word">built.</span><ArrowDownRight className="heading-arrow" strokeWidth={1}/></span></SectionHeading>
    <div className="project-filters" role="group" aria-label="Filter projects">{projectFilters.filter(item => getVisibleProjects(item).length > 0).map(item => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? 'is-active' : ''} onClick={() => changeFilter(item)}>{item}{item === 'All Projects' && <span>{getVisibleProjects().length.toString().padStart(2, '0')}</span>}</button>)}</div>
    <p className="sr-only" role="status" aria-live="polite">Showing {visible.length} projects. Filter: {filter}.</p>
    <div ref={content}>
      {commercial.length > 0 && <div className="project-grid">{commercial.map((project, index) => <ProjectCard project={project} key={project.id} index={index} onOpen={openProject}/>)}</div>}
      {academic.length > 0 && <div className="academic-projects"><div className="academic-heading"><h3>Built to learn.<br/><span className="serif-word">Made to explore.</span></h3><p>University projects & application development</p></div><div className="project-grid academic-grid">{academic.map((project, index) => <ProjectCard project={project} key={project.id} index={commercial.length + index} onOpen={openProject}/>)}</div></div>}
    </div>
    <p className="project-description">Other explorations include MindMate AI, Kojo, Xavier Art Studio and academic web and app prototypes. <a className="text-link" href={profile.portfolio} target="_blank" rel="noopener noreferrer">View my earlier portfolio<span className="sr-only"> (opens in a new tab)</span></a></p>
    <ProjectDialog project={selected} onClose={closeProject}/>
  </div></section>
}
