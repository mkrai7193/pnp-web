import Container from '../../ui/Container'
import Button from '../../ui/Button'
import StatTile from '../../ui/StatTile'
import { heroStats } from '@/data/heroStats'
import styles from './Hero.module.css'

/** The first-viewport section: headline, description, CTAs, and the 4-stat strip. */
export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg} />
      <div className={styles.overlay} />
      <div className={styles.grid} />
      <div className={styles.accentLine} />
      <Container>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>PNP Sports Management LLP</span>
          </div>

          <h1>
            <span className={styles.line1}>Where</span>
            <span className={styles.line2}>Champions</span>
            <span className={styles.line3}>Are Made.</span>
          </h1>

          <p className={styles.desc}>
            India&apos;s first franchise-based multi-sport league platform.
            <br />
            <strong>
              Own a franchise. Build your team. Rise from your district to the national stage.
            </strong>
          </p>

          <div className={styles.cta}>
            <Button href="#waitlist" variant="primary">
              Register Your Interest
            </Button>
            <Button href="#how" variant="outline">
              How It Works
            </Button>
          </div>

          <div className={styles.statsGrid}>
            {heroStats.map((stat) => (
              <StatTile key={stat.label} variant="bar" {...stat} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
