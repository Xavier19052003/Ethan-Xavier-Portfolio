export type CaseStudy = { role: string; year?: string; context: string; contribution: string; approach?: string }

// Based only on the supplied CV and verified portfolio brief. Unknown challenges
// and outcomes are intentionally omitted until first-hand project notes exist.
export const caseStudies: Record<string, CaseStudy> = {
  'natures-nurture': {
    role: 'Freelance / client web developer', year: '2026',
    context: 'An FMCG business needed a product-led website with dedicated spaces for products, brands, company information, retailers and contact journeys.',
    contribution: 'I developed the multi-page website using React, Vite and TypeScript, including reusable components, responsive page layouts and product presentation. My work included refining responsive heroes and merchandise imagery.',
    approach: 'Reusable components supported consistency across pages. Responsive layouts, navigation and brand presentation were refined through iterative design revisions and client feedback, with CSS and GSAP supporting the interface and animations.',
  },
  'frs-vip': {
    role: 'Web designer and front-end developer',
    context: 'FRS VIP Protection needed a professional business website presenting its services, company information and ways to get in touch.',
    contribution: 'I designed and developed the responsive website used by the company as its live website, hosted on GitHub Pages.',
    approach: 'The interface focuses on clear service presentation and mobile-friendly navigation so visitors can find business information and contact options.',
  },
  'blaqpearl': {
    role: 'Contributing front-end web developer at 360 Solution Technologies', year: '2026',
    context: 'A commercial eyewear business with a client-facing website and online shopping experience.',
    contribution: 'I contributed to website design and responsive front-end development as part of my professional work. This was a collaborative project.',
    approach: 'My contribution focused on product presentation, usability and a responsive online experience.',
  },
  'sneaker-pimps': {
    role: 'Contributing web designer and front-end developer',
    context: 'A commercial footwear retailer’s website, worked on while employed as a web developer.',
    contribution: 'I contributed website design and front-end development before leaving the company. The current live website may have changed since my involvement.',
  },
  eduswap: {
    role: 'Android application developer · academic project',
    context: 'A student-focused marketplace concept for buying, selling and discovering second-hand textbooks.',
    contribution: 'I developed an Android marketplace concept covering registration, textbook search, listings, selling flows, book details and in-app messaging.',
    approach: 'The project used Kotlin and Android Studio with MVVM architecture. The interface connects book browsing and details with seller enquiries and messaging screens.',
  },
  campusconnect: {
    role: 'Android developer · academic learning project',
    context: 'A university application exploring modern Android development, data management and local database integration.',
    contribution: 'I explored Kotlin, Jetpack Compose and Room Database through an academic development project. It is presented as learning work rather than a production application.',
  },
  'active-autism': {
    role: 'Public-facing website front-end lead · university team project',
    context: 'A collaborative university development project for Active Autism & Neuro-Diversity Allyship.',
    contribution: 'I led front-end implementation of public-facing contact, donations, shop, ticketing, resources and gallery sections while collaborating with other developers.',
    approach: 'My contribution included responsive implementation and accessibility checks across the public-facing sections.',
  },
}
