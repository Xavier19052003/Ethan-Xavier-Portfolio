import { useContext } from 'react'
import { Download } from 'lucide-react'
import { CvContext } from './CvProvider'

export function CvButton({ className = '', label = 'Download CV' }: { className?: string; label?: string }) {
  const url = useContext(CvContext)
  return url ? (
    <a className={`button cv-button ${className}`} data-magnetic href={url} download="Ethan_Xavier_Peters_CV.pdf">{label}<Download size={16} aria-hidden="true" /></a>
  ) : (
    <button type="button" className={`button cv-button ${className}`} disabled title="My CV will be available to download soon."><span>CV coming soon</span><Download size={16} aria-hidden="true" /></button>
  )
}
