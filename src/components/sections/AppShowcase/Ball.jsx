import styles from './PhoneMockup.module.css'

const VARIANTS = {
  dot: styles.bDot,
  run: styles.bRun,
  four: styles.bFour,
  six: styles.bSix,
  wkt: styles.bWkt,
}

/** One ball-outcome pill in the phone mockup's "last 6 balls" strip. */
export default function Ball({ type, label }) {
  return <div className={`${styles.ball} ${VARIANTS[type] ?? ''}`}>{label}</div>
}
