# Product

<!-- impeccable:product-schema 1 -->

**Project ID:** lucas-abreu56/portifolio_dev

## Platform

web

## Users

Two primary audiences, deliberately held at equal weight — neither is sacrificed
for the other, and conflicts are resolved case by case rather than by a standing
rule:

- **Enterprise clients and businesses** evaluating whether to hire automation
  work: streamlining operations, automated workflows, custom AI assistants.
  They arrive asking whether this actually works.
- **Technical recruiters and talent acquisition** assessing engineering depth,
  project complexity, and portfolio range. They arrive asking how it was built.

**Collaborators and partners** looking to co-develop automation pipelines are a
secondary audience, served by the same material.

## Product Purpose

A personal portfolio and landing page for Lucas Abreu, specializing in
intelligent automation, AI agent engineering, and web interfaces.

Success is a visitor who leaves convinced the work is real — because they used
it, not because they read a claim about it.

## Positioning

**The portfolio runs a working agent instead of describing one.**

At `/demo/agendamento` any visitor books, reschedules and cancels an appointment
by chatting, against a real Cal.com calendar, with no signup and nothing to
install. Writing about AI agents is cheap and everyone does it. Leaving one
running on an endpoint open to the internet, where a stranger can break it, is
the claim a neighbouring portfolio cannot copy without doing the same work.

This is the property future work must not destroy. A redesign that turns the
demo into a video, a screenshot, or a scripted mock removes the entire argument.

## Operating Context

- Visitors arrive from LinkedIn, GitHub and direct links, mostly cold, and
  usually spend a short first session.
- The interface is bilingual PT-BR / EN with persistence in `localStorage`;
  both languages are first-class, not translation as an afterthought.
- The demo runs on self-hosted n8n on modest infrastructure. Response latency is
  visible to the visitor and is treated as a fact to communicate honestly, not
  to hide.
- Demo bookings land on a real calendar. They are not simulated.

## Capabilities and Constraints

**Portfolio surfaces**
- Bilingual interface with state persistence.
- Project showcase split into *Automation & AI Agents* and *Websites &
  Interfaces*, browsed as a horizontal carousel with scroll snap.
- Services described as a bento grid: intelligent automation, agent
  engineering, specialized prompting.
- Contact through external profiles (LinkedIn, GitHub, email). No contact form.

**Scheduling demo (`/demo/agendamento`)**
- Anonymous: no login, no identification of the visitor.
- Ownership is scoped to the conversation through a server-minted `httpOnly`
  cookie. Only the cookie holder can reach the booking that conversation made.
- Booking and cancelling require confirmation across two turns, enforced by the
  server rather than requested in the prompt.
- Limits: 8 messages per IP per minute, 40 per hour, 2000 characters per
  message, 2-hour session, 120-second ceiling per agent response.
- The browser never contacts n8n directly; a Next.js route handler holds the
  credential.
- One availability lookup covers the whole visible window. The agent states how
  many days have openings and offers three times from that single result,
  varying the day and the part of day. The earlier rule — two times, one morning
  and one afternoon — read as an empty calendar and broke outright on days with
  no morning left.
- Cost, measured on 2026-08-21 against `gemini-3.5-flash-lite`: a lookup turn
  costs 3,607 tokens across two model calls, of which the slot payload is 1,390
  (39%) and the system prompt about 1,000, resent on every call. The Cal.com
  window caps a worst-case lookup near 1,900 tokens; before it was set, a wide
  question could have returned roughly 11,000.

**Closed on 2026-08-21 — the demo calendar is contained**

The standing question was whether demo bookings consume real client slots. They
no longer can, and the containment is in Cal.com rather than in the prompt.

- The event type writes to a secondary Google calendar, "Agenda - Portifolio",
  so a demo booking never lands on the personal calendar.
- Conflict checking is scoped per event type and runs **both** ways: a real
  commitment hides a demo slot, and a demo booking blocks the time against real
  event types. Scoping matters — the account-level setting cannot see the
  secondary calendar, and it would have applied to every event type.
