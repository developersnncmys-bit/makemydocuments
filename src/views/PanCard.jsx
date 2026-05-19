'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import BlogCard from '../components/BlogCard'
import {
  CreditCard, Upload, ShieldCheck, Package,
  Clock, FileText, AlertCircle, CheckCircle2,
  Fingerprint, Inbox, ChevronRight
} from 'lucide-react'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* --- Data ------------------------------------------- */

const HOW_STEPS = [
  { Icon: CreditCard,  title: 'Register And Pay Online', desc: 'Choose your service and pay securely through our platform.' },
  { Icon: Upload,      title: 'Upload Documents',        desc: 'Submit your Aadhaar card and other required documents digitally.' },
  { Icon: Fingerprint, title: 'Online EKYC',             desc: 'Complete your identity verification online in minutes.' },
  { Icon: Package,     title: 'Get Delivered',           desc: 'Receive your e-PAN card within 24-48 hours and a physical card at your doorstep.' },
]

const TIMING = [
  { Icon: FileText,    label: 'New PAN Card (Physical)',               val: '15-20 working days'    },
  { Icon: AlertCircle, label: 'Correction / Lost / Damaged PAN Card',  val: '20-30 working days'    },
  { Icon: Clock,       label: 'E-PAN Card (New Applications)',         val: 'Delivered in 24-48 hrs'},
  { Icon: Inbox,       label: 'Applicant Receives',                    val: 'Both E-Pan & Physical' },
]

const REVIEWS = [
  { av: 'N', name: 'Maryam Azeez',   svc: 'PAN Card',            text: '"Trustworthy and very easy making pan at home."' },
  { av: 'R', name: 'Arun Kumar',     svc: 'PAN Card',            text: '"I had lost my PAN card and needed a replacement urgently. The team guided me step-by-step, and I received both the e-PAN and physical card without any hassle. Highly recommended!"' },
  { av: 'S', name: 'Meera N',        svc: 'PAN Card',            text: '"Very professional and secure service! I was worried about rejections, but their verification process ensured everything was correct the first time."' },
  { av: 'P', name: 'Pooja Reddy',    svc: 'New PAN Card',        text: '"Applied for a new PAN card for my business and it was done in 2 days. The team was available on WhatsApp for all my questions. Very impressed with the speed and professionalism."' },
  { av: 'T', name: 'Tarun Mehta',    svc: 'PAN Card Correction', text: '"There was a spelling mistake in my PAN card that I struggled with for months. Make My Documents sorted it out in less than a week. Very relieved — I can now use my PAN without any issues."' },
  { av: 'L', name: 'Lakshmi Iyer',   svc: 'PAN Card',            text: '"Needed a PAN card for my senior mother who is not tech-savvy. The team handled everything online and helped with her photograph and signature upload. The physical card arrived at home. Truly wonderful service."' },
  { av: 'D', name: 'Devendra Singh', svc: 'e-PAN Card',          text: '"Got my e-PAN within 24 hours. The process was completely paperless. I needed it urgently for bank KYC and they delivered it right on time. Would definitely recommend to friends and family."' },
]

const RELATED = [
  { label: 'Insurance',                   path: '/insurance'          },
  { label: 'Tourist Visa',                path: '/tourist-visa'       },
  { label: 'Police Verification',         path: '/police-verification'},
  { label: 'Police Clearance Certificate',path: '/police-clearance'   },
  { label: 'Pan Card',                    path: '/pan-card'           },
  { label: 'Affidavits / Annexure',       path: '/affidavits'         },
]

const ONLINE_STEPS = [
  { h: 'PAN Application Type Selection',  p: 'Choose "New PAN Card" if you want to create a new one or "Correction/Update PAN" to modify the existing one.' },
  { h: 'Complete the Form (49A)',          p: "Type your name, father's name, date of birth, Aadhaar, and contact details correctly to assure acceptance of the form." },
  { h: 'Submit the Documents for PAN',    p: 'Submit the electronic copies of your Aadhaar and any other required documents.' },
  { h: 'e-KYC & Payment',                 p: 'Authenticate identity through Aadhaar OTP and make the payment online.' },
  { h: 'Get your e-PAN',                  p: 'The e-PAN card will be with you 24-48 hours after successful online filing and a physical card will be delivered to you within 15-20 working days.' },
]

