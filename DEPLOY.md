# Getting www.ccpofbc.org live

Your repository is `PamelaSSOCC/CCPofBC`, connected to a Cloudflare Worker that
is already building successfully. What follows picks up from there.

## You are on Workers, not Pages

Cloudflare has been folding Pages into Workers, and the dashboard now steers new
projects to Workers by default. That is what you created — the giveaway is the
deploy command `npx wrangler deploy`, which is a Workers command. Pages projects
do not have one.

**This is fine.** Workers is where Cloudflare is putting its effort, and it
serves static sites well. You do not need to start over. But a Worker needs a
configuration file telling it what to serve, which a Pages project would not, and
that is the piece that is missing.

Three files are now in the site folder for this:

```
wrangler.jsonc    Tells the Worker to serve this folder as a static site
.assetsignore     Keeps README.md and DEPLOY.md from being served publicly
404.html          Shown when a URL matches no page
```

The `CNAME` file is gone — that was for GitHub Pages and does nothing here.

---

## Part 1 — Upload the three new files

Download the current zip, extract it, and upload `wrangler.jsonc`,
`.assetsignore` and `404.html` to the root of your `PamelaSSOCC/CCPofBC`
repository, alongside `index.html`. Delete `CNAME` while you are there.

On GitHub: **Add file** → **Upload files** → drag them in → **Commit changes**.

One quirk: GitHub's web uploader sometimes refuses files whose names begin with a
dot. If `.assetsignore` will not upload, use **Add file** → **Create new file**
instead, type `.assetsignore` as the filename, and paste the contents in by hand.

The deploy runs automatically on commit. Watch it in the Cloudflare dashboard
under your Worker → **Deployments**.

---

## Part 2 — Check it actually serves

Your Worker has a free address ending in `.workers.dev`. Find it in the Cloudflare
dashboard under your Worker → **Settings** → **Domains & Routes**.

Open it. You should see the site with the pink brush band across the top. If you
see plain unstyled text, the CSS is not being found — check that `assets/` and
its contents made it into the repository.

Also try a made-up address like `/nope` — you should get the styled 404 page
rather than a Cloudflare error.

---

## Part 3 — Point the domain at it

In the Cloudflare dashboard: your Worker → **Settings** → **Domains & Routes** →
**Add** → **Custom domain** → enter `www.ccpofbc.org` → **Add domain**.

Cloudflare creates the DNS record and issues the certificate itself, usually
within a few minutes. This is the step that would have been under "Custom
domains" on a Pages project — same idea, different menu.

### Redirect the bare domain

`ccpofbc.org` with no `www` still goes nowhere. Two steps.

**Give the apex a record to catch.** A redirect rule only fires on a request
Cloudflare actually receives, so the hostname needs a proxied record even though
nothing sits behind it.

Your domain → **DNS** → **Add record**:

| Field | Value |
| --- | --- |
| Type | `AAAA` |
| Name | `@` |
| IPv6 address | `100::` |
| Proxy status | **Proxied** (orange cloud — this matters) |

`100::` is the IPv6 discard address. Nothing is listening there, which is the
point: the orange cloud means Cloudflare answers the request itself and never
forwards it.

**Create the rule.** Your domain → **Rules** → **Redirect Rules** → **Create
rule**:

- **Rule name:** `Apex to www`
- **When incoming requests match:** Custom filter expression
  - Field `Hostname`, Operator `equals`, Value `ccpofbc.org`
- **Then:** Dynamic redirect
  - Expression: `concat("https://www.ccpofbc.org", http.request.uri.path)`
  - Status code: **301**
  - Tick **Preserve query string**

Use *Dynamic*, not Static. A static redirect sends every visitor to the home
page, so an old link to `ccpofbc.org/quality-assessment.html` would lose its
destination.

**Check the SSL/TLS mode.** Your domain → **SSL/TLS** → **Overview**. It must be
**Full** or **Full (strict)**. If it is set to **Flexible** you get a redirect
loop, which is the most common cause of "my Cloudflare site won't load".

---

## Part 4 — Verify

