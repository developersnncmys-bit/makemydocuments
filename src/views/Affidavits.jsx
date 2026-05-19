'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import {
  ClipboardList, PenLine, Eye, CreditCard, Package,
} from 'lucide-react'
import BlogCard from '../components/BlogCard'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* --- Data ------------------------------------------- */

const AFFIDAVIT_TYPES = [
  'Name Change Affidavit (Annexure E)',
  'Name Change Affidavit for Minor',
  'One and the Same Person Affidavit',
  'Change of Signature Affidavit',
  'Other',
]

const HOW_STEPS = [
  { Icon: ClipboardList, title: 'Register Online',  desc: 'Fill out your details and select your affidavit type securely on our platform.' },
  { Icon: PenLine,       title: 'Drafting',          desc: 'Our legal experts draft your affidavit accurately based on your requirements.' },
  { Icon: Eye,           title: 'Review Drafting',   desc: 'Review the drafted affidavit and request changes if needed before finalisation.' },
  { Icon: CreditCard,    title: 'Payment',           desc: 'Complete a quick and secure online payment to confirm your order.' },
  { Icon: Package,       title: 'Doorstep Delivery', desc: 'Receive your legally prepared affidavit digitally or via courier at your doorstep.' },
]

const REVIEWS = [
  { av: 'A', name: 'Anjali Mehta',   svc: 'Name Change Affidavit',          text: '"I applied for a name change affidavit online and got it within 24 hours. Very convenient and fast!"' },
  { av: 'R', name: 'Rohit Kapoor',   svc: 'Affidavit Service',              text: '"The process was smooth, and I didn\'t have to visit any legal office. Excellent service!"' },
  { av: 'S', name: 'Sneha Iyer',     svc: 'Affidavit Service',              text: '"Affordable and reliable. Got my affidavit on time and without hassle."' },
  { av: 'P', name: 'Padma Nair',     svc: 'Residence Proof Affidavit',      text: '"Needed a residence proof affidavit for my son\'s school admission and the document was ready within the same day. Notarized and printed, delivered right to my door. Would not have been able to manage this without Make My Documents."' },
  { av: 'V', name: 'Vijayalaxmi S.', svc: 'Name Change Affidavit (Minor)',  text: '"My daughter\'s name had a spelling difference between her birth certificate and school records. The team drafted the name change affidavit for a minor in no time, properly notarized. School accepted it immediately. Absolutely reliable service."' },
  { av: 'K', name: 'Karthik Balan',  svc: 'One and the Same Person Affidavit', text: '"My name appeared differently in different documents — passport vs PAN vs Aadhaar. The \'one and the same person\' affidavit sorted everything out for my job background verification. Got it done through Make My Documents in 12 hours flat."' },
  { av: 'M', name: 'Meghana R.',     svc: 'Affidavit Service',              text: '"Required a self-declaration affidavit for my property registration. The team understood the exact format required by the registrar office and drafted it perfectly. No corrections needed. Super fast delivery and great customer service."' },
]

const RELATED = [
  { label: 'Insurance',                    path: '/insurance'           },
  { label: 'Travel Visa',                  path: '/tourist-visa'        },
  { label: 'Police Verification',          path: '/police-verification' },
  { label: 'Police Clearance Certificate', path: '/police-clearance'    },
  { label: 'Pan Card',                     path: '/pan-card'            },
  { label: 'Affidavits / Annexure',        path: '/affidavits'          },
]

