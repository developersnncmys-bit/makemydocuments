'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReviewSlider from '../components/ReviewSlider'
import useScrollReveal from '../hooks/useScrollReveal'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, Upload, ShieldCheck, CreditCard, Mail,
  CheckCircle2, ChevronRight, Headphones, BadgeCheck, Zap, Lock,
} from 'lucide-react'

const TRUST_STATS = [
  { val: '4,000+', lbl: 'Visas Approved'    },
  { val: '99%',    lbl: 'Visa Approved on Time' },
  { val: '48 hrs', lbl: 'Processing Time'    },
  { val: '24/7',   lbl: 'WhatsApp Support'   },
]

const VISA_PLANS = [
  { type: '14 Days', entry: 'Multiple Entry', price: '₹1,332', tag: 'Most Popular', tagColor: '#F7A418', gradient: 'linear-gradient(135deg,#1a4da8,#2E68B1)' },
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',              desc: 'Fill all the basic details in the application on our secure portal.' },
  { Icon: Upload,      title: 'Upload Documents',             desc: 'Submit the required documents via WhatsApp or email.'                 },
  { Icon: ShieldCheck, title: 'Documents Verification',       desc: 'Our experts review your documents for accuracy and compliance.'       },
  { Icon: CreditCard,  title: 'Payment',                      desc: 'Complete the payment securely to process your application.'           },
  { Icon: Mail,        title: 'Receive your E-Visa via E-mail', desc: 'Get your approved E-Visa conveniently delivered to your inbox.'     },
]

const DOCUMENTS = [
  'Clear scanned copy of passport front page (colour scanner)',
  'Clear scanned copy of passport back page (colour scanner)',
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',    desc: 'E-Visa delivered within 48 hours with real-time WhatsApp status updates.'  },
  { Icon: BadgeCheck, title: '99% Approval Rate',  desc: 'Expert document review ensures near-perfect visa approval on time.'        },
  { Icon: Headphones, title: '24/7 Support',        desc: 'Dedicated WhatsApp support team available around the clock.'              },
  { Icon: Lock,       title: '100% Secure',         desc: 'Your data is handled with bank-grade security and full privacy.'          },
]

