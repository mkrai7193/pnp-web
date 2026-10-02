import styles from './LeagueStructure.module.css'

/** One of the three summary stat cards (Districts / State Championships / National Title). */
export default function LeagueCard({ num, plus, plusColor, colorVar, accentClass, title, description }) {
  return (
    <div className={`${styles.card} ${styles[accentClass]}`}>
      <div className={styles.num} style={{ color: colorVar }}>
        {num}
        {plus && (
          <span style={{ color: plusColor, fontSize: '32px' }}>+</span>
        )}
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}
