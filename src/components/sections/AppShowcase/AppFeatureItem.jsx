import FeatureRow from '../../ui/FeatureRow'
import styles from './AppShowcase.module.css'

/** One row in the app's feature list — a bordered list item wrapping FeatureRow. */
export default function AppFeatureItem({ icon, tileVariant, title, description }) {
  return (
    <li className={styles.featureItem}>
      <FeatureRow icon={icon} tileVariant={tileVariant} title={title} description={description} />
    </li>
  )
}
