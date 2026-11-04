import { ArrowDown, ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { CvButton } from '../components/CvButton'
import { HeroArt } from '../components/HeroArt'
import { profile } from '../data/profile'

export function Hero() {
  return <section id="home" className="hero section-shell" aria-labelledby="hero-title">
    <div className="hero-main">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow" data-hero-reveal><span className="status-dot"/> A CREATIVE MIND. A DEVELOPER’S EYE.</p>
        <h1 id="hero-title"><span className="hero-line">Hi, I’m</span><span className="hero-line">Xavier<span className="hero-period">.</span></span><ArrowDownRight className="hero-heading-arrow" strokeWidth={1.1} aria-hidden="true"/></h1>
        <p className="hero-role" data-hero-reveal>Web & App Developer.<br/>Front-end development + UI/UX.</p>
        <p className="hero-description" data-hero-reveal>I’m {profile.name}, a final-year IT student building responsive websites and applications. I combine front-end development with thoughtful UI/UX to turn ideas into engaging, useful digital experiences.</p>
        <div className="hero-actions" data-hero-reveal><a className="button button-dark" data-magnetic href="#projects">Explore my work <ArrowUpRight size={19}/></a><CvButton className="button-outline" label="Download my CV"/></div>
      </div>
      <div className="hero-visual" data-hero-reveal><HeroArt/></div>
    </div>
    <div className="hero-bottom" data-hero-reveal><span><MapPin size={15} aria-hidden="true"/>{profile.location}</span><span className="hero-specialisation">WEB & APPLICATION DEVELOPMENT</span><a href="#about">A little more about me <ArrowDown size={16}/></a></div>
  </section>
}
