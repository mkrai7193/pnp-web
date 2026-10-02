import { useState } from 'react'
import { isValidMobile, isRequired } from '@/utils/validators'
import StepIndicator from './StepIndicator'
import StepSchoolAndSport from './StepSchoolAndSport'
import StepCategory from './StepCategory'
import StepPlayers from './StepPlayers'
import StepCoach from './StepCoach'
import StepReview from './StepReview'
import styles from './ParticipateForm.module.css'

const STEPS = ['School & Sport', 'Category', 'Squad', 'Coach', 'Review']

const EMPTY_DATA = {
  school: '',
  sport: '',
  ageCategory: '',
  gender: '',
  players: [{ name: '', role: '' }],
  coachName: '',
  coachMobile: '',
}

/**
 * Team-entry wizard: school + sport → age/gender category → squad → coach →
 * review & submit. No backend yet — the final submit is a mock success
 * state; `data`'s shape is the contract the future NestJS
 * `POST /teams/participate` endpoint should accept.
 */
export default function ParticipateForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(EMPTY_DATA)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const update = (patch) => setData((prev) => ({ ...prev, ...patch }))

  const validateStep = () => {
    const next = {}
    if (step === 0) {
      if (!isRequired(data.school)) next.school = 'Select your school.'
      if (!isRequired(data.sport)) next.sport = 'Select a sport.'
    }
    if (step === 1) {
      if (!isRequired(data.ageCategory)) next.ageCategory = 'Select an age category.'
      if (!isRequired(data.gender)) next.gender = 'Select a gender category.'
    }
    if (step === 2) {
      const playerErrors = data.players.map((p) =>
        !isRequired(p.name) || !isRequired(p.role) ? 'Enter a name and select a role.' : null,
      )
      if (playerErrors.some(Boolean)) next.players = playerErrors
    }
    if (step === 3) {
      if (!isRequired(data.coachName)) next.coachName = "Enter the coach's name."
      if (!isValidMobile(data.coachMobile)) next.coachMobile = 'Enter a valid 10-digit mobile number.'
    }
    return next
  }

  const goNext = () => {
    const next = validateStep()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setErrors({})
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = () => {
    setData(EMPTY_DATA)
    setStep(0)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className={styles.card}>
        <div className={styles.successPanel} role="status">
          ✓ Team entry submitted! Our league team will review and confirm your squad.
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <StepIndicator steps={STEPS} currentStep={step} />

      <div className={styles.stepBody}>
        {step === 0 && <StepSchoolAndSport data={data} update={update} errors={errors} />}
        {step === 1 && <StepCategory data={data} update={update} errors={errors} />}
        {step === 2 && <StepPlayers data={data} update={update} errors={errors} />}
        {step === 3 && <StepCoach data={data} update={update} errors={errors} />}
        {step === 4 && <StepReview data={data} />}
      </div>

      <div className={styles.navRow}>
        {step > 0 && (
          <button type="button" className={styles.backBtn} onClick={goBack}>
            ← Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" className={styles.nextBtn} onClick={goNext}>
            Continue →
          </button>
        ) : (
          <button type="button" className={styles.nextBtn} onClick={handleSubmit}>
            Submit Team Entry
          </button>
        )}
      </div>
    </div>
  )
}
