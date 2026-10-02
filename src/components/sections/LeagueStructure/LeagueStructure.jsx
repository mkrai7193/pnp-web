import { Fragment } from 'react'
import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import { leaguePyramid } from '@/data/leaguePyramid'
import { leagueStats } from '@/data/leagueStats'
import PyramidLevel from './PyramidLevel'
import LeagueCard from './LeagueCard'
import styles from './LeagueStructure.module.css'

/** The three-tier competition structure: franchise formation → district → state → national. */
export default function LeagueStructure() {
  return (
    <section className={styles.league} id="leagues">
      <Container>
        <Reveal>
          <SectionHeading
            tag="League Structure"
            tagColor="var(--blue)"
            tagLineColor="var(--sky)"
            title="Built from the grassroots up"
            description="A transparent three-tier competition that takes the best local franchise all the way to the national final."
            centered
          />
        </Reveal>

        <Reveal>
          <div className={styles.pyramid}>
            {leaguePyramid.map((level, i) => (
              <Fragment key={level.level}>
                <PyramidLevel {...level} />
                {i < leaguePyramid.length - 1 && <div className={styles.arrow}>▼</div>}
              </Fragment>
            ))}
          </div>
        </Reveal>

        <div className={styles.cards}>
          {leagueStats.map((stat, i) => (
            <Reveal key={stat.title} delay={i}>
              <LeagueCard {...stat} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
