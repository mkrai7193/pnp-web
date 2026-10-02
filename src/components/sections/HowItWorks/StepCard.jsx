import styles from './HowItWorks.module.css'

/** One numbered card in the 4-step franchise journey. */
export default function StepCard({ num, variant, title, description }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.badge} ${styles[variant]}`}>{num}</div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}
