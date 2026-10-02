import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import PlayerOnboardForm from '@/components/forms/PlayerOnboardForm'
import Seo from '@/seo/Seo'
import styles from './FormPage.module.css'

export default function OnboardPlayer() {
  return (
    <section className={`${styles.page} ${styles.onboardPage}`}>
      <Seo
        title="Player Onboarding — PNP Sports Management LLP"
        description="Register as a player under your school for the PNP Sports season."
        path="/onboarding/player"
      />
      <Container>
        <div className={styles.wrap}>
          <SectionHeading
            title="Register as a player"
            description="Tell us about yourself and your school. Trials and team selection details follow once your school is onboarded."
            centered
            className={styles.onboardHeader}
          />
          <PlayerOnboardForm />
        </div>
      </Container>
    </section>
  )
}
