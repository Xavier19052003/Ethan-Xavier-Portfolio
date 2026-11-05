import { eduswapScreens, kitabuScreens } from './appScreens.ts'

export type ProjectScreen = { src: string; alt: string; title?: string; description?: string; width?: number; height?: number }
export type ProjectFilter = 'All Projects' | 'Commercial' | 'Web Development' | 'Application Development' | 'Academic'
export type Project = {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  image: string
  imageAlt: string
  fullPageImage?: string
  gallery: ProjectScreen[]
  screensIncludeDeviceFrame?: boolean
  liveUrl: string
  liveLinkEnabled: boolean
  githubUrl: string
  featured: boolean
  status: 'published' | 'academic' | 'unverified'
  verified: boolean
  highlights: string[]
  filters: ProjectFilter[]
  theme: 'nature' | 'frs' | 'blaq' | 'sneaker' | 'edu' | 'campus'
  note?: string
  archived?: boolean
}

export const projectFilters: ProjectFilter[] = ['All Projects', 'Commercial', 'Web Development', 'Application Development', 'Academic']

export const projects: Project[] = [
  {
    id: 'natures-nurture', title: "Nature’s Nurture", category: 'Commercial website · FMCG',
    description: 'A multi-page FMCG website bringing products, brands, company information, retailer journeys and contact functionality together.',
    technologies: ['React', 'Vite', 'TypeScript', 'CSS', 'GSAP'],
    image: 'projects/natures-nurture/thumbnail.webp', imageAlt: 'Nature’s Nurture live homepage, showing its navigation and hero', fullPageImage: 'projects/natures-nurture/full-page.webp', gallery: [{ src: 'projects/natures-nurture/desktop.webp', alt: 'Nature’s Nurture — Desktop homepage' }, { src: 'projects/natures-nurture/mobile.webp', alt: 'Nature’s Nurture — Mobile homepage' }], liveUrl: 'https://xavier19052003.github.io/Nature-Nurture/', liveLinkEnabled: true, githubUrl: 'https://github.com/Xavier19052003/Nature-Nurture',
    featured: true, status: 'published', verified: true, theme: 'nature',
    filters: ['Commercial', 'Web Development'],
    highlights: ['Product catalogue and detail pages', 'Brand and retailer-focused information', 'About and contact sections', 'Responsive layouts and modern animations'],
  },
  {
    id: 'frs-vip', title: 'FRS VIP Protection', category: 'Commercial · Client website',
    description: 'A professional online presence for a protection business, bringing its services, company information, and contact options together.',
    technologies: [], image: 'projects/frs-vip/thumbnail.webp', imageAlt: 'FRS VIP Protection live homepage, showing its navigation and hero', fullPageImage: 'projects/frs-vip/full-page.webp', gallery: [{ src: 'projects/frs-vip/desktop.webp', alt: 'FRS VIP Protection — Desktop homepage' }, { src: 'projects/frs-vip/mobile.webp', alt: 'FRS VIP Protection — Mobile homepage' }, { src: 'projects/frs-vip/services.webp', alt: 'FRS VIP Protection — Security services page' }],
    liveUrl: 'https://xavier19052003.github.io/FRS-VIP/', liveLinkEnabled: true, githubUrl: 'https://github.com/Xavier19052003/FRS-VIP',
    featured: true, status: 'published', verified: true, theme: 'frs',
    filters: ['Commercial', 'Web Development'],
    highlights: ['Designed and developed for a real client', 'Responsive, user-friendly service presentation', 'Hosted on GitHub Pages as the company’s live website'],
  },
  {
    id: 'blaqpearl', title: 'BlaqPearl', category: 'Commercial · E-commerce',
    description: 'Contributing to an eyewear shopping experience through considered product presentation, responsive design, and usability.',
    technologies: [], image: 'projects/blaqpearl/thumbnail.webp', imageAlt: 'BlaqPearl live homepage, showing its navigation and hero', fullPageImage: 'projects/blaqpearl/full-page.webp', gallery: [{ src: 'projects/blaqpearl/desktop.webp', alt: 'BlaqPearl — Desktop homepage' }, { src: 'projects/blaqpearl/mobile.webp', alt: 'BlaqPearl — Mobile homepage' }, { src: 'projects/blaqpearl/catalog.webp', alt: 'BlaqPearl — Eyewear catalogue' }], liveUrl: 'https://blaqpearl.co.za', liveLinkEnabled: true, githubUrl: '',
    featured: true, status: 'published', verified: true, theme: 'blaq',
    filters: ['Commercial', 'Web Development'],
    highlights: ['Professional design and development contribution', 'Product presentation and shopping experience', 'Responsive interface improvements'],
    note: 'A collaborative commercial project completed while working at 360 Solution Technologies.',
  },
  {
    id: 'sneaker-pimps', title: 'Sneaker Pimps', category: 'Commercial · E-commerce',
    description: 'Website design and frontend development contributions for a commercial footwear retailer.',
    technologies: [], image: '', imageAlt: '', gallery: [], liveUrl: 'https://www.sneakerpimps.co.za', liveLinkEnabled: true, githubUrl: '',
    featured: false, archived: true, status: 'published', verified: true, theme: 'sneaker',
    filters: ['Commercial', 'Web Development'],
    highlights: ['Website design contribution', 'Frontend development in a professional setting', 'Work completed before leaving the company'],
    note: 'The live website may have changed since my involvement and may not reflect my original work.',
  },
  {
    id: 'eduswap', title: 'EduSwap', category: 'Native Android application · University project',
    description: 'A student-to-student textbook marketplace for discovering, buying and selling second-hand academic books, built as a lightweight Android MVP.',
    technologies: ['Kotlin', 'Android Studio', 'XML layouts', 'ViewBinding', 'RecyclerView', 'Activities & Intents', 'In-memory collections'],
    image: 'projects/eduswap/framed-marketplace.webp', imageAlt: 'EduSwap’s genuine textbook marketplace screen', gallery: eduswapScreens, screensIncludeDeviceFrame: true,
    liveUrl: '', liveLinkEnabled: false, githubUrl: 'https://github.com/Xavier19052003/EduSwap-MADA372-App', featured: false, status: 'academic', verified: true, theme: 'edu',
    filters: ['Application Development', 'Academic'],
    highlights: ['UI-only registration with required-field validation', 'Marketplace browsing, title search and book details', 'Create listings with device-selected images', 'Simple inquiries with blank-message and self-message checks', 'Profile details, own-listing deletion and Toast feedback'],
    note: 'Academic MVP with temporary in-memory data. No production authentication, cloud messaging, payments or verified app-store listing.',
  },
  {
    id: 'kitabu', title: 'Kitabu', category: 'Native Android application · University project',
    description: 'A library book rental and reservation app for browsing a local catalogue, reserving titles and managing pickup, renewals and returns with persistent Room storage.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room Database', 'Coroutines', 'Flow / StateFlow', 'MVVM', 'Navigation Compose', 'KSP', 'Git / GitHub'],
    image: 'projects/kitabu/catalog.webp', imageAlt: 'Kitabu’s genuine library book catalogue', gallery: kitabuScreens, screensIncludeDeviceFrame: true,
    liveUrl: '', liveLinkEnabled: false, githubUrl: 'https://github.com/Xavier19052003/Kitabu_MADB372_SF1',
    featured: false, status: 'academic', verified: true, theme: 'campus', filters: ['Application Development', 'Academic'],
    highlights: ['Catalogue with title/author search and availability badges', 'Reserve available books for 7, 14 or 21 days', 'Confirm pickup: PENDING to ACTIVE', 'Track deadlines and remaining rental days', 'Renew, return or cancel eligible bookings', 'Reactive availability updates backed by local Room storage'],
    note: 'Native Android university project with local persistent storage. No cloud sync, online accounts, payments or verified Play Store listing.',
  },
  {
    id: 'active-autism', title: 'Active Autism & Neuro-Diversity Allyship', category: 'University team project · Web development',
    description: 'A collaborative university website project where I led front-end implementation of public-facing sections and contributed to responsive and accessibility checks.',
    technologies: [], image: 'projects/autism-allyship/thumbnail.webp', imageAlt: 'The actual Autism Allyship homepage with its Be Kind hero', fullPageImage: 'projects/autism-allyship/full-page.webp', gallery: [{ src: 'projects/autism-allyship/desktop.webp', alt: 'Autism Allyship desktop homepage' }, { src: 'projects/autism-allyship/mobile.webp', alt: 'Autism Allyship mobile homepage' }], liveUrl: 'https://autism-allyship.pages.dev/', liveLinkEnabled: true, githubUrl: '',
    featured: true, status: 'academic', verified: true, theme: 'campus',
    filters: ['Web Development', 'Academic'],
    highlights: ['Front-end implementation for contact, donations, shop and ticketing', 'Public-facing resources and gallery sections', 'Collaboration in a multi-developer team', 'Accessibility and responsive quality checks'],
  },
  ...['MindMate AI', 'Kojo', 'Thirst for Change', 'STUDIO CORE / BishopCourt Studios'].map((title): Project => ({
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title, category: 'Details awaiting verification',
    description: '', technologies: [], image: '', imageAlt: '', gallery: [], liveUrl: '', liveLinkEnabled: false, githubUrl: '',
    featured: false, status: 'unverified', verified: false, highlights: [], filters: [], theme: 'campus',
  })),
]

export function getVisibleProjects(filter: ProjectFilter = 'All Projects') {
  return projects
    .filter(project => project.verified && !project.archived && project.status !== 'unverified' && (filter === 'All Projects' || project.filters.includes(filter)))
    .sort((a, b) => Number(b.featured) - Number(a.featured))
}
