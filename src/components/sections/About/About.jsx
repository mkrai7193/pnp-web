import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import Pill from '../../ui/Pill'
import Button from '../../ui/Button'
import { sportsPills } from '@/data/sportsPills'
import { aboutPills } from '@/data/aboutPills'
import logo from '@/assets/logo.png'
import SportPill from './SportPill'
import styles from './About.module.css'

/** Mission statement + the brand card showing the 6 sports the platform will host. */
export default function About() {
  return (
    <section className={styles.about} id="about">
      <Container>
        <div className={styles.grid}>
          <Reveal className={styles.visual}>
            <div className={styles.card}>
              <div className={styles.logoDisplay}>
                <img src={logo} alt="PNP Sports Management LLP logo" className={styles.logoImg} />
              </div>
              <div className={styles.sportRow}>
                {sportsPills.map((pill) => (
                  <SportPill key={pill.label} {...pill} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={2} className={styles.text}>
            <SectionHeading
              tag="About PNP Sports"
              tagColor="var(--blue)"
              tagLineColor="var(--sky)"
              title="Building India's grassroots sports ecosystem"
            />
            <p>
              PNP Sports Management LLP is on a mission to create a structured, franchise-based
              sports platform that gives every district, school, college, and community
              organisation a legitimate path from local competition to the national stage.
            </p>
            <p>
              We are launching with cricket — the heartbeat of India — on a platform architected
              from day one to expand across every sport. Our technology, our league structure, and
              our franchise model are all designed with one goal: to make Indian sports accessible,
              competitive, and exciting at every level.
            </p>
            <div className={styles.pills}>
              {aboutPills.map((pill) => (
                <Pill key={pill.label} variant={pill.variant}>
                  {pill.label}
                </Pill>
              ))}
            </div>
            <Button href="#waitlist" variant="primary">
              Register Your Franchise Interest
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
