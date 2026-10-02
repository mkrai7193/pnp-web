const SITE_URL = 'https://pnpsports.in'

/** JSON-LD Organization + WebSite structured data, injected once on the homepage. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'PNP Sports Management LLP',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      slogan: 'Where Champions Are Made',
      description:
        "India's first franchise-based multi-sport league platform, launching with cricket in 2026.",
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'PNP Sports Management LLP',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export { SITE_URL }
