'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HeartPulse, FileText, Zap } from 'lucide-react'

const DOCS = ['Vaild Id & Address Prof']

const STEPS = [
  'Register Online',
  'Get Quotation Via E-mail / WhatsApp',
  'Talk To Experts',
  'Compare Policies',
  'Make Payment',
  'Download Your Policy Instantly',
]

const WHY_ESSENTIAL = [
  { label: 'Financial Protection',      desc: 'Covers medical bills, hospitalization, surgeries, and post-treatment care.' },
  { label: 'Cashless Hospitalization',  desc: 'Get admitted to a network hospital without paying upfront.' },
  { label: 'Tax Benefits',              desc: 'Premiums paid for health insurance are eligible for tax deductions under Section 80D of the Income Tax Act.' },
  { label: 'Peace of Mind',             desc: 'Focus on recovery while your insurance takes care of bills.' },
  { label: 'Wide Coverage',             desc: 'Includes individual, family, senior citizen, and critical illness plans.' },
]

const DOCS_REQUIRED = [
  'Valid ID Proof (Aadhaar, Passport, PAN, or Driving License)',
  'Address Proof (Utility bill, Aadhaar, Passport, etc.)',
  'Medical Records (only for some policies, especially senior citizen or critical illness plans)',
]

const HOW_IT_WORKS = [
  { label: 'Register Online',                   desc: 'Share your basic details on our portal.' },
  { label: 'Get Quotation via Email/WhatsApp',  desc: 'Instantly receive tailored quotes.' },
  { label: 'Talk to Experts',                   desc: 'Our advisors explain benefits and suggest the best plans for you.' },
  { label: 'Compare Policies',                  desc: 'Review multiple plans side by side.' },
  { label: 'Make Payment',                      desc: 'Pay securely online.' },
  { label: 'Download Your Policy Instantly',    desc: 'Get your e-policy immediately, ready for use.' },
]

const WHAT_COVERS = [
  'Hospitalization expenses',
  'Doctor consultations and nursing charges',
  'Room rent and ICU charges',
  'Daycare procedures and surgeries',
  'Pre- and post-hospitalization expenses',
  'Ambulance charges',
  'Critical illness and maternity cover (depending on the plan)',
]

const WHAT_NOT_COVERS = [
  'Pre-existing diseases (during the initial waiting period)',
  'Cosmetic or elective surgery',
  'Dental or vision care (unless specified)',
  'Non-medical expenses like registration fees',
  'Self-inflicted injuries or substance abuse-related treatments',
]

const EMPLOYER_LIMITS = [
  'Coverage ends when you leave the job or retire.',
  'Limited sum insured may not be enough during major health events.',
  'Restricted coverage for dependents.',
]

const FAQS = [
  {
    q: 'What is Health Insurance?',
    a: 'It is a contract that covers medical expenses in exchange for regular premium payments.',
  },
  {
    q: 'What does health insurance cover?',
    a: `A basic health insurance plan provides all the essential coverage features. You would find coverage for the following –\n\nInpatient hospitalisation\nThis includes coverage for room rent, ICU room rent, cost of treatments, doctor's fees, surgeon's fees, nurses' fees, etc.\n\nPre and post hospitalisation\nExpenses incurred before being actually hospitalised and after being discharged from the hospital are covered under this head.\n\nAmbulance costs\nCosts incurred in transporting the insured to the hospital is covered up to a specified limit.\n\nDay care treatments\nTreatments which do not require hospitalisation for a minimum of 24 hours are covered under this section.\n\nBesides these common coverage features, different health insurance plans provide different coverage features too which make the plan comprehensive in nature.`,
  },
  {
    q: 'What does health insurance not cover?',
    a: `Health insurance will not cover the following –\n• Treatments for HIV/AIDS\n• Drug/alcohol abuse\n• Self-inflicted injuries\n• Cosmetic surgery\n• Routine doctors' visits, medicines or tests unless specifically included in the plan as add-ons.\n• Maternity is not covered, unless explicitly mentioned as an add-on.\n• Some specified conditions such as hernia, varicose veins and fibroids, etc. are covered only after you have spent some time in the policy, typically 1-3 years. Its best to disclose your medical history truthfully before you buy a policy to ensure your claim expectations are met. Discuss this with our expert to figure out your best options - we will maintain strict confidentiality.`,
  },
  {
    q: 'I have employer Insurance, should i still buy',
    a: 'Employer cover is often too less and/or does not cover all the family members. Does your employer policy have atleast 5 lakhs of cover?',
  },
  {
    q: 'Even if you have employer cover, it makes sense to buy your own insurance because:',
    a: 'You lose the cover when you retire or leave the job, and It can become difficult to get health insurance at that time if you are suffering from conditions like diabetes or blood pressure, the risk for which increases steeply with age.',
  },
  {
    q: 'Should I buy health insurance if I already have employer coverage?',
    a: 'Yes, because employer coverage is limited and ends when you leave the company. Personal insurance ensures lifelong protection.',
  },
  {
    q: 'How do I make a claim?',
    a: 'Either opt for cashless treatment at a network hospital or file a reimbursement claim by submitting bills and documents.',
  },
  {
    q: 'Why can my claim get rejected?',
    a: 'Common reasons include non-disclosure of pre-existing conditions, claim for exclusions, or expired policies.',
  },
  {
    q: 'Do health plans cover Ayurvedic and alternative treatments?',
    a: 'Yes, many insurers now cover AYUSH treatments (Ayurveda, Yoga, Unani, Siddha, Homeopathy) up to a specified limit.',
  },
  {
    q: 'Why is health insurance necessary?',
    a: 'It protects your savings, provides access to quality healthcare, and gives peace of mind during emergencies.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ins-faq-v2${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ins-faq-v2-q">
        <span>{q}</span>
        <span className="ins-faq-v2-icon">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="ins-faq-v2-a" style={{ whiteSpace: 'pre-line' }}>
          {a}
        </div>
      )}
    </div>
  )
}

