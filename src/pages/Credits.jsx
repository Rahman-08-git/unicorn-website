import { ArrowUpRight } from 'lucide-react'
import credits from '../data/credits.json'

/* Licence credits for every photograph the site shows (CC BY and CC BY-SA require them). */
export default function Credits() {
  return (
    <section className="section" id="credits" aria-labelledby="credits-h" style={{ paddingTop: 'calc(var(--header-h) + 80px)' }}>
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div className="section-head">
          <span className="eyebrow enter">Credits</span>
          <h1 id="credits-h" className="enter" style={{ '--d': 1, fontSize: 'clamp(2.4rem, 3vw + 1rem, 3.6rem)' }}>
            Photograph credits
          </h1>
          <p className="enter" style={{ '--d': 2 }}>
            The photographs on this site come from Wikimedia Commons, resized and cropped for the web, and are used under the
            licences below. They show the materials of hands-on learning; they are not photographs of Unicorn Learning Lab
            sessions.
          </p>
        </div>
        <ul className="credits-list">
          {credits.map((c, i) => (
            <li className="card" key={c.id} data-reveal style={{ '--d': i }}>
              <strong>{c.title}</strong>
              <p>
                By {c.by} ·{' '}
                <a href={c.licenceUrl} rel="noopener license" target="_blank">
                  {c.licence}
                </a>{' '}
                ·{' '}
                <a href={c.page} rel="noopener" target="_blank">
                  Original on Wikimedia Commons
                  <ArrowUpRight size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px', marginLeft: 2 }} />
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
