import { NAV, MAIN_ACTION, SITE_NAME, SOCIAL_LINKS } from '../data/site.js'
import { BrandLink, Arrow, Ambient, Emblem } from './Brand.jsx'

const COLUMNS = [
  { title: 'The lab', links: NAV.filter((n) => ['home', 'about', 'approach'].includes(n.id)) },
  {
    title: 'Work with us',
    links: [NAV.find((n) => n.id === 'what-we-do'), { id: 'contact', label: 'Contact', href: MAIN_ACTION.href }],
  },
]

/*
  The page's last screen: a call-to-action card, then the directory.
  `close` comes from each page so the line fits what the visitor has just read.
*/
export default function Footer({ close }) {
  const action = close.action || MAIN_ACTION
  return (
    <>
      <section className="section section--tight" aria-labelledby="close-h">
        <div className="wrap">
          <div className="cta" data-reveal="scale">
            <Ambient grid stars={false} />
            <Emblem size={384} className="cta__emblem" />
            <div>
              <span className="eyebrow">Let’s build something</span>
              <h2 id="close-h" style={{ marginTop: 16 }}>
                {close.title}
              </h2>
              <p>{close.line}</p>
            </div>
            <a className="btn btn--light btn--lg" href={action.href}>
              {action.label}
              <Arrow />
            </a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap">
          <div className="footer__grid">
            <div>
              <BrandLink />
              <p className="footer__lede">Hands-on learning experiences built on curiosity, creativity and practical work.</p>
            </div>
            {COLUMNS.map((col) => (
              <div className="footer__col" key={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.id}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer__legal">
            <span>
              &copy; {new Date().getFullYear()} {SITE_NAME}
            </span>
            {SOCIAL_LINKS.length > 0 && (
              <div className="socials">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.href} href={s.href} rel="me noopener" target="_blank">
                    {s.label}
                  </a>
                ))}
              </div>
            )}
            <a href="/credits/">Photographs via Wikimedia Commons</a>
          </div>
          <p className="footer__big" aria-hidden="true">
            Don’t just learn.
          </p>
        </div>
      </footer>
    </>
  )
}