export default function HealthInsurance() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/insurance">Insurance</Link>
          <span> / </span>
          <span>Health Insurance</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="twi-hero">
        <div className="twi-hero-content mx">
          <div className="twi-hero-left">
            <div className="hero-pill" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.22)', color: 'rgba(255,255,255,.92)' }}>
              <span className="live-dot" />
              Health Insurance &nbsp;·&nbsp; Instant Policy
            </div>
            <h1 style={{ color: '#fff', letterSpacing: '-1.5px', marginBottom: 14 }}>
              Protect Your Health<br />Insurance with Ease
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,.85)', lineHeight: 1.65, maxWidth: 460, marginBottom: 32 }}>
              Insurance applications made simple and stress-free.
            </p>
          </div>

          <div className="twi-hero-right">
            <div className="twi-info-card">
              {/* Documents */}
              <div className="twi-card-section">
                <div className="twi-card-icon-wrap">
                  <FileText size={22} strokeWidth={1.8} color="var(--teal)" />
                </div>
                <div className="twi-card-line" />
                <div className="twi-card-body">
                  <div className="twi-card-title">Documents Required For Health Insurance</div>
                  <ul className="twi-card-list">
                    {DOCS.map(d => <li key={d}>{d}</li>)}
                  </ul>
                </div>
              </div>

              {/* How it works */}
              <div className="twi-card-section">
                <div className="twi-card-icon-wrap">
                  <Zap size={22} strokeWidth={1.8} color="var(--teal)" />
                </div>
                <div className="twi-card-line last" />
                <div className="twi-card-body">
                  <div className="twi-card-title">How It Works</div>
                  <ul className="twi-card-list">
                    {STEPS.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </div>

              <div style={{ paddingLeft: 52, paddingBottom: 4 }}>
                <Link href="/health-insurance-form" className="twi-get-quotes-btn">
                  Get Quotes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article Content ── */}
      <section className="ins-section-white">
        <div className="mx twi-article">

          <h2 className="twi-art-h2">
            Protect Your Health Insurance with Ease – Simple &amp; Stress-Free Applications
          </h2>
          <p className="twi-art-p">
            Health is wealth, and protecting your health with the right health insurance plan ensures that
            you and your family are financially secure during medical emergencies. Medical treatments today
            can be expensive, whether it&apos;s a routine hospitalization, surgery, or critical illness care.
            Without health insurance, these costs can put a heavy burden on your savings.
          </p>
          <p className="twi-art-p">
            At Make My Documents, we make the process of applying for or renewing health insurance simple,
            quick, and 100% stress-free. With our digital-first approach, you can compare policies, talk to
            experts, and download your policy instantly—without running from one office to another.
          </p>

          {/* Why Essential */}
          <h3 className="twi-art-h3">Why Health Insurance is Essential</h3>
          <p className="twi-art-p">
            Health insurance is not just an option anymore—it&apos;s a necessity. A comprehensive policy acts
            as a financial shield against unforeseen medical costs. Here&apos;s why having health insurance
            is crucial:
          </p>
          <ul className="twi-art-ul">
            {WHY_ESSENTIAL.map(({ label, desc }) => (
              <li key={label}><strong>{label}:</strong> {desc}</li>
            ))}
          </ul>
          <p className="twi-art-p">
            Whether you&apos;re an individual, a parent, or a business owner, the right plan ensures that
            you&apos;re always prepared for medical emergencies.
          </p>

          {/* Docs Required */}
          <h3 className="twi-art-h3">Documents Required for Health Insurance</h3>
          <p className="twi-art-p">To apply for or renew your health insurance, you&apos;ll typically need:</p>
          <ul className="twi-art-ul">
            {DOCS_REQUIRED.map(d => <li key={d}>{d}</li>)}
          </ul>
          <p className="twi-art-p">
            Our team at Make My Document guides you through the process so you don&apos;t miss any required
            paperwork.
          </p>

          {/* How It Works */}
          <h3 className="twi-art-h3">How It Works with Make My Documents</h3>
          <p className="twi-art-p">We&apos;ve built a streamlined process to help you get insured quickly:</p>
          <ul className="twi-art-ul">
            {HOW_IT_WORKS.map(({ label, desc }) => (
              <li key={label}><strong>{label}:</strong> {desc}</li>
            ))}
          </ul>

          {/* What Covers */}
          <h3 className="twi-art-h3">What Does Health Insurance Cover?</h3>
          <p className="twi-art-p">Most health insurance plans typically cover:</p>
          <ul className="twi-art-ul">
            {WHAT_COVERS.map(c => <li key={c}>{c}</li>)}
          </ul>

          {/* What Not Covers */}
          <h3 className="twi-art-h3">What Health Insurance Usually Does Not Cover</h3>
          <p className="twi-art-p">
            While health insurance offers wide coverage, some exclusions apply, such as:
          </p>
          <ul className="twi-art-ul">
            {WHAT_NOT_COVERS.map(c => <li key={c}>{c}</li>)}
          </ul>
          <p className="twi-art-p">Understanding exclusions helps you avoid surprises at the time of claim.</p>

          {/* Employer Cover */}
          <h3 className="twi-art-h3">Why Buy Your Own Insurance Even If You Have Employer Cover?</h3>
          <p className="twi-art-p">
            Many people rely only on employer-provided health insurance. While it&apos;s beneficial, it has
            limitations such as:
          </p>
          <ul className="twi-art-ul">
            {EMPLOYER_LIMITS.map(e => <li key={e}>{e}</li>)}
          </ul>
          <p className="twi-art-p">
            Buying your own health insurance ensures continuous coverage, higher sums insured, and
            protection for your entire family, independent of your job.
          </p>

          {/* Claim Types */}
          <h3 className="twi-art-h3">Types of Health Insurance Claims</h3>
          <p className="twi-art-p">
            When you need to use your policy, there are two main ways to make a claim:
          </p>
          <ul className="twi-art-ul">
            <li><strong>Cashless Claim:</strong> Treatment costs are directly settled between the insurance company and the hospital (in a network hospital).</li>
            <li><strong>Reimbursement Claim:</strong> You pay the bills upfront, and the insurer reimburses you after verification.</li>
          </ul>

          {/* CTA */}
          <div className="twi-cta-box">
            <HeartPulse size={28} strokeWidth={1.6} color="var(--amber)" />
            <div>
              <div className="twi-cta-title">Secure Your Health Today</div>
              <p className="twi-cta-desc">
                Medical emergencies can come unannounced—but financial stress shouldn&apos;t. With Make My
                Document, getting health insurance is simple, transparent, and instant. Compare the best
                plans, talk to experts, and secure your family&apos;s health in just a few clicks.
              </p>
              <Link
                href="/health-insurance-form"
                className="btn-teal"
                style={{ marginTop: 16, display: 'inline-flex' }}
              >
                Get Quotes Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Got Questions?</div>
            <h2 style={{ color: 'var(--teal)' }}>FAQs</h2>
            <p className="sec-desc">Need help? Contact us for any queries related to us</p>
          </div>
          <div className="ins-faq-v2-grid">
            {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

    </div>
  )
}
