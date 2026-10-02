import styles from './TournamentDetails.module.css'

/** One tournament-detail card (Format / Qualification / Prize Money / Venues). */
export default function DetailCard({ icon, title, body, placeholder }) {
  return (
    <div className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h4>{title}</h4>
      <p>{body}</p>
      {placeholder && <span className={styles.badge}>To be confirmed</span>}
    </div>
  )
}
