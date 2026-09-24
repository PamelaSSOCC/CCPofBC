# Child Care Professionals of BC — website

Static site. Five pages, one stylesheet, one small script. No build step, no
framework, no database. Open `index.html` in a browser to view it locally.

Live at **https://www.ccpofbc.org**.

```
index.html               About us (homepage)
join.html                Newsletter sign-up
benefits.html            Benefits of membership — coming soon
quality-assessment.html  The BCQAS + free download
data-research.html       Data & research — coming soon
sitemap.xml              Lists all five pages for search engines
robots.txt               Points crawlers at the sitemap
404.html                 Shown when a URL matches no page
wrangler.jsonc           Tells the Cloudflare Worker to serve this as a static site
.assetsignore            Keeps README.md and DEPLOY.md from being served publicly
DEPLOY.md                Step-by-step guide to getting the site live
assets/styles.css        All styling. Colours and type are tokens at the top.
assets/site.js           Mobile menu + newsletter form
assets/logo.png          CCPBC mark, used in the header
assets/brush.webp        The hero brush stroke
assets/quality-matters.jpg  BCQAS page's link preview only (not shown on the page)
assets/social-card.png   Site-wide link preview image (1200x630)
assets/favicon.svg       Browser tab icon
assets/BCQAS.pdf         The standard (also .docx)
assets/BCQAS-FAQ.pdf     The FAQ (also .docx)
assets/bc_occupational_competencies.pdf   Province of BC competencies (reference)
assets/pathway-to-universal-child-care-2028.pdf   CCPBC report, Sept 2026
assets/pathway-policy-proposals-2028.pdf   The ten proposals, with sources
assets/BC_district_spaces_vs_children_2018_2020_2026.xlsx   Open dataset
```

Contact is handled by `mailto:CCPofBC@gmail.com` links in the footer of every
page and in a contact strip at the bottom of each page.

---

## Serving the repository root

`wrangler.jsonc` sets the assets directory to `./`, which is the repository root.
That is the simplest arrangement for a site with no build step, but it has one
sharp edge: **everything in the repository is a candidate for publication,
including `.git`.** The first Cloudflare build did exactly that, serving the full
commit history at `/.git/config` until `.assetsignore` was added.

So `.assetsignore` is not optional housekeeping here — it is the only thing
keeping the repository's internals off the public web. If you ever add files to
this repository that should not be public, add them to that list at the same
time. Check a deploy log occasionally: the uploaded file count should be roughly
the number of files in the site, and if it jumps you are publishing something new
by accident.

The alternative is moving the site into a `public/` subfolder and pointing
`assets.directory` at that instead, so publication is opt-in rather than opt-out.
That is the safer structure and worth doing if this repository ever grows beyond
the website.

---

## Before you publish

**1. Check one reference.**
The BCQAS FAQ cites a study on caregiver turnover in Alberta accredited day care
programs by Bukutu and Hanson. The citation in your Word file is mangled — it
reads `Bukutu, C., & Tara Hanson, X. C. ... T6C 4E3, 42`, where `T6C 4E3` is a
postal code that has ended up where the publisher should be. I could not find
the paper to repair it, so the reference list on the site gives author, title and
the Alberta Centre for Child, Family and Community Research (now PolicyWise) as
the likely publisher, with no year. If you have the original, fill in the year
and the report number. If you can't find it either, consider dropping the claim
about turnover from the page — it is doing real persuasive work, and an
unverifiable citation under it is a weak spot someone will eventually poke.

**2. Confirm the version line.**
The page says "Version 1.0 (2019)", taken from the document's own title page. If
there is a newer version, replace `assets/BCQAS.pdf` and update the eyebrow text
in the hero and the download panel description.

**3. Redo the social card when you can.**
`assets/social-card.png` uses your real logo, but the type under it is set in
DejaVu Serif because that was the closest serif available to me — not Playfair
Display. Have it rebuilt at 1200x630 in the real typeface. `assets/favicon.svg`
is a rose square with a serif "C"; the full mark is unreadable at 16 pixels, so a
single letter is the right call, but swap the letterform if you have the logo's
actual font.

Note also that the quality assessment page has its own link preview image —
`assets/quality-matters.jpg`, your Quality Matters banner, cropped. It is not
displayed anywhere on the page itself; it only appears when someone shares that
page on social media, in place of the generic card. Delete the two `og:image` /
`twitter:image` lines in `quality-assessment.html` if you would rather that page
used the site-wide card like the others.

