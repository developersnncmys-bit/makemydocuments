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
  { Icon: UserPlus,   title: 'Register Online',   desc: 'Fill out the online form with your details.' },
  { Icon: FileText,   title: 'Drafting',           desc: 'Our legal team prepares a customized draft agreement.' },
  { Icon: Eye,        title: 'Review Drafting',    desc: 'Receive the draft by email within 60 minutes for approval.' },
  { Icon: CreditCard, title: 'Payment',            desc: 'Pay securely online (Rs. 50 booking + Rs. 300 drafting fee).' },
  { Icon: Package,    title: 'Doorstep Delivery',  desc: 'Get your stamped rental agreement delivered within 1–2 working days.' },
]

const REVIEWS = [
  { av: 'M', name: 'Meena S.',    svc: 'Rental Agreement',       text: '"Very convenient, and hassle-free. I received a draft within 60 minutes and the final agreement in just a day. Highly recommended!"' },
  { av: 'M', name: 'Manoj K.',    svc: 'Rental Agreement',       text: '"I was skeptical about online agreements at first, but this service exceeded my expectations. The document was accurate, legally valid, and accepted without any issues."' },
  { av: 'D', name: 'Divya R.',    svc: 'Rental Agreement',       text: '"Great customer support and a very transparent process. The agreement was delivered on time, and I didn\'t have to worry about anything. Totally stress-free experience."' },
  { av: 'R', name: 'Ravi N.',     svc: 'Rental Agreement',       text: '"The process was smooth and quick. I got my rental agreement draft within an hour and it was delivered the next day. No running around—everything was done online!"' },
  { av: 'S', name: 'Sundar P.',   svc: 'Notarized Agreement',    text: '"Needed a notarized rental agreement for my visa application. Make My Documents arranged for proper notarization and delivered it to my doorstep. No visits to notary offices, no wasted half-days. Extremely satisfied with the whole experience."' },
  { av: 'F', name: 'Fatima Khan', svc: 'Rental Agreement',       text: '"I am an NRI and my property in Bangalore needed a rent agreement for the new tenant. The team handled everything remotely — drafted, stamped, and couriered the signed agreement. Zero inconvenience despite being overseas. Wonderful service!"' },
  { av: 'G', name: 'Girish M.',   svc: 'e-Stamped Agreement',    text: '"The e-stamped rental agreement was accepted by the bank without any questions. The team made sure all clauses were properly worded. My tenant and I both received digital copies instantly. Will use Make My Documents for all my future rental needs."' },
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
  { q: 'What is the validity of a rental agreement in Bangalore?',
    a: 'Most rental agreements are made for 11 months to avoid registration charges. They can be renewed as needed.' },
  { q: 'Do I need to visit any office to get a rental agreement?',
    a: 'No. Our process is completely online. The agreement is delivered to your doorstep.' },
  { q: 'What is the value of stamp paper required?',
    a: 'The value of stamp paper depends on the rent, deposit, and property details. Commonly used values are Rs. 20, Rs. 50, or Rs. 100.' },
  { q: 'Do I need notarization for a rental agreement?',
    a: 'Notarization is not mandatory but is often recommended for added legal validity.' },
  { q: 'How long does it take to get the final agreement?',
    a: 'You will receive the draft within 60 minutes and the final stamped agreement within 1–2 working days.' },
  { q: 'Can I make changes to the agreement before it is finalized?',
    a: 'Yes, you can review the draft and request edits before the final stamping and delivery.' },
  { q: 'Is police verification mandatory for tenants in Bangalore?',
    a: 'Police verification is not mandatory but highly recommended to ensure safety and avoid legal issues.' },
  { q: 'Can I create a rental agreement for commercial properties?',
    a: 'Yes, we offer agreements for both residential and commercial properties as per your requirements.' },
  { q: 'What documents are required from the landlord and tenant?',
    a: "You'll need Aadhaar, PAN, and passport-sized photos of both parties along with property details." },
  { q: 'Can I get a soft copy of the agreement?',
    a: 'Yes, a soft copy of the agreement will be emailed to you for your records before delivery.' },
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
        <Link href="/rental-agreement-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function RentalAgreement() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Rental Agreement</div>
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
              Rental Agreement &nbsp;·&nbsp; Karnataka Only &nbsp;·&nbsp; Draft in 60 Min
            </div>
            <h1 className="svc-h1">
              Online Rental<br />
              <span className="teal">Agreement </span>
              <span className="amber">Services.</span>
            </h1>
            <p className="svc-hero-sub">
              Legally valid, professionally drafted rental agreements — delivered to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ Processing time: 1–2 working days
              </span>
            </div>
            <div className="svc-hero-acts">
              <Link href="/rental-agreement-form" className="btn-amber">Apply Now →</Link>
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
                We follow a simple, step-by-step process to make rental agreement creation stress-free:
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
              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 22, marginBottom: 16 }}>Online Rental Agreement in Bangalore</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                Renting a home or commercial property in Bangalore can be an exciting journey, but it also comes with important legal formalities. One of the most crucial steps is creating a rental agreement that clearly defines the terms and conditions between the landlord and the tenant. Without a proper agreement, disputes may arise, and both parties may face legal and financial risks.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                At Make My Documents, we simplify the entire process of preparing an online rental agreement in Bangalore. Our service ensures that you receive a legally valid, professionally drafted rental agreement without the stress of visiting government offices or lawyers. With our quick, affordable, and transparent process, you can have your rental agreement ready in just a couple of days.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>What is a Rental Agreement?</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                A rental agreement is a legally binding contract between a landlord and a tenant that outlines the terms of renting a property. It defines important aspects such as:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li>Monthly rent amount and payment schedule</li>
                <li>Security deposit details</li>
                <li>Duration of tenancy (commonly 11 months in Bangalore)</li>
                <li>Responsibilities of landlord and tenant</li>
                <li>Maintenance and utility charges</li>
                <li>Termination or renewal clauses</li>
              </ul>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                A well-drafted rental agreement protects both parties by providing clarity and preventing disputes. It also serves as valid address proof for tenants in Bangalore, which is often required for banks, schools, and other formal purposes.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Why Online Rental Agreement in Bangalore?</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Traditionally, rental agreements were made by visiting lawyers, notary offices, or government offices. This process was time-consuming and involved multiple visits, delays, and unnecessary expenses.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                With online rental agreement services, you can now complete the entire process from the comfort of your home. Here's why it's better:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Convenience:</strong> Apply online without visiting any office.</li>
                <li><strong>Speed:</strong> Draft shared within 60 minutes, agreement delivered in 1–2 working days.</li>
                <li><strong>Legal Accuracy:</strong> Drafted by experts, ensuring compliance with Karnataka laws.</li>
                <li><strong>Transparency:</strong> No hidden charges—only Rs. 50 booking fee and Rs. 300 drafting fee (plus stamp duty).</li>
                <li><strong>Doorstep Delivery:</strong> Get the finalized agreement delivered to your address.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>How Our Rental Agreement Process Works</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                At Make My Documents, we follow a simple and efficient process to ensure you get your rental agreement quickly:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li><strong>Register Online –</strong> Fill out the online form with your details.</li>
                <li><strong>Drafting –</strong> Our legal team prepares a customized draft agreement.</li>
                <li><strong>Review Draft –</strong> Receive the draft by email within 60 minutes for approval.</li>
                <li><strong>Payment –</strong> Pay securely online (Rs. 50 booking + Rs. 300 drafting fee).</li>
                <li><strong>Doorstep Delivery –</strong> Get your stamped rental agreement delivered within 1–2 working days.</li>
              </ul>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                This smooth and transparent process makes us one of the most reliable rental agreement service providers in Bangalore.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Benefits of Our Rental Agreement Service</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Choosing Make My Documents for your rental agreement in Bangalore comes with several advantages:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li>Legally valid and accurate agreements</li>
                <li>Affordable charges with no hidden costs</li>
                <li>Quick turnaround time</li>
                <li>Expert legal drafting</li>
                <li>Doorstep delivery of final document</li>
                <li>Custom clauses for rent, deposit, maintenance, pets, and more</li>
                <li>Residential and commercial rental agreements</li>
              </ul>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Whether you are a tenant moving into an apartment or a landlord renting out your property, our service ensures that both sides are legally protected.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Why Choose Us in Bangalore?</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                Bangalore is one of India's fastest-growing cities, with thousands of rental transactions happening every day. From professionals renting apartments in Whitefield and Koramangala to students looking for PGs in Jayanagar or landlords leasing commercial spaces in MG Road, the demand for quick and reliable rental agreements is constant.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                At Make My Documents, we understand the unique needs of Bangalore residents and provide fast, affordable, and legally compliant rental agreement services. Our commitment to transparency, accuracy, and customer satisfaction makes us a trusted choice for thousands of clients across the city.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Apply Now – Get Your Rental Agreement Online</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                If you are a tenant or landlord in Bangalore, don't waste time with complicated paperwork or unreliable services. With Make My Documents, your rental agreement is just a few clicks away.
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li>Quick Online Application</li>
                <li>Expert Legal Drafting</li>
                <li>Affordable Pricing</li>
                <li>Doorstep Delivery</li>
              </ul>
              <p className="ins-body-p">
                Apply today and experience the easiest way to create a rental agreement in Bangalore. Let us handle the legalities so you can enjoy a stress-free rental experience.
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



