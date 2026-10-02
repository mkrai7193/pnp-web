import styles from './LeagueStructure.module.css'

/** One tier of the district → national pyramid. */
export default function PyramidLevel({ level, icon, title, subtitle, titleColor }) {
  return (
    <div className={`${styles.level} ${styles[`level${level.toUpperCase()}`]}`}>
      <div className={styles.levelTitle} style={{ color: titleColor }}>
        {icon && <span aria-hidden="true">{icon} </span>}
        {title}
      </div>
      <div className={styles.levelSub}>{subtitle}</div>
    </div>
  )
}
