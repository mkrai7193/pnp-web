import { useEffect, useRef, useState } from 'react'
import { interestOptions } from '@/data/waitlistBenefits'
import { isValidEmail, isValidMobile, sanitizeMobileInput } from '@/utils/validators'
import styles from './Waitlist.module.css'

const EMPTY_FORM = { name: '', email: '', phone: '', type: '', city: '' }

/**
 * Pre-launch registration form. Submits to the Worker's `POST /api/waitlist`
 * (see `pnp-web/worker/index.js`), which emails the team the submitted
 * details — no database yet, this is an interim notification-only endpoint
 * ahead of the real NestJS `core` service's `POST /waitlist`.
 */
export default function WaitlistForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const updatePhone = (e) => setForm((prev) => ({ ...prev, phone: sanitizeMobileInput(e.target.value) }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name.trim() || !isValidEmail(form.email) || !form.type) {
      setError('Please fill in your name, a valid email, and interest type to continue.')
      return
    }

    if (form.phone && !isValidMobile(form.phone)) {
      setError('Enter a valid 10-digit mobile number, or leave the phone field blank.')
      return
    }

    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')

      setForm(EMPTY_FORM)
      setSubmitted(true)
      timeoutRef.current = setTimeout(() => setSubmitted(false), 6000)
    } catch {
      setError('Something went wrong submitting your interest. Please try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.formWrap}>
      <div className={styles.formTitle}>Register Your Interest</div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="wl-name">Full Name</label>
          <input
            id="wl-name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={updateField('name')}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="wl-email">Email Address</label>
          <input
            id="wl-email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={updateField('email')}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="wl-phone">Phone Number</label>
          <input
            id="wl-phone"
            type="tel"
            inputMode="numeric"
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={updatePhone}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="wl-type">I am interested as a</label>
          <select id="wl-type" value={form.type} onChange={updateField('type')}>
            <option value="">Select your interest</option>
            {interestOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="wl-city">Your District / City</label>
          <input
            id="wl-city"
            type="text"
            placeholder="e.g. Pune, Maharashtra"
            value={form.city}
            onChange={updateField('city')}
          />
        </div>

        {error && (
          <p className={styles.errorMsg} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit My Interest →'}
        </button>

        <div className={styles.note}>No spam. Just launch updates and franchise news from PNP Sports.</div>

        {submitted && (
          <div className={styles.successMsg} role="status">
            ✓ Thank you! We have received your registration. Our team will be in touch soon.
          </div>
        )}
      </form>
    </div>
  )
}
