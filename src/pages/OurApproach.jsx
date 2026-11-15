import { BookOpen, Lightbulb, Brain, Wrench } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Photo from '../components/Photo.jsx'
import { Ambient, SectionHead } from '../components/Brand.jsx'
import { PHOTOS } from '../data/photos.js'
import { MAIN_ACTION } from '../data/site.js'
import { SKILLS } from '../data/content.js'
import { SKILL_ICONS } from '../data/icons.js'

const CHAPTERS = [
  {
    title: 'Start with a question',
    line: 'Every experience begins with something to wonder about. Why does this work? What happens if we change it? Could we make one?',
    photo: PHOTOS.microscope,
  },
  {
    title: 'Explore real materials and tools',
    line: 'Learners handle real materials and tools, look closely and note what they see before anyone explains it to them.',
    photo: PHOTOS.circuit,
  },
  {
    title: 'Experiment and test',
    line: 'They try an idea, measure what happens and change one thing at a time. A result that surprises them is part of the method.',
    photo: PHOTOS.soldering,
  },
  {
    title: 'Create something real',
    line: 'The experience ends with something made and explained: a model, a working circuit, a design or a solution.',
    photo: PHOTOS.origami,
  },
]

const DEPTH = [
  {
    title: 'Learning beyond memorisation',
    line: 'Remembering a fact is a start. Understanding shows when a learner can use it somewhere new, so that is what each session asks for.',
    icon: BookOpen,
  },
  {
    title: 'Creativity and independent thinking',
    line: 'Learners are asked for their own idea first. Adults guide with questions more often than answers.',
    icon: Lightbulb,
  },
  {
    title: 'Critical thinking and problem-solving',
    line: 'Results are compared, claims are checked and a plan that did not work is taken apart to see why.',
    icon: Brain,
  },
  {
    title: 'Practical application',
    line: 'Each topic is tied to something real a learner can touch, build or try, so it connects to life outside the lesson.',
    icon: Wrench,
  },
]

export default function OurApproach() {
  return (
    <>
      <Hero
        kicker="Our approach"
        title="How we approach learning"
        lead="Start with a question, work it out with your hands, finish by making something. It is simple to describe and takes care to do well, for every age and every group."
        primary={MAIN_ACTION}
        secondary={{ label: 'See what we do', href: '/what-we-do/' }}
        visual={PHOTOS.pencilRow}
        chip="Question → explore → test → create"
      />

      <section className="section" id="how-it-unfolds" aria-labelledby="unfold-h">
        <div className="wrap">
          <SectionHead
            center
            id="unfold-h"
            eyebrow="The journey"
            title="How a learning experience unfolds"
            lead="Four stages, in the order learners meet them."
          />
          <ol className="timeline" data-progress>
            <span className="timeline__rail" data-progress-bar aria-hidden="true" />
            {CHAPTERS.map((c, i) => (
              <li className="step" key={c.title}>
                <span className="step__dot" aria-hidden="true" />
                <figure className="step__media" data-reveal="clip">
                  <Photo photo={c.photo} className="" sizes="(max-width: 900px) 100vw, 50vw" />
                </figure>
                <div className="step__copy" data-reveal={i % 2 ? 'left' : 'right'}>
                  <span className="step__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3>{c.title}</h3>
                  <p>{c.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dark" id="future-ready-skills" aria-labelledby="skills-h">
        <Ambient />
        <div className="wrap">
          <div className="split">
            <div className="copy">
              <span className="eyebrow" data-reveal>
                Education 4.0
              </span>
              <h2 id="skills-h" data-reveal style={{ '--d': 1 }}>
                Education 4.0 and <span className="grad-text">future-ready skills</span>
              </h2>
              <p className="lead" data-reveal style={{ '--d': 2 }}>
                Education 4.0 describes learning that keeps pace with a world shaped by digital technology. A session is judged by
                what learners can do at the end of it: explain their thinking, work with others, use a tool to make something and
                adapt when it goes wrong.
              </p>
            </div>
            <div className="photo-frame" data-reveal="right">
              <Photo photo={PHOTOS.glassware} className="" sizes="(max-width: 900px) 100vw, 50vw" />
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

      <section className="section" id="beyond-memorisation" aria-labelledby="depth-h">
        <div className="wrap">
          <SectionHead id="depth-h" eyebrow="Our expectations" title="What we ask of learners" />
          <ul className="steps-grid">
            {DEPTH.map((d, i) => (
              <li className="card spot principle" key={d.title} data-reveal style={{ '--d': i }}>
                <span className={`icon-badge${i % 2 ? ' icon-badge--red' : ''}`}>
                  <d.icon aria-hidden="true" />
                </span>
                <h3>{d.title}</h3>
                <p>{d.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
