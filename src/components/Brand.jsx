import { ArrowRight } from 'lucide-react'
import { SITE_NAME, BASE, url } from '../data/site.js'

/* The client's own emblem (logo.jpeg, cropped to its circle), never redrawn. */
export function Emblem({ size = 96, className = 'brand-emblem', eager = false, decorative = true }) {
  return (
    <img
      className={className}
      src={`${BASE}assets/logo/emblem-${size <= 96 ? 96 : size <= 192 ? 192 : size <= 384 ? 384 : 720}.webp`}
      srcSet={size <= 96 ? `${BASE}assets/logo/emblem-96.webp 1x, ${BASE}assets/logo/emblem-192.webp 2x` : undefined}
      width={size}
      height={size}
      alt={decorative ? '' : 'Unicorn Learning Lab emblem: a unicorn rising from an open book'}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

/* Logo link used in the header and footer: the emblem with the name beside it. */
export function BrandLink({ current = false, eager = false }) {
  return (
    <a className="brand" href={url('/')} aria-current={current ? 'page' : undefined}>
      <Emblem size={96} eager={eager} className="" />
      <span className="brand__name">{SITE_NAME}</span>
    </a>
  )
}

export function Arrow() {
  return <ArrowRight aria-hidden="true" strokeWidth={2.4} />
}

/* The four-point sparkle from the emblem. */
export function Star({ className = 'star', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  )
}

/* Drifting colour blobs and a faint grid, used behind dark sections. */
export function Ambient({ grid = true, stars = true }) {
  return (
    <div className="ambient" aria-hidden="true">
      <span className="blob blob--blue" />
      <span className="blob blob--sky" />
      <span className="blob blob--red" />
      {grid && <span className="grid-lines" />}
      {stars && (
        <>
          <Star className="star" style={{ top: '22%', left: '6%' }} />
          <Star className="star star--red star--sm" style={{ top: '68%', left: '46%' }} />
          <Star className="star star--sm" style={{ top: '14%', right: '40%' }} />
        </>
      )}
    </div>
  )
}

/* Splits a short headline into words that rise in one after another. */
export function SplitWords({ text, start = 0 }) {
  const words = text.split(' ')
  return words.map((w, i) => (
    <span key={i}>
      <span className="word">
        <span style={{ '--w': i + start }}>{w}</span>
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ))
}

export function SectionHead({ eyebrow, title, lead, center = false, id }) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      {eyebrow && (
        <span className="eyebrow" data-reveal>
          {eyebrow}
        </span>
      )}
      <h2 id={id} data-reveal style={{ '--d': 1 }}>
        {title}
      </h2>
      {lead && (
        <p data-reveal style={{ '--d': 2 }}>
          {lead}
        </p>
      )}
    </div>
  )
}
