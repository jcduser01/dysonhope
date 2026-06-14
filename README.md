# Dyson Hope — Official Website

Website for Dyson Hope, electronic music producer and DJ based in Austin, Texas. Founder and label boss of [SIGIL.ZERO Records](https://sigilzero.com).

**Live site:** [dysonhope.com](https://dysonhope.com)

---

## About Dyson Hope

Dyson Hope got his start as an FM radio DJ at WRCT 88.3 FM Pittsburgh before moving into the underground rave scene in Los Angeles in the late '90s, where he spun drum & bass and wrote original records. After years of international bookings and a nomadic stretch through London, Berlin, Barcelona, Istanbul, and elsewhere, he settled in Austin, Texas. Today he produces genre-defying electronic music spanning tech house, progressive house, techno, and beyond — music built for dark rooms and dancefloors.

In 2026 he founded **SIGIL.ZERO Records**, an underground electronic imprint with a ruthless focus on quality, longevity, and DJ-first releases.

---

## Discography (Selected)

| Year | Title | Notes |
| ---- | ----- | ----- |
| 2026 | Drums in the Deep | Bass-heavy tech house |
| 2026 | Afterphase | Stripped-down progressive tech house |
| 2026 | Bounce Ritual | Swinging body-first groove |
| 2026 | Edge of the Night | Peak-time progressive tech house anthem |
| 2026 | Got a Body | Dark, hypnotic tech house |
| 2025 | Need More Drugs | Breakbeat collab with NOTOTO |
| 2023 | Get Up and Go | Second album — all house music |
| 2022 | At Your Own Risk | Debut album, released Winter Solstice 2022 |

---

## Listen

| Platform | Link |
| -------- | ---- |
| Spotify | [Open](https://open.spotify.com/artist/61OXIOIVIfdZtFBZG4cY4J) |
| Beatport | [Open](https://www.beatport.com/artist/dyson-hope/2262866) |
| SoundCloud | [Open](https://soundcloud.com/dyson-hope) |
| YouTube | [Open](https://www.youtube.com/@DysonHope) |
| Apple Music | [Open](https://music.apple.com/us/artist/dyson-hope/1658448375) |
| Amazon Music | [Open](https://music.amazon.com/artists/B0BP9TJ341/dyson-hope) |
| Bandcamp | [Open](https://dysonhope.bandcamp.com/) |

---

## Connect

- **Booking:** [booking@dysonhope.com](mailto:booking@dysonhope.com)
- **Production / collaboration:** [studio@dysonhope.com](mailto:studio@dysonhope.com)
- **General:** [info@dysonhope.com](mailto:info@dysonhope.com)
- **Facebook:** [DysonHopeMusic](https://facebook.com/DysonHopeMusic)
- **Instagram:** [DysonHopeMusic](https://instagram.com/DysonHopeMusic)
- **Label:** [sigilzero.com](https://sigilzero.com)

---

## Tech Stack

The site is a hand-built static site — no framework, no JavaScript libraries, and no build step.

- **HTML5** — three standalone pages, no templating.
- **CSS** — a single hand-written design system in `assets/css/dysonhope.css` (CSS custom properties for color, type, spacing, and motion), supplemented by small page-specific `<style>` blocks inlined in each page's `<head>`.
- **Typography** — Google Fonts: [Archivo](https://fonts.google.com/specimen/Archivo) (display), [Inter](https://fonts.google.com/specimen/Inter) (body), and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (labels/meta).
- **Icons** — [Font Awesome](https://fontawesome.com) (webfont via `css/all.css`). The brand mark and wordmark are inline SVG.
- **Media** — a looping MP4 video hero (`assets/video/hero-loop.mp4`) with a static poster image fallback; a Spotify embed player on the homepage.
- **Analytics** — [Google Tag Manager](https://tagmanager.google.com) (container `GTM-5T87PLM6`). Interactive elements carry declarative `data-track` / `data-*` attributes (see [Analytics](#analytics)).

There is **no** Bootstrap, jQuery, carousel/lightbox/scroll-animation library, SCSS toolchain, or server-side code. Earlier versions of this site shipped a purchased HTML template with that stack; it has been fully removed.

### Repository layout

```
.
├── index.html              # homepage
├── calendar/index.html     # booking-calendar interstitial (redirect)
├── links/index.html        # link-in-bio hub
├── CNAME                    # custom domain (dysonhope.com)
└── assets/
    ├── css/dysonhope.css    # the design system (only stylesheet)
    ├── images/              # covers, favicon, hero poster, textures
    ├── video/hero-loop.mp4  # homepage hero loop
    ├── svg/                 # brand logo source files
    ├── press/               # press kit (logos, photo, zip)
    └── plugins/font-awesome # icon webfont (css/ + webfonts/)
```

---

## Development

No build step is required. Edit the HTML/CSS directly.

- **View locally:** open `index.html` in a browser, or serve the folder from any static server, e.g.:

  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

  A static server (rather than `file://`) is recommended so that relative links between `/`, `/links/`, and `/calendar/` resolve the way they do in production.

- **Deploy:** the site is served via GitHub Pages on the custom domain in `CNAME` (`dysonhope.com`). Pushing to the default branch publishes it; there is nothing to compile.

### Site pages and features

- **`index.html`** — main artist page: video hero, statement bar, **Listen** (platform links + Spotify embed), **Works** (release grid), about/interlude, **Contact** (mailto CTAs), and a social/connections footer. Single-page anchor nav (`#home`, `#listen`, `#works`, `#contact`).
- **`links/index.html`** — "link in bio" hub with featured releases (per-platform outbound links) and streaming/social tiles. Self-contained inline styling on top of the shared design system.
- **`calendar/index.html`** — a branded interstitial that auto-redirects (3s `meta refresh` + JS fallback) to the Google Appointments booking calendar. It is intentionally unlisted (the homepage nav link is commented out) and reached as a direct/shared link.

### Contact and booking flow

All contact is handled via `mailto:` links — there is no form or backend.

- **Booking** requests → `booking@dysonhope.com`
- **Production / collaboration** requests → `studio@dysonhope.com`
- **General** contact (links hub) → `info@dysonhope.com`

---

## Analytics

Page analytics run through **Google Tag Manager** (container `GTM-5T87PLM6`), loaded on all three pages with the standard `<noscript>` fallback. GTM is the only third-party script embedded in the site.

To support event mapping in the tag manager, interactive elements (CTAs, platform/store links, social links, release/mix items) carry declarative data attributes that describe the interaction:

- `data-track="true"` — marks an element for click tracking
- `data-entity`, `data-action`, `data-target` — the event taxonomy
- `data-platform`, `data-page-type` — context
- `data-release-title`, `data-mix-title`, `data-cta-type` — payload detail

These attributes are consumed by GTM; no first-party tracking script is checked into the repo.

---

## License

&copy; Dyson Hope. All rights reserved.  
Made with ♥ in Austin, Texas.
