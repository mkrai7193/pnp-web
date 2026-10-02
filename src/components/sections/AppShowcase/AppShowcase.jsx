import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import Button from '../../ui/Button'
import { appFeatures } from '@/data/appFeatures'
import AppFeatureItem from './AppFeatureItem'
import PhoneMockup from './PhoneMockup'
import styles from './AppShowcase.module.css'

/** "The App" section: feature list on the left, live-scorecard phone mockup on the right. */
export default function AppShowcase() {
  return (
    <section className={styles.appSec} id="app">
      <Container>
        <div className={styles.grid}>
          <Reveal>
            <SectionHeading
              tag="The PNP App"
              tagColor="var(--blue)"
              tagLineColor="var(--blue)"
              title="Your entire league in one app"
            />
            <p className={styles.intro}>
              Live scores, match schedules, team management, and streaming — everything your
              league needs, built for mobile.
            </p>
            <ul className={styles.featureList}>
              {appFeatures.map((feature) => (
                <AppFeatureItem key={feature.title} {...feature} />
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <Button href="#waitlist" variant="primary">
                Get Early Access
              </Button>
              <Button href="#waitlist" variant="outline">
                Notify me at launch
              </Button>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <PhoneMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
