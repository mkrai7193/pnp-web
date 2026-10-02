import FormField from '@/components/ui/FormField'
import { partnerSchools } from '@/data/partnerSchools'
import { sportsList } from '@/data/sportsList'
import styles from './ParticipateForm.module.css'

/** Step 1: which school the team represents, and which sport they're entering. */
export default function StepSchoolAndSport({ data, update, errors }) {
  return (
    <div>
      <FormField
        as="select"
        id="participate-school"
        label="School Name"
        required
        value={data.school}
        onChange={(e) => update({ school: e.target.value })}
        error={errors.school}
        options={[{ value: '', label: 'Select your school' }, ...partnerSchools.map((s) => s.name)]}
      />

      <label className={styles.fieldLabel}>
        Select Sport <span className={styles.required}>*</span>
      </label>
      <div className={styles.sportGrid}>
        {sportsList.map((sport) => {
          const disabled = sport.status !== 'launch'
          const selected = data.sport === sport.title
          return (
            <button
              key={sport.title}
              type="button"
              disabled={disabled}
              className={`${styles.sportOption} ${selected ? styles.sportOptionActive : ''}`}
              onClick={() => update({ sport: sport.title })}
            >
              <span className={styles.sportIcon}>{sport.icon}</span>
              {sport.title}
              {disabled && <span className={styles.sportDisabledTag}>Coming soon</span>}
            </button>
          )
        })}
      </div>
      {errors.sport && <p className={styles.fieldError}>{errors.sport}</p>}
    </div>
  )
}
