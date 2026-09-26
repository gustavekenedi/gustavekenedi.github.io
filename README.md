# Gustave Kenedi — academic website

A single-page static site. No build step, no dependencies, no toolchain.
Edit the HTML, commit, push. That's the whole workflow.

```
index.html      the entire site (About · News · Research · Policy · Teaching)
style.css       all styling — the palette lives in the :root block at the top
scrollspy.js    ~30 lines, highlights the nav link for the section you're reading
images/         profile photo and favicons
files/          CV and paper PDFs
research/  policy/  teaching/  news/  cv/
                one-line redirect stubs, so old links to /research/ etc. still work
.nojekyll       tells GitHub Pages to serve the files as-is
```

## Previewing locally

```bash
cd static_website
python3 -m http.server 8765
```

Then open <http://127.0.0.1:8765>. Reload after each save — and use a **hard
reload** (`Cmd+Shift+R`) after editing `style.css`, or the browser will keep
serving the cached stylesheet and your change won't appear.

(Opening `index.html` directly with `file://` also works, but the `/research/`
redirects won't.)

## Everyday editing

All of it happens in `index.html`. Each block has a comment above it showing
what to copy.

**Add a news item** — copy a `.news-item` block into the top of `#news`, and
delete the oldest; the list is kept to the five most recent:

```html
<div class="news-item">
  <div class="news-date">Jan 2027</div>
  <div class="news-body">What happened. <a href="...">A link</a> if useful.</div>
</div>
```

**Add a paper** — copy an `<article class="paper">` block:

```html
<article class="paper">
  <p class="ptitle"><a href="files/my_paper.pdf">Title of the Paper</a></p>
  <p class="pline"><span class="jrnl">Journal Name</span>, 2027 <span class="auth">· with Coauthor</span></p>
  <p class="plinks">
    <a href="...">PDF</a>
    <a href="...">Replication package</a>
    <a href="...">Policy brief</a>
  </p>
  <details class="abs"><summary>Abstract</summary>
    <div>The abstract text.</div>
  </details>
</article>
```

Conventions worth keeping, because every entry on the page follows them:

- `.jrnl` (the blue) wraps the **venue**, never the status. Year or status
  follows in plain text: `Journal of Human Resources, accepted`.
- `.plinks` buttons are labelled `PDF`, `Replication package`, `Policy brief`,
  `Slides`. They wrap onto new lines on their own, so add as many as you like.
- Coauthor names are linked to their own sites where one exists.
- Every part is optional — drop `.plinks` if there are no links, drop the
  `<details>` if there's no abstract.
- `<span class="newtag">New</span>` after a title renders a small badge. The
  style is there but currently unused.

**Add a course** — copy an `<article class="course">` block in `#teaching`.
`.cterm` is the small pill after the title; courses carry two (level, then
years): `<span class="cterm">Undergraduate</span><span class="cterm">2026–</span>`.
Use `<span class="soon">Slides coming soon</span>` in place of a link button
for material that isn't ready.

**Update the CV** — replace `files/kenedi_cv.pdf`, keeping the filename.

**Add a section** — add a `<section id="newthing" class="wrap">` and a matching
`<a href="#newthing">` in the nav. The scrollspy picks it up automatically.

## Restyling

Everything comes from the variables at the top of `style.css`:

```css
:root{
  --title:  #1a1a1a;   /* paper, brief and course titles */
  --ink:    #1A4368;   /* your name, section content, the CV button */
  --accent: #1F4E79;   /* section labels, venue names, hovers */
  --bg:     #ffffff;   /* page ground */
  --line:   #e6e6e6;   /* hairlines between sections */
}
```

The two blues are one hue family at two depths — `--ink` is `--accent`
darkened, same hue (208°). Changing `--accent` alone restyles the section
labels, venue names and every hover state at once.

## Images

- `images/prof_pic.jpeg` — 1106×1500 (344 KB). Deliberately larger than the
  180×230 it displays at, so it stays sharp on retina screens, makes a decent
  social-preview card, and is usable by anyone who saves it for a seminar
  announcement or conference programme.
- `images/prof_pic_original.jpeg` — the untouched 1500×2034 original. Keep it;
  it's the source for regenerating the above.
- `images/favicon.svg` / `favicon.png` / `apple-touch-icon.png` — the 🙋‍♂️
  favicon. The PNGs were rendered from the Apple Color Emoji font rather than
  drawn from the SVG, because the emoji is a ZWJ sequence some browsers render
  as two glyphs. To change the emoji you need to regenerate the PNGs, not just
  edit the SVG.
- `images/favicon-old-backup.png` — the previous favicon. Safe to delete.

To resize the photo from the original:

```bash
cd images
cp prof_pic_original.jpeg prof_pic.jpeg
sips -Z 1500 prof_pic.jpeg --setProperty formatOptions 92
```

## Publishing

**Read this before pushing anything.** The `gustavekenedi.github.io` repo does
not serve files from `main`. A GitHub Action (`.github/workflows/deploy.yml`)
builds the Jekyll site on every push to `main` and deploys the result to a
`gh-pages` branch — and GitHub Pages serves *that*. So copying static files
into `main` publishes nothing; the Action just fails and the old site keeps
serving.

Publishing therefore means switching Pages to serve `main` directly.

```bash
cd ~/Dropbox/1areas/website

# 1. Tag the current Jekyll site so it is easy to find again
cd gustavekenedi.github.io
git tag jekyll-site-final && git push origin jekyll-site-final

# 2. Replace the repo contents (keeps .git, removes everything else,
#    including .github/workflows — those would fail without Jekyll sources)
cd ..
rsync -av --delete --exclude '.git' static_website/ gustavekenedi.github.io/

# 3. Review, then commit
cd gustavekenedi.github.io
git status
git add -A
git commit -m "Replace Jekyll site with single-page static site"
git push origin main
```

At this point the live site is **still the old one** — nothing has changed for
visitors yet. The cutover is a setting, done in the browser:

4. GitHub → the repo → **Settings** → **Pages**
5. Under **Build and deployment**, set Source to **Deploy from a branch**,
   Branch to **main**, folder **/ (root)**, and Save.

Give it a minute, then check <https://gustavekenedi.github.io> in a private
window (a normal window may show a cached copy).

Once it looks right, the `gh-pages` branch is dead weight and can go:

```bash
git push origin --delete gh-pages
```

`.nojekyll` in the repo root is what stops GitHub trying to run Jekyll over
these files. Do not delete it.

### If something goes wrong

Nothing is lost — the Jekyll site is in git history and at the
`jekyll-site-final` tag. To go back, set Pages Source to **gh-pages** in
Settings (the old build is still sitting on that branch), then sort out `main`
at your leisure.

## Known gaps

Small things deliberately left undone, in case they ever matter:

- **No Google Scholar link** anywhere on the site.
- **No print stylesheet.** Abstracts are `<details>` elements, which print
  collapsed — so printing the Research section loses every abstract.
- **Subsection labels** (`Publications`, `Working Papers`, `Policy Briefs`…)
  are `<div class="cat">`, not `<h3>`, so they don't appear in the document
  outline for screen readers or search engines.
- **French titles** have no `lang="fr"`, so screen readers read them with
  English phonetics.
- **One `:focus` rule** (the skip link); keyboard users otherwise get the
  browser default.
- **Unused CSS**: the `--accent-dk` variable and the `.cline` and `.newtag`
  rules.
