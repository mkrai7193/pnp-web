import { Helmet } from 'react-helmet-async'
import { SITE_URL, organizationSchema } from './organizationSchema'

/**
 * Per-page SEO tags (title, description, canonical, Open Graph, Twitter card).
 * Pass `schema` only on the page that should carry the JSON-LD structured
 * data (the homepage) — every route sets its own title/description via this
 * component so each URL is independently indexable and shareable.
 */
export default function Seo({ title, description, path = '/', schema = false }) {
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PNP Sports Management LLP" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${SITE_URL}/favicon.png`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/favicon.png`} />

      {schema && <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>}
    </Helmet>
  )
}
