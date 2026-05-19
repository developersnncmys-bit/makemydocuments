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
  { val: '4,000+', lbl: 'Visas Approved'    },
  { val: '99%',    lbl: 'Delivered on Time'  },
  { val: '4–7',    lbl: 'Working Days'       },
  { val: '24/7',   lbl: 'WhatsApp Support'   },
]

const VISA_PLANS = [
  { type: 'E-Visa', entry: 'Tourist / Family', price: '₹3,850', tag: 'Most Popular', tagColor: '#F7A418', gradient: 'linear-gradient(135deg,#1a4da8,#2E68B1)' },
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
  'Clear scanned photo with white background',
  'Flight and Hotel Details',
  'Last 3 month bank statement',
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',      desc: 'Visa delivered in 4–7 working days with real-time WhatsApp status updates.'  },
  { Icon: BadgeCheck, title: '99% Delivered on Time', desc: 'Expert document review ensures near-perfect on-time delivery.'              },
  { Icon: Headphones, title: '24/7 Support',          desc: 'Dedicated WhatsApp support team available around the clock.'                },
  { Icon: Lock,       title: '100% Secure',           desc: 'Your data is handled with bank-grade security and full privacy.'            },
]

const REVIEWS = [
  { av: 'V', name: 'Vinay Kumar',    svc: 'Bahrain Visa',        text: '"Great service for first-time applicants. As a first-time traveler to Bahrain, their step-by-step assistance was very helpful and reassuring."' },
  { av: 'T', name: 'Rohit Deshmukh', svc: 'Bahrain Visa',        text: '"Quick turnaround and professional support. I got my Bahrain visa without any delays. The team was responsive and made the whole process smooth."' },
  { av: 'V', name: 'Sneha Menon',    svc: 'Bahrain Visa',        text: '"Highly reliable service. They double-checked my documents and even followed up after visa approval. Felt confident and well-supported throughout."' },
  { av: 'A', name: 'Arjun Sharma',   svc: 'Bahrain Tourist Visa', text: '"Visited Bahrain for the first time and getting the visa was the last thing I wanted to stress about. Make My Documents took care of everything quickly. Got my e-visa in just 4 days. The whole team was very professional and responsive on WhatsApp."' },
  { av: 'F', name: 'Farhana Shaikh', svc: 'Bahrain Visa',        text: '"My employer needed a business visa to Bahrain and they trusted Make My Documents with the application. Documents were checked thoroughly, the visa came through without any problems. We will use their services for all future travel needs."' },
  { av: 'K', name: 'Krishnamurthy B.',svc: 'Bahrain e-Visa',     text: '"Applied for a Bahrain e-visa just 5 days before my travel date. The team worked fast, verified my documents, and delivered the approved e-visa to my email with a full day to spare. Excellent handling of an urgent request!"' },
  { av: 'D', name: 'Divya Krishnan', svc: 'Bahrain Family Visa', text: '"Travelled to Bahrain as a family and Make My Documents handled all 4 of our visa applications simultaneously. No mix-ups, all approved together. Really saved us a lot of time and made our trip planning stress-free."' },
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
  { name: 'Morocco',              flag: '🇲🇦', path: '/morocco-visa'                        },
  { name: 'Qatar',                flag: '🇶🇦', path: '/qatar-visa' },
  { name: 'Russia',               flag: '🇷🇺', path: '/russia-visa' },
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa' },
]

