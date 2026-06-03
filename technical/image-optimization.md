# Technical File: Image Optimization

## File name

`image-optimization.md`

## Project

Pro Seal Solutions Inc. — one-page website for epoxy flooring, concrete coatings, concrete repair, resurfacing, floor leveling, and concrete surface preparation services.

## Purpose

This file defines how all website images must be prepared, exported, named, served, and tested.

The goal is to keep the website visually strong while maintaining fast loading speed, good mobile usability, strong local SEO, and simple future maintenance.

The website will rely heavily on project photos, especially the projects gallery. Images must therefore be optimized before they are added to the site.

---

## 1. Source PRD Requirements Covered

This technical file expands the PRD requirements related to:

- Projects gallery photos
- Before/after photos
- Mobile-friendly image layout
- Image quality and loading speed
- Compressed images
- Modern image formats
- Lazy-loaded gallery images
- Optimized assets
- Image alt text
- Local SEO support
- Mobile usability
- MVP scope requirement to avoid a large unoptimized gallery

---

## 2. Image Optimization Goals

Images must satisfy four goals:

1. **Visual quality**
   - Photos should look clean, sharp, and professional.
   - Epoxy flooring, flake coating, concrete restoration, and surface preparation work must be easy to see.
   - Images must not look blurry, stretched, pixelated, or heavily compressed.

2. **Fast loading**
   - Images must be compressed before upload.
   - The browser should receive only the image size it needs for the current screen.
   - Gallery images should not block initial page loading.

3. **Mobile-first usability**
   - Images must display correctly on mobile, tablet, and desktop.
   - Gallery layout must not cause horizontal scrolling.
   - Tap targets for gallery images must be easy to use on mobile.

4. **SEO and accessibility**
   - Meaningful images must have descriptive `alt` text.
   - File names should describe the service, project type, and location when relevant.
   - Decorative images should not create unnecessary accessibility noise.

---

## 3. Image Inventory Required for MVP

The MVP gallery must include the project photos defined in `content/projects.md` (the authoritative gallery mapping).

| Gallery group | Required images | Type |
|---|---:|---|
| Epoxy flooring (commercial) | 8 photos | After + in-progress photos |
| Concrete flake coating (residential) | 6 photos | After + detail photos |
| Driveway restoration | 4 photos | 2 in-progress + 2 after |
| Stairs restoration | 2 photos | 1 in-progress + 1 after |
| **Total minimum** | **20 photos** | Gallery images |

> **Note:** Driveway and stairs are separate sub-projects under the `assets/driveway-and-stairs-restoration/` source folder. See `content/projects.md` for the exact image-to-project mapping.

### Required image groups

```text
assets/images/projects/epoxy-flooring/
assets/images/projects/concrete-flake-coating/
assets/images/projects/driveway-restoration/
assets/images/projects/stairs-restoration/
```

### Optional supporting images

Additional images may be used for:

- Hero background or hero project photo
- About/trust section
- Service cards
- Social sharing image
- Logo and favicon

Do not add a large extra gallery in the MVP unless the images are optimized and the layout remains fast.

---

## 4. Image Types and Recommended Formats

### 4.1 Source images

Original high-resolution photos should be stored separately and should not be served directly on the website.

Recommended source folder:

```text
assets/source-images/
```

Source files may be:

- `.jpg`
- `.jpeg`
- `.png`
- `.heic`
- `.tiff`
- Camera originals

Source images are for editing and future export only.

### 4.2 Production images

Production images are the optimized files used by the website.

Recommended production folder:

```text
assets/images/
```

Use these formats:

| Image use | Preferred format | Fallback format | Notes |
|---|---|---|---|
| Project photos | AVIF or WebP | JPG | Use responsive sizes |
| Hero photo | AVIF or WebP | JPG | Should be highly optimized |
| Logo | SVG | PNG | SVG preferred for sharp scaling |
| Icons | SVG | PNG only if needed | Avoid large icon files |
| Favicon | ICO / PNG / SVG | — | Provide standard favicon assets |
| Open Graph image | JPG or WebP | JPG | Use `1200x630` export |

