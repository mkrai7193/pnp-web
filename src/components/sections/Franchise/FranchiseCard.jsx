import FeatureRow from '../../ui/FeatureRow'
import styles from './Franchise.module.css'

/** One franchise-owner type card (Schools, Professional Orgs, Individuals, Digital Toolkit). */
export default function FranchiseCard({ icon, tileVariant, title, description }) {
  return (
    <div className={styles.card}>
      <FeatureRow icon={icon} tileVariant={tileVariant} tileSize="sm" title={title} description={description} />
    </div>
  )
}
