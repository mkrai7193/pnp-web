/** Base URL of the NestJS backend (pnp-backend) — see .env.example. */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

/**
 * POSTs JSON to the backend and normalizes the result to `{ ok, data, message }`
 * so forms can render a submission-error message without a try/catch of their own.
 */
export async function apiPost(path, body) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      const message = Array.isArray(data?.message) ? data.message.join(' ') : data?.message
      return { ok: false, data, message: message || 'Something went wrong. Please try again.' }
    }
    return { ok: true, data, message: data?.message }
  } catch {
    return { ok: false, data: null, message: "Couldn't reach the server. Please check your connection and try again." }
  }
}

export async function apiGet(path) {
  try {
    const res = await fetch(`${API_URL}${path}`)
    if (!res.ok) return { ok: false, data: null }
    return { ok: true, data: await res.json() }
  } catch {
    return { ok: false, data: null }
  }
}
