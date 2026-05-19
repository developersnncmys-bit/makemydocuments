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
  { val: '10,000+', lbl: 'Visas Approved'   },
  { val: '99%',     lbl: 'Delivered on Time' },
  { val: '03–04',   lbl: 'Working Days'      },
  { val: '24/7',    lbl: 'WhatsApp Support'  },
]

const DOCUMENTS = [
  'Flight and Hotel Details',
  'Flight Number',
  'Hotel Name',
  'Passport',
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',               desc: 'Fill your basic details on our secure portal.'           },
  { Icon: Upload,      title: 'Upload Documents',              desc: 'Submit the required documents via WhatsApp or email.'    },
  { Icon: ShieldCheck, title: 'Documents Verification',        desc: 'Our experts review your documents for accuracy.'         },
  { Icon: CreditCard,  title: 'Payment',                       desc: 'Complete the payment securely to process your application.' },
  { Icon: Mail,        title: 'Receive your E-Visa via E-mail', desc: 'Get your approved e-Visa delivered to your inbox.'      },
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',     desc: 'Visa delivered in just 03–04 working days with real-time updates.'  },
  { Icon: BadgeCheck, title: '99% Approval Rate',   desc: 'Expert document review ensures near-perfect visa delivery on time.' },
  { Icon: Headphones, title: '24/7 Support',        desc: 'Dedicated WhatsApp support team available around the clock.'        },
  { Icon: Lock,       title: '100% Online Process', desc: 'From consultation to submission, everything is handled remotely.'   },
]

