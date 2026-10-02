import styles from './About.module.css'

/** Icon-over-label tile used in the About visual's 6-sport grid. */
export default function SportPill({ icon, label }) {
  return (
    <div className={styles.sportPill}>
      <span className={styles.sportPillIcon}>{icon}</span>
      <span>{label}</span>
    </div>
  )
}
