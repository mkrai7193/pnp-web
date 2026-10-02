import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import TermsOfUse from '@/pages/TermsOfUse'
import GetStarted from '@/pages/GetStarted'
import OnboardPlayer from '@/pages/OnboardPlayer'
import OnboardSchool from '@/pages/OnboardSchool'
import Participate from '@/pages/Participate'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/onboarding/player" element={<OnboardPlayer />} />
        <Route path="/onboarding/school" element={<OnboardSchool />} />
        <Route path="/participate" element={<Participate />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
