import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { NAV, MAIN_ACTION, url } from '../data/site.js'
import { PHOTOS } from '../data/photos.js'
import { BrandLink, Arrow } from './Brand.jsx'

/* The panel under "What we do": four kinds of experience with a photograph each. */
const MENU = [
  { href: url('/what-we-do/#workshops'), title: 'Workshops', line: 'For classes, schools and groups', photo: PHOTOS.microscope },
  { href: url('/what-we-do/#hands-on'), title: 'Hands-on activities', line: 'Build, test and take apart', photo: PHOTOS.circuit },
  { href: url('/what-we-do/#creative'), title: 'Creative learning', line: 'Design, draw and make', photo: PHOTOS.pencilWheel },
  { href: url('/what-we-do/#technology'), title: 'Technology learning', line: 'Circuits, code and tools', photo: PHOTOS.soldering },
]

export default function Header({ page, light = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 12)
        const max = document.documentElement.scrollHeight - window.innerHeight
        barRef.current?.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : '0')
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cls = ['header', scrolled && 'is-scrolled', light && 'header--light', open && 'menu-is-open'].filter(Boolean).join(' ')

  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <header className={cls}>
        <div className="header__progress" ref={barRef} aria-hidden="true" />
        <div className="wrap">
          <div className="header__bar">
            <BrandLink current={page === 'home'} eager />
            <nav className="nav" aria-label="Main">
              {NAV.map((item) => (
                <div className="nav__item" key={item.id}>
                  <a className="nav__link" href={item.href} aria-current={page === item.id ? 'page' : undefined}>
                    {item.label}
                    {item.id === 'what-we-do' && <ChevronDown aria-hidden="true" />}
                  </a>
                  {item.id === 'what-we-do' && (
                    <div className="mega">
                      {MENU.map((m) => (
                        <a className="mega__card" href={m.href} key={m.href}>
                          <img src={m.photo.src.replace('.webp', '-500.webp')} alt="" width="64" height="64" loading="lazy" />
                          <span>
                            <span className="mega__title">{m.title}</span>
                            <span className="mega__line">{m.line}</span>
                          </span>
                        </a>
                      ))}
                      <a className="mega__all" href={url('/what-we-do/')}>
                        See all five kinds of experience <ArrowRight aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <a className="btn btn--primary btn--sm header__cta" href={MAIN_ACTION.href} aria-current={page === 'contact' ? 'page' : undefined}>
              {MAIN_ACTION.label}
              <Arrow />
            </a>
            <button
              ref={toggleRef}
              className="menu-btn"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <ul>
          {[...NAV, { id: 'contact', label: MAIN_ACTION.label, href: MAIN_ACTION.href }].map((item, i) => (
            <li key={item.id} style={{ '--d': i }}>
              <a className="m-link" href={item.href} aria-current={page === item.id ? 'page' : undefined} onClick={() => setOpen(false)}>
                {item.label}
                <ArrowRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn--primary btn--lg" href={MAIN_ACTION.href}>
          Start a conversation
          <Arrow />
        </a>
      </div>
    </>
  )
}
