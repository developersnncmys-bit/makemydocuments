'use client'

import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { User, Phone, FileText, ChevronRight, ShieldCheck, Check } from 'lucide-react'

const STEPS = [
  {
    n: 1,
    h4:   'Search & Select Your Document',
    desc: 'Use the search bar or click a service. Know instantly what you need, the cost, and timeline.',
  },
  {
    n: 2,
    h4:   'Fill the Quick Form – Takes 2 Minutes',
    desc: 'Tell us your name, contact, and the document you need. We do the rest.',
  },
  {
    n: 3,
    h4:   'We Call You Within 30 Minutes',
    desc: 'A dedicated case manager contacts you, explains the process, and kicks off your application.',
  },
  {
    n: 4,
    h4:   'Track on WhatsApp. Receive at Door.',
    desc: 'Real-time WhatsApp updates throughout. Your document delivered to your doorstep – zero trips required.',
  },
]

const SERVICES = [
  'Passport – New Application', 'Passport – Renewal', 'Passport – Tatkal',
  'PAN Card – New', 'PAN Card – Correction', 'Visa Assistance',
  'Police Clearance (PCC)', 'Police Verification (PVC)',
  'Rental Agreement', 'Insurance Policy', 'Senior Citizen Card',
  'FSSAI Food License', 'Other',
]

export default function Solution() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="solution" id="apply">
      <div className="mx">
        <div className="sol-layout">

          {/* LEFT */}
          <div className="rv-l">
            <div className="eyebrow">Your Final Solution</div>
            <h2>Stop Searching.<br />Start Here. End Here.</h2>
            <p className="sec-desc">
              Everything you need to get any Indian document – first question to final delivery –
              handled completely under one roof.
            </p>
            <div className="sol-steps">
              {STEPS.map(({ n, h4, desc }) => (
                <div key={n} className="sol-step">
                  <div className="sol-connector" />
                  <div className="sol-n">{n}</div>
                  <div>
                    <h4>{h4}</h4>
                    <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.65, marginTop: 4 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – form */}
          <div className="pf-sidebar rv-r">

            {/* Header */}
            <div className="pf-sidebar-head">
              <div className="pf-sidebar-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Free Callback
              </div>
              <h3 className="pf-sidebar-title">Apply in 2 Minutes</h3>
              <p className="pf-sidebar-sub">Our team will contact you within 30 minutes</p>
            </div>

            {/* Fields */}
            <div className="pf-sidebar-body">
              <div className="pf-sb-field">
                <label className="pf-sb-lbl">
                  <User size={13} strokeWidth={2} /> Full Name *
                </label>
                <input className="pf-sb-inp" type="text" placeholder="Your full name" />
              </div>

              <div className="pf-sb-field">
                <label className="pf-sb-lbl">
                  <Phone size={13} strokeWidth={2} /> Mobile Number *
                </label>
                <input className="pf-sb-inp" type="tel" placeholder="+91 9XXXXXXXXX" />
              </div>

              <div className="pf-sb-field">
                <label className="pf-sb-lbl">
                  <FileText size={13} strokeWidth={2} /> Document Required *
                </label>
                <select className="pf-sb-inp pf-sb-sel" defaultValue="">
                  <option value="" disabled>Select a service…</option>
                  {SERVICES.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>

              <button
                className="pf-sb-submit"
                onClick={() => setSubmitted(true)}
                style={submitted ? { background: 'var(--green)', boxShadow: 'none' } : {}}
              >
                {submitted ? (
                  <><Check size={16} strokeWidth={2.5} /> Submitted! We'll call you shortly.</>
                ) : (
                  <>Submit – Get Callback in 30 Min <ChevronRight size={16} strokeWidth={2.5} /></>
                )}
              </button>

              <div className="pf-sb-lock">
                <ShieldCheck size={13} strokeWidth={2} color="var(--green)" />
                Your details are 100% safe with us
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
