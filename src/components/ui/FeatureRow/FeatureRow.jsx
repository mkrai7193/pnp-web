import IconTile from '../IconTile'
import styles from './FeatureRow.module.css'

/**
 * IconTile + title + description, laid out horizontally. This is the shared
 * inner content of the App feature list items and the Franchise-type cards —
 * each parent supplies its own outer wrapper styling (list row vs. card).
 */
export default function FeatureRow({ icon, tileVariant, tileSize, title, description }) {
  return (
    <div className={styles.row}>
      <IconTile icon={icon} variant={tileVariant} size={tileSize} />
      <div className={styles.text}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}
