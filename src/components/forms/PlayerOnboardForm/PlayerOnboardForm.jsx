import { useEffect, useState } from 'react'
import FormField from '@/components/ui/FormField'
import FormShell from '@/components/ui/FormShell'
import { isValidEmail, isValidMobile, isPastOrToday, isRequired } from '@/utils/validators'
import { apiGet, apiPost } from '@/utils/api'
import styles from './PlayerOnboardForm.module.css'

const EMPTY_FORM = { schoolId: '', playerName: '', dob: '', mobile: '', email: '' }
const OTHER_SCHOOL_VALUE = 'other'

/**
 * Player registration form. The school dropdown is populated from the
 * NestJS backend's `GET /schools` — verified schools only, i.e. schools
 * whose registration email has been confirmed (see SchoolOnboardForm).
 * Submits to `POST /players`, which inserts the player as unverified and
 * emails a verification link to the player's own email.
 */
export default function PlayerOnboardForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [schools, setSchools] = useState([])
  const [schoolsLoading, setSchoolsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    apiGet('/schools').then((result) => {
      if (!cancelled) {
        setSchools(result.ok ? result.data : [])
        setSchoolsLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!isRequired(form.schoolId)) next.schoolId = 'Select your school.'
    if (!isRequired(form.playerName)) next.playerName = "Enter the player's full name."
    if (!isRequired(form.dob)) next.dob = 'Enter a date of birth.'
    else if (!isPastOrToday(form.dob)) next.dob = 'Date of birth cannot be in the future.'
    if (!isValidMobile(form.mobile)) next.mobile = 'Enter a valid 10-digit mobile number.'
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0 || form.schoolId === OTHER_SCHOOL_VALUE) {
      setSuccess(false)
      if (form.schoolId === OTHER_SCHOOL_VALUE) {
        setErrors((prev) => ({ ...prev, schoolId: "Your school hasn't registered yet — ask them to complete School Onboarding first." }))
      }
      return
    }

    setSubmitError('')
    setSubmitting(true)

    const result = await apiPost('/players', {
      schoolId: Number(form.schoolId),
      playerName: form.playerName,
      dob: form.dob,
      mobile: form.mobile,
      email: form.email,
    })

    setSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.message)
      setSuccess(false)
      return
    }

    setForm(EMPTY_FORM)
    setSuccessMessage(result.message)
    setSuccess(true)
  }

  return (
    <FormShell
      title="Player Details"
      onSubmit={handleSubmit}
      submitLabel="Register Player"
      submitting={submitting}
      error={submitError}
      success={success}
      successMessage={successMessage}
      onCloseSuccess={() => setSuccess(false)}
      footer={
        <p className={styles.loginNote}>
          Your login will use this email as the username and this mobile number as the password
          once the player portal launches.
        </p>
      }
    >
      <FormField
        as="select"
        id="player-school"
        label="School Name"
        required
        value={form.schoolId}
        onChange={update('schoolId')}
        error={errors.schoolId}
        disabled={schoolsLoading}
        options={[
          { value: '', label: schoolsLoading ? 'Loading schools…' : 'Select your school' },
          ...schools.map((s) => ({ value: String(s.id), label: s.name })),
          { value: OTHER_SCHOOL_VALUE, label: 'Other / Not Listed' },
        ]}
      />
      <FormField
        id="player-name"
        label="Name of the Player"
        required
        placeholder="Full name"
        value={form.playerName}
        onChange={update('playerName')}
        error={errors.playerName}
      />
      <FormField
        id="player-dob"
        label="Date of Birth"
        type="date"
        required
        value={form.dob}
        onChange={update('dob')}
        error={errors.dob}
      />
      <FormField
        id="player-mobile"
        label="Mobile Number"
        type="tel"
        required
        placeholder="+91 XXXXX XXXXX"
        value={form.mobile}
        onChange={update('mobile')}
        error={errors.mobile}
      />
      <FormField
        id="player-email"
        label="Email ID"
        type="email"
        required
        placeholder="player@email.com"
        value={form.email}
        onChange={update('email')}
        error={errors.email}
      />
    </FormShell>
  )
}
