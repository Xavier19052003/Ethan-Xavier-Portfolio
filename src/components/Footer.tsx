import { ArrowUp } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { navigation, profile } from '../data/profile'

export function Footer() {
  return <footer className="footer"><div className="section-shell"><div className="footer-main"><div><a className="footer-brand" href="#home" aria-label="Xavier Designs, back to home"><BrandLogo footer/><span className="footer-wordmark">XAVIER DESIGNS</span></a><p>Designing experiences. Developing possibilities.</p></div><a className="back-to-top" href="#home">Back to top <ArrowUp size={19}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><nav aria-label="Footer navigation">{navigation.slice(1).map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}{profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a>}{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>}</nav><span>Made with curiosity, in Johannesburg.</span></div></div></footer>
}
