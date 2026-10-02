import { useCallback, useState } from 'react'

/** Open/close state for the navbar's mobile menu. */
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen((open) => !open), [])
  const close = useCallback(() => setIsOpen(false), [])

  return { isOpen, toggle, close }
}
