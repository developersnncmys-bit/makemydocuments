'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Truck, UserPlus, FileText, GitCompare, CreditCard,
  Download, Zap,
} from 'lucide-react'

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
  { Icon: UserPlus,   title: 'Register Online',               desc: 'Fill in your details on our secure portal.' },
  { Icon: FileText,   title: 'Get Quotation via Email/WhatsApp', desc: 'Instantly receive policy quotes from leading insurers.' },
  { Icon: GitCompare, title: 'Compare Policies',              desc: 'Choose the best coverage and premium for your business needs.' },
  { Icon: CreditCard, title: 'Make Payment',                  desc: 'Pay securely through our online payment gateway.' },
  { Icon: Download,   title: 'Download Your Policy Instantly', desc: 'Get your e-policy delivered instantly—ready to use.' },
]

const TYPES = [
  {
    label: 'Goods Carrying Vehicle Insurance',
    desc: 'For trucks, lorries, and delivery vans transporting goods.',
    color: '#2E68B1', bg: '#EBF2FB',
  },
  {
    label: 'Passenger Carrying Vehicle Insurance',
    desc: 'For taxis, buses, and ride-share vehicles carrying passengers.',
    color: '#059669', bg: '#ECFDF5',
  },
  {
    label: 'Special Vehicle Insurance',
    desc: 'For construction, agricultural, and utility vehicles like tractors, cranes, and excavators.',
    color: '#F7A418', bg: '#FFF8EC',
  },
]

