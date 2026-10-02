import { useState } from 'react'
import Container from '../../ui/Container'
import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import { networkCategories } from '@/data/network'
import NetworkTabs from './NetworkTabs'
import NetworkCard from './NetworkCard'
import styles from './Network.module.css'

/**
 * The people/partners directory — Partner Schools, Brand Ambassadors,
 * Internal Team, League Commissioners, Promoters, Investors. Pre-launch, so
 * every entry is placeholder/sample data (see `data/network.js`).
 */
export default function Network() {
  const [activeKey, setActiveKey] = useState(networkCategories[0].key)
  const activeCategory = networkCategories.find((cat) => cat.key === activeKey)

  return (
    <section className={styles.network} id="network">
      <Container>
        <Reveal>
          <SectionHeading
            tag="Our Network"
            tagColor="var(--blue)"
            tagLineColor="var(--sky)"
            title="The people and partners building PNP Sports"
            description="From partner schools to the commissioners running each league — here's who's involved. Profiles below are placeholders until onboarding is complete."
            centered
          />
        </Reveal>

        <Reveal>
          <NetworkTabs categories={networkCategories} activeKey={activeKey} onSelect={setActiveKey} />

          <div className={styles.grid}>
            {activeCategory.entries.map((entry, i) => (
              <NetworkCard key={`${entry.name}-${i}`} {...entry} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
