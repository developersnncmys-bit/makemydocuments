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
  { val: '04–07',   lbl: 'Working Days'      },
  { val: '24/7',    lbl: 'WhatsApp Support'  },
]

const DOCUMENTS = [
  'Clear scanned copy of passport front and back copy in colour scanner',
  'Clear scanned photo with white background',
  'Flight and Hotel Details',
  'Last 3 month bank statement',
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',                desc: 'Fill all the basic details in the application on our secure portal.'         },
  { Icon: Upload,      title: 'Upload Documents',               desc: 'Submit the required documents via WhatsApp or email.'                         },
  { Icon: ShieldCheck, title: 'Documents Verification',         desc: 'Our experts review your documents for accuracy and compliance.'               },
  { Icon: CreditCard,  title: 'Payment',                        desc: 'Complete the payment securely to process your application.'                   },
  { Icon: Mail,        title: 'Receive your E-Visa via E-mail', desc: 'Get your approved E-Visa conveniently delivered to your inbox.'               },
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',     desc: 'Visa delivered in just 04–07 working days with real-time updates.'  },
  { Icon: BadgeCheck, title: '99% Approval Rate',   desc: 'Expert document review ensures near-perfect visa delivery on time.' },
  { Icon: Headphones, title: '24/7 Support',        desc: 'Dedicated WhatsApp support team available around the clock.'        },
  { Icon: Lock,       title: '100% Online Process', desc: 'From consultation to submission, everything is handled remotely.'   },
]

