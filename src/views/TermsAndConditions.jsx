'use client'

import { FileText, ShieldCheck, CreditCard, Truck, Users, AlertCircle } from 'lucide-react'

const SECTIONS = [
  {
    Icon: FileText,
    title: 'Agreement Overview',
    color: '#2E68B1',
    bg: '#EBF2FB',
    border: '#A3BDE8',
    clauses: [
      'This agreement incorporates the terms and conditions for MakeMyDocuments to provide services to the person intending to get assistance or inquiring for any services of MakeMyDocuments by using the MakeMyDocuments.com website or any other customer interface channels of MakeMyDocuments, including its salespersons, offices, call centers, advertisements, information campaigns, etc.',
      'The Users availing services from MakeMyDocuments shall be deemed to have read, understood, and expressly accepted the terms and conditions of this agreement, which shall govern the desired transaction or provision of such services by MakeMyDocuments for all purposes.',
    ],
  },
  {
    Icon: Users,
    title: 'Our Services',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#C4B5FD',
    clauses: [
      "We are not passport/PAN card sellers and do not collect any of the client's original documents.",
      'As travel agents, we frequently update ourselves regarding passport and visa-related services. Hence, here you will get accurate assistance regarding passports, visas, and PAN cards.',
    ],
  },
  {
    Icon: AlertCircle,
    title: 'Liability & Communications',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FCD34D',
    clauses: [
      'We take liability only for emails and phone calls from the authorized mail ID and phone numbers.',
      'We are not responsible for any unauthorized mail usage or phone calls.',
    ],
  },
  {
    Icon: CreditCard,
    title: 'Fees & Charges',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#6EE7B7',
    clauses: [
      'The User shall be completely responsible for all charges, fees, duties, taxes, and assessments arising out of the use of the services.',
      'In case of short charging by MakeMyDocuments for listing, services, transaction fees, or any other reason, MakeMyDocuments reserves the right to claim the balance amount.',
      'Any increase in price charged by MakeMyDocuments on account of changes in tax rates or imposition of new taxes by the Government shall be borne by the customer.',
    ],
  },
  {
    Icon: ShieldCheck,
    title: 'Refund Policy',
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    clauses: [
      'In rare cases where proper service cannot be provided for any reason, we will process the refund and inform the customer of the same.',
      'There will be no refund option if the customer wishes to cancel the service in the last stage of the process.',
      'The booking/consulting charge is non-refundable.',
      'Once payment has been made and all documents are verified, the customer can postpone the service up to three months without any penalty fee.',
    ],
  },
  {
    Icon: Truck,
    title: 'Third Party & Delivery',
    color: '#1A3D6E',
    bg: '#EBF2FB',
    border: '#A3BDE8',
    clauses: [
      'If a customer takes the help of any third party, MakeMyDocuments will not process the application further.',
      'MakeMyDocuments is not responsible for crowding or delays in government offices.',
      'Being an online platform, MakeMyDocuments does not accompany any customer to government offices physically.',
      'Once the ready documents courier is dispatched, it is entirely under the authority of the third party, and MakeMyDocuments has no control over its arrival period.',
    ],
  },
]

export default function TermsAndConditions() {
  return (
    <div className="tnc-page">

      {/* Hero */}
      <div className="tnc-hero">
        <div className="tnc-hero-inner">
          <div className="tnc-hero-badge">
            <FileText size={13} strokeWidth={2.5} />
            Legal Document
          </div>
          <h1 className="tnc-hero-title">
            TERMS AND <span className="tnc-hero-highlight">CONDITIONS</span>
          </h1>
          <p className="tnc-hero-sub">
            Please read these terms carefully before using our services. By accessing MakeMyDocuments, you agree to be bound by these terms.
          </p>
          <div className="tnc-hero-chips">
            <span className="tnc-chip">Last updated: May 2026</span>
            <span className="tnc-chip">17 Clauses</span>
            <span className="tnc-chip">6 Sections</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="tnc-layout">

        {/* Sticky sidebar */}
        <aside className="tnc-sidebar">
          <div className="tnc-sidebar-card">
            <div className="tnc-sidebar-title">Contents</div>
            <ul className="tnc-sidebar-list">
              {SECTIONS.map(({ title, color }) => (
                <li key={title}>
                  <a href={`#${title.replace(/\s+/g, '-').toLowerCase()}`} className="tnc-sidebar-link">
                    <span className="tnc-sidebar-dot" style={{ background: color }} />
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tnc-sidebar-note">
            <ShieldCheck size={15} color="#2E68B1" strokeWidth={2} />
            <span>Your use of our services constitutes acceptance of these terms.</span>
          </div>
        </aside>

        {/* Sections */}
        <main className="tnc-main">
          {SECTIONS.map(({ title, Icon, color, bg, border, clauses }, si) => (
            <div key={title} id={title.replace(/\s+/g, '-').toLowerCase()} className="tnc-section">
              <div className="tnc-section-head">
                <div className="tnc-section-ico" style={{ background: bg, border: `1.5px solid ${border}` }}>
                  <Icon size={18} strokeWidth={2} color={color} />
                </div>
                <div>
                  <div className="tnc-section-num">Section {si + 1}</div>
                  <h2 className="tnc-section-title" style={{ color }}>{title}</h2>
                </div>
              </div>
              <div className="tnc-section-clauses">
                {clauses.map((text, ci) => (
                  <div key={ci} className="tnc-clause" style={{ borderLeftColor: color }}>
                    <p className="tnc-clause-text">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="tnc-accept-box">
            <ShieldCheck size={22} color="#2E68B1" strokeWidth={2} />
            <p>By using MakeMyDocuments services, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions.</p>
          </div>
        </main>

      </div>
    </div>
  )
}
