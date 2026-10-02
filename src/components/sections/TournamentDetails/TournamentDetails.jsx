import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import { tournamentDetails } from '@/data/tournamentDetails'
import DetailCard from './DetailCard'
import styles from './TournamentDetails.module.css'

/** Format, qualification system, prize money, and venues at a glance. */
export default function TournamentDetails() {
  return (
    <section className={styles.tournament} id="tournament">
      <Container>
        <Reveal>
          <SectionHeading
            tag="Tournament Details"
            tagColor="var(--sky)"
            tagLineColor="var(--sky)"
            title="Everything you need to know about the season"
            description="The core rules of competition — how matches are played, how franchises qualify, and what's at stake."
            centered
          />
        </Reveal>

        <Reveal className={styles.grid}>
          {tournamentDetails.map((detail) => (
            <DetailCard key={detail.title} {...detail} />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
