import Container from '@/components/ui/Container'
import Seo from '@/seo/Seo'
import styles from './StaticPage.module.css'

/**
 * Placeholder terms page — the live site links "Terms of Use" to "#" with
 * no content yet. Structure and copy here are provisional and should be
 * replaced with legally-reviewed text before launch.
 */
export default function TermsOfUse() {
  return (
    <section className={styles.page}>
      <Seo
        title="Terms of Use — PNP Sports Management LLP"
        description="The terms governing use of the PNP Sports Management LLP platform and services."
        path="/terms-of-use"
      />
      <Container>
        <div className={styles.content}>
          <h1>Terms of Use</h1>
          <p className={styles.updated}>Last updated: Pre-launch draft</p>
          <p className={styles.notice}>
            This is placeholder content for the PNP Sports Management pre-launch site. It will be
            replaced with legally-reviewed terms before public launch.
          </p>

          <h2>Pre-Launch Registration</h2>
          <p>
            Registering your interest does not guarantee a franchise allocation or platform
            access. It reserves your place for priority communication once applications open.
          </p>

          <h2>Franchise Applications</h2>
          <p>
            Franchise ownership will be subject to a separate application and agreement process,
            to be published alongside the platform launch.
          </p>

          <h2>Contact</h2>
          <p>Questions about these terms can be sent through our registration form.</p>
        </div>
      </Container>
    </section>
  )
}