const REVIEWS = [
  { av: 'A', name: 'Aditya Rao',    svc: 'Malaysia Visa',           text: '”The process was quicker than I imagined. I needed a Malaysia Visa for my family vacation, and Make My Documents handled everything swiftly. I just had to submit the documents — they did the rest.”' },
  { av: 'S', name: 'Sneha Kapoor',  svc: 'Malaysia Visa',           text: '”Clear communication and complete support. Every question I had was answered promptly. The team guided me from start to finish, making the process stress-free. Definitely reliable.”' },
  { av: 'V', name: 'Vikram Joshi',  svc: 'Malaysia Visa',           text: '”I applied from Chennai and didn\'t have to travel anywhere. Their remote support is excellent. I shared my documents via WhatsApp and got my visa processed within a few days. Really convenient.”' },
  { av: 'P', name: 'Padmini Singh', svc: 'Malaysia eVisa',          text: '”Applied for a Malaysia eVisa for a Kuala Lumpur shopping trip. Make My Documents was super fast — submitted everything in one day and the approval came in 3 working days. The team also helped with the hotel booking format required by Malaysian immigration.”' },
  { av: 'G', name: 'Govind Nair',   svc: 'Malaysia Multiple Entry', text: '”Needed a multiple-entry Malaysia visa for frequent business trips between Chennai and KL. Make My Documents prepared a strong application with the right supporting documents and got me a 1-year multiple-entry approval. Very professional and worth every rupee!”' },
  { av: 'R', name: 'Rekha Murthy',  svc: 'Malaysia Visa',           text: '”Took my kids on a holiday to Malaysia and Langkawi. The visa process for the whole family was handled smoothly by Make My Documents. All 4 visas arrived together well before our travel date. Stress-free start to a wonderful holiday!”' },
  { av: 'B', name: 'Bala Subbu',    svc: 'Malaysia eNTRI/eVisa',    text: '”Was confused between eNTRI and regular eVisa for Malaysia. The team at Make My Documents explained the difference clearly and processed the right option for my trip. Got the approval email quickly. Very knowledgeable and helpful staff.”' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa' },
  { name: 'Singapore',            flag: '🇸🇬', path: '/singapore-visa'     },
  { name: 'United Kingdom',       flag: '🇬🇧', path: '/uk-visa'            },
  { name: 'Australia',            flag: '🇦🇺', path: '/australia-visa'     },
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
  { q: 'What types of Malaysia visas do you assist with?',
    a: 'We assist with Malaysia Visa, eNTRI visa, and regular tourist visas depending on your travel purpose and eligibility.' },
  { q: 'Is Malaysia Visa available for Indian citizens?',
    a: 'Yes, Indian citizens are eligible for both Visa and eNTRI options. We help you choose the right one and complete the online application process.' },
  { q: 'Do I need to submit physical documents?',
    a: 'No, all documentation for Malaysia Visa and eNTRI is handled digitally. You can share scanned copies through email or WhatsApp.' },
  { q: 'What is the difference between Malaysia Visa and eNTRI?',
    a: "Visa allows multiple entry options and longer stays, while eNTRI is for short-term, single-entry travel. We'll recommend the best option based on your itinerary." },
  { q: 'How long does it take to get a Malaysia visa from India?',
    a: 'Malaysia Visa typically takes 2–5 working days. eNTRI can be approved within 48 hours in most cases, depending on document verification.' },
  { q: 'What documents are required for a Malaysia tourist visa?',
    a: "You'll need a passport, photograph, confirmed flight ticket, hotel booking, and bank statement. We'll provide a full checklist for you." },
  { q: 'Can I apply for a Malaysia visa from anywhere in India?',
    a: 'Yes, our services are PAN-India. You can apply from any city—our team supports clients remotely through calls and messages.' },
  { q: 'Do you assist with urgent or express visa applications?',
    a: 'Yes, we help with urgent visa filings for Malaysia, including priority Visa and fast-track eNTRI processing when applicable.' },
  { q: 'Is biometric submission required for Malaysia visa?',
    a: 'For Visa and eNTRI, biometrics are not required. However, we will guide you in case the embassy requests additional steps for certain applications.' },
  { q: 'What if my Malaysia visa is rejected?',
    a: 'If your visa is denied, we review the reason and assist you with reapplication, corrections, or alternate visa options if needed.' },
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
        <Link href="/malaysia-visa-form" className="pan-apply-btn">
          Apply Now <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function MalaysiaVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Malaysia Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/Malaysia.jpg" alt="Malaysia" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Malaysia Visa for Indians</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Delivered on time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">03 – 04 working days</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹999/-</div>
            </div>
          </div>
          <Link href="/malaysia-visa-form" className="btn-amber uae-hero-btn">
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
            <h2>Malaysia Visa Charges</h2>
            <p className="sec-desc">Transparent pricing with no hidden charges.</p>
          </div>
          <div className="sgp-charges-wrap">
            <div className="sgp-charge-card">
              <div className="sgp-charge-header" style={{ background: 'linear-gradient(135deg, #cc0001, #003087)' }}>
                <span className="sgp-charge-tag">Normal Application</span>
                <div className="sgp-charge-price">₹999<span>/-</span></div>
                <div className="sgp-charge-sub">per person</div>
              </div>
              <div className="sgp-charge-body">
                <ul className="uae-plan-features">
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Tourist / Business / Transit Visa</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> eNTRI &amp; Regular Visa Assistance</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Expert Document Assistance</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> E-Visa Delivered via Email</li>
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
              <h2>Documents Required For Malaysia Visa</h2>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Malaysia Visa for Indians</h2>
            <p className="ins-body-p">Planning a trip to Malaysia, Whether you're going for tourism, or to meet family, Indian citizens need to apply for a visa before departure. At Make My Documents, we simplify the process and ensure your visa application is accurate, fast, and fully supported—so you can focus on packing your bags, not on paperwork.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How to Apply for a Malaysia Tourist Visa from India</h2>
            <p className="ins-body-p">Getting a Malaysia Tourist Visa from India is easy and all online. People from India can pick from an Visa and an eNTRI, based on their trip plan and aim. At Make My Documents, we handle it all—from aiding you pick the right visa to filing forms and getting it okayed. No need to go to an embassy or stand in long lines.</p>

            <h3 className="ins-body-h3">Can Indians Get a Malaysia Visa on Landing?</h3>
            <p className="ins-body-p">No, folks from India can't get a visa when they land in Malaysia. You need to get either an Visa or eNTRI before you go. If you don't have one, you might not be let in, even if your passport is good.</p>

            <h3 className="ins-body-h3">What's the Difference Between Visa and eNTRI?</h3>
            <p className="ins-body-p">A Malaysia Visa is good for many visits, like for fun, health, or work, and lets you stay longer. The eNTRI (Electronic Travel Registration and Information) works for just one short fun trip. It's perfect for quick trips or short breaks.</p>

            <h3 className="ins-body-h3">How Long to Get a Malaysia Visa?</h3>
            <p className="ins-body-p">Usually, you get the eNTRI in about a day or two. Visas may take around 2 to 4 days. At Make My Documents, we make it easy. We handle the forms, miss the mistakes, and speed it up so you get your visa fast, without worries or hold-ups.</p>

            <h3 className="ins-body-h3">What Do You Need for a Malaysia Tourist Visa?</h3>
            <p className="ins-body-p">To join, grab your valid passport, a fresh photo, your flight tickets, and proof of where you'll be staying. If visiting family, a letter from them may be needed. Don't stress—we'll guide you through each part and ensure all is in place right from the beginning.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Types of Malaysia Visas for Indian Citizens</h2>
            <p className="ins-body-p">Malaysia gives out a lot of visas for different travel plans. If you want a fun trip, have to meet for work, or just pass by, getting the right visa can make it smooth and easy. Picking the wrong one could lead to delays or a full no-go. So, it's very important to know what sets them apart.</p>

            <h3 className="ins-body-h3">Tourist Visa</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>This visa is most often given to Indian people going to Malaysia for fun, to see places, relax, or to meet friends and kin.</li>
              <li>eNTRI lets you enter once for up to 15 days.</li>
              <li>Visa lets you pick from one or more entries, with each stay being up to 30 days.</li>
              <li>Both types are sorted out online, with no need to go to a Malaysian embassy.</li>
            </ul>

            <h3 className="ins-body-h3">Business</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>This visa is for Indian workers or business folks going to Malaysia for:</li>
              <li>Going to meetings, trade shows, or talks.</li>
              <li>Seeking new work chances or signing deals.</li>
              <li>You'll need more papers like a call letter from a firm in Malaysia and proof of work activities.</li>
            </ul>

            <h3 className="ins-body-h3">Transit Visa</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>If you stop in Malaysia on your way to another place and your break is long, you might need a transit visa.</li>
              <li>Not needed if your halt is within the international zone and quick.</li>
              <li>Needed if you leave the airport or your halt goes over 24 hours.</li>
              <li>We can check if you need this visa and help make your application smooth.</li>
            </ul>

            <h3 className="ins-body-h3">Long-Term Visit or Dependent Visa (Not for Tourists)</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>While not for tour use, some might need a long-term visa for things such as:</li>
              <li>Being with kin living in Malaysia</li>
              <li>Getting medical aid</li>
              <li>These visas ask for more papers, like health files, family proof, or hospital letters, and are handled not like tourist or business visas.</li>
            </ul>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Documents Required for Malaysia Visa – Indian Applicants</h2>
            <p className="ins-body-p">To get a Malaysia visa as an Indian, you will need to pass in a full set of papers. It is key to have all your papers full and right to get a fast yes with no holds or no's.</p>

            <h3 className="ins-body-h3">Need a Good Passport</h3>
            <p className="ins-body-p">Your passport should have:</p>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>At least 6 months left until it ends from when you plan to go.</li>
              <li>Two or more blank pages for stamping the visa (if this is needed).</li>
              <li>Be sure your passport has no harm, as this could get it turned down.</li>
            </ul>

            <h3 className="ins-body-h3">New Passport-Size Photo</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>A new color photo with a white back.</li>
              <li>Photo size: most times 35mm x 50mm.</li>
              <li>Face not smiling, no hats (only if for your faith), and must see it well.</li>
            </ul>

            <h3 className="ins-body-h3">Set Flight Back Home</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>Give them a copy of your booked flights to and from.</li>
              <li>This shows that you plan to go back home before the visa runs out.</li>
            </ul>

            <h3 className="ins-body-h3">Place to Stay or Invite</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>Proof of where you will stay, like bookings for all days.</li>
              <li>A letter from a friend in Malaysia, with a copy of their ID if you're staying with them.</li>
            </ul>

            <h3 className="ins-body-h3">Money Proof – Bank Note</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>Hand in your last 3 months' bank note to show that you have enough cash for your visit.</li>
              <li>The note has a bank stamp or sign.</li>
            </ul>

            <h3 className="ins-body-h3">Travel Plan</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>Make a day-by-day list, with cities, dates, and big spots you plan to see.</li>
              <li>Keep it short but complete—enough to show your trip has good plans.</li>
            </ul>

            <h3 className="ins-body-h3">Work Proof or School ID (If This Fits)</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li>Work folks should bring a note from work or a work ID.</li>
              <li>Pupils must attach a valid school ID or a note from their school.</li>
              <li>This checks your links to India and plans to go back home.</li>
            </ul>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Malaysia Visa Fees and Processing Time in India</h2>
            <p className="ins-body-p">Visa fees change with the type and number of entries. eNTRI is less costly and quick, best for short visits. Visa is pricier and slower but lets you enter more often. We'll help you find what fits your travel plan and wallet.</p>

            <h3 className="ins-body-h3">When to Apply for a Malaysia Visa?</h3>
            <p className="ins-body-p">Apply about 10–15 days before you go. This allows time for checking papers, making fixes, and getting okayed. Apply early to cut stress, mainly if you travel during busy times or have other trips planned. We'll show you the best time to apply.</p>

            <h3 className="ins-body-h3">How Much Money Needed in Bank for a Malaysia Visa?</h3>
            <p className="ins-body-p">Your bank report needs to show ₹30,000–₹50,000 to show you can pay for your visit. This proves to border guards you have enough money. Keep your account active and up to date. We help get your money proofs ready for your form.</p>

            <h3 className="ins-body-h3">Why Some Indians Don't Get a Malaysia Visa</h3>
            <p className="ins-body-p">Usual no-go reasons are missing papers, not enough funds, wrong travel plans, unsure travel reasons, mismatched info, or old border issues. Small errors, like a bad photo, can also lead to no. That's why we check all carefully to up your okay odds.</p>

            <h3 className="ins-body-h3">Tips for a Sure Malaysia Visa</h3>
            <p className="ins-body-p">Be true with your travel reasons, double-check forms and papers, and don't book flights or hotels until approved. Give hotel info and a clear plan. We make applying easy and make sure your papers are right.</p>

            <h3 className="ins-body-h3">Can I Extend My Malaysia Visa While There?</h3>
            <p className="ins-body-p">No, most travel visas like eNTRI or Visa can't be made longer while in Malaysia. You must leave before your visa runs out and ask for a new one if needed. Staying too long might harm your visa odds later, so stick to the rules.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose Make My Documents for Your Malaysia Visa Application?</h2>
            <p className="ins-body-p">At Make My Documents, we do more than just fill out forms—we give you a smooth, easy ride to get your visa approved for any trip. Whether it's a trip for fun, work, or family visits, we've got you covered.</p>

            <h3 className="ins-body-h3">Expert Tips from Visa Pros</h3>
            <p className="ins-body-p">Our skilled visa folks look over your papers, get what you want from your trip, and guide you to pick the right visa type. We make sure every detail is just right to cut down on nos or hold-ups.</p>

            <h3 className="ins-body-h3">All Online and From Home</h3>
            <p className="ins-body-p">Jump past lines and trips. With us, your whole visa step—from getting papers to sending them in—is done online. You can do it all from home, with no need to go anywhere.</p>

            <h3 className="ins-body-h3">No Mistakes, Better Yes Rate</h3>
            <p className="ins-body-p">One small slip can mean a no on your visa. We look at each paper with care to meet Malaysia's needs, making your first try more likely to work.</p>

            <h3 className="ins-body-h3">Help for Any Trip Goal</h3>
            <p className="ins-body-p">Whether you are out for fun, work, or to see family, our crew gives help that fits your trip aim. Your visa matches your plans—no guessing.</p>

            <h3 className="ins-body-h3">Clear, True Prices</h3>
            <p className="ins-body-p">You'll know what you pay for—no extra fees, no last-minute costs. Our prices are open, so you can plan your spending with no doubts.</p>

            <h3 className="ins-body-h3">Go Sure with Make My Documents</h3>
            <p className="ins-body-p">From aiding solo travelers to helping big-shot workers, we've helped hundreds get their Malaysia visa right. With Make My Documents, you're not just filling forms—you're gearing up to soar with sureness.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

