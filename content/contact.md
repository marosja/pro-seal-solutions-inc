# contact.md

## Purpose

This file defines all contact-related content for the Pro Seal Solutions Inc. one-page website.

Use this file as the source of truth for:

- Contact section copy and headings
- Quote request form UX wording (labels, placeholders, CTA text)
- Contact details display copy
- Phone, email, and WhatsApp calls-to-action
- Footer contact content
- Form confirmation and error message copy
- Consent checkbox wording
- Accessibility and implementation notes for contact-related UI

For form behavior, field definitions, validation rules, upload limits, spam protection, and email delivery requirements, see `technical/form-requirements.md`.

The contact section should make it easy for residential and commercial customers in Calgary and surrounding Alberta areas to request a quote for epoxy flooring, concrete floor coatings, concrete repair, resurfacing, self-leveling, and surface preparation work.

---

## Contact Content Goals

The contact section must support the main website goal: generating qualified quote requests.

The content should help visitors quickly understand:

- How to request a quote
- Which contact method to use
- What information to provide
- That Pro Seal Solutions works on epoxy flooring and concrete surface solution projects
- That the company serves Calgary, Alberta and surrounding areas
- That the company will contact them back to discuss the project

Primary conversion actions:

1. Submit the quote request form
2. Call the company directly
3. Send an email
4. Start a WhatsApp inquiry

---

## Main Contact Section Heading

### Preferred heading

```text
Request a Free Quote
```

### Alternative headings

```text
Tell Us About Your Project
```

```text
Get a Quote for Epoxy Flooring or Concrete Surface Work
```

```text
Contact Pro Seal Solutions
```

---

## Contact Section Intro Copy

### Preferred version

```text
Ready to improve your concrete floor or surface? Contact Pro Seal Solutions Inc. for epoxy flooring, floor coatings, concrete repair, resurfacing, self-leveling, or surface preparation services in Calgary and surrounding areas.
```

### Short version

```text
Request a free quote for epoxy flooring, concrete coatings, repair, resurfacing, leveling, or surface preparation work.
```

### More detailed version

```text
Tell us about your project and we will contact you to discuss the work, location, timeline, and next steps. Pro Seal Solutions Inc. provides epoxy flooring, concrete floor coatings, concrete repair, resurfacing, self-leveling, and concrete surface preparation services for residential and commercial clients in Calgary, Alberta and surrounding areas.
```

---

## Primary Call-to-Action Copy

### Main CTA button

```text
Request a Free Quote
```

### Stronger CTA option

```text
Request a Free Quote Now
```

### Supporting CTA text

```text
We will get in touch with you to discuss your project.
```

### Phone CTA

```text
Call for a Quote
```

### Email CTA

```text
Email Your Project Details
```

### WhatsApp CTA

```text
Message Us on WhatsApp
```

---

## Business Contact Details

```yaml
company_name: Pro Seal Solutions Inc.
primary_contact: Michal Simonak
phone_display: 403-399-4235
phone_href: tel:+14033994235
email_display: michal@prosealsolutions.ca
email_href: mailto:michal@prosealsolutions.ca
address: 2727 28 Ave SE, Calgary, AB T2B 0L4, Canada
primary_service_area: Calgary, Alberta
service_area_note: Calgary and surrounding Alberta areas
```

---

## Contact Information Display Copy

### Standard display

```text
Pro Seal Solutions Inc.
Calgary, AB

Phone: 403-399-4235
Email: michal@prosealsolutions.ca
Contact: Michal Simonak
```

> **Note:** Do not display the full street address on the website. Use "Calgary, AB" or service-area wording. See `content/service-areas.md`.

### Compact display for footer or mobile

```text
Pro Seal Solutions Inc.
Calgary, AB
403-399-4235
michal@prosealsolutions.ca
```

### Local service statement

```text
Serving Calgary, Alberta and surrounding areas with epoxy flooring, concrete coatings, concrete repair, resurfacing, self-leveling, and surface preparation services.
```

---

## Recommended Form Labels

Use clear labels, not placeholder-only inputs.

```text
Name
Phone Number
Email Address
Project Location
Type of Work
Project Details
Upload Photos Optional
Consent to Contact
```

---

## Recommended Placeholder Text