### 4.3 Formats to avoid on the website

Do not serve these directly in production:

- `.heic`
- `.tiff`
- Camera-original `.jpg` files
- Large transparent `.png` photos
- Uncompressed screenshots
- Large animated GIFs

---

## 5. Recommended Image Sizes

The website should generate multiple sizes for each important photo.

### 5.1 Gallery photos

For each gallery image, export these widths:

```text
480w   mobile thumbnail / small mobile view
800w   mobile large / tablet card
1200w  desktop gallery card / lightbox preview
1600w  maximum large display version
```

Recommended maximum dimensions:

| Image version | Width | Typical use | Target file size |
|---|---:|---|---:|
| Small | 480 px | Mobile thumbnails | 40–90 KB |
| Medium | 800 px | Mobile/tablet cards | 70–150 KB |
| Large | 1200 px | Desktop cards | 120–250 KB |
| Extra large | 1600 px | Lightbox / detailed view | 180–350 KB |

### 5.2 Hero image

If a hero image is used, export:

```text
768w
1280w
1920w
```

Recommended target file sizes:

| Hero version | Width | Target file size |
|---|---:|---:|
| Mobile | 768 px | 80–180 KB |
| Tablet / laptop | 1280 px | 150–300 KB |
| Desktop | 1920 px | 250–500 KB |

The hero image must not be a large uncompressed background image.

### 5.3 Service card images

If service cards use photos, export:

```text
480w
800w
```

Target file size:

```text
50–160 KB per image
```

### 5.4 Logo

Preferred logo format:

```text
logo.svg
```

Fallback exports:

```text
logo-256.png
logo-512.png
```

Target file size:

```text
SVG: ideally under 30 KB
PNG fallback: ideally under 80 KB
```

### 5.5 Social sharing image

Recommended Open Graph image:

```text
assets/images/social/pro-seal-solutions-og.jpg
```

Required dimensions:

```text
1200x630 px
```

Target file size:

```text
150–300 KB
```

---

## 6. Cropping and Aspect Ratios

### 6.1 Gallery cards

Use consistent aspect ratios so the gallery looks clean.

Recommended gallery card ratio:

```text
4:3 or 3:2
```

Use one ratio consistently within the same gallery section.

### 6.2 Before/after images

Before/after image pairs must use matching dimensions and crop position.

Required:

- Same width
- Same height
- Same aspect ratio
- Similar camera angle where possible
- Same project label
- Clear `before` and `after` naming

Example:

```text
pro-seal-driveway-restoration-calgary-before-01-800.webp
pro-seal-driveway-restoration-calgary-after-01-800.webp
```

### 6.3 Avoid poor cropping

Do not crop out:

- Main finished floor area
- Visible repair area
- Edges showing workmanship
- Before/after comparison details
- Important context such as garage, shop, basement, or driveway surface

---

## 7. File Naming Rules

Image file names must be descriptive, lowercase, and separated with hyphens.

### 7.1 Required naming pattern

```text
pro-seal-[service-or-project]-[location-or-context]-[state]-[number]-[width].[format]
```

### 7.2 Examples

```text
pro-seal-epoxy-flooring-calgary-after-01-480.avif
pro-seal-epoxy-flooring-calgary-after-01-480.webp
pro-seal-epoxy-flooring-calgary-after-01-800.webp
pro-seal-concrete-flake-coating-garage-after-03-1200.webp
pro-seal-driveway-restoration-calgary-before-01-800.webp
pro-seal-driveway-restoration-calgary-after-01-800.webp
```

### 7.3 Naming rules

Use:

- Lowercase letters
- Hyphens instead of spaces
- Service-related keywords
- Location where useful, especially `calgary`
- `before` / `after` labels where relevant
- Sequential numbers with two digits: `01`, `02`, `03`

Avoid:

- Spaces in file names
- Random camera names such as `IMG_4829.jpg`
- Long unclear file names
- Special characters
- Duplicate names
- Uppercase extensions

---

## 8. Folder Structure

> **Note:** The folder structure below is the **recommended production layout**, not the current source asset layout. The current source images are stored in:
>
> - `assets/epoxy-commercial/project-1-warehouse-building/`
> - `assets/epoxy-commercial/project-2-commercial-building/`
> - `assets/concrete-flake-coating-residential/project-1-garage/`
> - `assets/concrete-flake-coating-residential/project-2-garage/`
> - `assets/driveway-and-stairs-restoration/driveway/`
> - `assets/driveway-and-stairs-restoration/stairs/`
>
> During the build process, source images should be optimized, renamed, and output into the production folder structure below.

Recommended production folder structure:

```text
assets/
  source-images/
    epoxy-flooring/
    concrete-flake-coating/
    driveway-restoration/
    stairs-restoration/
  images/
    logo/
    hero/
    services/
    projects/
      epoxy-flooring/
      concrete-flake-coating/
      driveway-restoration/
      stairs-restoration/
    social/
    favicon/
```

Example production structure:

```text
assets/images/projects/epoxy-flooring/
  pro-seal-epoxy-flooring-calgary-after-01-480.avif
  pro-seal-epoxy-flooring-calgary-after-01-800.avif
  pro-seal-epoxy-flooring-calgary-after-01-1200.avif
  pro-seal-epoxy-flooring-calgary-after-01-1600.avif
  pro-seal-epoxy-flooring-calgary-after-01-480.webp
  pro-seal-epoxy-flooring-calgary-after-01-800.webp
  pro-seal-epoxy-flooring-calgary-after-01-1200.webp
  pro-seal-epoxy-flooring-calgary-after-01-1600.webp
```

---

## 9. Responsive Image Implementation

### 9.1 Use responsive image markup

Use `<picture>` for important project images so modern formats can be served first.

Example:

```html
<picture>
  <source
    type="image/avif"
    srcset="
      /assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-480.avif 480w,
      /assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-800.avif 800w,
      /assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-1200.avif 1200w,
      /assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-1600.avif 1600w
    "
    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 33vw"
  >
  <source
    type="image/webp"
    srcset="
      /assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-480.webp 480w,
      /assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-800.webp 800w,
      /assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-1200.webp 1200w,
      /assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-1600.webp 1600w
    "
    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 33vw"
  >
  <img
    src="/assets/images/projects/epoxy-flooring/pro-seal-epoxy-flooring-calgary-after-01-800.jpg"
    alt="Finished epoxy garage floor coating by Pro Seal Solutions in Calgary"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
  >
</picture>
```

### 9.2 Use explicit dimensions

Every `<img>` should include width and height attributes.

Required:

```html
width="800"
height="600"
```

This helps prevent layout shift while images load.

### 9.3 Use lazy loading

Use lazy loading for gallery images below the first visible screen.

Required for gallery images:

```html
loading="lazy"
decoding="async"
```

Do not lazy-load the main hero image if it is the largest visible image at the top of the page.

### 9.4 Prioritize the hero image

If the hero image is the Largest Contentful Paint image, it should be loaded early.

Recommended:

```html
<img
  src="/assets/images/hero/pro-seal-epoxy-flooring-hero-1280.webp"
  alt="Durable epoxy floor coating installed by Pro Seal Solutions"
  width="1280"
  height="720"
  fetchpriority="high"
  decoding="async"
>
```

Only one image should use `fetchpriority="high"`.

---

## 10. Lazy Loading and Gallery Behavior

### 10.1 Initial page load

The initial page load should not load all full-size gallery images at once.

Required behavior:

- Load only images needed above the fold immediately.
- Lazy-load gallery images lower on the page.
- Use thumbnail/card-sized images in the visible gallery grid.
- Load larger image versions only when needed for lightbox or expanded view.

