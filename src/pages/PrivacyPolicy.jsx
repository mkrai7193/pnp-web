import Container from '@/components/ui/Container'
import Seo from '@/seo/Seo'
import styles from './StaticPage.module.css'

/**
 * Placeholder policy page — the live site links "Privacy Policy" to "#"
 * with no content yet. Structure and copy here are provisional and should
 * be replaced with legally-reviewed text before launch.
 */
export default function PrivacyPolicy() {
  return (
    <section className={styles.page}>
      <Seo
        title="Privacy Policy — PNP Sports Management LLP"
        description="How PNP Sports Management LLP collects, uses, and protects your information."
        path="/privacy-policy"
      />
      <Container>
        <div className={styles.content}>
          <h1>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: Pre-launch draft</p>
          <p className={styles.notice}>
            This is placeholder content for the PNP Sports Management pre-launch site. It will be
            replaced with a legally-reviewed policy before public launch.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you register your interest through our waitlist form, we collect your name, email
            address, phone number, district/city, and the type of interest you select (e.g.
            franchise owner, fan, sponsor).
          </p>

          <h2>How We Use It</h2>
          <ul>
            <li>To notify you about platform launch and franchise application windows.</li>
            <li>To prioritise your access based on your stated interest.</li>
            <li>To send occasional updates about PNP Sports Management news.</li>
          </ul>

          <h2>Contact</h2>
          <p>Questions about this policy can be sent through our registration form.</p>
        </div>
      </Container>
    </section>
  )
}
