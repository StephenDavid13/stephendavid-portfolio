# Editing Guide

Quick reference for updating content on stephendavid.dev. Everything here is plain text — Git tracks the history, so don't be afraid to try things.

---

## Where to edit what

| What you're updating                         | File                                              |
| -------------------------------------------- | ------------------------------------------------- |
| CV / About content (summary, skills, jobs)   | `src/content/about.mdx`                           |
| Name, role, email, phone, social links       | `src/app/resources/config.js` → `identity`, `social` |
| Home page headline / subline                 | `src/app/resources/config.js` → `home`            |
| Page titles / meta descriptions (per route)  | `src/app/resources/config.js` → `home`, `about`, `work` |
| A project case study                         | `src/app/work/projects/<slug>.mdx`                |
| CV print layout / PDF styling                | `src/components/CVPrintView.tsx`, `CVPrintView.module.scss`, `CVPrintView.print.scss` |
| Theme colours / brand accent                 | `src/app/resources/config.js` → `style`           |
| Background effects (dots, gradient, lines)   | `src/app/resources/config.js` → `effects`         |
| Nav visibility (show/hide a route)           | `src/app/resources/config.js` → `routes`          |
| Site domain (for SEO / OG / sitemap)         | `src/app/resources/config.js` → `baseURL`         |

All content lives in those files. Components in `src/components/` and `src/once-ui/` are UI code — don't edit them unless you're making a layout change.

---

## Single source of truth: `about.mdx`

The file at `src/content/about.mdx` powers the `/about` page. The "Download CV" button on `/about` prints the same content through a hidden `CVPrintView` component, so editing `about.mdx` updates both the web page and the PDF.

**Frontmatter shape** (the YAML block at the top):

```yaml
---
title: "About – Stephen David"            # SEO title
description: "..."                         # SEO description
summary: |                                 # Paragraph on /about + /cv
  Full-stack web developer with 10+ years...
sections:                                  # Table-of-contents entries
  - { id: "summary", title: "Professional Summary" }
  - { id: "skills", title: "Core Skills" }
  - { id: "experience", title: "Professional Experience" }
  - { id: "education", title: "Education" }
skills:                                    # Grouped skill chips
  - group: "Front-end"
    items: ["HTML", "CSS", "TypeScript", ...]
  - group: "Back-end"
    items: ["PHP", "Node.js", ...]
experience:                                # Every job
  - company: "Point Hacks Australia"
    role: "Full-Stack Web Developer"
    location: "Elsternwick, VIC"
    timeframe: "May 2023 – April 2026"
    summary: "One-line description of the role."
    achievements:
      - "Bullet point one."
      - "Bullet point two."
education:                                 # Degrees / courses
  - institution: "University of Auckland"
    degree: "Bachelor of Science, Major in Computer Science"
references: "Available on request."
---
```

**Rules of thumb**

- Keep indentation consistent (2 spaces). YAML is whitespace-sensitive.
- Wrap any text with colons or quotes in `"double quotes"` to avoid YAML parsing surprises.
- Date format in `timeframe` is free-form text (shown as-is) — keep the style consistent.
- Don't remove fields — leave them empty (`summary: ""`) rather than deleting the line, or the page will crash.

---

## Adding a new project

