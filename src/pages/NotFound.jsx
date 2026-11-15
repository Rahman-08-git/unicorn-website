import { Emblem } from '../components/Brand.jsx'
import { NAV } from '../data/site.js'

export default function NotFound() {
  return (
    <section className="section" aria-labelledby="nf-h" style={{ paddingTop: 'calc(var(--header-h) + 80px)' }}>
      <div className="wrap split">
        <div className="copy">
          <span className="eyebrow enter">Error 404</span>
          <h1 id="nf-h" className="enter" style={{ '--d': 1 }}>
            This page does not exist
          </h1>
          <p className="lead enter" style={{ '--d': 2 }}>
            The link may be old or mistyped. Every experiment needs a second attempt: try one of these pages instead.
          </p>
          <ul className="not-found__links enter" style={{ '--d': 3 }}>
            {NAV.map((n) => (
              <li key={n.id}>
                <a className="btn btn--outline btn--sm" href={n.href}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="enter-pop" style={{ maxWidth: 380, justifySelf: 'center' }}>
          <div className="emblem-disc" style={{ position: 'relative', inset: 'auto', aspectRatio: 1 }}>
            <Emblem size={384} decorative className="" />
          </div>
        </div>
      </div>
    </section>
  )
}
