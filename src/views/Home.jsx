'use client'

import useScrollReveal from '@/hooks/useScrollReveal'
import Hero            from '@/components/Hero'
import Marquee         from '@/components/Marquee'
import HowItWorks      from '@/components/HowItWorks'
import Services        from '@/components/Services'
import Stats           from '@/components/Stats'
import Trust           from '@/components/Trust'
import Diff            from '@/components/Diff'
import Solution        from '@/components/Solution'
import Reviews         from '@/components/Reviews'
import Partners        from '@/components/Partners'

export default function Home() {
  useScrollReveal()

  return (
    <>
      <Hero />
      <Marquee />
      <HowItWorks />
      <Services />
      <Stats />
      <Trust />
      <Diff />
      <Solution />
      <Partners />
      <Reviews />
    </>
  )
}
