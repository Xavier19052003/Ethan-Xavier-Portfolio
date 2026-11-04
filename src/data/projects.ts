export type ProjectFilter = 'All Projects' | 'Commercial' | 'Web Development' | 'Application Development' | 'Academic'
export type Project = {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  image: string
  imageAlt: string
  gallery: { src: string; alt: string }[]
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
    image: '', imageAlt: '', gallery: [], liveUrl: '', liveLinkEnabled: true, githubUrl: '',
    featured: true, status: 'published', verified: true, theme: 'nature',
    filters: ['Commercial', 'Web Development'],
    highlights: ['Product catalogue and detail pages', 'Brand and retailer-focused information', 'About and contact sections', 'Responsive layouts and modern animations'],
  },
  {
    id: 'frs-vip', title: 'FRS VIP Protection', category: 'Commercial · Client website',
    description: 'A professional online presence for a protection business, bringing its services, company information, and contact options together.',
    technologies: [], image: '', imageAlt: '', gallery: [],
    liveUrl: 'https://xavier19052003.github.io/FRS-VIP/', liveLinkEnabled: true, githubUrl: '',
    featured: true, status: 'published', verified: true, theme: 'frs',
    filters: ['Commercial', 'Web Development'],
    highlights: ['Designed and developed for a real client', 'Responsive, user-friendly service presentation', 'Hosted on GitHub Pages as the company’s live website'],
  },
  {
    id: 'blaqpearl', title: 'BlaqPearl', category: 'Commercial · E-commerce',
    description: 'Contributing to an eyewear shopping experience through considered product presentation, responsive design, and usability.',
    technologies: [], image: '', imageAlt: '', gallery: [], liveUrl: 'https://blaqpearl.co.za', liveLinkEnabled: true, githubUrl: '',
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
    id: 'eduswap', title: 'EduSwap', category: 'Android application · Academic',
    description: 'A student-focused textbook marketplace, designed to make buying, selling, and discovering second-hand textbooks easier.',
    technologies: ['Kotlin', 'Android Studio', 'Android UI', 'MVVM'],
    image: '', imageAlt: '',
    gallery: ['Registration', 'Home', 'Textbook search', 'Book details', 'Selling listings', 'Inbox', 'In-app messaging'].map(screen => ({ src: '', alt: `${screen} screenshot — to be added` })),
    liveUrl: '', liveLinkEnabled: false, githubUrl: '', featured: false, status: 'academic', verified: true, theme: 'edu',
    filters: ['Application Development', 'Academic'],
    highlights: ['Registration and home screen', 'Textbook search and book details', 'Selling listings', 'Inbox and in-app messaging'],
  },
  {
    id: 'campusconnect', title: 'CampusConnect', category: 'Android development · Academic',
    description: 'An exploration of modern Android development, data management, and local database integration through a university application project.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Android Studio'],
    image: '', imageAlt: '', gallery: [], liveUrl: '', liveLinkEnabled: false, githubUrl: '',
    featured: false, status: 'academic', verified: true, theme: 'campus',
    filters: ['Application Development', 'Academic'],
    highlights: ['Modern Android development concepts', 'Data management and local database integration', 'Academic learning and experimentation'],
    note: 'An academic development project, not a production-ready application.',
  },
  {
    id: 'active-autism', title: 'Active Autism & Neuro-Diversity Allyship', category: 'University team project · Web development',
    description: 'A collaborative university website project where I led front-end implementation of public-facing sections and contributed to responsive and accessibility checks.',
    technologies: [], image: '', imageAlt: '', gallery: [], liveUrl: '', liveLinkEnabled: false, githubUrl: '',
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
