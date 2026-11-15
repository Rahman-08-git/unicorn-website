import { CircleCheck, Sparkles, ArrowRight, Hammer } from 'lucide-react'
import { EmblemStage } from '../components/Hero.jsx'
import Photo from '../components/Photo.jsx'
import { Arrow, Ambient, Star, SplitWords, SectionHead } from '../components/Brand.jsx'
import { PHOTOS } from '../data/photos.js'
import { MAIN_ACTION, url } from '../data/site.js'
import { PRINCIPLES, SKILLS, OFFERINGS, AUDIENCES } from '../data/content.js'
import { PRINCIPLE_ICONS, SKILL_ICONS, OFFER_ICONS, AUDIENCE_ICONS } from '../data/icons.js'

const OFFER_PHOTOS = {
  workshops: PHOTOS.microscope,
  'hands-on': PHOTOS.circuit,
  creative: PHOTOS.pencilWheel,
  technology: PHOTOS.soldering,
  products: PHOTOS.pencilRow,
}

const LOOP = ['Observe', 'Try', 'Get it wrong', 'Try again', 'Make something real']

export default function Home() {
  const [first, ...rest] = PRINCIPLES
  const FirstIcon = PRINCIPLE_ICONS[first.title]
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero dark" aria-labelledby="hero-h">
        <Ambient />
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <span className="pill enter">
              <span className="pill__dot" aria-hidden="true" />
              Think. Explore. Discover.
            </span>
            <h1 id="hero-h">
              <span className="line">
                <SplitWords text="Don’t Just Learn." />
              </span>
              <span className="line">
                <span className="swoosh-wrap">
                  <span className="word">
                    <span style={{ '--w': 3 }} className="grad-text">
                      Create.
                    </span>
                  </span>
                  <svg className="swoosh" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="swoosh-grad" x1="0" x2="1">
                        <stop offset="0" stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    <path d="M4 16 C 70 4, 160 4, 296 14" />
                  </svg>
                </span>
              </span>
            </h1>
            <p className="lead enter" style={{ '--d': 4 }}>
              Hands-on learning experiences for children, school and college students, schools and organisations. Learners ask
              questions, test ideas and make things they can use.
            </p>
            <div className="btn-row enter" style={{ '--d': 5 }}>
              <a className="btn btn--primary btn--lg" href={MAIN_ACTION.href}>
                {MAIN_ACTION.label}
                <Arrow />
              </a>
              <a className="btn btn--ghost btn--lg" href={url('/what-we-do/')}>
                See what we do
              </a>
            </div>
            <ul className="hero__audience enter" style={{ '--d': 6 }} aria-label="Who we work with">
              <li className="hero__audience-label" aria-hidden="true">
                Built for
              </li>
              {AUDIENCES.map((a) => {
                const Icon = AUDIENCE_ICONS[a.title]
                return (
                  <li key={a.title}>
                    <Icon aria-hidden="true" />
                    {a.title.replace('Schools and educational institutions', 'Schools').replace('School and college students', 'Students')}
                  </li>
                )
              })}
            </ul>
          </div>
          <EmblemStage />
        </div>
        <div className="marquee" aria-label="Future-ready skills we practise">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <div key={copy} className={`marquee__copy${copy ? ' marquee__copy--dup' : ''}`} aria-hidden={copy === 1 ? 'true' : undefined}>
                {SKILLS.map((s) => (
                  <span className="marquee__item" key={s.name}>
                    <Star className="" />
                    {s.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- The lab ---------- */}
      <section className="section" id="lab" aria-labelledby="lab-h">
        <div className="wrap">
          <div className="split">
            <div className="collage" data-reveal="left">
              <div className="collage__main" data-reveal="clip">
                <Photo photo={PHOTOS.microscope} className="" sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className="collage__small">
                <Photo photo={PHOTOS.circuit} className="" sizes="240px" />
              </div>
              <div className="collage__badge">
                <span className="icon-badge">
                  <Hammer />
                </span>
                <span>
                  <strong>Hands on, every session</strong>
                  <span>Real materials, real questions</span>
                </span>
              </div>
            </div>
            <div className="copy">
              <span className="eyebrow" data-reveal>
                The lab
              </span>
              <h2 id="lab-h" data-reveal style={{ '--d': 1 }}>
                A lab for learning by doing
              </h2>
              <p className="lead" data-reveal style={{ '--d': 2 }}>
                Unicorn Learning Lab is a learning initiative where learners explore, test and build things themselves, because
                that is how an idea starts to make sense.
              </p>
              <p data-reveal style={{ '--d': 3 }}>
                Learners work with real materials and real questions. They finish with something they made and a clearer way of
                thinking about it.
              </p>
              <ul className="checks" aria-label="How a session feels">
                {LOOP.map((l, i) => (
                  <li key={l} data-reveal style={{ '--d': 4 + i }}>
                    <CircleCheck aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
              <p data-reveal style={{ '--d': 9 }}>
                <a className="link" href={url('/about/')}>
                  Read about the lab <ArrowRight aria-hidden="true" />
                </a>
              </p>
            </div>
          </div>

          <dl className="stats" data-reveal>
            {[
              [PRINCIPLES.length, 'principles behind every session'],
              [SKILLS.length, 'future-ready skills practised'],
              [OFFERINGS.length, 'kinds of learning experience'],
              [AUDIENCES.length, 'groups we work with'],
            ].map(([n, label]) => (
              <div className="stat" key={label}>
                <dt className="stat__label" style={{ order: 2 }}>
                  {label}
                </dt>
                <dd className="stat__num" style={{ margin: 0 }} data-count={n}>
                  {n}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Principles ---------- */}
      <section className="section section--white" id="principles" aria-labelledby="principles-h">
        <div className="ambient" aria-hidden="true">
          <span className="dots" />
        </div>
        <div className="wrap">
          <SectionHead
            center
            id="principles-h"
            eyebrow="Our approach"
            title="Five principles behind every session"
            lead="They shape how a topic is introduced, explored and finished."
          />
          <div className="bento">
            <a className="bento__feature" href={url('/our-approach/')} data-reveal="scale">
              <Photo photo={PHOTOS.seedling} className="" sizes="(max-width: 1080px) 100vw, 40vw" />
              <span className="principle__num">01</span>
              <span className="icon-badge" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}>
                <FirstIcon aria-hidden="true" />
              </span>
              <h3>{first.title}</h3>
              <p>{first.short}</p>
              <span className="link" style={{ color: '#fff', marginTop: 16 }}>
                Read our approach <ArrowRight aria-hidden="true" />
              </span>
            </a>
            {rest.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[p.title]
              return (
                <article className="card spot principle" key={p.title} data-reveal style={{ '--d': i + 1 }}>
                  <div className="principle__top">
                    <span className={`icon-badge${i % 2 ? ' icon-badge--red' : ''}`}>
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="principle__num">{String(i + 2).padStart(2, '0')}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.short}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- Education 4.0 ---------- */}
      <section className="section dark" id="education-4-0" aria-labelledby="edu-h">
        <Ambient stars={false} />
        <div className="wrap">
          <div className="split">
            <div className="copy">
              <span className="eyebrow" data-reveal>
                Education 4.0
              </span>
              <h2 id="edu-h" data-reveal style={{ '--d': 1 }}>
                Education 4.0, <span className="grad-text">in plain words</span>
              </h2>
              <p className="lead" data-reveal style={{ '--d': 2 }}>
                Facts are a search away. What lasts is knowing how to think with them, work with other people and adapt when
                things change.
              </p>
              <p data-reveal style={{ '--d': 3 }}>
                Education 4.0 is the name for learning that prepares people for a world shaped by digital technology. Every
                Unicorn Learning Lab experience is built to practise these skills, not just mention them.
              </p>
            </div>
            <div className="photo-frame" data-reveal="right">
              <Photo photo={PHOTOS.pencilWheel} className="" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </div>
          <ul className="skills" aria-label="Future-ready skills">
            {SKILLS.map((s, i) => {
              const Icon = SKILL_ICONS[s.name]
              return (
                <li className="skill spot" key={s.name} data-reveal style={{ '--d': i }}>
                  <span className="skill__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{s.name}</h3>
                  <p>{s.line}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section className="section" id="what-we-do" aria-labelledby="wwd-h">
        <div className="wrap">
          <SectionHead
            id="wwd-h"
            eyebrow="What we do"
            title="Five kinds of learning experience"
            lead="Each one shaped for the learners taking part."
          />
          <ul className="offers">
            {OFFERINGS.map((o, i) => {
              const Icon = OFFER_ICONS[o.id]
              return (
                <li className="card offer" key={o.id} data-reveal style={{ '--d': i }}>
                  <div className="offer__media">
                    <Photo photo={OFFER_PHOTOS[o.id]} className="" sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                  </div>
                  <div className="offer__body">
                    <span className="icon-badge">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3>{o.title}</h3>
                    <p>{o.short}</p>
                    <a className="link offer__more" href={url(`/what-we-do/#${o.id}`)} aria-label={`Learn more about ${o.title}`}>
                      Learn more <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Audiences ---------- */}
      <section className="section section--white" id="who" aria-labelledby="who-h">
        <div className="wrap">
          <SectionHead
            center
            id="who-h"
            eyebrow="Who we work with"
            title="Everyone curious is welcome"
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
          <p style={{ textAlign: 'center', marginTop: 40 }} data-reveal>
            <a className="btn btn--outline" href={url('/what-we-do/#who-we-work-with')}>
              <Sparkles aria-hidden="true" />
              Find your starting point
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
