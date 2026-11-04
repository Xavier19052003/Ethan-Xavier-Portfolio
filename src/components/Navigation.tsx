import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation } from '../data/profile'
import { CvButton } from './CvButton'
import { BrandLogo } from './BrandLogo'
import { ThemeToggle } from './ThemeToggle'

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0
    let currentId = ''
    const update = () => {
      frame = 0
      let current = 'home'
      for (const item of navigation) {
        const element = document.getElementById(item.id)
        if (element && element.getBoundingClientRect().top <= 180) current = item.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) current = 'contact'
      if (current !== currentId) { currentId = current; setActive(current) }
    }
    const queue = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    const observer = new ResizeObserver(queue)
    observer.observe(document.body)
    update()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue) }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    const resize = () => { if (window.innerWidth > 1150) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', outside)
    window.addEventListener('resize', resize)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', outside); window.removeEventListener('resize', resize) }
  }, [open])

  return <header className="site-header" ref={header}>
    <div className="nav-wrap">
      <a className="brand" href="#home" aria-label="Xavier Designs, home" onClick={() => setOpen(false)}><BrandLogo/><span>XAVIER<span className="brand-sub">DESIGNS</span></span></a>
      <ThemeToggle/>
      <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {navigation.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
        <CvButton className="nav-cv" />
      </nav>
    </div>
  </header>
}
