import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import { roadmap } from '@/data/roadmap'
import RoadmapPhase from './RoadmapPhase'
import styles from './FuturePlans.module.css'

/** The multi-phase roadmap: cricket launch now, more sports and scale later. */
export default function FuturePlans() {
  return (
    <section className={styles.future} id="future-plans">
      <Container>
        <Reveal>
          <SectionHeading
            tag="Future Plans"
            tagColor="var(--green)"
            tagLineColor="var(--green)"
            title="Where PNP Sports is headed"
            description="Cricket is just the start. Here's the roadmap for scaling across districts, states, and sports."
            centered
          />
        </Reveal>

        <div className={styles.grid}>
          {roadmap.map((item, i) => (
            <Reveal key={item.phase} delay={i % 4}>
              <RoadmapPhase {...item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
