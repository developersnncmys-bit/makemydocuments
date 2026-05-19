'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import {
  UserPlus, Upload, CreditCard, Package,
  ChevronRight, FileText, CheckCircle2,
} from 'lucide-react'
import BlogCard from '../components/BlogCard'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* --- Data ------------------------------------------- */

const HOW_STEPS = [
  { Icon: UserPlus,  title: 'Register Online',   desc: '' },
  { Icon: Upload,    title: 'Upload Documents',   desc: '' },
  { Icon: CreditCard,title: 'Payment',            desc: '' },
  { Icon: Package,   title: 'Get Delivered',      desc: '' },
]

const REVIEWS = [
  { av: 'S', name: 'Shalini Verma',  svc: 'MSME Registration',         text: '"A great service for entrepreneurs. I saved time and effort thanks to their support."' },
  { av: 'V', name: 'Vikram Singh',   svc: 'MSME Registration',         text: '"They simplified the entire process. I had my certificate in less than an hour."' },
  { av: 'P', name: 'Pooja Sharma',   svc: 'MSME Registration',         text: '"Efficient and trustworthy. Perfect for small businesses like mine!"' },
  { av: 'R', name: 'Rajendra Patil', svc: 'Udyam Registration',        text: '"I had been postponing my MSME registration for months because I thought it would be complicated. Make My Documents made it incredibly easy — filled the form, submitted documents online, and got my Udyam certificate the same day. My bank loan application is now in process!"' },
  { av: 'A', name: 'Archana Bhat',   svc: 'MSME / Udyam Certificate',  text: '"Running a home bakery, I always thought government registrations were only for big companies. The team explained all the benefits and completed my MSME registration without any charges beyond the service fee. Very helpful and knowledgeable staff."' },
  { av: 'N', name: 'Naveen Kumar',   svc: 'MSME Registration',         text: '"Needed the MSME certificate for a tender application. Got it issued within hours of submitting my documents. The team even helped me understand how to use it for priority lending. Outstanding service!"' },
  { av: 'M', name: 'Manisha Goyal',  svc: 'Udyam Registration',        text: '"Registered my small textile business with their help and the process took less than 30 minutes. Now I get all the government scheme benefits. I wish I had done this earlier. Highly recommended for all small business owners."' },
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
  { q: 'What is MSME Registration?',
    a: 'It is the process of officially recognizing a business as a micro, small, or medium enterprise.' },
  { q: 'Is Udyam Registration different from MSME Registration?',
    a: 'No, they are the same; Udyam is the updated name for MSME registration.' },
  { q: 'Is Aadhaar mandatory for MSME Registration?',
    a: 'Yes, Aadhaar is compulsory for verification of the business owner or directors.' },
  { q: 'How much does MSME Registration cost?',
    a: 'The registration is free of cost on the government portal.' },
  { q: 'How long does it take to get the MSME Certificate?',
    a: 'It is issued instantly once you submit the required details.' },
  { q: 'Can a startup register under MSME?',
    a: 'Yes, startups that meet investment and turnover limits can apply.' },
  { q: 'Do I need to renew my MSME Registration?',
    a: 'No, MSME Registration has lifetime validity and requires no renewal.' },
  { q: 'Is GST mandatory for MSME Registration?',
    a: 'GSTIN is required only if your business is already registered under GST.' },
  { q: 'What benefits do MSMEs get from banks?',
    a: 'Banks provide priority sector lending, collateral-free loans, and lower interest rates.' },
  { q: 'Can a company outside India apply?',
    a: 'No, only businesses operating in India can register under MSME.' },
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
        <Link href="/msme-registration-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function MsmeRegistration() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / MSME Registration</div>
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
              MSME Registration &nbsp;·&nbsp; Udyam Registration &nbsp;·&nbsp; 99% On-Time
            </div>
            <h1 className="svc-h1">
              MSME Registration<br />
              <span className="teal">(Udyam </span>
              <span className="amber">Registration)</span>
            </h1>
            <p className="svc-hero-sub">
              Get your MSME / Udyam certificate online — fast, simple, and delivered digitally.
            </p>
            <div className="svc-hero-acts">
              <Link href="/msme-registration-form" className="btn-amber">Apply Now →</Link>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '99%',     lbl: 'Delivered on Time'  },
              { val: 'Free',    lbl: 'Govt. Registration'  },
              { val: 'Instant', lbl: 'Certificate Issued'  },
              { val: '4.8★',    lbl: 'Google Rating'       },
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
              <h2>Documents Required For MSME Registration</h2>
              <div className="pan-doc-v2" style={{ marginTop: 20, marginBottom: 36 }}>
                <div className="pan-doc-v2-header pan-doc-v2-teal">
                  <div className="pan-doc-v2-ico"><I icon={FileText} size={18} color="var(--teal)" /></div>
                  <h3>Documents Required For MSME Registration</h3>
                </div>
                <ul className="pan-doc-v2-list">
                  {['Aadhar Card', 'Pan Card'].map(d => (
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
                <strong style={{ color: 'var(--amber)' }}>Rs. 500/-</strong> For Application
              </li>
              <li>
                Rs 99 as booking/consulting charge. Need to pay while submitting online form.
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

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 22, marginBottom: 16 }}>MSME Registration – An Overview</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                Micro, Small, and Medium Enterprises (MSMEs) are the foundation of the Indian economy, which is largely influenced by the changes that arise from the innovative ideas, new jobs and business growth. The Government of India has implemented MSME registration in order to give these businesses proper recognition and open up benefits that will allow them to grow faster.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Udyam Registration (MSME registration) is a convenient way of registering a business online which involves issuing a unique identification number and a certificate of recognition for the enterprise. With this, credits, subsidies, and other government assistance become easily available to the enterprises without going through a lot of cumbersome paperwork.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>What is MSME Udyam Registration?</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                Micro Small and Medium Enterprises (MSME) Udyam Registration is a legal step taken by the government that classifies your enterprise into one of three categories: micro, small, or medium. A distinctive Udyam Registration Number (URN) and an e-certificate are generated for your firm upon successful registration.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Such a registration is an easy way to avail various plans, monetary aids, and grants, which, in turn, means that the business people can give more time to their expansion rather than taking care of the routine legal procedures.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>What is the Validity of Police Clearance Certificate?</h2>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Generally, a Police Clearance Certificate is valid for half a year starting from the day it was issued. Depending on the condition of your employer or the embassy, the PCC may be required within a certain period, in which case the validity may be shorter than six months. If for your job application or obtaining a new visa you need to submit the PCC and yours is already expired, then it is advisable to get a new one.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Benefits of MSME Online Registration</h2>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Government Schemes Accessibility:</strong> Take advantage of subsidies, tax incentives, and assistance programs.</li>
                <li><strong>Top Bank Loan Priority:</strong> Receive convenient loans with attractive interest rates and no security.</li>
                <li><strong>Business Comfort:</strong> Government portal facilitates simplified tender applications and purchase.</li>
                <li><strong>Saving on Expenses:</strong> Reduction in the cost of trademark, patent, and ISO certification.</li>
                <li><strong>Delayed Payments Protection:</strong> The legal protection that ensures that the buyers make their payments on time.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Entities Eligible to Register MSME Online</h2>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Proprietorship Firms:</strong> Small businesses that are operated by an individual can get registered without any hassles.</li>
                <li><strong>Partnership Firms:</strong> The businesses that are in the ownership of partners can register as a group.</li>
                <li><strong>LLPs &amp; Companies:</strong> MSME benefits are open to private or public companies of any type, including LLPs.</li>
                <li><strong>Self-Help Groups &amp; Societies:</strong> Groups or non-profits that are involved in commerce can file their applications.</li>
                <li><strong>Startups:</strong> The new businesses that are looking for growth and funding support can get their registration done.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>MSME Classification</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Your business is classified into Micro, Small, or Medium based on investment and annual turnover:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Micro:</strong> Investment up to ₹2.5 crore &amp; Turnover up to ₹10 crore.</li>
                <li><strong>Small:</strong> Investment up to ₹25 crore &amp; Turnover up to ₹100 crore.</li>
                <li><strong>Medium:</strong> Investment up to ₹125 crore &amp; Turnover up to ₹500 crore.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>How to Apply for MSME Registration with Make My Documents</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                Udyam MSME Registration process is so simplified that it is completed effectively in four easy steps:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Register Online:</strong> Enter the information about your company and the owner securely through our platform.</li>
                <li><strong>Upload Documents:</strong> For the purpose of identification, submit the scanned copies of your Aadhaar Card and PAN Card.</li>
                <li><strong>Make Payment:</strong> Pay a small amount online using the quick payment facility to get your application processed.</li>
                <li><strong>Get Delivered:</strong> Through WhatsApp or Email, get your MSME Certificate digitally sent to you within 1–2 working days.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Documents Required for MSME Registration</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>Keep these documents ready before applying:</p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Aadhaar Card</strong> of the business owner</li>
                <li><strong>PAN Card</strong> of the business or proprietor</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Features of MSME Registration</h2>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>Lifetime Validity:</strong> The user does not have to renew the registration and it is sufficient with a single registration.</li>
                <li><strong>Digital Certificate:</strong> Get your MSME certificate on the spot online.</li>
                <li><strong>Self-Declaration Based:</strong> Limited paperwork and straightforward verification.</li>
                <li><strong>All-India Recognition:</strong> It is legal and can be used for business purposes anywhere in India.</li>
                <li><strong>Not the least, there is no registration fee:</strong> It is a free government registered process</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Why Opt for MSME Udyam Registration for Your Business?</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                If a business wants to be credible and find the chance to grow, then MSME Udyam Registration is just necessary. By this, it becomes easier to get money, attracting the trust of investors, and also giving small businesses the possibility to have an edge over their competitors in government tenders.
              </p>
              <p className="ins-body-p">
                Why not get your MSME status right away? With zero registration fee and on-the-spot processing, it is just hard to say no to the fantastic opportunities that await you once you have your MSME status.
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



