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
  { val: '3,000+', lbl: 'Visas Approved'    },
  { val: '99%',    lbl: 'Delivered on Time'  },
  { val: '4–7',    lbl: 'Working Days'       },
  { val: '24/7',   lbl: 'WhatsApp Support'   },
]

const VISA_PLANS = [
  { type: '30 Days', entry: 'Single Entry', price: '₹9,053', tag: 'Most Popular', tagColor: '#F7A418', gradient: 'linear-gradient(135deg,#1a4da8,#2E68B1)' },
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',                desc: 'Fill all the basic details in the application on our secure portal.'   },
  { Icon: Upload,      title: 'Upload Documents',               desc: 'Submit the required documents via WhatsApp or email.'                   },
  { Icon: ShieldCheck, title: 'Documents Verification',         desc: 'Our experts review your documents for accuracy and compliance.'         },
  { Icon: CreditCard,  title: 'Payment',                        desc: 'Complete the payment securely to process your application.'             },
  { Icon: Mail,        title: 'Receive your E-Visa via E-mail', desc: 'Get your approved E-Visa conveniently delivered to your inbox.'         },
]

const DOCUMENTS = [
  'Clear scanned copy of passport front and back copy in colour scanner',
  'Traveler Photo',
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',      desc: 'Visa delivered in 4–7 working days with real-time WhatsApp status updates.'  },
  { Icon: BadgeCheck, title: '99% Delivered on Time', desc: 'Expert document review ensures near-perfect on-time delivery.'              },
  { Icon: Headphones, title: '24/7 Support',          desc: 'Dedicated WhatsApp support team available around the clock.'                },
  { Icon: Lock,       title: '100% Secure',           desc: 'Your data is handled with bank-grade security and full privacy.'            },
]

