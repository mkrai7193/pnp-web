# PNP Sports — Project Guidelines

Read this before touching the codebase — whether you're a human contributor or an AI assistant
picking this project back up. It's the single reference for how this repo is organized, how the
website is built, and the conventions to keep when extending it.

---

## 1. Repo layout

The project is split into **four independent repos**, each with its own `package.json` /
lockfile, `.gitignore`, and CI workflow. Open and run any one of them on its own:

```
pnp sports/
├── pnp-web/       ← React website (built, the main app today) — this repo, holds GUIDELINES.md
├── pnp-backend/   ← NestJS API (Phase 1 built: schools + players — see pnp-backend/README.md)
├── pnp-admin/     ← Admin portal (placeholder — see pnp-admin/README.md)
└── pnp-mobile/    ← Flutter app (placeholder — see pnp-mobile/README.md)
```

There is no shared workspace root any more, so there is no `packages/` folder: if cross-repo
types or lint config are ever needed (e.g. API request/response shapes used by web, admin and
backend), publish them as a small package or copy them deliberately — don't let two repos invent
their own version of the same type silently.

Inside each repo, run its own scripts directly: `npm install`, then `npm run dev`,
`npm run build`, `npm run lint`.

---

## 2. Design tokens

All brand colors and fonts live in `pnp-web/src/styles/tokens.css` as CSS custom properties.
**Never hardcode a hex value in a component's CSS Module — reference the variable.** If a new
color is genuinely needed, add it to `tokens.css` with a name, don't inline it.

```css
--blue: #1b3fab;       --blue-dark: #0d2580;    --blue-light: #2e58d8;
--green: #2a7d1a;      --green-dark: #1c5e12;   --green-light: #34a820;
--gold: #d4a000;       --gold-light: #e8b800;
--sky: #0e7ec0;        --sky-dark: #0a60a0;
--dark: #ffee8c;       --dark2: #ffe84a;        --dark3: #ffd800;   /* surface stack, NOT text colors */
--white: #ffffff;      --off-white: #fffdf0;
--muted: #7a6a20;       --text-main: #1a1400;    --border: rgba(180,150,0,0.18);
--font-head: 'Montserrat', sans-serif;    --font-body: 'Lato', sans-serif;
```

**Important quirk:** `--dark` / `--dark2` / `--dark3` are *light* warm-yellow surface colors, not
dark ones — the names are inherited from the original site and kept for continuity. Because of
that legacy naming, three places in the original site had white/light text mistakenly left on
these light surfaces (invisible text). This clone fixes those three spots (footer copyright bar,
the Franchise section's intro paragraph, and the phone mockup's team-name/CRR values) to use
`--text-main` instead. If you add new content on a `--dark*` background, use dark text
(`--text-main` or `rgba(26,20,0,X)`), not white — white text only belongs on the genuinely dark
`--blue-dark` background (used by the Waitlist section).

---

## 3. Component conventions

**Folder-per-component**, co-located CSS Module, no single-file mega-components:

```
components/
├── ui/            ← generic, cross-section primitives (Button, Pill, StatTile, IconTile,
│                     SectionHeading, Reveal, FeatureRow, Container, FormField, FormShell)
├── layout/         ← Navbar, Footer, Layout (the page shell)
├── sections/       ← one folder per homepage section (Hero, About, HowItWorks, ...)
│   └── SectionName/
│       ├── SectionName.jsx
│       ├── SectionName.module.css
│       ├── LocalSubcomponent.jsx   ← e.g. StepCard, LeagueCard — used only within this section
│       └── index.js                ← `export { default } from './SectionName'`
└── forms/          ← standalone registration/participation forms, one folder per form
    └── XyzForm/
        ├── XyzForm.jsx             ← owns field state + validation, renders <FormShell>
        ├── XyzForm.module.css      ← only for markup FormField/FormShell don't cover
        └── index.js
```

