# Unicorn Learning Lab website

The public website for Unicorn Learning Lab: *Don't Just Learn. Create.*

React 19 + Vite, JavaScript, frontend only. No backend, database or accounts.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the build at http://localhost:4173
npm run lint
```

## How it is built

**A multi-page site, not a single-page app.** Each page is its own HTML file:

| Page | HTML entry | React page |
| --- | --- | --- |
| Home | `index.html` | `src/pages/Home.jsx` |
| About | `about/index.html` | `src/pages/About.jsx` |
| Our approach | `our-approach/index.html` | `src/pages/OurApproach.jsx` |
| What we do | `what-we-do/index.html` | `src/pages/WhatWeDo.jsx` |
| Contact | `contact/index.html` | `src/pages/Contact.jsx` |
| Photograph credits | `credits/index.html` | `src/pages/Credits.jsx` |
| Not found | `404.html` | `src/pages/NotFound.jsx` |

So every page ships its own title, description and share tags as plain HTML that search engines and link previews read
without running JavaScript. A refresh or a direct link always finds a real file on static hosting, so no SPA fallback is
needed. React renders each page body. The shared header and footer are in `src/components`, and each page's entry in
`src/entries` passes its closing line to the footer.

```text
index.html, about/, our-approach/, what-we-do/, contact/, credits/, 404.html   page shells (title, meta)
vite.config.js        page list, shared <head>, optional canonical URLs + sitemap
src/
  entries/            one tiny entry per page
  mount.jsx           renders a page inside the shared layout
  components/         Header, Footer, Hero, Photo, Brand (logo), ContactForm, Layout
  pages/              the page bodies
  data/site.js        contact email, form endpoint, social links, navigation  <- edit here
  data/content.js     copy shared between pages (principles, skills, offerings, audiences)
  data/photos.js      the photographs and their alt text
  data/credits.json   licence credits for the photographs
  styles/site.css     brand tokens (navy, blue, cyan, red; Newsreader + Hanken Grotesk) and page CSS
public/
  assets/logo/        the client's emblem, cropped from logo.jpeg (96 to 720 px, WebP)
  assets/img/         photographs (WebP, 500 to 1920 px)
  assets/kit/         the Taste Skill design system: grid, type scale, buttons, nav, motion, scroll moments
  favicon-32.png, icon-192.png, apple-touch-icon.png, share.jpg
```

The design system in `public/assets/kit` is plain CSS and JavaScript from the Taste Skill. It provides the mobile menu,
the hover and press layer, the hero entrance, and two scroll moments: a photograph that develops on the home and About
pages, and the photo chapters on Our approach. `Layout.jsx` starts it once React has rendered. Everything rests under
`prefers-reduced-motion`.

## Before going live: what the client must supply

1. **Contact email.** `src/data/site.js` → `CONTACT_EMAIL` is a stand-in on the reserved `.example` domain. Every "Email
   us" button opens it, so replace it with the real address. It is never printed on the page.
2. **Domain.** Set `SITE_URL` (see the deployment steps below) to switch on canonical tags, `og:url` and `sitemap.xml`.
3. **Photographs.** The eight photographs are licensed stand-ins from Wikimedia Commons, credited on `/credits/`. They
   show learning materials (a microscope, circuits, pencils, origami, a seedling, lab glass), not Unicorn Learning Lab
   sessions. Replace them with the lab's own photographs in `public/assets/img` and `src/data/photos.js`, then update
   `src/data/credits.json` (or remove the credits page and footer line once no third-party photos remain).
4. **Offerings detail.** What We Do describes five kinds of experience at a high level. Confirm them, and add programme
   names, age groups, formats or prices only when they are real.
5. **Social accounts and phone (optional).** Add real URLs to `SOCIAL_LINKS` in `src/data/site.js`. No phone number is
   shown, because none was supplied.
6. **Contact form (optional).** No form is shown, because a static site cannot send one. To add one, create an endpoint
   with a form service that accepts an HTML POST (Formspree, Basin, Web3Forms or a Cloudflare Pages Function) and put
   its URL in `FORM_ENDPOINT`. The Contact page then shows the form, and it reports "sent" only after the service
   answers.

## Deploying to Cloudflare Pages

### 1. Create a Git repository

```bash
cd unicorn-website
git init
git add .
git commit -m "Unicorn Learning Lab website"
```

### 2. Push it to GitHub

Create an empty repository on GitHub (no README or licence), then:

```bash
git branch -M main
git remote add origin https://github.com/<your-account>/unicorn-learning-lab.git
git push -u origin main
```

### 3. Connect the repository to Cloudflare Pages

In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**. Authorise GitHub and pick the
repository.

### 4. Configure the build

| Setting | Value |
| --- | --- |
| Framework preset | None (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `unicorn-website` if the repository holds the parent folder, else leave empty |
| Environment variable | `NODE_VERSION` = `22` (or newer) |
| Environment variable (once the domain is known) | `SITE_URL` = `https://www.your-domain` |

No redirects file is needed. Every page is a real HTML file, and Cloudflare Pages serves `404.html` for unknown paths
automatically.

### 5. Deploy

Click **Save and Deploy**. Every later push to `main` redeploys, and pull requests get preview URLs.

### 6. Connect a custom domain

In the Pages project, open **Custom domains → Set up a custom domain** and enter the domain. If its DNS is on Cloudflare,
the record is added for you. Otherwise add the CNAME record Cloudflare shows at your DNS provider. Then set `SITE_URL`
to that domain and redeploy, so the canonical tags and sitemap use it.

### 7. Verify HTTPS and the live site

- Wait for the domain to show **Active**; Cloudflare issues the certificate automatically.
- Open `https://` and `http://` versions: the second should redirect (enable **SSL/TLS → Edge Certificates → Always Use
  HTTPS** if it does not).
- Click through every page, refresh on an inner page (`/about/`), try a missing URL (should show the 404 page), and press
  an "Email us" button to confirm it opens the real address.
- Check `https://<domain>/robots.txt` and `https://<domain>/sitemap.xml`, and preview a shared link (for example with
  the LinkedIn Post Inspector) to see `share.jpg`.
