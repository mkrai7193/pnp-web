import { Link, useLocation } from 'react-router-dom'
import Container from '../../ui/Container'
import { footerColumns, socialLinks } from '@/data/footerLinks'
import logo from '@/assets/logo.png'
import styles from './Footer.module.css'

/** Site footer: brand blurb + socials, three link columns, and the copyright bar. */
export default function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const year = new Date().getFullYear()

  const renderLink = (link) => {
    if (link.internal) {
      return <Link to={link.href}>{link.label}</Link>
    }
    const href = isHome || link.href === '#' ? link.href : `/${link.href}`
    return isHome ? <a href={link.href}>{link.label}</a> : <Link to={href}>{link.label}</Link>
  }

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logoWrap}>
              <img src={logo} alt="PNP Sports Management LLP" className={styles.logoImg} />
            </Link>
            <p>
              India&apos;s first franchise-based multi-sport league platform. District to
              national — we manage the complete journey for franchises, players, and fans.
            </p>
            <div className={styles.socialRow}>
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className={styles.socBtn} aria-label={social.name}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div className={styles.col} key={col.heading}>
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>{renderLink(link)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomBrand}>
            <span className={styles.bar} />
            <span>© {year} PNP Sports Management LLP. All rights reserved.</span>
          </div>
          <span>Built for Indian sport. Built for every champion.</span>
        </div>
      </Container>
    </footer>
  )
}
