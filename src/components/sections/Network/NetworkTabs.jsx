import styles from './Network.module.css'

/** Category tab strip for the Network directory. */
export default function NetworkTabs({ categories, activeKey, onSelect }) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Network category">
      {categories.map((cat) => (
        <button
          key={cat.key}
          type="button"
          role="tab"
          aria-selected={cat.key === activeKey}
          className={`${styles.tab} ${cat.key === activeKey ? styles.tabActive : ''}`}
          onClick={() => onSelect(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
