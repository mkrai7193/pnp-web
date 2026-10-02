/** Shared field validators for the onboarding/participation forms. */

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim())
}

/** Accepts a 10-digit Indian mobile number, optionally prefixed with +91 / 0. */
export function isValidMobile(value) {
  const digits = value.trim().replace(/^(\+91|0)/, '').replace(/\s/g, '')
  return /^[6-9]\d{9}$/.test(digits)
}

/**
 * Live-input sanitizer for mobile number fields: strips every non-digit
 * character (so letters/symbols can never be typed or pasted in), drops a
 * leading "91" country code or "0" trunk prefix if present, then caps the
 * result at 10 digits. Wire this to `onChange` as the value is typed, not
 * just on submit — `isValidMobile` above is the submit-time format check.
 */
export function sanitizeMobileInput(value) {
  let digits = value.replace(/\D/g, '')
  if (digits.length > 10 && digits.startsWith('91')) {
    digits = digits.slice(2)
  }
  if (digits.length > 10 && digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  return digits.slice(0, 10)
}

export function isPastOrToday(dateString) {
  if (!dateString) return false
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return date <= today
}

export function isRequired(value) {
  return Boolean(value && value.toString().trim())
}
