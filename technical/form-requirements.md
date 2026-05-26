# Form Requirements – Quote Request Form

**Project:** Pro Seal Solutions Inc. one-page website  
**File:** `form-requirements.md`  
**Status:** MVP technical requirements  
**Source PRD:** `pro-seal-solutions-inc_prd.md` / current PRD draft  
**Last updated:** 2026-05-25

**This file is the single source of truth for all form behavior**, including field definitions, validation rules, upload handling, spam protection, email delivery, security, and privacy requirements. For form copy and UX wording (labels, placeholders, headings, CTA text, confirmation and error messages), see `content/contact.md`.

---

## 1. Purpose

This file defines the technical and content requirements for the quote request form on the Pro Seal Solutions Inc. website.

The form must help visitors request a quote for epoxy flooring, floor coatings, concrete repair, resurfacing, self-leveling, and concrete surface preparation services. It must be simple for real customers to complete, reliable for the business to receive, protected from spam, secure, mobile-friendly, and aligned with the privacy requirements defined in the PRD.

The form is one of the main conversion points of the website. Its primary goal is to generate qualified quote inquiries.

---

## 2. Form Objective

The quote form must:

- Convert website visitors into quote leads.
- Collect only the information needed to respond to the request.
- Make it easy for mobile users to submit an inquiry.
- Send the request reliably to the company email address.
- Provide a clear success or error message after submission.
- Protect the website from automated spam submissions.
- Handle personal information securely and transparently.

---

## 3. Form Placement

The form should appear in the **Quote / Contact** section of the one-page website.

Recommended section heading:

```text
Request a Free Quote
```

Recommended supporting text:

```text
Tell us about your project and we will get in touch to discuss your epoxy flooring, floor coating, concrete repair, resurfacing, or surface preparation needs.
```

Recommended CTA button text:

```text
Request a Free Quote
```

---

## 4. User Flow

1. Visitor clicks **Request a Free Quote** from the hero section, navigation, or CTA area.
2. Page scrolls to the quote form.
3. Visitor fills in required fields.
4. Visitor optionally uploads project photos.
5. Visitor checks the required consent checkbox.
6. Visitor submits the form.
7. System validates all fields.
8. System verifies Cloudflare Turnstile and honeypot spam protection.
9. System sends the inquiry to the company email address.
10. Visitor sees a clear confirmation message.

---

## 5. Required Form Fields

| Field Label | Field Name | Type | Required | Purpose |
|---|---|---:|---:|---|
| Name | `name` | Text | Yes | Identify the customer. |
| Phone number | `phone` | Tel | Yes | Allow the company to call or text back. |
| Email | `email` | Email | Yes | Allow email follow-up and reply. |
| Project location | `project_location` | Text | Yes | Confirm service area and project location. |
| Type of work | `service_type` | Select | Yes | Classify the lead by service need. |
| Message | `message` | Textarea | Yes | Collect project details. |
| Photo upload | `photos` | File upload | No | Let the customer share project photos. |
| Consent checkbox | `contact_consent` | Checkbox | Yes | Confirm permission to contact the customer about the quote request. |
| Spam protection token | `cf_turnstile_token` | Hidden/token | Yes | Verify Cloudflare Turnstile server-side. |
| Honeypot field | `website` or similar | Hidden text | No | Detect bot submissions. |

---

## 6. Type of Work Options

The **Type of work** dropdown should use the company’s actual service categories.

Recommended options:

- Epoxy Flooring & Floor Coatings
- Garage Floor Coating
- Concrete Flake Coating
- Concrete Repair & Restoration
- Concrete Resurfacing & Overlays
- Self-Leveling Concrete & Floor Leveling
- Concrete Surface Preparation
- Commercial / Industrial Floor Coating
- Not sure / Need advice
- Other

Do not include **concrete pouring** or **new concrete laying** as a main option, because the company focuses on work after concrete is already laid.

---

## 7. Field Validation Requirements

### 7.1 Name

- Required.
- Minimum length: 2 characters.
- Maximum length: 100 characters.
- Allow letters, spaces, apostrophes, hyphens, and common name characters.
- Reject obvious spam values such as URLs or script tags.

