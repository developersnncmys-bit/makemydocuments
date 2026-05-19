'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReviewSlider from '../components/ReviewSlider'
import useScrollReveal from '../hooks/useScrollReveal'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, Upload, ShieldCheck, CreditCard, Mail,
  CheckCircle2, ChevronRight,
  Headphones, BadgeCheck, Zap, Lock,
} from 'lucide-react'

const TRUST_STATS = [
  { val: '3,000+', lbl: 'Visas Approved'   },
  { val: '99%',    lbl: 'Delivered on Time' },
  { val: '7–10',   lbl: 'Working Days'      },
  { val: '24/7',   lbl: 'WhatsApp Support'  },
]

const VISA_PLANS = [
  { type: '30 Days', entry: 'Single Entry',   price: '₹4,798', tag: 'Most Popular', tagColor: '#F7A418', gradient: 'linear-gradient(135deg,#1a4da8,#2E68B1)' },
  { type: '30 Days', entry: 'Multiple Entry', price: '₹6,580', tag: 'Best Value',   tagColor: '#10b981', gradient: 'linear-gradient(135deg,#0f2d5c,#1a4da8)' },
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',         desc: 'Fill basic details in our secure portal.'         },
  { Icon: Upload,      title: 'Upload Documents',        desc: 'Submit documents via WhatsApp or email.'          },
  { Icon: ShieldCheck, title: 'Documents Verification',  desc: 'Our team reviews every document for accuracy.'    },
  { Icon: CreditCard,  title: 'Payment',                 desc: 'Pay securely to process your application.'        },
  { Icon: Mail,        title: 'Receive your E-Visa',     desc: 'Get your e-Visa delivered to your inbox.'         },
]

const DOCUMENTS = [
  'Clear scanned copy of passport front page (colour scanner)',
  'Clear scanned copy of passport back page (colour scanner)',
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',    desc: 'Visa delivered in 7–10 working days with real-time status updates.'  },
  { Icon: BadgeCheck, title: '99% Delivered on Time', desc: 'Expert document review ensures near-perfect on-time delivery.'   },
  { Icon: Headphones, title: '24/7 Support',       desc: 'Dedicated WhatsApp support team available around the clock.'        },
  { Icon: Lock,       title: '100% Secure',        desc: 'Your data is handled with bank-grade security and full privacy.'    },
]

const REVIEWS = [
  { av: 'M', name: 'Meera Iyer',    svc: 'Egypt Tourist Visa', text: '”Seamless Egypt visa experience. I was traveling to Cairo for a short vacation and didn\'t know where to begin. Make My Documents handled my tourist visa process with complete clarity and no delays.”' },
  { av: 'S', name: 'Suresh Nair',   svc: 'Egypt Tourist Visa', text: '”Great support from start to finish. Their team guided me through every step — documents, payment, submission — and kept me updated until my visa was approved. Very responsive and professional.”' },
  { av: 'K', name: 'Kavya Reddy',   svc: 'Egypt Tourist Visa', text: '”Trusted them for my first trip to Egypt. As a solo traveler, I wanted to be sure everything was in order. Their checklist was spot-on, and they even helped with formatting my documents correctly.”' },
  { av: 'P', name: 'Pratik Doshi',  svc: 'Egypt e-Visa',       text: '”Visited Egypt to see the Pyramids of Giza and was amazed at how simple Make My Documents made the visa process. They submitted the e-visa application same day, and I received approval in under 72 hours. Everything was hassle-free and professional.”' },
  { av: 'A', name: 'Ashwini Rao',   svc: 'Egypt Tourist Visa', text: '”Was planning a Cairo and Luxor itinerary and needed the visa sorted quickly. Make My Documents helped with the entire application — from the correct photo specifications to submitting all proofs. My Egypt visa arrived with 2 weeks to spare. Very impressive!”' },
  { av: 'R', name: 'Ranjith Kumar', svc: 'Egypt Visa on Arrival', text: '”The team briefed me perfectly on Egypt\'s VOA process including what to carry, what forms to fill at the airport, and what cash to keep ready. Because of their guidance, my arrival at Cairo Airport was completely smooth. Very knowledgeable staff.”' },
  { av: 'T', name: 'Tejaswini V.',  svc: 'Egypt Tourist Visa', text: '”Travelling to Egypt for a group tour with 6 friends. Make My Documents processed all our tourist visa applications together and all 6 were approved without issues. Perfect coordination and zero stress for our whole group. 10 out of 10 service!”' },
]

