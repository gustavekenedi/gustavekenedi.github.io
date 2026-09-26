# gustavekenedi.github.io

My academic website. A single hand-written HTML page — no build step, no
dependencies, no toolchain. Edit, commit, push.

Live at <https://gustavekenedi.github.io>.

```
index.html      the entire site (About · News · Research · Policy · Teaching)
style.css       all styling — the palette is the :root block at the top
scrollspy.js    ~30 lines; highlights the nav link for the section you're reading
images/         profile photo and favicons
files/          CV and paper PDFs
research/  policy/  teaching/  news/  cv/
                redirect stubs — see "Redirect stubs" below
.nojekyll       stops GitHub Pages running Jekyll over these files. Do not delete.
```

## Editing and publishing

This repo *is* the website. There is no separate source folder and no build:

```bash
# edit index.html / style.css, then
python3 -m http.server 8765        # preview at http://127.0.0.1:8765
git add -A && git commit -m "..." && git push
```

GitHub Pages serves this repo's `main` branch from the root directory, so a
push is a deploy. Changes appear within a minute.

Use a **hard reload** (`Cmd+Shift+R`) after editing `style.css`, locally and on
the live site — otherwise the browser keeps serving the cached stylesheet.

## How this repo is deployed (worth knowing)

This repo used to hold a Jekyll (al-folio) site built by a GitHub Action
(`.github/workflows/deploy.yml`) and served from a `gh-pages` branch. That is
all gone: the workflows were deleted and GitHub Pages was switched in
**Settings → Pages** to serve **main / root** directly.

The old site is still recoverable at the `jekyll-site-final` tag.

## Everyday editing

Everything happens in `index.html`. Each block has a comment above it showing
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
  <p class="ptitle"><a href="files/my_paper.pdf" target="_blank" rel="noopener">Title of the Paper</a></p>
  <p class="pline"><span class="jrnl">Journal Name</span>, 2027 <span class="auth">· with Coauthor</span></p>
  <p class="plinks">
    <a href="..." target="_blank" rel="noopener">PDF</a>
    <a href="..." target="_blank" rel="noopener">Replication package</a>
  </p>
  <details class="abs"><summary>Abstract</summary>
    <div>The abstract text.</div>
  </details>
</article>
```

Conventions every entry on the page follows:

- `.jrnl` (the blue) wraps the **venue**, never the status. Year or status
  follows in plain text: `Journal of Human Resources, accepted`.
- Button labels are `PDF`, `Replication package`, `Policy brief`, `Slides`.
  They wrap onto new lines on their own, so add as many as you like.
- Coauthor names link to their own sites where one exists.
- Every link that leaves the page or opens a PDF carries
  `target="_blank" rel="noopener"`. Only `#anchors` and `mailto:` stay in-tab.
- Every part is optional — drop `.plinks` if there are no links, drop the
  `<details>` if there's no abstract.
- `<span class="newtag">New</span>` after a title renders a small badge. The
  style exists but is currently unused.

**Add a course** — copy an `<article class="course">` block in `#teaching`.
`.cterm` is the small pill after the title; courses carry two — level, then
years: `<span class="cterm">Undergraduate</span><span class="cterm">2026–</span>`.
Use `<span class="soon">Slides coming soon</span>` in place of a link button
for material that isn't ready.

**Update the CV** — replace `files/kenedi_cv.pdf`, keeping the filename, then
commit and push. (Replacing the file alone changes nothing until you push.)

**Add a section** — add a `<section id="newthing" class="wrap">` and a matching
`<a href="#newthing">` in the nav. The scrollspy picks it up automatically.

## Redirect stubs

`research/`, `news/`, `teaching/` and `cv/` each contain a one-file
`index.html` that does nothing but bounce the visitor to the matching anchor on
the homepage — `/research/` → `/#research`.

They exist because the old Jekyll site served those as real pages, two of them
in its navigation. Anything still linking to them — a bookmark, a department
page, a footer in one of your papers — would otherwise hit a 404. They cost
about 400 bytes each and can be deleted once you're confident nothing points at
the old URLs.

There is deliberately **no stub for `/policy`**: that URL never existed on the
old site, so nothing can be linking to it.

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

- `images/prof_pic.jpeg` — 1289×1393 (428 KB), the displayed photo. Deliberately
  larger than the 180×230 it renders at, so it stays sharp on retina screens,
  makes a decent social-preview card, and is usable by anyone who saves it for a
  seminar announcement or conference programme.
- `images/prof_pic_original_cropped.jpeg` — the crop `prof_pic.jpeg` is made
  from. This is the current source.
- `images/prof_pic_original.jpeg` — the untouched 1500×2034 original, kept as
  the master in case a different crop is ever wanted.
- `images/favicon.svg` / `favicon.png` / `apple-touch-icon.png` — the 🙋🏻‍♂️
  favicon. The PNGs were rendered from the Apple Color Emoji font rather than
  drawn from the SVG, because the emoji is a ZWJ sequence with a skin-tone
  modifier that browsers render inconsistently. **Editing `favicon.svg` alone
  will not change the icon** — the PNGs have to be regenerated too.

To regenerate the displayed photo after re-cropping:

```bash
cd images
cp prof_pic_original_cropped.jpeg prof_pic.jpeg
sips -s format jpeg --setProperty formatOptions 92 prof_pic.jpeg
```

Don't pass `sips -Z <n>` with an `n` larger than the source — it upscales,
which adds no detail and inflates the file.

## Known gaps

Small things deliberately left undone, in case they ever matter:

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
