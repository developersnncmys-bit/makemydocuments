'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Footer      from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'

const NO_FOOTER_SET = new Set([
  '/insurance', '/pan-card', '/pan-card-form', '/tourist-visa',
  '/rental-agreement', '/rental-agreement-form', '/lease-agreement',
  '/lease-agreement-form', '/passport', '/passport-form',
  '/senior-citizen-card', '/senior-citizen-card-form',
  '/police-verification', '/police-verification-form',
  '/msme-registration', '/msme-registration-form',
  '/police-clearance', '/police-clearance-certificate-form',
  '/affidavits', '/dubai-tourist-visa', '/dubai-tourist-visa-for-indians-form',
  '/singapore-visa', '/singapore-visa-form', '/uk-visa', '/uk-visa-form',
  '/australia-visa', '/australia-visa-form', '/malaysia-visa', '/malaysia-visa-form',
  '/egypt-visa', '/egypt-visa-form', '/vietnam-tourist-visa',
  '/vietnam-tourist-visa-form', '/hong-kong-tourist-visa-for-indians',
  '/hong-kong-visa-form', '/indonesia-tourist-visa-for-indians',
  '/indonesia-visa-form', '/azerbaijan-visa', '/azerbaijan-visa-form',
  '/oman-visa', '/oman-visa-form', '/morocco-visa', '/morocco-visa-form',
  '/bahrain-visa', '/bahrain-visa-form', '/qatar-visa', '/qatar-visa-form',
  '/russia-visa', '/russia-visa-form', '/uzbekistan-visa', '/uzbekistan-visa-form',
  '/two-wheeler-insurance-form',
  '/four-wheeler-insurance-form',
  '/health-insurance-form',
])

const NO_WA_FAB_SET = new Set([
  '/pan-card', '/pan-card-form', '/rental-agreement', '/rental-agreement-form',
  '/lease-agreement', '/lease-agreement-form', '/passport', '/passport-form',
  '/senior-citizen-card', '/senior-citizen-card-form',
  '/police-verification', '/police-verification-form',
  '/msme-registration', '/msme-registration-form',
  '/police-clearance', '/police-clearance-certificate-form',
  '/affidavits', '/dubai-tourist-visa', '/dubai-tourist-visa-for-indians-form',
  '/singapore-visa', '/singapore-visa-form', '/uk-visa', '/uk-visa-form',
  '/australia-visa', '/australia-visa-form', '/malaysia-visa', '/malaysia-visa-form',
  '/egypt-visa', '/egypt-visa-form', '/vietnam-tourist-visa',
  '/vietnam-tourist-visa-form', '/hong-kong-tourist-visa-for-indians',
  '/hong-kong-visa-form', '/indonesia-tourist-visa-for-indians',
  '/indonesia-visa-form', '/azerbaijan-visa', '/azerbaijan-visa-form',
  '/oman-visa', '/oman-visa-form', '/morocco-visa', '/morocco-visa-form',
  '/bahrain-visa', '/bahrain-visa-form', '/qatar-visa', '/qatar-visa-form',
  '/russia-visa', '/russia-visa-form', '/uzbekistan-visa', '/uzbekistan-visa-form',
  '/two-wheeler-insurance-form',
  '/four-wheeler-insurance-form',
  '/health-insurance-form',
])

export default function LayoutShell({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  const showFooter = !NO_FOOTER_SET.has(pathname)
  const showWaFab  = !NO_WA_FAB_SET.has(pathname)

  return (
    <>
      {children}
      {showFooter && <Footer />}
      {showWaFab  && <WhatsAppFAB />}
    </>
  )
}