- Four limits bound the exposure: a 7-business-day visible window, 2 hours of
  minimum notice, 40-minute slots, and at most 3 bookings per day.
- The per-booker cap is deliberately **off**. Every demo booking carries the
  same attendee address, so a limit keyed to the booker counts every visitor as
  one person: two uncancelled bookings would refuse the third visitor site-wide
  and leave the demo dead until someone cleaned up by hand. A per-day limit
  resets; a per-booker limit does not.
- Still shared: the availability schedule is the default "Horas de trabalho"
  (Mon–Fri, 9–17). With the daily cap in place the worst case is two hours of a
  day, so this was left as-is rather than split.

## Brand Commitments

- Name and wordmark: **Lucas Abreu**.
- Voice: technical, direct, concrete. Explains mechanisms and trade-offs rather
  than asserting outcomes. No marketing inflation.
- PT-BR and EN parity is binding: a feature shipped in one language only is
  incomplete.

## Evidence on Hand

Real, verifiable, and safe to point at:
- The scheduling agent demo at `/demo/agendamento` — live, not a mock.
- A public Telegram assistant with RAG (`t.me/suporte_certificado_IB_bot`).
- A jobs dashboard fed by an automated pipeline (`vagas-rp.vercel.app`).
- Five front-end projects deployed on GitHub Pages and Vercel.
- Architecture rationale for the demo, written up in `README.md`.

**Absences that future work must not fabricate:** there are no client
testimonials, no named customers, no case studies, no revenue or performance
metrics, and no team. Inventing any of these would break the one thing this
portfolio is built on — that everything shown can be checked.

## Product Principles

1. **Demonstrate, do not claim.** Where a working artifact can replace a
   sentence, ship the artifact.
2. **The containment is the portfolio piece.** What stops the agent misbehaving
   is more interesting than the happy path, and is shown, not hidden.
3. **A failure stays a failure.** Errors surface honestly to the visitor.
   Nothing reports success it did not achieve.
4. **Bilingual parity is not optional.**
5. **Nothing fabricated.** No invented proof, ever.

## Accessibility & Inclusion

**Target: WCAG 2.2 Level AA across the product.** This is a recorded product
constraint, not a one-time cleanup: future work is measured against it.

### Closed on 2026-08-20

Each of these was found by reading the code and closed the same day. "Closed"
means the change is in place and survives a production build — none of it has
been exercised with an actual screen reader yet.

- `<html lang>` follows the language toggle instead of claiming `en` while
  showing Portuguese (WCAG 3.1.1).
- The demo transcript is a live region, so agent replies are announced
  (WCAG 4.1.3).
- The demo composer input has an accessible name (WCAG 4.1.2).
- The composer's focus indicator is visible again (WCAG 2.4.7).
- The carousel's icon-only arrows are named (WCAG 4.1.2).
- `prefers-reduced-motion` has an intentional alternative: every infinite
  animation resolves to its final visible state rather than being blanket
  disabled, which would have left the "agent is working" indicator
  indistinguishable from idle. Covers the two JavaScript paths that no
  stylesheet can reach — the slider's smooth `scrollBy` and the document's
  `scroll-smooth` anchors (WCAG 2.3.3).
- The demo's restart control meets the 24x24 CSS pixel minimum (WCAG 2.5.8).
- Text contrast. Every grey in the palette clears 4.5:1. The two that did not
  — Tailwind's `neutral-500` and `neutral-600` — were replaced by one token,
  `--color-neutral-dim` `#7F7F7F`. The `Muted Steel` pair DESIGN.md used to
  prescribe for this role failed too, and was never in the code (WCAG 1.4.3).
  The ratios first recorded here were calculated against flat hex and have
  since been superseded by pixel measurement — see below.

### Closed on 2026-08-21 — the scheduling demo, measured in a browser

The 08-20 pass was done by reading code. This one ran the built site in a
headless browser and measured rendered pixels, which is the only way to see
through a translucent panel or a `backdrop-filter`. Scope: `/demo/agendamento`.