**4. Check the logo file.**
`assets/logo.png` is your CCPBC mark, trimmed out of the screenshot you sent and
upscaled 3x. It is fine at the size the header uses it, but it started life as a
screenshot, so the edges are slightly soft if you look closely. If you have the
original vector or a high-resolution export, drop it in over the top — an SVG
would be ideal.

The mark reads "CCPBC" while the domain is ccpofbc.org. The header sets the full
name beside the logo so the acronym isn't left to stand alone, and the footer
spells it out again. Worth deciding at some point whether the mark should be
redrawn to match the domain.

---

## The BCQAS files

`assets/` holds four downloads, all linked from the quality assessment page:

```
BCQAS.pdf         125 pages, 1.4 MB   The full standard, converted from your .docx
BCQAS.docx        379 KB              Your original Word file, unmodified
BCQAS-FAQ.pdf     3 pages, 84 KB      Converted from your FAQ .docx
BCQAS-FAQ.docx    13 KB               Your original FAQ, unmodified
```

The PDFs were produced with LibreOffice and I checked that they render correctly.
Both Word originals are offered alongside them, because a program that wants to
fill the rubrics in on a computer needs an editable copy.

One thing to weigh: the BCQAS PDF is 1.4 MB, which is a slow download on rural
BC internet. If that becomes a complaint, the fix is to split it — a short
"overview and scoring" extract for people deciding whether to use it, with the
full 125-page instrument behind a second link. Not worth doing pre-emptively.

The page content is drawn from the two documents you sent: the six quality areas,
the 18 standards, the 62 elements, the eight service delivery areas, and the 0–4
scoring rules all come straight from the standard. The "why more than ECERS" and
"prescriptive vs open-ended" sections are your FAQ arguments rewritten for the
web. The three findings under "Using it in BC" are labelled on the page as
association research rather than an independent trial, which is accurate and
protects the claim from being overstated.

## The newsletter form

The form posts to **Formspree**, which receives the submission and emails it to
CCPofBC@gmail.com. Cloudflare Pages has no built-in form handling, so a service
like this (or a hand-written Pages Function) is required.

`join.html` currently contains a placeholder:

```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

Replace `YOUR_FORM_ID` with the ID from your Formspree dashboard. Full steps,
including the confirmation email that catches people out, are in `DEPLOY.md`.

**Fallbacks.** The form has no single point of failure. With JavaScript, it
submits in the background and shows the result inline. Without JavaScript, the
browser posts normally and Formspree shows its own confirmation page. If
Formspree is unreachable, or the form ID hasn't been filled in yet, the visitor's
email client opens with the message pre-filled instead.

**Limits to watch.** The Formspree free tier is 50 submissions a month, and it is
a hard ceiling rather than a queue. And Formspree only *collects* — it gives you
no way to send the newsletter. Gmail is poor at bulk mail and your messages will
start being filtered as the list grows.

**When you outgrow it.** Kit, Buttondown and MailerLite each give you a form
endpoint *and* the sending tool, with unsubscribe handling and consent records
built in. Moving is the same one-line change: swap the Formspree URL for theirs,
rename the field `name` attributes to whatever they expect, and drop Formspree.

**CASL.** Canadian anti-spam law requires express consent before sending
commercial email, plus a record of when it was given. The form uses an unchecked
opt-in box, which is the compliant pattern, and the script refuses to submit
without it. Formspree timestamps submissions — keep those emails as your consent
record until you move to a provider that stores it for you.

---

## Hosting and DNS for www.ccpofbc.org

The site is deployed as a **Cloudflare Worker** with static assets, built from
the `PamelaSSOCC/CCPofBC` GitHub repository. Cloudflare has been folding Pages
into Workers, so new projects land on Workers by default now — the tell is the
`npx wrangler deploy` deploy command. A Worker needs `wrangler.jsonc` to know
what to serve; a Pages project would not. Step-by-step instructions are in
`DEPLOY.md`.

Every page declares `https://www.ccpofbc.org` as its canonical URL, and the sitemap,
robots.txt and social tags all point there. If you end up on a different domain,
search-replace `ccpofbc.org` across the folder — it appears in all five HTML
files plus `sitemap.xml`, `robots.txt` and `CNAME`.

Any static host will serve this. Options, cheapest first:

- **Cloudflare Pages** — free, HTTPS, and if your DNS is already at Cloudflare
  the domain connection is a couple of clicks. No built-in form handling.
- **Netlify** — free, HTTPS, drag the folder into the dashboard to deploy.
  Netlify Forms is zero-config, which Cloudflare has no equivalent to.
