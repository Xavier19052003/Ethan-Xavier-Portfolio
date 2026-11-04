import type { Project } from '../data/projects'
import { assetUrl } from '../utils/assets'

export function AppProjectArtwork({ project }: { project: Project }) {
  const primary = project.gallery.find(screen => screen.src === project.image)
  const supporting = project.id === 'eduswap' ? [project.gallery[0], project.gallery[4]] : [project.gallery[2], project.gallery[4]]
  const screens = [supporting[0], primary, supporting[1]].filter(screen => screen?.src)
  return <div className={`project-artwork app-project-artwork artwork-${project.theme}`}>
    <div className="app-cover-screens">
      {screens.map((screen, index) => <div className={`app-cover-phone app-cover-phone-${index} ${project.screensIncludeDeviceFrame ? 'includes-device' : ''}`} key={screen!.src}>
        <img src={assetUrl(screen!.src)} alt={index === 1 ? project.imageAlt : ''} aria-hidden={index !== 1 || undefined} width={screen!.width} height={screen!.height} loading="lazy" decoding="async"/>
      </div>)}
    </div>
  </div>
}
