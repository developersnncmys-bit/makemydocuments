'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReviewSlider from '../components/ReviewSlider'
import useScrollReveal from '../hooks/useScrollReveal'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, Upload, ShieldCheck, CreditCard, Mail,
  ChevronRight, Headphones, BadgeCheck, Zap, Lock,
} from 'lucide-react'

const TRUST_STATS = [
  { val: '10,000+', lbl: 'Visas Approved'   },
  { val: '99%',     lbl: 'Delivered on Time' },
  { val: '07–10',   lbl: 'Working Days'      },
  { val: '24/7',    lbl: 'WhatsApp Support'  },
]

const DOCUMENTS = [
  'Passport',
  'Traveler Photo',
  'Flight Tickets',
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',                desc: 'Fill all the basic details in the application on our secure portal.'         },
  { Icon: Upload,      title: 'Upload Documents',               desc: 'Submit the required documents via WhatsApp or email.'                         },
  { Icon: ShieldCheck, title: 'Documents Verification',         desc: 'Our experts review your documents for accuracy and compliance.'               },
  { Icon: CreditCard,  title: 'Payment',                        desc: 'Complete the payment securely to process your application.'                   },
  { Icon: Mail,        title: 'Receive your E-Visa via E-mail', desc: 'Get your approved E-Visa conveniently delivered to your inbox.'               },
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',     desc: 'Visa delivered in just 07–10 working days with real-time updates.'  },
  { Icon: BadgeCheck, title: '99% Approval Rate',   desc: 'Expert document review ensures near-perfect visa delivery on time.' },
  { Icon: Headphones, title: '24/7 Support',        desc: 'Dedicated WhatsApp support team available around the clock.'        },
  { Icon: Lock,       title: '100% Online Process', desc: 'From consultation to submission, everything is handled remotely.'   },
]

