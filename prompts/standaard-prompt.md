# TessMaedia — Standaard Pakket · Website Generator Prompt

Gebruik dit prompt om een nieuwe Standaard-website te genereren voor een klant.
Vul de `[PLACEHOLDERS]` in met de klantgegevens vóór je het prompt indient.

Referentieprojecten: mindaway.be (massage therapeute) · performrelax.nl (personal trainer)

---

## Prompt (kopieer alles hieronder)

```
Build a complete, production-ready website for [BEDRIJFSNAAM] using Next.js 14+ with the App Router.

## Client brief
- **Business name:** [BEDRIJFSNAAM]
- **Type of business:** [OMSCHRIJVING — bijv. "massagepraktijk in Hasselt", "huidtherapeut in Rotterdam"]
- **Primary language:** [NL / EN]
- **Brand colors:** primary [HEX], accent [HEX], background [HEX], text [HEX]
- **Tagline / headline:** [KERNBOODSCHAP — bijv. "Rust. Herstel. Balans."]
- **Contact:** WhatsApp [NUMMER], email [EMAIL], address [VOLLEDIG ADRES]
- **Social media:** Instagram [HANDLE], Facebook [URL] (omit if not applicable)
- **Logo file:** [BESTANDSNAAM of "not yet available — use text logo"]
- **Gallery photos:** [LIST FILENAMES of studio/work photos, or "not yet available"]
- **Services offered:** [LIJST VAN 3–5 DIENSTEN met korte omschrijving en prijs indien bekend]
- **Pricing structure:** [OMSCHRIJF TARIEVEN — bijv. "60 min €65, 90 min €90, pakket 5x €280"]
- **Testimonials available:** [YES — provide 3 quotes with first name / NO]
- **Booking method:** [WhatsApp / online booking URL / contact form]
- **Special requirements:** [bijv. "gift vouchers", "FAQ over veelgestelde vragen", "op locatie sectie"]

## Tech stack
- **Framework:** Next.js 14+ with App Router (`src/app/` structure)
- **Styling:** Tailwind CSS v3 with custom theme tokens in `tailwind.config.ts`
- **Language:** TypeScript (strict mode)
- **Fonts:** Next.js `next/font` with Google Fonts (one display font + one sans-serif)
- **Images:** Next.js `<Image>` component for all photos
- **Animations:** CSS transitions + IntersectionObserver for scroll-reveal (no external animation library unless natural fit)
- **Icons:** Inline SVG or lucide-react

## Project structure
```
src/
  app/
    layout.tsx       ← global metadata, fonts, body wrapper
    page.tsx         ← all sections as components in one file
    globals.css      ← Tailwind directives + custom CSS vars
  public/
    images/          ← all client photos
