/*
  Site-wide facts. Everything here is what the brand has actually confirmed.

  CONTACT_EMAIL: the address the "Email us" buttons open.
  !! Replace the stand-in below with Unicorn Learning Lab's real address before going live. !!
  It sits on the reserved .example domain on purpose: it can never reach a stranger's inbox, and
  it is never printed on the page.

  FORM_ENDPOINT: leave null. The site has no backend, so it shows no contact form. To add one later,
  sign up with a form service that accepts a plain HTML POST (Formspree, Basin, Web3Forms or a
  Cloudflare Pages Function), put its URL here, and the Contact page shows its form; the design
  system's form script posts to it and only shows "sent" once the service has answered.

  SOCIAL_LINKS: empty until real account URLs are supplied, e.g.
  { label: 'Instagram', href: 'https://www.instagram.com/<account>/' }
*/
export const SITE_NAME = 'Unicorn Learning Lab'
export const CONTACT_EMAIL = 'hello@unicornlearninglab.example'
export const FORM_ENDPOINT = null
export const SOCIAL_LINKS = []

export const mailto = (subject) =>
  `mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

export const NAV = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about/' },
  { id: 'approach', label: 'Our approach', href: '/our-approach/' },
  { id: 'what-we-do', label: 'What we do', href: '/what-we-do/' },
]

export const MAIN_ACTION = { label: 'Contact us', href: '/contact/' }