const LOST_STEPS = [
  { h: 'Gather Your Aadhaar & PAN Details', p: 'Have your Aadhaar card and PAN number handy (PAN copy if available).' },
  { h: 'Submit a Reprint Request',           p: "Choose the 'Reprint/Replacement' option while filling the PAN form online." },
  { h: 'Verify Identity',                   p: 'Complete OTP-based Aadhaar e-KYC for instant verification.' },
  { h: 'Pay the Replacement Fee',           p: 'A small fee is charged for reissuing your PAN card.' },
]

const FAQS = [
  { q: "What is a PAN card and why is it important?",
    a: "A PAN (Permanent Account Number) card is a government-issued ID required for filing taxes, opening bank accounts, and conducting high-value financial transactions in India." },
  { q: "Can I apply for a PAN card online without visiting an office?",
    a: "Yes! With Aadhaar-based e-KYC, the entire process is 100% online. You can apply, verify, and receive your PAN card without visiting any office." },
  { q: "How long does it take to get a PAN card?",
    a: "e-PAN: Delivered via email within 24-48 hours (for new applications). Physical PAN Card: Delivered within 15-20 working days." },
  { q: "What if I have lost my PAN card?",
    a: "You can easily request a duplicate or reprint. Just submit Aadhaar details and your PAN number, and you'll receive a replacement card." },
  { q: "Is Aadhaar mandatory for PAN card applications?",
    a: "Yes, Aadhaar is mandatory for identity verification and linking PAN." },
  { q: "How much does it cost to apply for a PAN card online?",
    a: "We charge ₹350 for new, correction, or lost card applications. A cancellation fee of ₹50 applies if you cancel after payment." },
  { q: "Can I update my name or address on the PAN card?",
    a: "Yes! You can apply for PAN card correction to update your name, DOB, photo, or signature online." },
  { q: "Can NRI or foreign citizens apply for a PAN card through this service?",
    a: "Yes, NRIs and foreign citizens can apply, but additional documents may be required, such as passport copies or overseas address proof." },
  { q: "Is e-PAN a valid document?",
    a: "Yes, e-PAN is fully valid and can be used anywhere like a physical PAN card." },
  { q: "Can I link my PAN with Aadhaar through this service?",
    a: "Yes, we assist with Aadhaar-PAN linking during the application process for hassle-free transactions." },
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
        <p className="pan-apply-sub">It takes less than 2 minutes to apply online</p>
      </div>
      <div className="pan-apply-body">
        <Link href="/pan-card-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function PanCard() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / PAN Card</div>
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
              PAN Card Services &nbsp;·&nbsp; 99% On-Time
            </div>
            <h1 className="svc-h1">
              PAN Card<br />
              <span className="teal">Services </span>
              <span className="amber">Made Easy.</span>
            </h1>
            <p className="svc-hero-sub">
              New application, correction, or lost card — we handle everything online. Fast, secure, doorstep delivery.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ 15-20 days (New Physical Pan Card)
              </span>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ 20-30 days (Lost/Correction)
              </span>
            </div>
            <div className="svc-hero-acts">
              <Link href="/pan-card-form" className="btn-amber">Apply Now →</Link>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '99%',  lbl: 'Delivered on Time' },
              { val: '₹350', lbl: 'Application Fee'   },
              { val: '48hrs',lbl: 'e-PAN Delivery'    },
              { val: '4.8★', lbl: 'Google Rating'     },
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

      {/* -- How It Works + Form -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>
              <div className="eyebrow">Simple Process</div>
              <h2>How It Works</h2>
              <p className="sec-desc" style={{ marginBottom: 32 }}>
                We follow a simple, step-by-step process to make PAN card applications stress-free:
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
            <ApplyForm />
          </div>
        </div>
      </section>

      {/* -- Documents Required -- */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow">What You Need</div>
            <h2>Documents Required</h2>
          </div>

          {/* Top two cards */}
          <div className="pan-docs-top-grid">
            {/* New PAN */}
            <div className="pan-doc-v2">
              <div className="pan-doc-v2-header pan-doc-v2-teal">
                <div className="pan-doc-v2-ico"><I icon={FileText} size={18} color="var(--teal)" /></div>
                <h3>New Pan Card</h3>
              </div>
              <ul className="pan-doc-v2-list">
                <li><I icon={CheckCircle2} size={14} color="var(--teal)" /> Aadhar Card</li>
                <li><I icon={CheckCircle2} size={14} color="var(--teal)" /> DOB Proof</li>
              </ul>
            </div>

            {/* Correction / Lost */}
            <div className="pan-doc-v2">
              <div className="pan-doc-v2-header pan-doc-v2-amber">
                <div className="pan-doc-v2-ico" style={{ background: 'var(--amber-bg)', borderColor: 'var(--amber-bd)' }}><I icon={AlertCircle} size={18} color="var(--amber)" /></div>
                <h3>Correction / Lost / Damage</h3>
              </div>
              <ul className="pan-doc-v2-list">
                <li><I icon={CheckCircle2} size={14} color="var(--amber)" /> Aadhar Card</li>
                <li><I icon={CheckCircle2} size={14} color="var(--amber)" /> Existing Pan copy</li>
                <li><I icon={CheckCircle2} size={14} color="var(--amber)" /> DOB Proof</li>
              </ul>
            </div>
          </div>

          {/* Proof of Birth - full width */}
          <div className="pan-doc-v2 pan-doc-v2-wide">
            <div className="pan-doc-v2-header pan-doc-v2-green">
              <div className="pan-doc-v2-ico" style={{ background: 'var(--green-bg)', borderColor: 'var(--green-bd)' }}><I icon={CheckCircle2} size={18} color="var(--green)" /></div>
              <h3>Accepted Proof of Birth — provide one of the following</h3>
            </div>
            <div className="pan-doc-v2-grid">
              {['Birth Certificate issued by Municipality', 'Passport', 'Driving License', 'Voter ID', 'Government-issued Photo ID', 'Pension Payment Order', 'Marriage Certificate', 'Matriculation Certificate', 'Domicile Certificate', 'Affidavit stating date of birth'].map(d => (
                <div key={d} className="pan-doc-v2-item">
                  <I icon={CheckCircle2} size={14} color="var(--green)" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- Time Duration + Charges -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow">Timelines & Pricing</div>
            <h2>Time Duration & Charges</h2>
          </div>
          <div className="ins-why-grid pan-timing-grid">
            {TIMING.map(({ Icon, label, val }) => (
              <div key={label} className="ins-why-card" style={{ '--w-color': 'var(--teal)' }}>
                <div className="ins-why-icon" style={{ background: 'var(--teal-bg)', border: '1.5px solid var(--teal-bd)' }}>
                  <I icon={Icon} size={20} color="var(--teal)" />
                </div>
                <h3 className="ins-why-title">{label}</h3>
                <p className="ins-why-desc" style={{ fontWeight: 700, color: 'var(--teal)', fontSize: 15 }}>{val}</p>
              </div>
            ))}
          </div>
          <div className="ins-callout-box" style={{ marginTop: 32 }}>
            <p className="ins-body-p" style={{ marginBottom: 8 }}>
              <strong style={{ color: 'var(--amber)' }}>Rs. 350/-</strong> For Application
            </p>
            <p className="ins-body-p">
              If you decide to cancel your order after payment, please note that a cancellation fee of Rs. 50 will apply.
            </p>
          </div>
        </div>
      </section>

      {/* -- Reviews -- */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow">Client Reviews</div>
            <h2>Our Client Reviews</h2>
          </div>
          <ReviewSlider reviews={REVIEWS} />
        </div>
      </section>

      {/* -- Related Services -- */}
      <section className="ins-section-white">
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
      <section className="ins-section-surf">
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

      {/* -- Long-form content + Form -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>
              {/* About section */}
              <div className="eyebrow">About Our Service</div>
              <h2>Apply For PAN Card Services – Make My Documents</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                Are you in need of a quick and efficient method to acquire your PAN card without the usual long waits and tons of paperwork? We at Make My Documents take the hassle out of the complete process of PAN card application, correction, and replacement. New PAN card, updating inaccurate details, or PAN card loss, our team is committed to providing you with a quick, hassle-free, and low-cost solution.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                We do the hard work so that you can apply for a PAN card online without any inconvenience. Our method, which is safe and sound, along with the professional verification and delivery at your doorstep, ensures that you will never encounter rejections or delays.
              </p>

              {/* Processing Time */}
              <h2 className="pan-content-h2">Processing Time</h2>
              <ul className="pan-bullet-list" style={{ marginBottom: 12 }}>
                <li><strong>New PAN Card (Physical):</strong> 15-20 working days</li>
                <li><strong>Correction / Lost / Damaged PAN Card:</strong> 20-30 working days</li>
                <li><strong>E-PAN Card (New Applications):</strong> Delivered in 24-48 hours</li>
              </ul>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                All applicants will receive both e-PAN and physical PAN card for convenience.
              </p>

              {/* Documents Required (detailed) */}
              <h2 className="pan-content-h2">Documents Required for New PAN Application</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                It requires minimal documents to get a new PAN card online. PAN (Permanent Account Number) is a must for tax filing, bank account opening, and financial transactions in India. So:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Aadhaar Card (must)</strong> – Your Aadhaar number is taken as the identification and linking will be done.</li>
                <li><strong>Passport-size Photograph</strong> – A recent, clear photo (as per the government's standards).</li>
                <li><strong>Proof of Date of Birth</strong> – Aadhaar, birth certificate, or passport.</li>
                <li><strong>Mobile Number Linked to Aadhaar</strong> – Needed for OTP-based e-KYC verification.</li>
                <li><strong>Valid Email Address</strong> – For e-PAN delivery and other communication.</li>
                <li><strong>e-KYC</strong> – Aadhaar-based e-KYC removes the need for physical paperwork and signatures.</li>
              </ul>

              {/* Online PAN Steps */}
              <h2 className="pan-content-h2">Online PAN Application – Steps for Filling</h2>
              <p className="ins-body-p" style={{ marginBottom: 20 }}>
                Filing for a PAN card online is a fully digital procedure, which is why it is more efficient and convenient than going to the government offices. A guide to the procedure in brief:
              </p>
              <div className="sol-steps" style={{ marginBottom: 40 }}>
                {ONLINE_STEPS.map(({ h, p }, i) => (
                  <div key={i} className="sol-step">
                    <div className="sol-connector" />
                    <div className="sol-n" style={{ fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
                    <div>
                      <h4>{h}</h4>
                      <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.65, marginTop: 4 }}>{p}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lost/Damaged */}
              <h2 className="pan-content-h2">How to Reapply for a Lost or Damaged PAN Card</h2>
              <p className="ins-body-p" style={{ marginBottom: 20 }}>
                Losing your PAN card can be stressful, but you don't need to worry — applying for a replacement is quick and easy. Follow these steps:
              </p>
              <div className="sol-steps" style={{ marginBottom: 16 }}>
                {LOST_STEPS.map(({ h, p }, i) => (
                  <div key={i} className="sol-step">
                    <div className="sol-connector" />
                    <div className="sol-n" style={{ fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
                    <div>
                      <h4>{h}</h4>
                      <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.65, marginTop: 4 }}>{p}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Receive Your e-PAN and Physical Card</h4>
              <ul className="pan-bullet-list">
                <li>e-PAN: Delivered via email in 24-48 hours.</li>
                <li>Physical PAN Card: Delivered to your registered address in 20-30 working days.</li>
              </ul>
            </div>

            <ApplyForm />
          </div>
        </div>
      </section>

      {/* -- FAQs -- */}
      <section className="ins-section-surf">
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