```yaml
name: Your full name
phone: Your phone number
email: your@email.com
project_location: Calgary, Airdrie, Okotoks, Cochrane, etc.
type_of_work: Select the service you need
message: Tell us about the surface, project size, condition, timeline, and any concerns.
photo_upload: Upload photos of the floor or concrete surface, if available.
```

---

## Message Field Guidance

Add short helper text below the message field.

```text
Helpful details include the type of surface, approximate size, current condition, project location, preferred timeline, and whether this is residential or commercial work.
```

### Optional expanded helper text

```text
For the most accurate follow-up, include details such as floor size, surface condition, cracks or damage, coating preference, indoor or outdoor location, and your preferred timeline.
```

---

## Photo Upload Copy

### Label

```text
Upload Photos Optional
```

### Helper text

```text
Photos help us better understand the current surface condition before we contact you.
```

### Technical content note

```text
Allow common image formats such as JPG, PNG, HEIC, and WEBP. Limit upload size to keep the form fast and secure.
```

---

## Consent Checkbox Text (Final)

### Required consent text

```text
I agree to be contacted by Pro Seal Solutions Inc. about this quote request.
```

> **Frozen.** This is the approved consent checkbox text. Use this exact wording.

### Privacy note below form

```text
Your information will only be used to respond to your inquiry and discuss your project.
```

### Legal/privacy note

```text
For more details, please review our Privacy Policy.
```

---

## Submit Button Copy

### Preferred submit button

```text
Request a Free Quote
```

### Alternative button text

```text
Send Quote Request
```

```text
Submit Project Details
```

---

## Form Confirmation Messages

### Success message

```text
Thank you. Your quote request has been sent. We will contact you to discuss your project.
```

### More detailed success message

```text
Thank you for contacting Pro Seal Solutions Inc. Your quote request has been received. We will review your project details and contact you to discuss the next steps.
```

### Short success message

```text
Your request has been sent. We will get in touch with you soon.
```

---

## Form Error Messages

### General error

```text
Something went wrong and your request could not be sent. Please try again or contact us directly by phone or email.
```

### Required field error

```text
Please complete all required fields before submitting the form.
```

### Invalid email error

```text
Please enter a valid email address.
```

### Invalid phone error

```text
Please enter a valid phone number.
```

### File upload error

```text
The photo could not be uploaded. Please try a smaller file or submit the form without photos.
```

### Spam protection error

```text
We could not verify the submission. Please refresh the page and try again.
```

---

## WhatsApp Button Content

The website should include a visible but non-intrusive WhatsApp button, especially on mobile.

### Button label

```text
Message Us on WhatsApp
```

### Pre-filled WhatsApp message

```text
Hi, I’m interested in your epoxy flooring & floor coating services. Can you provide more information?
```

### WhatsApp URL

Assuming the WhatsApp number is the same as the listed company phone number:

```text
https://wa.me/14033994235?text=Hi%2C%20I%E2%80%99m%20interested%20in%20your%20epoxy%20flooring%20%26%20floor%20coating%20services.%20Can%20you%20provide%20more%20information%3F
```

### Implementation note

Confirm that 403-399-4235 is the correct WhatsApp-enabled number before launch. **Confirmed:** 403-399-4235 is the WhatsApp-enabled number.

---

## Phone Link Content

### Display text

```text
403-399-4235
```

### Link target

```text
tel:+14033994235
```

### Suggested nearby copy

```text
Call Pro Seal Solutions to discuss your epoxy flooring, concrete coating, or concrete surface restoration project.
```

---

## Email Link Content

### Display text

```text
michal@prosealsolutions.ca
```

### Link target

```text
mailto:michal@prosealsolutions.ca
```

### Suggested nearby copy

```text
Send your project details, location, and photos by email.
```

---

## Footer Contact Content

### Footer version

```text
Pro Seal Solutions Inc.
Epoxy flooring, concrete coatings, repair, resurfacing, self-leveling, and surface preparation services in Calgary, Alberta and surrounding areas.

Phone: 403-399-4235
Email: michal@prosealsolutions.ca
```

### Footer CTA

```text
Request a Free Quote
```

### Footer legal links

```text
Privacy Policy
```

> **Note:** No cookie notice link is required at launch because no analytics or tracking is enabled. Add a cookie notice link if tracking is enabled later.

---

## Contact Section SEO Notes

