import { Link } from 'react-router-dom'
import { navLinks } from '@/data/navLinks'
import styles from './Navbar.module.css'

const isAnchor = (href) => href.startsWith('#')

/** Slide-down menu shown below the navbar on small screens. */
export default function MobileMenu({ isOpen, onLinkClick, isHome, linkTo }) {
  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
      {navLinks.map((link) => {
        if (link.children) {
          return (
            <div key={link.label} className={styles.mobileGroup}>
              <span className={styles.mobileGroupLabel}>{link.label}</span>
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  onClick={onLinkClick}
                  className={styles.mobileSubLink}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )
        }
        return isAnchor(link.href) && isHome ? (
          <a key={link.href} href={link.href} onClick={onLinkClick}>
            {link.label}
          </a>
        ) : (
          <Link key={link.href} to={linkTo(link.href)} onClick={onLinkClick}>
            {link.label}
          </Link>
        )
      })}
      <Link to="/get-started" className={styles.mobileCta} onClick={onLinkClick}>
        Get Started →
      </Link>
      {isHome ? (
        <a href="#waitlist" onClick={onLinkClick}>
          Register Interest
        </a>
      ) : (
        <Link to="/#waitlist" onClick={onLinkClick}>
          Register Interest
        </Link>
      )}
    </div>
  )
}