### 7.2 Phone Number

- Required.
- Use `type="tel"` on the frontend.
- Accept common Canadian phone formats, for example:
  - `403-399-4235`
  - `(403) 399-4235`
  - `4033994235`
  - `+1 403 399 4235`
- Minimum valid digits: 10.
- Maximum valid digits: 15.
- Do not require a specific visual format while typing.

### 7.3 Email

- Required.
- Use `type="email"` on the frontend.
- Must be validated server-side as well as client-side.
- Use the customer’s email as the email **Reply-To**, not as the sending **From** address.

### 7.4 Project Location

- Required.
- Minimum length: 2 characters.
- Maximum length: 150 characters.
- Accept city, neighborhood, address, or general location.
- Example placeholder:

```text
Calgary, Airdrie, Cochrane, Okotoks, etc.
```

### 7.5 Message

- Required.
- Minimum length: 10 characters.
- Maximum length: 2,000 characters.
- Placeholder should encourage useful project details.

Recommended placeholder:

```text
Tell us about the surface, approximate size, current condition, timeline, and what service you need.
```

### 7.6 Consent Checkbox

- Required.
- Must be unchecked by default.
- Form must not submit unless checked.

Recommended wording:

```text
I agree to be contacted by Pro Seal Solutions Inc. about this quote request.
```

Optional expanded helper text:

```text
We will use the information you provide only to respond to your inquiry and discuss your project.
```

---

## 8. Photo Upload Requirements

Photo upload is optional but recommended because it can help qualify the project before the first call.

### 8.1 Accepted File Types

Recommended accepted formats:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.heic`
- `.pdf`

### 8.2 Upload Limits

Recommended MVP limits:

- Maximum number of files: 5.
- Maximum size per file: 5 MB.
- Maximum total upload size: 15 MB.

> **Authoritative defaults.** These upload limits are final for MVP. The upload handling model (email attachment vs. secure link) should be decided during implementation based on the chosen hosting platform and email provider. Prefer secure links over large email attachments.

### 8.3 File Handling

The form must:

- Validate file type and file size before processing.
- Reject executable or unsafe file types.
- Rename uploaded files server-side to avoid unsafe filenames.
- Scan or validate files where hosting stack allows.
- Avoid exposing upload paths publicly.
- Avoid storing files longer than needed unless there is a defined retention policy.

### 8.4 Email Delivery with Photos

Preferred approach:

- Store uploaded files securely and include secure file links in the email.

Acceptable MVP approach:

- Attach files to the email only if total size is small enough for reliable email delivery.

Avoid:

- Sending very large attachments directly by email.
- Accepting unlimited uploads.
- Storing photos without a retention policy.

---

## 9. Spam Protection Requirements

The form must use **Cloudflare Turnstile** plus a hidden honeypot field.

### 9.1 Cloudflare Turnstile

Requirements:

- Turnstile must be included on the form.
- The Turnstile token must be verified server-side before the email is sent.
- The Turnstile secret key must never be exposed in frontend code.
- If Turnstile validation fails, the form must not send an email.
- The error message should be user-friendly and should not expose internal validation details.

Recommended user-facing error:

```text
We could not verify the form submission. Please refresh the page and try again.
```

### 9.2 Honeypot Field

Requirements:

- Add a hidden text field that normal users should not see or complete.
- Example field name: `website`.
- If the field contains a value, treat the submission as spam.
- Spam submissions should be silently rejected or logged without sending email.

### 9.3 Rate Limiting

Recommended server-side rate limits:

- Limit repeated submissions from the same IP address.
- Limit repeated submissions using the same email or phone number.
- Use conservative limits so real customers are not blocked accidentally.

Suggested MVP rate limits:

- Maximum 3 successful submissions per IP address per 15 minutes.
- Maximum 5 failed submissions per IP address per 15 minutes.

### 9.4 Spam Content Checks

The server should reject or flag submissions that contain:

- Excessive links.
- Script tags or suspicious markup.
- Repeated nonsense text.
- Known spam patterns.
- Very short or meaningless messages.

---

## 10. Email Delivery Requirements

The form must send quote requests to:

```text
michal@prosealsolutions.ca
```

### 10.1 Email Sender Configuration

Do not send the email directly from the customer’s email address. This can cause SPF, DKIM, or DMARC delivery problems.

Recommended configuration:

```text
From: Pro Seal Solutions Website <no-reply@prosealsolutions.ca>
Reply-To: Customer Name <customer-email@example.com>
To: michal@prosealsolutions.ca
```

### 10.2 Email Subject

Recommended subject format:

```text
New Quote Request – {Service Type} – {Project Location}
```

Example:

```text
New Quote Request – Garage Floor Coating – Calgary SE
```

### 10.3 Email Body Content

The email must include:

- Name
- Phone number
- Email
- Project location
- Type of work
- Message
- Consent confirmation
- Uploaded photo links or attachments, if provided
- Submission date and time
- Website page URL where the form was submitted

Optional internal fields:

- Turnstile verification result
- Submission ID
- Basic spam score or flag

Avoid including unnecessary personal data in the email.

### 10.4 Email Format

The email should be easy to read on mobile.

Recommended format:

```text
New quote request from Pro Seal Solutions website

