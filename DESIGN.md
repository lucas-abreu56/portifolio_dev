# Design System: Lucas Abreu - Automation & AI Portfolio
**Project ID:** lucas-abreu56/portifolio_dev

## 1. Visual Theme & Atmosphere
- **Aesthetic Vibe:** Premium Cyber-Minimalist Dark Mode. The interface uses a clean, grid-aligned layout designed to invoke the feeling of a futuristic terminal or automation interface.
- **Density:** Spacious yet structured. Whitespace is generous, allowing premium animations to stand out, while sections are clearly bounded by fine divider lines.
- **Key Characteristics:** Glassmorphism, subtle neon orange glows, sliding laser-beam borders, and responsive hover-tilt properties.

## 2. Color Palette & Roles
- **Deep Space Black (`#050505`):** Primary background color. Keeps the interface clean, dark, and highly contrastive.
- **Laser Orange Accent (`#F97316`):** The primary brand/accent color. Used for pulse dots, button highlights, text glows, laser-beam borders, and hovered active states.
- **Dark Charcoal (`#0A0A0A`, token `--color-surface`; `#111111`):** Background for containers, cards, hover overlays, and buttons. Provides depth against the primary black background. Use the token — this value used to be written inline in eleven places.
- **Slate Silver (`#E2E8F0`):** Primary text and header color. Offers soft, readable contrast in dark mode.
- **Dim Grey (`#7F7F7F`, token `--color-neutral-dim`):** Secondary metadata, mono labels, placeholders, inactive icons, and footer text. The dimmest grey the palette allows for text.

> Replaces the *Muted Steel* (`#64748B` / `#475569`) this section used to
> specify. Neither value was ever in the code — the components used Tailwind's
> `neutral-500` / `neutral-600`, a different family — and all four failed WCAG
> AA anyway, against a 4.5:1 requirement.
>
> **Measure on a grid line, not on a card.** Those numbers were calculated
> against flat hex. Measured from rendered pixels on 2026-08-21, the real
> grounds are: the page `#050505` (5.09:1); the translucent chat panel, which
> composites *darker* than its declared `#0A0A0A`, to `#090909` (4.97:1); and
> the background grid's 3%-white lines over the page, `#0C0C0C` — the worst
> ground on the site, where `#7F7F7F` holds **4.89:1**. That is the number to
> beat. Anything darker fails, and a calculation against a card will not tell
> you so.

## 3. Typography Rules
- **Font Family:** `Inter`, sans-serif (Google Fonts). Clean, neutral, geometric, and optimized for screen legibility.
- **Headings (h1, h2):** Set in medium weights with tight tracking (`tracking-tighter` / `tracking-tight`) to create a professional, dense feel for main slogans.
- **Body & Paragraphs:** Set in light/normal weights (`font-light`), line-height set to relaxed (`leading-relaxed`) for maximum legibility.
- **Code & Labels:** Set in monospaced, uppercase text with wide tracking (`tracking-widest` / `font-mono`) to emulate logs, terminal commands, and system metadata.

## 4. Component Stylings
- **Buttons:**
  - *Shimmer CTA Button:* Rectangular, pill-like sharp corners, transparent core with a dark `#050505` overlay. Utilizes a rotating conic-gradient backdrop (`#F97316` transitioning to transparent) to create a glowing border effect. Highlights with a soft orange glow (`rgba(249, 115, 22, 0.4)`) on hover.
  - *Slider Controls:* Circular buttons (w-12 h-12). Inactive is dark with a fine white border and gray arrow; active/primary is solid white with black arrow that scales slightly on hover.
- **Cards/Containers (`floating-card`):**
  - *Slide Containers:* Bound to a 3:4 aspect ratio. Features a 1px border. Hovering triggers a transformation: scale up (`scale(1.03)`), upward slide (`translateY(-5px)`), and activates a diffused orange shadow (`rgba(249, 115, 22, 0.15)`).
  - *Laser-Beam Border:* Active on card hover. A thin horizontal line (`beam-border-h`) that animates an orange gradient sweep from left to right along the bottom edge of the card.
- **Status Dots:**
  - *Pulse Indicator:* A small circular dot (`w-2 h-2`) with an orange background and a pulsing scale animation to show active status.
- **Control boundaries:** a border that is the only thing identifying a control
  carries information, and needs 3:1 against both neighbours (WCAG 1.4.11).
  `border-white/10` composites to `#212121` on the panel — 1.24:1 — so it is
  the *decorative* hairline only: panels, message bubbles, section dividers,
  non-interactive chips. Controls whose shape is their border take
  `border-neutral-dim/80`, measured at 3.5:1. Hover then goes to solid
  `--color-orange-brand`, so the hovered state stays the brighter of the two.

## 5. Layout Principles

> **Two children never need twelve columns.** `grid-cols-12` reserves eleven
> gutters whatever the layout puts in them. With `gap-16` and text scaled to
> 200%, those gutters exceed the container, the columns resolve to nothing and
> the row overflows the page — where `body { overflow-x: hidden }` swallows it
> instead of offering a scrollbar. The 5/7 and 7/5 splits are written as
> `grid-cols-[5fr_7fr]`, which keeps the proportion and one real gutter.

- **Grid System:** Strict container limits (`max-w-[90rem]`). Two-part splits are explicit fractions (`lg:grid-cols-[7fr_5fr]` in the Hero, `lg:grid-cols-[5fr_7fr]` on the demo); multi-cell arrangements are 3-column Bento Grids for services.
- **Horizontal Carousels:** Designed with scroll snap (`snap-x snap-mandatory`) and hidden scrollbars to enable clean, swipeable lists of cards on both desktop and mobile viewports.
- **Section Dividers:** Fine top borders (`border-t border-white/5`) are used instead of heavy backgrounds to transition between sections.
