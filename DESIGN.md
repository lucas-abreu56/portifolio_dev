---
name: Lucas Abreu — Automation & AI Portfolio
description: A dark operations console where a live agent runs in the page instead of being described by it.
colors:
  page: "#050505"
  surface: "#0A0A0A"
  surface-raised: "#111111"
  signal-orange: "#F97316"
  slate-silver: "#E2E8F0"
  neutral-dim: "#7F7F7F"
  hairline: "rgba(255, 255, 255, 0.10)"
  divider: "rgba(255, 255, 255, 0.05)"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.05em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)"
    fontWeight: 300
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(0.625rem, 1vw, 0.75rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  sm: "2px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "96px"
components:
  button-shimmer:
    backgroundColor: "{colors.page}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-shimmer-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "#FFFFFF"
  button-outline:
    backgroundColor: "transparent"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-outline-hover:
    textColor: "{colors.signal-orange}"
  chip-suggestion:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-dim}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  chip-suggestion-hover:
    textColor: "{colors.signal-orange}"
  chip-stack:
    backgroundColor: "{colors.surface}"
    textColor: "#D4D4D4"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  slider-control:
    backgroundColor: "{colors.surface}"
    textColor: "#A3A3A3"
    rounded: "{rounded.full}"
    width: "48px"
    height: "48px"
  slider-control-primary:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    rounded: "{rounded.full}"
    width: "48px"
    height: "48px"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.slate-silver}"
    rounded: "{rounded.none}"
    padding: "32px"
  card-service:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.slate-silver}"
    rounded: "{rounded.none}"
    padding: "48px 32px 32px"
  input-composer:
    backgroundColor: "transparent"
    textColor: "#FFFFFF"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0px"
  panel-chat:
    backgroundColor: "{colors.surface}"
    textColor: "#D4D4D4"
    rounded: "{rounded.none}"
    padding: "16px"
---

# Design System: Lucas Abreu — Automation & AI Portfolio

## Overview

**Creative North Star: "The Live Terminal"**

This portfolio runs a working agent instead of describing one, and the interface
is built to look like the system it is running rather than like a page about
that system. Monospaced labels in upper case read as log lines. A pulsing dot
next to the wordmark says the thing is up. A beam travels the bottom edge of a
card the way a process indicator travels a progress bar. Nothing here is a
screenshot of a console; the console is the page.

The density is spacious but never loose. A 90rem container holds generously
padded sections that are separated by hairlines rather than by blocks of color,
so the eye reads one continuous surface with fine rules drawn across it. On that
surface a single accent, Signal Orange, does all of the pointing: status, path,
system origin. Everything else is black, near-black, and grey. The restraint is
what makes one orange dot mean something.

The visual world is engineered, not decorated. Corners are square or nearly so.
Controls are drawn with a line, not filled with a mass of color. Motion is
always tied to state — a card responds, an agent is thinking, a section arrives
— and never runs as ambience. What the interface rejects is the soft SaaS
register: pastel gradients, rounded pill cards, friendly illustration, depth
faked with a black drop shadow.

**Key Characteristics:**
- Near-black ground (`#050505`) with a masked 60px grid and fine 1px rules
- One accent (Signal Orange `#F97316`), used as signal rather than as color
- Inter throughout, with monospaced upper-case labels standing in for log text
- Square corners; controls identified by a 1px border, not by a fill
- Flat at rest; hover lifts the surface and lights it orange
- Every infinite animation resolves to its final visible state under `prefers-reduced-motion`

## Colors

A near-monochrome dark palette carrying exactly one chromatic voice.

