/**
 * Cloudflare Pages Function — Quote Form Handler
 * Route: POST /api/quote
 *
 * Required environment variables (set in Cloudflare Pages dashboard):
 *   TURNSTILE_SECRET_KEY     — Cloudflare Turnstile secret key
 *   EMAIL_PROVIDER_API_KEY   — Resend API key (or swap for another provider)
 *   CONTACT_EMAIL_TO         — Recipient: michal@prosealsolutions.ca
 *   CONTACT_EMAIL_FROM       — Sender: website@prosealsolutions.ca
 *   SITE_URL                 — https://www.prosealsolutions.ca
 *
 * Pipeline:
 *   1. CORS preflight
 *   2. Honeypot check
 *   3. Field validation
 *   4. Turnstile server-side verification
 *   5. File validation (type + size)
 *   6. Email dispatch via Resend
 *   7. JSON response
 */

const ALLOWED_METHODS = ['POST', 'OPTIONS'];
const MAX_FILES = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;   // 5 MB per file
const MAX_TOTAL_BYTES = 15 * 1024 * 1024; // 15 MB total
const ALLOWED_MIME = new Set([
  'image/jpeg', 'image/png', 'image/webp',
  'image/heic', 'image/heif', 'application/pdf',
]);

// Rate-limiting store (per-isolate; resets on each Worker restart)
// For production, use KV or Durable Objects for persistent rate-limiting.
const submissionLog = new Map();
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_OK_PER_WINDOW = 3;
const MAX_FAIL_PER_WINDOW = 5;

function getResponseHeaders(siteUrl) {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': siteUrl || 'https://www.prosealsolutions.ca',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
  };
}

function ok(message, headers) {
  return new Response(
    JSON.stringify({ success: true, message }),
    { status: 200, headers }
  );
}

function err(message, status, headers) {
  return new Response(
    JSON.stringify({ success: false, message }),
    { status: status || 400, headers }
  );
}

function sanitize(str, maxLen) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')         // strip angle brackets
    .replace(/[\r\n]{3,}/g, '\n\n') // collapse excess newlines
    .trim()
    .slice(0, maxLen || 500);
}