```

## Sections (in order) — implement as named anchor sections
1. **Hero** (`id="top"`) — Full-viewport. Headline, tagline, 2 CTAs (primary: booking/intake, secondary: scroll to services). Background: brand color gradient or full-bleed photo with overlay.
2. **Diensten** (`id="diensten"`) — ServiceCard grid. Each card: icon + title + short description. 3–5 services.
3. **Werkwijze / Methode** (`id="methode"`) — numbered steps (3–4 steps) explaining the process from first contact to result.
4. **Impressie / Galerij** (`id="impressie"`) — responsive image grid (2–3 columns, masonry-style or uniform tiles). Studio/work atmosphere photos.
5. **Tarieven** (`id="tarieven"`) — PriceCard components. Each card: name, price, duration/description, CTA button. Include a note about booking method.
6. **Reviews** (`id="reviews"`) — 3 testimonial cards with name and quote. If no real testimonials: omit section or use placeholder with note.
7. **FAQ** (`id="faq"`) — accordion-style, 5–8 frequently asked questions relevant to the business type. Implement without JS library (CSS `:details` or minimal JS toggle).
8. **Intake / Contact** (`id="intake"`) — contact section with: WhatsApp CTA button, email link, address, and optionally a simple HTML form (name, email, message, submit button — no backend needed, use mailto: or note "connect to backend").
9. **Footer** — logo/name, quick nav links, social icons, copyright line.

## Navigation
- Sticky top nav with business name/logo on left, anchor links on right
- Mobile: hamburger menu with slide-in drawer
- Smooth scroll behavior (`scroll-behavior: smooth` on `html`)
- Active section highlighting (IntersectionObserver on nav links)
- "Boek nu" CTA button always visible in nav (links to #intake)

## SEO — must-have (TessMaedia standard)
- `metadata` export in `layout.tsx`:
  - `title`, `description` (max 155 chars)
  - `openGraph`: title, description, url, image (og-image.jpg placeholder)
  - `twitter`: card, title, description
  - `canonical` URL
- Schema.org `LocalBusiness` JSON-LD in `layout.tsx`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "[BEDRIJFSNAAM]",
    "description": "...",
    "url": "https://[DOMEIN]",
    "telephone": "[NUMMER]",
    "address": { "@type": "PostalAddress", "streetAddress": "...", "addressLocality": "...", "addressCountry": "BE/NL" },
    "sameAs": ["[INSTAGRAM URL]", "[FACEBOOK URL]"]
  }
  ```
- All `<Image>` components: descriptive `alt` text
- Semantic HTML: `<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`
- `<h1>` only once (in Hero), `<h2>` for each section heading

## Accessibility — Lighthouse 100 target
- All interactive elements keyboard-navigable with visible `:focus-visible` ring
- Color contrast ratio ≥ 4.5:1 for all text
- `aria-label` on icon-only buttons (WhatsApp, social icons, hamburger)
- `aria-expanded` on accordion FAQ items
- `prefers-reduced-motion` media query: disable all animations if set

## WhatsApp integration
- Sticky floating button bottom-right (mobile only or always, depending on brand)
- Primary CTA in hero + intake section
- Format: `https://wa.me/[NUMMER]?text=Hallo%20[BEDRIJFSNAAM]%2C%20ik%20wil%20graag%20een%20afspraak%20maken.`

## Quality bar (TessMaedia standard)
- No Lorem Ipsum — write real, professional copy in [NL/EN] based on the business type
- Consistent 8px spacing grid throughout
- All hover states defined (cards lift slightly, buttons scale 1.02, links underline)
- No TypeScript `any` types
- No unused imports
- `next build` must complete without errors or warnings
- Lighthouse (production build): Performance ≥ 90, Accessibility = 100, Best Practices ≥ 95, SEO = 100

## Deliverable
- Complete `src/app/page.tsx` with all sections + component functions at the bottom of the file
- Complete `src/app/layout.tsx` with metadata and JSON-LD
- `tailwind.config.ts` with brand color tokens
- `src/app/globals.css` with Tailwind directives and any custom CSS
- `package.json` with correct dependencies (next, react, react-dom, tailwindcss, typescript)
- Brief comments indicating where real content (photos, copy) should replace placeholders
```

---

## Notities voor gebruik
- MindAway en PerformRelax zijn goede visuele referenties om aan de klant te tonen.
- Als er een gallerij is maar foto's nog niet beschikbaar: genereer een placeholder-grid met gekleurde vlakken in de brandkleuren.
- **Geen webshops of reserveringssystemen** — dit valt buiten het aanbod. Wil een klant dat, dan eerlijk communiceren dat dit niet geboden wordt.
- Externe tools embedden (bijv. Calendly-link, Google Maps) is wél mogelijk binnen Standaard, zolang er niets custom gebouwd wordt.
- Specifieke wensen buiten design & layout (meertalig, formulieren op maat, interactieve animaties) → bespreek als **Maatwerk**.
- Genereer altijd eerst een lokale preview (`npm run dev`) vóór je live gaat.
