'use client'

import { AlertCircle, ShieldCheck } from 'lucide-react'

const CLAUSES = [
  'Make My Documents is not a Government-run website, and the form provided is not the official registration form. It is solely designed to collect information from our clients to help our experts better understand their needs.',
  'By proceeding with this website, you acknowledge and agree that Make My Documents is a private company managing this platform. We provide assistance and consultancy services based on the requests from our customers. The fees collected on this website include consultancy charges.',
]

export default function Disclaimer() {
  return (
    <div className="tnc-page">

      {/* Hero */}
      <div className="tnc-hero">
        <div className="tnc-hero-inner">
          <div className="tnc-hero-badge">
            <AlertCircle size={13} strokeWidth={2.5} />
            Legal Notice
          </div>
          <h1 className="tnc-hero-title">
            DIS<span className="tnc-hero-highlight">CLAIMER</span>
          </h1>
          <p className="tnc-hero-sub">
            Important information about the nature of MakeMyDocuments and the services we provide.
          </p>
          <div className="tnc-hero-chips">
            <span className="tnc-chip">Last updated: May 2026</span>
            <span className="tnc-chip">Private Platform</span>
            <span className="tnc-chip">Consultancy Services</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="disc-layout">
        <div className="disc-main">

          <div className="tnc-section">
            <div className="tnc-section-head">
              <div className="tnc-section-ico" style={{ background: '#FFFBEB', border: '1.5px solid #FCD34D' }}>
                <AlertCircle size={18} strokeWidth={2} color="#D97706" />
              </div>
              <div>
                <div className="tnc-section-num">Important Notice</div>
                <h2 className="tnc-section-title" style={{ color: '#D97706' }}>Disclaimer</h2>
              </div>
            </div>
            <div className="tnc-section-clauses">
              {CLAUSES.map((text, i) => (
                <div key={i} className="tnc-clause" style={{ borderLeftColor: '#D97706' }}>
                  <p className="tnc-clause-text">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tnc-accept-box">
            <ShieldCheck size={22} color="#2E68B1" strokeWidth={2} />
            <p>By continuing to use MakeMyDocuments, you confirm that you have read and understood this disclaimer in its entirety.</p>
          </div>

        </div>
      </div>

    </div>
  )
}
