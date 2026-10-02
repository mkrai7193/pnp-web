import Button from '@/components/ui/Button'
import styles from './GetStarted.module.css'

/** One big choice card on the Get Started hub page. */
export default function OptionCard({ icon, title, description, to, cta }) {
  return (
    <div className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button to={to} variant="primary">
        {cta}
      </Button>
    </div>
  )
}
