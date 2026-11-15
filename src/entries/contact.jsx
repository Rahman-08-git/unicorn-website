import { mount } from '../mount.jsx'
import Page from '../pages/Contact.jsx'
import { mailto } from '../data/site.js'

mount(Page, 'contact', {
  title: 'Write to Unicorn Learning Lab',
  line: 'A few lines about who the learners are and what you have in mind is plenty to start.',
  action: { label: 'Email us', href: mailto('Enquiry from the website') },
})
