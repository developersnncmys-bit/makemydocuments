'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, Upload, CreditCard, Fingerprint, Package,
  ChevronRight, FileText, CheckCircle2,
} from 'lucide-react'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* --- Data ------------------------------------------- */

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',  desc: '' },
  { Icon: Upload,      title: 'Upload Documents', desc: '' },
  { Icon: CreditCard,  title: 'Payment',          desc: '' },
  { Icon: Fingerprint, title: 'Online Ekyc',      desc: 'Mobile number should be linked with Aadhaar card' },
  { Icon: Package,     title: 'Get Delivered',    desc: '' },
]

const REVIEWS = [
  { av: 'A', name: 'Anand M',              svc: 'Senior Citizen Card', text: '"Mr Ganesh was very quick in assisting me, good knowledge, good time sense, wish his a great career"' },
  { av: 'S', name: 'Sreetheja Adusumilli', svc: 'Senior Citizen Card', text: '"I have Made a payment for a senior citizen card to my father. Post making the payment they said due to some technical issues they were not able to proceed."' },
  { av: 'R', name: 'Raghavendra S.',       svc: 'Senior Citizen Card', text: '"Very prompt service and polite staff. They guided me step by step and ensured everything was done smoothly."' },
  { av: 'U', name: 'Uma Krishnaswamy',     svc: 'Senior Citizen Card', text: '"Got the senior citizen card for my 68-year-old mother without her having to step outside. The team handled everything digitally and delivered it home. She now gets railway and medical discounts. So happy with this service!"' },
  { av: 'B', name: 'Bhaskar Rao',          svc: 'Senior Citizen Card', text: '"Applied for my own senior citizen card and the process was completely online. They guided me through the eKYC and document submission in under 15 minutes. Received the card within a week. Very smooth experience."' },
  { av: 'J', name: 'Jayanti Devi',         svc: 'Senior Citizen Card', text: '"My husband is 72 and not comfortable with technology. The Make My Documents team was patient and walked him through everything over WhatsApp. The card arrived quickly and he can now avail all the senior citizen benefits. Grateful for the help!"' },
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
  { q: 'Who is eligible for a Senior Citizen Card in India?',
    a: 'Anyone aged 60 years and above can apply for a Senior Citizen Card.' },
  { q: 'Can I apply online for a Senior Citizen Card?',
    a: 'Yes! With Make My Documents, the entire application process is online.' },
  { q: 'What documents are needed for a Senior Citizen Card?',
    a: "You'll need Aadhaar, date of birth proof, address proof, and passport-size photographs." },
  { q: 'How long does it take to get the Senior Citizen Card?',
    a: 'It usually takes 7-10 working days once your application is verified.' },
  { q: 'Is the Senior Citizen Card valid across India?',
    a: 'Yes, it is a nationally recognized identity document.' },
  { q: 'Can family members apply on behalf of senior citizens?',
    a: 'Absolutely! Family members can apply online for elderly applicants.' },
  { q: 'What are the benefits of a Senior Citizen Card?',
    a: 'It offers healthcare discounts, travel concessions, pension schemes, and tax benefits.' },
  { q: 'Is there an expiry date for the Senior Citizen Card?',
    a: 'No, it remains valid for a lifetime unless reissued.' },
  { q: 'How can I track my application status?',
    a: 'You can track it online through our Make My Documents portal.' },
  { q: 'Why choose Make My Documents over direct government application?',
    a: 'We provide end-to-end guidance, error-free filing, and doorstep delivery for your convenience.' },
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
        <Link href="/senior-citizen-card-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function SeniorCitizenCard() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Senior Citizen Card</div>
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
              Senior Citizen Card &nbsp;·&nbsp; Karnataka Only &nbsp;·&nbsp; 99% On-Time
            </div>
            <h1 className="svc-h1">
              Senior Citizen<br />
              <span className="teal">Card </span>
              <span className="amber">Services.</span>
            </h1>
            <p className="svc-hero-sub">
              Fast, online Senior Citizen Card application — delivered to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ Processing time: 25-30 working days
              </span>
            </div>
            <div className="svc-hero-acts">
              <Link href="/senior-citizen-card-form" className="btn-amber">Apply Now →</Link>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '99%',   lbl: 'Delivered on Time'  },
              { val: '25-30', lbl: 'Working Days'        },
              { val: '₹300',  lbl: 'Application Fee'     },
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

      {/* -- Note + Documents + How It Works + Apply Form -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>

              {/* Note */}
              <div className="eyebrow">Important</div>
              <h2>Note!</h2>
              <div className="ins-callout-box" style={{ marginBottom: 36 }}>
                <ul className="pan-bullet-list" style={{ marginBottom: 0 }}>
                  <li>Service available only in Karnataka.</li>
                  <li>Eligibility: The applicant must be at least 60 years of age.</li>
                  <li>The applicant must be a resident of Karnataka.</li>
                  <li>Once its approved we will share you and soft copy via email or WhatsApp</li>
                  <li>you can take color printout and use.</li>
                </ul>
              </div>

              {/* Documents Required */}
              <div className="eyebrow">What You Need</div>
              <h2>Documents Required For Senior Citizen Card</h2>
              <div className="pan-doc-v2" style={{ marginTop: 20, marginBottom: 36 }}>
                <div className="pan-doc-v2-header pan-doc-v2-teal">
                  <div className="pan-doc-v2-ico"><I icon={FileText} size={18} color="var(--teal)" /></div>
                  <h3>Documents Required For Senior Citizen Card</h3>
                </div>
                <ul className="pan-doc-v2-list">
                  {['Aadhar Card', 'Blood Report', 'Two Passport size photo'].map(d => (
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
                <strong style={{ color: 'var(--amber)' }}>Rs. 300/-</strong> For Application
              </li>
              <li>
                If you decide to cancel your order after payment, please note that a cancellation fee of Rs. 50 will apply.
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

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 22, marginBottom: 16 }}>Apply for Your Senior Citizen Card Online with Ease</h2>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Are you or your family members over the age of 60 and looking for a senior citizen card to avail of government benefits, travel concessions, and healthcare perks. Make My Documents makes it easier for you to get your Senior Citizen ID card quickly and hassle-free by simplifying the whole process. If it is just a declaration of age, security benefits, or an identity verification, we make sure that our team of professionals performs your application the right way and on time.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Why You Need a Senior Citizen Card</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                The Senior Citizen Card is the most important identification document for people who are 60 years old and above. The card gives access to:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Healthcare Benefits:</strong> Medical prioritization with less expense at clinics and hospitals.</li>
                <li><strong>Travel Discounts:</strong> Lower transportation costs for bus, train, and air travels throughout India.</li>
                <li><strong>Financial Concessions:</strong> Special banking services, pension plans, and tax benefits.</li>
                <li><strong>Government Schemes:</strong> Convenience in the senior citizen welfare program and subsidies.</li>
                <li><strong>Official Age Proof:</strong> Also considered one of the most authentic and widely accepted proofs of identity and age.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Why Choose Make My Documents for Senior Citizen Card Services</h2>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Easy Online Process:</strong> No need to stand in line, just take a few minutes to fill out a form at your convenience.</li>
                <li><strong>Professional Help:</strong> Our specialists will guide you through the paperwork, even with the verification and tracking.</li>
                <li><strong>Quick Service:</strong> Your card will be delivered at a short notice and you will not have to make several trips to the administration office.</li>
                <li><strong>Safe and Private:</strong> The security of your information is our utmost priority.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>How to Apply for a Senior Citizen Card</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Making a through Make My Documents is a quick process that doesn't take much time or effort:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Register Online:</strong> Open our webpage and select the Senior Citizen Card service.</li>
                <li><strong>Dispatch Documents for the Job:</strong> Send the scanned ID proof, location proof, and a passport-size picture of yourself.</li>
                <li><strong>Carry out eKYC:</strong> Verify your identity securely online.</li>
                <li><strong>Follow the Application:</strong> Keep track of where your card is.</li>
                <li><strong>Receive the Card:</strong> Have your Senior Citizen Card delivered to your home.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Documents Required for Senior Citizen Card</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                First of all, you need to ensure that you have the documents listed below available:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Aadhar Card</strong></li>
                <li><strong>New Passport size photos.</strong></li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Benefits of Applying Through Make My Documents</h2>
              <ul className="pan-bullet-list">
                <li>First off, a valid Aadhaar Card or any government ID will do.</li>
                <li>Next, a document to prove your date of birth (Birth Certificate, Passport, etc.).</li>
                <li>A recent passport size photograph of you.</li>
                <li>And finally, any house address (Electricity Bill, Ration Card, etc.).</li>
                <li>You no longer have to wait in long lines or fill complex forms.</li>
                <li>The documentation experts of our company will provide you with a step-by-step guide.</li>
                <li>If you have made some mistake or you need to reapply, you will get a quick solution.</li>
                <li>Moreover, elderly people and their families will be given special assistance by the customer support team.</li>
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



