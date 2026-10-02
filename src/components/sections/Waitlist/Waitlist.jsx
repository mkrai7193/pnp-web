import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import { waitlistBenefits } from '@/data/waitlistBenefits'
import WaitlistForm from './WaitlistForm'
import styles from './Waitlist.module.css'

/** Pre-launch early-access pitch: benefits checklist + the registration form. */
export default function Waitlist() {
  return (
    <section className={styles.waitlist} id="waitlist">
      <div className={styles.bg} />
      <Container>
        <div className={styles.inner}>
          <Reveal className={styles.left}>
            <SectionHeading
              tag="Early Access"
              tagColor="var(--gold)"
              tagLineColor="var(--gold)"
              title="Be first. Register your interest today."
              light
            />
            <p>
              PNP Sports Management LLP is currently in pre-launch. Register now to be notified at
              launch, get priority franchise application access, and receive exclusive
              early-adopter benefits.
            </p>
            <ul className={styles.benefits}>
              {waitlistBenefits.map((benefit) => (
                <li key={benefit}>
                  <span className={styles.check} aria-hidden="true">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={2} className={styles.right}>
            <WaitlistForm />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