function checkRateLimit(ip, success) {
  const now = Date.now();
  if (!submissionLog.has(ip)) {
    submissionLog.set(ip, { ok: 0, fail: 0, resetAt: now + RATE_WINDOW_MS });
  }
  const rec = submissionLog.get(ip);
  if (now > rec.resetAt) {
    rec.ok = 0; rec.fail = 0; rec.resetAt = now + RATE_WINDOW_MS;
  }
  if (success && rec.ok >= MAX_OK_PER_WINDOW) return false;
  if (!success && rec.fail >= MAX_FAIL_PER_WINDOW) return false;
  if (success) rec.ok++; else rec.fail++;
  return true;
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = getResponseHeaders(env.SITE_URL);

  const ip =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For') ||
    'unknown';

  // Rate-limit failed requests first
  if (!checkRateLimit(ip, false)) {
    return err('Too many requests. Please wait and try again.', 429, headers);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch (_) {
    return err('Could not read form data.', 400, headers);
  }

  // ── Honeypot ────────────────────────────────────────
  const honeypot = formData.get('website');
  if (honeypot && honeypot.trim()) {
    // Silently accept to not reveal detection
    return ok('Thank you. Your quote request has been sent. We will contact you to discuss your project.', headers);
  }

  // ── Field extraction ────────────────────────────────
  const name            = sanitize(formData.get('name'), 100);
  const phone           = sanitize(formData.get('phone'), 30);
  const email           = sanitize(formData.get('email'), 200);
  const projectLocation = sanitize(formData.get('project_location'), 150);
  const serviceType     = sanitize(formData.get('service_type'), 100);
  const message         = sanitize(formData.get('message'), 2000);
  const turnstileToken  = formData.get('cf-turnstile-response') || '';
  const consent         = formData.get('contact_consent');

  // ── Field validation ────────────────────────────────
  const phoneDigits = phone.replace(/\D/g, '');
  const errors = [];
  if (!name || name.length < 2)                          errors.push('Name is required (min 2 characters).');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) errors.push('A valid phone number is required.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push('A valid email address is required.');
  if (!projectLocation || projectLocation.length < 2)    errors.push('Project location is required.');
  if (!serviceType)                                      errors.push('Type of work is required.');
  if (!message || message.length < 10)                   errors.push('Project details are required (min 10 characters).');
  if (!consent)                                          errors.push('Consent is required.');

  if (errors.length) {
    return err('Please complete all required fields before submitting the form.', 422, headers);
  }

  // ── Turnstile verification ──────────────────────────
  if (env.TURNSTILE_SECRET_KEY) {
    try {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: ip !== 'unknown' ? ip : undefined,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return err('We could not verify the form submission. Please refresh the page and try again.', 403, headers);
      }
    } catch (_) {
      // Fail open only if Turnstile is unreachable — log and continue
      console.error('[quote] Turnstile verification error');
    }
  }

  // ── File validation ─────────────────────────────────
  const files = formData.getAll('photos').filter(f => f && f.size > 0);
  const photoLines = [];

  if (files.length > MAX_FILES) {
    return err(`Maximum ${MAX_FILES} files allowed.`, 422, headers);
  }

  let totalBytes = 0;
  for (const file of files) {
    totalBytes += file.size;
    if (file.size > MAX_FILE_BYTES) {
      return err(`File "${file.name}" exceeds the 5 MB limit.`, 422, headers);
    }
    if (!ALLOWED_MIME.has(file.type)) {
      return err(`File type "${file.type}" is not accepted. Please upload JPG, PNG, WEBP, HEIC, or PDF.`, 422, headers);
    }
    photoLines.push(`  - ${sanitize(file.name, 80)} (${(file.size / 1024 / 1024).toFixed(2)} MB, ${file.type})`);
  }

  if (totalBytes > MAX_TOTAL_BYTES) {
    return err(`Total upload size exceeds the 15 MB limit.`, 422, headers);
  }

  // ── Build email body ────────────────────────────────
  const timestamp = new Date().toISOString();
  const pageUrl   = request.headers.get('Referer') || env.SITE_URL || 'https://www.prosealsolutions.ca/';
  const photoSummary = photoLines.length
    ? photoLines.join('\n')
    : '  (No photos uploaded)';

  const emailSubject = `New Quote Request – ${serviceType} – ${projectLocation}`;

  const emailBody = `New quote request from Pro Seal Solutions website

Name:             ${name}
Phone:            ${phone}
Email:            ${email}
Project location: ${projectLocation}
Type of work:     ${serviceType}

Message:
${message}

Photos:
${photoSummary}

Consent: Customer agreed to be contacted about this quote request.
Submitted: ${timestamp}
Page: ${pageUrl}
`;

  // ── Send email via Resend ───────────────────────────
  const toEmail   = env.CONTACT_EMAIL_TO   || 'michal@prosealsolutions.ca';
  const fromEmail = env.CONTACT_EMAIL_FROM || 'website@prosealsolutions.ca';

  if (env.EMAIL_PROVIDER_API_KEY) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.EMAIL_PROVIDER_API_KEY}`,
        },
        body: JSON.stringify({
          from: `Pro Seal Solutions Website <${fromEmail}>`,
          to: [toEmail],
          reply_to: email,
          subject: emailSubject,
          text: emailBody,
        }),
      });

      if (!emailRes.ok) {
        const body = await emailRes.text();
        console.error(`[quote] Email send failed ${emailRes.status}: ${body}`);
        return err(
          'Something went wrong and your request was not sent. Please try again or contact us directly by phone or email.',
          500, headers
        );
      }
    } catch (sendErr) {
      console.error('[quote] Email provider error:', sendErr);
      return err(
        'Something went wrong and your request was not sent. Please try again or contact us directly by phone or email.',
        500, headers
      );
    }
  } else {
    // No email provider configured — log for development
    console.log('[quote] No EMAIL_PROVIDER_API_KEY set. Email would be:', emailSubject);
  }

  // Count as a successful submission for rate-limiting
  checkRateLimit(ip, true);

  return ok(
    'Thank you. Your quote request has been sent. We will contact you to discuss your project.',
    headers
  );
}
