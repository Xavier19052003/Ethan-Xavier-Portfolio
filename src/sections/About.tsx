import { ArrowUpRight, Code2, GraduationCap } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { CvButton } from '../components/CvButton'
import { profile } from '../data/profile'
import { assetUrl } from '../utils/assets'

export function About() {
  return <section id="about" className="about section-shell section-spacing" aria-labelledby="about-title">
    <SectionHeading number="01" label="THE PERSON BEHIND THE PIXELS"><span id="about-title">Curiosity meets<br/><span className="serif-word">craft.</span></span></SectionHeading>
    <div className="about-grid">
      <div className="portrait-block" data-reveal>
        {profile.portrait ? <img className="portrait" src={assetUrl(profile.portrait)} srcSet={`${assetUrl(profile.portraitSmall)} 375w, ${assetUrl(profile.portrait)} 750w`} sizes="(max-width: 760px) calc(100vw - 50px), (max-width: 1150px) 40vw, 470px" alt="Ethan Xavier Peters in a blue suit, standing outdoors among greenery" width="750" height="1000" loading="lazy" decoding="async"/> : <div className="portrait-placeholder"><span className="portrait-top">A WORK IN PROGRESS. ALWAYS.</span><span className="portrait-monogram" aria-hidden="true">ep<span>✳</span></span><span className="portrait-label">PORTRAIT PLACEHOLDER</span></div>}
        <div className="portrait-caption"><span>{profile.name}</span><ArrowUpRight size={20}/></div>
      </div>
      <div className="about-copy" data-reveal>
        <h3>I like making things that<br/><span>look good. And work better.</span></h3>
        <p>I’m Ethan Xavier Peters, a final-year Bachelor of Information Technology student at STADIO Higher Education, specialising in Web and App Development, with expected completion in 2026.</p>
        <p>I enjoy the space where creativity meets logic. Through commercial e-commerce work, freelance client websites and Android applications, I bring responsive development, thoughtful UI/UX and practical testing together.</p>
        <p>Winning the STADIO Hackathon in 2024, 2025 and 2026 has been a proud part of that journey. I value collaboration, visual communication and attention to detail, and I’m seeking graduate or junior opportunities where I can contribute, learn and keep growing.</p>
        <div className="about-facts"><div><GraduationCap size={21}/><span>Final-year BIT student<strong>Expected completion · 2026</strong></span></div><div><Code2 size={21}/><span>My sweet spot<strong>Design + development</strong></span></div></div>
        <CvButton className="button-outline"/>
      </div>
    </div>
    <div className="experience" data-reveal>
      <div><p className="eyebrow">FROM IDEAS TO REAL-WORLD WORK</p><h3>Learning by<br/><span className="serif-word">building.</span></h3></div>
      <div className="experience-details"><div className="experience-top"><span className="experience-dot"/><p>360 Solution Technologies<span>Front-End Web Developer · 2026</span></p><span className="duration">≈ 7 months</span></div><p>Hands-on commercial experience contributing to business websites and e-commerce experiences, with a focus on frontend implementation and the details that help an online store work well.</p><ul className="experience-list"><li>Website styling & responsive layouts</li><li>E-commerce & product catalogues</li><li>Inventory-related website functionality</li><li>Product photography & presentation</li><li>Checkout & payment testing</li><li>Quality assurance & UI/UX improvements</li></ul></div>
    </div>
    <div className="experience" data-reveal><div><p className="eyebrow">FREELANCE / CLIENT EXPERIENCE</p><h3>Ideas refined<br/><span className="serif-word">together.</span></h3></div><div className="experience-details"><div className="experience-top"><span className="experience-dot"/><p>Selected Projects<span>Freelance / Client Web Developer · 2026</span></p></div><p>Building responsive client websites with clear navigation, consistent branding and polished product presentation. Nature’s Nurture brings products, brands, retailers and contact journeys together using React, Vite and TypeScript.</p><ul className="experience-list"><li>Reusable components and responsive layouts</li><li>UI/UX and brand consistency</li><li>Client feedback and iterative revisions</li><li>Content refinement for launch</li></ul></div></div>
  </section>
}
