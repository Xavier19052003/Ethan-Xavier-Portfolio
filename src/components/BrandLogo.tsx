import { assetUrl } from '../utils/assets'

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return <span className={`brand-logo${footer ? ' brand-logo-footer' : ''}`}>
    <img src={assetUrl('images/exp-logo.png')} alt="EXP monogram" width="320" height="211" />
  </span>
}
