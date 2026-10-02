import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Seo from '@/seo/Seo'
import OptionCard from './OptionCard'
import styles from './GetStarted.module.css'

const OPTIONS = [
  {
    icon: '🧑‍🎓',
    title: 'Onboard as a Player',
    description: 'Register as a player under your school and get ready for trials and team selection.',
    to: '/onboarding/player',
    cta: 'Onboard as a Player',
  },
  {
    icon: '🏫',
    title: 'Onboard Your School',
    description: 'Register your school as a PNP partner institution and unlock team participation.',
    to: '/onboarding/school',
    cta: 'Onboard Your School',
  },
  {
    icon: '🏆',
    title: 'Enter a Team',
    description: 'Already onboarded? Select your sport, category, and build your squad for the season.',
    to: '/participate',
    cta: 'Enter a Team',
  },
]

/** A single entry point for the three registration flows, linked from the navbar's "Get Started" CTA. */
export default function GetStarted() {
  return (
    <section className={styles.page}>
      <Seo
        title="Get Started — PNP Sports Management LLP"
        description="Onboard as a player, register your school, or enter a team for the PNP Sports season."
        path="/get-started"
      />
      <Container>
        <SectionHeading
          tag="Get Started"
          tagColor="var(--blue)"
          tagLineColor="var(--sky)"
          title="How would you like to get involved?"
          description="Pick the path that fits you — player, school, or team entry. Every path takes a few minutes."
          centered
        />

        <div className={styles.grid}>
          {OPTIONS.map((option) => (
            <OptionCard key={option.title} {...option} />
          ))}
        </div>

        <p className={styles.footNote}>
          Just want updates instead? <a href="/#waitlist">Register your interest on the waitlist →</a>
        </p>
      </Container>
    </section>
  )
}
