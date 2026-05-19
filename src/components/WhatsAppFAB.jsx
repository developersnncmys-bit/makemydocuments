'use client'

import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppFAB() {
  return (
    <a className="wa-fab" href="https://wa.me/919980097315" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <span className="wa-fab-pulse" />
      <FaWhatsapp size={28} color="#fff" />
    </a>
  )
}