**Forms convention:** every registration-style form (`PlayerOnboardForm`, `SchoolOnboardForm`,
`ParticipateForm`) is built from `ui/FormField` (labeled input/select) and `ui/FormShell` (the
card + submit button + success message wrapper) — don't hand-roll that markup again. Validation
uses the shared helpers in `utils/validators.js` (`isValidEmail`, `isValidMobile`,
`isPastOrToday`, `isRequired`). A multi-step flow (see `ParticipateForm/`) is one orchestrator
component holding `{ step, data }` state, with one small `StepXyz.jsx` per step — steps are dumb
(`data`, `update`, `errors` props in; no state of their own).

**Mobile number fields (`type="tel"` via `FormField`):** live-sanitized on every keystroke by
`sanitizeMobileInput` (`utils/validators.js`) — strips non-digit characters, drops a leading `91`/`0`
prefix, caps at 10 digits — so this is automatic for any field using `FormField` with
`type="tel"`. `WaitlistForm` hand-rolls its own markup (see above), so it calls
`sanitizeMobileInput` directly in its own `onChange`; if you add another hand-rolled `tel` input
outside `FormField`, do the same rather than re-deriving the regex. **Do not add a native
`maxLength` to a tel input on top of this** — it was tried and caused real data loss: the browser
truncates by raw character count before React's `onChange` (and therefore the sanitizer) ever
runs, so typing/pasting a few letters before the 10th digit silently drops legitimate digits
beyond the truncation point. The JS-level cap in `sanitizeMobileInput` is the only length limit
that should exist on these fields. `isValidMobile` (also in `utils/validators.js`) is the
submit-time format check (must be a complete 10-digit number starting 6–9).

**Rule of thumb for promoting something to `ui/`:** if a visual pattern repeats 2+ times
*anywhere* (even within one section, like the 6 About pills), it should be a small reusable
component, not copy-pasted JSX. If it only ever appears once per section (e.g. `StepCard` in
`HowItWorks`), keep it as a local subcomponent in that section's folder — don't force it into
`ui/` just because it's "a card."

**Content lives in `src/data/*.js`, not inline in JSX.** Every section maps over a plain array of
objects imported from `data/`. This keeps copy edits (which will happen often, pre-launch) to a
single small file instead of hunting through JSX. When adding a new repeatable item to a section
(e.g. a 5th sport), edit the relevant `data/*.js` file — don't hand-add another JSX block.

**Import alias:** `@` resolves to `pnp-web/src` (configured in `vite.config.js`). Prefer
`import Foo from '@/components/ui/Foo'` for cross-cutting imports; relative imports (`../../ui/Button`)
are fine within `components/` for ui/layout imports used by sections.

