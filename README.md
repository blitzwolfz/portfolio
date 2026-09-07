# Samin Qureshi · Portfolio

Personal site. Backend, systems, and iOS work, on one quiet page.

**[saminqureshi.dev](https://saminqureshi.dev)** · [Résumé](./Samin_Qureshi.pdf) · [GitHub](https://github.com/blitzwolfz) · [LinkedIn](https://linkedin.com/in/saminqureshi)

---

## Stack

There isn't one. The site is a single `index.html`: hand-written HTML and CSS,
plus about 30 lines of JavaScript that exist only to send the contact form.
No build step, no bundler, no framework, no CSS library. Open the file and it
runs.

Fonts are self-hosted from `fonts/`. The only third-party request on the page is
the EmailJS browser SDK, and the page works without it (the form falls back to a
message pointing at the email address).

| | |
|---|---|
| **Markup & styling** | HTML5 + hand-written CSS (custom properties, grid) |
| **Behaviour** | One vanilla JS handler for the contact form; the four alternate eras are pure CSS |
| **Type** | Jost (display) and Archivo (body), self-hosted variable woff2 |
| **Contact form** | EmailJS |
| **Serverless** | Cloudflare Pages Functions (see [SETUP.md](./SETUP.md)) |
| **Hosting** | Cloudflare Pages |

---

## Design

As simple as it can be while still getting the information across. One column,
hairline rules, a hanging label in the left margin for each section. No cards,
shadows, gradients, animation, or decorative chrome.

- **Palette.** The two spot inks from the printed business card and nothing
  else: British Racing Green `#004225`, Maroon `#6B2135`, bone stock `#F6F1E3`,
  with `#1A1712` type and `#8A8275` for secondary text. See
  `SQ-Business-Card-Spec.pdf`, which is the authority for the brand.
- **Type.** Jost sets the name, the section labels, and entry titles. Archivo
  sets everything else, because Archivo is the typeface on the card. No
  monospace.
- **The one flourish.** Metrics carried over from the résumé (`50%`, `100+`,
  `150+`) are set in the maroon ink so a recruiter scanning the page lands on
  the results. That is the only place the second ink appears in the body.
- **No dark mode.** The palette stays exactly as printed.

**Deliberately avoided:** purple, tape strips, pushpins, tilted cards, noise
grain, terminal panels, monospace labels, and scroll reveals. All are either
overused elsewhere or lineage from earlier versions of this site.

---

## Eras

The footer carries a five-way era switch. The same résumé, redrawn in the design
language of a different year.

| Era | Look | Type | Switcher |
|---|---|---|---|
| **1996** | Geocities: navy panel on a tiled starfield, rainbow name, marquee, under-construction sign, LED visitor counter, webring | Impact + Comic Sans | Win95 buttons in a beveled tray, top right |
| **2006** | Web 2.0: white card on sky, gel pills, letterpress, rounded corners, a reflection under the name, a BETA ribbon, a "Digg this" row | Trebuchet MS + Lucida Grande | Glossy gel pills in a rounded tray, top right |
| **2016** | Flat: a light centred hero, ghost buttons, a stat strip, Material cards and elevation | The system font stack, headings at weight 200 | A flat elevated bar, pinned bottom centre |
| **2026** | The real site. One column, hanging labels, hairline rules | Jost + Archivo | Plain text links in the footer |
| **2036** | Ambient: no boxes and no chrome, type floating on a dark aurora field, and the section label sticks in the margin while you read it | Jost only, light weights, wide tracking | A glass capsule, pinned bottom centre |

It is all CSS. One visually hidden radio group drives it and every rule is
scoped under `body:has(#eYYYY:checked)`, so the 2026 page is untouched by any of
it. Arrow keys move between eras because they are real radios. Nothing is
persisted, so a reload returns to 2026.

The masthead carries a **portrait toggle** on the same principle: a hidden
checkbox, `body:has(#portrait:checked)`, and a frame styled per era. A beveled
plate with an "arrow THAT'S ME" caption in 1996, a rounded card with a
reflection in 2006, a circular Material avatar above the name in 2016, a plain
hairline rectangle in 2026, and a soft-lit rounded panel in 2036.

The photo is served from `img/` at 320w and 480w, not from the 9.7MB
`headshot.png`. The widest it is ever drawn is 240px, so those two cover 1x and
2x, at 35KB and 76KB. It carries `loading="lazy"`, but note that Chrome fetches
it on page load anyway even though the figure is `display:none`, so treat the
lazy hint as a best effort rather than a guarantee.

Each skin picks a ground colour first and then a palette that clears 4.5:1 on
it, so the pastiche never costs legibility: 1996 puts white, yellow, cyan, and
lime on `#000080` at 11:1 and up; 2006 uses `#1B6BB0` on white at 5.6:1; 2016
uses indigo at 6.9:1 and teal at 5.3:1; 2036 runs cyan at 11.8:1 and violet at
9.4:1 on `#07090C`.

Era-only furniture carries `.f90` / `.f06` / `.f16` / `.f26` / `.f36`, is hidden
by default, and is `aria-hidden`, so a screen reader gets the same page in every
era. The marquee and the blinking text stop under `prefers-reduced-motion`.

---

## Sections

| | |
|---|---|
| Masthead | Name, what I do, two short paragraphs, four links, and the portrait toggle |
| Experience | Five roles with the résumé bullets |
| Projects | doodle-run, CoreX and Serenity+ |
| Education | Guelph and George Brown |
| Coursework | Five projects, one line each |
| Skills | Six groups, straight from the résumé |
| Contact | Direct links plus the form |
| Footer | Colophon and the era switch |

---

## Editing content

Content is written directly in the markup. There is no `CONFIG` object any more,
and nothing is rendered by JavaScript, so what you read in `index.html` is what
ships.

`Samin_Qureshi.pdf` is the source of truth. If the site and the PDF disagree,
the PDF wins. Anything not in the PDF and not inferable from it should be
checked before it goes on the page.

To change how it looks, start with the custom properties on `:root`. The
palette, the two type stacks, and the section gap are all there.

---

## Structure

```
├── index.html               # the entire site
├── Samin_Qureshi.pdf        # résumé, source of truth for content
├── fonts/                   # self-hosted Jost + Archivo (latin, latin-ext)
├── img/                     # portrait at 320w and 480w, generated from headshot.png
├── SQ-Business-Card-Spec.pdf    # brand authority: inks and typeface
├── Business Card - SQ-selection.png
├── headshot.png             # 2316x3088 original, the source for img/
├── functions/
│   └── api/
│       ├── github.js        # GitHub activity endpoint
│       └── spotify.js       # Last.fm now-playing endpoint
├── SETUP.md                 # Cloudflare Functions setup
├── ideas.md                 # idea backlog
└── README.md
```

> The `functions/` endpoints are deployed but not consumed by the site. They are
> kept for a future activity or now-playing line, see [SETUP.md](./SETUP.md).

---

## Running it

```bash
# serve it, so the self-hosted fonts load
python3 -m http.server 4321

# or with the Functions running too
npx wrangler pages dev .
```

Opening `index.html` directly works, but some browsers block `file://` font
loads, so the type falls back to Helvetica.

---

## Accessibility & performance

- One CSS file inline, four woff2 files, no framework payload
- `prefers-reduced-motion` disables the hover transitions, the marquee, and the blinking
- Keyboard navigable, with a skip link, visible focus rings, and labelled fields
- Nothing on the page depends on JavaScript except the form

---

## Licence

Code is free to learn from. Please don't redeploy the content: the writing,
résumé, and photography are mine.


## doodle, doodle-run and doodle-golf product pages

The games sit under one hub. `/doodle/` is the contents page of the notebook
both books live on: a wordmark, a lead line and two entries that link to
`/doodle-run/` and `/doodle-golf/`. Each game route has its own support and
privacy page below it. The site spells both names hyphenated and lower case,
`doodle-run` and `doodle-golf`, everywhere it shows them.

The paper is built from the games' own `DesignSystem.swift`: the same palette
(paper, shade, desk, biro, pencil, teacher red, highlighter), the same 34px
rule spacing, and the same two hands, a felt marker for titles and a neat hand
for reading. The marker and hand are loaded with `local()` and fall back to the
self-hosted Jost in `fonts/` off Apple platforms. Section labels are written
down the margin in the marking pen, headings are underlined with a hand-drawn
SVG stroke that inks in when it scrolls into view, screenshots are taped to the
page, and every route ends on a torn edge with the desk showing through.

Each page has its own standalone stylesheet: `doodle/doodle.css`,
`doodle-run/doodle-run.css` and `doodle-golf/doodle-golf.css`. They share a
common core by copy, not by import, so a route can be lifted out whole. The
only JavaScript is about a dozen lines per page that add a class when a stroke
scrolls into view; without it the strokes are simply drawn already, and
`prefers-reduced-motion` turns the animation off. No framework and no build
step.

Optimized WebP images, the 60 FPS trailer and English captions live in
`img/doodle-run/`; the iPhone and Mac previews live in `img/doodle-golf/`. The
trailer is about 11.8 MB, has a poster and native controls, and loads on
demand.

Serve the project from its root with `python3 -m http.server 8765 --bind
127.0.0.1`, then open `http://127.0.0.1:8765/doodle/`. Do not use a file URL
for the product pages, because asset paths are relative to the site root.

The App Store link is not yet known. Replace the `#app-store` coming-soon text
with the verified listing link when available. Review the privacy page against
the signed release build and publish all routes before entering their URLs in
App Store Connect.

For doodle-golf, use `/doodle-golf/` as the marketing URL,
`/doodle-golf/support/` as the support URL, and `/doodle-golf/privacy/` as the
privacy policy URL. The app's privacy answers still need to be published in App
Store Connect for the iOS and macOS platforms.
