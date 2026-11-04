import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const principles = [
  { title: 'Design with purpose.', description: 'Start with the person using it. Make it intuitive, accessible, and a pleasure to spend time with.' },
  { title: 'Build with intention.', description: 'Write code that makes sense. Create practical solutions and leave room for the next person to build on them.' },
  { title: 'Stay curious.', description: 'Ask questions, try unfamiliar tools, and keep learning. Every project is a chance to get a little better.' },
  { title: 'Make it meaningful.', description: 'Bring the details together into an experience that helps someone do something useful.' },
]

export function Approach() {
  return <section className="approach section-shell section-spacing" aria-labelledby="approach-title"><SectionHeading number="05" label="HOW I THINK, HOW I BUILD"><span id="approach-title">Good work starts<br/>with <span className="serif-word">intention.</span></span></SectionHeading><div className="principles">{principles.map((item, index) => <article key={item.title} data-reveal><span className="principle-number">0{index + 1}<ArrowUpRight size={21} strokeWidth={1.3}/></span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
}
