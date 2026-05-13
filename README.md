# sigmatechrd.com — production site

Static homepage and sample-report page for **Sigma Tech R&D Solutions Limited**. No build step. Drop the contents into a GitHub repo, turn on Pages, and the site is live.

---

## Files

```
index.html          — Homepage (one-pager, responsive)
sample-report.html  — Example pre-acquisition inspection report (R-2603 · Agilent 1290 UHPLC)
responsive.css      — Mobile / tablet overrides
shared.jsx          — Design tokens, content, wordmark, primitives
diagrams.jsx        — Schematic instrument illustrations
mix-img-hero.jsx    — Interactive hero (HPLC / GC / MS), spec-card, animated trace, brief form
variant-mix-img.jsx — Main landing layout (sections §1–§7 + footer)
CNAME               — Maps GitHub Pages to sigmatechrd.com
.nojekyll           — Tells GitHub Pages NOT to run Jekyll on the files
README.md           — This file
```

---

## Deploy on GitHub Pages — step by step

You don't need to install anything. Everything is done in a browser.

### 1. Create a GitHub account
If you don't have one: <https://github.com/signup> (free, 2 min).

### 2. Create a new repository
1. Top-right `+` → **New repository**.
2. **Owner**: your username.
3. **Repository name**: `sigmatechrd` (any name is fine, but this is clean).
4. Visibility: **Public**.
5. Leave everything else empty (no README, no .gitignore, no licence).
6. Click **Create repository**.

### 3. Upload these files
On the empty repo page click **uploading an existing file** (or drag-and-drop):

1. Select **all 9 files in this folder** (including `.nojekyll` and `CNAME` — they look hidden on macOS, hit `Cmd + Shift + .` in Finder to reveal them).
2. Drag them into the GitHub upload area.
3. Commit message: `Initial commit`.
4. Click **Commit changes**.

### 4. Turn on GitHub Pages
1. Repo top tab **Settings**.
2. Left sidebar **Pages**.
3. Under **Build and deployment** → **Source**: select **Deploy from a branch**.
4. Branch: **main** · folder: **/ (root)**. Save.
5. Wait ~1 min. The page will say something like *"Your site is live at `https://<username>.github.io/sigmatechrd/`"*.
6. Open the link — site should load.

### 5. Point sigmatechrd.com at GitHub Pages

Log in to your DNS provider (where you bought the domain). Find the DNS settings for `sigmatechrd.com` and add four **A** records — all pointing to GitHub's Pages IPs:

| Type | Host / Name | Value             | TTL  |
|------|-------------|-------------------|------|
| A    | `@`         | `185.199.108.153` | auto |
| A    | `@`         | `185.199.109.153` | auto |
| A    | `@`         | `185.199.110.153` | auto |
| A    | `@`         | `185.199.111.153` | auto |

If you also want `www.sigmatechrd.com` to work, add **one CNAME**:

| Type  | Host  | Value                       |
|-------|-------|-----------------------------|
| CNAME | `www` | `<username>.github.io.`     |

(Replace `<username>` with your GitHub username. Mind the trailing dot.)

DNS propagation takes anywhere from a few minutes to a few hours.

### 6. Confirm the domain in GitHub
1. Back in **Settings → Pages**.
2. Under **Custom domain**, you should see `sigmatechrd.com` (the `CNAME` file in this repo tells GitHub which domain to expect). If not, type it manually and **Save**.
3. Wait for the DNS check to pass (green tick).
4. Tick **Enforce HTTPS** once the check passes.

You're live at `https://sigmatechrd.com`. ✓

---

## Editing content later

Most copy is in `shared.jsx` — the `CONTENT` object. Cases, services, instrument list, legal info, workflow steps are all there. Edit in GitHub's web editor (pencil icon on any file), commit, and the site rebuilds in ~30 s.

The sample report (`sample-report.html`) is plain HTML — find the text and change it directly.

---

## What's on the homepage

| § | Section | Notes |
|---|---|---|
| Hero | Interactive instrument | Toggle **HPLC / GC / MS**, hover any module for live spec readout. Continuous DAD / FID / XIC trace. |
| §1 | Practice | Six service categories with schematic thumbnails. |
| §2 | Field | Four-frame inspection essay + lab floorplan plate. |
| §3 | Protocol | 5-step workflow, brief → handshake. |
| §4 | Numbers | Year-to-date metrics on inverted plate. |
| §5 | Record | Four redacted real-shape case rows, click any to expand into a full deviation table + photo plates + bid recommendation. |
| §6 | Capability | 12 instrument classes with live filter. |
| §7 | Brief | Form ST-01 — intake form, posts a brief number on submit. |
| — | Footer | Office, sections, services, sign-off. |

`sample-report.html` has a `@media print` style sheet — `Cmd / Ctrl + P` produces a clean six-page PDF for handout.

---

## Tech notes

- React 18 + Babel standalone via unpkg CDN (with integrity hashes — works on any HTTPS host).
- No npm, no build step. Static HTML + JSX served raw.
- Fonts: IBM Plex Serif / Mono / Sans (Google Fonts).
- All instrument illustrations are inline SVG — no image assets to upload.
- Responsive: `responsive.css` adapts at ≤ 1024 (tablet) and ≤ 640 (mobile).

---

© 2026 Sigma Tech R&D Solutions Limited · Hong Kong SAR · CR 79446742
