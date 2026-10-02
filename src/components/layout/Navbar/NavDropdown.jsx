import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

/**
 * A nav item that reveals child links on hover/focus instead of navigating
 * directly — used for "Onboard" (see `data/navLinks.js` for why).
 */
export default function NavDropdown({ label, items }) {
  return (
    <li className={styles.dropdown}>
      <button type="button" className={styles.dropdownTrigger}>
        {label} <span aria-hidden="true">▾</span>
      </button>
      <ul className={styles.dropdownPanel}>
        {items.map((item) => (
          <li key={item.href}>
            <Link to={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </li>
  )
}
