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

**Open, deliberately undecided**
- Whether the demo's Cal.com event type shares an availability schedule with
  real client event types. If it does, demo bookings consume real slots. This is
  unresolved and must not be assumed either way.

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

Known open violations, from the audit of 2026-08-20:
- `<html lang>` is fixed at `en` while the interface switches to PT-BR
  (WCAG 3.1.1).
- The demo transcript is not a live region, so agent replies are never
  announced (WCAG 4.1.3).
- The demo composer input has no accessible name (WCAG 4.1.2).
- The composer's focus indicator is suppressed (WCAG 2.4.7).
- No `prefers-reduced-motion` alternative exists anywhere, while infinite
  animations run continuously (WCAG 2.3.3).
- Touch targets in the demo fall below 24x24 CSS pixels (WCAG 2.5.8).
