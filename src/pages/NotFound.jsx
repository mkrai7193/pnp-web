import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Seo from '@/seo/Seo'
import styles from './StaticPage.module.css'

export default function NotFound() {
  return (
    <section className={styles.page}>
      <Seo
        title="Page Not Found — PNP Sports Management LLP"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <Container>
        <div className={styles.content}>
          <h1 className={styles.code}>404</h1>
          <h2>This page has left the field.</h2>
          <p>The page you're looking for doesn't exist or has moved.</p>
          <Button to="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  )
}