- `https://www.ccpofbc.org` loads with a padlock
- `http://ccpofbc.org` redirects to `https://www.ccpofbc.org`
- `ccpofbc.org/quality-assessment.html` lands on the BCQAS page, not the home page
- `www.ccpofbc.org/nope` shows the styled 404 page
- `www.ccpofbc.org/DEPLOY.md` returns the 404 page, not the file — this confirms
  `.assetsignore` is working
- The logo appears in the header and the favicon in the tab
- All five nav links work, and the menu button works on a phone
- The BCQAS download starts (1.4 MB, give it a moment)
- Paste the address into a Facebook post box and check the preview card appears,
  then delete without posting

Then tell Google the site exists: **Google Search Console** → add
`https://www.ccpofbc.org` as a property (Cloudflare DNS verification is easiest)
→ **Sitemaps** → submit `sitemap.xml`.

---

## Part 5 — Changing the site later

Edit the file on GitHub, commit, and the Worker redeploys within about a minute.
To edit a page: open it in the repository, click the pencil icon, change the
text, scroll down, **Commit changes**.

If a change breaks something, your Worker has a **Deployments** list with the
option to roll back to any previous version.

---

## Part 6 — Connect the newsletter form to Formspree

Cloudflare Pages has no built-in form handling, so the form points at Formspree.
It is already wired up — you only need to supply the form ID.

**13. Create the form.**
Sign up at formspree.io. Click **+ New form**. Name it `Newsletter sign-up` and
set the recipient email to `CCPofBC@gmail.com`.

**14. Copy the endpoint.**
Formspree gives you a URL like `https://formspree.io/f/abcdwxyz`. The last part
is your form ID.

**15. Paste it into `join.html`.**
In your GitHub repository, open `join.html`, click the pencil icon, and find this
line near the middle of the file:

```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

Replace `YOUR_FORM_ID` with your ID, so it reads something like:

```html
action="https://formspree.io/f/abcdwxyz"
```

Commit. Cloudflare redeploys in about a minute.

**16. Confirm the address.**
Submit the form yourself once. Formspree emails `CCPofBC@gmail.com` asking you to
confirm the form. Until you click that link, submissions are held rather than
delivered. This catches people out — if your first real sign-up seems to vanish,
this is why.

**17. Test it properly.**
Fill the form in on the live site. You should stay on the page and see "You're on
the list" appear underneath, and the email should arrive within a minute or two.
Check the junk folder if it doesn't.

### How it behaves

The form submits in the background, so visitors stay on the page and see the
result inline rather than being bounced to Formspree's own thank-you screen.

Three fallbacks are built in, so it does not have a single point of failure:

- If JavaScript fails to load, the browser posts the form normally and Formspree
  shows its own confirmation page. Slightly clumsier, still works.
- If Formspree is unreachable, the visitor's email client opens with the message
  pre-filled to CCPofBC@gmail.com instead.
- If you haven't filled in the form ID yet, it uses the email fallback too. The
  page is never dead.

The hidden `_gotcha` field is Formspree's honeypot. Bots fill it in, people never
see it, and Formspree silently discards those submissions.

### What to watch

**The free tier is 50 submissions a month.** For a newsletter sign-up form on a
new site that is likely fine, but it is a hard ceiling — past it, submissions are
rejected rather than queued. If you promote the site and get a rush, you will hit
it. Keep an eye on the Formspree dashboard for the first few months.

**Formspree collects; it does not send.** You still have no way to send a
newsletter to the people who sign up. Gmail will do for the first while, but it
is not built for bulk mail and your messages will start landing in spam folders
as the list grows. When you outgrow it, move to Kit, Buttondown or MailerLite —
they provide a form endpoint *and* the sending tool, so at that point you would
swap the Formspree URL for theirs and drop Formspree entirely. Same one-line
change to `join.html`.

**CASL.** Canadian anti-spam law requires express consent before sending
commercial email, and a record of when it was given. The form uses an unchecked
opt-in box, which is the compliant pattern, and the script refuses to submit
without it. Formspree timestamps every submission, so keep those emails — that is
your consent record until you move to a proper provider.
