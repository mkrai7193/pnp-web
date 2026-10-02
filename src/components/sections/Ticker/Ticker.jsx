import { tickerItems } from '@/data/tickerItems'
import styles from './Ticker.module.css'

/** Infinite horizontal marquee. The item list is rendered twice back-to-back
 *  so the CSS animation (translateX -50%) loops seamlessly. */
export default function Ticker() {
  const items = [...tickerItems, ...tickerItems]

  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.inner}>
        {items.map((item, i) => (
          <span key={i} className={`${styles.item} ${item.accent ? styles.accent : ''}`}>
            {item.accent && <span className={styles.dot} />}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
