# Liquidity Alchemist — Mentor Design Brief

**Project:** Professional redesign of Alchemist EMS Lab  
**Mentor:** LQD Alchemist  
**Reference live site:** https://alchemist-ems-lab.vercel.app/  
**Inspiration (structure & restraint, not a clone):** https://www.kojoforex.com/  
**Prototype:** `/web` (Next.js)

---

## 1. Goal

Replace a functional student brochure with a **mentor-grade education brand**: calm authority, clear process, bilingual EN/FR, Telegram conversion. Mentorship is the hero story. Partners (Equity Edge, HFM) support — they do not compete for equal attention.

---

## 2. Brand positioning

| | Current student site | Proposed |
|---|---|---|
| Feel | Dark gold template, card hub | Atelier of markets — ink, liquidity, discipline |
| Hero job | Pitch + 3 equal “opportunities” | Brand presence + one promise + two CTAs |
| Conversion | Many parallel CTAs | Ladder: Mentorship → Telegram; partners secondary |
| Trust | Prices + prizes | Method + proof + mentor presence |

**One-line brand:** *Read liquidity. Master the process.*

**Audience:** English- and French-speaking retail traders who want structure (EMS), not hype.

---

## 3. Mood & visual system

### Mood keywords
Quiet · precise · liquid · disciplined · bilingual · mentor-led

### Palette (CSS tokens in prototype)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0B0F0E` | Primary background |
| `--ink-elevated` | `#121816` | Section lifts |
| `--mist` | `#E8EEE9` | Primary text |
| `--muted` | `#8A968E` | Supporting text |
| `--liquid` | `#3DDC97` | Accent (liquidity / action) |
| `--liquid-dim` | `#1A5C42` | Accent soft |
| `--silver` | `#C5D0C9` | Secondary highlight |
| `--brass` | `#B8A06A` | Rare ritual accent only |

Avoid: purple glow, generic gold-on-black Discord look, cream+terracotta editorial cliché, broadsheet density.

### Typography
- **Display / brand:** Fraunces (expressive serif) — brand name & section titles  
- **Body / UI:** Manrope — nav, paragraphs, buttons  
- Never Inter / Roboto / Arial as brand face

### Imagery
- **Hero:** Full-bleed atmosphere — trading desk / chart liquidity as edge-to-edge plane (replace with mentor portrait when available)
- No floating badges, chips, or promo stickers on hero media
- Cards only where the user chooses a paid path or partner action

### Motion (intentional, 2–3)
1. Hero: soft liquid light drift + brand/headline fade-rise  
2. Method principles: staggered reveal on scroll  
3. CTA: liquid underline / glow on primary button hover  

---

## 4. Information architecture (wireframe)

```
┌─────────────────────────────────────────────┐
│ NAV  Liquidity Alchemist     EN|FR   Contact │
├─────────────────────────────────────────────┤
│ HERO (full viewport, one composition)       │
│   Brand: Liquidity Alchemist                │
│   Line: Read the market. Refine the process.│
│   Support: one sentence                     │
│   CTAs: Explore mentorship | Contact        │
│   Dominant full-bleed visual                │
├─────────────────────────────────────────────┤
│ METHOD — What EMS is (3 principles)         │
├─────────────────────────────────────────────┤
│ PROOF — Testimonials / outcomes             │
├─────────────────────────────────────────────┤
│ PROGRAMS — Offer ladder + prices (cards OK) │
├─────────────────────────────────────────────┤
│ PARTNERS — Equity Edge + HFM (secondary)    │
├─────────────────────────────────────────────┤
│ CONNECT — Telegram + risk notice            │
└─────────────────────────────────────────────┘
```

**Hero budget (strict):** brand · one headline · one supporting sentence · one CTA group · one dominant image. No stats strip, no schedule, no partner chips in first viewport.

---

## 5. Copy deck (EN)

### Nav
Liquidity Alchemist · Mentorship · Method · Contact · FR

### Hero
**Brand:** Liquidity Alchemist  
**Headline:** Read the market. Refine the process.  
**Support:** Structured EMS mentorship for English- and French-speaking traders, led by LQD Alchemist.  
**Primary CTA:** Explore mentorship  
**Secondary CTA:** Contact on Telegram  

