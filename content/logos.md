# Logos / Branding Assets

This file maps the logo assets for the Pro Seal Solutions Inc. website.

Purpose:
- Help the AI agent understand which logo files are available.
- Define where each logo should be used.
- Prevent logo files from being confused with project/gallery images.
- Provide suggested alt text and implementation notes.

Important:
- Logo files are branding assets, not gallery/project photos.
- Do not display logo files inside the projects gallery.
- Do not treat logo files as examples of epoxy flooring, concrete coatings, or restoration work.
- Use logo files only for branding, website identity, favicon/app icons, and social preview assets if suitable.

---

## Available Logo Files

| File | Role | Recommended Use |
|---|---|---|
| `assets/logo/logo.png` | Primary logo | Hero section, social preview |
| `assets/logo/logo-square-fit.png` | Square/compact logo | App icon source (`apple-touch-icon`), social media profile image |
| `assets/logo/favicon-p.png` | Favicon — 64×64 "P" mark | Browser tab favicon (64 px), privacy-policy header P icon |
| `assets/logo/favicon-p-32.png` | Favicon — 32×32 "P" mark | Browser tab favicon (32 px) |
| `assets/logo/logo-footer.png` | Footer logo — background-matched | Footer branding only |
| `assets/logo/logo-mark.png` | Header logo — tiny phone | index.html header at ≤360px (P mark variant) |
| `assets/logo/logo-mobile.png` | Header logo — mobile/tablet | index.html header at ≤1023px |
| `assets/logo/logo-one-line-header.png` | Header logo — desktop | index.html header at >1023px (default) |

### How derived assets were created

**`favicon-p.png` / `favicon-p-32.png`**
Extracted from `logo-square-fit.png` using Python/Pillow. The stylized "P" mark was located at pixel bounds approximately top=216, bottom=308, left=303, right=404 in the 703×708 source image. A 160×160 crop centered on the P was padded with the header/footer background color `#1E1F1C` (rgb 30,31,28) and resized to 64×64 and 32×32 respectively. Reason: the full circle logo is too detailed to be legible at favicon sizes.

**`logo-footer.png`**
Created from `logo-square-fit.png` using Python/Pillow pixel shifting. The source file's background was `#121314` (rgb 18,19,20), which did not match the footer background `#1E1F1C` (rgb 30,31,28). Every pixel was shifted by `+12R, +12G, +8B`; white content pixels clamp unchanged. The result exactly matches the footer background so the logo appears seamlessly embedded.

---

# Primary Logo

File:
`assets/logo/logo.png`

Recommended use:
- Hero section if needed
- Social preview image base if it fits the layout

Suggested role:
Primary brand logo (not used in header or footer — see sections below)

Suggested alt text:
Pro Seal Solutions Inc. logo

Implementation notes:
- If the logo has a transparent background, preserve transparency.
- Do not stretch, squash, crop, or distort the logo.
- Maintain original aspect ratio.
- Add proper width and height attributes in final website code to prevent layout shift.
- Do not use this logo as a project/gallery image.
- Do not use this logo as a background pattern.

---

## Logo Usage by Website Area

### Header

**index.html** uses a responsive `<picture>` element with three purpose-built
image variants. The `.site-logo` anchor wraps the `<picture>`; `.site-logo__img`
controls height.

```html
<a href=”#” class=”site-logo” aria-label=”Pro Seal Solutions Inc. — Home”>
  <picture>
    <source media=”(max-width: 360px)” srcset=”/assets/logo/logo-mark.png” width=”300” height=”188”>
    <source media=”(max-width: 1023px)” srcset=”/assets/logo/logo-mobile.png” width=”1275” height=”188”>
    <img class=”site-logo__img” src=”/assets/logo/logo-one-line-header.png”
         alt=”” aria-hidden=”true” width=”1814” height=”188”>
  </picture>
</a>
```

| Breakpoint | File served | Display height |
|---|---|---|
| ≤360px | `logo-mark.png` | 34px |
| ≤768px | `logo-mobile.png` | 36px |
| ≤1023px | `logo-mobile.png` | 40px |
| >1023px | `logo-one-line-header.png` | 44px |

**privacy-policy.html** retains the text-based logo approach (P icon +
HTML text spans with Montserrat):

```html
<a href=”/” class=”site-logo” aria-label=”Pro Seal Solutions Inc.”>
  <img class=”site-logo__mark” src=”/assets/logo/favicon-p.png” alt=”” aria-hidden=”true”>
  <span class=”site-logo__main”>RO SEAL SOLUTIONS INC.</span>
  <span class=”site-logo__tagline”>CONCRETE AND EPOXY</span>
</a>
```