const FAQS = [
  { q: 'Do Indian citizens need a visa to visit Bahrain?',
    a: 'Yes, Indian passport holders require a visa to enter Bahrain. We assist with tourist, and family visit visas.' },
  { q: 'What types of Bahrain visas do you provide assistance for?',
    a: 'We help with tourist visas, family visit visas, and multiple-entry visas.' },
  { q: 'Can I apply for a Bahrain Visa from India?',
    a: 'Yes, Bahrain offers Visa options, and we guide you through the online application and documentation process.' },
  { q: 'What documents are required for a Bahrain visa?',
    a: 'Typically, a valid passport, photographs, travel itinerary, hotel bookings, and financial proofs are needed. We provide a detailed checklist.' },
  { q: 'How long does Bahrain visa processing take?',
    a: 'Processing usually takes 3 to 7 working days depending on the visa type and embassy workload.' },
  { q: 'Do I need to visit the Bahrain embassy in person?',
    a: 'Most applications can be processed online or via agents. We assist to avoid embassy visits unless specifically necessary.' },
  { q: 'Is your Bahrain visa assistance available PAN-India?',
    a: 'Yes, we serve clients across India. You can submit documents digitally and communicate remotely.' },
  { q: 'What happens if my Bahrain visa application is rejected?',
    a: 'In case of rejection, we review the reasons and help with reapplication or alternative visa options.' },
  { q: 'What are your charges for Bahrain visa assistance?',
    a: 'Our fees vary based on the visa type and services provided. Contact us for a transparent quote.' },
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
        <Link href="/bahrain-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function BahrainVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Bahrain Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/bahrain hero.jpg" alt="Bahrain Skyline" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Bahrain Visa for Indians</h1>
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
              <div className="uae-stat-val">₹3,850/-</div>
            </div>
          </div>
          <Link href="/bahrain-visa-form" className="btn-amber uae-hero-btn">
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
              <h2>Documents Required For Bahrain Visa</h2>
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
                  <li><strong style={{ color: '#F7A418' }}>Rs. ₹3,850/-</strong> For Bahrain E-Visa</li>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Bahrain Visa for Indians</h2>
            <p className="ins-body-p">If you plan to go to Bahrain, whether it's for work, fun, or to see family, people from India need to get a visa first. Bahrain, with its strong money flow, new ways to get around, and deep culture, pulls a lot of visitors from India. But, knowing what you need for the visa can be hard, more so if it's your first time.</p>
            <p className="ins-body-p">Here's where MakeMyDocuments can help. We help Indian folks get their Bahrain visa easy and without trouble. From Visa filling to checking your papers, our group makes sure your visa form has no mistakes, is full, and gets in on time. No matter if it's a short fun trip or a work trip, we help at each point—you get to think about having fun in Bahrain, and we deal with the paperwork.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Types of Bahrain Visas Available for Indians</h2>
            <p className="ins-body-p">Bahrain has many visa types for Indian people. They fit many needs like fun trips, work, or seeing family. It's key to pick the right visa to get into the country easy, and not face hold-ups or turn-downs. Here is a list of the main Bahrain visa groups for Indian passport owners:</p>

            <p className="ins-body-p"><strong>Tourist Visa</strong><br />
            Great for Indian people who want to see Bahrain's spots. Places like the Bahrain Fort, Manama Souq, and the high-tech Bahrain World Trade Center are top sites. This visa lasts most likely 14 to 30 days, and you can ask to stay more once you are there. Some might get a Bahrain Visa, based on past trips and if they fit the rules.</p>

            <p className="ins-body-p"><strong>Business Visa</strong><br />
            This visa fits Indian workers who go to business talks, shows, or trade events in Bahrain. You might need an ask letter from a Bahraini firm. Business visas are for one or many visits and last up to 90 days.</p>

            <p className="ins-body-p"><strong>Family Visit Visa</strong><br />
            If your close family or kin live in Bahrain, you can ask for a family visit visa. You need to show papers like a copy of the family's Bahrain stay permit and an ask letter. This visa lets you stay with your family for a short time.</p>

            <p className="ins-body-p"><strong>Transit Visa</strong><br />
            Indian people passing through Bahrain to another place might need a transit visa if their wait is long and they want to leave the airport. These last for about 24 to 72 hours and you often have to ask for them before you go.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Bahrain Visa for Indian Citizens</h2>
            <p className="ins-body-p">The Bahrain Visa is a simple and all-online visa for Indian folks going to Bahrain for fun, work, or to see family for a short time. It makes things easy with a fast, online-only form, cutting out the need for going to the embassy or sending in any paper forms. This has made it a top pick for Indian visitors who only need to stay in Bahrain for a little bit.</p>

            <p className="ins-body-p"><strong>â€¢ Key Pluses of Bahrain Visa for Indians</strong></p>

            <p className="ins-body-p"><strong>â€¢ No Trips to the Embassy or Paper Forms</strong><br />
            You can fill it out from where you live. No need to set up times to meet at the embassy or stand in long lines.</p>

            <p className="ins-body-p"><strong>â€¢ All Steps Online</strong><br />
            From filling in the form and putting in documents to paying the fee—all is done on the web.</p>

            <p className="ins-body-p"><strong>â€¢ Fast Okay Time</strong><br />
            Most Bahrain Visas get okayed in 3 to 5 work days, which is great for last-minute trips.</p>

            <p className="ins-body-p"><strong>â€¢ Choices to Enter Many Times</strong><br />
            Based on why you're going, you might pick a one-time or many-time visa, good from 14 to 90 days.</p>

            <p className="ins-body-p"><strong>â€¢ You Can Stay Longer if Needed</strong><br />
            If things change, you might be able to get more time on your Visa while you are still in Bahrain. This depends on if Immigration says it's okay.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Documents Required for Bahrain Tourist Visa (For Indians)</h2>
            <p className="ins-body-p">When you want to get a Bahrain tourist visa, you must give all the needed files right to avoid late answers or not getting it. These files check who you are, your trip plans, money you have, and plan to come back. Going alone, with family, or to see a friend, getting your papers ready early can help make things go more smoothly. Here is what Indian people need to get a Bahrain tourist visa:</p>

            <p className="ins-body-p"><strong>â€¢ Valid Indian Passport</strong><br />
            Your passport should be good for at least 6 months after you go into Bahrain. Make sure all your details are easy to read and that the passport has at least one empty page for stamps.</p>

            <p className="ins-body-p"><strong>â€¢ Passport-Size Photos</strong><br />
            Give new color photos with a white back. They should follow the visa photo rules (often 40mm x 50mm, no glasses or hats unless for religion).</p>

            <p className="ins-body-p"><strong>â€¢ Sure Travel Plan</strong><br />
            Add round-trip flight tickets to show when you will come and go. This tells the border people that you plan to leave Bahrain when your visa ends.</p>

            <p className="ins-body-p"><strong>â€¢ Proof of Where You Will Stay</strong><br />
            Show a hotel booking or a note from a Bahrain person if you're staying with friends or family. The note should have their CPR number and how to reach them.</p>

            <p className="ins-body-p"><strong>â€¢ Money Proof</strong><br />
            The last 3 to 6 months of bank papers must be shown, proving you have enough money for your visit. This shows you can pay for things while in Bahrain.</p>

            <p className="ins-body-p"><strong>â€¢ Travel Insurance</strong><br />
            You often need good travel insurance for your stay. It should cover health and urgent care.</p>

            <p className="ins-body-p"><strong>â€¢ Filled Visa Form</strong><br />
            Make sure the Bahrain visa form is right, with no spelling errors. Mistakes can cause no visa or delays.</p>

            <p className="ins-body-p"><strong>â€¢ PAN Card Copy</strong><br />
            Some might ask for your PAN card to check who you are and keep records.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Bahrain Visa Processing Time</h2>
            <p className="ins-body-p">Most Indian travelers apply for the Bahrain Visa, which is processed online within 3 to 5 working days. This timeline applies to tourist, and family visit visas. Make sure your documents are complete and error-free to avoid delays.</p>

            <p className="ins-body-p"><strong>Embassy Application Processing (7–10 Working Days)</strong><br />
            When you apply via the Bahrain Embassy (for some unique visa types), it usually takes about 7 to 10 days. You might need more checks, so make sure you give yourself some time.</p>

            <p className="ins-body-p"><strong>Possible Delays</strong></p>
            <p className="ins-body-p">â€¢ Missing or wrong papers</p>
            <p className="ins-body-p">â€¢ Public holidays (in India or Bahrain)</p>
            <p className="ins-body-p">â€¢ More checks by immigration</p>

            <p className="ins-body-p"><strong>Real-Time Visa Tracking</strong><br />
            With MakeMyDocuments, you can track your visa as it happens. We will let you know each step—when you send it, when we look at it, when it gets a yes—so you always know what's going on and can be ready.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose MakeMyDocuments for Bahrain Visa?</h2>
            <p className="ins-body-p">Getting a visa for Bahrain from India can feel too big, with many kinds of visas, needed papers, and ways to turn them in. At MakeMyDocuments, we make it all easy—from checking your papers to putting in your form and keeping track of your approval. If you are going on a trip, seeing family, or going to a work event in Bahrain, we make sure your visa work is easy, quick, and not stressing you out.</p>

            <p className="ins-body-p"><strong>Check Your Papers First</strong><br />
            We look at all your papers—passport, plane tickets, bank info, pictures, and more—to make sure they fit the needs for Bahrain's visa. This cuts down the chance of being turned down for missing or wrong papers.</p>

            <p className="ins-body-p"><strong>Fill Out &amp; Turn In the Visa Form</strong><br />
            Our team does the whole form job, including filling the form right, putting documents on the main website, and turning them in for you. You don't have to sweat over tech problems or mistakes in the form—we handle it.</p>

            <p className="ins-body-p"><strong>Track Your Form in Real-Time</strong><br />
            Keep in the know at every point. We send real-time news on: when the form is turned in, if it's approved, more time to stay if you can, and you won't have to wonder about your visa.</p>

            <p className="ins-body-p"><strong>Clear Prices—No Sneak Fees</strong><br />
            The price you see is the price you pay. Our prices are clear, with no hidden costs. We also aid you in picking the most cost-saving visa, based on why you are going.</p>

            <p className="ins-body-p"><strong>Help with the Right Visa Way</strong><br />
            Not sure if you need an Visa or a visa from the embassy? We look at why you're going and help you pick the right way to get a visa—saving time, cash, and work.</p>

            <p className="ins-body-p"><strong>Help with Making Your Visit Longer</strong><br />
            Already in Bahrain and want to stay more? We help with asking for more time on your visa, showing you the right steps and papers you need to stay more, by the law.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