**What the backgrounds actually are.** Contrast had been calculated against
flat hex, so two surfaces were wrong. The chat panel is `#0A0A0A` at 80% over
the page and composites to `#090909` — *darker* than assumed, so that estimate
was conservative. The real worst case was never in the calculation at all: the
background grid's 3%-white lines over `#050505` composite to `#0C0C0C`. There
`--color-neutral-dim` holds **4.89:1**, not the 4.94:1 recorded above. It still
clears AA, with 0.39 of margin. Nothing darker ships without being measured on
a grid line.

- **Resize text (WCAG 1.4.4)** — the one real AA violation, now fixed. At the
  browser's default font size raised to 150%, the composer's Send button sat
  35px past a 390px viewport; `body { overflow-x: hidden }` turned that into
  lost content rather than a scrollbar, so it could not be reached at all. At
  200% the language toggle went with it. Three independent causes: an `<input>`
  with `min-width: auto` that `flex-1` cannot shrink; a navbar that would not
  yield space; and a 12-column grid reserving eleven gutters for a layout that
  only ever has two children. A fourth surfaced on re-test — a single long word
  in the `h1` outgrowing its column. Verified across 1440/390/320 at 100%, 150%
  and 200%: nothing clipped, every control reachable.
- **Non-text contrast (WCAG 1.4.11)** — `border-white/10` composites to
  `#212121` on the panel: 1.24:1, over a fill identical to the page. On the
  suggestion chips that line was the only thing marking them as controls. The
  three controls (chips, Send, language toggle) now use `--color-neutral-dim`
  at 80% and measure 3.52:1 and 3.66:1. Decorative borders stay at
  `border-white/10` on purpose — they identify nothing.
- **Footer icons** were the sole affordance for their links at 2.82:1; now
  4.25:1 (WCAG 1.4.11).
- **Bilingual parity** — the demo's `<title>` was hard-coded Portuguese while
  the page rendered English and `<html lang>` said `en`. Server metadata now
  ships in the default language and the client corrects both together.
- **Keyboard traversal of `/demo/agendamento`** has now been walked end to end.
  All twelve stops take focus in reading order and every one paints a visible
  indicator, measured from pixels at 7.33:1 to 20.38:1. The composer's custom
  orange ring works; the rest use the browser's.
- **Target size (WCAG 2.5.8)** was measured rather than assumed. Seven controls
  are under 24x24 CSS pixels, and all seven pass through the spacing exception
  — nearest neighbouring centre is 44px or more. No change was needed.
- **`prefers-reduced-motion`** re-confirmed in the browser: no animation is
  left running, and `scroll-behavior` resolves to `auto`.
- **axe-core 4.12** reports zero violations on the demo at both desktop and
  mobile widths. Its four `color-contrast` *incomplete* results — the ones it
  cannot resolve behind the navbar's blur — measured 15:1 to 20:1.

One measured failure is left standing by choice: the **disabled** Send button
sits at 2.58:1. Disabled controls are exempt from 1.4.3, but this is the state
every visitor meets on arrival, and the demo's primary action is nearly
invisible in it. That is a design question, not a conformance one.

### Closed on 2026-08-21 — the home page, measured

Same method as the demo: the built site in a headless browser, pixels rather
than calculation. Scope: `/`.

- **Resize text (WCAG 1.4.4)** — the home failed harder than the demo did, in
  three separate ways. The project cards were pinned to `aspectRatio: 3/4`
  with `overflow-hidden`, so the box held while the text grew: at 200% each
  card swallowed 180–203px of its own description, clipped and unreachable,
  and at 150% it was already 45–52px. The carousel arrows were pushed 182px
  off the right edge because the title beside them could not shrink. The
  "View Projects" button carried `w-max` and simply left the viewport. All
  three are fixed and verified at 320/390/1440 CSS px against 100%, 150% and
  200% text: no element losing content, no control off-screen.
- **`prefers-reduced-motion`** — the contract this product states was not
  being met. One animation kept running: the shimmer button's conic gradient,
  written inline as `animate-[spin_3s_linear_infinite]`, which matched none of
  the class selectors in the reduced-motion block. Now 0 animations running.
