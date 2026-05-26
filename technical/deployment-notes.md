# Deployment Notes

Technical deployment guidance for the Pro Seal Solutions Inc. one-page website.

This file expands the deployment-related requirements from `pro-seal-solutions-inc_prd.md` and is intended for developers, AI coding agents, and maintainers who will build, deploy, test, and update the website.

---

## 1. Deployment Goal

Deploy a fast, secure, mobile-friendly one-page marketing website for Pro Seal Solutions Inc.

The deployed website must support:

- A responsive one-page layout
- Fast loading on mobile and desktop
- HTTPS/SSL
- Contact form delivery to company email
- Cloudflare Turnstile spam protection
- Honeypot spam protection
- Optional photo upload in the quote form
- WhatsApp contact button
- Basic local SEO metadata
- Privacy and cookie notice support
- Easy future content updates

Primary business goal:

> Generate qualified customer inquiries through quote requests, phone calls, email, and WhatsApp.

---

## 2. Recommended Deployment Approach

For this project, the deployment should stay simple and low-maintenance.

Recommended approach:

- Static or mostly-static frontend
- Lightweight backend only where required for contact form submission
- CDN-backed hosting
- Automatic HTTPS
- Simple deployment pipeline from Git
- Minimal dependencies
- No unnecessary CMS, database, login system, or complex backend for the MVP

Avoid over-engineering. The PRD defines this as a simple one-page website, not a large web application.

---

## 3. Suitable Hosting Options

Any modern hosting platform may be used if it supports fast static delivery, HTTPS, custom domain setup, and server-side form handling or serverless functions.

Suitable options include:

### Option A: Static Hosting + Serverless Form Handler

Good fit if using a modern frontend stack such as Astro, Next.js static export, Vite, or plain HTML/CSS/JavaScript.

Examples:

- Cloudflare Pages + Cloudflare Workers
- Netlify + Netlify Functions
- Vercel + Serverless Functions

Best for:

- Fast page delivery
- Global CDN
- Easy SSL
- Git-based deployment
- Serverless form processing

### Option B: Traditional Web Hosting + PHP Form Handler

Good fit if the website is built with plain HTML, CSS, JavaScript, and PHP.

Best for:

- Simple hosting environments
- Straightforward email form handling
- Low technical complexity

Requirements:

- PHP 8.x or newer
- HTTPS support
- Secure mail delivery configuration
- File upload restrictions
- Server-side spam validation

### Option C: Static Hosting + Third-Party Form Service

Possible, but not preferred unless the selected service complies with the project’s privacy and consent requirements.

Use only if:

- Form submissions can be emailed reliably
- Data handling is transparent
- The privacy policy can clearly explain the third-party service
- Spam protection can still use Cloudflare Turnstile or equivalent protection

---

## 4. Recommended Production Architecture

Preferred MVP architecture:

```text
User Browser
   |
   | HTTPS
   v
CDN / Static Hosting
   |
   | Serves one-page website assets
   v
Frontend Website
   |
   | POST quote request form
   v
Secure Form Endpoint
   |
   | Validate input
   | Verify Cloudflare Turnstile token
   | Check honeypot
   | Validate file upload if present
   | Send email notification
   v
Company Email Inbox
```

The frontend should not expose private credentials, email API keys, SMTP passwords, or secret Turnstile keys.

---

## 5. Domain and DNS Setup

The domain should point to the selected hosting provider using the provider’s recommended DNS records.

Deployment checklist:

- Configure production domain.
- Configure `www` and non-`www` domain behavior.
- Choose one canonical version.
- Redirect the non-canonical version to the canonical version.
- Enable HTTPS for all domain variants.
- Redirect all HTTP traffic to HTTPS.
- Confirm that the website loads correctly on the final production URL.

Recommended canonical format:

```text
https://www.prosealsolutions.ca/
```

Alternative:

```text
https://prosealsolutions.ca/
```

Use one version consistently in:

- SEO metadata
- Open Graph metadata
- Sitemap
- Google Business Profile
- Google Search Console
- Local citations
- Footer links

---

## 6. SSL and HTTPS Requirements

The production website must use HTTPS.

Requirements:

- Valid SSL certificate
- Automatic renewal enabled
- HTTP to HTTPS redirect
- No mixed-content warnings
- All images, scripts, stylesheets, fonts, form endpoints, and third-party resources must load over HTTPS

Post-deployment checks:

- Visit the website in Chrome, Safari, Edge, and Firefox.
- Confirm the browser shows a secure connection.
- Submit the quote form through HTTPS.
- Confirm no insecure resource warnings appear in browser DevTools.

