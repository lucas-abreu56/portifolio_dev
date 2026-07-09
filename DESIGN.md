# Design System: Lucas Abreu - Automation & AI Portfolio
**Project ID:** lucas-abreu56/portifolio_dev

## 1. Visual Theme & Atmosphere
- **Aesthetic Vibe:** Premium Cyber-Minimalist Dark Mode. The interface uses a clean, grid-aligned layout designed to invoke the feeling of a futuristic terminal or automation interface.
- **Density:** Spacious yet structured. Whitespace is generous, allowing premium animations to stand out, while sections are clearly bounded by fine divider lines.
- **Key Characteristics:** Glassmorphism, subtle neon orange glows, sliding laser-beam borders, and responsive hover-tilt properties.

## 2. Color Palette & Roles
- **Deep Space Black (`#050505`):** Primary background color. Keeps the interface clean, dark, and highly contrastive.
- **Laser Orange Accent (`#F97316`):** The primary brand/accent color. Used for pulse dots, button highlights, text glows, laser-beam borders, and hovered active states.
- **Dark Charcoal (`#0A0A0A` / `#111111`):** Background for containers, cards, hover overlays, and buttons. Provides depth against the primary black background.
- **Slate Silver (`#E2E8F0`):** Primary text and header color. Offers soft, readable contrast in dark mode.
- **Muted Steel (`#64748B` / `#475569`):** Secondary metadata, inactive borders, labels, and footer text.

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

## 5. Layout Principles
- **Grid System:** Strict container limits (`max-w-[90rem]`) with grid structures mapping components (e.g., 7/5 column layouts in the Hero section and 3-column Bento Grids for services).
- **Horizontal Carousels:** Designed with scroll snap (`snap-x snap-mandatory`) and hidden scrollbars to enable clean, swipeable lists of cards on both desktop and mobile viewports.
- **Section Dividers:** Fine top borders (`border-t border-white/5`) are used instead of heavy backgrounds to transition between sections.
