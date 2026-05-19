'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReviewSlider from '../components/ReviewSlider'
import useScrollReveal from '../hooks/useScrollReveal'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, FileText, CreditCard, Building2, Mail,
  CheckCircle2, ChevronRight, Headphones, BadgeCheck, Zap, Lock,
} from 'lucide-react'

const TRUST_STATS = [
  { val: '10,000+', lbl: 'Visas Approved'   },
  { val: '99%',     lbl: 'Delivered on Time' },
  { val: '7–10',    lbl: 'Working Days'      },
  { val: '24/7',    lbl: 'WhatsApp Support'  },
]

const DOCUMENTS = [
  'Original Passport',
  'Visa form',
  'Photo (3nos mate finish photo with 80% face covering and with white background)',
  'Covering letter (if doing own business – mention monthly income, business details; letter should be on letter head)',
  'Hotel voucher',
  'Air Ticket',
  'Educational certificate',
  "Last Month's Pay slip (if you are an employee)",
  'Office ID card copy (if you are an employee)',
  'Visiting Card (if your own business)',
  'School ID card copy (if you are a student)',
  'Last 3 months Bank statement',
]

const HOW_STEPS = [
  { Icon: UserPlus,   title: 'Register Online',                       desc: 'Fill your basic details on our secure portal.'          },
  { Icon: FileText,   title: 'Door Step Documents Pickup & Verification', desc: 'We pick up and verify your documents at your doorstep.' },
  { Icon: CreditCard, title: 'Payment',                               desc: 'Complete the payment securely to process your application.' },
  { Icon: Building2,  title: 'We Submit Your Documents To Embassy',   desc: 'Our team handles the official embassy submission.'       },
  { Icon: Mail,       title: 'Your Visa Deliver To Your Doorstep',    desc: 'Receive your approved visa delivered at your address.'   },
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',    desc: 'Visa delivered in 7–10 working days with real-time WhatsApp updates.'  },
  { Icon: BadgeCheck, title: '99% Delivered',      desc: 'Expert document review ensures near-perfect visa delivery on time.'    },
  { Icon: Headphones, title: '24/7 Support',       desc: 'Dedicated WhatsApp support team available around the clock.'           },
  { Icon: Lock,       title: '100% Secure',        desc: 'Your data is handled with bank-grade security and full privacy.'       },
]

