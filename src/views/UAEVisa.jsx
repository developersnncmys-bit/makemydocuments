'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReviewSlider from '../components/ReviewSlider'
import useScrollReveal from '../hooks/useScrollReveal'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, Upload, ShieldCheck, CreditCard, Mail,
  CheckCircle2, FileText, ChevronRight, Clock, Globe,
  Headphones, Star, BadgeCheck, Zap, Lock,
} from 'lucide-react'

const I = ({ icon: Icon, size = 18, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

const TRUST_STATS = [
  { val: '5,000+', lbl: 'Visas Approved'   },
  { val: '99%',    lbl: 'Approval Rate'     },
  { val: '4–5',    lbl: 'Working Days'      },
  { val: '24/7',   lbl: 'WhatsApp Support'  },
]

const VISA_PLANS = [
  { type: '30 Days', entry: 'Single Entry', price: '₹7,854', tag: 'Most Popular', tagColor: '#F7A418', gradient: 'linear-gradient(135deg,#1a4da8,#2E68B1)' },
  { type: '30 Days', entry: 'Multiple Entry', price: '₹14,600', tag: '', tagColor: '', gradient: 'linear-gradient(135deg,#0f2d5c,#1a4da8)' },
  { type: '60 Days', entry: 'Single Entry', price: '₹12,446', tag: '', tagColor: '', gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
  { type: '60 Days', entry: 'Multiple Entry', price: '₹19,118', tag: 'Best Value', tagColor: '#10b981', gradient: 'linear-gradient(135deg,#4f46e5,#7c3aed)' },
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',               desc: 'Fill basic details in our secure portal.' },
  { Icon: Upload,      title: 'Upload Documents',              desc: 'Submit documents via WhatsApp or email.'  },
  { Icon: ShieldCheck, title: 'Expert Verification',           desc: 'Our team reviews for accuracy.'           },
  { Icon: CreditCard,  title: 'Secure Payment',                desc: 'Pay securely to process your application.'},
  { Icon: Mail,        title: 'Receive E-Visa',                desc: 'Get your e-Visa delivered to your inbox.' },
]

const DOCUMENTS = [
  'India PAN Card',
  'Passport (Front Page)',
  'Passport (Back Page)',
  'Recent Passport-Size Photo',
  'Confirmed Round Trip Flight Ticket',
  'Hotel Booking Confirmation',
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',    desc: 'Visa delivered in 4–5 working days with real-time status updates.' },
  { Icon: BadgeCheck, title: '99% Approval Rate',  desc: 'Expert document review ensures near-perfect visa approval.'        },
  { Icon: Headphones, title: '24/7 Support',        desc: 'Dedicated WhatsApp support team available around the clock.'       },
  { Icon: Lock,       title: '100% Secure',         desc: 'Your data is handled with bank-grade security and full privacy.'   },
]

const REVIEWS = [
  { av: 'K', name: 'Karan Gupta',   svc: 'Dubai Tourist Visa',      text: '"Best service for Dubai tourist visas! Their team clarified all my doubts and provided a checklist that made document preparation easy. I received my visa faster than expected. Great experience."' },
  { av: 'A', name: 'Aditi Desai',   svc: 'Dubai Visa',              text: '"Applying for a Dubai tourist visa through them was a great decision. I was worried about delays, but they handled my application swiftly and professionally. Truly impressed with their transparency and timely updates."' },
  { av: 'S', name: 'Sameer Khan',   svc: 'Dubai Tourist Visa',      text: '"Perfect for first-time travelers! I had no idea about Dubai visa formalities, but their step-by-step support made it simple. The visa was delivered to my inbox within 4 days. Highly efficient and trustworthy service."' },
  { av: 'R', name: 'Radhika Nair',  svc: 'Dubai 30-Day Visa',       text: '"Booked a 30-day UAE tourist visa through Make My Documents for my honeymoon trip. The process was completely online — submitted documents on WhatsApp and received the e-visa within 4 days. The entire Dubai holiday started perfectly thanks to the smooth visa process!"' },
  { av: 'V', name: 'Vivek Iyer',    svc: 'UAE 60-Day Visa',         text: '"Needed a 60-day UAE visa to spend extended time with family in Abu Dhabi. Make My Documents got me the right visa category and ensured all documents were in order. My visa was approved without any issues. Transparent pricing and excellent customer support throughout."' },
  { av: 'M', name: 'Meenakshi R.',  svc: 'Dubai Multiple Entry Visa', text: '"Travel frequently between India and Dubai for work. Make My Documents helped me secure a multiple-entry Dubai visa and the entire application was done remotely. Very quick turnaround. My team at work also started using their services after my recommendation!"' },
  { av: 'P', name: 'Pradeep Tiwari', svc: 'UAE Tourist Visa',       text: '"Was planning a group trip to Dubai with 8 friends. Make My Documents handled all 8 visa applications simultaneously and all were approved within 5 days. Zero confusion, zero errors. They even followed up after approval to confirm we had downloaded all visa documents. Absolutely brilliant!"' },
]

const OTHER_COUNTRIES = [
  { name: 'Singapore',      flag: '🇸🇬', path: '/singapore-visa' },
  { name: 'United Kingdom', flag: '🇬🇧', path: '/uk-visa' },
  { name: 'Australia',      flag: '🇦🇺', path: '/australia-visa' },
  { name: 'Malaysia',       flag: '🇲🇾', path: '/malaysia-visa' },
  { name: 'Egypt',          flag: '🇪🇬', path: '/egypt-visa' },
  { name: 'Vietnam',              flag: '🇻🇳', path: '/vietnam-tourist-visa' },
  { name: 'Hong Kong',      flag: '🇭🇰', path: '/hong-kong-tourist-visa-for-indians' },
  { name: 'Indonesia',            flag: '🇮🇩', path: '/indonesia-tourist-visa-for-indians' },
  { name: 'Azerbaijan',     flag: '🇦🇿', path: '/azerbaijan-visa' },
  { name: 'Oman',                 flag: '🇴🇲', path: '/oman-visa' },
  { name: 'Morocco',        flag: '🇲🇦', path: '/morocco-visa' },
  { name: 'Bahrain',        flag: '🇧🇭', path: '/bahrain-visa' },
  { name: 'Qatar',                flag: '🇶🇦', path: '/qatar-visa' },
  { name: 'Russia',         flag: '🇷🇺', path: '/russia-visa' },
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa' },
]

const FAQS = [
  { q: 'Can I apply for a Dubai tourist visa online?',
    a: 'Yes, you can apply for a Dubai tourist visa online through Make My Documents. Our fully online process lets you submit documents, pay securely, and receive your e-Visa by email — no office visit needed.' },
  { q: 'Is it possible to extend my Dubai tourist visa?',
    a: 'Yes, a Dubai tourist visa can be extended for up to 30 days, but the extension is subject to approval by immigration authorities. Contact us for assistance with extensions.' },
  { q: 'Do I need to book a flight and hotel before applying?',
    a: 'Yes, you need to provide confirmed flight and hotel booking details as part of the visa application process.' },
  { q: 'Can I apply if I have a previous visa rejection?',
    a: 'Yes, you can still apply, but previous rejections might affect the approval process. Our experts will review your case and guide you accordingly.' },
  { q: 'Is health insurance required for a Dubai tourist visa?',
    a: 'While not mandatory, travel health insurance is highly recommended for emergencies during your stay in Dubai.' },
  { q: 'Do I need to submit original documents?',
    a: 'No, you only need to submit scanned copies of the required documents unless specifically requested otherwise by the authorities.' },
  { q: 'How can I track my application status?',
    a: 'We keep you updated at every step via WhatsApp and email. You can also contact our support team anytime for a status update.' },
  { q: 'Can I get a visa on arrival in Dubai?',
    a: 'Indian nationals generally need to apply for a tourist visa before traveling, as visa on arrival is not available for most Indians visiting Dubai.' },
  { q: 'Can I travel to other emirates with a Dubai tourist visa?',
    a: 'Yes, a Dubai tourist visa allows travel to other emirates within the UAE, as long as the visa is valid.' },
  { q: 'What is the difference between a tourist visa and a transit visa?',
    a: 'A tourist visa is for leisure or business stays, while a transit visa is for short stops (usually 48–96 hours) when passing through Dubai en route to another destination.' },
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
        <Link href="/dubai-tourist-visa-for-indians-form" className="pan-apply-btn">
          Apply Now <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function UAEVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Dubai Tourist Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/UAE page hero.png" alt="Dubai Skyline" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Dubai Tourist Visa for Indians</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Visa Approved on Time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">04 to 05 working days</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹7,854/-</div>
            </div>
          </div>
          <Link href="/dubai-tourist-visa-for-indians-form" className="btn-amber uae-hero-btn">
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
          <div className="uae-plans-grid">
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
              <h2>Documents Required</h2>
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
            <h2>What Our Customers Say</h2>
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
            <h2 style={{ color: 'var(--teal)' }}>Frequently Asked Questions</h2>
            <p className="sec-desc">Everything you need to know about Dubai tourist visa for Indians.</p>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Dubai Tourist Visa for Indians – A Complete Guide</h2>

            <h3 className="ins-body-h3">Types of Dubai Tourist Visas for Indians</h3>

            <p className="ins-body-p"><strong>30-Day Tourist Visa:</strong><br />
            The 30-Day Tourist Visa is perfect for travelers who want to explore Dubai for a short period. This visa allows you to stay in Dubai for up to 30 days, providing ample time to explore the city's iconic attractions, shopping destinations and cultural sites. This visa is ideal for a quick vacation or business trip.</p>

            <p className="ins-body-p"><strong>90-Day Tourist Visa :</strong><br />
            The 90-Day Tourist Visa is designed for those who want to stay in Dubai for a longer duration. With this visa, you can stay up to 90 days, making it perfect for travelers planning a more extended visit. It's an excellent option for tourists who want to enjoy Dubai at a relaxed pace or who are attending long-term events or activities.</p>

            <p className="ins-body-p"><strong>Multiple Entry Visa :</strong><br />
            The Multiple Entry Visa allows travelers to visit Dubai multiple times within a specific period (usually six months). This visa is ideal for individuals who need to travel to Dubai for business or leisure multiple times during their stay. The multiple-entry option is more flexible and convenient, as you don't need to apply for a new visa every time you travel.</p>

            <h3 className="ins-body-h3">Who is Eligible for a Dubai Tourist Visa?</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li><strong>Indian Nationals:</strong> Indian passport holders are eligible to apply for a Dubai tourist visa.</li>
              <li><strong>Age Requirement:</strong> Applicants must be 18 years or older. Minors must travel with parents or a guardian.</li>
              <li><strong>Valid Passport:</strong> Passport must be valid for at least six months from the date of travel.</li>
              <li><strong>Travel Purpose:</strong> The visa is for those visiting Dubai for tourism, leisure, or short business trips.</li>
              <li><strong>Clear Travel History:</strong> Applicants should have a clean travel history without any prior visa violations or overstay issues.</li>
              <li><strong>Return Ticket:</strong> A return flight booking is typically required to prove the intention of returning to India after the visit.</li>
              <li><strong>Hotel Accommodation:</strong> Proof of hotel booking or accommodation details in Dubai is necessary.</li>
              <li><strong>No Criminal Record:</strong> A clean criminal background is essential for visa approval.</li>
            </ul>

            <h3 className="ins-body-h3">Why Choose Dubai as a Travel Destination?</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li><strong>World-Class Attractions:</strong> Dubai is home to some of the world's most iconic landmarks, including the Burj Khalifa, Burj Al Arab and Palm Jumeirah.</li>
              <li><strong>Shopping Paradise:</strong> Dubai boasts some of the largest malls, including the Dubai Mall, offering a vast range of international brands, luxury goods and entertainment options.</li>
              <li><strong>Luxury and Comfort:</strong> The city is renowned for its luxury hotels, resorts and high-end experiences, catering to those seeking a lavish lifestyle.</li>
              <li><strong>Adventure and Thrills:</strong> From desert safaris and dune bashing to skydiving over the Palm, Dubai offers thrilling activities for adventure seekers.</li>
              <li><strong>Vibrant Nightlife:</strong> Dubai offers a lively nightlife scene with upscale bars, nightclubs and beach parties.</li>
              <li><strong>Events and Festivals:</strong> The city hosts various international events, including the Dubai Shopping Festival, Dubai World Cup and global music festivals.</li>
            </ul>

            <h3 className="ins-body-h3">How to Apply for a Dubai Tourist Visa for Indians</h3>

            <p className="ins-body-p"><strong>Register Online :</strong><br />
            The first step in applying for a Dubai Tourist Visa is to register online through the official visa application platform. You will need to provide basic personal information, such as your name, nationality, passport details, and travel dates.</p>

            <p className="ins-body-p"><strong>Upload Documents :</strong><br />
            After registering, you'll need to upload necessary documents like a clear scan of your passport, a recent passport-sized photograph, flight bookings, hotel reservations, and proof of financial stability (e.g., bank statements).</p>

            <p className="ins-body-p"><strong>Documents Verification :</strong><br />
            Once the documents are uploaded, they will undergo a verification process. The Dubai immigration authorities will check for document authenticity and ensure that all necessary information has been provided.</p>

            <p className="ins-body-p"><strong>Payment :</strong><br />
            Next, you'll be required to make the payment for the visa application. The payment can be made online using various methods, such as debit/credit cards or bank transfers. Once the payment is confirmed, the processing of your visa application begins.</p>

            <p className="ins-body-p"><strong>Receive your E-Visa via E-mail :</strong><br />
            After processing your application, the approved tourist visa will be sent to your email address in the form of an e-visa. This e-visa will contain all the details about your travel, including the visa validity, entry dates, and duration of stay. Ensure that you print a copy of your e-visa to present at immigration upon arrival in Dubai.</p>

            <h3 className="ins-body-h3">Things to Know Before Traveling</h3>

            <p className="ins-body-p"><strong>Dubai Travel Restrictions</strong></p>

            <p className="ins-body-p"><strong>Health Insurance :</strong><br />
            Travel insurance covering health and medical emergencies is often recommended.</p>

            <p className="ins-body-p"><strong>Customs Regulations :</strong><br />
            Adhere to Dubai's strict customs regulations, including limits on alcohol and restricted items.</p>

            <p className="ins-body-p"><strong>Baggage Allowances :</strong><br />
            Be mindful of baggage restrictions and customs allowances for duty-free goods.</p>

            <p className="ins-body-p"><strong>Travel Advisories :</strong><br />
            Always check for any specific travel advisories or regional restrictions before departure.</p>

            <p className="ins-body-p"><strong>Travel Restrictions for Certain Nationalities :</strong><br />
            Some countries may face specific entry restrictions; always check the latest updates before applying for a visa.</p>

            <p className="ins-body-p"><strong>Return Flight :</strong><br />
            Proof of a return flight booking or onward travel may be required.</p>

            <h3 className="ins-body-h3">Important Travel Tips</h3>
            <p className="ins-body-p">Here are a few essential travel tips for your visit to Dubai:</p>
            <ul className="pan-bullet-list">
              <li>Always carry a copy of your passport and visa.</li>
              <li>Respect local customs and laws, such as dress codes in public places.</li>
              <li>Be mindful of the weather, as Dubai can be extremely hot during summer months.</li>
              <li>Stay hydrated and carry sunscreen to protect from the sun.</li>
              <li>Familiarize yourself with Dubai's public transport system for easy travel across the city.</li>
              <li>Ensure you have travel insurance for emergencies or unforeseen circumstances.</li>
            </ul>

          </div>
        </div>
      </section>

    </div>
  )
}