The contact section should naturally include Calgary and service-related terms without keyword stuffing.

Recommended local SEO phrases:

- epoxy flooring in Calgary, Alberta
- concrete floor coatings in Calgary
- garage floor coatings in Calgary
- commercial floor coatings in Calgary
- concrete repair and resurfacing in Calgary
- self-leveling concrete and floor leveling in Calgary
- concrete surface preparation in Calgary

### Suggested SEO-friendly sentence

```text
Contact Pro Seal Solutions Inc. for epoxy flooring, garage floor coatings, concrete repair, resurfacing, self-leveling, and concrete surface preparation services in Calgary, Alberta and surrounding areas.
```

---

## Accessibility Requirements

The contact section must be easy to use on desktop and mobile.

### Requirements

- Every form field must have a visible label.
- Required fields must be clearly marked.
- Error messages must explain what needs to be fixed.
- Form fields must be keyboard accessible.
- Buttons and links must have clear focus states.
- Phone, email, and WhatsApp links must be easy to tap on mobile.
- Text must have sufficient contrast against the background.
- Do not rely only on placeholder text for important instructions.

---

## Mobile Layout Requirements

On mobile devices, the contact section should prioritize fast actions.

Recommended order:

1. Heading: Request a Free Quote
2. Short intro copy
3. Tap-to-call button
4. WhatsApp button
5. Quote request form
6. Email link
7. Address/service area information

### Mobile CTA labels

```text
Call Now
```

```text
Send WhatsApp Message
```

```text
Request a Free Quote
```

---

## Contact Section Structure Recommendation

Recommended content layout:

```text
<section id="quote">
  Heading: Request a Free Quote
  Short intro
  Contact cards: Phone, Email, WhatsApp
  Quote request form
  Service area wording
  Privacy/consent note
</section>
```

> **Frozen.** The section anchor is `#quote`. Do not use `#contact` as a separate section anchor.

For a one-page website, the quote section should appear near the bottom after the services, about/trust, and gallery sections.

---

## Developer Implementation Checklist

- [ ] Add contact section with `id="contact"`
- [ ] Add quote form with required fields
- [ ] Add visible form labels
- [ ] Add form validation
- [ ] Connect form to `michal@prosealsolutions.ca`
- [ ] Add confirmation message after successful submission
- [ ] Add clear error messages
- [ ] Add consent checkbox
- [ ] Add Cloudflare Turnstile
- [ ] Add hidden honeypot field
- [ ] Add optional photo upload
- [ ] Add clickable phone link
- [ ] Add clickable email link
- [ ] Add WhatsApp button with pre-filled message
- [ ] Confirm WhatsApp-enabled phone number
- [ ] Add address or service area text
- [ ] Add Privacy Policy and Cookie Notice links near footer/contact area
- [ ] Test form submission on desktop and mobile
- [ ] Test email delivery
- [ ] Test keyboard navigation
- [ ] Test screen-reader-friendly labels
- [ ] Test contact buttons on mobile devices

---

## Open Items — Resolved

- ~~Is 403-399-4235 also the correct WhatsApp number?~~ **Yes, confirmed.**
- ~~Should business hours be displayed?~~ **Not required for MVP.**
- ~~Should the full business address be public on the website, or should only Calgary/service area be shown?~~ **Show only Calgary/service area wording. See `content/service-areas.md`.**
- ~~What maximum file size should be allowed for photo uploads?~~ **See `technical/form-requirements.md` section 8.2 for authoritative upload limits (5 MB per file, 5 files max, 15 MB total).**
- Should quote request submissions send an automatic confirmation email to the customer? **Deferred — nice-to-have, not required for MVP.**
- Should the contact form include a preferred contact method field? **No — keep the form simple for MVP.**
- Should emergency or urgent repair requests be handled differently? **No — not required for MVP.**

---

## Final Recommended Contact Section Copy

```text
Request a Free Quote

Ready to improve your concrete floor or surface? Contact Pro Seal Solutions Inc. for epoxy flooring, floor coatings, concrete repair, resurfacing, self-leveling, or surface preparation services in Calgary and surrounding areas.

Call 403-399-4235, email michal@prosealsolutions.ca, message us on WhatsApp, or complete the quote request form below. We will get in touch with you to discuss your project.
```
