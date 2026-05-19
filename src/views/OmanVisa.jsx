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
  'Traveler Photo',
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
  { av: 'G', name: 'Gaurav Malhotra', svc: 'Oman Visa',         text: '"Great service for first-time travelers. As a first-time Oman visitor, I found their step-by-step guidance very reassuring. They made sure my application was complete and accurate."' },
  { av: 'R', name: 'Rajeev Nair T',   svc: 'Oman Visa',         text: '"Smooth and reliable experience. The team handled my Oman visa application professionally and kept me informed at every stage. No last-minute surprises."' },
  { av: 'M', name: 'Megha Sinha',     svc: 'Oman Visa',         text: '"Very helpful and responsive. I had some doubts about the documents needed for Oman tourist visa, but they explained everything clearly and patiently."' },
  { av: 'S', name: 'Sriram Chandran', svc: 'Oman Tourist Visa', text: '"Visited Muscat and Salalah for the Khareef season and Make My Documents sorted my Oman tourist visa within 5 days. They prepared a neat application with all supporting documents and guided me on what to carry at the airport. Wonderful service from start to finish!"' },
  { av: 'A', name: 'Asha Pillai',     svc: 'Oman Single Entry Visa', text: '"Applied for an Oman single-entry visa for a family trip. The team was very thorough — they checked our passports, photos, hotel booking, and return tickets before submitting. All approved together with no issues. Very professional and reliable."' },
  { av: 'P', name: 'Pradeep Kumar',   svc: 'Oman e-Visa',       text: '"Was travelling to Oman for a business meeting and needed the visa urgently. Make My Documents processed my Oman e-visa application on priority and delivered the approval in just 4 working days. Saved my business trip. Outstanding team!"' },
  { av: 'V', name: 'Vidya Menon',     svc: 'Oman Visa',         text: '"The team\'s knowledge of Oman visa requirements was very impressive. They guided me on the right type of visa, financial proofs needed, and hotel booking format. My visa was approved first attempt. Very satisfied with the entire experience."' },
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
  { name: 'Morocco',              flag: '🇲🇦', path: '/morocco-visa' },
  { name: 'Bahrain',              flag: '🇧🇭', path: '/bahrain-visa' },
  { name: 'Qatar',                flag: '🇶🇦', path: '/qatar-visa' },
  { name: 'Russia',               flag: '🇷🇺', path: '/russia-visa' },
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa' },
]

