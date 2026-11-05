import { useRef } from 'react'
import { CvProvider } from './components/CvProvider'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Achievements } from './sections/Achievements'
import { Approach } from './sections/Approach'
import { Contact } from './sections/Contact'
import { useStoryMotion } from './hooks/useStoryMotion'
import { useAnimations } from './hooks/useAnimations'
import { ScrollControls } from './components/ScrollControls'
import { PointerEffects } from './components/PointerEffects'

export default function App() {
  const scope = useRef<HTMLDivElement>(null)
  useAnimations(scope)
  useStoryMotion(scope)
  return <CvProvider><div ref={scope}><a className="skip-link" href="#main-content">Skip to content</a><Navigation/><ScrollControls/><PointerEffects/><main id="main-content" tabIndex={-1}><Hero/><About/><Projects/><Skills/><Achievements/><Approach/><Contact/></main><Footer/></div></CvProvider>
}