**Styling:** CSS Modules only — no inline `style={{...}}` except for genuinely per-instance
dynamic values driven by data (e.g. a stat's accent color coming from `data/heroStats.js`). No
CSS-in-JS runtime library; no global utility-class soup outside of `styles/globals.css`'s base
element resets.

---

## 4. SEO checklist

This is a client-rendered SPA (Vite + React, no SSR). Every new page must:

- [ ] Render a `<Seo title=... description=... path=... />` (see `src/seo/Seo.jsx`) — sets title,
      meta description, canonical URL, Open Graph, and Twitter card tags.
- [ ] Have exactly one `<h1>` and a sane heading hierarchy below it (`<h2>` per major section,
      no skipped levels).
- [ ] Give every meaningful `<img>` real `alt` text (decorative images — like the phone mockup's
      logo — use `alt=""` with `aria-hidden`).
- [ ] Be added to `pnp-web/public/sitemap.xml` if it's a real indexable route.
- [ ] Use semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`) — already the pattern
      throughout `components/layout` and `components/sections`.

**Known limitation, by design:** because this is CSR (not SSR/SSG), a crawler that doesn't
execute JavaScript sees an empty shell, not the content. This is fine for Google (which renders
JS) but not for crawlers/scrapers that don't. If SEO becomes business-critical before this gets
a proper backend-driven CMS, the fix is migrating `pnp-web` to Next.js (or adding
`vite-plugin-ssr`/prerendering) — don't try to patch around it with more meta tags.

---

## 5. Adding a new page or section

**New homepage section:**
1. Add a `data/yourSection.js` file with the section's content as a plain array/object.
2. Create `components/sections/YourSection/YourSection.jsx` + `.module.css` (+ local
   subcomponents if it has repeated inner items), composing from `ui/` primitives where the
   visual pattern already exists (`SectionHeading`, `Reveal`, `Button`, etc.).
3. Add it to `pages/Home.jsx` in the right order, and to the nav (`data/navLinks.js`) and footer
   (`data/footerLinks.js`) if it should be linkable.

**New standalone route** (like `/privacy-policy`):
1. Add `pages/YourPage.jsx` (reuse `pages/StaticPage.module.css` if it's simple prose content).
2. Register the route in `src/App.jsx`.
3. Add the URL to `public/sitemap.xml`.

---

## 6. Future integration points

- **Waitlist form** (`components/sections/Waitlist/WaitlistForm.jsx`): currently client-only
  (validates, shows a success message, resets — no network call). Its `EMPTY_FORM` shape
  (`name`, `email`, `phone`, `type`, `city`) is the contract the future NestJS `POST /waitlist`
  endpoint should accept. When the backend exists, replace the body of `handleSubmit` with a
  fetch/axios call — the form's local state and validation logic don't need to change.
- **Phone mockup scorecard** (`components/sections/AppShowcase/PhoneMockup.jsx` +
  `data/phoneScore.js`): currently static mock data. This is the reference UI for the real
  live-scoring feature in both the mobile app and any future web "watch live" page — keep field
  names in sync when a real match-scoring API is designed.
- **Shared types**: once `pnp-backend` exists, move request/response shapes into
  a shared types package and import them from `pnp-web`, `pnp-admin`, and the backend, instead
  of each app re-declaring its own version of e.g. `WaitlistEntry`.
- **Design parity with mobile**: `pnp-mobile`'s theme should mirror
  `pnp-web/src/styles/tokens.css` — see the note in `pnp-mobile/README.md`.
- **Player / School onboarding forms — live since `pnp-backend` Phase 1**: `SchoolOnboardForm`
  and `PlayerOnboardForm` (see `components/forms/`) submit to the real NestJS backend
  (`pnp-backend`, see its README) via `POST /schools` and `POST /players` — both insert an
  unverified row and email a verification link (see `pnp-backend/src/notifications`); the form
  shows "check your email to verify" rather than a final success state. A school only shows up in
  `PlayerOnboardForm`'s dropdown after its email is verified (`GET /schools` returns verified
  schools only). This changed the player contract: it now sends **`schoolId`** (the verified
  school's numeric DB id, from the dropdown) instead of a raw `school` name string — keep this in
  sync if the dropdown's data source ever changes again. `ParticipateForm`'s `POST
  /teams/participate` is still mock-submit / not yet built.
  The player form's "login" note (email = username, mobile = password) is still copy only — no
  auth is implemented yet; wire real auth up when `iam` exists, don't build a fake login page
  against these forms.
- **`SchoolOnboardForm`'s address fields** (`GeoTagField.jsx`) are always visible and editable —
  Address, City, State, Zip — not gated behind a geolocation failure. "Use My Current Location"
  reads the browser's Geolocation API, then reverse-geocodes those coordinates via OpenStreetMap's
  free Nominatim API (`nominatim.openstreetmap.org/reverse`, no API key) to auto-fill those same
  fields; a person can still type over anything it fills in. `School` gained `state`/`zipCode`
  columns for this (`pnp-backend/src/database/migrations/…AddStateZipToSchools.ts`).
- **`data/partnerSchools.js`** now only feeds the Network section's Partner Schools tab and the
  Participate wizard's school step. `PlayerOnboardForm` no longer uses it — it fetches verified
  schools from the backend instead (see above). The backend is seeded with this same list
  (`pnp-backend/scripts/seed-schools.ts`) so the two don't diverge on day one, but keep both in
  sync by hand until Participate is also migrated to the live API.

---

## 7. What NOT to do

- Don't hardcode colors — use `tokens.css` variables (see §2).
- Don't inline styles for anything that repeats more than once — make it a CSS Module class or a
  `ui/` component.
- Don't build a single-file "God component" for a whole section — break it down (see §3).
- Don't put copy/content directly in JSX for list-like sections — put it in `data/*.js`.
- Don't add TypeScript to `pnp-web` piecemeal — it's plain JS/JSX by deliberate choice for this
  fast-moving marketing site. If/when the project moves to TS, convert the whole app in one pass
  (and set up `a shared config package`'s shared `tsconfig` first) rather than mixing `.js` and `.ts`.
- Don't reproduce visual bugs from the live site without a reason — this clone already
  deliberately fixed three low-contrast text issues (see §2); if you spot something that looks
  like an authoring mistake rather than an intentional design choice, flag it rather than copying
  it silently.
- Don't scaffold `pnp-backend`, `pnp-admin`, or `pnp-mobile` speculatively — build them when
  the work actually starts, using their placeholder `README.md` as the starting brief.
- Don't invent specific business figures (prize money amounts, venue names, real people's names)
  for content that doesn't exist yet — see `data/tournamentDetails.js` and `data/network.js`,
  which use explicit "to be announced" / `placeholder: true` markers instead. A fabricated number
  looks authoritative and can get copy-pasted into real marketing before anyone checks it.
- **CSS Grid gotcha (bit us twice in this repo already):** a `grid-template-columns: repeat(n,
  1fr)` track will NOT shrink below its content's min-content width by default — a single
  unbreakable word (e.g. an uppercase label like "BASKETBALL") or an intrinsically-sized child
  (an `<img>`) can force the whole grid wider than its container, causing horizontal page
  overflow only at narrow widths (it won't show up testing at 768px+, only sub-420px). Any time
  you add a `repeat(n, 1fr)` grid whose cells contain text or images, add `min-width: 0` to the
  grid items and verify at 320–375px, not just the usual 680/1000px breakpoints. Also avoid fixed
  pixel `width` values on elements inside a centered flex/grid layout (see the League Structure
  pyramid's `.levelN/.levelS/.levelD/.levelF`) without a `max-width: 100%` alongside them.
- The navbar's link-collapse breakpoint is `1080px` (not the site's usual `680px`) — deliberately
  wider because the nav carries 8 top-level items + 2 CTAs, measured empirically to need ~1024px
  of content width on one line (see `data/navLinks.js`'s comment). If you add another nav link,
  **re-measure, don't guess**: temporarily force `nav ul, nav .right { display: flex !important }`
  via devtools/a script at the target breakpoint, read `scrollWidth` vs the container's width, and
  set the media query from that. Don't rely on `document.documentElement.scrollWidth` alone to
  judge nav width — that only catches page-level horizontal overflow, not individual nav items
  silently wrapping to two lines while the row still technically "fits" (this bit us once already:
  9 flat links fit without page overflow but wrapped mid-word and looked cluttered).
- **Nav item budget:** once a nav needs more top-level items than comfortably fit one line
  (empirically, 8 was already tight), group related destinations under a dropdown instead of
  adding more flat links — see `Onboard` in `data/navLinks.js` (an item with `children` instead
  of `href`) and `components/layout/Navbar/NavDropdown.jsx`. The dropdown shows on hover/focus
  (accessible via keyboard through `:focus-within`) and the mobile menu renders the same group as
  an indented, labeled list — don't build two divergent data models for desktop vs. mobile nav.
