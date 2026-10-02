import styles from './SectionHeading.module.css'

/**
 * The tag + h2 + optional description pattern repeated at the top of every
 * homepage section. `tagColor`/`tagLineColor` drive the small eyebrow label,
 * `centered` mirrors the `.section-header.center` sections (How It Works,
 * Leagues, Sports), and `light` is for headings placed on dark backgrounds
 * (Waitlist).
 */
export default function SectionHeading({
  tag,
  tagColor = 'var(--blue)',
  tagLineColor = 'var(--sky)',
  title,
  description,
  centered = false,
  light = false,
  className = '',
}) {
  const wrapperClasses = [styles.header, centered ? styles.centered : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClasses}>
      {tag && (
        <div className={styles.tag} style={{ color: tagColor }}>
          <span className={styles.tagLine} style={{ background: tagLineColor }} />
          {tag}
        </div>
      )}
      <h2 className={light ? styles.titleLight : ''}>{title}</h2>
      {description && (
        <p className={[styles.description, centered ? styles.descriptionCentered : ''].join(' ')}>
          {description}
        </p>
      )}
    </div>
  )
}