---

## 7. Build and Deployment Process

Use a predictable Git-based deployment workflow.

Recommended branch structure:

```text
main        Production-ready code
staging     Optional preview/testing branch
development Optional active development branch
```

Recommended process:

1. Developer or AI agent updates code locally.
2. Changes are committed to Git.
3. Pull request or review step is completed if applicable.
4. Changes are merged into `main`.
5. Hosting platform automatically builds and deploys the site.
6. Production smoke test is completed after deployment.

For a very small project, `main` plus preview deployments may be enough.

---

## 8. Environment Variables

Sensitive values must be stored as environment variables in the hosting platform, not hardcoded in frontend code.

Recommended variables:

```env
SITE_URL=https://www.prosealsolutions.ca
CONTACT_EMAIL_TO=michal@prosealsolutions.ca
CONTACT_EMAIL_FROM=website@prosealsolutions.ca
TURNSTILE_SITE_KEY=public_site_key_here
TURNSTILE_SECRET_KEY=secret_key_here
EMAIL_PROVIDER_API_KEY=secret_email_api_key_here
EMAIL_PROVIDER_FROM_DOMAIN=prosealsolutions.ca
MAX_UPLOAD_SIZE_MB=5
```

Notes:

- `TURNSTILE_SITE_KEY` may be exposed to the frontend.
- `TURNSTILE_SECRET_KEY` must only be used server-side.
- Email API keys and SMTP credentials must never be exposed in client-side code.
- Upload limits should be enforced both client-side and server-side.

---

## 9. Contact Form Deployment Requirements

The quote form is one of the most important conversion features. It must work reliably before launch.

Required form fields:

- Name
- Phone number
- Email address
- Project location
- Type of work
- Message / project details
- Optional photo upload
- Consent checkbox

Submit button text:

```text
Request a Free Quote
```

Success message:

See `content/contact.md` for the frozen success message. Use:

```text
Thank you. Your quote request has been sent. We will contact you to discuss your project.
```

Failure message:

See `content/contact.md` for the frozen error message. Use:

```text
Something went wrong and your request was not sent. Please try again or contact us directly by phone or email.
```

The form must:

- Validate required fields on the frontend.
- Validate required fields again on the server.
- Use semantic form labels.
- Include accessible error messages.
- Prevent duplicate rapid submissions.
- Show a clear success or failure state.
- Send submissions to `michal@prosealsolutions.ca`.
- Include submitted project details in the email body.
- Include uploaded photos only if they pass validation.

---

## 10. Contact Form Email Delivery

The form must send quote requests to the company email address:

```text
michal@prosealsolutions.ca
```

Email subject:

See `technical/form-requirements.md` (section 10.2) for the authoritative email subject format:

```text
New Quote Request – {Service Type} – {Project Location}
```

Recommended email body structure:

```text
New quote request received from the website.

Name:
Phone:
Email:
Project location:
Type of work:
Message:
Consent confirmed:
Submitted at:
Source page:
```

Email delivery requirements:

- Use a reliable email delivery method.
- Avoid basic unauthenticated PHP `mail()` where possible.
- Configure SPF, DKIM, and DMARC for the sending domain if using domain-based email sending.
- Test delivery to the company inbox before launch.
- Check spam/junk folders during testing.
- Keep a plain-text fallback email body.

Recommended email providers:

- Mailgun
- Postmark
- Resend
- SendGrid
- SMTP service from the company email provider

Choose one based on the final hosting environment and client preference.

---

## 11. Spam Protection Deployment

The PRD requires Cloudflare Turnstile supported by a hidden honeypot field.

### Cloudflare Turnstile

Deployment requirements:

- Add the Turnstile widget to the contact form.
- Verify the Turnstile token server-side before accepting the form submission.
- Reject submissions with missing, invalid, or expired tokens.
- Store the secret key only in server-side environment variables.
- Test successful and failed Turnstile validation before launch.

### Honeypot Field

Add a hidden field that normal users will not complete.

Example field name:

```text
company_website
```

Server-side rule:

- If the honeypot field contains any value, reject or silently discard the submission.

The honeypot should not interfere with screen readers or keyboard users.

---

## 12. Optional Photo Upload Handling

The quote form may allow users to upload photos of their project.

Deployment requirements:

- Photo upload must be optional.
- Allowed file types should be limited.
- File size must be limited.
- Uploaded files must be scanned, validated, or handled conservatively.
- Files must not be executable.
- Files must not be stored publicly without protection.

Recommended limits:

See `technical/form-requirements.md` (section 8.2) for the authoritative upload limits.

