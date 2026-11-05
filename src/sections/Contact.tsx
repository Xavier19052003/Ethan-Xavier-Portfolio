import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { CvButton } from '../components/CvButton'
import { CopyEmail } from '../components/CopyEmail'

export function Contact() {
  const [mailbox, domain] = profile.email.split('@')
  return <section id="contact" className="contact" aria-labelledby="contact-title"><div className="section-shell">
    <div className="contact-top" data-reveal><p className="eyebrow"><span className="status-dot"/> LET’S MAKE SOMETHING MEANINGFUL</p><span className="contact-spark" aria-hidden="true">✳</span></div>
    <h2 id="contact-title" data-reveal>Great things start<br/>with a <span className="serif-word">conversation.</span><ArrowUpRight className="contact-arrow" strokeWidth={.9} aria-hidden="true"/></h2>
    <div className="contact-email-feature" data-reveal><p className="eyebrow">START WITH A HELLO</p><a href={`mailto:${profile.email}`}>{mailbox}<wbr/>@{domain}<ArrowUpRight size={28} aria-hidden="true"/></a></div>
    <div className="contact-editorial" data-reveal>
      <div className="contact-invitation"><p>I’m interested in new opportunities, collaborations, and projects where I can contribute my skills and keep growing. Have something in mind? Let’s connect.</p><div className="contact-primary-actions"><a className="button button-dark" href={`mailto:${profile.email}`} data-magnetic><Mail size={18}/>Let’s Talk<ArrowUpRight size={18}/></a><CopyEmail/><CvButton className="button-outline"/></div></div>
      <dl className="contact-details"><div><dt><Phone size={16}/>Phone</dt><dd><a href={`tel:${profile.phoneHref}`}>{profile.phone}<ArrowUpRight size={18}/></a></dd></div><div><dt><Github size={16}/>GitHub</dt><dd><a href={profile.github} target="_blank" rel="noopener noreferrer">Xavier19052003<ArrowUpRight size={18}/><span className="sr-only"> (opens in a new tab)</span></a></dd></div><div><dt><Linkedin size={16}/>LinkedIn</dt><dd><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">Ethan Xavier Peters<ArrowUpRight size={18}/><span className="sr-only"> (opens in a new tab)</span></a></dd></div><div><dt><MapPin size={16}/>Based in</dt><dd>{profile.location}</dd></div></dl>
    </div>
  </div></section>
}
