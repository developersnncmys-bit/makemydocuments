'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Car, UserPlus, FileText, GitCompare, CreditCard,
  Download, Zap,
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
  { Icon: UserPlus,   title: 'Register Online',               desc: 'Fill in your basic details in just a few clicks.' },
  { Icon: FileText,   title: 'Upload Documents',              desc: 'Securely share your car papers for verification.' },
  { Icon: GitCompare, title: 'Expert Support',                desc: 'Our team ensures accuracy and compliance.' },
  { Icon: CreditCard, title: 'Make Payment',                  desc: 'Pay securely online.' },
  { Icon: Download,   title: 'Download Your Policy Instantly', desc: 'No waiting, no delays—get your e-policy instantly.' },
]

const WHY_PROTECT = [
  'Stay legally compliant on the road',
  'Get insurance support for accidental damage or theft',
  'Avoid penalties and fines for missing documents',
  'Ensure smooth resale or transfer of ownership',
]

const DOCS_WE_HELP = [
  'Vehicle Registration Certificate (RC)',
  'Insurance Papers',
  'Pollution Under Control (PUC) Certificate',
  'Loan / Lease Agreement (if applicable)',
  'Driving License and ID Proof',
]

const HOW_EASY = [
  { label: 'Register Online',   desc: 'Fill in your basic details in just a few clicks.' },
  { label: 'Upload Documents',  desc: 'Securely share your car papers for verification.' },
  { label: 'Expert Support',    desc: 'Our team ensures accuracy and compliance.' },
  { label: 'Get Delivered',     desc: 'Receive your processed documents online or at your doorstep.' },
]

const WHY_CHOOSE = [
  'Trusted brand for fast and reliable documentation services',
  '100% online convenience – no need to visit offices',
  'Secure handling of your documents',
  'Karnataka-focused expertise with nationwide support expanding soon',
]

const IDV_TABLE = [
  { age: 'Less than 6 months',                    dep: '5%'  },
  { age: 'More than 6 months but less than a year', dep: '15%' },
  { age: 'More than a year but less than 2 years', dep: '20%' },
  { age: 'More than 2 years but less than 3 years', dep: '30%' },
  { age: 'More than 3 years but less than 4 years', dep: '40%' },
  { age: 'More than 4 years but less than 5 years', dep: '50%' },
]

const FAQS = [
  {
    q: 'What documents are mandatory for protecting my four-wheeler?',
    a: 'You need to maintain a valid Registration Certificate (RC), Insurance Papers, PUC Certificate, Driving License, and ID proof. Additional documents like loan/lease agreements or NOC may be required depending on your vehicle status.',
  },
  {
    q: 'Can I apply for four-wheeler insurance online through Make My Document?',
    a: 'Yes, with Make My Document, the entire process is 100% online. You can register, upload your documents, make payment, and receive verified documents via email or WhatsApp without visiting any office.',
  },
  {
    q: 'How does Make My Documents ensure the safety of my car documents?',
    a: 'We use secure digital channels for document uploads and strictly protect customer data. Your personal and vehicle-related information remains confidential and is handled only by authorized experts.',
  },
  {
    q: 'How long does it take to get my four-wheeler insurance processed?',
    a: 'The typical processing time is 01 working days, depending on the type of service. For urgent cases, our team ensures priority handling to avoid delays.',
  },
  {
    q: 'What are the benefits of buying car insurance plans?',
    a: 'A car insurance policy is not only legally mandatory, it is beneficial too. It protects you against accidental damage, theft, third-party liabilities, and natural calamities. It also gives you peace of mind while driving.',
  },
  {
    q: 'How much will I get paid for a car damage claim?',
    a: 'Once your claim is accepted, you will be paid the approved claim amount minus certain deductions which you will have to pay out from your pocket: Depreciation: Standard insurance pays for the actual cash value of your damaged or destroyed vehicle part. However, since the part was already in use, its value will be less than or depreciated in comparison to a new replacement part. This will be 30% for fibre components and 50% for plastics and rubber. If you do not want to bear the depreciation cost, you can buy a zero depreciation add-on, which is available typically for cars not older than 3 years. Standard or Voluntary Deductible: This is a fixed amount that you have to bear before the policy comes into force. For private cars, this amount currently is Rs. 1,000.',
  },
  {
    q: 'What is IDV?',
    a: 'idv-table',
  },
  {
    q: 'For how many times can I claim for roadside assistance cover?',
    a: 'You can claim the roadside assistance cover for a maximum of four times during the entire policy period.',
  },
  {
    q: 'What is CTL?',
    a: 'CTL stands for Constructive Total Loss of the car. A loss if declared to be a CTL if the estimated repair costs exceed the IDV of the policy. In such cases, the IDV is paid as claim.',
  },
  {
    q: 'Can the car insurance policy be transferred to another individual?',
    a: 'Yes, if you are selling your car to another individual you can also transfer the insurance policy of the car to the buyer. While the policy ownership would change, the no claim bonus would remain with you and you can use the bonus to claim a premium discount in another car insurance policy which you buy.',
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
        <div className="ins-faq-v2-a">
          {a === 'idv-table' ? (
            <>
              <p style={{ marginBottom: 12 }}>
                The Insured Declared Value (IDV) represents the actual sum insured of the car insurance policy.
                It is calculated by deducting the age-based depreciation from the market value of the car.
                The applicable depreciation rates depend on the age of the car, as shown in the table below:
              </p>
              <table className="fwi-idv-table">
                <thead>
                  <tr><th>Age of the car</th><th>Applicable depreciation</th></tr>
                </thead>
                <tbody>
                  {IDV_TABLE.map(r => (
                    <tr key={r.age}><td>{r.age}</td><td>{r.dep}</td></tr>
                  ))}
                </tbody>
              </table>
              <p style={{ marginTop: 12 }}>
                If the car is more than 5 years old, the IDV is mutually decided between the insurance company
                and the policyholder. The IDV is paid as a claim if the car is damaged beyond repair or if it is stolen.
              </p>
            </>
          ) : a}
        </div>
      )}
    </div>
  )
}