### 10.2 Lightbox behavior

If a lightbox is used:

- Do not preload every large image on initial page load.
- Load the selected image on demand.
- Optionally preload only the next and previous image after the lightbox opens.
- Keep keyboard navigation accessible.
- Provide visible close controls.

### 10.3 Before/after slider behavior

A before/after slider is nice-to-have, not required for MVP.

If used:

- Use optimized before and after images.
- Do not use heavy slider libraries for one small feature.
- Make the slider usable on touch devices.
- Provide labels: `Before` and `After`.
- Provide text alternative near the slider explaining the result.

---

## 11. Alt Text Requirements

### 11.1 General rule

Alt text should describe the actual image content and service shown.

Good alt text should include:

- Service type
- Surface or location type
- Project result
- Calgary or surrounding area when natural

### 11.2 Good alt text examples

```text
Finished epoxy garage floor coating by Pro Seal Solutions in Calgary
Concrete flake floor coating installed in a residential garage
Driveway concrete restoration before repair in Calgary
Driveway concrete restoration after resurfacing by Pro Seal Solutions
Smooth self-leveling concrete surface prepared for floor coating
Concrete surface grinding and preparation before epoxy coating
```

### 11.3 Bad alt text examples

```text
image
photo
floor
garage
IMG_1234
nice epoxy
project picture
```

### 11.4 Decorative images

If an image is purely decorative and adds no useful information, use empty alt text:

```html
alt=""
```

Do not use empty alt text for project photos, service images, or before/after examples.

---

## 12. Image SEO Requirements

Images should support the website’s local SEO strategy without keyword stuffing.

### 12.1 File names

Use service and location terms naturally:

```text
epoxy-flooring-calgary
concrete-floor-coating-calgary
garage-floor-coating-calgary
concrete-resurfacing-calgary
concrete-surface-preparation-calgary
```

### 12.2 Alt text

Alt text should be descriptive, not overloaded with repeated keywords.

Good:

```text
Finished epoxy garage floor coating installed by Pro Seal Solutions in Calgary
```

Bad:

```text
epoxy flooring Calgary epoxy floor coating Calgary garage epoxy Calgary concrete coatings Calgary
```

### 12.3 Image context

Images should be placed near relevant headings and text.

Example:

- Epoxy flooring photos should appear near the epoxy flooring gallery or service content.
- Driveway restoration before/after photos should appear near concrete repair or resurfacing content.

---

## 13. Compression Requirements

### 13.1 Quality targets

Recommended export quality:

| Format | Suggested quality | Notes |
|---|---:|---|
| AVIF | 45–60 | Best compression, test visual quality |
| WebP | 70–82 | Good balance for project photos |
| JPG | 72–82 | Use only as fallback when needed |
| PNG | Use only when required | Avoid for large photos |

### 13.2 Visual quality check

After compression, check:

- Edges of floor coating flakes
- Gloss and reflection areas
- Cracks and repair detail
- Concrete texture
- Dark garage/shop corners
- Smooth gradients in epoxy floors

Reject images if compression creates:

- Blocky artifacts
- Washed-out color
- Unnatural banding
- Blurry texture
- Broken detail in dark areas

---

## 14. Image Metadata and Privacy

### 14.1 Remove unnecessary metadata

Before publishing, remove metadata that is not needed for the website.

Remove:

- Camera EXIF data
- GPS coordinates
- Personal device information
- Unnecessary editing metadata

### 14.2 Protect customer privacy

Do not publish images that show:

- License plates
- House numbers, if privacy-sensitive
- Customer faces, unless approved
- Personal items that should not be public
- Documents, invoices, or private information

Blur or crop sensitive details before optimization.

### 14.3 Quote form upload images

Images uploaded by users through the quote form must not be used in the public gallery unless the company has explicit permission.

Uploaded quote images are customer-submitted project information and should be treated as private business communication.

---

## 15. Optional Photo Upload in Quote Form

The quote form may allow customers to upload project photos.

Recommended requirements:

See `technical/form-requirements.md` (section 8.2) for the authoritative upload limits.

```text
Allowed file types: jpg, jpeg, png, webp, heic
Maximum files: 5
Maximum file size per file: 5 MB
Maximum total upload size: 15 MB
```

### Upload handling requirements

- Validate file type on client and server.
- Validate file size on client and server.
- Do not trust file extensions alone.
- Show clear error messages for rejected files.
- Send uploaded photos securely through the form backend or store securely if required.
- Do not expose uploaded files publicly.
- Do not use uploaded images in the gallery without explicit permission.

### Optional client-side optimization

If technically feasible, large customer upload images may be resized client-side before upload.

Suggested client-side resize limit:

```text
Maximum width: 2000 px
Maximum height: 2000 px
Quality: 0.75–0.85
```

Client-side optimization must not replace server-side validation.

---

## 16. Performance Targets

The website should feel fast on desktop and mobile connections.

### 16.1 Image-related targets

Recommended image performance targets:

| Metric | Target |
|---|---:|
| Initial page image payload | Under 1 MB preferred |
| Total gallery payload on initial load | Avoid loading full gallery upfront |
| Individual gallery card image | Usually under 150 KB |
| Large lightbox image | Usually under 350 KB |
| Hero image | Usually under 500 KB |
| Layout shift caused by images | None or minimal |

### 16.2 Page behavior

Required:

- Do not load all 1600w gallery images on page load.
- Do not use video backgrounds in the MVP.
- Do not use heavy animation libraries only for image effects.
- Use compressed images in modern formats.
- Use responsive image sizes.
- Use lazy loading for below-the-fold images.

---

## 17. Caching and Delivery

### 17.1 Cache headers

Production image files should use long-term browser caching where possible.

Recommended:

```text
Cache-Control: public, max-age=31536000, immutable
```

Use this only when file names change when image content changes.

Example:

```text
pro-seal-epoxy-flooring-calgary-after-01-800.v2.webp
```

or use build-generated hashed names:

```text
pro-seal-epoxy-flooring-calgary-after-01-800.a8f3c1.webp
```

### 17.2 CDN

If the hosting platform provides a CDN, images should be served through it.

Preferred behavior:

- Fast delivery in Canada
- Automatic compression support if available
- HTTP/2 or HTTP/3 support
- Proper caching

Do not rely only on CDN optimization. Images should still be exported properly before upload.

---

## 18. Build-Time Image Processing

If the website uses a modern build tool or static site generator, image optimization should be automated.

Recommended build steps:

1. Read source image.
2. Resize to required widths.
3. Export AVIF.
4. Export WebP.
5. Export JPG fallback if needed.
6. Remove metadata.
7. Output files into production image folders.
8. Generate or update image references.

### Example output set

For one source image:

```text
source:
  epoxy-flooring-after-01.jpg

output:
  pro-seal-epoxy-flooring-calgary-after-01-480.avif
  pro-seal-epoxy-flooring-calgary-after-01-800.avif
  pro-seal-epoxy-flooring-calgary-after-01-1200.avif
  pro-seal-epoxy-flooring-calgary-after-01-1600.avif
  pro-seal-epoxy-flooring-calgary-after-01-480.webp
  pro-seal-epoxy-flooring-calgary-after-01-800.webp
  pro-seal-epoxy-flooring-calgary-after-01-1200.webp
  pro-seal-epoxy-flooring-calgary-after-01-1600.webp
```

---

## 19. Manual Optimization Workflow

If images are optimized manually, use this workflow:

1. Collect all original images.
2. Remove unusable photos.
3. Select the final MVP gallery images.
4. Crop images consistently.
5. Edit brightness, contrast, and orientation if needed.
6. Remove sensitive/private details.
7. Export required sizes.
8. Export modern formats.
9. Compress files.
10. Rename files using the naming rules.
11. Add descriptive alt text to the image inventory list.
12. Place files in correct folders.
13. Test page load speed on mobile and desktop.
14. Test gallery layout on mobile.

