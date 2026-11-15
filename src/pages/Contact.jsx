import { Mail, UserRound, Users, Lightbulb, MapPin } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { Arrow, Ambient, SectionHead } from '../components/Brand.jsx'
import { FORM_ENDPOINT, mailto } from '../data/site.js'

const FIRST_EMAIL = [
  ['Who you are', 'A parent, a student, a teacher, a school or an organisation.', UserRound],
  ['Who the learners are', 'Their age or year group, and roughly how many there are.', Users],
  ['What you have in mind', 'A workshop, an activity, a collaboration, a learning product, or a question.', Lightbulb],
  ['Where and when', 'The place, and the weeks or months you are thinking about.', MapPin],
]

export default function Contact() {
  const email = mailto('Enquiry from the website')
  return (
    <>
      <Hero
        kicker="Contact"
        title="Contact Unicorn Learning Lab"
        lead="Parents, students, schools, institutions and organisations are welcome to get in touch about learning experiences, workshops and collaborations. Email is the quickest way to reach us."
        primary={{ label: 'Email us', href: email }}
        secondary={{ label: 'What to include', href: '#first-email' }}
        visual="emblem"
      />

      <section className="section" id="first-email" aria-labelledby="first-h">
        <div className="wrap">
          <SectionHead
            id="first-h"
            eyebrow="Before you write"
            title="What to put in your first email"
            lead="A few details help us reply with something useful instead of a list of questions."
          />
          <div className="split" style={{ alignItems: 'start' }}>
            <ol className="steps-grid">
              {FIRST_EMAIL.map(([name, line, Icon], i) => (
                <li className="card spot principle" key={name} data-reveal style={{ '--d': i }}>
                  <div className="principle__top">
                    <span className={`icon-badge${i % 2 ? ' icon-badge--red' : ''}`}>
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="principle__num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3>{name}</h3>
                  <p>{line}</p>
                </li>
              ))}
            </ol>
            <div className="email-card" data-reveal="right">
              <Ambient grid={false} stars={false} />
              <span className="icon-badge">
                <Mail aria-hidden="true" />
              </span>
              <h3 style={{ fontSize: '1.9rem' }}>Email is the quickest way to reach us</h3>
              <p>A few lines about who the learners are and what you have in mind is plenty to start. We reply by email.</p>
              <div>
                <a className="btn btn--light btn--lg" href={email}>
                  Email us
                  <Arrow />
                </a>
              </div>
              {FORM_ENDPOINT && <ContactForm endpoint={FORM_ENDPOINT} />}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