Notes:
- Montserrat (Google Fonts, weights 300/500/700/800) is loaded on both pages
  because `privacy-policy.html` requires it for the text logo.
- The three header image files (`logo-mark.png`, `logo-mobile.png`,
  `logo-one-line-header.png`) must only be used in the header `<picture>`.
- `favicon-p.png` is no longer used as the header P icon in `index.html`.

### Hero Section

Preferred file: `assets/logo/logo.png`

Usage: Optional if the logo is already visible in the header. Prioritize the headline, service message, and quote button.

### Footer

Preferred file: `assets/logo/logo-footer.png`

**Do not use** `logo.png`, `logo-square-fit.png`, or `favicon-p.png` in the footer.

Usage:
- Display at `height: 190px; width: auto` on desktop inside a flex row alongside the company description paragraph.
- On mobile (≤768px) the brand section switches to `flex-direction: column` and the logo shrinks to `130px` (≤380px: `100px`).
- `logo-footer.png` has its background pre-matched to the footer color `#1E1F1C`. It must not be used on any other background.
- `.footer-brand` layout: `display: flex; align-items: center; gap: 1.75rem` (desktop); `flex-direction: column; align-items: flex-start; gap: 1rem` on mobile.
- Description text appears to the right of the logo on desktop with `font-size: .875rem; color: rgba(244,241,236,.55); max-width: 280px`. On mobile the `max-width` is removed and text fills the full column.

Suggested alt text: `Pro Seal Solutions Inc. logo`

```html
<div class=”footer-brand”>
  <a href=”/” aria-label=”Pro Seal Solutions Inc. — go to homepage” class=”footer-logo-link”>
    <img src=”/assets/logo/logo-footer.png” alt=”Pro Seal Solutions Inc. logo” width=”703” height=”708”>
  </a>
  <p>Epoxy flooring, concrete coatings, repair, resurfacing, self-leveling, and surface preparation services in Calgary, Alberta and surrounding areas.</p>
</div>
```

---

# Square-Fit Logo

File:
`assets/logo/logo-square-fit.png`

Recommended use:
- Favicon source if suitable
- App icon source if suitable
- Mobile header if the primary logo is too wide
- Social media profile image
- Small branding areas
- Footer compact logo
- Compact card or badge layouts
- Open Graph/social preview image base if needed

Suggested role:
Compact / square logo version

Suggested alt text:
Pro Seal Solutions Inc. square logo

Suggested image label:
Square logo

Implementation notes:
- Use this version where a square or compact format is required.
- Good candidate for favicon or mobile display, but verify visual clarity at small sizes.
- Check readability at 32x32, 48x48, 180x180, 192x192, and 512x512 sizes.
- Do not use this in the main header if the full primary logo works better.
- Maintain original aspect ratio.
- Do not stretch, squash, crop, or distort the logo.
- Do not crop further unless needed for favicon generation.
- Do not use this logo as a project/gallery image.
- Do not use this logo as a background pattern.

Recommended HTML usage:

```html
<img 
  src="/assets/logo/logo-square-fit.png" 
  alt="Pro Seal Solutions Inc. square logo" 
/>
```

Alternative accessible usage when the company name appears as visible text beside the logo:

```html
<img 
  src="/assets/logo/logo-square-fit.png" 
  alt="" 
  aria-hidden="true" 
/>
```

Use empty alt text only when “Pro Seal Solutions Inc.” is already visible as real text near the logo.

---

## Square-Fit Logo Usage by Website Area

### Mobile Header

Preferred file:
`assets/logo/logo-square-fit.png`

Use when:
- The primary logo is too wide for the mobile header.
- The mobile header needs a compact brand mark.
- The phone/quote buttons need more horizontal space.

Do not use when:
- The primary logo remains readable and fits cleanly.

Suggested alt text:
Pro Seal Solutions Inc. square logo

### Favicon / App Icons

**Current implementation (finalized):**

```html
<link rel="icon" type="image/png" sizes="64x64" href="/assets/logo/favicon-p.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo/favicon-p-32.png">
<link rel="apple-touch-icon" href="/assets/logo/logo-square-fit.png">
```

- `favicon-p.png` (64×64) and `favicon-p-32.png` (32×32): extracted "P" mark, background `#1E1F1C`
- `logo-square-fit.png`: used only for `apple-touch-icon` (180×180 display, full circle logo)
- The full square logo is NOT used as the browser-tab favicon because it is too detailed at small sizes.

Implementation notes:
- Do not replace `favicon-p.png` with `logo-square-fit.png` as the primary favicon.
- If a new favicon is needed in the future, extract the P mark from the updated source logo and recreate using the same Python/Pillow process.

### Social Media Profile Image

Preferred file:
`assets/logo/logo-square-fit.png`