1. Create `src/app/work/projects/<slug>.mdx` (the filename becomes the URL, e.g. `src/app/work/projects/new-site.mdx` → `/work/new-site`).
2. Drop the cover image into `public/images/projects/<folder>/cover-image.png`, then run `npm run compress-covers` — it will convert to WebP, delete the PNG, and update any MDX references (see the [Images section](#images) for details).
3. Copy this template and fill it in:

```yaml
---
title: "Project Name"
publishedAt: "2026-04-19"                # YYYY-MM-DD — required for sorting
summary: "One-line card description."
images:
  - "/images/projects/<folder>/cover-image.webp"
link: "https://liveurl.com/"             # Optional: external "View project" link
technologies:
  - name: "Next.js"
    role: "What this tech did in this project"
  - name: "Tailwind CSS"
    role: "Styling"
---

## Overview

2–4 sentences describing what was built, what was interesting about it, and what outcome it delivered. Third-person, not first-person.
```

4. The project automatically appears on `/work` and on the home page grid, sorted newest-first by `publishedAt`.

**Don't forget `publishedAt`** — an empty or malformed date breaks the date sort and the project ends up in an unpredictable position.

---

## Updating the CV / Downloading the PDF

There is **no separate PDF file to maintain**. The PDF is generated in the browser from the "Download CV" button on `/about` (or the same button on the home page).

1. Edit `src/content/about.mdx` (frontmatter — skills, experience, education, summary).
2. Visit `/about` (or `/`) in the browser.
3. Click **Download CV** → the native print dialog opens → choose "Save as PDF" → the PDF uses the layout in `src/components/CVPrintView.tsx`, not what you see on screen.

Print layout + styles:
- Markup → `src/components/CVPrintView.tsx`
- Screen + print typography → `src/components/CVPrintView.module.scss`
- Global print rules (A4 page size, hide site chrome, force light background) → `src/components/CVPrintView.print.scss`

The `CVPrintView` component is hidden on screen (`display: none`) and only becomes visible under `@media print`. Any page in the app can trigger the download because the component is rendered once at the root in `src/app/layout.tsx`.

---

## Identity fields

Edit `src/app/resources/config.js`:

```js
const identity = {
  name: "Stephen David",
  role: "Full-Stack Web Developer",
  location: "Melbourne, VIC",         // Display string
  timezone: "Australia/Melbourne",    // IANA tz — powers the Header clock
  email: "hello@stephendavid.dev",    // Public "mailto:" target
  emailAlt: "stephen.david.06@gmail.com", // Shown on /cv, not on /about
  phone: "+61 477 274 345",
  website: "stephendavid.dev",
};

const social = [
  { name: "GitHub",   icon: "github",   link: "https://github.com/StephenDavid13" },
  { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/stephendavid13/" },
  { name: "Email",    icon: "email",    link: `mailto:${identity.email}` },
];
```

Adding a new social link:

1. Pick an icon name from `src/once-ui/icons.ts` (e.g. `github`, `linkedin`, `twitter`, `email`).
2. Add the object to the `social` array.
3. It auto-appears on the Home page and About page.

---

## Images

- Project covers → `public/images/projects/<project-folder>/cover-image.webp` (aspect 16:9 works best, kept as WebP to keep the repo small).
- OG image (social card for the home page) → `public/images/og/home.jpg` (1280×720).
- Everything in `public/` is served at the root (`/images/...` in code = `public/images/...` on disk).

### Compressing / converting project covers to WebP

The project covers used to be 3–7 MB PNG screenshots, which blocked `git push` with HTTP 400 errors and bloated the repo. They live as WebP now. Whenever you add a new cover PNG, run:

```bash
npm run compress-covers
```

That runs [`scripts/compress-covers.sh`](scripts/compress-covers.sh), which does three things in one pass:

1. Converts every `public/images/projects/*/cover-image.png` to `.webp` (quality 82, max 1600 px on the long edge).
2. Deletes the original `.png` file.
3. Updates any `src/app/work/projects/*.mdx` frontmatter references from `cover-image.png` → `cover-image.webp`.

Expect ~95–98% size reduction on screenshots.

**One-time setup** — install the encoder if you don't have it:

```bash
brew install webp
```

**Workflow for a new project cover**: drop the PNG at `public/images/projects/<slug>/cover-image.png`, run `npm run compress-covers`, reference the `.webp` path in the MDX:

```yaml
images:
  - "/images/projects/<slug>/cover-image.webp"
```

**Quality tuning**: `-q 82` is the default inside the script (visually lossless for screenshots). If you want to tune it, edit `scripts/compress-covers.sh`. Drop to `70` for smaller files, raise to `90+` only if you see banding.

---

## Theme and look

In `src/app/resources/config.js` → `style`:

```js
theme: "dark",         // Initial theme (user can toggle in Header)
brand: "aqua",         // Accent colour — see comment for options
border: "playful",     // rounded | playful | conservative
surface: "translucent",// filled | translucent
```

Visual effects (the dotted background, gradients) live in `effects` in the same file. Set `display: false` on any effect you don't want.

---

## Running locally

```bash
npm install            # First time only
npm run dev            # Dev server, hot reload (slow first compile per route — normal)
npm run build          # Production build — catches type errors
npm run start          # Serve the production build (fast)
```

**If the dev server misbehaves** (500 errors, stale modules, chunks not found):

```bash
rm -rf .next && npm run dev
```

That clears Next's build cache and almost always fixes it.

---

## Deploying

The project is set up for Vercel. Push to `main` → Vercel builds and deploys automatically.

Before pushing, run `npm run build` locally — it surfaces type errors that dev mode sometimes hides. A clean local build almost always means a clean deploy.

---

## Do not edit

- `src/once-ui/` — vendored UI library. Overriding things here will get lost on updates.
- `.next/` — build output, regenerated.
- `node_modules/` — dependencies.
- `package-lock.json` — commit it but don't edit by hand.

If you genuinely need to change something in `src/once-ui/`, fork the component into `src/components/` and import that instead.

---

## Quick sanity checklist before committing

- [ ] `npm run build` completes with no red errors.
- [ ] Visited `/`, `/about`, `/work`, and at least one `/work/<slug>` page. Clicked **Download CV** and skimmed the resulting PDF.
- [ ] New projects have a valid `publishedAt` date.
- [ ] No placeholder copy left (e.g. "lorem ipsum", "TODO", an empty `summary: ""` on a new field).
- [ ] If changed identity fields, the Home, About, CV, and Footer still show what you expected.

---

## Gotchas worth remembering

1. **MDX YAML is strict.** A missing colon, a rogue tab, or an unquoted string with special characters will produce a build error with an unhelpful line number. If a rebuild fails right after editing MDX, the frontmatter is almost always the culprit.
2. **Client components don't see filesystem reads.** The About/CV pages load `about.mdx` on the server. Don't move that read into a `"use client"` component — it'll crash at runtime.
3. **The CV "PDF" is a print render.** There's no `/cv` route — the CV markup lives in `src/components/CVPrintView.tsx` and is only shown when printing. If the PDF looks wrong, edit `CVPrintView.module.scss` or `CVPrintView.print.scss`, not the `/about` page.
4. **Route visibility is a tri-state.** `routes["/about"] = true` shows it in the nav. Remove it from `routes` entirely to 404 the route. Setting to `false` only hides the nav link — the route still responds.
5. **The `name` in frontmatter and JSX must match.** Section IDs in the TOC (`Professional Experience`, `Core Skills`) are matched by string. If you rename a heading on the About page, update the matching `id` in the MDX `sections` array too or the TOC link will go nowhere.