export default function FourWheelerInsurance() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/insurance">Insurance</Link>
          <span> / </span>
          <span>Four-Wheeler Insurance</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="twi-hero">
        <div className="twi-hero-content mx">
          <div className="twi-hero-left">
            <div className="hero-pill" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.22)', color: 'rgba(255,255,255,.92)' }}>
              <span className="live-dot" />
              Four-Wheeler Insurance &nbsp;·&nbsp; Instant Policy
            </div>
            <h1 style={{ color: '#fff', letterSpacing: '-1.5px', marginBottom: 14 }}>
              Protect Your Four-Wheeler<br />with Ease
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
                  <div className="twi-card-title">Documents Required For Four-Wheeler Insurance</div>
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
                <Link href="/four-wheeler-insurance-form" className="twi-get-quotes-btn">
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
            Protect Your Four-Wheeler Insurance with Ease
          </h2>
          <p className="twi-art-p">
            Owning a car is more than just convenience—it&apos;s a responsibility. At Make My Document, we make
            protecting your four-wheeler simple, fast, and stress-free. From securing the right documents to
            ensuring compliance with regulations, our experts help you safeguard your vehicle with ease.
          </p>

          {/* Why Protect */}
          <h3 className="twi-art-h3">Why Protect Your Four-Wheeler?</h3>
          <p className="twi-art-p">
            Your car is a valuable asset, and protecting it ensures peace of mind. With the right documents
            and services, you can:
          </p>
          <ul className="twi-art-ul">
            {WHY_PROTECT.map(w => <li key={w}>{w}</li>)}
          </ul>

          {/* Docs we help */}
          <h3 className="twi-art-h3">Documents We Help You With</h3>
          <p className="twi-art-p">
            At Make My Document, we assist you in preparing, verifying, and managing all essential
            four-wheeler documents:
          </p>
          <ul className="twi-art-ul">
            {DOCS_WE_HELP.map(d => <li key={d}>{d}</li>)}
          </ul>

          {/* How easy */}
          <h3 className="twi-art-h3">How Make My Document Makes It Easy</h3>
          <div className="sol-steps" style={{ marginBottom: 32 }}>
            {HOW_EASY.map(({ label, desc }, i) => (
              <div key={i} className="sol-step">
                <div className="sol-connector" />
                <div className="sol-n ins-step-n">
                  <Car size={14} color="#fff" strokeWidth={2} />
                </div>
                <div>
                  <h4><strong>{label}:</strong> {desc}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Affordable */}
          <h3 className="twi-art-h3">Affordable Service Charges</h3>
          <p className="twi-art-p">
            With Make My Document, you don&apos;t have to worry about hidden fees. Our transparent pricing
            ensures you get the best value for reliable service.
          </p>

          {/* Why choose */}
          <h3 className="twi-art-h3">Why Choose Make My Documents?</h3>
          <ul className="twi-art-ul">
            {WHY_CHOOSE.map(w => <li key={w}>{w}</li>)}
          </ul>

          {/* Apply Today */}
          <div className="twi-cta-box">
            <Car size={28} strokeWidth={1.6} color="var(--amber)" />
            <div>
              <div className="twi-cta-title">Apply Today</div>
              <p className="twi-cta-desc">
                Protect your car the smart way with Make My Documents. Start your online application today
                and get complete peace of mind knowing your four-wheeler is safe, secure, and compliant.
              </p>
              <Link
                href="/four-wheeler-insurance-form"
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