Name: {name}
Phone: {phone}
Email: {email}
Project location: {project_location}
Type of work: {service_type}

Message:
{message}

Consent: Customer agreed to be contacted about this quote request.
Submitted: {timestamp}
Page: {page_url}
Photos: {photo_links_or_none}
```

### 10.5 Delivery Reliability

The implementation must:

- Use a reliable transactional email provider or properly configured server mailer.
- Use SPF, DKIM, and DMARC records for the sending domain where possible.
- Log whether the email was successfully accepted by the mail provider.
- Show a failure message if the email cannot be sent.
- Test delivery to the company email address before launch.

---

## 11. Customer Confirmation Requirements

### 11.1 Success Message

After successful submission, show a clear confirmation message.

Recommended message:

```text
Thank you. Your quote request has been sent. We will contact you to discuss your project.
```

Optional secondary line:

```text
For urgent requests, you can also call us at 403-399-4235.
```

### 11.2 Error Message

If submission fails, show a helpful message.

Recommended message:

```text
Something went wrong and your request was not sent. Please try again or contact us directly by phone or email.
```

### 11.3 Duplicate Submission Prevention

The submit button should:

- Disable while the form is submitting.
- Show a loading state.
- Prevent accidental double submissions.

Recommended loading text:

```text
Sending...
```

---

## 12. Privacy and Consent Requirements

The form collects personal information. The website must clearly explain what is collected and why.

### 12.1 Personal Information Collected

The form collects:

- Name
- Phone number
- Email address
- Project location
- Project details in the message field
- Optional uploaded photos
- Technical anti-spam/security data required to process the form

### 12.2 Purpose of Collection

The information must only be used to:

- Respond to the quote request.
- Discuss the customer’s project.
- Provide service information or estimate-related follow-up.
- Protect the website from spam or abuse.

### 12.3 Required Consent Text

Use this required checkbox text:

```text
I agree to be contacted by Pro Seal Solutions Inc. about this quote request.
```

### 12.4 Privacy Notice Near Form

Add short privacy helper text near the form submit button.

Recommended text:

```text
Your information will be used to respond to your quote request. See our Privacy Policy for details.
```

The words **Privacy Policy** should link to the privacy policy page or section.

### 12.5 Legal Review

The final privacy policy, cookie notice, and consent wording should be reviewed before launch to confirm they fit Canadian and Alberta privacy requirements.

---

## 13. Cookie and Third-Party Tool Disclosure

The form may use third-party services, including:

- Cloudflare Turnstile for spam protection.
- A transactional email provider for email delivery.
- Website analytics, if enabled.
- Hosting provider logs.

The privacy policy or cookie notice should disclose relevant third-party tools, especially if they process visitor data.

If analytics or advertising tracking is added, the cookie notice must be updated before launch.

---

## 14. Accessibility Requirements

The form must be accessible and easy to use.

Requirements:

- Every input must have a visible label.
- Placeholder text must not replace labels.
- Required fields must be clearly marked.
- Validation errors must be readable and connected to the relevant field.
- Form must be keyboard accessible.
- Focus states must be visible.
- Submit button must have clear text.
- Consent checkbox must be reachable and selectable by keyboard.
- Error messages must not rely on color alone.
- Text contrast must remain readable in both light mode and dark mode.

Recommended required-field label format:

```text
Name *
```

Recommended error format:

```text
Please enter your phone number.
```

---

## 15. Mobile UX Requirements

The form must work well on mobile devices.

Requirements:

- Inputs must be large enough to tap comfortably.
- Form width must fit small screens without horizontal scrolling.
- Use mobile-friendly input types:
  - `type="tel"` for phone.
  - `type="email"` for email.
  - `textarea` for message.
- Submit button must be full-width or highly visible on mobile.
- File upload must be usable from mobile photo library or camera where supported.
- Error messages must appear close to the relevant field.
- The form should not be visually crowded.

---

## 16. Security Requirements

The form must:

- Submit only over HTTPS.
- Validate all fields server-side.
- Sanitize form input before using it in email content or logs.
- Protect against script injection and header injection.
- Keep API keys and email credentials out of frontend code.
- Use environment variables or secure hosting secrets for private keys.
- Reject unsupported file types.
- Avoid exposing stack traces or internal errors to users.
- Avoid storing personal information unless necessary.

---

## 17. Performance Requirements

The form should not slow down the one-page website.

Requirements:

- Load only necessary form scripts.
- Avoid heavy form libraries unless already used by the project.
- Load Turnstile efficiently.
- Keep client-side validation lightweight.
- Do not load file previews unless needed.
- Avoid large third-party scripts in the quote section.

---

## 18. Data Storage and Retention

For the MVP, the simplest acceptable approach is email-only delivery without a public customer database.

Recommended MVP data policy:

- Send the quote request by email.
- Store uploaded files only if needed to provide secure links.
- Delete uploaded files after a defined period if they are not needed.
- Do not store form submissions in browser local storage.
- Do not expose submitted data in the URL.

Suggested retention decision to confirm before launch:

```text
How long should submitted photos or form backups be retained?
```

Recommended default if files are stored:

```text
Delete uploaded files after 30 to 90 days unless needed for an active quote or project.
```

---

## 19. Analytics and Conversion Tracking

The form should support basic conversion tracking if analytics are enabled.

Recommended events:

- `quote_form_viewed`
- `quote_form_started`
- `quote_form_submitted`
- `quote_form_success`
- `quote_form_error`

Do not send full personal information to analytics tools.

Allowed analytics metadata:

- Service type selected.
- General success/failure status.
- Page URL.

Do not send:

- Name.
- Phone number.
- Email address.
- Full message.
- Uploaded photos.

---

## 20. Recommended Form Labels and Text

### Section Heading

```text
Request a Free Quote
```

### Section Description

```text
Tell us about your project and we will get in touch to discuss the best solution for your surface.
```

### Field Labels

```text
Name *
Phone number *
Email *
Project location *
Type of work *
Message *
Upload photos (optional)
```

### Submit Button

```text
Request a Free Quote
```

### Consent Checkbox

```text
I agree to be contacted by Pro Seal Solutions Inc. about this quote request.
```

### Privacy Helper Text

```text
Your information will be used to respond to your quote request. See our Privacy Policy for details.
```

### Success Message

```text
Thank you. Your quote request has been sent. We will contact you to discuss your project.
```

### Error Message

```text
Something went wrong and your request was not sent. Please try again or contact us directly by phone or email.
```

---

## 21. Testing Checklist

Before launch, test the following:

### Functional Testing

- Form submits successfully with valid required fields.
- Form does not submit when required fields are missing.
- Invalid email is rejected.
- Invalid phone number is rejected.
- Consent checkbox is required.
- Type of work dropdown works correctly.
- Message field accepts normal project descriptions.
- Optional photo upload works.
- Oversized files are rejected.
- Unsupported file types are rejected.
- Submit button prevents duplicate submissions.

### Email Testing

- Email arrives at `michal@prosealsolutions.ca`.
- Email subject is clear.
- Email body includes all submitted fields.
- Reply-To uses the customer email address.
- Uploaded photos or links are included correctly.
- Test email does not go to spam.

### Spam Protection Testing

- Turnstile token is required.
- Server rejects invalid Turnstile tokens.
- Honeypot submissions are rejected.
- Repeated submissions are rate-limited.

### Security Testing

- Form works only over HTTPS.
- Script tags are sanitized or rejected.
- Email header injection attempts are blocked.
- Server errors are not exposed to the user.
- Secret keys are not visible in frontend code.

### Accessibility Testing

- All fields have visible labels.
- Form can be completed with keyboard only.
- Error messages are understandable.
- Focus states are visible.
- Contrast is readable in light mode.
- Contrast is readable in dark mode if dark mode is included.

### Mobile Testing

- Form displays correctly on small screens.
- Inputs are easy to tap.
- Phone and email keyboards open correctly.
- File upload works on mobile.
- Confirmation message is visible after submit.

---

## 22. Acceptance Criteria

The quote form is complete when:

- All required fields are implemented.
- Optional photo upload is implemented or intentionally deferred.
- Form validation works on frontend and backend.
- Cloudflare Turnstile is implemented and verified server-side.
- Honeypot spam protection is implemented.
- The form sends email reliably to `michal@prosealsolutions.ca`.
- Success and error messages are shown clearly.
- Consent checkbox is required and unchecked by default.
- Privacy helper text and Privacy Policy link are visible near the form.
- Form works on desktop, tablet, and mobile.
- Form is keyboard accessible.
- Form works over HTTPS.
- Test submissions have been completed before launch.

---

## 23. MVP Scope

### Must Have

- Name, phone, email, project location, type of work, message.
- Required consent checkbox.
- Submit button: **Request a Free Quote**.
- Email delivery to company email.
- Cloudflare Turnstile.
- Honeypot field.
- Clear success/error messages.
- Mobile-friendly layout.
- Basic accessibility.
- Privacy helper text.

### Should Have

- Optional photo upload.
- Rate limiting.
- Email delivery logs.
- Conversion tracking event for successful submissions.

### Nice to Have

- Auto-reply confirmation email to customer.
- CRM integration.
- Admin dashboard for quote requests.
- Advanced spam scoring.
- Multi-step quote form.

### Out of Scope for MVP

- Online booking system.
- Payment processing.
- Full quote calculator.
- Customer login.
- Complex CRM workflow.
- Public upload gallery.

---

## 24. Open Decisions

The following implementation decisions should be finalized during development based on the chosen hosting platform:

1. **Upload handling model:** Email attachment vs. secure object storage links. Prefer secure links for files over 2 MB. Choose based on the hosting platform capabilities.
2. **Transactional email provider:** Choose based on the final hosting environment. Recommended options: Mailgun, Postmark, Resend, or SendGrid.
3. **Auto-reply to customer:** Not required for MVP. Nice-to-have for future.
4. **File retention:** Delete uploaded files after 30–90 days unless needed for an active quote. Define the exact period during deployment setup.
5. ~~Analytics at launch:~~ **No analytics at launch.** No cookie banner required. Add analytics and cookie notice later if tracking is enabled.
6. **Quote submission storage:** Email-only for MVP. No database required.
7. ~~WhatsApp/phone click tracking:~~ **Not tracked for MVP** since no analytics is enabled at launch. Add conversion tracking if analytics is enabled later.

---

## 25. Developer Notes

Recommended backend behavior:

1. Receive form submission.
2. Normalize and validate fields.
3. Validate Turnstile token server-side.
4. Check honeypot field.
5. Apply rate limiting.
6. Validate uploaded files.
7. Sanitize email body content.
8. Send email using configured mail provider.
9. Return JSON success or error response.
10. Show the correct user-facing message.

Recommended response format:

```json
{
  "success": true,
  "message": "Thank you. Your quote request has been sent."
}
```

Recommended error response format:

```json
{
  "success": false,
  "message": "Something went wrong and your request was not sent. Please try again."
}
```