### Method
**Title:** The EMS approach  
**Support:** Clarity before entries. Process before prediction.  
1. **Liquidity** — See where orders concentrate and why price reacts.  
2. **Structure** — Read market topography across timeframes.  
3. **Execution** — Risk first, then timing — a repeatable model.

### Proof
**Title:** Process over noise  
*(Placeholder quotes until real student testimonials are supplied.)*

### Programs
**Title:** Mentorship paths  
**Support:** Register and confirm availability on Telegram. All prices USD.

| Offer | Price | Notes |
|---|---|---|
| EMS Monthly Session | $100 | + lifetime Inner Circle |
| EMS + 1 Month Signals | $150 | Session + Inner Circle + signals |
| 1-on-1 Sessions | $350 | Personalised + Inner Circle |
| Recorded Videos & PDFs | $70 | Self-paced materials |
| Premium Trading Signals | Monthly | Signals community |
| Lifetime Community Access | Included | With $100 / $150 / $350 paths |

### Partners (secondary)
**Equity Edge** — 50% off eligible funded accounts · code **ALCHEMIST** · https://app.equityedge.io/signup/ALCHEMIST/  
**HFM Challenge** — Two-week competition · min $50 deposit · no separate fee · https://register.hfm.com/sv/en/new-live-account/?refid=30597816  
Prizes (1st iPhone 17 Pro Max · 2nd iPad · 3rd $250) stay factual but lower on the page — education-first framing.

### Connect
**Title:** Speak with LQD Alchemist  
**Support:** Mentorship, signals, resources, and enquiries — direct on Telegram.  
**CTA:** Message on Telegram → https://t.me/the_alchemist99  

### Risk
ALCHEMIST EMS LAB provides educational content and community services. Nothing on this website is financial advice or a guarantee of results. Trading leveraged financial products carries significant risk and may not be suitable for everyone. Only trade with money you can afford to lose.

---

## 6. Copy deck (FR) — key strings

**Hero headline:** Lire le marché. Affiner le processus.  
**Support:** Mentorat EMS structuré pour traders anglophones et francophones, dirigé par LQD Alchemist.  
**CTA primaire:** Découvrir le mentorat  
**CTA secondaire:** Contacter sur Telegram  
**Method title:** L’approche EMS  
**Programs title:** Parcours de mentorat  
**Connect title:** Écrire à LQD Alchemist  
**Risk lead:** Contenu éducatif uniquement — pas un conseil financier.

---

## 7. Conversion rules

1. Primary path = Mentorship → Telegram (`the_alchemist99`)  
2. Partner CTAs only in Partners section  
3. Language toggle persists across the page (client state)  
4. No fake social-proof numbers — use real ones when mentor provides them  

---

## 8. Assets needed from mentor (checklist)

- [ ] High-res mentor portrait / desk photo (hero replacement)  
- [ ] Logo mark (vector) — drop “AE” chip if mark exists  
- [ ] 3–6 real student testimonials (name, market, result in one line)  
- [ ] Confirm live prices & what’s included  
- [ ] Confirm Equity Edge + HFM links still current  
- [ ] Preferred public brand: **Liquidity Alchemist** vs **Alchemist EMS Lab** vs both  

---

## 9. What we borrowed from KojoForex (and what we didn’t)

**Borrow:** one sharp promise · mentor as center · proof before pricing · clear ladder · restraint · FAQ-ready structure later  
**Don’t copy:** electric-blue navy theme · stat flex for its own sake · identical section order verbatim · “Africa’s finest” category claims  

---

## 10. Prototype map

| Path | Purpose |
|---|---|
| `web/` | Next.js App Router + Tailwind prototype |
| `web/src/app/page.tsx` | Landing composition |
| `web/src/components/*` | Hero, Method, Proof, Programs, Partners, Connect |
| `web/src/lib/copy.ts` | EN / FR strings |
| `BRIEF.md` | This document |

**Run locally:** `cd web && npm run dev` → http://localhost:3000
