export type CaseStudy = { role: string; year?: string; context: string; contribution: string; approach?: string; sections?: { title: string; body: string; items?: string[] }[] }

// Grounded in the supplied CV, briefs, Android assignments and inspected source.
// Documented testing is attributed to the assignment rather than claimed as a new run.
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
    role: 'Android application developer · individual university project',
    context: 'EduSwap — Student Textbook Marketplace addresses the cost and fragmented discovery of second-hand academic textbooks. It is intended for students who want to find affordable books or sell titles they no longer need.',
    contribution: 'I built the native Android interface and Kotlin flows for UI-only registration, marketplace browsing, title search, listing creation, book details, basic inquiries and profile management. Form validation and Toast feedback support the main actions.',
    approach: 'XML layouts and ViewBinding connect the interface to Kotlin Activities. A RecyclerView with a custom TextbookAdapter renders listings and updates title-search results. Activity navigation and Intents connect the screens; Kotlin objects and mutable collections hold temporary application state.',
    sections: [
      { title: 'Development decisions', body: 'I kept the academic MVP focused on the student journey: find a textbook, inspect its details, contact the seller or create a listing. ViewBinding reduced repeated view lookups, and RecyclerView made the marketplace list reusable and filterable. The inspected source uses Activities and repository-style state holders; a full ViewModel-based MVVM implementation is not claimed.' },
      { title: 'Validation and feedback', body: 'Registration requires a name, email and university. Listings validate essential book details, inquiry messages cannot be blank, and the app prevents sending a message to yourself. Students can view and delete their own listings. Toast messages acknowledge actions such as registration, listing changes, messaging and logout.' },
      { title: 'Academic MVP limitations', body: 'Data lives in temporary in-memory Kotlin collections. The prototype has no persistent Room or SQLite database, server-side storage, production authentication, payments, cloud messaging or real-time push notifications. The assignment’s Amazon Appstore link is a placeholder, so no verified store listing or download is claimed.' },
    ],
  },
  kitabu: {
    role: 'Android application developer · individual university project',
    context: 'Kitabu — Library Book Rental & Reservation System brings catalogue availability, book reservations and rental deadlines into one local Android application for students and library members.',
    contribution: 'I implemented catalogue browsing, title and author search, rental-period selection, reservation management, pickup confirmation, renewals, returns and cancellations. The dashboard shows booking dates, return deadlines, days remaining and current status.',
    approach: 'The MVVM structure separates Jetpack Compose and Material 3 screens, ViewModels, a LibraryRepository and the Room data layer. Coroutines perform database operations asynchronously, while Flow and StateFlow keep the interface in step with stored data. Navigation Compose connects the catalogue and reservations dashboard; KSP supports Room code generation.',
    sections: [
      { title: 'Project objectives', body: 'Make availability and return deadlines easy to understand, support the complete rental lifecycle, and keep the catalogue usable locally without relying on an external API or cloud service.' },
      { title: 'Room database and CRUD', body: 'BookEntity stores catalogue information and availability. BookingEntity stores reservation details, deadlines and status. DAO operations read and search the seeded catalogue, create bookings, update pickup status and rental deadlines, mark returned rentals, and delete eligible pending reservations. One book can have multiple booking records over time.' },
      { title: 'Booking lifecycle', body: 'A new reservation starts as PENDING and makes the book unavailable. Confirming pickup changes it to ACTIVE. Returning an active rental changes it to RETURNED and releases the book. Cancelling a pending reservation deletes that booking and restores availability.', items: ['Choose a 7, 14 or 21-day rental period.', 'Track return deadlines and remaining rental days.', 'Renew an active rental to extend its deadline.', 'Observe availability updates through Room and Flow.'] },
      { title: 'Testing documented in the assignment', body: 'The assignment records passing functional checks for launch, title and author search, booking creation, blocking reservation of borrowed books, pickup confirmation, renewal, return, cancellation, reactive availability updates, empty states and invalid reservation input. These are the project’s documented results; the Android test suite has not been rerun as part of this portfolio update.' },
      { title: 'Known limitations', body: 'Storage is local to the device. The project does not provide authentication, multi-user online accounts, cloud synchronisation, payments or late-fee handling. Returned bookings have no separate history screen. No public Play Store listing is claimed.' },
    ],
  },
  'active-autism': {
    role: 'Public-facing website front-end lead · university team project',
    context: 'A collaborative university development project for Active Autism & Neuro-Diversity Allyship.',
    contribution: 'I led front-end implementation of public-facing contact, donations, shop, ticketing, resources and gallery sections while collaborating with other developers.',
    approach: 'My contribution included responsive implementation and accessibility checks across the public-facing sections.',
  },
}
