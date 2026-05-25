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

- **Email:** [info@dysonhope.com](mailto:info@dysonhope.com)
- **Facebook:** [DysonHopeMusic](https://facebook.com/DysonHopeMusic)
- **Instagram:** [DysonHopeMusic](https://instagram.com/DysonHopeMusic)
- **Label:** [sigilzero.com](https://sigilzero.com)

---

## Tech Stack

- HTML5 / CSS3 / JavaScript
- [Bootstrap 5](https://getbootstrap.com)
- [jQuery](https://jquery.com)
- [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/)
- [Magnific Popup](https://dimsemenov.com/plugins/magnific-popup/)
- [SAL (Scroll Animation Library)](https://mciastek.github.io/sal/)
- [Font Awesome](https://fontawesome.com)
- [Bootstrap Icons](https://icons.getbootstrap.com)
- Custom SCSS theme

---

## Development

The site is a static HTML/CSS/JS website. No build step is required to view the site — open `index.html` directly in a browser or serve from any static host.

To compile SCSS:

```bash
sass assets/css/scss/theme.scss assets/css/theme.css
```

### Site Pages and Features

- `index.html`: Main artist site with hero, platform links, timeline, booking/contact CTAs, and footer social links.
- `links/index.html`: Link hub page with release-level outbound links and mixtape links.
- `calendar/index.html`: Redirect landing page for studio session booking (meta-refresh + fallback link).
- Persistent Spotify embed player bar on the homepage (`#spotify-player`).

### Contact and Booking Flow

- Booking requests route to `booking@dysonhope.com` mailto CTAs.
- Studio/collaboration requests route to `studio@dysonhope.com` mailto CTAs.
- General contact appears as `info@dysonhope.com` on the links hub.

---

## Tracking Instrumentation (May 2026)

This site now includes first-party tracking instrumentation for outbound links, CTAs, page/section views, and embedded player engagement intent.

Important:

- No Google Analytics, GTM, Meta Pixel, or other third-party trackers are embedded in site code.
- Events are pushed to `window.dataLayer` only.

### Files Added/Updated

- Added `assets/js/tracking.js`
- Updated `index.html`
- Updated `links/index.html`

### Event Contract

All tracking events are normalized to:

```js
{
  event: "dysonhope_event",
  entity: "...",
  action: "...",
  target: "...",
  platform: "...",
  page_type: "...",
  link_url: "...",
  link_text: "...",
  release_title: "...",
  mix_title: "...",
  cta_type: "..."
}
```

Undefined, null, and empty-string values are removed before push.

### Debug Mode

Use query param `?debug_tracking=true` on any page, for example:

- `index.html?debug_tracking=true`
- `links/index.html?debug_tracking=true`

When enabled, tracking logs clear event output in the browser console.

### Declarative Tracking Attributes

Tracked elements use HTML data attributes, including:

- `data-track="true"`
- `data-entity`
- `data-action`
- `data-target`
- `data-platform`
- `data-page-type`
- `data-release-title`
- `data-mix-title`
- `data-cta-type`

Embed interaction containers use:

- `data-embed-track="true"`

### Implemented Tracking

- Page view: `site/view/home`
- Page view: `site/view/links`
- Section view: `site/view/timeline` (IntersectionObserver, once per page load)
- CTA clicks: booking, studio_work, email
- Platform/store clicks: spotify, apple_music, youtube_music, soundcloud, beatport, bandcamp
- Social clicks: instagram
- Spotify embed engagement intent: `release/play/spotify_embed` (once per player per page load)

### SoundCloud Embed Status

SoundCloud embed interaction tracking (`mix/play/soundcloud_embed`) is supported by the tracking utility, but there are currently no SoundCloud iframe embeds in the checked-in HTML. The event will fire once a SoundCloud embed container is added with `data-embed-track="true"` and corresponding `data-*` metadata.

### Privacy and Safety Guardrails

- Tracking does not block navigation.
- Tracking does not delay outbound clicks.
- Tracking gracefully no-ops if `window.dataLayer` is unavailable.
- URL sanitization strips query/hash and excludes `mailto:`, `tel:`, `sms:`, and `javascript:` URLs from `link_url`.
- Text sanitization drops values that look like emails or phone numbers.
- `link_text` prefers visible text and falls back to `aria-label`, `title`, or image `alt` for icon/image links.

### Notes

- Embed interaction events are engagement-intent proxies and do not guarantee media playback.

---

## Changelog

### 2026-05-25

- Added first-party tracking utility in `assets/js/tracking.js`.
- Added declarative tracking attributes across homepage and links hub for CTA, platform, store, social, release, and mix interactions.
- Added delegated click tracking for all `data-track="true"` elements.
- Added page-view tracking for home and links pages.
- Added timeline section view tracking with IntersectionObserver and once-per-load behavior.
- Added Spotify embed engagement-intent tracking (`release/play/spotify_embed`) with once-per-player behavior.
- Added SoundCloud embed tracking support in utility (`mix/play/soundcloud_embed`) for future embed containers.
- Added payload sanitization and privacy guardrails for event fields.
- Added debug mode via `?debug_tracking=true`.
- Updated README to document site pages/features, contact flow, tracking model, and QA outcomes.

---

## License

&copy; Dyson Hope. All rights reserved.  
Made with ♥ in Austin, Texas.
