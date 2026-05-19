'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, Upload, CreditCard, CalendarCheck, MapPin, Package,
  ChevronRight, FileText, CheckCircle2,
} from 'lucide-react'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* --- Data ------------------------------------------- */

const HOW_STEPS = [
  { Icon: UserPlus,      title: 'Register Online',   desc: 'Fill out the form on our website and provide your details securely.' },
  { Icon: Upload,        title: 'Upload Documents',  desc: 'Submit scans of your Passport and Address Proof in a readable format.' },
  { Icon: CreditCard,    title: 'Payment',           desc: 'Pay for the application processing online.' },
  { Icon: CalendarCheck, title: 'Get Appointment',   desc: 'After a check, we will allocate you a time to attend the Passport Seva Kendra (PSK) nearest to you.' },
  { Icon: MapPin,        title: 'Visit Psk',         desc: 'Verification by your presence at the appointed time.' },
  { Icon: Package,       title: 'Get Delivered',     desc: 'Get your PCC electronically through WhatsApp or Email.' },
]

const REVIEWS = [
  { av: 'P', name: 'Priya Nair',     svc: 'Police Clearance Certificate', text: '"The entire process was transparent and stress-free. Highly recommend their service."' },
  { av: 'R', name: 'Rohit Kumar',    svc: 'Police Clearance Certificate', text: '"They handled everything perfectly, and I received my PCC digitally. Very efficient service!"' },
  { av: 'K', name: 'Karan Malhotra', svc: 'Police Clearance Certificate', text: '"Getting the appointment through them saved me so much time. Great experience!"' },
  { av: 'A', name: 'Anand M',        svc: 'Police Clearance Certificate', text: '"The PCC process was smooth and well-managed. I needed it urgently and they delivered on time."' },
  { av: 'S', name: 'Sathya Prakash', svc: 'PCC for Immigration',          text: '"I needed a PCC for my Canada PR application and the deadline was very tight. The team at Make My Documents expedited the process and I received it in just 4 working days. Without their help I would have missed my submission window."' },
  { av: 'N', name: 'Nisha Thomas',   svc: 'PCC for Overseas Employment',  text: '"Required a PCC for my nursing job in the UK. The team knew exactly what format was needed and ensured the document was attested properly. Everything went through smoothly and my employer was fully satisfied."' },
  { av: 'G', name: 'Ganesh Moorthy', svc: 'Police Clearance Certificate', text: '"Applied for PCC for my Australia immigration and the team guided me through each step — from application to police station appointment and final collection. Got my PCC without a single rejection. Very professional."' },
]

const RELATED = [
  { label: 'Insurance',                    path: '/insurance'            },
  { label: 'Tourist Visa',                 path: '/tourist-visa'         },
  { label: 'Police Verification',          path: '/police-verification'  },
  { label: 'Police Clearance Certificate', path: '/police-clearance'     },
  { label: 'Pan Card',                     path: '/pan-card'             },
  { label: 'Affidavits / Annexure',        path: '/affidavits'           },
]

