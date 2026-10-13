# NifyDataSolutions — website

Marketing website for NifyDataSolutions: one partner for the full data and digital stack (websites, data engineering, analytics, machine learning and cloud reliability).

It's a static site in plain HTML, CSS and JavaScript. There's no build step, no framework and no dependencies, so it can be hosted anywhere that serves files.

## Pages

| File            | Page                                                              |
| --------------- | ----------------------------------------------------------------- |
| `index.html`    | Home: value proposition, services overview, process, principles   |
| `services.html` | The five service areas in detail, with deep links (`#web`, `#data-engineering`, `#analytics`, `#ml-ai`, `#cloud`) |
| `approach.html` | How we work: five-phase process, engagement models, FAQ           |
| `about.html`    | Why the company exists, mission, principles, who we work with     |
| `contact.html`  | Enquiry form (via Formspree), email address and next steps        |
| `privacy.html`  | Privacy notice for the contact form                               |
| `404.html`      | Not-found page                                                    |

```
assets/
  css/styles.css     All styles. Colors, fonts and spacing are tokens at the top (:root).
  js/main.js         Mobile menu, scroll effects, services sub-nav, contact form.
  img/               Favicon, logo, Apple touch icon, social share image (og-image.png).
robots.txt, sitemap.xml
```

## Preview locally

The quickest way is to double-click `index.html` to open it in your browser. Nothing needs installing, and links between pages work.

To preview it exactly as it will run when hosted, at a `localhost` address, start a small local server from the project folder:

```bash
python3 -m http.server 8080
# Windows: python -m http.server 8080
# then open http://localhost:8080
```

## Before going live

These are placeholders I couldn't fill in without your input.

1. **Contact form.** Create a free form at [formspree.io](https://formspree.io), then in `contact.html` replace `YOUR_FORM_ID` in the form's `action` with your form ID. Formspree emails every submission to you. Until you do this, the form shows a "not connected yet" message instead of failing silently.
2. **Email address.** The site uses `hello@nifydatasolutions.com` on every page. If that's not the right address, find and replace it across all `.html` files.
3. **Domain.** Canonical links, social-share tags, `sitemap.xml`, `robots.txt` and the structured data in `index.html` assume `https://www.nifydatasolutions.com`. Find and replace it if your domain is different.
4. **Review the copy for commitments you want to make.** The site currently promises:
   - a reply within one business day
   - a 30-minute discovery call
   - two-week delivery cycles and weekly written updates
   - fixed-price quotes for well-defined projects

   Edit any of these that don't match how you work. Do the same for the tool lists on the Home and Services pages.
5. **Hero illustration.** The figures in the "platform" panel on the home page (data freshness, quality checks, last deploy) are illustrative UI, not claims.
6. **Privacy notice.** `privacy.html` describes the site exactly as built: Formspree for the form, Google Fonts, and no analytics or tracking cookies. Have it reviewed for your jurisdiction. If you add analytics, update it.

Optional additions:

- **Team bios:** there's a commented-out team section in `about.html` ready to fill in.
- **Social links:** add LinkedIn or other profiles to the footer.
- **Case studies and testimonials:** add these once you have clients who've agreed to be named. None are invented here.

## Deploying

Any static host works. There's no build command, and the publish directory is the repository root.

- **Netlify / Vercel / Cloudflare Pages:** import the repository and leave the build command empty.
- **GitHub Pages:** Settings → Pages → *Deploy from a branch* → choose the branch and `/ (root)`.

`404.html` uses root-relative paths (`/assets/...`) so it works at any URL depth. That requires the site to be served from the root of a domain, such as a custom domain. If you host it under a sub-path (for example `username.github.io/NifyDataSolutions/`), add that prefix to the paths in `404.html`.

## Editing tips

- **Header and footer.** These are repeated in each page so the site works without a build step. When you change the navigation, update every `.html` file.
- **Colors.** Change `--accent` (and related `--accent-*` values) at the top of `assets/css/styles.css` to re-theme the whole site.
- **Service-specific enquiries.** Links like `contact.html?service=analytics` open the contact form with that service pre-selected. The keys are `web`, `data-engineering`, `analytics`, `ml-ai` and `cloud`.
- **Mark-up conventions.** Elements with the `reveal` class fade in on scroll. Animation is turned off for visitors who prefer reduced motion.
