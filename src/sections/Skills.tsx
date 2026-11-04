import { Code2, Database, PenTool, Smartphone, Terminal, Wrench } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { skillGroups } from '../data/skills'

const icons = { code: Code2, database: Database, pen: PenTool, phone: Smartphone, terminal: Terminal, tools: Wrench }

export function Skills() {
  return <section id="skills" className="skills section-shell section-spacing" aria-labelledby="skills-title">
    <SectionHeading number="03" label="MY TOOLKIT" description="The technologies and tools I work with, experiment with, and keep coming back to."><span id="skills-title">Different tools.<br/>One <span className="serif-word">creative mindset.</span></span></SectionHeading>
    <div className="skills-grid">{skillGroups.map((group, index) => { const Icon = icons[group.icon]; return <article className="skill-group" key={group.title} data-reveal><div className="skill-top"><Icon size={26} strokeWidth={1.5} aria-hidden="true"/><span>0{index + 1}</span></div><h3>{group.title}</h3><p>{group.description}</p><ul className="tags skill-tags">{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article> })}</div>
    <div className="skills-footnote"><span className="status-dot"/> Always learning. Always adding to the toolkit.</div>
  </section>
}