const REVIEWS = [
  { av: 'K', name: 'Kiran S.',      svc: 'Singapore Tourist Visa',   text: '"Got my Singapore Tourist Visa! The team was super responsive and guided me with every document. Great experience."' },
  { av: 'P', name: 'Priya T.',      svc: 'Singapore Visa',           text: '"Had no idea how to apply for a Singapore visa from India, but they made it simple. Highly recommended for first-time travelers."' },
  { av: 'A', name: 'Arjun M.',      svc: 'Singapore Visa',           text: '"Quick, professional, and very transparent. They helped with my multiple-entry Singapore visa without any issues."' },
  { av: 'S', name: 'Sonal Mehta',   svc: 'Singapore Tourist Visa',   text: '"Visited Singapore for Universal Studios and Gardens by the Bay. Make My Documents coordinated the doorstep document pickup, embassy submission, and passport delivery. I did not have to go anywhere — my stamped visa was delivered home. Exceptional service!"' },
  { av: 'H', name: 'Haritha Menon', svc: 'Singapore Multiple Entry', text: '"Needed a multiple-entry Singapore visa for quarterly business trips. The team put together a very strong application highlighting my financial profile and travel history. Got a 2-year multiple entry visa approved. Will recommend Make My Documents to all my colleagues!"' },
  { av: 'R', name: 'Rohit Pillai',  svc: 'Singapore Visa',           text: '"Applied for Singapore visa for the first time. Had no idea about the biometric appointment or VFS process. Make My Documents handled everything — from document collection at my doorstep to booking the VFS appointment and tracking the application. Visa in hand in 9 days. Excellent!"' },
  { av: 'G', name: 'Gayatri Deshpande', svc: 'Singapore Tourist Visa', text: '"Taking my family to Singapore for the school holidays. Make My Documents processed all 4 visas together with zero confusion. They even reminded us about the photos needed and helped reformat them to meet the specifications. All 4 visas approved together. Thank you so much!"' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa' },
  { name: 'United Kingdom',       flag: '🇬🇧', path: '/uk-visa' },
  { name: 'Australia',            flag: '🇦🇺', path: '/australia-visa' },
  { name: 'Malaysia',             flag: '🇲🇾', path: '/malaysia-visa' },
  { name: 'Egypt',                flag: '🇪🇬', path: '/egypt-visa' },
  { name: 'Vietnam',              flag: '🇻🇳', path: '/vietnam-tourist-visa' },
  { name: 'Hong Kong',            flag: '🇭🇰', path: '/hong-kong-tourist-visa-for-indians' },
  { name: 'Indonesia',            flag: '🇮🇩', path: '/indonesia-tourist-visa-for-indians' },
  { name: 'Azerbaijan',           flag: '🇦🇿', path: '/azerbaijan-visa' },
  { name: 'Oman',                 flag: '🇴🇲', path: '/oman-visa' },
  { name: 'Morocco',              flag: '🇲🇦', path: '/morocco-visa' },
  { name: 'Bahrain',              flag: '🇧🇭', path: '/bahrain-visa' },
  { name: 'Qatar',                flag: '🇶🇦', path: '/qatar-visa' },
  { name: 'Russia',               flag: '🇷🇺', path: '/russia-visa' },
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa' },
]

const FAQS = [
  { q: 'How do I apply for a Singapore visa from India?',
    a: 'You can apply online by submitting your documents through our platform. We\'ll take care of the rest.' },
  { q: 'What is the processing time for a Singapore visa?',
    a: 'It usually takes 3–5 working days, but express services are available.' },
  { q: 'Can I apply for a Singapore visa online?',
    a: 'Yes, our online Singapore visa application process is simple and fully digital.' },
  { q: 'What documents are required for a Singapore tourist visa?',
    a: 'You need a valid passport, photo, flight tickets, hotel booking, and bank statements.' },
  { q: 'Do I need a visa to visit family in Singapore?',
    a: 'Yes, you will need a Singapore visit visa with an invitation letter and supporting documents.' },
  { q: 'What is the validity of a Singapore visa?',
    a: 'Tourist and visit visas are usually valid for 30 days, while multiple-entry visas offer extended validity.' },
  { q: 'Who is eligible for a Singapore visa from India?',
    a: 'Indian citizens with valid travel purpose, financial proof, and clean records are eligible.' },
  { q: 'Do you help with urgent tourist or visit visa applications?',
    a: 'Yes, our team provides fast-track support for urgent travel visa applications.' },
  { q: 'Do you help with multiple-entry Singapore visas?',
    a: 'Yes, we assist with documentation and filing for multiple-entry visas.' },
  { q: 'Is there a visa on arrival for Indians in Singapore?',
    a: 'No, Indians must apply for a visa in advance before traveling to Singapore.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ins-faq-v2${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ins-faq-v2-q">
        <span>{q}</span>
        <span className="ins-faq-v2-icon">{open ? '−' : '+'}</span>
      </div>
      {open && <div className="ins-faq-v2-a">{a}</div>}
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
        <Link href="/singapore-visa-form" className="pan-apply-btn">
          Apply Now <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function SingaporeVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Singapore Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/singapore hero.jpg" alt="Singapore Skyline" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Singapore Visa for Indians | Tourist Visa Help</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Delivered on time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">07 – 10 working days</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹3,500/-</div>
            </div>
          </div>
          <Link href="/singapore-visa-form" className="btn-amber uae-hero-btn">
            Apply Now
          </Link>
        </div>
      </div>

      {/* â”€â”€ Trust Strip â”€â”€ */}
      <div className="uae-trust-strip">
        <div className="mx uae-trust-inner">
          {TRUST_STATS.map(({ val, lbl }) => (
            <div key={lbl} className="uae-trust-item">
              <div className="uae-trust-val">{val}</div>
              <div className="uae-trust-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Charges â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Pricing</div>
            <h2>Singapore Visa Charges</h2>
            <p className="sec-desc">Transparent pricing with no hidden charges.</p>
          </div>
          <div className="sgp-charges-wrap">
            <div className="sgp-charge-card">
              <div className="sgp-charge-header">
                <span className="sgp-charge-tag">Normal Application</span>
                <div className="sgp-charge-price">₹3,500<span>/-</span></div>
                <div className="sgp-charge-sub">per person</div>
              </div>
              <div className="sgp-charge-body">
                <ul className="uae-plan-features">
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Tourist / Visit / Multiple Entry</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Expert Document Assistance</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Embassy Submission by Our Team</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Visa Delivered to Your Doorstep</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> WhatsApp Updates at Every Step</li>
                </ul>
                <a href="https://wa.me/919980097315" className="uae-plan-btn" target="_blank" rel="noreferrer">
                  Apply Now <ChevronRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>
            <div className="sgp-booking-note">
              <strong>₹99/-</strong> booking fee payable while submitting the online form. This amount will be adjusted in the total bill.
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Documents + How It Works + Sidebar â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>

              {/* Documents */}
              <div className="eyebrow">What You Need</div>
              <h2>Documents Required For Singapore Visa</h2>
              <div className="uae-docs-grid" style={{ marginTop: 20 }}>
                {DOCUMENTS.map((d, i) => (
                  <div key={i} className="uae-doc-item">
                    <div className="uae-doc-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="uae-doc-text">{d}</div>
                  </div>
                ))}
              </div>

              {/* How It Works */}
              <div style={{ marginTop: 44 }}>
                <div className="eyebrow">Simple Process</div>
                <h2>How It Works</h2>
                <div className="uae-steps-grid" style={{ marginTop: 20 }}>
                  {HOW_STEPS.map(({ Icon, title, desc }, i) => (
                    <div key={i} className="uae-step-card">
                      <div className="uae-step-num">{i + 1}</div>
                      <div className="uae-step-ico">
                        <Icon size={20} strokeWidth={1.8} color="var(--teal-dk)" />
                      </div>
                      <div className="uae-step-title">{title}</div>
                      <div className="uae-step-desc">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <ApplyForm />
          </div>
        </div>
      </section>

      {/* â”€â”€ Why Choose Us â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Our Edge</div>
            <h2>Why Choose Make My Documents?</h2>
          </div>
          <div className="uae-why-grid">
            {WHY_US.map(({ Icon, title, desc }) => (
              <div key={title} className="uae-why-card rv">
                <div className="uae-why-ico">
                  <Icon size={22} strokeWidth={1.8} color="var(--teal-dk)" />
                </div>
                <h4 className="uae-why-title">{title}</h4>
                <p className="uae-why-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Reviews â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead center" style={{ marginBottom: 32 }}>
            <div className="eyebrow">Client Reviews</div>
            <h2>Our Client Reviews</h2>
          </div>
          <ReviewSlider reviews={REVIEWS} />
        </div>
      </section>

      {/* â”€â”€ Other Country Visa Services â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center" style={{ marginBottom: 32 }}>
            <div className="eyebrow">Explore More</div>
            <h2>Visa Services for Other Countries</h2>
            <p className="sec-desc">We also assist with tourist visas for these popular destinations.</p>
          </div>
          <div className="uae-country-grid">
            {OTHER_COUNTRIES.map(({ name, flag, path }) => (
              path
                ? <Link key={name} href={path} className="uae-country-card">
                    <span className="uae-country-flag">{flag}</span>
                    <span className="uae-country-name">{name}</span>
                  </Link>
                : <a key={name} href="https://wa.me/919980097315" className="uae-country-card" target="_blank" rel="noreferrer">
                    <span className="uae-country-flag">{flag}</span>
                    <span className="uae-country-name">{name}</span>
                  </a>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Blogs â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead between" style={{ marginBottom: 32 }}>
            <div>
              <div className="eyebrow">Learn More</div>
              <h2>Explore Our Latest Blogs</h2>
            </div>
            <Link href="/blogs" className="btn-teal" style={{ fontSize: 14, padding: '12px 22px', alignSelf: 'flex-start' }}>
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

      {/* â”€â”€ FAQs â”€â”€ */}
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

      {/* â”€â”€ SEO Content â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="ins-body-wrap">

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Singapore Visa for Indians</h2>
            <p className="ins-body-p">Plan a trip to Singapore for fun, work, or to see family. Make My Documents gives full help to Indian people who need a Singapore visa. Our skilled team helps you at each step to make it easy and calm. It could be for a break, a work event, or to meet family; we make it easy to get a Singapore Visa for Indians.</p>
            <p className="ins-body-p">From picking the right visa type to giving all needed papers the right way, we make sure your form fits all the rules. Whether you're asking for a tourist visa our help is made to let Indian travelers get their visa fast and with sureness.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Types of Singapore Visa for Indian Citizens</h2>
            <p className="ins-body-p">People from India can get many types of Singapore visas for their trips. If you want to go for fun, work, or to see family, we can get you tourist visas, business visas, visit visas, and visas that let you come and go many times. We make sure this is easy and without mistakes.</p>

            <h3 className="ins-body-h3">Singapore Tourist Visa for Indian Citizens</h3>
            <p className="ins-body-p">Want to go to Singapore? We make it easy for Indians to get a Singapore tourist visa. From checking your papers to putting them up online, our team helps you every step. Have a worry-free trip with our help, made for those who want to see Singapore's fun places and culture.</p>

            <h3 className="ins-body-h3">Visit Visa for Family or Friends</h3>
            <p className="ins-body-p">Want to see your family or friends in Singapore? We help Indians get a Singapore visit visa fast and right. From looking at your invite letter to dealing with embassy papers, we take care of all the details. Meet your loved ones without stress about paper mistakes or waits.</p>

            <h3 className="ins-body-h3">Multiple-Entry Singapore Visa</h3>
            <p className="ins-body-p">Go to Singapore a lot? A multiple-entry Singapore visa is great for those who often fly for work, family, or fun. We help Indian people apply for long-term, many-times entry visas with the right papers, so you can come and go smoothly, sure, and with no issues.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How to Apply for a Singapore Visa from India</h2>
            <p className="ins-body-p"><Link href="/" style={{ color: 'var(--teal)' }}>Make My Documents</Link> simplifies the application journey through a clear, four-step process:</p>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li><strong>Free Consultation</strong> – Understand visa type and eligibility</li>
              <li><strong>Document Collection</strong> – We verify and organize all required paperwork</li>
              <li><strong>Application Submission</strong> – Our team handles official submission and follow-ups</li>
              <li><strong>Visa Approval</strong> – Receive your approved visa via email or courier</li>
            </ul>
            <p className="ins-body-p">With Make My Documents, applying for a Singapore visa from India becomes effortless and efficient.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Documents Required for Singapore Visa in India</h2>
            <p className="ins-body-p">To apply for a Singapore visa, Indian citizens will need:</p>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li><strong>Valid passport</strong> (6+ months validity)</li>
              <li><strong>Passport-size photographs</strong></li>
              <li><strong>Confirmed flight tickets</strong></li>
              <li><strong>3–6 months bank statements</strong></li>
              <li><strong>Cover letter or business documents</strong> (if applicable)</li>
            </ul>
            <p className="ins-body-p">Our experts will guide you through preparing each document correctly.</p>

            <h3 className="ins-body-h3">Singapore Visa Fees for Indian Citizens</h3>
            <p className="ins-body-p">Visa fees may vary depending on the application type and urgency. At Make My Documents, we provide:</p>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>Clear and honest support with no hidden steps</li>
              <li>Full documentation assistance without fee disclosure</li>
              <li>Express service available for urgent needs (if required)</li>
            </ul>
            <p className="ins-body-p"><strong>NOTE:</strong> We inform you of the official requirements clearly before starting.</p>

            <h3 className="ins-body-h3">Singapore Visa Processing Time for Indians</h3>
            <p className="ins-body-p">It takes around 3 to 5 days for Indian folks to get a Singapore visa. If you need to go very soon, you can make it fast by doing what the embassy says. We watch these times to make sure you're all set for your trip to Singapore without any rush or delay.</p>

            <h3 className="ins-body-h3">Online Singapore Visa Application India</h3>
            <p className="ins-body-p">Make My Documents offers a fully digital process for Singapore visa applications:</p>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>Fill out a secure online form</li>
              <li>Upload scanned documents</li>
              <li>Pay via secure payment gateway</li>
              <li>Track progress via email or WhatsApp</li>
            </ul>
            <p className="ins-body-p">No long queues. No confusing forms. Just fast, reliable service.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose Make My Documents for Singapore Visa Services?</h2>
            <p className="ins-body-p">Make My Documents is big in help with Singapore visa needs for folks from India. If it's for fun, meeting family we take care of it all. Our good team makes sure all forms are checked fast, done well, and keeps you in the loop as things happen.</p>
            <p className="ins-body-p">We've helped more than 10,000 Indian guests get their Singapore visas with no fuss. We send things safe online and are here for you day and night. We aim to be quick, right, and make our users happy. Our no-paper way is easy, so no long lines or trips to the embassy.</p>
            <ul className="pan-bullet-list">
              <li>Our visa team knows their job and does it well.</li>
              <li>We cover all visa types: for fun, work, family visits</li>
              <li>Quick form checks with making sure all is right</li>
              <li>Updates as they come and help all the time</li>
              <li>You hear news as it comes and we're here to help.</li>
              <li>Over 10,000 Indian travelers trust us.</li>
              <li>Our way is safe and uses no paper.</li>
            </ul>

          </div>
        </div>
      </section>

    </div>
  )
}

