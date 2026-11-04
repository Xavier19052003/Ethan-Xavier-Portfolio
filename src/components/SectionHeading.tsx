import type { ReactNode } from 'react'

export function SectionHeading({ number, label, children, description }: { number: string; label: string; children: ReactNode; description?: string }) {
  return <div className="section-heading" data-reveal>
    <div><p className="eyebrow"><span>{number} /</span> {label}</p><h2>{children}</h2></div>
    {description && <p className="section-description">{description}</p>}
  </div>
}
