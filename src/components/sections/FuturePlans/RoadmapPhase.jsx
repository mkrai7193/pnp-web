import styles from './FuturePlans.module.css'

/** One roadmap phase card. */
export default function RoadmapPhase({ phase, year, title, description, status }) {
  return (
    <div className={`${styles.card} ${status === 'current' ? styles.current : ''}`}>
      <div className={styles.badgeRow}>
        <span className={styles.phase}>{phase}</span>
        <span className={styles.year}>{year}</span>
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
      {status === 'current' && <span className={styles.liveTag}>In progress</span>}
    </div>
  )
}