const REVIEWS = [
  { av: 'M', name: 'Manish Choudhary', svc: 'Vietnam Visa',         text: '”Quick and reliable visa processing for Vietnam. I got my Vietnam Visa within a few days, thanks to the Make My Documents team. They were responsive and made the whole process stress-free.”' },
  { av: 'P', name: 'Pooja Sinha',      svc: 'Vietnam Visa',         text: '”Great help for last-minute travel. I had to travel urgently and didn\'t know how to get the Vietnam visa on time. Their team guided me through the express process and got it done fast.”' },
  { av: 'R', name: 'Rajesh Kumar',     svc: 'Vietnam Visa',         text: '”Smooth experience for my honeymoon trip. They took care of everything — documents, application, and updates. We got our Vietnam tourist visa without any hassle. Totally worth it.”' },
  { av: 'A', name: 'Amita Shetty',     svc: 'Vietnam e-Visa',       text: '”Was planning a Hanoi and Ha Long Bay trip. Make My Documents handled my Vietnam e-visa application entirely — from photo specifications to the correct entry type. Got the e-visa approval within 3 working days. The process was completely paperless and very convenient!”' },
  { av: 'N', name: 'Navin Subramaniam', svc: 'Vietnam Tourist Visa', text: '”Visited Ho Chi Minh City and the Mekong Delta. The team helped me get a Vietnam e-visa well before my departure date. They also guided me on what to show immigration at the airport. Zero issues on arrival. Extremely helpful and professional service!”' },
  { av: 'S', name: 'Shilpa Jain',      svc: 'Vietnam Visa on Arrival', text: '”Needed a Vietnam VOA approval letter urgently for a solo trip to Da Nang. Make My Documents explained the VOA process clearly, arranged the approval letter quickly, and told me exactly how the airport immigration works. My arrival in Vietnam was completely stress-free. Loved the service!”' },
  { av: 'B', name: 'Bharath Kumar',    svc: 'Vietnam e-Visa',       text: '”My family of 4 needed Vietnam visas for a 2-week trip. Make My Documents processed all 4 e-visa applications together and all were approved in 4 days. They even reviewed our hotel bookings to make sure they met immigration requirements. Top-class service and great value!”' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa' },
  { name: 'Singapore',            flag: '🇸🇬', path: '/singapore-visa'     },
  { name: 'United Kingdom',       flag: '🇬🇧', path: '/uk-visa'            },
  { name: 'Australia',            flag: '🇦🇺', path: '/australia-visa'     },
  { name: 'Malaysia',             flag: '🇲🇾', path: '/malaysia-visa'      },
  { name: 'Egypt',                flag: '🇪🇬', path: '/egypt-visa' },
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
  { q: 'Can I re-enter Vietnam with a single entry visa?',
    a: "No, a single entry visa allows only one entry. You'll need a multiple entry visa to re-enter." },
  { q: 'Is travel insurance mandatory for Vietnam?',
    a: "No, it's not mandatory, but it is highly recommended for safety during your trip." },
  { q: 'What if my visa application is rejected?',
    a: 'You will be notified with the reason for rejection, and you can reapply after correcting the issues.' },
  { q: 'Can I apply for a Vietnam visa for someone else?',
    a: 'Yes, you can submit an application on behalf of another person with their documents and consent.' },
  { q: 'Can I enter Vietnam on the exact date mentioned on the E-Visa?',
    a: 'Yes, you can enter Vietnam on or after the entry date printed on your E-Visa.' },
  { q: 'What happens if I overstay my visa in Vietnam?',
    a: "Overstaying may lead to fines or travel bans. It's best to apply for an extension before expiry." },
  { q: 'Do children need a separate Vietnam visa?',
    a: 'Yes, every traveler including infants and children must have an individual visa.' },
  { q: 'Can I convert a tourist visa to a business visa after arrival?',
    a: 'No, visa conversion is not allowed within Vietnam. You must apply for a new visa type.' },
  { q: 'What should I do if I lose my E-Visa copy?',
    a: 'You can re-download it from your email or request assistance from your visa service provider.' },
  { q: 'Can I apply for a Vietnam visa while already abroad?',
    a: 'Yes, Indian citizens can apply online from any country with internet access.' },
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
        <Link href="/vietnam-tourist-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function VietnamVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Vietnam Tourist Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/vietnam hero.jpg" alt="Vietnam" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Vietnam Tourist Visa for Indians</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Visa Approved on Time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">07 – 10 working days</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹4,371/-</div>
            </div>
          </div>
          <Link href="/vietnam-tourist-visa-form" className="btn-amber uae-hero-btn">
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

      {/* â”€â”€ Documents + How It Works + Charges + Sidebar â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>

              {/* Documents */}
              <h2>Documents Required For Vietnam Tourist Visa for Indians</h2>
              <ul className="pan-bullet-list" style={{ marginTop: 16 }}>
                {DOCUMENTS.map((d, i) => (
                  <li key={i}>- {d}</li>
                ))}
              </ul>

              {/* How It Works */}
              <div style={{ marginTop: 44 }}>
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

              {/* Charges */}
              <div style={{ marginTop: 44 }}>
                <h2 style={{ color: 'var(--teal)' }}>Charges</h2>
                <ul className="pan-bullet-list" style={{ marginTop: 16 }}>
                  <li>Vietnam 30 Days Single Entry E-Visa <strong style={{ color: '#F7A418' }}>Rs. 4,371/-</strong></li>
                  <li>Vietnam 30 Days Multiple Entry E-Visa <strong style={{ color: '#F7A418' }}>Rs. 12,492/-</strong></li>
                  <li>Vietnam 90 Days Multiple Entry E-Visa <strong style={{ color: '#F7A418' }}>Rs. 14,573/-</strong></li>
                  <li><strong style={{ color: '#F7A418' }}>Rs. 99/-</strong> as booking fee. Need to pay while submitting online form<br />(This amount will be adjusted in total bill)</li>
                </ul>
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
            <h2>Our Other Country Visa Services</h2>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Vietnam Tourist Visa for Indians – A Complete Guide</h2>
            <p className="ins-body-p">Indian citizens planning to visit Vietnam for tourism purposes must apply for a Vietnam Tourist Visa. The visa is issued in electronic format (E-Visa) and allows entry for specified durations. The application process is entirely online and takes approximately 7 to 10 working days. Travelers must submit basic personal information, passport details, and a recent photograph.</p>
            <p className="ins-body-p">Visa approval is subject to document verification, and travelers will receive their E-Visa directly by email. The visa must be printed and carried during travel.</p>

            <h3 className="ins-body-h3">What are the Types of Vietnam Visa</h3>

            <h4 className="ins-body-h3">E-Visa</h4>
            <p className="ins-body-p">The E-Visa is a digital visa issued online for short-term stays. It is valid for 30 days and is available for both tourism and business purposes.</p>

            <h4 className="ins-body-h3">Tourist Visa</h4>
            <p className="ins-body-p">Issued for leisure travel, sightseeing, or family visits. Indian citizens can apply online and receive it via email without visiting an embassy.</p>

            <h4 className="ins-body-h3">Business Visa</h4>
            <p className="ins-body-p">Designed for individuals visiting Vietnam for work, meetings, or business-related activities. It often requires additional documentation like an invitation letter.</p>

            <h4 className="ins-body-h3">Visa on Arrival</h4>
            <p className="ins-body-p">Applicable only with a prior approval letter obtained online. Travelers receive the visa at a Vietnam airport after presenting the letter and paying a stamping fee.</p>

            <h3 className="ins-body-h3">Vietnam Visa Extension and Renewal</h3>
            <p className="ins-body-p">Visa extension or renewal options are available for travelers who wish to extend their stay in Vietnam:</p>
            <p className="ins-body-p">- <strong>Extension for Extra Stay:</strong> You can apply for a visa extension through Vietnam's immigration authority before the visa expiry date.</p>
            <p className="ins-body-p">- <strong>Renewal After Expiry:</strong> If the visa is about to expire or not extendable, a renewal allows fresh entry permission with new validity.</p>
            <p className="ins-body-p">Processing time varies and it is recommended to apply at least one week before the current visa expires. Overstaying without a valid extension or renewal may result in fines or travel restrictions.</p>

            <h3 className="ins-body-h3">Why Choose Make My Document to Apply for a Vietnam Tourist Visa?</h3>

            <h4 className="ins-body-h3">Expert Guidance at Every Step:</h4>
            <p className="ins-body-p">Our team handles all document reviews, form submissions, and status tracking for your convenience.</p>

            <h4 className="ins-body-h3">Secure and Transparent Process:</h4>
            <p className="ins-body-p">All data is securely handled, with real-time updates and no hidden charges in the final billing.</p>

            <h4 className="ins-body-h3">High Approval Success Rate:</h4>
            <p className="ins-body-p">With a 99% approval record, we ensure your application meets Vietnam's tourism visa requirements accurately.</p>

            <h4 className="ins-body-h3">Quick Support &amp; Easy Dashboard Access:</h4>
            <p className="ins-body-p">Track your visa status, upload documents, and receive support easily through a user-friendly dashboard.</p>

            <h3 className="ins-body-h3">Things to Know Before Traveling to Vietnam</h3>

            <h4 className="ins-body-h3">Carry Printed E-Visa:</h4>
            <p className="ins-body-p">Always print and carry a hard copy of your E-Visa for verification at Vietnamese immigration checkpoints.</p>

            <h4 className="ins-body-h3">Passport Must Be Valid for 6+ Months:</h4>
            <p className="ins-body-p">Your passport must have a minimum validity of six months from your intended date of entry into Vietnam.</p>

            <h4 className="ins-body-h3">Health &amp; Travel Insurance Advised:</h4>
            <p className="ins-body-p">Though optional, travel insurance is strongly recommended to cover unexpected medical or trip-related issues.</p>

            <h4 className="ins-body-h3">Currency Exchange in Vietnam:</h4>
            <p className="ins-body-p">The Vietnamese Dong (VND) is the official currency; ensure you exchange or withdraw cash after arrival.</p>

            <h4 className="ins-body-h3">Follow Entry Regulations:</h4>
            <p className="ins-body-p">Comply with Vietnam's immigration and health rules to avoid delays or issues during your entry.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

