import { useState } from 'react'
import { SiteNav } from './components/SiteNav'
import { WaitlistDialog } from './components/WaitlistDialog'
import { HeroSection } from './sections/HeroSection'
import { PresenceSection } from './sections/PresenceSection'
import { CharacterSection } from './sections/CharacterSection'
import { ModelSection } from './sections/ModelSection'
import { ChatSection } from './sections/ChatSection'
import { AutomationSection } from './sections/AutomationSection'
import { TrustSection } from './sections/TrustSection'
import { PricingSection } from './sections/PricingSection'
import { ClosingSection } from './sections/ClosingSection'

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const openWaitlist = () => setWaitlistOpen(true)

  return (
    <div className="app-shell">
      <SiteNav onWaitlist={openWaitlist} />
      <main>
        <HeroSection onWaitlist={openWaitlist} />
        <PresenceSection />
        <CharacterSection />
        <ModelSection />
        <ChatSection />
        <AutomationSection />
        <TrustSection />
        <PricingSection onWaitlist={openWaitlist} />
        <ClosingSection onWaitlist={openWaitlist} />
      </main>
      <WaitlistDialog open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  )
}
