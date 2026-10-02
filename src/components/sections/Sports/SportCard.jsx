import styles from './Sports.module.css'

/** One sport tile: emoji icon, title, description, and a launch-status badge. */
export default function SportCard({ icon, title, description, status, badge }) {
  const isLaunch = status === 'launch'
  return (
    <div className={`${styles.card} ${isLaunch ? styles.launch : styles.coming}`}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className={`${styles.badge} ${isLaunch ? styles.badgeLaunch : styles.badgeComing}`}>{badge}</div>
    </div>
  )
}
