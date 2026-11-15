import { useEffect } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { initMotion } from '../lib/motion.js'

/* Shared shell: header, page body, closing call-to-action and footer. Motion starts once React has rendered. */
export default function Layout({ page, close, light = false, children }) {
  useEffect(() => {
    initMotion()
  }, [])
  return (
    <>
      <Header page={page} light={light} />
      <main id="top">{children}</main>
      <Footer close={close} />
    </>
  )
}
