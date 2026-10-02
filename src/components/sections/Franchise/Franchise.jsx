import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import StatTile from '../../ui/StatTile'
import Button from '../../ui/Button'
import { franchiseTypes } from '@/data/franchiseTypes'
import { franchiseStats } from '@/data/franchiseStats'
import logo from '@/assets/logo.png'
import FranchiseCard from './FranchiseCard'
import styles from './Franchise.module.css'

/** Pitches franchise ownership to schools, firms, and individual investors. */
export default function Franchise() {
  return (
    <section className={styles.franchise} id="franchise">
      <Container>
        <div className={styles.grid}>
          <Reveal className={styles.visual}>
            <div className={styles.logoRow}>
              <img src={logo} alt="PNP Sports Management LLP" className={styles.logoImg} />
            </div>
            <div className={styles.stats}>
              {franchiseStats.map((stat) => (
                <StatTile key={stat.label} variant="framed" value={stat.value} valueColor={stat.color} label={stat.label} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={2} className={styles.text}>
            <SectionHeading
              tag="Own a Franchise"
              tagColor="var(--gold)"
              tagLineColor="var(--gold)"
              title="Be the franchise owner your district deserves"
            />
            <p className={styles.intro}>
              Whether you run a school, a college, a law firm, or simply love sport — you can own
              and manage a franchise that represents your district.
            </p>
            <div className={styles.cards}>
              {franchiseTypes.map((type) => (
                <FranchiseCard key={type.title} {...type} />
              ))}
            </div>
            <Button href="#waitlist" variant="gold" className={styles.cta}>
              Apply for a Franchise
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