---

## 20. Image Inventory Template

Use this table to track each final image.

| ID | Project/service | Before/after | Source file | Production file base name | Alt text | Notes |
|---|---|---|---|---|---|---|
| 01 | Epoxy flooring | After | `TBD` | `pro-seal-epoxy-flooring-calgary-after-01` | `Finished epoxy garage floor coating by Pro Seal Solutions in Calgary` | MVP gallery |
| 02 | Epoxy flooring | After | `TBD` | `pro-seal-epoxy-flooring-calgary-after-02` | `Epoxy floor coating with clean glossy finish in Calgary garage` | MVP gallery |
| 03 | Concrete flake coating | After | `TBD` | `pro-seal-concrete-flake-coating-garage-after-01` | `Concrete flake floor coating installed in a residential garage` | MVP gallery |
| 04 | Driveway restoration | Before | `TBD` | `pro-seal-driveway-restoration-calgary-before-01` | `Driveway concrete surface before restoration in Calgary` | Before/after pair |
| 05 | Driveway restoration | After | `TBD` | `pro-seal-driveway-restoration-calgary-after-01` | `Driveway concrete surface after restoration by Pro Seal Solutions` | Before/after pair |

The final project should include one row for every production image selected for the website.

---

## 21. CSS Requirements for Image Display

### 21.1 Prevent overflow

All images should respect their container.

```css
img {
  max-width: 100%;
  height: auto;
}
```

### 21.2 Use object fit for card crops

