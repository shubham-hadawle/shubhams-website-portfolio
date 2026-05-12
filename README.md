# Shubham Hadawle · Portfolio

A handcrafted, production-grade personal portfolio for **Shubham Hadawle** — MS in Computer Science at Northeastern University (Khoury College of Computer Science), engineering across Software, AI/ML, Data Science, and applied research.

Designed to read like a senior Silicon Valley engineer built it himself — minimal, futuristic, dark-mode-first, command-palette-driven, motion-rich, and obsessively detailed.

---
## My Personal Website
```console
user@github:~$ /searching the internet Shubham's website
[+] Booting digital presence...
[+] Loading files and assets... [████████████████] 100%
[+] Webpage ready.
user@github:~$ echo "Click the secure link below to proceed:"
```

<div align="center">
  <h2><code><kbd>Click the following Link for:</kbd> <a href="https://shubhams-website-portfolio.vercel.app/"><b>Shubham's website portfolio</b></a></code></h2>
</div>

---

## Highlights

- **Next.js 14 (App Router)** · **TypeScript** · **Tailwind CSS** · **Framer Motion** · **shadcn-style primitives** · **Lucide icons**
- Animated grid backdrop, floating particles, cinematic reveal animations
- Cycling-role hero with terminal widget that types itself out
- Glassmorphic Apple-style navbar with active-section tracking
- Full **⌘K / Ctrl+K command palette** with sectioned navigation, external links and keyboard shortcuts
- Dark / Light mode (system-aware) via `next-themes`
- Custom cursor that snaps onto interactive elements (auto-disables on touch / reduced-motion)
- Loading screen with progress
- Animated timeline for experience, expandable architecture diagrams for every project
- Research section with abstracts and Springer DOI links
- GitHub-style contribution heatmap dashboard
- Production-ready **/api/contact** route (Nodemailer over any SMTP provider) — honeypot + rate limited
- Accessibility-first: skip link, semantic landmarks, `prefers-reduced-motion` respected
- SEO: Open Graph, Twitter card, sitemap, robots, themed colors

---

## Architecture

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/route.ts        # SMTP contact form endpoint
│   ├── globals.css                 # Design tokens + Tailwind layers
│   ├── layout.tsx                  # Theme, fonts, navbar, footer, palette
│   ├── page.tsx                    # Section composition
│   ├── not-found.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── effects/
│   │   ├── CustomCursor.tsx
│   │   ├── GridBackdrop.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Reveal.tsx              # InView fade-up animation primitive
│   │   └── ThemeProvider.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── TechStack.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Research.tsx
│   │   ├── GithubMetrics.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeader.tsx
│   │   └── Toaster.tsx
│   ├── CommandPalette.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
├── lib/
│   ├── data.ts                     # Single source of truth: resume content
│   └── utils.ts                    # `cn()` helper
├── public/
│   └── resume.pdf                  # Live copy of the resume PDF
├── .env.example
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

All resume content (experience, projects, research, tech stack) lives in `lib/data.ts` so you can update the site by editing one file.

---

## Getting started

> Requires **Node.js 18.18+** (Node 20 LTS recommended).

```bash
cd portfolio
npm install      # or pnpm install / yarn install / bun install
cp .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

### Useful scripts

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Local dev server with HMR        |
| `npm run build`     | Production build                 |
| `npm run start`     | Run the production build         |
| `npm run lint`      | Run Next.js / ESLint             |
| `npm run typecheck` | Type-check the project           |

---

## Contact form (server-side email)

The contact form posts to `app/api/contact/route.ts`, which uses **Nodemailer** to send mail via SMTP. The destination email is **hidden from the client**; the user never sees it.

Set the following in `.env.local` (or in Vercel → Project → Settings → Environment Variables):

```ini
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-sending-account@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_TO_EMAIL=rockercandy14@gmail.com
```

> **Using Gmail?** You'll need an [App Password](https://myaccount.google.com/apppasswords). Two-factor must be enabled on the account.
> Any SMTP provider works (SendGrid, Resend SMTP, Mailgun, AWS SES, etc.) — just swap the host/port/credentials.

Without these variables set, the API responds with `503` and the UI gracefully tells the user to email directly while still surfacing the LinkedIn / GitHub / Android quick-links.

The route also includes:

- A honeypot (`website` field) hidden from real users — bot submissions are silently accepted-but-discarded.
- A 30-second per-IP rate limit.
- HTML escaping of all user input.

---

## Design system

- **Palette** — graphite / matte black with carefully calibrated muted-foreground contrast. Light theme mirrors it with the same hierarchy.
- **Typography** — `Inter` for UI, `JetBrains Mono` for terminal / code / labels.
- **Motion** — Framer Motion with a global easing curve `[0.22, 1, 0.36, 1]`; everything respects `prefers-reduced-motion`.
- **Surfaces** — `glass`, `glass-strong`, `hairline` utility classes (see `globals.css`).
- **Accent** — single 3-stop gradient (`text-gradient-accent`) reserved for emphasised words — used sparingly for typographic rhythm.

Tokens live in `app/globals.css` and `tailwind.config.ts`. Swap the HSL CSS variables to re-skin the entire site.

---

## Keyboard shortcuts

| Shortcut          | Action                          |
| ----------------- | ------------------------------- |
| `⌘ K` / `Ctrl K`  | Open the command palette        |
| `/`               | Open the command palette        |
| `Esc`             | Close the command palette       |
| `Tab` (skip link) | Focus jumps to main content     |

---

## Deployment (Vercel)

1. Push the `portfolio/` folder to a GitHub repo.
2. On [vercel.com](https://vercel.com), **Import Project** and select that repo.
3. Vercel autodetects Next.js — leave defaults (`npm run build`, output `.next`).
4. Add the SMTP env vars from `.env.example` under **Settings → Environment Variables** (Production + Preview + Development).
5. Hit **Deploy**. Subsequent pushes to `main` deploy automatically.

For other hosts (Netlify, Cloudflare Pages, AWS Amplify) the project works as a standard Next.js 14 App Router app.

---

## Accessibility & performance

- All interactive elements are reachable by keyboard and have visible focus rings.
- Skip-to-content link, semantic `<header>` / `<main>` / `<footer>`.
- `prefers-reduced-motion` disables non-essential motion and the loading screen.
- Fonts loaded with `next/font` (no FOIT) and subset to Latin.
- `optimizePackageImports` configured for `framer-motion` and `lucide-react`.
- Lighthouse target: 95+ across Performance / Accessibility / Best Practices / SEO.

---

## Future enhancements

- React Three Fiber 3D hero artifact
- GSAP horizontal scroll for the projects rail
- Lenis smooth scroll integration
- MDX-powered `/writing` blog
- Live GitHub API integration in `GithubMetrics`
- Playwright + axe-core accessibility CI
- OG image generation via `@vercel/og`

---

## Credits

Designed and created by **Shubham Hadawle**.
