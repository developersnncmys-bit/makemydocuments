'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import {
  UserPlus, FileText, Eye, CreditCard, Package, ChevronRight,
  MapPin, Clock, ScrollText,
} from 'lucide-react'
import BlogCard from '../components/BlogCard'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* --- Data ------------------------------------------- */

const HOW_STEPS = [
  { Icon: UserPlus,   title: 'Register Online',   desc: 'Submit your details using our simple online form.' },
  { Icon: FileText,   title: 'Drafting',           desc: 'Our experts prepare a lease agreement based on your inputs.' },
  { Icon: Eye,        title: 'Review Drafting',    desc: 'You will receive the draft in your email within 60 minutes for review.' },
  { Icon: CreditCard, title: 'Payment',            desc: 'Pay the nominal service fee (Rs. 50 booking + Rs. 300 drafting fee; extra for stamp paper).' },
  { Icon: Package,    title: 'Doorstep Delivery',  desc: 'The finalized stamped lease agreement will be delivered to your home or office within 1–2 working days.' },
]

const REVIEWS = [
  { av: 'A', name: 'Ananya S.',   svc: 'Lease Agreement',            text: '"The entire process was seamless. My lease agreement was drafted in less than an hour and delivered quickly. Truly professional and efficient service."' },
  { av: 'R', name: 'Rohan M.',    svc: 'Lease Agreement',            text: '"I really liked how simple the online process was. From drafting to final delivery, everything was clear and straightforward. Highly satisfied with the experience."' },
  { av: 'K', name: 'Kavita D.',   svc: 'Lease Agreement',            text: '"The team was very supportive and guided me through each step. My lease agreement was accurate, legally valid, and delivered right on time."' },
  { av: 'S', name: 'Siddharth V.', svc: 'Commercial Lease Agreement', text: '"We needed a lease agreement for our new office space and Make My Documents drafted a comprehensive document covering all our requirements. The legal team was responsive and incorporated our custom clauses without issues. Highly professional service."' },
  { av: 'P', name: 'Preetha R.',  svc: '11-Month Lease Agreement',   text: '"Got an 11-month lease agreement done in record time. The draft was ready within an hour and the stamped copy was delivered the next morning. Our landlord was happy with the document quality and we moved in without any delays."' },
  { av: 'B', name: 'Balaji S.',   svc: 'Lease Agreement Renewal',    text: '"Our previous lease was expiring and we needed a renewal agreement quickly. The team drafted a new agreement within the same day and courier-delivered it. Very reasonable pricing for such fast and reliable service. Strongly recommended!"' },
  { av: 'H', name: 'Heena Patel', svc: 'Lease Agreement',            text: '"I was renting out my flat for the first time and was not sure what clauses to include. The Make My Documents team advised me on all the important protections and drafted a watertight lease agreement. Very knowledgeable and helpful staff."' },
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
  { q: 'What is the difference between a rental and lease agreement?',
    a: 'A rental agreement is usually short-term (11 months), while a lease agreement is long-term (1 year or more) and often requires registration.' },
  { q: 'Do I need to visit an office to get my lease agreement?',
    a: 'No. Our service is 100% online, and your finalized agreement will be delivered to your doorstep.' },
  { q: 'What is the value of stamp paper for a lease agreement in Karnataka?',
    a: 'The value varies based on rent, deposit, and duration. We guide you on the exact requirement.' },
  { q: 'Is notarization mandatory for lease agreements?',
    a: 'Notarization is not mandatory but is recommended to add extra legal validity.' },
  { q: 'How long is a lease agreement valid?',
    a: 'Lease agreements are generally valid for 12 months or longer, depending on the terms agreed between landlord and tenant.' },
  { q: 'Who keeps the original lease agreement?',
    a: 'Both landlord and tenant should keep a signed copy of the lease agreement for legal reference.' },
  { q: 'Can I make changes to the lease agreement after signing?',
    a: 'Yes, changes can be made through an addendum or mutual agreement signed by both parties.' },
  { q: 'Do lease agreements need to be registered?',
    a: 'Yes, lease agreements for 12 months or more are legally required to be registered with the local sub-registrar.' },
  { q: 'What happens if either party breaks the lease early?',
    a: 'Breaking a lease early usually requires notice and may involve a penalty or forfeiture of the deposit, depending on the terms.' },
  { q: 'Are digital signatures valid for lease agreements?',
    a: 'Yes, digital signatures are legally valid and accepted for most online lease agreements in India.' },
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
    <div className="pan-apply-card pan-apply-sticky">
      <div className="pan-apply-head">
        <h3 className="pan-apply-title">Apply in 2 Minutes</h3>
        <p className="pan-apply-sub">It takes less than 2 minutes to Apply</p>
      </div>
      <div className="pan-apply-body">
        <Link href="/lease-agreement-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function LeaseAgreement() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Lease Agreement</div>
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
              Lease Agreement &nbsp;·&nbsp; Karnataka Only &nbsp;·&nbsp; Draft in 60 Min
            </div>
            <h1 className="svc-h1">
              Online Lease<br />
              <span className="teal">Agreement </span>
              <span className="amber">Services.</span>
            </h1>
            <p className="svc-hero-sub">
              Legally valid, professionally drafted lease agreements — delivered to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ Processing time: 1–2 working days
              </span>
            </div>
            <div className="svc-hero-acts">
              <Link href="/lease-agreement-form" className="btn-amber">Apply Now →</Link>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '99%',   lbl: 'Delivered on Time'  },
              { val: '60min', lbl: 'Draft Delivery'      },
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

      {/* -- What We Do + How It Works + Apply Form -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>
              {/* What We Do */}
              <div className="eyebrow">About Our Service</div>
              <h2>What We Do!</h2>
              <div className="ins-why-grid" style={{ marginBottom: 36 }}>
                <div className="ins-why-card" style={{ '--w-color': 'var(--teal)' }}>
                  <div className="ins-why-icon" style={{ background: 'var(--teal-bg)', border: '1.5px solid var(--teal-bd)' }}>
                    <I icon={ScrollText} size={22} color="var(--teal)" />
                  </div>
                  <h3 className="ins-why-title">Online Agreements</h3>
                  <p className="ins-why-desc">Make My Documents Online Agreements Service — legally valid and professionally drafted.</p>
                </div>
                <div className="ins-why-card" style={{ '--w-color': 'var(--amber)' }}>
                  <div className="ins-why-icon" style={{ background: 'var(--amber-bg)', border: '1.5px solid var(--amber-bd)' }}>
                    <I icon={MapPin} size={22} color="var(--amber)" />
                  </div>
                  <h3 className="ins-why-title">Karnataka Only</h3>
                  <p className="ins-why-desc">Service is currently available exclusively for properties located in Karnataka.</p>
                </div>
                <div className="ins-why-card" style={{ '--w-color': 'var(--green)' }}>
                  <div className="ins-why-icon" style={{ background: 'var(--green-bg)', border: '1.5px solid var(--green-bd)' }}>
                    <I icon={Clock} size={22} color="var(--green)" />
                  </div>
                  <h3 className="ins-why-title">Draft in 60 Min</h3>
                  <p className="ins-why-desc">Draft will be shared to your mail id within 60 minutes of submitting your form.</p>
                </div>
              </div>

              {/* How It Works */}
              <div className="eyebrow">Simple Process</div>
              <h2>How It Works</h2>
              <p className="sec-desc" style={{ marginBottom: 32 }}>
                Our lease agreement process is straightforward and designed to save you time:
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

      {/* -- Charges -- */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="eyebrow">Pricing</div>
          <h2>Charges</h2>
          <div className="ins-callout-box" style={{ maxWidth: 720, marginTop: 20 }}>
            <ul className="pan-bullet-list" style={{ marginBottom: 8 }}>
              <li>
                <strong style={{ color: 'var(--amber)' }}>Rs. 300/-</strong> For Application
              </li>
              <li>
                <strong style={{ color: 'var(--amber)' }}>Rs. 50/-</strong> as booking/consulting charge. Need to pay while submitting online form.{' '}
                <span style={{ color: 'var(--ink3)' }}>Note: Additional charges for stamp paper</span>
              </li>
            </ul>
            <p className="ins-body-p" style={{ marginBottom: 0, marginTop: 8, fontSize: 13.5 }}>
              We keep our pricing transparent, ensuring you know exactly what you are paying for.
            </p>
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
              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 22, marginBottom: 16 }}>Online Lease Agreement Services in Bangalore</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                When it comes to renting or leasing a property, one of the most important steps is securing a legally valid lease agreement. A well-drafted lease agreement ensures that both the landlord and the tenant have clear terms and conditions, reducing the chances of disputes in the future. At Make My Documents, we specialize in providing online lease agreement services in Karnataka, designed to make the process simple, quick, and completely hassle-free.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Our aim is to give you peace of mind by offering a smooth experience from start to finish—right from applying online to receiving your finalized lease agreement at your doorstep.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>What is a Lease Agreement?</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                A lease agreement is a legal contract between a landlord and a tenant that allows the tenant to use the property for a specified period in exchange for rent. Unlike a short-term rental agreement, lease agreements are usually longer in duration (often one year or more) and may require registration depending on the state's legal requirements.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>A lease agreement typically includes:</p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li>Rent amount and due date</li>
                <li>Security deposit terms</li>
                <li>Duration of lease (usually 12 months or longer)</li>
                <li>Responsibilities of landlord and tenant</li>
                <li>Maintenance and repair conditions</li>
                <li>Renewal and termination clauses</li>
              </ul>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Having a lease agreement in place provides legal protection, transparency, and peace of mind for both parties.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>What We Do</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                At Make My Documents, we provide a wide range of online lease agreement services to suit your needs, including:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li><strong>New Lease Agreements –</strong> For tenants and landlords starting a fresh contract.</li>
                <li><strong>Lease Agreement Renewals –</strong> Extending your existing agreement with updated terms.</li>
                <li><strong>Lease Amendments –</strong> Making changes to an ongoing lease contract.</li>
                <li><strong>Customized Lease Agreements –</strong> Adding specific clauses tailored to your requirements.</li>
                <li><strong>Notarized Lease Agreements –</strong> Strengthening the legal validity of your document.</li>
                <li><strong>Guidance on Stamp Duty –</strong> Helping you determine the correct value of stamp paper required.</li>
              </ul>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                With us, you can be sure that every agreement is prepared by experienced legal professionals who ensure compliance with Karnataka's legal standards.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>How It Works</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Our lease agreement process is straightforward and designed to save you time:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li><strong>Register Online –</strong> Submit your details using our simple online form.</li>
                <li><strong>Drafting –</strong> Our experts prepare a lease agreement based on your inputs.</li>
                <li><strong>Review Draft –</strong> You will receive the draft in your email within 60 minutes for review.</li>
                <li><strong>Payment –</strong> Pay the nominal service fee (Rs. 50 booking + Rs. 300 drafting fee; extra for stamp paper).</li>
                <li><strong>Doorstep Delivery –</strong> The finalized stamped lease agreement will be delivered to your home or office within 1–2 working days.</li>
              </ul>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                This online process ensures a fast, secure, and hassle-free experience.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Charges</h2>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li>Drafting Fee: Rs. 300</li>
                <li>Booking/Consulting Fee: Rs. 50 (payable while submitting the form)</li>
                <li>Stamp Paper Charges: Additional, based on property details and lease duration</li>
              </ul>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                We keep our pricing transparent, ensuring you know exactly what you are paying for.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Benefits of Our Lease Agreement Service</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                When you choose Make My Documents, you get more than just a document—you get a complete service designed around your convenience.
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li>Legally Valid Documents prepared by legal experts</li>
                <li>Quick Drafting – draft delivered within 60 minutes</li>
                <li>Fast Processing – final document within 1–2 days</li>
                <li>Affordable Pricing without hidden costs</li>
                <li>Doorstep Delivery of stamped agreements</li>
                <li>Customized Clauses to suit your unique needs</li>
                <li>Complete Guidance on stamp duty and notarization</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Why Choose to Make My Documents?</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                In a busy city like Bangalore and across Karnataka, tenants and landlords want fast, reliable, and affordable solutions for legal paperwork. That's exactly what we deliver. With our expertise, customer-first approach, and transparent pricing, we have become a trusted name in online lease agreement services.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Whether you are leasing a house, apartment, office, or commercial property, we make sure your agreement is legally sound and delivered to you without stress. Our step-by-step support ensures that you are guided through the entire process with ease.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Apply Now – Get Your Lease Agreement Online</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Don't let paperwork slow down your property rental process. With Make My Documents, you can secure your lease agreement online in Karnataka quickly, affordably, and without hassle.
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li>Easy Online Registration</li>
                <li>Expert Legal Drafting</li>
                <li>Fast Turnaround</li>
                <li>Affordable Pricing</li>
                <li>Doorstep Delivery</li>
              </ul>
              <p className="ins-body-p">
                Start your application today and experience the most convenient way to prepare your lease agreement. Let us handle the legalities so you can focus on what matters most.
              </p>
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



