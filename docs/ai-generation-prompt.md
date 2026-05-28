Build a one-page responsive marketing website for Pro Seal Solutions Inc. using the project specifications in this workspace.

Source of truth: Every decision must be governed by the authoritative file listed in README.md's "Source of Truth by Topic" table. Before writing any code, read every file listed there to load the full specifications. Do not skip any file.

Wording rule: Use exact wording only for values marked Frozen, Final, or Required, and for exact field labels/options. Otherwise, write concise marketing copy grounded in the source files.

Key constraints:

The company does NOT pour new concrete. Never imply otherwise in any copy, caption, or alt text.
Do not display the full street address in visible page content. Use "Calgary, AB" or "Calgary and surrounding areas." If LocalBusiness JSON-LD is added, the full street address may appear only in structured data, not in visible content.
Do not use unconfirmed city lists or province-wide Alberta coverage claims. If listing service areas, use "Calgary and surrounding areas" or only confirmed Calgary-area communities from service-areas.md.
No analytics or cookie banner at launch.
The privacy policy is a placeholder — link to it but note it is not final.
Do not add nice-to-have or out-of-scope features unless explicitly requested, including: testimonials, Google Maps embed, dark mode toggle, blog, quote calculator, separate service pages, booking system, payment processing, or heavy animations.
What to build (read each file for full details):

Page structure — Hero → Services → About/Trust → Projects Gallery → Quote/Contact Form → Footer (per pro-seal-solutions-inc_prd.md §5–§11, §17).

SEO — Use the frozen H1, title, and meta description from seo.md exactly. Use exactly one H1 on the page. Use proper heading hierarchy and descriptive image alt text. Use #quote as the canonical anchor for the quote/contact section — do not use #contact as a separate anchor.

Design — Minimalistic, industrial-modern palette from PRD §14: off-white #F4F1EC, concrete gray #E6E2DC, charcoal text #242424, secondary text #5F5F5A, terracotta accent #B86B4B, accent hover #8E4F36, graphite footer #1E1F1C. Avoid bright blue, neon, pure black backgrounds, or low-contrast combinations.

Services — List five services in the exact order and wording from services.md.

Contact form — Use form-requirements.md as the authoritative source for form behavior, validation rules, upload limits (max 5 files, 5 MB each, 15 MB total; JPG/JPEG/PNG/WebP/HEIC/PDF), spam protection (Cloudflare Turnstile + hidden honeypot), rate limiting, and email handling. Use contact.md for labels, placeholders, CTA text, consent copy, dropdown options, and success/error messaging.

Gallery — Six sub-projects in the exact display order from projects.md. Do not invent before/after pairs, image statuses, captions, or alt text — use the actual project titles, statuses (after, in-progress, detail), suggested captions, and suggested alt text from that file. Use optimized images per image-optimization.md (WebP/AVIF with JPG fallback, responsive srcset at 480/800/1200/1600px widths, lazy loading).

WhatsApp button — Visible but non-intrusive. Use the exact WhatsApp label, pre-filled message, and confirmed number from contact.md (label: "Message Us on WhatsApp", number: 403-399-4235, pre-filled message as specified there).

Logos — logo.png for header/footer, logo-square-fit.png for favicon/mobile per logos.md. Maintain aspect ratio, set width/height attributes.

Footer — Company name, phone (tel: link), email (mailto: link), service area wording, privacy policy link.

Technical — HTTPS, mobile-first responsive, fast loading, no unnecessary JS libraries, accessible (contrast, keyboard nav, alt text, form labels), browser support for Chrome/Safari/Edge/Firefox. Preferred deployment architecture: static hosting + serverless form handler per deployment-notes.md.
