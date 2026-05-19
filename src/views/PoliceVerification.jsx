'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, CreditCard, CalendarCheck, MapPin, Package,
  ChevronRight, FileText, CheckCircle2,
} from 'lucide-react'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* --- Data ------------------------------------------- */

const HOW_STEPS = [
  { Icon: UserPlus,      title: 'Register Online',      desc: '' },
  { Icon: CreditCard,    title: 'Payment',              desc: '' },
  { Icon: CalendarCheck, title: 'Get Appointment',      desc: '' },
  { Icon: MapPin,        title: 'Visit Police Station', desc: '' },
  { Icon: Package,       title: 'Get Delivered',        desc: '' },
]

const REVIEWS = [
  { av: 'P', name: 'Priyanka N. Anand M', svc: 'Police Verification',        text: '"Very reliable and fast. I didn\'t have to struggle with government websites—everything was handled by their team."' },
  { av: 'M', name: 'Manjunath R.',        svc: 'Police Verification',        text: '"They made the whole process so convenient. I just had to attend one appointment, and they did the rest."' },
  { av: 'A', name: 'Ayesha K.',           svc: 'Police Verification',        text: '"Smooth from start to finish. The team kept me updated on every step, and there was zero paperwork confusion—police verification done without stress."' },
  { av: 'R', name: 'Ramesh Nambiar',      svc: 'Tenant Police Verification', text: '"I needed police verification done for a new tenant urgently. Make My Documents handled the entire application and follow-up with the police station. Got the report within 5 days. Excellent and trustworthy!"' },
  { av: 'K', name: 'Kavitha Subramanian', svc: 'Employee Background Check',  text: '"Our company needed police verification for several new hires. Make My Documents managed all of them simultaneously without any mix-up. Fast turnaround and accurate results. Will use them again."' },
  { av: 'H', name: 'Harish Gowda',        svc: 'Police Verification',        text: '"I was applying for a job abroad and needed a police clearance for my current address. The team filed the application and got it done without me visiting the station even once. Saved so much time."' },
]

const RELATED = [
  { label: 'Insurance',                    path: '/insurance'           },
  { label: 'Tourist Visa',                 path: '/tourist-visa'        },
  { label: 'Police Verification',          path: '/police-verification' },
  { label: 'Police Clearance Certificate', path: '/police-clearance'    },
  { label: 'Pan Card',                     path: '/pan-card'            },
  { label: 'Affidavits / Annexure',        path: '/affidavits'          },
]

const FAQS = [
  { q: 'What is a Police Verification Certificate?',
    a: "It's an official certificate issued by the police confirming you have no criminal record." },
  { q: 'Who needs a PVC?',
    a: "It's often required for jobs, tenant verification, passports, visas, and other legal documentation." },
  { q: 'How do I apply through Make My Documents?',
    a: 'Just register online, upload your documents, and attend the scheduled police appointment.' },
  { q: 'What documents are required?',
    a: 'You need any one address proof (Aadhaar card) and a passport-size photograph.' },
  { q: 'Do I have to visit the police station?',
    a: 'Yes, a single police station visit is necessary for verification.' },
  { q: 'How long does it take to get the certificate?',
    a: 'Usually 7-30 working days depending on police verification speed.' },
  { q: 'Will I get a physical or digital certificate?',
    a: 'You will receive a digital copy via WhatsApp or email. You can print it for official use.' },
  { q: 'Can I track my application?',
    a: "Yes, we'll keep you updated throughout the process until delivery.." },
  { q: 'Is my data safe?',
    a: 'Absolutely. We use secure systems and maintain strict confidentiality.' },
  { q: 'Is this service available outside Karnataka?',
    a: 'No, currently we only process Police Verification Certificates within Karnataka.' },
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
        <Link href="/police-verification-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function PoliceVerification() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Police Verification</div>
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
              Police Verification &nbsp;·&nbsp; 99% On-Time
            </div>
            <h1 className="svc-h1">
              Police Verification<br />
              <span className="teal">Certificate </span>
              <span className="amber">Online.</span>
            </h1>
            <p className="svc-hero-sub">
              Fast, hassle-free Police Verification Certificate — delivered digitally to your WhatsApp or email.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ Processing time: 10-15 working days
              </span>
            </div>
            <div className="svc-hero-acts">
              <Link href="/police-verification-form" className="btn-amber">Apply Now →</Link>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '99%',   lbl: 'Delivered on Time'  },
              { val: '10-15', lbl: 'Working Days'        },
              { val: '₹750',  lbl: 'Application Fee'     },
              { val: '4.8★',  lbl: 'Google Rating'       },
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
                  {['Aadhar Card', 'Passport size photo'].map(d => (
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
                <strong style={{ color: 'var(--amber)' }}>Rs. 750/-</strong> For (Normal Application)
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

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 22, marginBottom: 16 }}>Police Verification Certificate – Apply Online</h2>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Are you requiring a Police Verification Certificate (PVC) for employment, lease contract, passport, or any other official documentation? The company Make My Documents accomplishes every step of the way in a time that is as short as it is safe, and without any difficulty, for the residents of Karnataka. What used to take a long time and be quite frustrating with the paperwork and the long waiting lines, is now possible to do on the internet in no time: you can book an appointment, and your certificate can be delivered either to your mail or to your WhatsApp.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Why police verification is important</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                A Police Verification Certificate is a document that certifies a person has a clean record and is identified properly. It is necessary for:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Hiring &amp; Background Checks:</strong> A lot of organizations including government bodies/utilities call for a police report as a prior condition to hiring. Verify your next employer with our secured police verification services.</li>
                <li><strong>Rental Verification:</strong> Landlords or housing societies supreme courts will require a police-verified identity proof.</li>
                <li><strong>Passport &amp; Visa Requests:</strong> This is one of the requisites for the different traveling documents.</li>
                <li><strong>Legal &amp; Security Needs:</strong> It is a source of trust and confidence, both in your personal/business transactions, etc.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Eligibility</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                To apply for a Police Verification Certificate through Make My Documents:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li>You must be a resident of Karnataka.</li>
                <li>You must have valid proof of address and a government-issued ID.</li>
                <li>You should be able to attend a police station appointment for verification.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Documents required (any one address proof)</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Keep one of the following documents ready before applying:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Aadhaar Card</strong></li>
                <li><strong>Passport Size Photograph</strong></li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Who Needs a PVC?</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                You might need a Police Verification Certificate if you're:
              </p>
              <ul className="pan-bullet-list">
                <li><strong>Register Online:</strong> Enter your details securely through our portal.</li>
                <li><strong>Make Payment:</strong> Pay online for fast processing of your application.</li>
                <li><strong>Get Appointment:</strong> Receive a scheduled date and time for your police station visit.</li>
                <li><strong>Visit Police Station:</strong> Attend the appointment for identity verification.</li>
                <li><strong>Get Delivered:</strong> Your Police Verification Certificate will be sent digitally via WhatsApp or Email.</li>
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



