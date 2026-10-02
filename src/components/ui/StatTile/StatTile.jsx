import styles from './StatTile.module.css'

/**
 * A single number + label stat. `variant="bar"` is the Hero's 4-up stat
 * strip (colored top border, translucent background); `variant="framed"`
 * is the Franchise section's bordered stat boxes.
 */
export default function StatTile({
  value,
  suffix,
  suffixColor,
  label,
  valueColor = 'var(--text-main)',
  barColor,
  variant = 'bar',
}) {
  const classes = [styles.tile, variant === 'framed' ? styles.framed : styles.bar]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} style={variant === 'bar' ? { '--bar-color': barColor } : undefined}>
      <div className={styles.value} style={{ color: valueColor }}>
        {value}
        {suffix && <span style={{ color: suffixColor ?? valueColor }}>{suffix}</span>}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}
