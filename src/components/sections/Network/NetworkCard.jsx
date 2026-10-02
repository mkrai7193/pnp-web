import styles from './Network.module.css'

function initials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** One person/partner card: initials avatar, name, role. */
export default function NetworkCard({ name, role, placeholder }) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar} aria-hidden="true">
        {initials(name)}
      </div>
      <div>
        <h4>{name}</h4>
        <p>{role}</p>
        {placeholder && <span className={styles.sampleTag}>Sample</span>}
      </div>
    </div>
  )
}
