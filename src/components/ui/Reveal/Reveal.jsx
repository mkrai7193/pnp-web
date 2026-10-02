import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import styles from './Reveal.module.css'

/**
 * Fades + slides children into view the first time they scroll on-screen.
 * `delay` (0-3) staggers a group of siblings, matching the original site's
 * `.reveal-delay-1/2/3` classes.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const { ref, visible } = useRevealOnScroll()

  const classes = [
    styles.reveal,
    visible ? styles.visible : '',
    delay ? styles[`delay${delay}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  )
}
