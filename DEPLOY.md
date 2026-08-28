# Getting www.ccpofbc.org live

You have Cloudflare and GitHub, which gives you two ways to do this. Both use
GitHub to hold the files. They differ in who serves them.

## Which one

**Cloudflare Pages** (recommended). GitHub holds the code, Cloudflare builds and
serves it.

- Your DNS is already at Cloudflare, so connecting the domain creates the records
  for you. Nothing to type by hand.
- No certificate problems. This is the real argument: GitHub Pages issues its own
  certificate, and Cloudflare's proxy sitting in front of it interferes with that
  process. The workaround is to turn the proxy off, wait for GitHub to issue,
  then turn it back on — and if you forget, or if your SSL/TLS mode is set to
  Flexible, you get an infinite redirect loop that looks like the site is broken.
  Cloudflare Pages has no such conflict.
- The repository can be private. GitHub Pages needs a paid plan for that.
- Every branch gets a preview URL, so you can look at a change before it's live.

Against it: it's a second dashboard to learn, and there is no built-in form
handling (see the last section).

**GitHub Pages.** Simpler idea — the repository *is* the website. The `CNAME`
file in this folder is already set up for it. But with Cloudflare in front you
still have to create the apex redirect in Cloudflare anyway, so you end up in
both dashboards regardless, and you inherit the certificate problem above.

The rest of this guide assumes Cloudflare Pages. If you'd rather use GitHub
Pages, keep `CNAME` and skip to Part 3.

---

## Part 1 — Put the files on GitHub

**1. Create the repository.**
On GitHub, click **+** (top right) → **New repository**. Name it something like
`ccpofbc-website`. Private is fine. Do **not** tick "Add a README file" — this
folder already has one.

**2. Upload the files.**
On the empty repository page, click **uploading an existing file**. Drag in the
*contents* of the site folder — not the folder itself.

The structure on GitHub must look like this, with `index.html` at the top level:

```
index.html
join.html
benefits.html
quality-assessment.html
data-research.html
sitemap.xml
robots.txt
README.md
DEPLOY.md
assets/...
```

If you end up with `ccpofbc/index.html` instead of `index.html`, the site will
not load. Delete and re-upload the contents rather than the folder.

Drag the `assets` folder in as a folder — GitHub keeps the structure.

**3. Delete `CNAME`.**
That file is a GitHub Pages instruction. On Cloudflare Pages it does nothing and
will confuse whoever looks at this next. Click it, then the bin icon, then commit.

**4. Commit.**
Scroll down, write something like "Initial site", click **Commit changes**.

---

## Part 2 — Connect Cloudflare Pages

**5. Create the project.**
Cloudflare dashboard → **Compute (Workers & Pages)** in the sidebar → **Create**
→ **Pages** tab → **Connect to Git**.

**6. Authorise and pick the repository.**
Cloudflare will ask for access to GitHub. You can grant access to only this one
repository rather than all of them. Select `ccpofbc-website`, click **Begin
setup**.

**7. Build settings.**
This is where people get stuck, because the site has no build step and the form
wants build instructions.

| Field | Value |
| --- | --- |
| Project name | `ccpofbc` |
| Production branch | `main` |
| Framework preset | **None** |
| Build command | **leave empty** |
| Build output directory | `/` |

If `/` is rejected, leave the field empty instead. Both mean "the files are at
the top level, just serve them".

**8. Save and Deploy.**
It takes under a minute. You get a URL like `ccpofbc.pages.dev`. Open it and
check the site works before going any further — if something is wrong, it is much
easier to diagnose here than after the domain is pointed at it.

**9. Add the domain.**
In the project → **Custom domains** tab → **Set up a custom domain** → enter
`www.ccpofbc.org` → **Continue** → **Activate domain**.

Cloudflare creates the DNS record itself. Certificate issuance usually takes a
few minutes and can take up to fifteen. The status will say "Initializing" and
then "Active".

---

## Part 3 — Redirect the bare domain to www

Right now `ccpofbc.org` with no `www` goes nowhere. Two steps.

**10. Give the apex a DNS record to catch.**
A redirect rule can only fire on a request Cloudflare actually receives, so the
hostname needs a proxied record even though nothing is behind it.

Cloudflare dashboard → your domain → **DNS** → **Add record**:

| Field | Value |
| --- | --- |
| Type | `AAAA` |
| Name | `@` |
| IPv6 address | `100::` |
| Proxy status | **Proxied** (orange cloud — this matters) |

`100::` is the IPv6 discard address. Nothing is listening there, which is fine:
the orange cloud means Cloudflare answers the request itself and never forwards
it. If you prefer IPv4, an `A` record to `192.0.2.1` does the same job.

**11. Create the redirect rule.**
Your domain → **Rules** → **Redirect Rules** → **Create rule**.

- **Rule name:** `Apex to www`
- **When incoming requests match:** Custom filter expression
  - Field `Hostname`, Operator `equals`, Value `ccpofbc.org`
- **Then:** Dynamic redirect
  - Expression: `concat("https://www.ccpofbc.org", http.request.uri.path)`
  - Status code: **301**
  - Tick **Preserve query string**

Use *Dynamic* rather than Static. A static redirect sends every visitor to the
home page, so an old link to `ccpofbc.org/quality-assessment.html` would land on
the front page instead of the page someone was sent to. The expression above
keeps the path.

**12. Check the SSL/TLS mode.**
Your domain → **SSL/TLS** → **Overview**. It must be **Full** or **Full
(strict)**. If it is set to **Flexible**, you get a redirect loop. This is the
single most common cause of "my Cloudflare site won't load".

---

## Part 4 — Verify

Work through these in a browser:

- `https://www.ccpofbc.org` loads, with a padlock
- `http://ccpofbc.org` redirects to `https://www.ccpofbc.org`
- `ccpofbc.org/quality-assessment.html` lands on the BCQAS page, not the home page
- The CCPBC logo appears in the header and the favicon appears in the tab
- All five nav links work, and the menu button works on a phone
- The BCQAS download starts (it's 1.4 MB, so give it a moment)
- The newsletter form works (see Part 6 — until Formspree is connected it
  opens your email app with the fields filled in, which is expected)
- Paste `https://www.ccpofbc.org` into a Facebook post box — the preview card
  should appear. Don't post it; just check the preview, then delete.

Then tell Google the site exists: **Google Search Console** → add
`https://www.ccpofbc.org` as a property (Cloudflare DNS verification is the
easiest method) → **Sitemaps** → submit `sitemap.xml`.

---

## Part 5 — Changing the site later

Edit the file on GitHub, commit, and Cloudflare redeploys within about a minute.
No other steps. To edit a page: open it in the repository, click the pencil icon,
change the text, scroll down, **Commit changes**.

If a change breaks something, the Pages project has a **Deployments** list with a
**Rollback** button on every previous version.

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