const REVIEWS = [
  { av: 'A', name: 'Anusha Kumar',   svc: 'Uzbekistan Visa',         text: '"Transparent pricing with no surprises. I appreciated the clear communication about fees and regular updates on my visa status."' },
  { av: 'R', name: 'Rahul Mehta T',  svc: 'Uzbekistan Visa',         text: '"Excellent coordination and support. They ensured all my documents were in order and submitted on time. The whole process was quick and hassle-free."' },
  { av: 'P', name: 'Pooja Nambiar',  svc: 'Uzbekistan Visa',         text: '"Great experience from start to finish. Their team was knowledgeable, professional, and very responsive. Got my Uzbekistan visa without any stress."' },
  { av: 'S', name: 'Satish Naidu',   svc: 'Uzbekistan e-Visa',       text: '"Was planning a trip to Samarkand and Bukhara — the ancient Silk Road cities. Make My Documents helped me get the Uzbekistan e-visa quickly and efficiently. They even advised on the best travel dates and entry points. Visa approved within 4 days. Wonderful team!"' },
  { av: 'L', name: 'Laxmi Prasad',   svc: 'Uzbekistan Tourist Visa', text: '"Uzbekistan is becoming a popular destination and Make My Documents was well-prepared for the visa requirements. They submitted my e-visa application on day one and I received my approval in 5 working days. The team was very responsive to all my WhatsApp queries."' },
  { av: 'M', name: 'Mythili Rao',    svc: 'Uzbekistan Visa',         text: '"Visiting Tashkent for a cultural exchange program. Make My Documents sorted my Uzbekistan visa documentation flawlessly — photos, passport scans, travel itinerary. No corrections were needed and the visa was approved smoothly. Very professional and reliable service!"' },
  { av: 'C', name: 'Chaitanya Kumar', svc: 'Uzbekistan e-Visa',      text: '"Travelled to Uzbekistan on a group tour of 5 people. Make My Documents processed all 5 e-visa applications together without any errors. All approved simultaneously within 5 days. Perfect coordination and hassle-free experience. Strongly recommend for group travel!"' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa'                   },
  { name: 'Singapore',            flag: '🇸🇬', path: '/singapore-visa'                       },
  { name: 'United Kingdom',       flag: '🇬🇧', path: '/uk-visa'                              },
  { name: 'Australia',            flag: '🇦🇺', path: '/australia-visa'                       },
  { name: 'Malaysia',             flag: '🇲🇾', path: '/malaysia-visa'                        },
  { name: 'Egypt',                flag: '🇪🇬', path: '/egypt-visa'                           },
  { name: 'Hong Kong',            flag: '🇭🇰', path: '/hong-kong-tourist-visa-for-indians'   },
  { name: 'Vietnam',              flag: '🇻🇳', path: '/vietnam-tourist-visa'                 },
  { name: 'Indonesia',            flag: '🇮🇩', path: '/indonesia-tourist-visa-for-indians'   },
  { name: 'Azerbaijan',           flag: '🇦🇿', path: '/azerbaijan-visa'                      },
  { name: 'Oman',                 flag: '🇴🇲', path: '/oman-visa'                            },
  { name: 'Morocco',              flag: '🇲🇦', path: '/morocco-visa'                         },
  { name: 'Bahrain',              flag: '🇧🇭', path: '/bahrain-visa'                         },
  { name: 'Qatar',                flag: '🇶🇦', path: '/qatar-visa'                           },
  { name: 'Russia',               flag: '🇷🇺', path: '/russia-visa' },
]

const FAQS = [
  { q: 'Do Indian citizens need a visa to travel to Uzbekistan?',
    a: 'Yes, Indian passport holders require a visa to enter Uzbekistan. We assist with tourist, and Visa applications.' },
  { q: 'What types of Uzbekistan visas do you help with?',
    a: 'We help with tourist visas, transit visas, and Visas.' },
  { q: 'Can I apply for an Uzbekistan Visa from India?',
    a: 'Yes, Indian citizens are eligible for Uzbekistan Visa. We guide you through the online application and document submission.' },
  { q: 'What documents are needed for an Uzbekistan visa?',
    a: 'You need a valid passport, recent photographs, travel itinerary, hotel bookings, and financial proofs. We provide a detailed checklist.' },
  { q: 'How long does Uzbekistan visa processing take?',
    a: 'Processing typically takes 5 to 10 working days depending on visa type and embassy workload.' },
  { q: 'Do I need to visit the Uzbekistan embassy in person?',
    a: 'Most applications can be submitted online or through agents. We assist to minimize or avoid embassy visits.' },
  { q: 'Do I need to submit my passport for an Uzbekistan e-visa?',
    a: 'For an e-visa, you only need to upload scanned copies of your passport and supporting documents. For sticker visas, the physical passport submission is required.' },
  { q: 'What are your charges for Uzbekistan visa assistance?',
    a: 'Our service fees vary depending on the visa type and the level of support you require. Please contact us for a clear and detailed quote.' },
  { q: 'Can you provide guidance on documents required for an Uzbekistan visa?',
    a: 'Yes, we give you a checklist of required documents such as a valid passport, photographs, invitation letters (if needed), and proof of travel and accommodation.' },
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
        <Link href="/uzbekistan-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function UzbekistanVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Uzbekistan Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/Uzbekistan hero.jpg" alt="Uzbekistan" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Uzbekistan Visa for Indians</h1>
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
          <Link href="/uzbekistan-visa-form" className="btn-amber uae-hero-btn">
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
              <h2>Documents Required For Uzbekistan Visa</h2>
              <ul className="pan-bullet-list" style={{ marginTop: 16 }}>
                {DOCUMENTS.map((d, i) => (
                  <li key={i}>{d}</li>
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
                  <li><strong style={{ color: '#F7A418' }}>Rs. ₹3,850/-</strong> For Uzbekistan E-Visa</li>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Uzbekistan Visa for Indians</h2>
            <p className="ins-body-p">Want to see the great culture, old Silk Road cities, or work chances in Uzbekistan? Make My Documents gives full help for Uzbekistan visa for Indian people—from start to end. If you're getting a tourist visa, work visa, or visa, we make it easy, with no stress. We keep you updated and give help just for you.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How to Apply for Uzbekistan Visa from India</h2>
            <p className="ins-body-p">Getting a visa for Uzbekistan from India is now quick, easy, and all online for most. You might be visiting for fun, work, or to stay a while, but there are many visa types just right for Indian folks. Choose from visa ease to embassy help, and we'll help you all through your planning.</p>

            <h3 className="ins-body-h3">Help from Visa Agents</h3>
            <p className="ins-body-p">Don't like paperwork? Our group can help with online forms, checking files, setting up times to meet, and keeping track of everything from start to finish.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Uzbekistan Tourist Visa Requirements for Indian Citizens</h2>
            <p className="ins-body-p">Heading to Uzbekistan for fun? If you're from India, you need to get a tourist visa before you go. You can pick a simple visa for short trips or a multiple-entry visa if you'll go more than once in a few months. We make the whole thing easy and free from stress.</p>

            <h3 className="ins-body-h3">Single-Entry Visa (Tourism)</h3>
            <p className="ins-body-p">Good for 90 days and you can stay up to 30 days. Great for solo trips, couples, or family trips — apply all online with no need to go to the embassy.</p>

            <h3 className="ins-body-h3">Multiple-Entry Tourist Visa</h3>
            <p className="ins-body-p">Perfect for those who travel often. You need to apply through the Uzbekistan Embassy and bring extra papers like a visa invite letter and a fixed travel plan.</p>

            <h3 className="ins-body-h3">Papers &amp; Support Letter</h3>
            <p className="ins-body-p">We help put together your papers (passport, photos, travel plan) and give visa support letters you need to get it approved — this is key for embassy needs.</p>

            <h3 className="ins-body-h3">Extra Travel Help</h3>
            <p className="ins-body-p">Need help with fake flight bookings, hotel stays, or travel insurance? We have extra options to make your visa steps simpler.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Apply Uzbekistan Visa Online in Minutes</h2>
            <p className="ins-body-p">Getting your Uzbekistan Visa is now quick, easy, and free from stress with Make My Documents. No need to go to the embassy. No hard forms. Just some easy steps and you're set!</p>

            <h3 className="ins-body-h3">Step 1: Fill in Our Online Form</h3>
            <p className="ins-body-p">Put in your basic travel and passport info on our safe and easy-to-use form.</p>

            <h3 className="ins-body-h3">Step 2: Upload Files</h3>
            <p className="ins-body-p">Just scan and upload the front of your passport and a photo the size of a passport — we handle how it looks.</p>

            <h3 className="ins-body-h3">Step 3: Pay with Care</h3>
            <p className="ins-body-p">Pick your visa type, pay online safely, and get a quick "yes" from us.</p>

            <h3 className="ins-body-h3">Step 4: We Take Over</h3>
            <p className="ins-body-p">Our team checks your files, fills in the official visa form, and keeps an eye on your request until it gets a yes.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose Make My Documents?</h2>
            <p className="ins-body-p">Setting up a trip outside your country can seem like too much — but getting your visa doesn't need to be hard. At Make My Documents, we make every step easy, helping your Uzbekistan visa process go smooth and without any stress.</p>

            <h3 className="ins-body-h3">Loved by over 1000 Clients in India</h3>
            <p className="ins-body-p">We have a strong past of real good stories from travelers, workers, and families all over India.</p>

            <h3 className="ins-body-h3">Clear Prices, No Hidden Costs</h3>
            <p className="ins-body-p">What you see is what you pay. We show clear price lists with no shocks at the end.</p>

            <h3 className="ins-body-h3">Full Help with Papers</h3>
            <p className="ins-body-p">From filling out forms to checking your documents — we help you all the way to make sure there are no mistakes and quick approval.</p>

            <h3 className="ins-body-h3">Quick Results</h3>
            <p className="ins-body-p">Get your visa done in a few work days — with constant new info and quick check-ins.</p>

            <h3 className="ins-body-h3">Help by Call, WhatsApp &amp; Face-to-Face</h3>
            <p className="ins-body-p">Need a hand? Talk to us how you like. We're here on call, chat, and ready to meet at our place.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

