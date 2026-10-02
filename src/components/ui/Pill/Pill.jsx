import styles from './Pill.module.css'

const VARIANTS = {
  blue: styles.blue,
  green: styles.green,
  gold: styles.gold,
}

/** Small rounded badge, e.g. the "Franchise Model" / "Multi-Sport" tags under About. */
export default function Pill({ variant = 'blue', children }) {
  return <span className={`${styles.pill} ${VARIANTS[variant] ?? VARIANTS.blue}`}>{children}</span>
}