- **GitHub Pages** — free, HTTPS. The `CNAME` file in this folder is already set
  to `www.ccpofbc.org`, which is what GitHub Pages reads to serve a custom
  domain. Delete that file if you host anywhere else; it does nothing but is
  confusing to leave lying around.
- **Shared hosting** — upload the folder by FTP into the web root.

**DNS.** `www` is the canonical host, which makes the DNS side easy: `www` is a
subdomain, so a plain CNAME record pointing at your host works everywhere. The
`CNAME` file in this folder is already set to `www.ccpofbc.org`.

Then point the bare `ccpofbc.org` at the same host and 301-redirect it to
`www.ccpofbc.org`. Cloudflare does this with a redirect rule, Netlify does it
automatically once you set the primary domain, GitHub Pages does it as soon as
the `CNAME` file names the www host. Do not leave both addresses serving the
site — running both live splits your search ranking across two hosts.

For what it's worth, `www` was the lower-friction choice here. The bare domain
would have needed either A records hard-coded to your host's IP addresses, or a
provider-specific workaround, because the DNS spec doesn't allow a plain CNAME at
the apex. The trade-off is cosmetic: `www.` is four extra characters on business
cards, and some people read it as dated. Nothing about the site depends on it —
if you change your mind, search-replace `www.ccpofbc.org` across the folder and
flip the redirect the other way.

**Pretty URLs.** Links use `.html` extensions because those work everywhere.
Netlify and Cloudflare Pages will also serve `/join` for `join.html` without any
configuration, so if you prefer clean URLs you can drop the extensions from the
`href`s after you deploy. Don't do it before you've confirmed your host supports
it, or the navigation breaks.

Netlify Forms would let you take sign-ups without a mailing-list provider and
without the mailto workaround. Cloudflare Pages has no equivalent — there you
would write a Pages Function yourself, or point the form at a service like
Formspree. Since you need a sending tool regardless, going straight to a
mailing-list provider avoids handling the same addresses twice.

---

## Large PDFs

`pathway-to-universal-child-care-2028.pdf` was supplied at 5.5 MB, which is a
punishing download on rural BC internet. Its images were laid out at 300 dpi
(print resolution); halving them to roughly 150 dpi brought the file to 1.9 MB,
a 66% reduction, with the charts and text untouched because those are vector and
unaffected by image resampling. Page 22 renders pixel-identical to the original.

Its companion, `pathway-policy-proposals-2028.pdf`, needed no such treatment: at
612 KB over 19 pages it is text and vector weight, not images. Check before
compressing &mdash; `pdfimages -list` tells you whether images are the problem.

If you add another image-heavy report, do the same before uploading. The method:
downsample any image whose long edge exceeds about 1100 px, re-encode at JPEG
quality 82, and resize any transparency mask in step so it stays aligned.

---

## Community plans (`community-plans.html`)

A separate page listing 22 municipal child care plans from 17 communities,
linked from the Data &amp; Research page and the footer. The PDFs live in
`assets/plans/`.

**The filenames are kept exactly as supplied** &mdash; spaces, mixed case,
`Assesment` typo and all &mdash; and the page percent-encodes them in the links
instead. That means nothing has to be renamed before uploading, which is the
step most likely to go wrong. The trade-off is URLs like
`assets/plans/Bowen%20Island%20Community%20Child%20Care%20Plan.pdf`. Ugly in the
address bar, invisible to anyone clicking a link.

To add a plan later: drop the PDF in `assets/plans/`, then add a `.plan` block
to the page. Copy an existing one &mdash; the only fiddly part is the href, where
every space becomes `%20`.

---

## Replacing the reports and the dataset

All three downloads are linked by fixed filenames, so a newer version replaces
the old one with no HTML change at all &mdash; upload over the top in `assets/`
and the page picks it up:

```
pathway-to-universal-child-care-2028.pdf
pathway-policy-proposals-2028.pdf
BC_district_spaces_vs_children_2018_2020_2026.xlsx
```

Two things to check when you do. The page states each document's page count and
date; if those change, update `data-research.html` in the same commit. And
remember the Cloudflare cache &mdash; add `?x=1` to the URL to confirm, since a
normal refresh and an incognito window both read the cached copy.

---

## The intro paragraph (`.lede`)

It was originally set in Playfair Display, italic, in muted grey. Three things
working against legibility at once: Playfair is a *display* face, drawn for
headlines and very high-contrast in its strokes; italic slows reading at
paragraph length; and grey at 6.5:1 is the dimmest text on the site.

