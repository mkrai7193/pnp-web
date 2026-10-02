import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import ParticipateForm from '@/components/forms/ParticipateForm'
import Seo from '@/seo/Seo'
import styles from './FormPage.module.css'

export default function Participate() {
  return (
    <section className={styles.page}>
      <Seo
        title="Enter a Team — PNP Sports Management LLP"
        description="Select your sport, age category, and gender, build your squad, and enter your team for the PNP Sports season."
        path="/participate"
      />
      <Container>
        <div className={styles.wrapWide}>
          <SectionHeading
            tag="Participate"
            tagColor="var(--blue)"
            tagLineColor="var(--sky)"
            title="Enter your team"
            description="Build your squad in five quick steps — sport, category, players, coach, and review."
            centered
          />
          <ParticipateForm />
        </div>
      </Container>
    </section>
  )
}
