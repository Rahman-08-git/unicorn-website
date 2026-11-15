import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Photo from '../components/Photo.jsx'
import { Arrow, SectionHead } from '../components/Brand.jsx'
import { PHOTOS } from '../data/photos.js'
import { MAIN_ACTION } from '../data/site.js'
import { OFFERINGS, AUDIENCES } from '../data/content.js'
import { OFFER_ICONS, AUDIENCE_ICONS } from '../data/icons.js'

const OFFER_PHOTOS = {
  workshops: PHOTOS.microscope,
  'hands-on': PHOTOS.circuit,
  creative: PHOTOS.pencilWheel,
  technology: PHOTOS.soldering,
  products: PHOTOS.pencilRow,
}

/* Picks the offering named in the URL hash (links like /what-we-do/#technology). */
const fromHash = () => {
  const h = window.location.hash.slice(1)
  return OFFERINGS.some((o) => o.id === h) ? h : null
}

export default function WhatWeDo() {
  const [active, setActive] = useState(() => fromHash() || OFFERINGS[0].id)
  const tabs = useRef({})

  useEffect(() => {
    /* The page renders after the browser tried to jump to the hash, so jump now. */
    const initial = fromHash()
    if (initial) requestAnimationFrame(() => document.getElementById('experiences')?.scrollIntoView())
    const onHash = () => {
      const h = fromHash()
      if (h) setActive(h)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const onKey = (e) => {
    const i = OFFERINGS.findIndex((o) => o.id === active)
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = OFFERINGS[(i + step + OFFERINGS.length) % OFFERINGS.length].id
    setActive(next)
    tabs.current[next]?.focus()
  }

  const current = OFFERINGS.find((o) => o.id === active)

  return (
    <>
      <Hero
        kicker="What we do"
        title="Hands-on learning experiences"
        lead="Workshops, activities and learning products built on one principle: learners understand more when they make, test and explore. Each one is shaped for the group taking part."
        primary={MAIN_ACTION}
        secondary={{ label: 'See the five kinds', href: '#experiences' }}
        visual="emblem"
      />

      <section className="section" id="experiences" aria-labelledby="exp-h">
        <div className="wrap">
          <SectionHead
            id="exp-h"
            eyebrow="Experiences"
            title="Five kinds of learning experience"
            lead="Choose one to see it. Formats and dates are arranged with each group."
          />
          <div className="explorer">
            <div className="explorer__tabs" role="tablist" aria-label="Kinds of learning experience" aria-orientation="vertical" onKeyDown={onKey}>
              {OFFERINGS.map((o, i) => {
                const Icon = OFFER_ICONS[o.id]
                const selected = o.id === active
                return (
                  <button
                    key={o.id}
                    id={o.id}
                    ref={(el) => (tabs.current[o.id] = el)}
                    className="tab"
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="exp-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(o.id)}
                    data-reveal="left"
                    style={{ '--d': i }}
                  >
                    <span className="icon-badge">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="tab__title">{o.title}</span>
                    <ChevronRight className="tab__chev" aria-hidden="true" />
                  </button>
                )
              })}
            </div>
            <div className="explorer__panel" id="exp-panel" role="tabpanel" aria-labelledby={active} data-reveal="scale">
              {OFFERINGS.map((o) => (
                <Photo
                  key={o.id}
                  photo={OFFER_PHOTOS[o.id]}
                  className={`explorer__img${o.id === active ? ' is-active' : ''}`}
                  alt={o.id === active ? OFFER_PHOTOS[o.id].alt : ''}
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
              ))}
              <div className="explorer__text" key={active}>
                <span className="eyebrow" style={{ color: 'var(--sky-300)' }}>
                  {String(OFFERINGS.indexOf(current) + 1).padStart(2, '0')} / {String(OFFERINGS.length).padStart(2, '0')}
                </span>
                <h3>{current.title}</h3>
                <p>{current.short}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white" id="who-we-work-with" aria-labelledby="who-h">
        <div className="wrap">
          <SectionHead
            center
            id="who-h"
            eyebrow="Who we work with"
            title="Who we work with"
            lead="Each group can ask about a different starting point."
          />
          <ul className="audiences">
            {AUDIENCES.map((a, i) => {
              const Icon = AUDIENCE_ICONS[a.title]
              return (
                <li className="card spot audience" key={a.title} data-reveal style={{ '--d': i }}>
                  <span className="audience__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`icon-badge${i % 2 ? ' icon-badge--red' : ''}`}>
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.line}</p>
                </li>
              )
            })}
          </ul>
          <div className="banner" data-reveal="scale">
            <Photo photo={PHOTOS.glassware} className="" sizes="100vw" data-parallax="0.12" />
          </div>
          <p style={{ textAlign: 'center', marginTop: 40 }}>
            <a className="btn btn--primary btn--lg" href={MAIN_ACTION.href}>
              Ask about a learning experience
              <Arrow />
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