const FAQS = [
  { q: 'Are these affidavits legally valid?',
    a: 'Yes, all affidavits are drafted by legal experts and are valid across India.' },
  { q: 'Can I apply for an affidavit online?',
    a: 'Yes, Make My Documents offers 100% online affidavit application and delivery.' },
  { q: 'Do I need to visit a notary?',
    a: 'No, we handle notarization and send you a ready-to-use affidavit.' },
  { q: 'Can I get affidavits in regional languages?',
    a: 'Yes, affidavits can be drafted in English or regional languages.' },
  { q: 'Is Aadhaar mandatory for all affidavits?',
    a: 'Yes, Aadhaar is preferred for identity verification.' },
  { q: 'How long does it take to get an affidavit?',
    a: 'Most affidavits are ready in 1-2 working days.' },
  { q: 'Are affidavits accepted by banks and government offices?',
    a: 'Yes, all documents are legally verified and accepted by official authorities.' },
  { q: 'Can I apply for multiple affidavits at once?',
    a: 'Yes, you can request multiple affidavit types in one application.' },
  { q: 'Will I get a physical copy of the affidavit?',
    a: 'Yes, a signed and notarized hard copy can be delivered upon request.' },
  { q: 'Is my personal data secure?',
    a: 'Absolutely. We use encrypted systems and maintain strict confidentiality.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ins-faq-v2${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ins-faq-v2-q">
        <span>{q}</span>
        <span className="ins-faq-v2-icon">{open ? '-' : '+'}</span>
      </div>
      {open && a && <div className="ins-faq-v2-a">{a}</div>}
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function Affidavits() {
  const [selectedType, setSelectedType] = useState('')

  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Affidavits &amp; Annexure</div>
      </div>

      {/* -- Hero -- */}
      <div className="svc-hero-wrap">
        <div className="hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <div className="dots" /><div className="blob1" /><div className="blob2" />
        </div>
        <div className="mx svc-hero-content">
          <div className="svc-hero-left">
            <div className="hero-pill">
              <span className="live-dot" />
              Affidavit Services &nbsp;·&nbsp; Legal Experts &nbsp;·&nbsp; Doorstep Delivery
            </div>
            <h1 className="svc-h1">
              Apply for<br />
              <span className="teal">Affidavits </span>
              <span className="amber">Online.</span>
            </h1>
            <p className="svc-hero-sub">
              Legal affidavits made simple — name change, signature update, and more. Drafted by experts, delivered to your door.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ✓ 99% Delivered on time
              </span>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '99%',  lbl: 'Delivered on Time' },
              { val: '1-2',  lbl: 'Days Processing'   },
              { val: '4.8★', lbl: 'Google Rating'     },
              { val: '₹500', lbl: 'Application Fee'   },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="svc-stat-card">
                <div className="svc-stat-val">{val}</div>
                <div className="svc-stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="svc-hero-wave" />
      </div>

      {/* -- Select Affidavit + How It Works -- */}
      <section className="ins-section-white">
        <div className="mx">

          {/* Select Affidavit Dropdown */}
          <div style={{ maxWidth: 560, margin: '0 auto 52px' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: 15, marginBottom: 10, color: 'var(--ink)' }}>
              Select Affidavit <span style={{ color: '#e53e3e' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                style={{
                  width: '100%', padding: '14px 44px 14px 16px', fontSize: 15,
                  border: '1.5px solid #d1d5db', borderRadius: 10,
                  background: '#fff', color: selectedType ? 'var(--ink)' : '#6b7280',
                  appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
                  outline: 'none', fontFamily: 'inherit', boxShadow: '0 1px 4px rgba(0,0,0,.06)',
                }}
              >
                <option value="" disabled>Choose</option>
                {AFFIDAVIT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280', fontSize: 12 }}>▼</div>
            </div>
          </div>

          {/* How It Works */}
          <div>
            <div className="eyebrow">Simple Process</div>
            <h2>How It Works</h2>
            <p className="sec-desc" style={{ marginBottom: 32 }}>
              We follow a simple, step-by-step process to make affidavit applications stress-free:
            </p>
            <div className="sol-steps">
              {HOW_STEPS.map(({ Icon, title, desc }, i) => (
                <div key={i} className="sol-step">
                  <div className="sol-connector" />
                  <div className="sol-n ins-step-n">
                    <I icon={Icon} size={16} color="#fff" />
                  </div>
                  <div>
                    <h4>{title}</h4>
                    <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.65, marginTop: 4 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- Charges -- */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead">
            <div className="eyebrow">Pricing</div>
            <h2>Charges</h2>
          </div>
          <div className="ins-callout-box">
            <ul className="pan-bullet-list">
              <li>
                <strong style={{ color: 'var(--amber)' }}>Rs. 500/-</strong> For (Normal Application)
              </li>
              <li>Rs.50 as booking/consulting charge. Need to pay while submitting online form</li>
            </ul>
          </div>
        </div>
      </section>

      {/* -- Reviews -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow">Client Reviews</div>
            <h2>Our Client Reviews</h2>
          </div>
          <ReviewSlider reviews={REVIEWS} />
        </div>
      </section>

      {/* -- Related Services -- */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead center" style={{ marginBottom: 32 }}>
            <div className="eyebrow">Explore More</div>
            <h2>Our Other Related Services</h2>
          </div>
          <div className="pan-related-grid">
            {RELATED.map(({ label, path }) => (
              <Link key={label} href={path} className="pan-related-card">
                <span>{label}</span>
                <span className="pan-related-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -- Latest Blogs -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead between">
            <div>
              <div className="eyebrow">Resources</div>
              <h2>Explore Our Latest Blogs</h2>
            </div>
            <Link href="/blogs"
              className="btn-teal" style={{ fontSize: 14, padding: '12px 22px', alignSelf: 'flex-start' }}>
              View All →
            </Link>
          </div>
          <div className="blog-grid">
            <BlogCard slug="how-to-apply-for-passport-online-india-2026" />
            <BlogCard slug="vietnam-tourist-visa-indians-2026-guide" />
            <BlogCard slug="pan-card-new-rules-april-2026" />
          </div>
        </div>
      </section>

      {/* -- Long-form content -- */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead">
            <div className="eyebrow">About Our Service</div>
            <h2>Apply for Affidavits Online – Quick and Hassle-Free in Karnataka</h2>
          </div>
          <p className="ins-body-p" style={{ marginBottom: 16, maxWidth: 860 }}>
            One thing that is quite certain is that filing for an affidavit is not necessarily a nightmare of standing in long queues, dealing with tons of paperwork, and getting lost in legal jargon. Online through Make My Documents, you are empowered to generate affidavits that are recognized by law for changing names, updating signatures, and any other personal or official use.
          </p>
          <p className="ins-body-p" style={{ marginBottom: 48, maxWidth: 860 }}>
            We take care of everything from the writing of the document to the delivery, so it means that you get to save a lot of your time and energy.
          </p>

          <h2 className="pan-content-h2">Name Change Affidavit (Annexure E)</h2>
          <p className="ins-body-p" style={{ marginBottom: 14, maxWidth: 860 }}>
            An affidavit for a name change (Annexure E) is a formal record used to update your name in legal files, government-issued identification, passports, or financial documentation. It is a necessity for a person who has done a name change with the law and requires the same to be reflected in all documents.
          </p>
          <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--ink)', fontSize: 14 }}>Use Cases:</p>
          <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
            <li>Correct spelling errors in your name.</li>
            <li>Update your name in Aadhaar, PAN, or passport records.</li>
            <li>Legal proof for name changes due to personal preference or legal reasons.</li>
          </ul>

          <h2 className="pan-content-h2">Name Change Affidavit for Minor</h2>
          <p className="ins-body-p" style={{ marginBottom: 14, maxWidth: 860 }}>
            A Marriage Name Change Affidavit is a document needed when a woman (or a man) decides to change her/his last name or full name after marriage. The affidavit is accepted as a certificate of your new identity in passports, bank records, and other official documents.
          </p>
          <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--ink)', fontSize: 14 }}>Use Cases:</p>
          <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
            <li>Get your last name or full name changed after marriage.</li>
            <li>Alter your name in bank accounts, Aadhaar, and passports.</li>
            <li>Serve as legal evidence for immigration or visa purposes.</li>
          </ul>

          <h2 className="pan-content-h2">One and the Same Person Affidavit</h2>
          <p className="ins-body-p" style={{ marginBottom: 14, maxWidth: 860 }}>
            These are the cases when a P.O.A. (Power of Attorney) is required if a person has several names or different forms of a name on various documents. Such a document eliminates misunderstandings by a legal announcement that all the names indicate the same person.
          </p>
          <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--ink)', fontSize: 14 }}>Use Cases:</p>
          <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
            <li>Spelling differences in official documents are corrected.</li>
            <li>Identifying name differences in educational certificates, property documents, and IDs.</li>
            <li>During legal or financial checks, to give evidence.</li>
          </ul>

          <h2 className="pan-content-h2">Change of Signature Affidavit</h2>
          <p className="ins-body-p" style={{ marginBottom: 14, maxWidth: 860 }}>
            When a person wants to change their signature and their signature is to be changed for banking, property dealings, or any other official use, a Change of Signature Affidavit should be filed.
          </p>
          <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--ink)', fontSize: 14 }}>Use Cases:</p>
          <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
            <li>Modify your signature on government records and bank accounts.</li>
            <li>Present a sealed signature example for use in court.</li>
            <li>Present as evidence in the case of a company transaction or foreigner status.</li>
          </ul>

          <h2 className="pan-content-h2">Our Easy Process</h2>
          <p className="ins-body-p" style={{ marginBottom: 14, maxWidth: 860 }}>
            We've simplified affidavit creation into 4 quick steps:
          </p>
          <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
            <li><strong>Register Online:</strong> Fill out your details securely.</li>
            <li><strong>Upload Documents:</strong> Submit scanned copies of your ID proof.</li>
            <li><strong>Make Payment:</strong> Complete a quick online payment.</li>
            <li><strong>Get Delivered:</strong> Receive your legally drafted affidavit digitally or via courier.</li>
          </ul>

          <h2 className="pan-content-h2">Documents Required</h2>
          <p className="ins-body-p" style={{ marginBottom: 14, maxWidth: 860 }}>
            For most affidavits, you will need:
          </p>
          <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
            <li>Aadhaar Card or any valid government-issued ID</li>
            <li>Passport-size photo (if required)</li>
            <li>Any additional document supporting the affidavit type</li>
          </ul>

          <h2 className="pan-content-h2">Processing Time</h2>
          <p className="ins-body-p" style={{ maxWidth: 860 }}>
            Affidavit processing is quick and can be completed within 1-2 working days after document submission.
          </p>
        </div>
      </section>

      {/* -- FAQs -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow">Got Questions?</div>
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