- **`will-change` at rest** — `.floating-card` set it in its base rule, so 20
  compositing layers stood promoted and idle on the home page. It now applies
  on hover and focus-within. Measured: 0 at rest across 13 cards.
- **Oversized assets** — `AI.png` shipped 512×512 and 33KB into a 16px slot,
  the fourth largest resource on the page. Routed through `next/image`:
  33KB → 1.3KB, and the page total 387KB → 352KB.
- **axe-core** now reports zero violations on the home at both widths. The one
  it did report, `image-redundant-alt`, was three contact icons whose alt
  repeated the label sitting next to them.
- **Text contrast** passes everywhere, worst case 4.93:1. Nothing needed
  changing.
- **Target size (2.5.8)** — no failures. The six controls under 24×24 all pass
  through the spacing exception.

**Navigation below 768px** was not a conformance failure but was a real gap:
`hidden md:flex` removed Projects, Services and Contact with nothing in their
place, leaving a phone visitor on the demo route with only the back arrow.
They now occupy a second row beneath the wordmark. Plain links were chosen
over a drawer deliberately: no overlay, no open/closed state, no focus trap,
no Escape handling — none of which this project has today, and each of which
is a way for a menu to be inaccessible.

**A measurement caveat worth keeping.** The first contrast sweep of this page
reported four failures. All four were elements photographed mid-entrance
animation, at an effective alpha between 0.17 and 0.36. Re-measured with
`prefers-reduced-motion` emulated — which resolves those animations to their
final state — the page measures 0 failures in 84 elements. On any page using
scroll-triggered animation, contrast must be measured with motion resolved or
it manufactures false positives in bulk.

### The accessibility tree, read on 2026-08-21

Short of running a screen reader, the closest thing is the tree Chrome exposes
to assistive technology — the roles, the computed names, and the order they
arrive in. That is what a screen reader consumes. Reading it found two defects
that nothing else in the audit reaches: not axe, not contrast, not the
resize sweep.

- **Card links named themselves twice over.** The anchor wraps the whole
  project card, so its accessible name was the image alt, the kicker, the
  title and the entire description concatenated, with the title said twice —
  eight of them. The links list, one of the main ways of navigating a page
  with a screen reader, returned eight paragraphs. The name is now the project
  title, plus "opens in a new tab" where that is true.
- **Twelve decorative graphics announced as unnamed images.** Three inline
  `<svg>` declarations without `aria-hidden` — the contact arrows, the
  language globe, the card arrows. The navbar's back arrow and the carousel
  arrows already did this correctly, so it was an oversight rather than a
  missing convention.

Measured after: the home page exposes 48 nodes, none unnamed, in both
languages. The demo exposes 37, with the transcript carrying `log` and
`live=polite` and every control named.

### Open, and not closable by reading code

Until these are settled, the AA target is a stated goal, not an achieved state.
- **No screen reader has actually been run.** The tree above proves the names
  exist and says what they are; it cannot say whether they are *useful*, how
  the demo's live region behaves while a reply streams in, or whether the
  focus order feels right rather than merely being the DOM order. Windows
  Narrator (Ctrl+Win+Enter) or NVDA closes this in about twenty minutes.
- **Two project thumbnails are upscaled 2.11x.** `Thumbnail_Project-01.png`
  and `-02.png` are 556×284 sources in a 448×598 box. The other six are sharp.
  Needs new captures, not new CSS.
- **Five thumbnails are cropped to a third of their width.** Wide screenshots
  (~2.1:1) in a 3:4 box show a narrow vertical slice, which is why half-words
  appear in the card art. `scheduling-demo.jpg` was captured at 3:4 and is the
  one that reads whole. Either recapture the rest at 3:4 or change how the
  card frames them. Deliberately left as-is.
- **`Background_Intro.png` is unused by the app** but still referenced by
  `temp-backup/styles/sections.css`, which is versioned. Whether that backup
  belongs in the repository is a separate question.
