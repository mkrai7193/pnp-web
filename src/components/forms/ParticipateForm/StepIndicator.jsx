import styles from './ParticipateForm.module.css'

/** Progress strip across the top of the Participate wizard. */
export default function StepIndicator({ steps, currentStep }) {
  return (
    <ol className={styles.stepIndicator}>
      {steps.map((label, i) => (
        <li
          key={label}
          className={`${styles.step} ${i === currentStep ? styles.stepActive : ''} ${i < currentStep ? styles.stepDone : ''}`}
        >
          <span className={styles.stepDot}>{i < currentStep ? '✓' : i + 1}</span>
          <span className={styles.stepLabel}>{label}</span>
        </li>
      ))}
    </ol>
  )
}