const FAQS = [
  { q: 'What is a Police Clearance Certificate used for?',
    a: 'It is used for background checks during visa, immigration, job applications, tenant verification, and government documentation.' },
  { q: 'How long does it take to get a PCC?',
    a: 'Processing typically takes 7-15 working days after your PSK visit, depending on police clearance speed.' },
  { q: 'Do I need a passport to get PCC?',
    a: 'Yes, an existing passport is mandatory for the application process.' },
  { q: 'Can I apply for PCC online?',
    a: 'Yes, Make My Documents allows you to register online, upload documents, and schedule your PSK appointment without hassle.' },
  { q: 'How long is a PCC valid?',
    a: 'A PCC is valid for 6 months, though some authorities may request a newer certificate.' },
  { q: 'Can I use the same PCC for multiple purposes?',
    a: 'If the PCC is valid and recent, it can be used for multiple applications, but some embassies may request a fresh one.' },
  { q: 'Is a police station visit necessary?',
    a: "No, verification is done during your PSK appointment; you don't need to visit the local police station separately." },
  { q: 'What if my PCC is delayed?',
    a: 'We track your application and assist in resolving delays to ensure timely delivery.' },
  { q: 'How will I receive my PCC?',
    a: "You'll receive a digital copy via WhatsApp or Email that you can print for official use." },
  { q: 'Is this service available outside Karnataka?',
    a: 'Currently, we only process PCC applications for residents of Karnataka.' },
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

function ApplyForm() {
  return (
    <div className="pan-apply-card" style={{ position: 'sticky', top: 86 }}>
      <div className="pan-apply-head">
        <h3 className="pan-apply-title">Apply in 2 Minutes</h3>
        <p className="pan-apply-sub">It takes less than 2 minutes to Apply</p>
      </div>
      <div className="pan-apply-body">
        <Link href="/police-clearance-certificate-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function PoliceClearanceCertificate() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Police Clearance Certificate</div>
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
              Police Clearance Certificate &nbsp;·&nbsp; 99% On-Time
            </div>
            <h1 className="svc-h1">
              Police Clearance<br />
              <span className="teal">Certificate </span>
              <span className="amber">Online.</span>
            </h1>
            <p className="svc-hero-sub">
              Fast, hassle-free PCC — delivered digitally to your WhatsApp or email.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ✓ 99% Delivered on time
              </span>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ Processing time: 15-20 working days
              </span>
            </div>
            <div className="svc-hero-acts">
              <Link href="/police-clearance-certificate-form" className="btn-amber">Apply Now →</Link>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '99%',   lbl: 'Delivered on Time' },
              { val: '15-20', lbl: 'Working Days'       },
              { val: '₹1000', lbl: 'Application Fee'    },
              { val: '4.8★',  lbl: 'Google Rating'      },
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

      {/* -- Documents + How It Works + Apply Form -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>
              {/* Documents Required */}
              <div className="eyebrow">What You Need</div>
              <h2>Documents Required (Any One Address Proof)</h2>
              <div className="pan-doc-v2" style={{ marginTop: 20, marginBottom: 36 }}>
                <div className="pan-doc-v2-header pan-doc-v2-teal">
                  <div className="pan-doc-v2-ico"><I icon={FileText} size={18} color="var(--teal)" /></div>
                  <h3>Documents Required (Any One Address Proof)</h3>
                </div>
                <ul className="pan-doc-v2-list">
                  {[
                    'Existing Passport (Mandatory)',
                    'Aadhaar Card',
                    'Bank Statement',
                    'Voter ID Card',
                  ].map(d => (
                    <li key={d}><I icon={CheckCircle2} size={14} color="var(--teal)" /> {d}</li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              <div className="eyebrow">Simple Process</div>
              <h2>How It Works</h2>
              <div className="sol-steps" style={{ marginTop: 24 }}>
                {HOW_STEPS.map(({ Icon, title, desc }, i) => (
                  <div key={i} className="sol-step">
                    <div className="sol-connector" />
                    <div className="sol-n ins-step-n">
                      <I icon={Icon} size={16} color="#fff" />
                    </div>
                    <div>
                      <h4>Step {i + 1}: {title}</h4>
                      {desc && <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.65, marginTop: 4 }}>{desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ApplyForm />
          </div>
        </div>
      </section>

      {/* -- Charges -- */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="eyebrow">Pricing</div>
          <h2>Charges</h2>
          <div className="ins-callout-box" style={{ maxWidth: 720, marginTop: 20 }}>
            <ul className="pan-bullet-list" style={{ marginBottom: 0 }}>
              <li>
                <strong style={{ color: 'var(--amber)' }}>Rs. 1000/-</strong> For Application
              </li>
              <li>
                Rs.99 as booking fee. Need to pay while submitting online form{' '}
                <span style={{ color: 'var(--ink3)' }}>(This fee is non-refundable and will be adjusted in the total bill.)</span>
              </li>
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

      {/* -- Long-form Content + Apply Form -- */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 22, marginBottom: 16 }}>
                What is a Police Clearance Certificate or PCC?
              </h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                A Police Clearance Certificate (PCC) is a formal document that is released by the authorities of a government declaring that a person has never been involved in any criminal activities or is of good character. Such a certificate is generally sought after in the case of a visa application, when one wants to move to another country, get a job in a foreign country, for the verification of the tenant, and for some government documentation purposes.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                PCC acts as a reliable background check document, thus giving the officials, who are employers, landlords, and government authorities, the necessary credibility and security. The process of getting a PCC with Make My Documents is very simple, it can be done online, and one is completely guided throughout the process.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>
                How to Apply for a Police Clearance Certificate
              </h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                Filing for a Police Clearance Certificate in Karnataka is very simple. Make My Documents allows you to fill out your application in a few clicks without the tedious paperwork. The team that is responsible for the collection of your data ensures that your data is submitted correctly and that your visit to the nearest Passport Seva Kendra (PSK) is arranged.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Then the application processing at PSK takes place swiftly at the time of your PSK appointment, and a P.C.C. is delivered to your mail or WhatsApp in electronic form.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>
                What is the Validity of Police Clearance Certificate?
              </h2>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Generally, a Police Clearance Certificate is valid for half a year starting from the day it was issued. Depending on the condition of your employer or the embassy, the PCC may be required within a certain period, in which case the validity may be shorter than six months. If for your job application or obtaining a new visa you need to submit the PCC and yours is already expired, then it is advisable to get a new one.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>
                Documents Required for Police Clearance Certificate
              </h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Make sure to have any ONE valid address proof ready when applying for PCC:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Existing Passport</strong> (Mandatory)</li>
                <li><strong>Aadhaar Card</strong></li>
                <li><strong>Bank Statement</strong></li>
                <li><strong>Voter ID Card</strong></li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>
                How It Works – Make My Documents Process
              </h2>
              <p className="ins-body-p" style={{ marginBottom: 20 }}>
                How to Apply for Police Clearance Certificate is made simple in 6 easy steps:
              </p>
              <ul className="pan-bullet-list">
                <li><strong>Online Registration:</strong> Fill out the form on our website and provide your details securely.</li>
                <li><strong>Document Upload:</strong> Submit scans of your Passport and Address Proof in a readable format.</li>
                <li><strong>Payment:</strong> Pay for the application processing online.</li>
                <li><strong>Permission Received:</strong> After a check, we will allocate you a time to attend the Passport Seva Kendra (PSK) nearest to you.</li>
                <li><strong>Go to PSK:</strong> Verification by your presence at the appointed time.</li>
                <li><strong>On the way home:</strong> Get your PCC electronically through WhatsApp or Email.</li>
              </ul>

            </div>
            <ApplyForm />
          </div>
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