const OTHER_COUNTRIES = [
  { name: 'Dubai (UAE)',     flag: '🇦🇪', path: '/dubai-tourist-visa' },
  { name: 'Singapore',      flag: '🇸🇬', path: '/singapore-visa'     },
  { name: 'United Kingdom', flag: '🇬🇧', path: '/uk-visa'            },
  { name: 'Australia',      flag: '🇦🇺', path: '/australia-visa'     },
  { name: 'Malaysia',       flag: '🇲🇾', path: '/malaysia-visa'      },
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
  { q: 'Do Indian citizens need a visa to travel to Egypt?',
    a: 'Yes, Indian passport holders require a visa to enter Egypt. We assist with Egypt tourist visa applications for Indian citizens.' },
  { q: 'What types of Egypt visas do you help with?',
    a: 'We assist with Egypt tourist visas. Based on your purpose, we guide you with the right documentation.' },
  { q: 'What documents are needed for an Egypt tourist visa?',
    a: 'Common requirements include a passport, recent photograph, confirmed flight tickets, hotel booking, financial proofs, and a cover letter. We provide a full checklist.' },
  { q: 'Is the Egypt visa application process online or offline?',
    a: 'Egypt visa applications for Indian citizens are usually submitted offline via the embassy. We assist with document preparation and appointment booking if needed.' },
  { q: 'How long does it take to get an Egypt visa from India?',
    a: 'Standard Egypt visa processing may take 5–10 working days after submission, depending on embassy workload and document verification.' },
  { q: 'Do I need to visit the Egypt embassy myself?',
    a: "In most cases, you don't have to visit personally. We handle the application submission and collection process for you, wherever possible." },
  { q: 'Is travel insurance required for Egypt visa?',
    a: 'While not always mandatory, having travel insurance is highly recommended. We guide you on what is necessary for smooth visa approval.' },
  { q: 'Can you help with Egypt visa for family or group travel?',
    a: 'Yes, we specialize in group visa processing for families and tour groups. We help ensure all applications are submitted together with proper coordination.' },
  { q: 'Do you provide cover letter drafting for Egypt visas?',
    a: 'Yes, we draft customized cover letters that explain your purpose of visit, travel plan, and financial backing to support your visa application.' },
  { q: 'What happens if my Egypt visa is rejected?',
    a: 'If your visa is denied, we help identify the reason, revise the documents, and guide you through the reapplication process to improve your chances.' },
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
        <Link href="/egypt-visa-form" className="pan-apply-btn">
          Apply Now <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function EgyptVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Egypt Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/egypt hero.jpg" alt="Egypt Pyramids and Nile" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Egypt Visa for Indians</h1>
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
              <div className="uae-stat-val">₹4,798/-</div>
            </div>
          </div>
          <Link href="/egypt-visa-form" className="btn-amber uae-hero-btn">
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
          <div className="uae-plans-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', maxWidth: 640, margin: '0 auto' }}>
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
              <h2>Documents Required For Egypt Visa</h2>
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
                  <li><strong style={{ color: '#F7A418' }}>Rs. 4,798/-</strong> For 30 days Single Entry E-Visa</li>
                  <li><strong style={{ color: '#F7A418' }}>Rs. 6,580/-</strong> For 30 days Multiple Entry E-Visa</li>
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

      {/* â”€â”€ Other Related Services â”€â”€ */}
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Egypt Visa for Indians</h2>
            <p className="ins-body-p">Are you planning a trip to Egypt from India? It does not matter if it is for fun, work, or with family, having the right visa is important. This guide shows you how to get an Egypt visa with an Indian passport. It talks about the different visas you can get, who can apply, and how Make My Documents can help you do it quicker and simpler.</p>

            <h3 className="ins-body-h3">How to Apply for an Egypt Tourist Visa from India</h3>
            <p className="ins-body-p">Thinking about going to Egypt from India? If you want to see the pyramids, go on a Nile trip, or be at a work meet, knowing how to get a visa is key. People with an Indian passport have two main ways to get a tourist visa. With help from Make My Documents, this task is easy, quick, and without worries.</p>

            <h3 className="ins-body-h3">Egypt Visa Application (Recommended for Most Tourists)</h3>
            <p className="ins-body-p">Ideal for short stays up to 30 days, the visa can be applied for entirely online.</p>
            <ul className="pan-bullet-list">
              <li>Suitable for single or multiple entries</li>
              <li>Requires basic documentation (passport scan, photo, itinerary)</li>
              <li>Typically approved within 3–5 working days</li>
            </ul>

            <h3 className="ins-body-h3">How We Simplify the Egypt Visa Process</h3>
            <p className="ins-body-p">Make My Documents offers expert help at every step so you don't miss out on important details.</p>
            <ul className="pan-bullet-list">
              <li>100% remote process: No need to visit our office or the embassy</li>
              <li>Document checks to reduce rejections or delays</li>
              <li>Status updates via WhatsApp and email</li>
              <li>Optional add-ons: flight and hotel bookings for visa purpose</li>
            </ul>

            <h3 className="ins-body-h3">Types of Egypt Visas for Indian Passport Holders</h3>
            <p className="ins-body-p">Egypt gives out different visa types for reasons such as trips, work, or short visits. Finding the right visa is key to a smooth stay. Below are the main visas available for Indian travelers:</p>

            <p className="ins-body-p"><strong>Tourist Visa (One Time/Many Times)</strong></p>
            <ul className="pan-bullet-list">
              <li>Good for trips, fun rides, or meeting family and pals in Egypt.</li>
              <li>A one-time visa lets you in once for 30 days max.</li>
              <li>A visa for many visits works if you want to go a few times in 180 days.</li>
            </ul>

            <p className="ins-body-p"><strong>Business Visa</strong></p>
            <ul className="pan-bullet-list">
              <li>Made for pros going to meetings, shows, or to see clients.</li>
              <li>You need an invite from a group or firm in Egypt.</li>
              <li>You can stay for a short time, usually up to 30 days, with a chance to stay longer.</li>
            </ul>

            <p className="ins-body-p"><strong>Transit Visa</strong></p>
            <ul className="pan-bullet-list">
              <li>You'll need this only if you want to leave the airport during a stop in Egypt.</li>
              <li>Not needed if your stop is less than 24 hours and you stay in the transit area.</li>
              <li>It's handy for long waits if you wish to see Cairo for a bit.</li>
            </ul>

            <p className="ins-body-p"><strong>Student or Work Visas</strong></p>
            <ul className="pan-bullet-list">
              <li>Given to those going to learn or work in Egypt.</li>
              <li>You must apply in person at the Egyptian consulate in India.</li>
              <li>You must have papers like an offer or admission letter, a sponsor, and health clearance.</li>
            </ul>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Egypt Visa Requirements for Indian Citizens</h2>
            <p className="ins-body-p">Egypt Visa Rules for Indian People — before you fill out your Egypt visa form, you must know all the needed steps and paper rules. These rules help the office know why you want to visit and check if you have enough money for your time in Egypt.</p>

            <h3 className="ins-body-h3">Have a Good Indian Passport</h3>
            <p className="ins-body-p">Your Indian passport should be good for at least 6 months after you plan to get to Egypt. Also, make sure it has at least two empty pages for the visa stamp. A torn or almost out-of-date passport might slow things down or lead to a visa rejection, so look it over early.</p>

            <h3 className="ins-body-h3">Book Return Flights &amp; Places to Stay</h3>
            <p className="ins-body-p">You need to show both ways flight tickets and place booking proofs when you ask for a visa. These papers prove that you have a set plan, know where you will stay, and plan to go back after your trip. You don't always have to pay for these bookings, but they must be real.</p>

            <h3 className="ins-body-h3">Show Enough Money</h3>
            <p className="ins-body-p">To show you can pay for the trip, you might need to give bank papers from the last 3 to 6 months, showing good money in it. Having from ₹40,000 to ₹60,000 is usually seen as enough. This money proof helps show you can pay for living, moving, eating, and more by yourself.</p>

            <h3 className="ins-body-h3">Say Why You Are Visiting</h3>
            <p className="ins-body-p">You need to tell why you are going to Egypt — maybe for fun, work, family, or just passing through. A short note or cover letter with details like when, where, and what you plan to do helps the office look at and say yes to your ask quicker and with less question.</p>

            <h3 className="ins-body-h3">Documents Required for Egypt Visa – Indian Applicants</h3>
            <p className="ins-body-p">When you want an Egypt visa online, Indian people must put up clear, easy-to-read digital copies of key papers. All files must be in PDF or JPG type. If you send wrong or incomplete papers, it could slow down your ask or cause a rejection.</p>

            <p className="ins-body-p"><strong>Scanned Copy of Passport</strong><br />
            You need to put up a top scan of the first and last page of your passport. The passport must be good for six months from when you plan to get to Egypt. Check all info like your name, passport number, and picture are clear and full.</p>

            <p className="ins-body-p"><strong>Recent Passport-Size Photo</strong><br />
            Put up a new (taken in the last 6 months) passport-size picture with a white background. The size must be 35mm x 45mm. It should be a proper photo — no selfies, fuzzy pics, or cut-outs from group photos.</p>

            <p className="ins-body-p"><strong>Set Flight Plan</strong><br />
            Put up a copy of your two-way flight ticket. This must show when you leave India and when you come back. A set plan shows why and how long you will be on your trip and shows you plan to come back.</p>

            <p className="ins-body-p"><strong>Hotel Stay or Invite Letter</strong><br />
            You must show where you will stay in Egypt. This can be a set hotel stay or, if with kin or friends, an invite letter from them with a copy of their Egyptian ID or address. It should say how you know them and how long you will stay.</p>

            <p className="ins-body-p"><strong>Last 3 Months' Bank Statement</strong><br />
            Add a bank statement (PDF type) that shows good money moves and enough cash from the last 3 months. This tells the Egyptian authorities that you can pay for your time there, like for travel, food, stay, and if things go wrong.</p>

            <p className="ins-body-p"><strong>Travel Plan or Cover Letter</strong><br />
            Write a short cover letter that tells your travel dates, the towns or spots you will see, and why you are going (for fun, work, or just passing by). This makes your ask clear and helps the visa office see why you are traveling.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Egypt Visa Fees and Processing Time for Indians</h2>
            <p className="ins-body-p">If you want to go to Egypt from India, knowing about visa costs and wait times is key. The price and how long it takes to get a visa can change based on the kind of visa and if you apply online or at a consulate.</p>

            <div style={{ overflowX: 'auto', margin: '20px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th style={{ border: '1px solid #e2e8f0', padding: '12px 16px', textAlign: 'left' }}>Visa Type</th>
                    <th style={{ border: '1px solid #e2e8f0', padding: '12px 16px', textAlign: 'left' }}>Fee (INR Approx.)</th>
                    <th style={{ border: '1px solid #e2e8f0', padding: '12px 16px', textAlign: 'left' }}>Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #e2e8f0', padding: '12px 16px' }}>e-Visa (Tourist)</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '12px 16px' }}>₹4,798 – ₹6,580</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '12px 16px' }}>7–10 working days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="ins-body-h3">Kinds of Visas and Their Cost</h3>
            <p className="ins-body-p"><strong>Single Use Visa:</strong> Good for one visit to Egypt; cheap and best for brief stays.</p>
            <p className="ins-body-p"><strong>Many Times Use Visa:</strong> Lets you go in more than once while the visa is good, but costs more since it lets you do more.</p>

            <h3 className="ins-body-h3">What Makes Getting the Visa Take Time?</h3>
            <p className="ins-body-p"><strong>e-Visa:</strong> Usually quick because it's all done online. But, make sure every paper is right and clear, or it might take longer.</p>
            <p className="ins-body-p"><strong>Sticker Visa:</strong> Needs more time since you must give papers in person at the consulate and they check by hand.</p>

            <h3 className="ins-body-h3">Other Fees Might Add Up</h3>
            <p className="ins-body-p"><strong>Service Costs:</strong> If you ask for help from a place like Make My Documents, they might charge a bit for help with forms, putting up documents, or checking on them.</p>
            <p className="ins-body-p"><strong>Fast Process (if you can):</strong> You might be able to ask for a quicker service for more money (up to the embassy to decide).</p>

            <h3 className="ins-body-h3">What Does the Visa Fee Cover?</h3>
            <ul className="pan-bullet-list">
              <li>Charges for processing by the government or embassy</li>
              <li>Handling and checking your form</li>
              <li>Setting up your visa or putting the stamp from the consulate (depends on the kind)</li>
            </ul>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Eligibility Criteria for Egypt Visa from India</h2>
            <p className="ins-body-p">People from India who want to go to Egypt for fun, work, or short trips need to meet certain rules. Here's a clear list of what you need to be able to ask for an e-Visa or sticker visa:</p>

            <h3 className="ins-body-h3">Valid Indian Passport</h3>
            <p className="ins-body-p">Your passport needs to be good for at least 6 months from when you get into Egypt.</p>
            <p className="ins-body-p">It should have at least 2 blank pages for visa stamps.</p>

            <h3 className="ins-body-h3">Proof of Return Travel</h3>
            <p className="ins-body-p">You must have a booked return flight ticket. This shows you plan to go back to India after your stay and is very important.</p>

            <h3 className="ins-body-h3">Enough Money</h3>
            <p className="ins-body-p">You need to show recent bank statements from the last 3 months. This proves you can pay for your stay, food, and travel in Egypt.</p>

            <h3 className="ins-body-h3">Clear Reason for Visit</h3>
            <p className="ins-body-p">Whether you're going for fun, work, or to see family, you need to clearly say why. A cover letter or travel plan, and an invite if visiting friends or family or going to a work meeting, will support your application.</p>

            <h3 className="ins-body-h3">Good Travel Record</h3>
            <p className="ins-body-p">You should not be on any blacklist or have been turned down for an Egypt visa for no good reason. People with a poor visa history may face additional scrutiny.</p>

            <h3 className="ins-body-h3">Age and Travel Rules</h3>
            <p className="ins-body-p">Young ones flying alone or with one parent might need to give a NOC (No Objection Certificate) from their guardians. Groups need to make sure each person meets the visa rules on their own.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose Us for Your Egypt Visa Application?</h2>
            <p className="ins-body-p">Getting a visa for another country can be hard — but with us, it's easy, safe, and all done from home. Here's why many people from India choose us for their Egypt visa needs:</p>

            <h3 className="ins-body-h3">Visa Help Made Just for You</h3>
            <p className="ins-body-p">Our team looks at your papers and picks the best Egypt visa for your trip needs. This cuts down the risk of being turned down and saves you time and money by not having to deal with wrong forms. You get help that is built for your own case, not just broad tips.</p>

            <h3 className="ins-body-h3">All Done Online</h3>
            <p className="ins-body-p">No need to go to the embassy or wait in lines. You can do all your Egypt visa work online from any place in India. Send your papers via email, WhatsApp, or our safe site. It's secure, fast, and simple — making your whole process worry-free and easy for you.</p>

            <h3 className="ins-body-h3">Quick Approvals, Less Rejections</h3>
            <p className="ins-body-p">We pay close attention to details and follow Egypt visa rules closely. Our team looks at every bit to dodge usual slips that lead to rejections. As a result, our clients get their visas faster, face fewer bumps, and know their forms are handled well.</p>

            <h3 className="ins-body-h3">Help &amp; Updates Anytime</h3>
            <p className="ins-body-p">From start to finish, we keep you in the know. We keep you updated often and you can reach us anytime through WhatsApp or a phone call. Got questions or need quick help? Our team responds fast to make sure your visa journey goes smoothly.</p>

            <h3 className="ins-body-h3">Clear and Fair Costs</h3>
            <p className="ins-body-p">We stand for total clearness — no surprises in fees or hidden charges. You see all costs up front. What you pay is the full price, no extra charges later. It's straight, clear pricing so you can set your travel money with no worry.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

