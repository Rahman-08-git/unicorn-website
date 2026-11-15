import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './components/Layout.jsx'
import './styles/site.css'

/* Each HTML page's entry calls this with its page component, id and closing line. */
export function mount(Page, page, close) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Layout page={page} close={close} light={page === 'credits' || page === 'not-found'}>
        <Page />
      </Layout>
    </StrictMode>,
  )
}
