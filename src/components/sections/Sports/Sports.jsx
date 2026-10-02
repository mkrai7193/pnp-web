import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import { sportsList } from '@/data/sportsList'
import SportCard from './SportCard'
import styles from './Sports.module.css'

/** The sports roadmap: Cricket launching in 2026, with Football/Basketball/Table Tennis to follow. */
export default function Sports() {
  return (
    <section className={styles.sports} id="sports">
      <Container>
        <Reveal>
          <SectionHeading
            tag="Sports"
            tagColor="var(--green-light)"
            tagLineColor="var(--green)"
            title={
              <>
                Starting with Cricket.
                <br />
                Built for every sport.
              </>
            }
            description="We launch with cricket in 2026 and expand sport by sport. The platform is architectured from day one to handle them all."
            centered
          />
        </Reveal>

        <Reveal className={styles.grid}>
          {sportsList.map((sport) => (
            <SportCard key={sport.title} {...sport} />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
