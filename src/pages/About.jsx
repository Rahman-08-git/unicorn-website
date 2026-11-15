import { Lightbulb, Palette, Compass, Hammer, Check, Minus } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Photo from '../components/Photo.jsx'
import { Ambient, SectionHead } from '../components/Brand.jsx'
import { PHOTOS } from '../data/photos.js'
import { MAIN_ACTION, url } from '../data/site.js'

const COMPARISON = [
  ['Listening to an explanation', 'Working the idea out with your hands'],
  ['Memorising the right answer', 'Asking a question and testing it'],
  ['One method to follow', 'Several ways to try, compared afterwards'],
  ['Marks as the finish line', 'Understanding as the finish line'],
  ['Learning about technology', 'Making things with technology'],
]

const COMMITMENTS = [
  ['Curiosity', 'Questions are welcome, including the ones without a neat answer.', Lightbulb],
  ['Creativity', 'Learners are asked to make something of their own, not copy an example.', Palette],
  ['Exploration', 'There is time to look closely, wander off course and come back with something.', Compass],
  ['Practical learning', 'Every idea is tried out on real materials, tools or problems.', Hammer],
]

export default function About() {
  return (
    <>
      <Hero
        kicker="About"
        title="About Unicorn Learning Lab"
        lead="A learning initiative that brings creativity, technology and practical work into education, for children, students and the schools and organisations that teach them."
        primary={MAIN_ACTION}
        secondary={{ label: 'Read our approach', href: url('/our-approach/') }}
        visual={PHOTOS.origami}
        photoPosition="50% 60%"
        chip="Learning by making"
      />

      <section className="section" id="why" aria-labelledby="why-h">
        <div className="wrap split">
          <div className="copy">
            <span className="eyebrow" data-reveal>
              Why we exist
            </span>
            <h2 id="why-h" data-reveal style={{ '--d': 1 }}>
              Why Unicorn Learning Lab exists
            </h2>
            <p className="lead" data-reveal style={{ '--d': 2 }}>
              A lot of learning stops at the page. A learner can repeat a definition for a test and still not know how to use it,
              or why it matters.
            </p>
            <p data-reveal style={{ '--d': 3 }}>
              Unicorn Learning Lab exists to close that gap. We design experiences where learners meet an idea by working with it:
              asking about it, testing it, building with it and explaining what they found.
            </p>
          </div>
          <figure className="photo-frame" data-reveal="clip" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <Photo photo={PHOTOS.glassware} className="" sizes="(max-width: 900px) 100vw, 50vw" />
          </figure>
        </div>
      </section>

      <section className="section dark" id="vision" aria-labelledby="vision-h">
        <Ambient />
        <div className="wrap">
          <div className="split">
            <div className="copy">
              <span className="eyebrow" data-reveal>
                Our vision
              </span>
              <h2 id="vision-h" data-reveal style={{ '--d': 1 }}>
                Our vision for learning
              </h2>
              <p className="lead" data-reveal style={{ '--d': 2 }}>
                Learning should prepare people for a world that keeps changing: curiosity that carries on after school, the
                confidence to try new things and the habit of thinking for yourself.
              </p>
            </div>
            <div className="photo-frame" data-reveal="right">
              <Photo photo={PHOTOS.seedling} className="" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </div>
          <ul className="skills" aria-label="What we commit to">
            {COMMITMENTS.map(([name, line, Icon], i) => (
              <li className="skill spot" key={name} data-reveal style={{ '--d': i }}>
                <span className="skill__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{name}</h3>
                <p>{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="conventional-learning" aria-labelledby="conv-h">
        <div className="wrap">
          <SectionHead
            id="conv-h"
            eyebrow="A different emphasis"
            title="How we see conventional learning"
            lead="Classrooms, teachers and textbooks matter, and we work alongside them. What we add is the part a tight timetable often squeezes out: time to experiment, to make mistakes safely and to build something real."
          />
          <div className="compare">
            <div className="compare__col compare__col--old" data-reveal="left">
              <h3>Often, in a busy timetable</h3>
              <ul>
                {COMPARISON.map(([from]) => (
                  <li key={from}>
                    <Minus aria-hidden="true" />
                    {from}
                  </li>
                ))}
              </ul>
            </div>
            <div className="compare__col compare__col--new" data-reveal="right">
              <h3>In a Unicorn Learning Lab session</h3>
              <ul>
                {COMPARISON.map(([from, to]) => (
                  <li key={from}>
                    <Check aria-hidden="true" />
                    {to}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