```css
.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 21.3 Reserve image space

Use `aspect-ratio` on gallery cards to prevent layout shift.

```css
.gallery-card {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
```

### 21.4 Mobile-friendly gallery grid

Example:

```css
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 22. Accessibility Requirements

Image-related accessibility requirements:

- All meaningful project photos must have descriptive alt text.
- Before/after images must be labeled clearly.
- Lightbox controls must be keyboard accessible.
- Lightbox close button must have an accessible label.
- Image-only buttons must have accessible names.
- Text over images must meet contrast requirements.
- Do not place important text inside image files unless the same information is available as real HTML text.

---

## 23. Do and Do Not

### Do

- Use optimized AVIF/WebP images.
- Keep original images separate from production images.
- Use responsive image sizes.
- Use lazy loading for gallery images.
- Use descriptive file names.
- Use descriptive alt text.
- Use matching dimensions for before/after pairs.
- Test on mobile.
- Remove private metadata and sensitive details.

### Do not

- Upload camera-original photos directly to the website.
- Use large uncompressed gallery images.
- Load all full-size gallery images on initial page load.
- Use `IMG_1234.jpg` style names in production.
- Use keyword-stuffed alt text.
- Use heavy sliders or animations for the MVP.
- Use video backgrounds in the MVP.
- Stretch or distort photos.
- Publish customer-submitted quote images without permission.

---

## 24. Acceptance Criteria

Image optimization is complete when all criteria below are satisfied.

### 24.1 File preparation

- [ ] Original source images are stored separately from production images.
- [ ] Final MVP gallery contains at least 20 selected project images.
- [ ] Epoxy flooring gallery contains 8 after photos.
- [ ] Concrete flake coating gallery contains 6 after photos.
- [ ] Driveway restoration gallery contains 3 before and 3 after photos.
- [ ] Before/after pairs have matching dimensions and aspect ratios.
- [ ] Production images are exported in modern formats.
- [ ] Images are compressed to reasonable file sizes.
- [ ] File names are descriptive, lowercase, and hyphen-separated.

### 24.2 Website implementation

- [ ] Gallery images use responsive image sizes.
- [ ] Below-the-fold gallery images use lazy loading.
- [ ] Images include width and height attributes.
- [ ] Images do not cause layout shift.
- [ ] Hero image is optimized and not unnecessarily lazy-loaded.
- [ ] Lightbox, if used, does not preload all large images on initial page load.
- [ ] Gallery works correctly on mobile, tablet, and desktop.
- [ ] No horizontal scrolling occurs because of images.

### 24.3 SEO and accessibility

- [ ] Meaningful images have descriptive alt text.
- [ ] Decorative images use empty alt text.
- [ ] Before/after photos are clearly labeled.
- [ ] Image file names support local service relevance without keyword stuffing.
- [ ] Text over images has sufficient contrast.
- [ ] Lightbox controls are accessible if a lightbox is used.

### 24.4 Privacy and security

- [ ] Unnecessary metadata is removed from public images.
- [ ] Sensitive customer details are cropped or blurred.
- [ ] Quote form uploads are validated.
- [ ] Quote form uploaded images are not public.
- [ ] Customer-submitted images are not used in the gallery without explicit permission.

---

## 25. Recommended Final Checklist Before Launch

Before launch, verify:

- [ ] Homepage loads quickly on mobile.
- [ ] Gallery appears clean and professional.
- [ ] Project photos are sharp enough but not oversized.
- [ ] Image payload is reasonable.
- [ ] All visible project photos have correct alt text.
- [ ] The gallery supports the company’s main focus: epoxy flooring and concrete surface solutions.
- [ ] The website does not include a large unoptimized gallery.
- [ ] The site remains simple, fast, and easy to maintain.

---

## Brand Asset Processing (Post-MVP)

The following branding image assets were generated programmatically using Python/Pillow. They must not be replaced by the raw source files.

### Favicon extraction — `favicon-p.png` and `favicon-p-32.png`

**Source:** `assets/logo/logo-square-fit.png` (703×708 px)

**Method:** Python/Pillow pixel scan. The stylized "P" mark was located in the upper inner region of the circle (scan area y: 120–370, x: 200–520) by detecting bright white pixels. Bounding box found at approximately top=216, bottom=308, left=303, right=404. A 160×160 crop was taken centered on the P (center x=353, y=262), composited onto a solid `#1E1F1C` background, then resized to 64×64 and 32×32.

**Why:** The full circle logo is too visually complex to be legible at favicon sizes (32×32 and below). Isolating the P mark produces a clean, recognizable favicon.

**Background color:** `#1E1F1C` (rgb 30,31,28) — matches the site header/footer dark background so the favicon looks consistent when the browser tab uses a dark theme.

**Output files:**
- `src/assets/logo/favicon-p.png` — 64×64 px
- `src/assets/logo/favicon-p-32.png` — 32×32 px

**HTML usage (both `index.html` and `privacy-policy.html`):**
```html
<link rel="icon" type="image/png" sizes="64x64" href="/assets/logo/favicon-p.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logo/favicon-p-32.png">
<link rel="apple-touch-icon" href="/assets/logo/logo-square-fit.png">
```

### Footer logo background match — `logo-footer.png`

**Source:** `assets/logo/logo-square-fit.png` (703×708 px)

**Problem:** The source file’s background was `#121314` (rgb 18,19,20). The site footer background is `#1E1F1C` (rgb 30,31,28). Displaying the logo directly in the footer produced a visible dark rectangle around the circle.

**Method:** Python/Pillow pixel-by-pixel shift. Every pixel was shifted by `+12R, +12G, +8B`. White and near-white content pixels clamp to 255 unchanged. Dark background pixels shift from rgb(18,19,20) to rgb(30,31,28) exactly.

**Formula:** `new_r = min(r + 12, 255)`, `new_g = min(g + 12, 255)`, `new_b = min(b + 8, 255)`

**Output file:** `src/assets/logo/logo-footer.png` — 703×708 px

**Constraint:** `logo-footer.png` must only be used on `#1E1F1C` backgrounds. Using it on any other background will expose the shifted colors. Do not use it in the header, hero section, or any light-background area.

**Display size:** `height: 190px; width: auto` on desktop. Responsive heights: 130px (≤768px), 100px (≤380px). See §18.7 of the PRD for full breakpoint table.

