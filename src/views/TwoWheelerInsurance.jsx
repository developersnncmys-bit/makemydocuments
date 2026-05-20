'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bike, UserPlus, FileText, GitCompare, CreditCard,
  Download, CheckCircle2, ShieldCheck, Zap, Clock,
  BadgeDollarSign, Compass, Globe,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const DOCS = [
  'Registration Copy',
  "Old Policy Details If It's Renew",
]

const STEPS = [
  'Register Online',
  'Get Quotation Via E-mail / WhatsApp',
  'Compare Policies',
  'Make Payment',
  'Download Your Policy Instantly',
]

const STEPS_DETAIL = [
  { Icon: UserPlus,   title: 'Register Online',             desc: 'Enter your basic details on our website.' },
  { Icon: FileText,   title: 'Get Quotation via Email/WhatsApp', desc: 'Receive instant quotes from top insurers.' },
  { Icon: GitCompare, title: 'Compare Policies',            desc: 'Choose the best plan that fits your budget and needs.' },
  { Icon: CreditCard, title: 'Make Payment',                desc: 'Pay securely online.' },
  { Icon: Download,   title: 'Download Your Policy Instantly', desc: 'No waiting, no delays—get your e-policy instantly.' },
]

const WHY_ONLINE = [
  { Icon: GitCompare,     label: 'Instant Comparison',    desc: 'View multiple policy options at once.' },
  { Icon: BadgeDollarSign,label: 'Best Premium Rates',    desc: 'Save money with competitive quotes.' },
  { Icon: Globe,          label: 'Paperless Process',     desc: 'No physical visits, no long forms.' },
  { Icon: Clock,          label: '24/7 Support',          desc: "We're always available to guide you." },
  { Icon: Download,       label: 'Instant Policy Download', desc: 'Ride worry-free without waiting for documents.' },
]

const TYPES = [
  {
    label: 'Third-Party Liability Insurance',
    desc: 'Mandatory by law, it covers damages caused to another person, vehicle, or property.',
    color: '#2E68B1', bg: '#EBF2FB',
  },
  {
    label: 'Comprehensive Insurance',
    desc: 'Provides complete coverage, including damage to your own two-wheeler, theft, fire, natural calamities, and third-party liabilities.',
    color: '#059669', bg: '#ECFDF5',
  },
  {
    label: 'Multi-Year Insurance',
    desc: 'Save time and money by buying coverage for multiple years in one go.',
    color: '#F7A418', bg: '#FFF8EC',
  },
]

const WHY_US = [
  'Transparent pricing with no hidden charges',
  'Fast and 100% online process',
  'Wide range of insurers to compare',
  'Expert guidance at every step',
  'Hassle-free claim support when needed',
]

const FAQS = [
  {
    q: 'How many types of two-wheeler insurance are available in India?',
    a: 'There are mainly two types of bike insurance – Third-Party Liability Insurance (mandatory by law) and Comprehensive Insurance (covers both own damage and third-party liabilities). Some insurers also offer Multi-Year Insurance for added convenience.',
  },
  {
    q: 'What is the difference between comprehensive and third-party bike insurance?',
    a: 'Third-Party Insurance covers damages to another person, vehicle, or property but not your own bike. Comprehensive Insurance covers both third-party liabilities and own damage (accident, theft, fire, or natural disasters).',
  },
  {
    q: 'What is IDV in bike insurance?',
    a: 'IDV stands for Insured Declared Value. It is the maximum amount your insurer will pay if your two-wheeler is stolen or completely damaged. Higher IDV means better coverage but slightly higher premiums.',
  },
  {
    q: 'What is not covered under two-wheeler insurance?',
    a: 'Common exclusions include: Riding without a valid driving license, Drunk driving accidents, Mechanical/electrical breakdowns, Wear and tear of parts, Using the bike for illegal activities.',
  },
  {
    q: 'What is Multi-Year Two-Wheeler Insurance?',
    a: 'Multi-Year Insurance allows you to buy coverage for 2–3 years at once, protecting you from annual premium hikes and avoiding the hassle of yearly renewals.',
  },
  {
    q: 'What happens if my two-wheeler insurance policy expires?',
    a: "If your bike insurance is not renewed on time, your vehicle becomes uninsured and illegal to drive. You may face penalties, and you'll also lose protection against theft or accidents. Renewal after expiry often requires a vehicle inspection.",
  },
  {
    q: 'How can I make a bike insurance claim online?',
    a: 'To file a claim: Inform your insurer immediately. Submit necessary documents (RC, policy details, claim form, photos of damage). Get inspection done (if required). Once approved, claims are settled directly with the garage (cashless) or reimbursed to you.',
  },
  {
    q: 'Is it better to buy two-wheeler insurance online or offline?',
    a: 'Buying insurance online is faster, cheaper, and more transparent. You can compare policies instantly, get the best premium, and download your policy immediately. Offline agents often charge extra and involve more paperwork.',
  },
  {
    q: 'What are the documents which would be required for making a successful claim',
    a: 'To make a successful claim you should submit your driving license, RC book of the bike, insurance document and claim form. In case of third party claim or if the bike is stolen, police FIR is also required.',
  },
  {
    q: 'What would happen if the policy is not renewed on time?',
    a: 'If the policy is not renewed before the current plan expires, coverage would lapse. In a lapsed policy, no claim is admissible. On renewing the plan after a lapse, inspection of the bike would be required which would be time-consuming. Premiums might also increase for renewals of a lapsed policy. Moreover, if the policy is not renewed within 90 days of lapse, the accumulated no claim bonus is lost.',
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
      {open && <div className="ins-faq-v2-a">{a}</div>}
    </div>
  )
}