const REVIEWS = [
  { av: 'V', name: 'Kriti Mehta',   svc: 'Morocco Visa',         text: '"Smooth and easy Morocco visa process. Make My Documents helped me prepare all the necessary documents and submit the application without any hassle. I received my visa promptly."' },
  { av: 'M', name: 'Sanjay Singh',  svc: 'Morocco Visa',         text: '"Excellent guidance and quick updates. Their team was very supportive and answered all my queries patiently. They ensured my visa application was complete and error-free."' },
  { av: 'N', name: 'Reshma Nair',   svc: 'Morocco Visa',         text: '"Perfect service for first-time travelers. I was unsure about the visa requirements, but their detailed checklist and assistance made it simple and stress-free."' },
  { av: 'A', name: 'Amrita Bose',   svc: 'Morocco Tourist Visa', text: '"Was planning a trip to Marrakech and the Sahara Desert. Make My Documents organized all my visa documents, prepared the covering letter, and submitted the application to the Moroccan embassy. Got my sticker visa in 7 working days. The whole experience was seamless!"' },
  { av: 'J', name: 'Jayesh Thakkar', svc: 'Morocco Visa',        text: '"Morocco was a dream destination and Make My Documents turned the visa process into a dream too. They checked my bank statements, covering letter, and hotel bookings to ensure a strong application. Visa approved on the first attempt. Grateful for their professionalism!"' },
  { av: 'S', name: 'Sunita Kulkarni',svc: 'Morocco Tourist Visa', text: '"Solo trip to Morocco — Chefchaouen, Fez, and Casablanca. Make My Documents prepared a detailed itinerary, hotel bookings summary, and all the required documents for the embassy submission. My visa was ready with plenty of time to spare. Excellent service!"' },
  { av: 'K', name: 'Kishore Menon', svc: 'Morocco Visa',         text: '"The Morocco visa documentation was more complex than I expected but the team at Make My Documents handled everything. They told me exactly what the embassy looks for and prepared every document accordingly. Zero rejection, zero stress. Highly recommended!"' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa'                  },
  { name: 'Singapore',            flag: '🇸🇬', path: '/singapore-visa'                      },
  { name: 'United Kingdom',       flag: '🇬🇧', path: '/uk-visa'                             },
  { name: 'Australia',            flag: '🇦🇺', path: '/australia-visa'                      },
  { name: 'Malaysia',             flag: '🇲🇾', path: '/malaysia-visa'                       },
  { name: 'Egypt',                flag: '🇪🇬', path: '/egypt-visa'                          },
  { name: 'Vietnam',              flag: '🇻🇳', path: '/vietnam-tourist-visa'                },
  { name: 'Hong Kong',            flag: '🇭🇰', path: '/hong-kong-tourist-visa-for-indians'  },
  { name: 'Indonesia',            flag: '🇮🇩', path: '/indonesia-tourist-visa-for-indians'  },
  { name: 'Azerbaijan',           flag: '🇦🇿', path: '/azerbaijan-visa'                     },
  { name: 'Oman',                 flag: '🇴🇲', path: '/oman-visa'                           },
  { name: 'Bahrain',              flag: '🇧🇭', path: '/bahrain-visa'                        },
  { name: 'Qatar',                flag: '🇶🇦', path: '/qatar-visa' },
  { name: 'Russia',               flag: '🇷🇺', path: '/russia-visa' },
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa' },
]

const FAQS = [
  { q: 'Do Indian citizens need a visa to visit Morocco?',
    a: 'Yes, Indian passport holders require a visa to enter Morocco. We assist with tourist, and multiple-entry visa applications.' },
  { q: 'What types of Morocco visas do you help with?',
    a: 'We assist with tourist visas, family visit visas, and multiple-entry visas based on your travel purpose.' },
  { q: 'How long does Morocco visa processing take?',
    a: 'Processing times typically range from 7 to 14 working days, depending on the visa type and embassy workload.' },
  { q: 'What documents are required for a Morocco visa?',
    a: 'You will need a valid passport, recent photographs, flight itinerary, hotel booking, financial proofs, and a cover letter. We provide a complete checklist.' },
  { q: 'Can I apply for a Morocco visa online?',
    a: 'Currently, Morocco visa applications must be submitted through the embassy or authorized agents. We assist with document preparation and submission.' },
  { q: 'Do I need to visit the embassy personally?',
    a: 'Depending on the visa type, you may need to visit the embassy for biometrics or interview. We guide you on when and how to do this.' },
  { q: 'Is your service available throughout India?',
    a: 'Yes, our Morocco visa assistance is available PAN-India. You can share documents online and receive support remotely.' },
  { q: 'What happens if my Morocco visa application is rejected?',
    a: 'If your application is refused, we help you understand the reasons and assist with reapplication or alternative visa options.' },
  { q: 'How much do you charge for Morocco visa assistance?',
    a: 'Our fees depend on the visa category and service level. Contact us for a detailed and transparent quote.' },
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
        <Link href="/morocco-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function MoroccoVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Morocco Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/morocco hero.jpg" alt="Morocco Blue City" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Morocco Visa for Indians</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Delivered on time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">04 – 07 working days</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹9,053/-</div>
            </div>
          </div>
          <Link href="/morocco-visa-form" className="btn-amber uae-hero-btn">
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
                    <li><ChevronRight size={14} color="var(--teal)" strokeWidth={2} /> E-Visa via Email</li>
                    <li><ChevronRight size={14} color="var(--teal)" strokeWidth={2} /> Expert Assistance</li>
                    <li><ChevronRight size={14} color="var(--teal)" strokeWidth={2} /> WhatsApp Updates</li>
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
              <h2>Documents Required For Morocco Visa</h2>
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
                  <li><strong style={{ color: '#F7A418' }}>Rs. ₹9,053/-</strong> For Morocco 30 Days Single Entry E-Visa</li>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Morocco Visa for Indians</h2>
            <p className="ins-body-p">See Morocco with ease – Visa made simple for Indian folks Want to roam the markets in Marrakech or spot the blue walls in Chefchaouen, Indians must have a visa to visit Morocco for fun, work, or to meet family. At MakeMyDocuments, we make the Morocco visa steps easy, for a smooth, sure request and fast okays.</p>
            <p className="ins-body-p">Help you can trust, from start to finish. We help you know which visa you need, aid with papers and hand in the form, making sure each part is easy, fast, and no stress. If you're alone, with family, or on work, our folks take care of things so you can think about what's coming.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Types of Morocco Visas Available for Indians</h2>
            <p className="ins-body-p">If you hold an Indian passport and are going to Morocco, you can pick from many visa types, each set for your trip's aim. Whether you want to see Moroccan sites, go to work events, or visit family, there's a visa that fits your plans. Here is a simple look at the main types:</p>

            <p className="ins-body-p"><strong>Tourist Visa</strong><br />
            Good for those traveling for fun, this visa lets Indian folks go to Morocco to check out tourist spots or dive into the culture. It often lets you stay for up to 90 days and can be for one or many trips. You need to show where you'll stay, your return trip tickets, and that you have enough money for the visit.</p>

            <p className="ins-body-p"><strong>Business Visa</strong><br />
            This visa works for Indian business owners, agents, or workers who need to go to meetings, be part of trade shows, sign deals, or look for business chances in Morocco. You usually need an invite letter from the Moroccan business hosting you and a cover letter from your place of work in India.</p>

            <p className="ins-body-p"><strong>Family Visit Visa</strong><br />
            If your plan is to see kin or friends living in Morocco, this visa lets you stay for a short time (up to 90 days). You should give a letter of invitation from them in Morocco, show their living proof, and a copy of their Moroccan ID or living permit.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Documents Required for Morocco Tourist Visa (For Indian Citizens)</h2>
            <p className="ins-body-p">Going to Morocco? To make sure you get your visa without hassles, Indian travelers should get these papers ready. Being right and full stops long waits or a "no" from them:</p>

            <p className="ins-body-p"><strong>â€¢ Good Passport</strong><br />
            Your passport needs to be good for at least six months after your plan to leave Morocco and must have two free pages for the visa stamps.</p>

            <p className="ins-body-p"><strong>â€¢ Filled Visa Form</strong><br />
            Fill out the form right and sign it. Mistakes or not finishing it might slow things down or get it turned away.</p>

            <p className="ins-body-p"><strong>â€¢ Passport Photos</strong><br />
            Hand in two new photos with a white back. They should be 35mm x 45mm, just as the Morocco visa photo rules say.</p>

            <p className="ins-body-p"><strong>â€¢ Flight Plan</strong><br />
            Show a round-trip flight plan with when you will come in and leave Morocco. It's okay to use a plan that's not yet set for the first turn in.</p>

            <p className="ins-body-p"><strong>â€¢ Place to Stay</strong><br />
            You can show a hotel book for all the days or, if you're staying with someone, a letter from them.</p>

            <p className="ins-body-p"><strong>â€¢ Travel Insurance</strong><br />
            You must have a travel insurance for all the time you'll be in Morocco. Make sure it covers health needs.</p>

            <p className="ins-body-p"><strong>â€¢ Bank Info</strong><br />
            Turn in statements from the last 3–6 months to show you have enough money for your trip. They should show regular money in or saving up.</p>

            <p className="ins-body-p"><strong>â€¢ Job Proof</strong><br />
            If you work for someone, add a note from your boss that says what you do, your pay, and that you can take time off. If you work for yourself, show papers for your work and what you earn.</p>

            <p className="ins-body-p"><strong>â€¢ Cover Note</strong><br />
            Write a note yourself that talks about why you're going, how long you'll stay, and your plans there. This helps the embassy see your reasons clear.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose MakeMyDocuments for Your Morocco Visa Assistance?</h2>
            <p className="ins-body-p">Want to see the busy markets of Marrakech or the big dunes of the Sahara? Let MakeMyDocuments make your Morocco visa work easy. We help Indian people at each step to fill out and send their forms right, fast, and clearly.</p>

            <p className="ins-body-p"><strong>â€¢ Help with Your Papers</strong><br />
            Our visa pros check your forms—including your passport, money proof, hotel, and flight plans—to make sure they meet the needs of Morocco's embassy.</p>

            <p className="ins-body-p"><strong>â€¢ Expert Form Help</strong><br />
            We take care of your visa form, set meetings (if needed), and get everything ready to save you time and stop hold-ups.</p>

            <p className="ins-body-p"><strong>â€¢ Clear Costs</strong><br />
            No sudden fees. Our service plans cover all—from help to form sending—set out clear before.</p>

            <p className="ins-body-p"><strong>â€¢ Quick News</strong><br />
            You get news fast on your form status, embassy word, and visa send-off—so you know all.</p>

            <p className="ins-body-p"><strong>â€¢ Help for Tourist &amp; Work Visas</strong><br />
            Be it for fun or work, we guide you in picking the right Morocco visa and meet the rules with trust.</p>

            <p className="ins-body-p"><strong>â€¢ Smooth Help</strong><br />
            Our full help has embassy meeting advice (if needed), letter help, and even travel insurance help—making it all easy for you.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