It is now the body face, upright, in full-strength plum &mdash; 15.8:1 on white,
up from 6.5:1. Size alone marks it as an intro. Playfair still does all the
headings, which is what it is good at.

The references list on the quality assessment page had the same problem in
miniature: grey, and italic on the citation titles. It is now plum, with titles
marked by weight instead of slant.

The only italic left on the site is the pull quote &mdash; large, short, and plum
on pink at 8.1:1, where the slant is doing design work rather than fighting the
reader.

The rest of the grey text (`--muted`, used for card and download copy) is
upright, smaller, and clears AA at 6.5:1, so it was left alone &mdash; say the
word if you want that darkened too.

---

## A CSS trap worth knowing

`.band--ink a` and `.band--petal a` are more specific than `.btn--dark`, so a
button dropped into one of those tinted bands used to inherit the band's link
colour and lose its own — dark red text on a dark plum button, about 1.6:1
contrast. It went unnoticed because no button had ever been placed in one of
those bands until the report feature on the homepage.

There are now explicit rules restoring button colours inside tinted bands. If
you add a new band variant later, add the matching button rule with it.

---

## Design notes

Layout follows the reference you gave (grassrootsonline.ca/about): full-bleed
alternating bands, an uppercase display headline in the hero, an italic sub-line,
column grids under uppercase section headings, and a dark footer with a repeated
menu.

**Palette** — sampled directly out of the logo file, then checked against WCAG AA
so text stays readable. Tokens live at the top of `styles.css`:

```css
--plum:  #3B1626;   /* text and dark bands   15.8:1 on white       */
--rose:  #A83A5B;   /* buttons and links      6.1:1 with white text */
--petal: #E7A9BD;   /* the logo's own wash    8.1:1 with plum text  */
--blush: #FBEFF3;   /* light bands                                  */
```

A caution worth knowing: `--petal` is the pink from your watercolour, and it is
too light to carry white text — roughly 1.9:1, which fails badly. It is used for
rules, highlights, frames and as a band background with dark plum text on it.
`--rose` is the darker pink that white text can sit on. If you start
recolouring things yourself, that's the distinction to hold onto.

**Type** — Playfair Display for headings, because it is close to the serif in
your logo and keeps the page and the mark speaking the same language. Source
Sans 3 for body text, labels and buttons. Both from Google Fonts. Serif capitals
need more tracking than sans capitals do, which is why the headings carry a small
positive `letter-spacing`.

**The hero** is a full-bleed band of your brush stroke across the top of every
page, carrying the eyebrow and the headline. The lede and buttons sit below it on
white, in a separate `.hero-intro` section.

The stroke is stretched to fill the band (`background-size: 100% 100%`) rather
than cropped to it. Stretching keeps the ragged top and bottom edges, which is
the character of the paint; cropping with `cover` would slice them off. The torn
left and right ends simply run off screen, which is what you want from a band.

**The headline is deliberately smaller than headings elsewhere on the site** —
`clamp(1.6rem, 3.3vw, 2.6rem)` against `clamp(1.9rem, 3.8vw, 3rem)` for an `h2`.
It has to sit inside the paint with air around it rather than filling it edge to
edge. If you enlarge it, the band stops reading as a brush stroke with type on it
and starts reading as a coloured box.

`assets/brush.webp` is your stroke with the white background removed. It is WebP
rather than PNG because with transparency the PNG came to 741 KB, which is absurd
for decoration; the WebP is 44 KB. Every browser from about 2020 supports it.

Plum on the paint measures 4.81:1 at the darkest point, which clears the 4.5:1
floor. White would be 3.3:1 and fails, so do not reverse the headline out. The
eyebrow runs plum for the same reason — rose is only 2.7:1 on the paint.

The band grows with the headline: two lines on the homepage, one on the BCQAS
page. Both were checked, and the type stays centred in the paint either way
because the padding is fixed and the band height follows the content.

**The `.mark` highlight** — the pink swipe behind a word — is switched off inside
the hero, since a wash on top of a wash reads as a mistake. It still works in
headings elsewhere.

**The thin double rule** from the logo's frame is used around the download panel
and the "coming soon" boxes.

Four earlier hero attempts are gone: a wash generated from scratch (read as
blur), one tiled from the logo's texture (repeated like wallpaper), a light panel
holding the text on top of the stroke, and a version where the stroke hugged the
headline instead of spanning the page.

Accessibility: skip link, visible keyboard focus, semantic headings, labelled
form fields, `prefers-reduced-motion` respected, and a print stylesheet that
drops the navigation.
