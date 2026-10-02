import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Seo from '@/seo/Seo'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import About from '@/components/sections/About'
import HowItWorks from '@/components/sections/HowItWorks'
import TournamentDetails from '@/components/sections/TournamentDetails'
import AppShowcase from '@/components/sections/AppShowcase'
import LeagueStructure from '@/components/sections/LeagueStructure'
import Network from '@/components/sections/Network'
import Franchise from '@/components/sections/Franchise'
import Sports from '@/components/sections/Sports'
import FuturePlans from '@/components/sections/FuturePlans'
import Waitlist from '@/components/sections/Waitlist'

/**
 * The full marketing page, section-by-section. Also handles landing on "/"
 * with a hash (e.g. a nav link clicked from /privacy-policy) by scrolling to
 * that section once the content is mounted.
 */
export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const target = document.querySelector(hash)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <>
      <Seo
        title="PNP Sports Management LLP — Where Champions Are Made"
        description="India's first franchise-based multi-sport league platform. Own a franchise, build your team, and rise from your district to the national stage. Launching with cricket in 2026."
        path="/"
        schema
      />
      <Hero />
      <Ticker />
      <About />
      <HowItWorks />
      <TournamentDetails />
      <AppShowcase />
      <LeagueStructure />
      <Network />
      <Franchise />
      <Sports />
      <FuturePlans />
      <Waitlist />
    </>
  )
}
