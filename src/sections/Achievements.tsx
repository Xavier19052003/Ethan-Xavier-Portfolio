import { ArrowUpRight, GraduationCap, Trophy } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { achievements } from '../data/achievements'
import { profile } from '../data/profile'

export function Achievements() {
  return <section id="achievements" className="achievements section-spacing" aria-labelledby="achievements-title"><div className="section-shell">
    <SectionHeading number="04" label="MILESTONES THAT MATTER" description="A few proud moments from a journey of learning, building, and challenging myself."><span id="achievements-title">Small steps.<br/><span className="serif-word">Proud moments.</span></span></SectionHeading>
    <div className="awards-list"><span className="award-progress" aria-hidden="true"><span/></span>{achievements.map((award, index) => <article className="award" key={award.title + award.year} data-reveal><span className="award-index">0{index + 1}</span><Trophy size={27} strokeWidth={1.3} aria-hidden="true"/><div><span>{award.type}</span><h3>{award.title}</h3></div><strong>{award.year}</strong><ArrowUpRight className="award-arrow" size={26} strokeWidth={1} aria-hidden="true"/></article>)}</div>
    <div className="education" data-reveal><div className="education-icon"><GraduationCap size={31} strokeWidth={1.3}/></div><div><p className="eyebrow">THE FOUNDATION</p><h3>{profile.education.institution}</h3><p>{profile.education.qualification}</p></div><div className="education-dates"><strong>{profile.education.period}</strong><span>{profile.education.completion}</span></div></div>
    <div className="education" data-reveal><div className="education-icon"><GraduationCap size={31} strokeWidth={1.3}/></div><div><p className="eyebrow">SECONDARY EDUCATION</p><h3>National Senior Certificate / Matric</h3><p>TENEO Online Schooling · Previous schooling: Westville Boys’ High School</p></div></div>
  </div></section>
}
