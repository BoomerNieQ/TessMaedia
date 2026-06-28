# TessMaedia — Starter Pakket · Website Generator Prompt

Gebruik dit prompt om een nieuwe Starter-website te genereren voor een klant.
Vul de `[PLACEHOLDERS]` in met de klantgegevens vóór je het prompt indient.

---

## Prompt (kopieer alles hieronder)

```
Build a complete, production-ready single-page website for [BEDRIJFSNAAM].

## Client brief
- **Business name:** [BEDRIJFSNAAM]
- **Type of business:** [OMSCHRIJVING — bijv. "kapper in Maastricht", "personal trainer in Amsterdam"]
- **Primary language:** [NL / EN]
- **Brand colors:** primary [HEX], accent [HEX], background [HEX / "dark" / "light"]
- **Key message / tagline:** [KERNBOODSCHAP — bijv. "Jouw haar, jouw stijl."]
- **Contact:** WhatsApp [NUMMER], email [EMAIL], address [ADRES] (optional)
- **Social:** Instagram [HANDLE] (optional), Facebook [URL] (optional)
- **Logo file:** [BESTANDSNAAM of "not yet available"]
- **Photos available:** [YES / NO — if yes, list files or describe subjects]

## Tech stack
- Plain HTML5 + CSS3 + vanilla JavaScript (no framework, no build step)
- Tailwind CSS via CDN for utility classes
- Google Fonts via `<link>` tag
- All assets in `/public/images/`

## Page structure — exactly 4 sections
1. **Hero** — full-viewport, headline + tagline + single CTA button that links to #contact
2. **Over ons / Diensten** — 2–3 service cards with icon, title, short description
3. **Over mij** — short personal intro paragraph + optional portrait photo
4. **Contact** — WhatsApp button (wa.me/[NUMMER]), email link, optional address, optional map embed

## Design requirements
- Mobile-first, fully responsive (breakpoints: 640px, 1024px)
- Sticky header/nav with smooth scroll to anchors
- Subtle scroll-reveal animation on section entrance (IntersectionObserver, no GSAP)
- Hero background: full-bleed photo or gradient using brand colors
- Clean, professional typography — one display font (headings) + one sans-serif (body)
- No heavy libraries, no jQuery

## SEO (must-have)
- `<title>` tag: "[BEDRIJFSNAAM] — [TAGLINE KORT]"
- `<meta name="description">` max 155 characters
- `<meta property="og:title">`, `og:description`, `og:image` (placeholder path)
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- All images: meaningful `alt` attributes
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`

## WhatsApp CTA
- Sticky floating WhatsApp button (bottom-right, always visible on mobile)
- Primary CTA in hero also links to wa.me/[NUMMER]
- Use this format: `https://wa.me/[NUMMER]?text=Hallo%2C%20ik%20wil%20graag%20meer%20informatie.`

## Quality bar (TessMaedia standard)
- No Lorem Ipsum — write real placeholder copy based on the business type
- Pixel-perfect spacing — consistent 8px grid
- All interactive elements have `:hover` and `:focus-visible` states
- Lighthouse score target: Performance ≥ 90, Accessibility = 100, Best Practices ≥ 90, SEO = 100
- No console errors on load
- Images lazy-loaded (`loading="lazy"`)

## Deliverable
Output a single `index.html` file with all CSS in a `<style>` block and all JS in a `<script>` block at the bottom. No external files except CDN links.
```

---

## Notities voor gebruik
- Dit is een **one-pager** — geen aparte pagina's, alleen anchor-navigatie.
- Als de klant geen foto's heeft: gebruik CSS-gradients of SVG-illustraties als placeholder.
- Als er meer dan 4 secties nodig zijn → upgrade naar **Standaard pakket**.
- Genereer altijd eerst een preview en bespreek met de klant vóór je live gaat.
