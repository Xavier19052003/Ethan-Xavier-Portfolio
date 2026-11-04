import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      let saved: string | null = null
      try { saved = localStorage.getItem('xavier-theme') } catch { /* Storage is optional. */ }
      const next = saved === 'dark' || saved === 'light' ? saved : system.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    system.addEventListener('change', sync)
    window.addEventListener('storage', sync)
    return () => { system.removeEventListener('change', sync); window.removeEventListener('storage', sync) }
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    setTheme(next)
    try { localStorage.setItem('xavier-theme', next) } catch { /* Theme still works without persistence. */ }
  }
  return <button type="button" className="theme-toggle icon-button" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={19}/> : <Moon size={19}/>}</button>
}
