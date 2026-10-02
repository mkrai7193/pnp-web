import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import { howItWorksSteps } from '@/data/howItWorksSteps'
import StepCard from './StepCard'
import styles from './HowItWorks.module.css'

/** The transparent 4-step pathway from franchise application to national champion. */
export default function HowItWorks() {
  return (
    <section className={styles.how} id="how">
      <Container>
        <Reveal>
          <SectionHeading
            tag="How It Works"
            tagColor="var(--green)"
            tagLineColor="var(--green)"
            title="Your journey from franchise to champion"
            description="A clear, transparent four-step pathway. Every franchise starts at the district level and earns its way to the top."
            centered
          />
        </Reveal>

        <div className={styles.stepsRow}>
          {howItWorksSteps.map((step, i) => (
            <Reveal key={step.num} delay={i}>
              <StepCard {...step} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