const FAQS = [
  { q: 'Do Indian citizens need a visa to travel to Oman?',
    a: 'Yes, Indian passport holders require a visa to visit Oman. We assist with tourist, and visit visas.' },
  { q: 'What types of Oman visas do you assist with?',
    a: 'We help with tourist visas, family visit visas, and multiple-entry visas.' },
  { q: 'Can I apply for an Oman Visa from India?',
    a: 'Yes, Oman offers Visa services, and we guide you through the online application and document submission process.' },
  { q: 'What documents are required for an Oman visa?',
    a: 'Generally, a valid passport, recent photographs, travel itinerary, hotel bookings, and financial proof are needed. We provide a detailed checklist tailored to your visa type.' },
  { q: 'How long does Oman visa processing take?',
    a: 'Processing usually takes 5 to 7 working days, depending on the visa category and embassy workload.' },
  { q: 'Do I need to visit the Oman embassy in person?',
    a: 'Most applications can be processed online or via agents. We assist you to avoid embassy visits unless specifically required.' },
  { q: 'Is your Oman visa assistance available across India?',
    a: 'Yes, our services cover clients from all Indian cities. Documents can be shared digitally, and we communicate remotely.' },
  { q: 'What happens if my Oman visa application is rejected?',
    a: 'In case of rejection, we review the reasons and assist with reapplication or alternative visa options.' },
  { q: 'How much do you charge for Oman visa assistance?',
    a: 'Our fees vary based on visa type and services offered. Contact us for a transparent and detailed quote.' },
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
        <Link href="/oman-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function OmanVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Oman Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/oman hero.jpg" alt="Oman" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Oman Visa for Indians</h1>
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
              <div className="uae-stat-val">₹4,015/-</div>
            </div>
          </div>
          <Link href="/oman-visa-form" className="btn-amber uae-hero-btn">
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
              <h2>Documents Required For Oman Visa</h2>
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
                  <li><strong style={{ color: '#F7A418' }}>Rs. ₹4,015/-</strong> For Oman 10 Day E-Visa</li>
                  <li><strong style={{ color: '#F7A418' }}>Rs. ₹7,776/-</strong> For Oman 30 Day E-Visa</li>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Oman Visa for Indians</h2>
            <p className="ins-body-p">If you are from India and want to go to Oman, now it is easy to reach this lovely Gulf land. Oman gives out Visas by some rules. If you want a nice break, need to meet family, or are just moving through, know the right visa kind and get your papers right to keep away from hold-ups or no's.</p>
            <p className="ins-body-p">At Make My Documents, we make it easy to get your Oman visa. Our team aids you at each phase. They aid you in choosing the best visa, look at your papers, They help you pick the right visa, check your papers, help with filling out forms online, and update you on the progress. It doesn't care if you are in Mumbai, Delhi, Bangalore, or any other city in India. We make sure your visa work goes well. You don't have to go to the embassy or face hard paperwork.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Types of Oman Visas for Indian Citizens</h2>
            <p className="ins-body-p">People from India have many ways to go into Oman, each made for different travel needs—like a trip, short pass, or brief stays if they meet certain rules. Here's a fast look to help you pick the best one for your trip needs:</p>

            <h3 className="ins-body-h3">Tourist Visa (10-day)</h3>
            <p className="ins-body-p">You can pick a 10-day (Type 26A). Use them within 90 days of getting them. They are great for holiday fun or quick private visits.</p>

            <h3 className="ins-body-h3">Transit Visa (3-day)</h3>
            <p className="ins-body-p">Good for stops or if you have to change planes in Oman, this visa lets you stay for up to 72 hours. It fits only some cases and you often need to show your next flight plans.</p>

            <h3 className="ins-body-h3">Visa on Arrival (14-day free stay)</h3>
            <p className="ins-body-p">If you have an Indian passport with a good visa or stay paper from places like the US, UK, Canada, the Schengen area, Japan, or Australia, you can get a 14-day visa right when you arrive. You must have a hotel booked and a flight back home.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How to Apply for an Oman Visa from India</h2>
            <p className="ins-body-p">Now, Indian travelers can get an Oman visa quick and easy, all due to the new Visa system. You can opt to apply by yourself or ask for help from a visa pro to make it simpler.</p>

            <p className="ins-body-p"><strong>â€¢ Use Visa Helpers like MakeMyDocuments</strong><br />For smooth help, you can turn to MakeMyDocuments. There, pros help with filling out forms, checking papers, and keeping track of your request to dodge rejections or hold-ups.</p>

            <p className="ins-body-p"><strong>â€¢ Go to the Embassy (In Rare Cases)</strong><br />Only in rare times, like for long stays, work visas, or when more checks are needed, you must go to the Oman Embassy or Consulate.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Documents Required for Oman Tourist Visa (Indian Citizens)</h2>
            <p className="ins-body-p">To get a tourist visa for Oman, Indian people need to ready key papers. These check who you are, where you plan to go, and if you have money for your visit. If you give incomplete or wrong info, you might get turned down, so make sure to look over your papers well.</p>

            <p className="ins-body-p"><strong>â€¢ Valid Passport</strong><br />Your passport must be good for at least 6 months from when you plan to go into Oman.</p>

            <p className="ins-body-p"><strong>â€¢ Passport-Size Photo</strong><br />You need a fresh color photo with a white back (about 4.5 x 3.5 cm). Stick to the normal rules for a visa photo.</p>

            <p className="ins-body-p"><strong>â€¢ Confirmed Return or Onward Flight Ticket</strong><br />Show you have a round-trip ticket to prove you will leave Oman before the visa runs out.</p>

            <p className="ins-body-p"><strong>â€¢ Hotel Booking or Invitation Letter</strong><br />Give your hotel booking or an invite letter from someone in Oman as proof of where you will stay.</p>

            <p className="ins-body-p"><strong>â€¢ Bank Statement or Proof of Funds</strong><br />Sometimes, you might need to show recent bank papers to prove you have enough money for your trip.</p>

            <p className="ins-body-p"><strong>â€¢ Completed e-Visa Application Form</strong><br />Fill in your personal, travel, and passport info right on the online form to keep away from delays or no's.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Processing Time for Oman Visa</h2>
            <p className="ins-body-p">Understanding visa wait times helps you plan your trip and stay away from last-minute issues. How fast you can get your Oman Visa relies on the visa kind, how correct your form is, and whether you choose normal or quick processing.</p>

            <p className="ins-body-p"><strong>â€¢ Normal Processing Time (3–5 Working Days)</strong><br />Most Oman tourist e-Visas from India get done in 3 to 5 working days, not including weekends or Omani public days off. This is the usual time if you use the official Oman Visa site.</p>

            <p className="ins-body-p"><strong>â€¢ Fast Processing (1–3 Days)</strong><br />Some other sites or visa help people give faster options, often getting the visa done in 1 to 3 working days. But, these choices tend to cost more.</p>

            <p className="ins-body-p"><strong>â€¢ Things That May Make Processing Slow</strong><br />Not full forms, mistakes in your papers, or lots of people applying at the same time can make the wait longer. Always check your info well and put up clear, right papers to keep delays low.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose MakeMyDocuments for Your Oman Visa Assistance</h2>
            <p className="ins-body-p">Planning a trip to Oman, Let MakeMyDocuments handle the visa process while you focus on your travel plans. As a trusted name in visa facilitation, we help Indian citizens navigate the Oman tourist visa process smoothly and stress-free.</p>

            <p className="ins-body-p"><strong>â€¢ Expert Documentation Support</strong><br />Our team carefully verifies your passport, photograph, and other required documents to ensure everything is in order—avoiding common mistakes that lead to rejections.</p>

            <p className="ins-body-p"><strong>â€¢ Error-Free Online Submission</strong><br />We fill and submit your e-Visa application accurately, helping you skip confusing government forms and long wait times.</p>

            <p className="ins-body-p"><strong>â€¢ Transparent Pricing</strong><br />No hidden charges. You'll know exactly what you're paying for with clear breakdowns of visa fees and any applicable service costs.</p>

            <p className="ins-body-p"><strong>â€¢ Real-Time Application Tracking</strong><br />Stay informed with timely updates on your visa status—so you're never left wondering what's next.</p>

            <p className="ins-body-p"><strong>â€¢ All Visa Types Covered</strong><br />Whether you need a 10-day visa, 30-day visa, or transit visa, we offer end-to-end support for the right visa based on your travel plan.</p>

            <p className="ins-body-p"><strong>â€¢ 100% Online Process</strong><br />Skip embassy visits and courier hassles. Everything is done online—fast, secure, and convenient.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

