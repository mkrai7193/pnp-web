/**
 * Custom Worker script that sits in front of the static site build. Only
 * `/api/*` requests reach here (see `run_worker_first` in wrangler.jsonc) —
 * everything else is served directly from the `dist/` static assets.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/waitlist' && request.method === 'POST') {
      return handleWaitlist(request, env)
    }

    return new Response('Not found', { status: 404 })
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function handleWaitlist(request, env) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400)
  }

  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''
  const type = typeof body?.type === 'string' ? body.type.trim() : ''
  const city = typeof body?.city === 'string' ? body.city.trim() : ''

  if (!name || !EMAIL_RE.test(email) || !type) {
    return json({ error: 'name, a valid email, and type are required.' }, 400)
  }

  const sent = await sendWaitlistNotification(env, { name, email, phone, type, city })
  if (!sent) {
    return json({ error: 'Failed to send notification email.' }, 502)
  }

  return json({ ok: true })
}

async function sendWaitlistNotification(env, { name, email, phone, type, city }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'PNP Sports Waitlist <notifications@pnpsports.in>',
      to: [env.WAITLIST_NOTIFY_TO || 'info@pnpsports.in'],
      reply_to: email,
      subject: `New waitlist interest — ${name}`,
      html: `
        <h2>Someone has shown interest in PNP Sports</h2>
        <table cellpadding="6" cellspacing="0" border="0">
          <tr><td><strong>Full Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || '—')}</td></tr>
          <tr><td><strong>I am interested as</strong></td><td>${escapeHtml(type)}</td></tr>
          <tr><td><strong>City</strong></td><td>${escapeHtml(city || '—')}</td></tr>
        </table>
      `,
    }),
  })

  return res.ok
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
