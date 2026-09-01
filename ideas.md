# Portfolio Ideas

A running backlog for the site. The aesthetic is now deliberately plain: bone
paper, the two spot inks from the business card, hairline rules, hanging section
labels, and no decoration. Ideas have to survive that constraint. If an idea
needs animation, chrome, or a second colour system, it does not fit.

Status key: ✅ shipped · 🔭 open · ❌ dropped

---

## Shipped

| Idea | Notes |
|------|-------|
| **Plain redesign** | One column, hanging section labels, hairline rules, no decoration |
| **Static markup** | `CONFIG`/`TOOLKIT` gone; content is written in the HTML |
| **Self-hosted fonts** | Jost + Archivo variable woff2 in `fonts/`, no Google Fonts request |
| **Ruled ledgers** | Experience, education, and coursework as ruled rows, not cards |
| **Metrics in the second ink** | Résumé numbers set in maroon so a scan lands on results |
| **Toolkit as plain groups** | Where-used context dropped in favour of the résumé's own groups |
| **Résumé link** | Straight to `Samin_Qureshi.pdf`, no modal viewer |
| **Era switch** | Five skins (1996 / 2006 / 2016 / 2026 / 2036) from one CSS-only radio group, no JS |
| **Portrait toggle** | Hidden checkbox, framed per era, served from `img/` at 320w and 480w |

---

## Open

| Idea | Description | Effort |
|------|-------------|--------|
| **Devlog / notes section** | Short "today I learned" entries. Fits the journal framing better than it fit the old site. | Medium |
| **RSS feed** | Only worth it if the devlog happens. | Low |
| **Dynamic OG images** | Social cards set in the same editorial type rather than generic text. | Medium |
| **Real GitHub activity** | The `/api/github` endpoint still exists — could return as a small "recently" line in the colophon rather than a full feed. | Medium |
| **Now-playing line** | Same idea: `/api/spotify` is still deployed. Would suit a single quiet line in the colophon. | Low |
| **Print stylesheet** | The site is already set like print — an actual `@media print` pass would be a nice touch. | Low |
| **Case-study pages** | One deeper page per project (CoreX search internals, Serenity+ data model) instead of a card blurb. | High |
| **Command palette** | ⌘K to jump between sections. Useful, but must not reintroduce the old keyboard-shortcut clutter. | Medium |

---

## Dropped

Kept here so the reasoning isn't lost — not a to-do list. **Don't reintroduce
these.**

*From the brutalist/terminal version:* ❌ matrix rain · scanline toggle · cursor
trail · radar scan · dynamic grid · glitch hover · CRT noise · boot sequence ·
fake connection status bar · visitor counter · geolocation greeting · compile
animation · konami code · terminal secret commands · chess puzzle · typing test ·
quote of the day · changelog section · hardware specs · "steal this" callout ·
animated skill bars · global keyboard shortcuts · ASCII banner · dynamic favicon

*From the interim scrapbook version:* ❌ tape strips · pushpins · tilted cards ·
paper grain overlay · terminal console appendix · periodic-table skill tiles ·
monospace labels · reading-progress hairline · Ctrl-drag highlighter · toasts

*Sections removed:* Capstone (LMNL), Games, Meta, Sole Proprietorship.

*From the Bauhaus version:* ❌ flooded colour bands · shape rails · folio numbers ·
the flippable calling card intro · dark mode · scroll reveals · the résumé modal ·
the drop cap · dotted leaders · the Dean's List citation block.

*Content removed:* the Co-Founder & CTO role (no longer true), Courier, Roster,
and Brutal Weather (not on the résumé), and all self-assessed skill levels.

---

## Notes

- Plain mode does not animate. 1996 mode does, and both respect `prefers-reduced-motion`
- Content is written in the markup; there is no `CONFIG` object any more
- The résumé is the source of truth; ask before inventing any biographical claim
- The `functions/` endpoints are deployed but currently unused; see SETUP.md
- New motion should be *quiet*. Recruiters skim; nothing should slow that down.

---

## Version history

### v4.3.0 (2026-08-31) · "Portrait"
- Optional portrait in the masthead behind a CSS-only checkbox
- Framed per era: beveled plate, glossy card with reflection, Material avatar,
  hairline rectangle, soft-lit panel
- Resized out of the 9.7MB headshot into `img/` at 320w (35KB) and 480w (76KB)

### v4.2.0 (2026-08-31) · "Eras"
- Three more skins: 2006 Web 2.0, 2016 flat/Material, 2036 ambient
- The checkbox became a radio group, so arrow keys move between eras
- Each era gets its own typeface and its own switcher drawn in that idiom
- Every palette checked against its own ground; nothing below 4.5:1

### v4.1.0 (2026-08-31) · "1996 Mode"
- CSS-only alternate skin: hidden checkbox plus `body:has(#funky:checked)`
- Marquee, under-construction sign, LED visitor counter, webring, Win95 button
- Cycling bright inks on navy so it shouts and still clears 11:1
- Plain mode untouched; the 1996 furniture is `aria-hidden` and stops on
  `prefers-reduced-motion`

### v4.0.0 (2026-08-31) · "Plain"
- Rebuilt as static markup: no `CONFIG`, no renderers, no reveal code
- One column with hanging section labels; every band, rail, and folio removed
- Calling card intro cut; the page opens on the name
- Jost and Archivo self-hosted; the Google Fonts request is gone
- Content rebuilt from `Samin_Qureshi.pdf`; JS is the contact form only

### v3.0.0 (2026-07-28) — "The Broadsheet"
- Rebuilt as a single 1,500-line file; Tailwind and the manuscript theme removed
- Printed-broadsheet design language — rules and type instead of cards
- Removed the Capstone, Games, Meta, and Sole Proprietorship sections
- Removed the terminal/CRT layer and, in a second pass, every scrapbook motif
- Content rebuilt from the current résumé; stale claims removed
- Calling card restyled to match; full light/dark parity, AA-checked labels

### v2.0.0 (2026-01-30) — "The Everything Update"
- 40+ interactive features, CRT visual overhaul, games section, boot sequence,
  periodic table of skills, konami code

### v1.5.0 (2025-12-15)
- Interactive terminal, dark mode, responsive layout

### v1.0.0 (2025-09-01)
- Initial release
