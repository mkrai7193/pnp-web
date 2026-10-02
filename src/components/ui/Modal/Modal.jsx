import { useEffect, useRef } from 'react'
import styles from './Modal.module.css'

/**
 * Generic popup dialog: overlay + centered card. Closes on Escape, on
 * clicking the overlay, or via the close button. Locks page scroll while
 * open. Not a portal — relies on `position: fixed` to sit above page
 * content regardless of where it's mounted in the tree.
 */
export default function Modal({ open, onClose, title, children }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    cardRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={cardRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
          ✕
        </button>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
