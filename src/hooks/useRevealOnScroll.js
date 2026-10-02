import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element (fade + translate) the first time it scrolls into view.
 * Mirrors the original site's IntersectionObserver-based `.reveal` behaviour.
 */
export function useRevealOnScroll() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