Usage:
- Use for profile/avatar-style placements.
- Confirm the logo remains readable after circular cropping.
- Add padding around the logo if the platform crops the image into a circle.

Suggested alt text:
Pro Seal Solutions Inc. square logo

### Compact Footer Branding

Preferred file:
`assets/logo/logo-square-fit.png`

Use when:
- The footer layout has limited horizontal space.
- The full logo is hard to read on the footer background.
- The company name is written separately as text.

Suggested alt text:
Pro Seal Solutions Inc. square logo

---

# Social Sharing / Open Graph Image

Preferred source:
`assets/logo/logo.png`

Alternative source:
`assets/logo/logo-square-fit.png`

Recommended output:
`assets/social/og-image.jpg`  
or  
`assets/social/og-image.webp`

Suggested Open Graph image content:
- Logo
- Company name
- Short service phrase:
  “Epoxy Flooring & Concrete Surface Restoration”
- Calgary, Alberta

Suggested dimensions:
- 1200 x 630 px

Implementation notes:
- Do not use only the raw logo file as the Open Graph image unless it has proper spacing and background.
- Create a dedicated social preview image if possible.
- Use the primary logo if the layout is horizontal.
- Use the square logo if the design uses a centered or compact composition.

---

# Logo Optimization Notes

Before publishing:
- Compress PNG files if needed.
- Use SVG if an official vector logo is available.
- Keep PNG versions for fallback.
- Preserve transparent background if present.
- Avoid uploading oversized logo files to production if smaller optimized versions work.
- Define image dimensions in code to avoid layout shift.
- Use descriptive alt text where the logo communicates brand identity.
- Use empty alt text only when visible nearby text already identifies the company.

Recommended production formats:
- SVG for logo if an official vector version is available
- PNG for transparent raster logo fallback
- WebP only if transparency and quality are preserved correctly

---

# Accessibility Notes

Recommended logo alt text:
`Pro Seal Solutions Inc. logo`

Recommended square logo alt text:
`Pro Seal Solutions Inc. square logo`

Do not use vague alt text:
- `logo`
- `company logo`
- `image`
- `brand image`
- `picture`

If the logo appears next to visible text saying “Pro Seal Solutions Inc.”, the logo may use empty alt text:

```html
<img src="/assets/logo/logo.png" alt="" aria-hidden="true" />
```

This prevents screen readers from reading the company name twice.

---

# Logo Usage Rules for AI Agent

Use:
- `assets/logo/logo-one-line-header.png` — index.html header, desktop (>1023px)
- `assets/logo/logo-mobile.png` — index.html header, mobile/tablet (≤1023px)
- `assets/logo/logo-mark.png` — index.html header, tiny phone (≤360px)
- `assets/logo/favicon-p.png` — privacy-policy.html header P icon; browser favicon (64 px)
- `assets/logo/favicon-p-32.png` — browser favicon (32 px)
- `assets/logo/logo-footer.png` — footer logo only (190 px desktop / 130 px tablet-phone / 100 px tiny phone, background `#1E1F1C`)
- `assets/logo/logo-square-fit.png` — `apple-touch-icon` only; social media profile image
- `assets/logo/logo.png` — hero section, social preview

Do not:
- Use `logo.png` or `logo-square-fit.png` in the header.
- Use the header image files (`logo-mark.png`, `logo-mobile.png`, `logo-one-line-header.png`) outside the header `<picture>` element.
- Use `logo-square-fit.png` as the footer logo — use `logo-footer.png` instead.
- Use `logo-footer.png` on any background other than `#1E1F1C` (it was pixel-shifted to match that exact color).
- Use `logo.png` or `logo-square-fit.png` as the browser tab favicon — use the `favicon-p` files.
- Treat logo files as project/gallery images.
- Display logo files in the projects gallery.
- Rename the company.
- Recreate or redesign the logo unless explicitly requested.
- Stretch, squash, crop, or distort any logo file.
- Use any logo as a background pattern.
- Use any logo instead of real project photos.
- Describe any logo as epoxy flooring, concrete coating, or restoration work.

Final decision rule by placement:
- index.html header: `<picture>` with `logo-one-line-header.png` (desktop) / `logo-mobile.png` (≤1023px) / `logo-mark.png` (≤360px)
- privacy-policy.html header: text logo with `favicon-p.png` P icon + Montserrat text spans
- Footer: `logo-footer.png` at 190 px (desktop); 130 px (≤768 px); 100 px (≤380 px)
- Browser favicon: `favicon-p.png` (64 px) + `favicon-p-32.png` (32 px)
- Apple touch icon: `logo-square-fit.png`
- Social / OG preview: `logo.png` or compose a dedicated OG image