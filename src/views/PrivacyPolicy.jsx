'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, ChevronRight, CheckCircle2, Lock, Eye, RefreshCw, FileCheck } from 'lucide-react'

const SECTIONS = [
  { id: 'commitment',   n: '01', label: 'Commitment to Privacy', Icon: Lock        },
  { id: 'information',  n: '02', label: 'Information Collected',  Icon: Eye         },
  { id: 'disclosing',   n: '03', label: 'Disclosing Information', Icon: Shield      },
  { id: 'changes',      n: '04', label: 'Changes to this Policy', Icon: RefreshCw   },
  { id: 'agreement',    n: '05', label: 'Agreement to Policy',    Icon: FileCheck   },
]

const INFO_LIST = [
  'Your name, address, telephone number, fax number, and email address',
  'Dates of service provided',
  'Types of service provided',
  'Payment history, manner of payment, amount of payments, date of payments',
  'Domain name, credit card, or other payment information',
]

function useActiveSection() {
  const [active, setActive] = useState('commitment')
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return active
}

export default function PrivacyPolicy() {
  const active = useActiveSection()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main style={{ paddingTop: 66 }}>

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="hero-bg">
          <div className="blob1" /><div className="blob2" />
        </div>
        <div className="mx pp-hero-inner">
          <div className="pp-hero-left">
            <div className="hero-pill">
              <Shield size={13} strokeWidth={2} />
              Legal Document
            </div>
            <h1 style={{ letterSpacing: '-2px', marginBottom: 16, marginTop: 14 }}>
              Privacy <span className="teal">Policy</span>
            </h1>
            <p className="hero-sub" style={{ maxWidth: 520, marginBottom: 28 }}>
              MakeMyDocuments recognizes the importance of privacy of its users and also of maintaining confidentiality of information provided by its users.
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.7 }}>
              This Privacy Policy provides for the practices for handling and securing user's Personal Information by MakeMyDocuments and its subsidiaries and affiliates.
            </p>
          </div>
          <div className="pp-hero-card">
            <div className="pp-hero-card-head">
              <Shield size={20} strokeWidth={1.8} color="var(--teal)" />
              <span>Quick Overview</span>
            </div>
            {SECTIONS.map(({ id, label, Icon }) => (
              <button key={id} className="pp-overview-item" onClick={() => scrollTo(id)}>
                <div className="pp-ov-ico"><Icon size={14} strokeWidth={2} color="var(--teal)" /></div>
                <span>{label}</span>
                <ChevronRight size={14} strokeWidth={2.5} color="var(--ink4)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
              </button>
            ))}
            <div className="pp-updated">Last updated: May 2026</div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="pp-body">
        <div className="mx pp-layout">

          {/* Sticky TOC */}
          <aside className="pp-toc">
            <div className="pp-toc-label">On this page</div>
            {SECTIONS.map(({ id, n, label }) => (
              <button
                key={id}
                className={`pp-toc-item${active === id ? ' active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                <span className="pp-toc-n">{n}</span>
                <span className="pp-toc-text">{label}</span>
              </button>
            ))}
          </aside>

          {/* Main content */}
          <div className="pp-content">

            {/* 1. Commitment to Privacy */}
            <div id="commitment" className="pp-section">
              <div className="pp-sec-head">
                <div className="pp-sec-badge teal">01</div>
                <div>
                  <div className="pp-sec-eyebrow">Section 1</div>
                  <h2 className="pp-sec-title">Commitment to Privacy</h2>
                </div>
              </div>
              <div className="pp-sec-body">
                <p>We are committed to protecting your privacy. We collect the minimum amount of information about you that is commensurate with providing you with a satisfactory service. This Policy indicates the type of processes that may result in data being collected about you. The purpose of this Privacy Policy is to enable you to understand which personal identifying information ("PII", "Personal Information") of yours is collected, how and when we might use your information, who has access to this information, and how you can correct any inaccuracies in the information.</p>
                <p>To better protect your privacy, we provide this notice explaining our online information practices and the choices you can make about the way your information is collected and used. To make this notice easy to find, we make it available on our website.</p>
              </div>
            </div>

            {/* 2. Information Collected */}
            <div id="information" className="pp-section">
              <div className="pp-sec-head">
                <div className="pp-sec-badge amber">02</div>
                <div>
                  <div className="pp-sec-eyebrow">Section 2</div>
                  <h2 className="pp-sec-title">Information Collected</h2>
                </div>
              </div>
              <div className="pp-sec-body">
                <p>We may collect any or all of the information via both automated means such as communications profiles and cookies. Personal Information you give us depends on the type of service, support, or sale inquiry, and may include:</p>

                <div className="pp-info-list">
                  {INFO_LIST.map((item, i) => (
                    <div key={i} className="pp-info-item">
                      <CheckCircle2 size={16} strokeWidth={2} color="var(--teal)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pp-highlight">
                  <Lock size={16} strokeWidth={2} color="var(--teal)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p>The financial information will be transferred only to bill you for the products and services you purchased. If you purchase by credit card, this information may be forwarded to your credit card provider. All sensitive information is collected on a secure server and data is transferred. When transferring personal information, a security icon will appear in your browser.</p>
                </div>
              </div>
            </div>

            {/* 3. Disclosing Information */}
            <div id="disclosing" className="pp-section">
              <div className="pp-sec-head">
                <div className="pp-sec-badge teal">03</div>
                <div>
                  <div className="pp-sec-eyebrow">Section 3</div>
                  <h2 className="pp-sec-title">Disclosing Information</h2>
                </div>
              </div>
              <div className="pp-sec-body">
                <p>We do not disclose any personal information obtained about you from this website to third parties. We may use the information to keep in contact with you and inform you of developments associated with our business. You will be given the opportunity to opt out from any mailing list or similar device.</p>
                <p>However, we may disclose aggregate, anonymous data based on information collected from users to potential partners, our affiliates, and reputable third parties. We take all available measures to select affiliates and service providers that are ethical and provide similar privacy protection to their customers and the community. We do not make any representations about the practices and policies of these companies.</p>
              </div>
            </div>

            {/* 4. Changes to this Policy */}
            <div id="changes" className="pp-section">
              <div className="pp-sec-head">
                <div className="pp-sec-badge amber">04</div>
                <div>
                  <div className="pp-sec-eyebrow">Section 4</div>
                  <h2 className="pp-sec-title">Changes to this Policy</h2>
                </div>
              </div>
              <div className="pp-sec-body">
                <p>Any changes to our Privacy Policy will be placed here and will supersede this version of our Policy. We will take reasonable steps to draw your attention to any changes in our Policy. However, to be on the safe side, we suggest that you read this document each time you use the website to ensure that it still meets with your approval.</p>
              </div>
            </div>

            {/* 5. Agreement to Policy */}
            <div id="agreement" className="pp-section">
              <div className="pp-sec-head">
                <div className="pp-sec-badge teal">05</div>
                <div>
                  <div className="pp-sec-eyebrow">Section 5</div>
                  <h2 className="pp-sec-title">Agreement to Policy</h2>
                </div>
              </div>
              <div className="pp-sec-body">
                <p>By using or accessing the Website or other Sales Channels, the User hereby agrees with the terms of this Privacy Policy and the contents herein. If you disagree with this Privacy Policy, please do not use or access our Website or other Service Channels.</p>
              </div>
            </div>

            {/* Contact strip */}
            <div className="pp-contact-strip">
              <div>
                <div className="pp-contact-title">Have questions about this policy?</div>
                <div className="pp-contact-sub">Our team is happy to clarify anything about how we handle your data.</div>
              </div>
              <Link href="/contact-us" className="btn-teal">Contact Us →</Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
