import { useEffect, useState } from 'react'

/**
 * Tracks whether the page has been scrolled past `threshold`.
 * Used by the navbar to switch to its "scrolled" (blurred) state.
 */
export function useScrollPosition(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