const REVIEWS = [
  { av: 'R', name: 'Rakesh K',      svc: 'Hong Kong Tourist Visa',   text: '"Super easy process! I uploaded my documents, made the payment, and got my e-visa within 2 days. Great experience with Make My Documents."' },
  { av: 'P', name: 'Priya S',       svc: 'Hong Kong Tourist Visa',   text: '"Quick, reliable, and professional. Make My Documents took care of everything for my Hong Kong visa while I focused on my travel plans."' },
  { av: 'S', name: 'Sameer',        svc: 'Hong Kong Tourist Visa',   text: '"I had urgent travel plans to Hong Kong, and Make My Documents delivered on time. They were responsive and took care of all the paperwork. Truly reliable!"' },
  { av: 'L', name: 'Lavanya Iyer',  svc: 'Hong Kong Pre-Arrival Reg.', text: '"Was initially confused about whether I needed a visa or just a pre-arrival registration for Hong Kong. The Make My Documents team explained clearly and helped me with the correct process. Everything was sorted in under 48 hours. So helpful!"' },
  { av: 'H', name: 'Harsh Patel',   svc: 'Hong Kong Tourist Visa',   text: '"Planned a shopping trip to Hong Kong with my family and the visa process was incredibly smooth thanks to Make My Documents. All four visas were approved together within 2 days. The team was responsive on WhatsApp throughout. Fantastic experience!"' },
  { av: 'C', name: 'Chandra Sekhar', svc: 'Hong Kong Multiple Entry', text: '"Needed a multiple-entry Hong Kong visa for frequent work trips. Make My Documents guided me on how to apply for the right category and all documents were submitted correctly. My multiple-entry visa came through in 3 days. Reliable and fast!"' },
  { av: 'R', name: 'Rashmi Nair',   svc: 'Hong Kong Tourist Visa',   text: '"Very impressed with the processing speed. I needed the Hong Kong visa urgently for a connecting trip to Japan. Make My Documents treated it as priority and got the approval email to me within 36 hours. Literally saved my trip. Thank you!"' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa'     },
  { name: 'Singapore',            flag: '🇸🇬', path: '/singapore-visa'          },
  { name: 'United Kingdom',       flag: '🇬🇧', path: '/uk-visa'                 },
  { name: 'Australia',            flag: '🇦🇺', path: '/australia-visa'          },
  { name: 'Malaysia',             flag: '🇲🇾', path: '/malaysia-visa'           },
  { name: 'Egypt',                flag: '🇪🇬', path: '/egypt-visa'              },
  { name: 'Vietnam',              flag: '🇻🇳', path: '/vietnam-tourist-visa'    },
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
  { q: 'What documents do I need to apply for a Hong Kong Tourist Visa?',
    a: 'Common documents include a valid passport, completed visa application form, passport-sized photos, proof of funds, return tickets and travel insurance.' },
  { q: 'Can I extend my Hong Kong Tourist Visa?',
    a: 'Yes, in some cases, you can apply for an extension while in Hong Kong. The extension is typically granted for an additional 7 to 30 days.' },
  { q: 'Do I need travel insurance for my Hong Kong trip?',
    a: 'While not mandatory, it is highly recommended to have travel insurance to cover potential medical expenses, trip cancellations, or baggage issues during your stay.' },
  { q: 'What should I do if my visa application is rejected?',
    a: 'If your visa is rejected, you will typically receive a reason for the rejection. You can apply again by addressing the issues raised or appeal the decision depending on the circumstances.' },
  { q: 'Is there a limit to the number of times I can apply for a Hong Kong Tourist Visa?',
    a: 'There is no strict limit, but frequent or repeated visa applications may raise questions. You should ensure that you meet all visa requirements before reapplying.' },
  { q: 'Can I travel to Macau with a Hong Kong Tourist Visa?',
    a: 'Macau has its own visa requirements, but citizens of India can typically visit Macau visa-free for up to 30 days. It is important to check specific entry requirements for each region.' },
  { q: 'What is the difference between a Tourist Visa and a Business Visa for Hong Kong?',
    a: 'A Tourist Visa is meant for leisure travel, while a Business Visa is for individuals traveling for business purposes like meetings, conferences, or negotiations.' },
  { q: 'Can I work in Hong Kong on a Tourist Visa?',
    a: 'No, a Tourist Visa does not permit you to work in Hong Kong. If you wish to work, you need to apply for a work visa or permit.' },
  { q: 'Can I apply for a Hong Kong Tourist Visa through a travel agency?',
    a: 'Yes, many travel agencies offer visa application services and can assist with the entire process, including document preparation and submission.' },
  { q: 'What should I do if I lose my passport with a Hong Kong visa?',
    a: "Report the loss to the local police and your embassy. You'll need to apply for a new passport and, if necessary, a new visa." },
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
        <Link href="/hong-kong-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function HongKongVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Hong Kong Tourist Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/hongkong hero.jpg" alt="Hong Kong Skyline" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Hong Kong Tourist Visa for Indians</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Visa Approved on Time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">Up to 48 hours</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹1,300/-</div>
            </div>
          </div>
          <Link href="/hong-kong-visa-form" className="btn-amber uae-hero-btn">
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

      {/* â”€â”€ Visa Plans â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Pricing</div>
            <h2>Choose Your Visa Plan</h2>
            <p className="sec-desc">Transparent pricing with no hidden charges. ₹99 booking fee adjusted in final bill.</p>
          </div>
          <div className="uae-plans-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', maxWidth: 400, margin: '0 auto' }}>
            {VISA_PLANS.map(({ type, entry, price, tag, tagColor, gradient }) => (
              <div key={type + entry} className="uae-plan-card">
                <div className="uae-plan-header" style={{ background: gradient }}>
                  {tag && <span className="uae-plan-tag" style={{ background: tagColor }}>{tag}</span>}
                  <div className="uae-plan-duration">{type}</div>
                  <div className="uae-plan-entry">{entry}</div>
                </div>
                <div className="uae-plan-body">
                  <div className="uae-plan-price">{price}<span>/person</span></div>
                  <ul className="uae-plan-features">
                    <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> E-Visa via Email</li>
                    <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Expert Assistance</li>
                    <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> WhatsApp Updates</li>
                  </ul>
                  <a href="https://wa.me/919980097315" className="uae-plan-btn" target="_blank" rel="noreferrer">
                    Apply Now <ChevronRight size={14} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Documents + How It Works + Sidebar â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="sol-layout narrow">
            <div>

              {/* Documents Required */}
              <div className="eyebrow">What You Need</div>
              <h2>Documents Required For Hong Kong Tourist Visa for Indians</h2>
              <div className="uae-docs-grid">
                {DOCUMENTS.map((d, i) => (
                  <div key={d} className="uae-doc-item">
                    <div className="uae-doc-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="uae-doc-text">{d}</div>
                  </div>
                ))}
              </div>

              {/* How It Works */}
              <div style={{ marginTop: 44 }}>
                <div className="eyebrow">Simple Process</div>
                <h2>How It Works</h2>
                <div className="uae-steps-grid">
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
                <div className="eyebrow">Fees</div>
                <h2 style={{ color: 'var(--teal)' }}>Charges</h2>
                <ul className="pan-bullet-list" style={{ marginTop: 12 }}>
                  <li>Multiple Entry 14 Days Hong Kong E-Visa <strong style={{ color: '#F7A418' }}>Rs. 1332/-</strong></li>
                  <li><strong style={{ color: '#F7A418' }}>Rs. 99/-</strong> as booking fee. Need to pay while submitting online form (This amount will be adjusted in total bill)</li>
                </ul>
              </div>

            </div>

            {/* Sidebar */}
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
            <h2 style={{ color: 'var(--teal)' }}>FAQs</h2>
            <p className="sec-desc">Need help? Contact us for any queries related to us</p>
          </div>
          <div className="ins-faq-v2-grid">
            {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* â”€â”€ Long-form SEO content â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="ins-body-wrap">

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Hong Kong Tourist Visa for Indians – A Complete Guide</h2>

            <h3 className="ins-body-h3">Who is Eligible for a Hong Kong Tourist Visa?</h3>
            <p className="ins-body-p"><strong>- Indian Passport Holders:</strong> Only Indian citizens with a valid passport can apply.</p>
            <p className="ins-body-p"><strong>- Purpose of Visit:</strong> You must be traveling to Hong Kong for tourism or leisure purposes. Business travelers should apply for a business visa.</p>
            <p className="ins-body-p"><strong>- Financial Stability:</strong> You need to show proof of sufficient funds to support your stay in Hong Kong.</p>
            <p className="ins-body-p"><strong>- Return Ticket:</strong> A return or onward ticket confirming your intention to leave Hong Kong after the visa period.</p>

            <h3 className="ins-body-h3">What is PAR</h3>
            <p className="ins-body-p">Pre-Arrival Registration (PAR) is an online travel authorization system introduced by the Hong Kong Immigration Department. It allows Indian nationals to enter Hong Kong without a visa for up to 14 days per visit, provided they register and get approved before traveling.</p>

            <h3 className="ins-body-h3">Why Must You Get Travel Insurance When Visiting Hong Kong?</h3>
            <p className="ins-body-p">Travel insurance is highly recommended when traveling to any foreign country, and Hong Kong is no exception. Here's why:</p>

            <p className="ins-body-p"><strong>Medical Coverage :</strong><br />
            In case of any health emergencies or accidents, travel insurance can cover medical expenses.</p>

            <p className="ins-body-p"><strong>Trip Cancellation :</strong><br />
            Unforeseen circumstances like flight cancellations or medical emergencies can result in financial losses. Insurance provides reimbursement in such cases.</p>

            <p className="ins-body-p"><strong>Lost Baggage :</strong><br />
            If your luggage gets lost or delayed, travel insurance can help you recover the cost of lost items.</p>

            <p className="ins-body-p"><strong>Peace of Mind :</strong><br />
            Having insurance ensures that you're protected throughout your journey, so you can focus on enjoying your trip.</p>

            <h3 className="ins-body-h3">Why Choose Hong Kong as a Travel Destination?</h3>

            <p className="ins-body-p"><strong>- Iconic Attractions:</strong> Visit the famous Victoria Harbour, the Peak and Disneyland Hong Kong for a blend of nature, modern architecture, and entertainment.</p>
            <p className="ins-body-p"><strong>- Shopping Paradise:</strong> Explore world-class shopping malls, street markets, and designer boutiques for a retail experience like no other.</p>
            <p className="ins-body-p"><strong>- Cuisine:</strong> Hong Kong is renowned for its street food, dim sum, and diverse culinary offerings from all around the world.</p>
            <p className="ins-body-p"><strong>- Vibrant Culture:</strong> From traditional Chinese festivals to modern art and music scenes, Hong Kong is a fusion of the old and new.</p>
            <p className="ins-body-p"><strong>- Ease of Travel:</strong> The city's efficient public transportation system makes it easy to explore the entire city.</p>

            <h3 className="ins-body-h3">Things to Know Before Traveling to Hong Kong</h3>

            <p className="ins-body-p"><strong>- Iconic Attractions:</strong> Visit the famous Victoria Harbour, the Peak and Disneyland Hong Kong for a blend of nature, modern architecture, and entertainment.</p>
            <p className="ins-body-p"><strong>- Currency:</strong> The official currency is the Hong Kong Dollar (HKD). Credit cards are widely accepted, but it's always a good idea to carry some cash for small purchases.</p>
            <p className="ins-body-p"><strong>- Weather:</strong> Hong Kong experiences a subtropical climate with hot and humid summers and mild winters. Pack accordingly based on the season.</p>
            <p className="ins-body-p"><strong>- Language:</strong> Cantonese is the most spoken language, but English is also widely understood, especially in tourist areas.</p>
            <p className="ins-body-p"><strong>- Electricity:</strong> Hong Kong uses the UK-style three-pronged plugs, so carry an appropriate adapter if necessary.</p>
            <p className="ins-body-p"><strong>- Customs Regulations:</strong> Hong Kong has strict customs rules, so make sure to familiarize yourself with the restrictions on items you can bring into the country.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

