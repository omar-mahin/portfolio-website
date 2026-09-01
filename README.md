# portfolio-website

Personal portfolio for **Md Omar Faruque** — Senior Product Designer, Dhaka, Bangladesh.

**Live:** https://omarshowcase.netlify.app/

## Stack

Plain HTML, CSS, and JavaScript. No build step, no dependencies, no framework —
open `index.html` in a browser and it runs.

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, selected work, about, process, proof |
| `case-study.html` | Case study template, filled at runtime from `?work=` |
| `contact.html` | Contact form (opens the visitor's mail client) |
| `script.js` | Nav, scroll reveals, case-study content, form handler |
| `styles.css` | All styles, mobile-first, design tokens in `:root` |
| `og-image.png` | Social share card (1200x630) |

## Running it locally

Any static server works:

```bash
npx serve .
```

Then open http://localhost:3000.

## Adding a case study

Case-study content lives in the `caseStudies` object in `script.js`. Add a key,
then link to it from the work list in `index.html`:

```html
<a href="case-study.html?work=your-key">…</a>
```

`case-study.html` ships the Mimba entry as static fallback markup, which is what
crawlers and link previews see. Anything unrecognised in `?work=` falls back to it.

## Deployment

Netlify serves the repository root at https://omarshowcase.netlify.app/ — pushing to
`main` publishes.

Netlify's Pretty URLs are on, so pages are served without the `.html` extension
(`/contact`, `/case-study?work=mimba`). Internal links are rewritten at deploy
time; the canonical tags and `sitemap.xml` use the same extensionless form.