### Primary
- **Signal Orange** (`#F97316`): the only accent in the system, and it is
  information. It marks live status (the navbar pulse, the agent's thinking
  dot), destination (card arrows, the hover state of any link or control), and
  system origin (mono kickers, the `[Live demo]` label, the agent's speaker tag).
  It also draws the hover beam and the card's hover glow. It is never used to
  fill a large area and never used decoratively.

### Neutral
- **Deep Space Black** (`#050505`): the page. Also the core fill of the shimmer
  CTA, which is why the button reads as a hole cut into a rotating gradient.
- **Dark Charcoal** (`#0A0A0A`, token `--color-surface`): the ground for every
  card, panel and chip that must sit above the page. Use the token — this value
  was written inline in eleven places before it had one.
- **Raised Charcoal** (`#111111`): the tier above Dark Charcoal, for elements
  stacked on top of a card — the kicker chip, the arrow puck — and for the
  shimmer CTA's hover fill.
- **Slate Silver** (`#E2E8F0`): body text default and the base foreground. Pure
  white is reserved for headings and for text that must beat it.
- **Dim Grey** (`#7F7F7F`, token `--color-neutral-dim`): secondary metadata,
  mono labels, placeholders, inactive icons, footer text. **The dimmest grey the
  palette allows for text.**
- **Hairline** (`rgba(255,255,255,0.10)`): the decorative 1px edge on panels,
  message bubbles and non-interactive chips.
- **Divider** (`rgba(255,255,255,0.05)`): section rules and the internal borders
  of the chat panel. Present, barely.

### Named Rules

**The Measure-On-A-Grid-Line Rule.** Contrast is verified from rendered pixels,
never calculated against flat hex. The grounds that actually ship are: the page
`#050505` (Dim Grey holds 5.09:1); the chat panel, which is `#0A0A0A` at 80%
opacity and composites *darker*, to `#090909` (4.97:1); and the background
grid's 3%-white lines over the page, `#0C0C0C` — the worst ground on the site,
where Dim Grey holds **4.89:1**. That is the number to beat. Anything darker
fails AA, and a calculation against a card will not tell you so.

> Dim Grey replaced the *Muted Steel* pair (`#64748B` / `#475569`) this document
> used to specify. Neither value was ever in the code — the components used
> Tailwind's `neutral-500` / `neutral-600`, a different family — and all four
> failed AA against a 4.5:1 requirement.

**The One Signal Rule.** Signal Orange appears on well under 10% of any screen.
If a second element on the same viewport wants the accent, one of them is
decoration and should be grey.

**The Measure-With-Motion-Resolved Rule.** On any page using scroll-triggered
entrances, measure contrast with `prefers-reduced-motion` emulated. A first
sweep of the home page reported four failures; all four were elements
photographed mid-entrance at an effective alpha between 0.17 and 0.36. With
motion resolved the same page measures 0 failures across 84 elements.

## Typography

**Display / Body Font:** Inter (with `system-ui`, `sans-serif`)
**Label / Mono Font:** the platform monospace stack (`font-mono`)

**Character:** one neutral geometric sans carries the whole voice, pushed to its
two extremes — headings tightened almost to collision, body set light and open —
so the hierarchy comes from weight and tracking rather than from a second
typeface. The monospace appears only in upper case with wide tracking, where it
does not read as a font choice but as machine output.

### Hierarchy
- **Display** (500, `2.25rem → 4.5rem`, `1.15` / `0.9` from md): the hero
  headline only. `tracking-tighter` (-0.05em), `hyphens-auto` and `break-words`,
  because a single long word in this size will outgrow its column at 200% text.
- **Headline** (500, `1.875rem → 3rem`, `1.1`): section titles — "How I can help
  your business", the slider headers. `tracking-tight` (-0.025em).
- **Title** (400, `3rem → 3.75rem`, `1`): project card titles. Larger than the
  section headline on purpose: inside a card the title is the whole argument.
  Carries `text-glow` and turns Signal Orange on hover.
- **Body** (300, `0.875rem → 1.25rem`, `1.625`): all running prose. `font-light`
  with `leading-relaxed`; constrained to `max-w-md` or `max-w-2xl` rather than
  to a character count.
- **Label** (mono, `0.625rem → 0.75rem`, `0.1em`, upper case): kickers, tags,
  status lines, button text, footer metadata, architecture note terms. Dim Grey
  by default, Signal Orange when it marks system origin. Three real steps, and
  the choice is density, not hierarchy: **10px** (`text-[10px]`) inside a dense
  surface — card kickers, chat status lines, proof terms; **11px**
  (`text-[11px]`) for the mobile nav row only; **12px** (`text-xs`) everywhere
  else, which is the default. Below 10px the tracking stops being legible
  against the page.

### Named Rules

**The Log-Line Rule.** Monospace is always upper case and always widely tracked
(`tracking-widest`). It is never used for prose, never sentence case, and never
larger than `text-xs`. Its job is to look like output, not like a typeface.

**The Text-Grows-The-Box-Grows Rule.** No text container may be pinned to a
fixed height or an `aspect-ratio`. At 200% browser text the project cards
swallowed 180–203px of their own description, clipped and unreachable, because
the box held while the text grew. Use `min-height`. Verified at 320 / 390 /
1440 CSS px against 100%, 150% and 200%.

## Layout

**Container:** `max-w-[90rem]`, centered, with `px-6` rising to `lg:px-12`.

**Grid:** two-part splits are written as explicit fractions —
`lg:grid-cols-[7fr_5fr]` in the hero, `lg:grid-cols-[5fr_7fr]` on the demo.
Multi-cell arrangements are 3-column bento (`md:grid-cols-3` for services,
`md:grid-cols-2` for the architecture notes).

> **The Two-Children-Never-Need-Twelve-Columns Rule.** `grid-cols-12` reserves
> eleven gutters whatever the layout puts in them. With `gap-16` and text at
> 200%, those gutters exceed the container, the columns resolve to nothing and
> the row overflows the page — where `body { overflow-x: hidden }` swallows it
> instead of offering a scrollbar. Explicit fractions keep the proportion and
> one real gutter.

**Project tracks** change model rather than density. Below 1024px each section is
a horizontal carousel with `snap-x snap-mandatory` and a hidden scrollbar; cards
are `85vw` on phones and a fixed `400px` from md. From 1024px the track becomes a
grid — two columns, three from 1280px — with `lg:overflow-visible lg:snap-none`.
Three columns at 1024px was measured and rejected: it produced 293px cards,
narrower than the 400px the md typography is tuned for.

**Arrow visibility is measured, not guessed.** A `ResizeObserver` compares
`scrollWidth` against `clientWidth` and hides the controls when the track does
not overflow. A breakpoint-only rule merely moved the dead arrows — buttons that
announce "see more projects" to a screen reader and move nothing — into the
900–1000px band. A guess about overflow ages with the project list; the
measurement does not.

**Vertical rhythm:** sections run `py-24`, headline to content is `mb-16`, and
sections are separated by `border-t border-white/5` rather than by a change of
background. The navbar is `fixed`, `h-20` from md, and pages clear it with
`pt-32`.

**Navigation below 768px** puts Projects / Services / Contact on a second row
beneath the wordmark. Plain links were chosen over a drawer deliberately: no
overlay, no open/closed state, no focus trap, no Escape handling — none of which
this project has, and each of which is a way for a menu to be inaccessible.

## Elevation & Depth

**Flat at rest, lit on hover.** Nothing in this system casts a neutral drop
shadow while idle. Depth at rest comes from two things only: the tonal ladder
(`#050505` page → `#0A0A0A` card → `#111111` element-on-card) and a 1px
hairline. When a surface does rise, it does not darken the ground beneath it —
it emits Signal Orange.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 25px 50px -12px color-mix(in srgb, var(--color-orange-brand) 15%, transparent)`):
  the hover state of `.floating-card`, paired with `scale(1.03) translateY(-5px)`
  and a border shifting to 40% orange.
- **Mobile focus glow** (`box-shadow: 0 0 50px -15px color-mix(in srgb, var(--color-orange-brand) 20%, transparent)`):
  below 768px there is no hover, so an `.in-focus` class driven by an intersection
  observer gives the centered card the same treatment.
- **CTA halo** (`box-shadow: 0 0 30px -5px rgba(249,115,22,0.4)`): the shimmer
  button on hover.
- **Ambient blur, not shadow**: hero and service cards sit over a blurred orange
  radial (`bg-orange-brand/10 blur-[60px]`, `bg-orange-brand/5 blur-3xl`). This is
  a light source behind the element, not an elevation cue.

### Named Rules

**The No-Black-Shadow Rule.** Every shadow in this system is orange. A neutral
drop shadow on a near-black ground reads as a smudge, adds no separation, and
imports the soft-SaaS register this world rejects.

**The Promote-On-Hover Rule.** `will-change` is a hint about an animation that is
about to happen, not a style property. Pinned in a base rule it promoted one
compositing layer per card — over twenty standing idle on the home page. It
belongs on `:hover` and `:focus-within`, which is when the card actually moves.

## Shapes

Square by default. `rounded-none` is the system's real corner value: cards,
panels, the chat surface, the shimmer CTA, message bubbles and chips are all
sharp. `rounded-sm` (2px) appears only where an element is small enough that a
perfectly sharp corner reads as an artifact — the kicker tag, the stack chips,
the service icon well, the shimmer bars. `rounded-full` is reserved for two
genuinely circular objects: status dots (`w-2 h-2`) and the 48px slider controls.

Borders are always 1px and never heavier. The grid background (60px cells at 3%
white, masked by a centered radial ellipse) and the small dot grid used inside
cards (`radial-gradient` at 16px) are the only repeating textures; both are
geometry, not ornament.

The recurring silhouette across the site is **a sharp-cornered rectangle with a
hairline edge, a texture inside it, and a light that arrives from the accent
only when the element is addressed.**

## Components

### Buttons

- **Shimmer CTA** (the hero's primary action): a rectangle with no radius whose
  visible border is a conic gradient rotating behind it (`from 270deg`, Signal
  Orange over transparent, 3s linear). A `#050505` overlay inset by 1px punches
  the core out, so what remains is a lit outline. Label is mono, upper case,
  `tracking-widest`, semibold, `padding: 16px 32px`. Hover fills the core
  `#111111` and adds the CTA halo. Sized `max-w-full`, never `w-max` — pinned to
  max-content it outgrew the hero column and left the viewport with no way to
  scroll to it.
- **Outline button** (Send, and the demo's controls): transparent, 1px
  `--color-neutral-dim` at 80%, square, mono upper-case label. Hover moves both
  border and text to Signal Orange, so the hovered state is the brighter of the
  two. Disabled drops to `opacity-30` and suppresses the hover shift.
- **Slider controls:** 48px circles, in an inactive/active pair. Inactive is
  `--color-surface` with a hairline and a grey arrow, hovering to white on
  `neutral-800`. Active is solid white with a black arrow, scaling to 1.05.
  Both carry an `aria-label`; the icon alone announces as "button", twice, with
  nothing to tell them apart.

### Chips

- **Kicker tag** (on project cards): `#111111`, hairline, `rounded-sm`, mono
  `text-[10px]` upper case in `neutral-400`. Non-interactive, so a hairline is
  correct here.
- **Stack chip** (hero and demo): `--color-surface`, hairline, `rounded-sm`,
  mono `text-sm` with a 16px logo. Hover moves text and border toward Signal
  Orange at 50%. Non-interactive.
- **Suggestion chip** (demo): square, no fill, 1px `--color-neutral-dim` at 80%
  — **not** a hairline, because here the border is the only thing identifying a
  control.

### Cards / Containers

- **Project card** (`.slide-container.floating-card`): square corners,
  `--color-surface`, hairline border, `p-6` rising to `md:p-8`. Sizing is
  `min-h` at 4/3 of each width (`min-h-[113.34vw]` / `md:min-h-[533px]` /
  `lg:min-h-[600px]`), never `aspect-ratio`. Layered back to front: a
  `object-cover` image at 50% opacity, a black gradient overlay, a dot grid at
  20%, then content. Hover raises the image to full opacity and `scale(1.05)`,
  turns the title Signal Orange, fills the arrow puck orange, and runs the beam.
- **Service card:** same construction, `border-white/5` instead of a hairline,
  `pt-12 p-8`, a blurred orange blob in the top-right corner, and a 56px icon
  well (`bg-white/5`, hairline, `rounded-sm`) that scales to 1.1 on hover. A
  gradient underline scales in from `scale-x-0` along the bottom edge.
- **Hero card:** `aspect-[3/4]` is permitted here — it frames a fixed-ratio
  photograph and contains no text that can grow. Sits at `rotate-[2deg]`,
  straightening to `0deg` on hover.
- **Chat panel:** `--color-surface` at 80% with `backdrop-blur-lg`, a hairline
  border, and internal rows divided by `border-white/5`. Composites to `#090909`
  — measure there, not against the declared hex.

### Inputs / Fields

- **Composer input:** no border, no fill, no radius — the panel row is the field.
  `font-light text-sm`, white text, `--color-neutral-dim` placeholder.
  `min-w-0 flex-1`: an `<input>` defaults to `min-width: auto`, which `flex-1`
  cannot shrink, and at 150% text that pushed the Send button 35px past a 390px
  viewport where `overflow-x: hidden` made it unreachable.
- **Focus:** a custom `focus-visible:ring-2` in Signal Orange, because the
  default outline is suppressed here. Every other control in the product keeps
  the browser's own indicator; focus rings measure 7.33:1 to 20.38:1.

### Navigation

Fixed, full width, `bg-[#050505]/80` with `backdrop-blur-lg` and a
`border-white/5` bottom rule. The wordmark sets "Lucas" in white against
"Abreu" in Dim Grey, `text-lg`, medium, `tracking-tight`. Section links are mono
upper case `text-xs` in Dim Grey, hovering to white. On the home page a pulsing
orange dot precedes the wordmark; on any other route that slot becomes a left
arrow that translates -4px on hover, and the wordmark is the way back.

### The Beam Border (signature)

A 1px strip pinned to the bottom edge of a card (`.beam-border-h`), holding a
5%-white line at rest. On hover a pseudo-element carrying
`linear-gradient(to right, transparent, Signal Orange, transparent)` sweeps left
to right over 3s on `cubic-bezier(0.4, 0, 0.2, 1)`, fading in at 10% and out at
90%. It is the system's clearest statement of the North Star: a card under
attention looks like a process running.

## Do's and Don'ts

### Do:
- **Do** use `--color-surface` (`#0A0A0A`) for any ground that sits above the
  page, and `--color-neutral-dim` (`#7F7F7F`) as the floor for secondary text.
- **Do** measure contrast from rendered pixels on the worst real ground — the
  grid line at `#0C0C0C` — with `prefers-reduced-motion` emulated.
- **Do** give any control whose border is its only identification
  `border-neutral-dim/80` (3.5:1 measured), and move it to solid Signal Orange
  on hover. `border-white/10` composites to `#212121` on the panel — 1.24:1 — so
  it is the *decorative* hairline only.
- **Do** use `min-height` for anything containing text, and verify at 320 / 390 /
  1440 CSS px against 100%, 150% and 200% browser text.
- **Do** write two-part splits as explicit fractions (`grid-cols-[7fr_5fr]`).
- **Do** resolve every infinite animation to its final visible state under
  `prefers-reduced-motion`, rather than disabling motion wholesale. A blanket
  `* { animation: 0.01ms }` would leave the "agent is working" dot
  indistinguishable from idle — the pulse is ornament, but the dot is
  information.
- **Do** name icon-only controls, and mark decorative SVG `aria-hidden`. A card
  link's accessible name is its title, not everything inside it concatenated.
- **Do** apply `will-change` on `:hover` / `:focus-within` only.

### Don't:
- **Don't** use a neutral or black drop shadow. Elevation in this system is
  orange light.
- **Don't** round a card, panel or button. Square is the system's corner;
  `rounded-sm` (2px) is for small elements only, `rounded-full` for circles only.
- **Don't** reach past `#7F7F7F` into a darker grey for text without measuring
  it on a grid line.
- **Don't** pin a text container to `aspect-ratio` or a fixed height.
- **Don't** use `grid-cols-12` for a layout with two children.
- **Don't** set monospace in sentence case, in prose, or above `text-xs`.
- **Don't** let Signal Orange fill a large area or appear more than once as a
  focal point per viewport.
- **Don't** decide arrow or control visibility by breakpoint when the real
  question is overflow. Measure it.
- **Don't** import the soft-SaaS register: pastel gradients, pill-shaped cards,
  friendly illustration, or decorative motion that runs without a state behind it.
