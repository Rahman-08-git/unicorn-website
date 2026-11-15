/*
  Small, dependency-free motion layer, started once per page load by Layout.jsx.
  - [data-reveal]      fades/slides in when scrolled into view (stagger with style --d)
  - [data-count]       counts up to its number when visible
  - .spot              cursor spotlight (sets --mx / --my)
  - [data-tilt]        gentle 3D tilt that follows the pointer
  - [data-parallax]    vertical parallax, value = speed (e.g. 0.15)
  - [data-progress]    sets --p (0..1) on its [data-progress-bar] as you scroll through it
  Everything is skipped under prefers-reduced-motion; content is always visible without it.
*/
let started = false

export function initMotion() {
  if (started) return
  started = true

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

  /* Reveal */
  const reveals = document.querySelectorAll('[data-reveal]')
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'))
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target
            el.classList.add('is-in')
            io.unobserve(el)
            /* Once settled, hand the element back to its own hover transitions. */
            const d = Number(el.style.getPropertyValue('--d')) || 0
            setTimeout(() => el.removeAttribute('data-reveal'), 1700 + d * 80)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    reveals.forEach((el) => io.observe(el))
  }

  /* Counters */
  const counters = document.querySelectorAll('[data-count]')
  if (!reduce && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          cio.unobserve(e.target)
          const el = e.target
          const to = Number(el.dataset.count)
          const t0 = performance.now()
          const dur = 1400
          const tick = (t) => {
            const k = Math.min(1, (t - t0) / dur)
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 4))))
            if (k < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.6 },
    )
    counters.forEach((el) => {
      el.textContent = '0'
      cio.observe(el)
    })
  }

  if (reduce) return

  /* Spotlight */
  if (finePointer) {
    document.addEventListener(
      'pointermove',
      (e) => {
        const card = e.target.closest?.('.spot')
        if (!card) return
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      },
      { passive: true },
    )

    /* Tilt */
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      const max = Number(el.dataset.tilt) || 8
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.transform = `perspective(1000px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`
      })
      el.addEventListener('pointerleave', () => {
        el.style.transform = ''
      })
    })
  }

  /* Parallax + progress, one rAF-throttled scroll handler */
  const parallax = [...document.querySelectorAll('[data-parallax]')]
  const progress = [...document.querySelectorAll('[data-progress]')]
  if (!parallax.length && !progress.length) return

  let ticking = false
  const update = () => {
    ticking = false
    const vh = window.innerHeight
    parallax.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect()
      if (r.bottom < 0 || r.top > vh) return
      const speed = Number(el.dataset.parallax) || 0.15
      const offset = (r.top + r.height / 2 - vh / 2) * -speed
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    })
    progress.forEach((el) => {
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height))
      const bar = el.querySelector('[data-progress-bar]') || el
      bar.style.setProperty('--p', p.toFixed(3))
    })
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()
}