```text
Allowed types: JPG, JPEG, PNG, WebP, HEIC if supported
Maximum file size: 5 MB per file
Maximum number of files: 5
```

Recommended handling:

- Validate MIME type server-side.
- Validate file extension server-side.
- Rename uploaded files before storage or email attachment.
- Do not trust original filenames.
- Strip or ignore suspicious metadata where practical.
- Do not allow SVG, HTML, JavaScript, PHP, ZIP, EXE, or scriptable files.

If using email attachments:

- Keep attachment size within email provider limits.
- Include clear fallback text if attachment delivery fails.

If using object storage:

- Store uploads in a private bucket.
- Include secure temporary links in the email.
- Apply automatic expiration or manual retention policy.

---

## 13. WhatsApp Button Deployment

The website must include a visible but non-intrusive WhatsApp contact button.

Recommended behavior:

- On desktop: show as a secondary contact option.
- On mobile: show as a tap-friendly floating or inline button.
- Do not cover form fields, cookie notice buttons, or important CTA buttons.

Pre-filled message:

```text
Hi, I’m interested in your epoxy flooring & floor coating services. Can you provide more information?
```

Implementation notes:

- Use the company phone number in international format.
- Calgary phone number `403-399-4235` should be formatted as `+14033994235` for WhatsApp links.
- URL-encode the pre-filled message.
- Open the WhatsApp conversation in a new tab or app context.

Example URL pattern:

```text
https://wa.me/14033994235?text=Hi%2C%20I%E2%80%99m%20interested%20in%20your%20epoxy%20flooring%20%26%20floor%20coating%20services.%20Can%20you%20provide%20more%20information%3F
```

---

## 14. Performance Deployment Requirements

The website should feel fast on desktop and mobile connections.

Deployment requirements:

- Minify production CSS.
- Minify production JavaScript.
- Avoid unnecessary JavaScript libraries.
- Avoid large animation libraries unless required.
- Avoid video backgrounds in the MVP.
- Use optimized images.
- Lazy-load gallery images below the fold.
- Preload only critical assets.
- Use caching headers for static assets.
- Use CDN delivery where possible.

Recommended performance targets:

```text
Largest Contentful Paint: under 2.5 seconds where practical
Cumulative Layout Shift: under 0.1
Interaction to Next Paint: under 200 ms where practical
Total page weight: keep as low as practical, especially image weight
```

Practical image targets:

```text
Hero image: 1600px wide maximum unless design requires more
Gallery thumbnails: 600px to 900px wide
Full gallery images: 1200px to 1600px wide
Format: WebP or AVIF where supported, JPG fallback if needed
Lazy loading: enabled for gallery images
```

---

## 15. Image and Asset Deployment

Project photos are important for trust and conversion, but they must not slow down the website.

Deployment requirements:

- Compress all project images before deployment.
- Use descriptive filenames.
- Use descriptive alt text.
- Use responsive image sizes where possible.
- Avoid uploading original high-resolution camera files directly to production.
- Keep logo files optimized.
- Use SVG for logos only if the file is clean and safe.

Recommended image filename examples:

```text
epoxy-garage-floor-calgary-after-01.webp
concrete-flake-coating-commercial-floor-after-01.webp
driveway-concrete-restoration-before-01.webp
driveway-concrete-restoration-after-01.webp
```

Alt text examples:

```text
Finished epoxy garage floor coating in Calgary residential garage
Concrete flake floor coating after installation in commercial space
Driveway concrete restoration before repair in Calgary
Driveway concrete restoration after resurfacing in Calgary
```

---

## 16. SEO Deployment Requirements

The production website must include basic local SEO configuration.

Required SEO title:

See `content/seo.md` for the frozen SEO title and meta description.

```text
Epoxy Flooring & Concrete Floor Coatings in Calgary, AB | Pro Seal Solutions
```

Required meta description:

```text
Pro Seal Solutions provides epoxy flooring, garage floor coatings, concrete repair, resurfacing, self-leveling, and concrete surface preparation services in Calgary, Alberta and surrounding areas. Request a free quote today.
```

Deployment checklist:

- Add unique page title.
- Add meta description.
- Add canonical URL.
- Add Open Graph title and description.
- Add Open Graph image if available.
- Add local business contact details in the footer.
- Include Calgary, Alberta in visible content.
- Use proper heading structure.
- Use descriptive image alt text.
- Generate `sitemap.xml`.
- Generate `robots.txt`.
- Submit production URL to Google Search Console after launch.

Recommended `robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://www.prosealsolutions.ca/sitemap.xml
```