const FAQS = [
  {
    q: 'What is commercial vehicle insurance?',
    a: 'It is an insurance policy designed to cover vehicles used for business purposes, including goods transport, passenger services, and specialized business vehicles.',
  },
  {
    q: 'Who needs commercial vehicle insurance?',
    a: 'Any business or individual using vehicles for commercial purposes—such as taxi operators, truck owners, delivery businesses, or construction companies—must have it.',
  },
  {
    q: 'What is the difference between private and commercial vehicle insurance?',
    a: 'Private vehicle insurance covers personal use, while commercial insurance covers vehicles used for business, transporting goods, or carrying passengers.',
  },
  {
    q: 'What types of vehicles are covered under commercial vehicle insurance?',
    a: 'It includes taxis, trucks, buses, delivery vans, tractors, cranes, construction vehicles, and other business-related vehicles.',
  },
  {
    q: 'What is covered under commercial vehicle insurance?',
    a: 'It usually covers third-party liability, own vehicle damage, driver and passenger protection, and damages caused by accidents, theft, fire, or natural disasters.',
  },
  {
    q: 'What documents are required for commercial vehicle insurance renewal?',
    a: 'You will need the Registration Certificate (RC) of the vehicle, existing policy details, owner ID proof (Aadhaar, PAN, or Driving License), and business details for company-owned vehicles.',
  },
  {
    q: 'What happens if my commercial vehicle insurance expires?',
    a: 'Driving an uninsured commercial vehicle is illegal and may result in heavy penalties. You also lose financial protection until the policy is renewed.',
  },
  {
    q: 'Can I buy commercial vehicle insurance online?',
    a: 'Yes! With Make My Document, you can compare plans, pay online, and download your e-policy instantly.',
  },
  {
    q: 'What does commercial vehicle insurance typically cover?',
    a: 'It usually covers third-party liability, own vehicle damage, driver and passenger protection, and damages caused by accidents, theft, fire, or natural disasters.',
  },
  {
    q: 'Is commercial vehicle insurance mandatory in India?',
    a: 'Yes, as per the Motor Vehicles Act, it is mandatory for all vehicles used for business or commercial purposes to have at least third-party commercial insurance coverage.',
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

export default function CommercialVehicleInsurance() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/insurance">Insurance</Link>
          <span> / </span>
          <span>Commercial Vehicle Insurance</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="twi-hero">
        <div className="twi-hero-content mx">
          <div className="twi-hero-left">
            <div className="hero-pill" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.22)', color: 'rgba(255,255,255,.92)' }}>
              <span className="live-dot" />
              Commercial Vehicle Insurance &nbsp;·&nbsp; Instant Policy
            </div>
            <h1 style={{ color: '#fff', letterSpacing: '-1.5px', marginBottom: 14 }}>
              Protect Your Commercial<br />Vehicle with Ease
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
                  <div className="twi-card-title">Documents Required For Commercial Insurance</div>
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
                <Link href="/commercial-vehicle-insurance-form" className="twi-get-quotes-btn">
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
            Protect Your Commercial Vehicle Insurance with Ease – Simple &amp; Stress-Free Applications
          </h2>
          <p className="twi-art-p">
            Running a business often means relying on commercial vehicles—trucks, vans, taxis, buses, or delivery vehicles.
            These vehicles are not just assets; they are the lifeline of your operations. Protecting them with the right
            commercial vehicle insurance ensures that your business runs smoothly, even when unexpected accidents, damages,
            or liabilities occur.
          </p>
          <p className="twi-art-p">
            At Make My Documents, we simplify the process of buying or renewing your commercial vehicle insurance. With our
            100% online process, you can compare policies, get instant quotes, and download your policy without wasting time
            or dealing with complicated paperwork.
          </p>

          {/* Why Essential */}
          <h3 className="twi-art-h3">Why Commercial Vehicle Insurance is Essential</h3>
          <p className="twi-art-p">
            Unlike private car or bike insurance, commercial vehicle insurance is legally mandatory in India for all vehicles
            used for business purposes. Beyond legal compliance, it also offers financial protection to your business in case
            of accidents, theft, or damage.
          </p>
          <p className="twi-art-p">Here&apos;s why you should never skip commercial vehicle insurance:</p>
          <ul className="twi-art-ul">
            <li><span><strong>Legal Compliance:</strong> Avoid fines and penalties by keeping your insurance valid.</span></li>
            <li><span><strong>Third-Party Liability Cover:</strong> Protects you against claims from other people, vehicles, or property damaged by your vehicle.</span></li>
            <li><span><strong>Own Damage Cover:</strong> Get financial assistance for repairs or replacement if your commercial vehicle is damaged in accidents, fire, or natural disasters.</span></li>
            <li><span><strong>Business Continuity:</strong> Avoid disruptions by ensuring timely claim settlements.</span></li>
            <li><span><strong>Employee &amp; Goods Safety:</strong> Many policies cover injuries to drivers, passengers, or goods carried in your vehicle.</span></li>
          </ul>
          <p className="twi-art-p">
            Whether you own one taxi or a fleet of trucks, commercial vehicle insurance gives your business the security it
            needs to operate confidently.
          </p>

          {/* Docs */}
          <h3 className="twi-art-h3">Documents Required for Commercial Vehicle Insurance</h3>
          <p className="twi-art-p">To apply for or renew your commercial vehicle insurance, you&apos;ll need:</p>
          <ul className="twi-art-ul">
            <li>Registration Certificate (RC) of the vehicle</li>
            <li>Old Policy Details (only if it&apos;s a renewal)</li>
            <li>Owner ID Proof (like Aadhaar, PAN, or Driving License)</li>
            <li>Business Details (for company-owned vehicles)</li>
          </ul>
          <p className="twi-art-p">
            At Make My Documents, our team guides you through the documentation process so nothing is missed, ensuring a
            quick approval.
          </p>

          {/* How it works detail */}
          <h3 className="twi-art-h3">How It Works with Make My Documents</h3>
          <p className="twi-art-p">We believe in keeping things simple and stress-free. Here&apos;s our step-by-step process:</p>
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

          {/* Types */}
          <h3 className="twi-art-h3">Types of Commercial Vehicle Insurance</h3>
          <p className="twi-art-p">Depending on your business and vehicle type, you can choose from:</p>
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
          <p className="twi-art-p">Choosing the right type of insurance ensures your vehicles are adequately protected against risks.</p>

          {/* Why choose MMD */}
          <h3 className="twi-art-h3">Why Choose to Make My Documents?</h3>
          <p className="twi-art-p">
            With so many agents and websites out there, Make My Documents stands apart for its customer-first approach.
            Here&apos;s why:
          </p>
          <ul className="twi-art-ul">
            <li><span><strong>100% Online Process –</strong> Apply, compare, and get your policy without stepping out.</span></li>
            <li><span><strong>Quick &amp; Transparent –</strong> No hidden costs, instant quotes, and clear terms.</span></li>
            <li><span><strong>Wide Network of Insurers –</strong> Access policies from leading insurance providers.</span></li>
            <li><span><strong>Affordable Premiums –</strong> Get the best coverage at competitive prices.</span></li>
            <li><span><strong>Claim Assistance –</strong> We guide you through the claim process for a stress-free experience.</span></li>
          </ul>

          {/* Benefits online */}
          <h3 className="twi-art-h3">Benefits of Buying Commercial Vehicle Insurance Online</h3>
          <ul className="twi-art-ul">
            <li><span><strong>Instant Policy Issuance:</strong> No waiting—download your policy immediately.</span></li>
            <li><span><strong>Paperless Process:</strong> Submit documents online without visiting offices.</span></li>
            <li><span><strong>Save Time &amp; Money:</strong> Compare premiums and coverage in minutes.</span></li>
            <li><span><strong>24/7 Availability:</strong> Apply anytime, anywhere.</span></li>
            <li><span><strong>Hassle-Free Renewals:</strong> Get reminders before expiry and renew instantly.</span></li>
          </ul>

          {/* CTA blurb */}
          <div className="twi-cta-box">
            <Truck size={28} strokeWidth={1.6} color="var(--amber)" />
            <div>
              <div className="twi-cta-title">Secure Your Commercial Vehicle Today</div>
              <p className="twi-cta-desc">
                Your business depends on your vehicles—make sure they are always protected. With Make My Documents,
                applying for commercial vehicle insurance is fast, easy, and completely online. Get your policy today
                and ride with peace of mind knowing your business is safeguarded.
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
