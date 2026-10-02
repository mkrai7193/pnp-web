import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import SchoolOnboardForm from '@/components/forms/SchoolOnboardForm'
import Seo from '@/seo/Seo'
import styles from './FormPage.module.css'

export default function OnboardSchool() {
  return (
    <section className={`${styles.page} ${styles.onboardPage}`}>
      <Seo
        title="School Onboarding — PNP Sports Management LLP"
        description="Register your school as a PNP Sports partner institution."
        path="/onboarding/school"
      />
      <Container>
        <div className={styles.wrap}>
          <SectionHeading
            title="Register your school"
            description="Partner your school with PNP Sports so your students can register as players and enter teams."
            centered
            className={styles.onboardHeader}
          />
          <SchoolOnboardForm />
        </div>
      </Container>
    </section>
  )
}
