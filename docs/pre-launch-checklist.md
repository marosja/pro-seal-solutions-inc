# Pre-Launch Checklist

Items that must be completed before the website goes live.

## Required before deploying to production

- [ ] **Replace Turnstile test key** — In `src/index.html`, replace the placeholder sitekey `1x00000000000000000000AA` in the `<div class="cf-turnstile">` widget with the real production sitekey from the Cloudflare Turnstile dashboard.

- [ ] **Set Cloudflare Pages environment variables** — In the Cloudflare Pages project settings, add the following environment variables:
  - `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key (from Turnstile dashboard)
  - `EMAIL_PROVIDER_API_KEY` — Resend API key (from resend.com)
  - `CONTACT_EMAIL_TO` — Recipient address for quote request emails (e.g. `michal@prosealsolutions.ca`)
  - `CONTACT_EMAIL_FROM` — Verified sender address (e.g. `website@prosealsolutions.ca`)
  - `SITE_URL` — Production URL (e.g. `https://www.prosealsolutions.ca`)

- [ ] **Legal review of privacy policy** — Have a qualified legal professional review `src/privacy-policy.html` to confirm it meets Canadian (PIPEDA) and Alberta (PIPA) privacy requirements. Remove the placeholder notice banner at the top of the page once the policy is approved.

- [ ] **Verify Resend sender domain** — The `CONTACT_EMAIL_FROM` domain must be verified in Resend before transactional emails will deliver. Follow Resend's DNS verification steps for `prosealsolutions.ca`.

## Recommended before launch

- [ ] **Test form end-to-end** — Submit the quote form on the live staging URL and confirm the email arrives at `CONTACT_EMAIL_TO` with correct content, reply-to address, and any attached photos.
- [ ] **Confirm Turnstile works** — Verify the challenge renders and completes successfully with the production sitekey.
- [ ] **Check Open Graph preview** — Use a link preview tool (e.g. opengraph.xyz) to confirm the OG title, description, and image render correctly when the URL is shared.
- [ ] **Validate structured data** — Run the homepage through Google's Rich Results Test to confirm the LocalBusiness JSON-LD is valid.
- [ ] **Set Cloudflare Pages publish directory** — In the Pages build settings, set the root/publish directory to `src` so the deployed site root is `src/index.html`.
