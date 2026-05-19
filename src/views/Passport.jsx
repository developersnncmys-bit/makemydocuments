'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, Upload, ShieldCheck, CreditCard, CalendarCheck,
  MapPin, Shield, Package, ChevronRight, FileText, AlertCircle, CheckCircle2,
} from 'lucide-react'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* --- Data ------------------------------------------- */

const HOW_STEPS = [
  { Icon: UserPlus,      title: 'Register Online',        desc: 'Fill all the basic details in the application on our secure portal.' },
  { Icon: Upload,        title: 'Upload Documents',        desc: 'Submit the required documents via WhatsApp or email.' },
  { Icon: ShieldCheck,   title: 'Documents Verification',  desc: 'Our experts review your documents for accuracy and compliance.' },
  { Icon: CreditCard,    title: 'Payment',                 desc: 'Make a secure online payment to proceed with the application service.' },
  { Icon: CalendarCheck, title: 'Get Appointment',         desc: 'We schedule your Passport Seva Kendra (PSK) appointment as per your preferred date and time.' },
  { Icon: MapPin,        title: 'Visit PSK',               desc: 'Visit the designated PSK center with your original documents for biometric and verification.' },
  { Icon: Shield,        title: 'Police Verification',     desc: 'The local police department conducts a verification at your provided address.' },
  { Icon: Package,       title: 'Get Delivered',           desc: 'Once approved, your passport is printed and delivered to your doorstep.' },
]