export default function TwoWheelerInsurance() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/insurance">Insurance</Link>
          <span> / </span>
          <span>Two-Wheeler Insurance</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="twi-hero">
        <div className="twi-hero-content mx">
          <div className="twi-hero-left">
            <div className="hero-pill" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.22)', color: 'rgba(255,255,255,.92)' }}>
              <span className="live-dot" />
              Two-Wheeler Insurance &nbsp;·&nbsp; Instant Policy
            </div>
            <h1 style={{ color: '#fff', letterSpacing: '-1.5px', marginBottom: 14 }}>
              Protect Your Two-Wheeler<br />with Ease
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
                  <div className="twi-card-title">Documents Required For Two-Wheeler Insurance</div>
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
                <Link href="/two-wheeler-insurance-form" className="twi-get-quotes-btn">
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
            Protect Your Two-Wheeler with Ease – Simple &amp; Stress-Free Insurance Services
          </h2>
          <p className="twi-art-p">
            Owning a two-wheeler gives you the freedom to ride anywhere, anytime. But with that freedom comes
            responsibility—keeping your bike legally protected and financially secure. Two-wheeler insurance is
            not just a legal requirement in India; it&apos;s your safety net against accidents, theft, damages,
            and third-party liabilities.
          </p>
          <p className="twi-art-p">
            At Make My Documents, we make two-wheeler insurance applications simple, fast, and hassle-free.
            With our 100% online services, you can compare policies, get instant quotes, and download your
            policy—all from the comfort of your home.
          </p>

          {/* Docs */}
          <h3 className="twi-art-h3">Documents Required for Two-Wheeler Insurance</h3>
          <p className="twi-art-p">To apply or renew your bike insurance, you&apos;ll need:</p>
          <ul className="twi-art-ul">
            <li>Registration Copy (RC) of your two-wheeler</li>
            <li>Old Policy Details (only if you are renewing)</li>
          </ul>
          <p className="twi-art-p">
            That&apos;s it! With these simple documents, our team will help you secure the right policy
            without confusion or delays.
          </p>

          {/* How it works detail */}
          <h3 className="twi-art-h3">How It Works with Make My Documents</h3>
          <p className="twi-art-p">Our process is designed to be transparent, quick, and stress-free:</p>
          <div className="sol-steps" style={{ marginBottom: 32 }}>
            {STEPS_DETAIL.map(({ Icon, title, desc }, i) => (
              <div key={i} className="sol-step">
                <div className="sol-connector" />
                <div className="sol-n ins-step-n">
                  <Icon size={15} color="#fff" strokeWidth={2} />
                </div>
                <div>
                  <h4><strong>{title}</strong> – {desc}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Why online */}
          <h3 className="twi-art-h3">Why Buy Two-Wheeler Insurance Online?</h3>
          <div className="twi-why-grid">
            {WHY_ONLINE.map(({ Icon, label, desc }) => (
              <div key={label} className="twi-why-card">
                <div className="twi-why-ico">
                  <Icon size={18} strokeWidth={1.8} color="var(--teal)" />
                </div>
                <div>
                  <span className="twi-why-label">{label}</span>
                  <span className="twi-why-sep"> – </span>
                  <span className="twi-why-desc">{desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Types */}
          <h3 className="twi-art-h3">Types of Two-Wheeler Insurance</h3>
          <p className="twi-art-p">When choosing an insurance plan, it&apos;s important to know your options:</p>
          <div className="twi-types-grid">
            {TYPES.map(({ label, desc, color, bg }) => (
              <div key={label} className="twi-type-card" style={{ borderColor: `${color}33` }}>
                <div className="twi-type-dot" style={{ background: color }} />
                <div className="twi-type-content">
                  <div className="twi-type-label" style={{ color }}>{label}</div>
                  <p className="twi-type-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why choose MMD */}
          <h3 className="twi-art-h3">Why Choose Make My Documents?</h3>
          <p className="twi-art-p">
            There are plenty of agents and websites out there, but here&apos;s why thousands trust
            Make My Documents:
          </p>
          <ul className="twi-art-ul">
            {WHY_US.map(w => <li key={w}>{w}</li>)}
          </ul>
          <p className="twi-art-p">With us, protecting your two-wheeler is easier than ever.</p>

          {/* CTA blurb */}
          <div className="twi-cta-box">
            <Bike size={28} strokeWidth={1.6} color="var(--amber)" />
            <div>
              <div className="twi-cta-title">Your Bike Insurance Today</div>
              <p className="twi-cta-desc">
                Don&apos;t wait until your policy expires or an unexpected accident occurs. Secure your
                two-wheeler today with Make My Documents and enjoy stress-free rides knowing you&apos;re
                protected.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Got Questions?</div>
            <h2>FAQs</h2>
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
