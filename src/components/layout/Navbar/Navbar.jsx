import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '@/data/navLinks'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useMobileMenu } from '@/hooks/useMobileMenu'
import Button from '../../ui/Button'
import logo from '@/assets/logo.png'
import MobileMenu from './MobileMenu'
import NavDropdown from './NavDropdown'
import styles from './Navbar.module.css'

/** Sticky site header: logo, in-page section links, and the two waitlist CTAs. */
export default function Navbar() {
  const scrolled = useScrollPosition(20)
  const { isOpen, toggle, close } = useMobileMenu()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const isAnchor = (href) => href.startsWith('#')
  const linkTo = (href) => (isAnchor(href) ? (isHome ? href : `/${href}`) : href)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logoWrap} onClick={close}>
            <img src={logo} alt="PNP Sports Management LLP" className={styles.logoImg} />
          </Link>

          <ul className={styles.links}>
            {navLinks.map((link) =>
              link.children ? (
                <NavDropdown key={link.label} label={link.label} items={link.children} />
              ) : (
                <li key={link.href}>
                  {isAnchor(link.href) && isHome ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <Link to={linkTo(link.href)}>{link.label}</Link>
                  )}
                </li>
              ),
            )}
          </ul>

          <div className={styles.right}>
            <Button href={isHome ? '#waitlist' : '/#waitlist'} variant="outline" className={styles.ctaOutline}>
              Get Notified
            </Button>
            <Button to="/get-started" variant="primary" className={styles.ctaPrimary}>
              Get Started
            </Button>
          </div>

          <button
            type="button"
            className={styles.hamburger}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={toggle}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onLinkClick={close} isHome={isHome} linkTo={linkTo} />
    </nav>
  )
}
