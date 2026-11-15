import { ChevronRight, FlaskConical, Lightbulb, Rocket, Sparkles } from 'lucide-react'
import { Arrow, Emblem, Ambient, Star, SplitWords } from './Brand.jsx'
import Photo from './Photo.jsx'

/* The emblem on its stage: orbit rings, a glow and floating principle chips. */
export function EmblemStage({ chips = true, className = 'hero__visual' }) {
  return (
    <div className={className} data-tilt="6">
      <div className="stage enter-pop">
      <span className="orbit" aria-hidden="true">
        <span className="orbit__dot" />
      </span>
      <span className="orbit orbit--2" aria-hidden="true">
        <span className="orbit__dot" />
      </span>
      <div className="emblem-disc">
        <Emblem size={720} eager decorative={false} className="" />
      </div>
      <Star className="star" style={{ top: '6%', right: '14%', width: 28, height: 28 }} />
      <Star className="star star--red" style={{ bottom: '18%', right: '6%' }} />
      {chips && (
        <>
          <span className="float-card fc-1" aria-hidden="true">
            <span className="float-card__icon">
              <FlaskConical />
            </span>
            Learn by doing
          </span>
          <span className="float-card float-card--sky fc-2" aria-hidden="true">
            <span className="float-card__icon">
              <Lightbulb />
            </span>
            Explore with curiosity
          </span>
          <span className="float-card float-card--red fc-3" aria-hidden="true">
            <span className="float-card__icon">
              <Rocket />
            </span>
            Create fearlessly
          </span>
        </>
      )}
      </div>
    </div>
  )
}

/*
  The hero used by inner pages: dark stage, words on the left,
  a photograph (or the emblem) on the right.
*/
export default function Hero({ kicker, title, lead, primary, secondary, visual = 'emblem', photoPosition, chip }) {
  return (
    <section className="page-hero dark" aria-labelledby="hero-h">
      <Ambient />
      <div className="wrap page-hero__grid">
        <div className="page-hero__copy">
          {kicker && (
            <nav className="crumbs enter" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <ChevronRight aria-hidden="true" />
              <span aria-current="page">{kicker}</span>
            </nav>
          )}
          <h1 id="hero-h">
            <SplitWords text={title} />
          </h1>
          <p className="lead enter" style={{ '--d': 3 }}>
            {lead}
          </p>
          <div className="btn-row enter" style={{ '--d': 4 }}>
            {primary && (
              <a className="btn btn--primary" href={primary.href}>
                {primary.label}
                <Arrow />
              </a>
            )}
            {secondary && (
              <a className="btn btn--ghost" href={secondary.href}>
                {secondary.label}
              </a>
            )}
          </div>
        </div>
        {visual === 'emblem' ? (
          <EmblemStage className="hero__visual page-hero__emblem" chips={false} />
        ) : (
          <div className="page-hero__media enter-pop">
            <div className="page-hero__photo" style={photoPosition ? { '--pos': photoPosition } : undefined}>
              <Photo photo={visual} eager className="" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            {chip && (
              <span className="float-card page-hero__chip" aria-hidden="true">
                <span className="float-card__icon">
                  <Sparkles />
                </span>
                {chip}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