const REVIEWS = [
  { av: 'C', name: 'Charlspinto Pinto', svc: 'Passport', text: '"Sunitha from Make.My.Document is professional, very helpful, and has excellent communication. She made my passport process easy and hassle-free."' },
  { av: 'R', name: 'Rekha Naveen',      svc: 'Passport', text: '"Very nice service! Understands the needs and provides quick resolution!! Thank you for helping us renew our passport in a day through tatkal"' },
  { av: 'K', name: 'kumar harish',      svc: 'Passport', text: '"helped me to get the passport I would like to strongly recommend to the make my documents, thank you so much make my documents team"' },
  { av: 'S', name: 'Suresh Babu',       svc: 'Fresh Passport', text: '"Applied for my first passport through Make My Documents and the entire experience was outstanding. They guided me on every document required and booked my PSK appointment within 2 days. Got my passport delivered at home. Absolutely five stars!"' },
  { av: 'N', name: 'Nandini Pillai',    svc: 'Passport Renewal', text: '"My passport had expired and I was in a rush for an upcoming trip. The team arranged a Tatkal appointment almost immediately and kept me updated throughout. Received my renewed passport well before my travel date. Exceptional service!"' },
  { av: 'V', name: 'Vijay Krishnan',    svc: 'Passport', text: '"I had a doubt about address mismatch in my documents. The team patiently explained what additional documents I needed and ensured everything was in order before submitting. No rejection, no delay — just a smooth process from start to finish."' },
  { av: 'A', name: 'Archana Desai',     svc: 'Minor Passport', text: '"Getting a passport for my child seemed complicated but Make My Documents made it very simple. They told us exactly what forms and photos to prepare, booked the appointment, and my daughter\'s passport arrived in under 3 weeks. Highly trustworthy team."' },
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
  { q: 'Who qualifies for an Indian passport?',
    a: 'You can qualify for Indian citizenship by being born in the country, being born elsewhere but with at least one Indian parent, or by being granted citizenship through a naturalization process. If none of these categories apply you will not be classed as an Indian citizen, and will not be entitled to an Indian passport.' },
  { q: 'What is Ordinary, Diplomatic or Official Passport?',
    a: 'All private citizens apply for an ordinary passport however the other two types of passports are for government workers who are being send overseas on official business only.' },
  { q: 'What is validity of passport?',
    a: '05 years for minor 10 years for adults' },
  { q: 'What is the different between normal and tatkal application?',
    a: 'In normal application you will receive your passport within 10 to 15 working days\nIn tatkal application you will receive your passport within 2 to 5 working days' },
  { q: 'Within how many days will I get the appointment?',
    a: "Its depends on the demand in market, our executive will give 3 to 4 days' options you can book according to your calendar." },
  { q: 'Is that possible to get the appointment in weekends?',
    a: 'No appointments are booked only in weekdays.' },
  { q: 'What happens if I missed the passport appointment?',
    a: 'If you missed your 1st appointment still you have 2 more chance to reschedule' },
  { q: 'Can someone else attend my passport appointment for me?',
    a: 'You have to attend in person for your passport interview, even if you are ill or if it is very inconvenient for you to do so. You are allowed to bring someone with you for your passport interview if you find it difficult to travel.' },
  { q: 'When the police verification will happen?',
    a: 'After the appointment, police verification will happen at your nearest police station.' },
  { q: 'How will I get the passport?',
    a: 'Passport will be dispatched through Indian speed post for your address.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ins-faq-v2${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ins-faq-v2-q">
        <span>{q}</span>
        <span className="ins-faq-v2-icon">{open ? '-' : '+'}</span>
      </div>
      {open && a && (
        <div className="ins-faq-v2-a">
          {a.split('\n').map((line, i) => <p key={i} style={{ margin: i > 0 ? '6px 0 0' : 0 }}>{line}</p>)}
        </div>
      )}
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
        <Link href="/passport-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------- */
export default function Passport() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Passport</div>
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
              Passport Services &nbsp;·&nbsp; 99% On-Time
            </div>
            <h1 className="svc-h1">
              Apply for<br />
              <span className="teal">Passport </span>
              <span className="amber">Services.</span>
            </h1>
            <p className="svc-hero-sub">
              New passport, renewal, or tatkal — we handle everything online. Fast, reliable, doorstep delivery.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ 15-20 working days (Normal)
              </span>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ 5-10 working days (Tatkal)
              </span>
            </div>
            <div className="svc-hero-acts">
              <Link href="/passport-form" className="btn-amber">Apply Now →</Link>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '99%',    lbl: 'Delivered on Time' },
              { val: '15-20',  lbl: 'Days (Normal)'     },
              { val: '5-10',   lbl: 'Days (Tatkal)'     },
              { val: '4.8★',   lbl: 'Google Rating'     },
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

      {/* -- Documents Required + How It Works + Apply Form -- */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>
              {/* Documents Required */}
              <div className="eyebrow">What You Need</div>
              <h2>Documents Required</h2>

              {/* Fresh Passport */}
              <div className="pan-doc-v2" style={{ marginBottom: 16, marginTop: 24 }}>
                <div className="pan-doc-v2-header pan-doc-v2-teal">
                  <div className="pan-doc-v2-ico"><I icon={FileText} size={18} color="var(--teal)" /></div>
                  <h3>Documents Required For Fresh Passport</h3>
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', margin: '16px 20px 0' }}>Proof of Identity (Any 01)</p>
                <ul className="pan-doc-v2-list" style={{ paddingTop: 10 }}>
                  {['Aadhaar Card', 'Higher Education Pass Certificate', 'School Leaving Certificate', 'Income Tax Assessment Order'].map(d => (
                    <li key={d}><I icon={CheckCircle2} size={14} color="var(--teal)" /> {d}</li>
                  ))}
                </ul>
              </div>

              {/* Renewal / Reissue */}
              <div className="pan-doc-v2" style={{ marginBottom: 16 }}>
                <div className="pan-doc-v2-header pan-doc-v2-amber">
                  <div className="pan-doc-v2-ico" style={{ background: 'var(--amber-bg)', borderColor: 'var(--amber-bd)' }}>
                    <I icon={AlertCircle} size={18} color="var(--amber)" />
                  </div>
                  <h3>Document Required for Renewal / Reissue of Passport</h3>
                </div>
                <ul className="pan-doc-v2-list">
                  {['Original Old Passport', 'ID and Present Address Proof'].map(d => (
                    <li key={d}><I icon={CheckCircle2} size={14} color="var(--amber)" /> {d}</li>
                  ))}
                </ul>
              </div>

              {/* Minor Passport */}
              <div className="pan-doc-v2" style={{ marginBottom: 36 }}>
                <div className="pan-doc-v2-header pan-doc-v2-green">
                  <div className="pan-doc-v2-ico" style={{ background: 'var(--green-bg)', borderColor: 'var(--green-bd)' }}>
                    <I icon={CheckCircle2} size={18} color="var(--green)" />
                  </div>
                  <h3>Document Required for Minor Passport</h3>
                </div>
                <ul className="pan-doc-v2-list">
                  {['Birth Certificate', 'Both Parents Passport'].map(d => (
                    <li key={d}><I icon={CheckCircle2} size={14} color="var(--green)" /> {d}</li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              <div className="eyebrow">Simple Process</div>
              <h2>How It Works</h2>
              <p className="sec-desc" style={{ marginBottom: 32 }}>
                We follow a simple, step-by-step process to make your passport application stress-free:
              </p>
              <div className="sol-steps">
                {HOW_STEPS.map(({ Icon, title, desc }, i) => (
                  <div key={i} className="sol-step">
                    <div className="sol-connector" />
                    <div className="sol-n ins-step-n">
                      <I icon={Icon} size={16} color="#fff" />
                    </div>
                    <div>
                      <h4>Step {i + 1}: {title}</h4>
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
            <ul className="pan-bullet-list" style={{ marginBottom: 0 }}>
              <li>
                <strong style={{ color: 'var(--amber)' }}>Rs. 2,499/-</strong> For (Normal Application)
              </li>
              <li>
                <strong style={{ color: 'var(--amber)' }}>Rs. 4,499/-</strong> For (Tatkal Application)
              </li>
              <li>
                <strong style={{ color: 'var(--amber)' }}>Rs. 99/-</strong> as booking fee. Need to pay while submitting online form{' '}
                <span style={{ color: 'var(--ink3)' }}>(This amount will be adjusted in total bill)</span>
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
              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 22, marginBottom: 16 }}>Comprehensive Passport Services - Make My Documents</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                Do you have plans to travel abroad and require a trustworthy passport agent to indicate the way, then, don't look beyond the Make My Documents. We are a squad of passport agents with great experience and are willingly at your disposal to offer you rapid, effective, and problem-less passport services. No matter if it is your holiday, education abroad, career relocation, or whatsoever, do not hesitate to contact us, and we will make your passport the least of your worries.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12, marginTop: 32 }}>Why Choose Our Passport Services?</h2>
              <p className="ins-body-p" style={{ marginBottom: 14 }}>
                We at Make My Documents, value the significance that an up-to-date passport has for travels out of the country. Our squad specializes in handling diverse passport assignments that will be exactly up to your expectations, like:
              </p>
              <ul className="pan-bullet-list" style={{ marginBottom: 40 }}>
                <li><strong>New Passport Applications:</strong> Are you going to live in another country? Just with our help, you will manage to submit a new passport application without any mistakes.</li>
                <li><strong>Passport Renewals:</strong> Is your passport about to expire? Our quick passport renewal services will enable you to take off as planned without any delays.</li>
                <li><strong>Passport Corrections:</strong> Are there incorrect details in your passport which need to be corrected? We do passport correction work swiftly so that you have no problems when traveling.</li>
                <li><strong>Lost or Stolen Passport Replacement:</strong> In case you have lost or had your passport stolen, we will support you step by step until you receive a replacement.</li>
                <li><strong>Name Change on Passport:</strong> Has your name changed recently? We help you change your passport to your new name.</li>
                <li><strong>Child Passport Applications:</strong> Are you planning to travel with your children? We show you all the necessary steps to get a child's passport.</li>
                <li><strong>Passport Expedite Services:</strong> Do you need your passport as soon as possible? Our rushed passport services allow you to get your passport without delay.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Expertise You Can Rely On</h2>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                Understanding the current passport requirements and regulations can be quite a task. The skilled team of passport agents is constantly updated with the newest changes so that your application complies with all the requirements. We make sure each and every detail of the application process is correct, from your completed forms to the delivery of your application at the passport office.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Exceptional Customer Service</h2>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                We at Make My Documents, are committed to providing the best customer service possible. We recognize that applying for a passport may be complicated. That is why we provide our help and support to you at every step of the way, without taking half your breath or patience. The regular check-ups and support that we provide during the application process, confirm your easy-walking right from the beginning to the end.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Fast and Efficient Turnaround Times</h2>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                We understand that when it comes to obtaining a passport, the clock is ticking. Our short waiting times mean that as soon as possible, you can be holding your passport, hence planning your trip will be what you should turn your attention to. Be it a vacation prepared for in the near future, a business trip abroad, or any other reason that requires a passport; we are fully committed to facilitating the processing of your viaje.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 20, marginBottom: 12 }}>Competitive Pricing</h2>
              <p className="ins-body-p" style={{ marginBottom: 16 }}>
                Getting a passport should not be the reason that your account gets overdrawn. At Make My Documents, we provide pricing for passport services at competitive rates. We adhere to the principle of offering high-quality services at reasonably priced rates, on the condition that our clients get their money's worth.
              </p>
              <p className="ins-body-p" style={{ marginBottom: 40 }}>
                If you require passport services, please get in touch with Make My Documents. The members of our staff who have expertise and are well equipped with the right information are on standby to offer you the assistance you require for your next international adventure. Do not procrastinate and come along to make a booking. It is the first step that takes one to the accomplishment of the passport.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--teal)', fontSize: 22, marginBottom: 12 }}>Different Passport types in India: An overview that covers all the grounds for a smooth application process</h2>
              <p className="ins-body-p" style={{ marginBottom: 32 }}>
                Do you want to know how to apply for an Indian passport? The various kinds of passports are so confusing, and the application process is hard to grasp. With Make My Documentation, we make the process a breeze for you, from the start until the end of it, with no hassles at all. Personal, business, or diplomatic travel — we accommodate them all. Check out the distinctions among the different types of Indian passports.
              </p>

              <h2 className="pan-content-h2" style={{ color: 'var(--ink)', fontSize: 18, marginBottom: 10 }}>Ordinary Passport (Blue Passport)</h2>
              <p className="ins-body-p" style={{ marginBottom: 12 }}>
                Besides a blue passport, the Indian citizens are usually handed the Ordinary Passport, and it is the most frequent type of passport. It is the easiest type of foreign travel, including tours, businessmen, cultural and educational exchanges. It is valid for 10 years and consequently is quite user-friendly for frequent fliers.
              </p>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Main attributes:</p>
              <ul className="pan-bullet-list" style={{ marginBottom: 32 }}>
                <li>Traveling is the main reason it is adapted to.</li>
                <li>Last for 10 years.</li>
                <li>Can be renewed when it expires.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--ink)', fontSize: 18, marginBottom: 10 }}>Official Passport (White Passport)</h2>
              <p className="ins-body-p" style={{ marginBottom: 12 }}>
                The White Passport or Official Passport is assigned to those who, as representatives of the Indian government, have to travel abroad to take care of the official work. It is a government employee, an ambassador, or a delegate who attends an international conference.
              </p>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Main attributes:</p>
              <ul className="pan-bullet-list" style={{ marginBottom: 32 }}>
                <li>It is a passport for official government travel only.</li>
                <li>Depending on the time of the task, the validity varies.</li>
                <li>The application process is easy through government channels.</li>
              </ul>

              <h2 className="pan-content-h2" style={{ color: 'var(--ink)', fontSize: 18, marginBottom: 10 }}>Diplomatic Passport (Maroon Passport)</h2>
              <p className="ins-body-p" style={{ marginBottom: 12 }}>
                Indian diplomats, consular staff, and their family members use the Diplomatic Passport. It is a passport that makes diplomatic duties easier and provides certain privileges and immunities while in a foreign country.
              </p>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Main attributes:</p>
              <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
                <li>Only for diplomats and consular officials.</li>
                <li>It gives diplomatic immunity and privileges along with it.</li>
                <li>The validity of the passport is equal to the duration of the diplomatic mission.</li>
              </ul>
              <p className="ins-body-p">
                The issues and troubles one has to face to have an Indian passport are known by Make My Documents. Our expert team is always ready to assist and guide you in the whole smooth and effective process of the application form.
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



