import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

/*
  Unicorn Learning Lab is a multi-page site: every page is its own HTML file with its own title,
  description and share tags, so search engines and link previews read them without running
  JavaScript, and a refresh or a direct link on Cloudflare Pages always finds a real file.
  React renders each page's body from src/pages.

  The shared <head> lines (fonts, the design-system stylesheets, the entrance guard) are written
  once below and injected where each HTML file says <!--shared-head-->.

  SITE_URL (in .env or the Cloudflare Pages build settings), e.g. SITE_URL=https://www.example.org
  turns on the canonical tags, the og:url tags and sitemap.xml. Leave it unset until the domain
  is known: nothing pretends to know a domain.
*/

const PAGES = {
  main: { file: 'index.html', path: '/' },
  about: { file: 'about/index.html', path: '/about/' },
  approach: { file: 'our-approach/index.html', path: '/our-approach/' },
  whatWeDo: { file: 'what-we-do/index.html', path: '/what-we-do/' },
  contact: { file: 'contact/index.html', path: '/contact/' },
  credits: { file: 'credits/index.html', path: '/credits/' },
  notFound: { file: '404.html', path: null },
}

/*
  BASE_PATH: where the site is served from. Leave unset for a domain of its own ('/').
  The GitHub Pages workflow sets it to '/<repo-name>/' so links and images work in that subfolder.
*/
const BASE = ((process.env.BASE_PATH || '/').replace(/\/*$/, '/')).replace(/^\/*/, '/')

const SHARED_HEAD = `
<meta name="site-kind" content="other">
<meta name="page-type" content="service">
<meta name="theme-color" content="#0b1a4a">
<link rel="icon" type="image/png" sizes="32x32" href="${BASE}favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="${BASE}icon-192.png">
<link rel="apple-touch-icon" href="${BASE}apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Unicorn Learning Lab">
<meta property="og:image" content="${BASE}share.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Plus+Jakarta+Sans:wght@400..700&display=swap" rel="stylesheet">
<script>document.documentElement.classList.add('js-motion')</script>`

function siteHead(siteUrl) {
  const base = siteUrl ? siteUrl.replace(/\/+$/, '') : ''
  return {
    name: 'unicorn-site-head',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        let out = html.replace('<!--shared-head-->', SHARED_HEAD)
        const page = Object.values(PAGES).find((p) => ctx.path === `/${p.file}`)
        if (base && page?.path) {
          const url = base + page.path
          out = out.replace('</head>', `<link rel="canonical" href="${url}">\n<meta property="og:url" content="${url}">\n</head>`)
          out = out.replace(`content="${BASE}share.jpg"`, `content="${base}/share.jpg"`)
        }
        return out
      },
    },
    generateBundle() {
      const sitemapLine = base ? `\nSitemap: ${base}/sitemap.xml` : ''
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /${sitemapLine}\n` })
      if (!base) return
      const urls = Object.values(PAGES)
        .filter((p) => p.path && p.path !== '/credits/')
        .map((p) => `  <url><loc>${base}${p.path}</loc></url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: BASE,
    plugins: [react(), siteHead(env.SITE_URL || process.env.SITE_URL)],
    build: {
      rollupOptions: {
        input: Object.fromEntries(Object.entries(PAGES).map(([k, p]) => [k, resolve(import.meta.dirname, p.file)])),
      },
    },
  }
})
