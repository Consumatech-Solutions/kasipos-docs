# KasiPOS Documentation

Welcome. This repository powers the **KasiPOS documentation website**: the place merchants, partners, and developers go to learn how the product works and how to build with it.

Good documentation shortens onboarding, reduces support load, and helps everyone use KasiPOS with confidence. **Contributing here is a concrete way to help the project**—and many people find that writing or improving docs is one of the best ways to *learn* the product deeply.

You **do not** need to be a senior developer. Clear explanations, careful screenshots, and small fixes matter just as much as large additions. If you can describe something so someone else can follow along, you belong here.

---

## Tech stack (short version)

| Piece | What it does here |
|--------|-------------------|
| **[Next.js](https://nextjs.org)** | The React framework that serves the site, handles routing, and builds static pages. |
| **[Nextra](https://nextra.site)** | A documentation-focused layer on top of Next.js: layouts, sidebar, search hooks, and MDX integration tailored for docs sites. |
| **[MDX](https://mdxjs.com)** | Lets you write pages mostly in Markdown while embedding React components when you need richer UI (callouts, custom layouts, etc.). |
| **[Tailwind CSS](https://tailwindcss.com)** | Utility-first styling used across the app and some MDX-driven layouts. |

If Nextra or MDX are new to you, that is normal. Start by running the site locally, edit one `.mdx` file, and refresh—the feedback loop is quick.

---

## Installation

You need **[Node.js](https://nodejs.org)** (LTS recommended) and **npm** (ships with Node).

**1. Clone the repository**

```bash
git clone https://github.com/kasipos/kasipos-docs.git
cd kasipos-docs
```

If you use a fork, clone your fork instead and add `upstream` pointing at this repo when you want to sync.

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open the site**

In your browser, go to **[http://localhost:3000](http://localhost:3000)**. The root URL redirects into the docs; you will typically land at **`/docs/home`**.

Other useful scripts:

- **`npm run build`** — production build (catches many MDX and type issues).
- **`npm run lint`** — ESLint.
- **`npm run start`** — serve a production build locally (run `build` first).

---

## How the docs are organized

All documentation pages live under **`content/`**. That folder is what Nextra treats as the documentation tree (see `next.config.mjs`: `contentDirBasePath: '/content'`).

Rough layout (folders may grow over time):

```text
content/
  _meta.ts              # Top-level sidebar labels and grouping
  index.mdx             # Docs root metadata / landing wiring
  home.mdx              # Main docs entry (e.g. /docs/home)
  getting-started/      # First steps, installation, introduction
  user-guide/           # Day-to-day product usage
  modules/              # Feature-area docs (POS, inventory, reports, etc.)
  developer/            # Architecture, contribution notes for developers
  contributing.mdx      # In-browser contributing page (styled MDX)
  social-network.mdx    # Example of a top-level topic page
  documentation/        # Nested docs subtree where applicable (_meta.ts per folder)
```

Nested folders often include **`_meta.ts`** to control **sidebar titles and order**. When you add a page in a section, check that folder’s `_meta.ts` so the sidebar stays coherent.

### Adding a new page

1. Create a new **`.mdx`** file under the right folder inside `content/` (mirror the topic: getting started vs module vs developer).
2. Start the file with optional **front matter** Nextra understands, for example:

   ```mdx
   ---
   title: Your Page Title
   description: Short summary for SEO and previews.
   ---
   ```

3. Write the body in **Markdown**, using headings (`##`, `###`) so the table of contents stays useful.
4. If the page should appear in the sidebar with a friendly label, update the relevant **`_meta.ts`**.
5. Run **`npm run dev`** and open the matching URL under **`/docs/...`** (path follows the folder structure).

### MDX basics

- **Markdown first**: headings, lists, links, and code fences work as usual.
- **Front matter** at the top customizes title, description, and some layout flags per page.
- **Components**: you can import React components when the design calls for it (existing pages show patterns). Prefer simple Markdown when it is enough—easier to maintain.

Official references when you want to go deeper: [Nextra docs](https://nextra.site/docs), [MDX docs](https://mdxjs.com/docs/).

---

## How to contribute

We follow a typical **fork → branch → pull request** workflow:

1. **Fork** the repository on GitHub (if you do not have push access).
2. **Create a branch** for your change (one focused topic per branch reads best in review).

   ```bash
   git checkout -b docs/improve-checkout-section
   ```

3. **Commit** with messages that describe *what* changed and *why* (even briefly).

   ```bash
   git add .
   git commit -m "docs: clarify tender types on checkout page"
   ```

4. **Push** and open a **Pull Request** against the default branch of this repo.

   ```bash
   git push -u origin docs/improve-checkout-section
   ```

5. In the PR description, link related issues if any, mention screenshots for UI docs, and call out anything you want reviewers to focus on.

**Updating existing pages** is always welcome: typos, outdated steps, clearer headings, better examples.

**Adding new pages** is welcome when there is a clear gap; place the file in the closest matching folder and wire **`_meta.ts`** so others can find it.

**Stuck?** Open a draft PR with questions, or start an issue describing what you tried and where you are blocked. No need to have it perfect before talking to maintainers.

The theme includes an **“Edit this page on GitHub”** link (`theme.config.tsx` → `docsRepositoryBase`) so readers can jump straight from the live docs into the source file.

---

## Documentation writing standards

Consistency keeps the site trustworthy. Aim for pages that feel calm, scannable, and practical.

### Structure

Each page should ideally move through:

1. **Introduction** — what this page covers and who it is for.
2. **Main explanation** — concepts and steps in logical order.
3. **Examples** — concrete scenarios (“when stock is low…”, “to refund a sale…”).
4. **Screenshots or visuals** — especially for UI-heavy flows.
5. **Important notes** — caveats, permissions, data impacts, or common mistakes (short lists or callouts).
6. **Conclusion or next steps** — where to go after finishing this task.

Not every page needs every section, but **readers should never hit a wall of prose without orientation**.

### Writing style

- Prefer **plain language**. Technical terms are fine when they match the product UI—define them once if they might confuse newcomers.
- **Progressive detail**: start with the shortest path that works; link or subsection deeper topics for power users.
- **Short paragraphs** and **clear headings** so people scanning on mobile do not get lost.
- Use **lists** for sequences and requirements; use **bold** sparingly for real emphasis.

### Grammar and quality

- Proofread before submitting; small slips distract from good content.
- Keep **terminology aligned** with the product (button labels, menu names). When in doubt, match what appears on screen.
- When something could be read two ways, **rewrite for one obvious reading**.

### Visuals

Screenshots, simple diagrams, or short screen recordings often explain faster than paragraphs—especially for POS workflows.

- Crop to what matters; blur or omit sensitive data.
- Use consistent browser or window chrome when comparing steps.
- Consider alt text or captions where it helps accessibility (Nextra/React patterns vary by component—follow existing pages where possible).

### Accessibility

- Use **descriptive titles** (`title` in front matter and the main `#` / `##` structure).
- Avoid **walls of text**: break content with headings, lists, and whitespace.
- Prefer semantic Markdown (proper heading levels in order) so outline navigation stays meaningful.

---

## Contribution philosophy

- **Every contribution counts.** A one-line clarification can save hours for the next reader.
- **Documentation is part of the product.** Treat it with the same care as code when it affects user trust.
- **Beginners are welcome.** Review is a collaboration, not an exam—you can iterate after feedback.
- **Skills compound.** People who start with typo fixes often become go-to authors for whole modules.

---

## Recommended first contributions

Easy ways to build momentum:

- Fix **typos** and broken **links**.
- **Clarify** a confusing paragraph or procedure.
- Add **screenshots** where the UI has changed or text alone is thin.
- **Reorganize** headings so a long page has a clearer flow (without dropping facts).
- Help prepare **translations** or bilingual polish once localized paths exist (see below).
- Improve **formatting**: tables, lists, and consistent heading levels.

---

## Language support

The documentation is intended to exist in **English** and **French**.

- Keep **structure parallel** across languages when both exist (same sections, same intent)—only the wording should diverge where nuance requires it.
- Preserve **tone**: helpful, direct, and respectful of the reader’s time in both languages.
- When adding content, note in your PR whether **French** (or **English**) follow-up is needed so maintainers can coordinate.

If bilingual folders or locale routing are introduced later, mirror file paths and update `_meta` files alongside translators so navigation stays consistent.

---

## Thank you

Learning docs tooling takes a little patience; improving product docs takes empathy for every reader. Whether you fix a single typo or draft a full guide, you are helping real people get work done with KasiPOS.

We are glad you are here—open a PR when you are ready, or reach out if you want a second pair of eyes before you do.
