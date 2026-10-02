import { useState } from 'react'
import FormField from '@/components/ui/FormField'
import FormShell from '@/components/ui/FormShell'
import { isValidEmail, isValidMobile, isRequired } from '@/utils/validators'
import { apiPost } from '@/utils/api'
import GeoTagField from './GeoTagField'

const EMPTY_FORM = {
  schoolName: '',
  principalName: '',
  schoolEmail: '',
  schoolMobile: '',
  hodName: '',
  hodMobile: '',
  hodEmail: '',
}

/**
 * School registration form. Submits to the NestJS backend's `POST /schools`
 * (see pnp-backend/src/institutions), which inserts the school as
 * unverified and emails a verification link to the school's own email —
 * the school only appears in the Player Onboarding dropdown once that link
 * is clicked (see PlayerOnboardForm).
 */
export default function SchoolOnboardForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [coords, setCoords] = useState(null)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!isRequired(form.schoolName)) next.schoolName = 'Enter the school name.'
    if (!isRequired(form.principalName)) next.principalName = "Enter the principal's name."
    if (!isValidEmail(form.schoolEmail)) next.schoolEmail = "Enter a valid school email."
    if (!isValidMobile(form.schoolMobile)) next.schoolMobile = 'Enter a valid 10-digit mobile number.'
    if (!isRequired(form.hodName)) next.hodName = "Enter the HOD's name."
    if (!isValidMobile(form.hodMobile)) next.hodMobile = "Enter a valid 10-digit HOD mobile number."
    if (!isValidEmail(form.hodEmail)) next.hodEmail = "Enter a valid HOD email."
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setSuccess(false)
      return
    }

    setSubmitError('')
    setSubmitting(true)

    const result = await apiPost('/schools', {
      schoolName: form.schoolName,
      principalName: form.principalName,
      schoolEmail: form.schoolEmail,
      schoolMobile: form.schoolMobile,
      hodName: form.hodName,
      hodMobile: form.hodMobile,
      hodEmail: form.hodEmail,
      latitude: coords?.lat,
      longitude: coords?.lng,
      address: address || undefined,
      city: city || undefined,
      state: state || undefined,
      zipCode: zipCode || undefined,
    })

    setSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.message)
      setSuccess(false)
      return
    }

    setForm(EMPTY_FORM)
    setCoords(null)
    setAddress('')
    setCity('')
    setState('')
    setZipCode('')
    setSuccessMessage(result.message)
    setSuccess(true)
  }

  return (
    <FormShell
      title="School Details"
      onSubmit={handleSubmit}
      submitLabel="Register School"
      submitting={submitting}
      error={submitError}
      success={success}
      successMessage={successMessage}
      onCloseSuccess={() => setSuccess(false)}
    >
      <FormField
        id="school-name"
        label="School Name"
        required
        placeholder="School name"
        value={form.schoolName}
        onChange={update('schoolName')}
        error={errors.schoolName}
      />

      <GeoTagField
        coords={coords}
        setCoords={setCoords}
        address={address}
        setAddress={setAddress}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        zipCode={zipCode}
        setZipCode={setZipCode}
      />

      <FormField
        id="principal-name"
        label="Name of the Principal"
        required
        placeholder="Principal's full name"
        value={form.principalName}
        onChange={update('principalName')}
        error={errors.principalName}
      />
      <FormField
        id="school-email"
        label="Email ID of the School"
        type="email"
        required
        placeholder="school@email.com"
        value={form.schoolEmail}
        onChange={update('schoolEmail')}
        error={errors.schoolEmail}
      />
      <FormField
        id="school-mobile"
        label="Contact Number of the School"
        type="tel"
        required
        placeholder="+91 XXXXX XXXXX"
        value={form.schoolMobile}
        onChange={update('schoolMobile')}
        error={errors.schoolMobile}
      />
      <FormField
        id="hod-name"
        label="HOD Name"
        required
        placeholder="Head of Department's name"
        value={form.hodName}
        onChange={update('hodName')}
        error={errors.hodName}
      />
      <FormField
        id="hod-mobile"
        label="HOD Mobile"
        type="tel"
        required
        placeholder="+91 XXXXX XXXXX"
        value={form.hodMobile}
        onChange={update('hodMobile')}
        error={errors.hodMobile}
      />
      <FormField
        id="hod-email"
        label="HOD Email ID"
        type="email"
        required
        placeholder="hod@email.com"
        value={form.hodEmail}
        onChange={update('hodEmail')}
        error={errors.hodEmail}
      />
    </FormShell>
  )
}
