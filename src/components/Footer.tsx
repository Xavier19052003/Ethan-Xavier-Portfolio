import { useState } from 'react'
import { ExpExperience } from './ExpExperience'
import { ArrowUp } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { navigation, profile } from '../data/profile'

export function Footer() {
  const [experience, setExperience] = useState(false)
  return <footer className="footer"><div className="section-shell"><div className="footer-main"><div><a className="footer-brand" href="#home" aria-label="Ethan Xavier, Web and App Developer, back to home"><BrandLogo footer/><span className="footer-wordmark">ETHAN XAVIER<br/><small>WEB &amp; APP DEVELOPER</small></span></a><p>Designing experiences. Developing possibilities.</p><button type="button" className="exp-trigger text-link" onClick={()=>setExperience(true)}>Explore EXP ✳</button>{experience && <ExpExperience onClose={()=>setExperience(false)}/>}</div><a className="back-to-top" href="#home">Back to top <ArrowUp size={19}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><nav aria-label="Footer navigation">{navigation.slice(1).map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}{profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a>}{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>}</nav><span>Made with curiosity, in Johannesburg.</span></div></div></footer>
}