Recommended sitemap contents:

```text
https://www.prosealsolutions.ca/
```

Because the MVP is a one-page website, the sitemap may contain only the homepage.

---

## 17. Structured Data

Add basic LocalBusiness structured data if accurate business information is confirmed.

Recommended schema type:

```text
LocalBusiness
```

Potential fields:

- Business name
- URL
- Phone number
- Email address
- Address
- Service area
- Opening hours, if confirmed
- SameAs links, if social profiles exist

Do not add unverified details.

Use the company information from the PRD:

```text
Company: Pro Seal Solutions Inc.
Contact: Michal Simonak
Phone: 403-399-4235
Email: michal@prosealsolutions.ca
Address: 2727 28 Ave SE, Calgary, AB T2B 0L4, Canada
```

> **Decided:** The full street address should NOT be displayed publicly on the website. Use "Calgary, AB" or service-area wording in visible content. The address may still be used in structured data (JSON-LD) and Google Business Profile. See `content/service-areas.md`.

---

## 18. Privacy and Cookie Deployment Requirements

The site must include a privacy policy. No cookie banner is required at launch because no analytics or tracking is enabled.

If analytics, tracking, or third-party cookies are added later, a cookie notice must be added before enabling them.

Deployment requirements:

- Add a privacy policy page or modal. See `content/privacy-policy.md` for the placeholder content.
- Explain what personal information is collected through the quote form.
- Explain why the information is collected.
- Explain how the company uses submitted information.
- Identify third-party tools used for form processing and spam protection.
- Include contact information for privacy questions.

Personal information collected by the form may include:

- Name
- Phone number
- Email address
- Project location
- Project details
- Uploaded project photos

Do not collect unnecessary personal information.

---

## 19. Analytics Deployment

> **Decision:** No analytics at launch. This section applies only if analytics is added post-launch.

If analytics is added later, prefer a privacy-conscious setup.

Possible options:

- Plausible
- Fathom
- Cloudflare Web Analytics
- Google Analytics 4

If analytics is enabled, update:

- Privacy policy to disclose the analytics tool.
- Add a cookie notice if the analytics tool uses cookies.
- Track useful conversion events: quote form submission, phone link click, email link click, WhatsApp button click.

Do not add heavy analytics scripts or advertising pixels unless they are required and disclosed in the privacy/cookie notice.

---

## 20. Accessibility Deployment Checks

Before launch, test the deployed website for basic accessibility.

Checklist:

- All form fields have visible labels.
- Required fields are clearly marked.
- Error messages are readable and connected to the relevant field.
- Keyboard navigation works.
- Focus states are visible.
- Buttons are large enough for touch use.
- Text contrast is strong enough in light and dark mode.
- Images that communicate meaning have alt text.
- Decorative images use empty alt text.
- The page has one clear `h1`.
- Heading order is logical.

Dark mode must not reduce readability or make calls-to-action harder to see.

---

## 21. Browser and Device Testing

Test the deployed website on modern browsers:

- Google Chrome
- Safari
- Microsoft Edge
- Firefox

Test common screen sizes:

- Small mobile phone
- Large mobile phone
- Tablet
- Laptop
- Desktop monitor

Important checks:

- No horizontal scrolling.
- CTA buttons are easy to tap.
- Header and navigation behave correctly.
- Gallery layout does not break.
- Quote form is usable on mobile.
- WhatsApp button does not cover important content.
- Cookie notice does not block the form permanently.
- Dark mode switch works if included.

---

## 22. Security Deployment Checks

Minimum security checklist:

- HTTPS enabled.
- HTTP redirects to HTTPS.
- No secrets in frontend code.
- Form input validated server-side.
- Turnstile verified server-side.
- Honeypot checked server-side.
- Uploaded files restricted and validated.
- File size limits enforced.
- No executable uploads allowed.
- Basic rate limiting added if supported.
- Error responses do not reveal server details.
- Admin-only deployment accounts use strong passwords and MFA where possible.

Recommended HTTP headers where supported:

```text
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Content-Security-Policy
Permissions-Policy
```

Use a Content Security Policy carefully. Do not block required scripts such as Cloudflare Turnstile, analytics, or form endpoints.

---

## 23. Staging and Preview Deployments

Use preview deployments for review before production whenever possible.

Preview deployments should be used to test:

- Layout changes
- Gallery image changes
- Contact form UI
- Dark mode behavior
- SEO metadata rendering
- Page speed
- Browser compatibility

Do not use real production email credentials in public preview environments unless access is restricted.

Recommended staging behavior:

- Send test form submissions to a test inbox.
- Disable indexing using `noindex` or platform-level preview protection.
- Avoid exposing unfinished client content publicly.

---

## 24. Launch Checklist

Complete this checklist before going live.

### Content

- Company name confirmed.
- Logo added.
- Phone number confirmed.
- Email address confirmed.
- Address or service area confirmed.
- Service descriptions finalized.
- Project gallery images optimized.
- Alt text added to meaningful images.
- Privacy policy added.
- Cookie notice added if required.
- Contact form consent text added.

### Technical

- Production build succeeds.
- Website deployed to production hosting.
- Domain connected.
- HTTPS enabled.
- HTTP redirects to HTTPS.
- Contact form submits successfully.
- Email notification received successfully.
- Turnstile validation works.
- Honeypot protection works.
- Optional photo upload works or is disabled until ready.
- WhatsApp button opens correct message.
- Phone link works on mobile.
- Email link opens mail client.

### SEO

- SEO title added.
- Meta description added.
- Canonical URL added.
- Open Graph metadata added.
- `robots.txt` added.
- `sitemap.xml` added.
- Calgary/service-area wording visible on the page.
- Local business details visible in footer or contact section.

### Quality

- Tested on mobile.
- Tested on desktop.
- Tested in Chrome.
- Tested in Safari.
- Tested in Edge.
- Tested in Firefox.
- No console errors.
- No broken images.
- No broken links.
- No major layout shifts.
- Page speed checked.

---

## 25. Post-Launch Checklist

After launch:

- Submit the website to Google Search Console.
- Submit sitemap.
- Verify indexing status.
- Test the form again from the live domain.
- Confirm email deliverability.
- Check spam/junk folder.
- Test phone, email, and WhatsApp links.
- Run a Lighthouse report.
- Review mobile usability.
- Confirm analytics events if analytics is installed.
- Monitor form spam during the first weeks.
- Keep dependencies updated if a framework or package manager is used.

---

## 26. Rollback Plan

A simple rollback process should exist before launch.

Recommended rollback options:

- Use hosting provider deployment history to restore the previous version.
- Keep the last known working Git commit tagged.
- Avoid manual production edits that cannot be tracked.

Recommended Git tag before launch:

```text
v1.0.0-production-launch
```

If a serious issue occurs after deployment:

1. Revert to the last stable deployment.
2. Confirm production loads correctly.
3. Confirm the contact form works.
4. Fix the issue in a new branch.
5. Redeploy after testing.

---

## 27. Maintenance Notes

The site should be easy to maintain without rebuilding the whole project.

Content that should be easy to update:

- Phone number
- Email address
- Service areas
- Service descriptions
- Gallery images
- SEO title and meta description
- Privacy policy
- Cookie notice
- WhatsApp message
- Calls-to-action

Recommended practice:

- Store reusable company details in one config file where possible.
- Store services as structured data or simple content blocks.
- Store gallery image metadata separately from layout code where possible.
- Document how to add, remove, or replace project photos.

---

## 28. MVP Deployment Boundaries

The MVP deployment should not include unnecessary systems.

Out of scope for MVP deployment:

- Customer login
- Online booking
- Payment processing
- Complex quote calculator
- Blog CMS
- Large unoptimized image gallery
- Heavy animation system
- Video backgrounds
- Full multi-page service architecture
- Advanced dashboard

These features may be considered later, but they should not complicate the first production launch.

---

## 29. Developer Notes for AI Agents

When implementing deployment-related code, preserve the project priorities:

1. Fast loading
2. Clear conversion path
3. Reliable contact form
4. Secure form handling
5. Mobile usability
6. Local Calgary SEO
7. Easy maintenance

Do not introduce unnecessary complexity.

Before adding a dependency, ask whether it directly supports the MVP requirements.

Before adding a third-party service, confirm:

- What data it collects
- Whether it affects cookie/privacy notice requirements
- Whether it slows down the website
- Whether it is necessary for the MVP

---

## 30. Final Production Acceptance Criteria

The deployment can be considered acceptable when:

- The site loads over HTTPS on the production domain.
- The page works on desktop, tablet, and mobile.
- The quote form sends a complete email to the company inbox.
- Cloudflare Turnstile and honeypot protection are active.
- Uploaded photos are either safely handled or temporarily disabled.
- Phone, email, and WhatsApp contact options work.
- Gallery images are optimized and lazy-loaded.
- SEO metadata is present.
- Privacy/cookie information is available.
- No major browser console errors appear.
- No obvious mobile layout issues appear.
- The site remains simple enough to update later.
