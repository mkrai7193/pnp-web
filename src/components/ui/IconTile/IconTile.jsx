import styles from './IconTile.module.css'

const VARIANTS = {
  'afi-1': styles.afi1,
  'afi-2': styles.afi2,
  'afi-3': styles.afi3,
  'afi-4': styles.afi4,
  'afi-5': styles.afi5,
  'fi-1': styles.fi1,
  'fi-2': styles.fi2,
  'fi-3': styles.fi3,
  'fi-4': styles.fi4,
}

/**
 * Rounded, tinted square holding a single emoji icon. Reused by the App
 * feature list and the Franchise-type cards — each variant maps to one of
 * the accent colors used across those two sections.
 */
export default function IconTile({ icon, variant, size = 'md' }) {
  const classes = [styles.tile, VARIANTS[variant] ?? '', size === 'sm' ? styles.sm : '']
    .filter(Boolean)
    .join(' ')
  return (
    <div className={classes} aria-hidden="true">
      {icon}
    </div>
  )
}
