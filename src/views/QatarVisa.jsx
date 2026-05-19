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
  { av: 'A', name: 'Aditi Saxena',  svc: 'Qatar Visa',         text: '"Smooth and quick Qatar visa process. Make My Documents handled my application efficiently and kept me updated throughout. I received my visa without any delays."' },
  { av: 'K', name: 'Karan Joshi',   svc: 'Qatar Visa',         text: '"Professional and helpful team. Their staff guided me through all the requirements and made sure my documents were perfect before submission."' },
  { av: 'A', name: 'Arvind',        svc: 'Qatar Visa',         text: '"Transparent pricing and timely communication. I appreciated the clear fees and regular updates on my visa status."' },
  { av: 'S', name: 'Sharmila Devi', svc: 'Qatar Tourist Visa', text: '"Visited Doha for a stopover and wanted to explore the city. Make My Documents sorted my Qatar tourist visa quickly and also guided me on the transit requirements. The visa came through in 5 days. Very smooth process and excellent support on WhatsApp."' },
  { av: 'V', name: 'Vasanth Raj',   svc: 'Qatar e-Visa',       text: '"Needed a Qatar visa for a corporate event in Doha. The team helped prepare all the business-related supporting documents and submitted the application the same day. Got my e-visa approved in 4 working days. Professional and efficient team!"' },
  { av: 'T', name: 'Tanya Verma',   svc: 'Qatar Visa',         text: '"Travelling to Qatar with my family for a short holiday. Make My Documents processed all 3 visas together and kept us informed at every step. The entire process was completely online and hassle-free. Visas arrived well before our departure date."' },
  { av: 'N', name: 'Narayanan K.',  svc: 'Qatar Tourist Visa', text: '"First visit to Qatar and the visa process was my biggest concern. Make My Documents removed all that stress — they verified every document carefully before submission and the visa approval came through without any corrections needed. Truly professional service!"' },
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
  { name: 'Russia',               flag: '🇷🇺', path: '/russia-visa' },
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa' },
]

const FAQS = [
  { q: 'Do Indian citizens need a visa to travel to Qatar?',
    a: 'Yes, Indian passport holders require a visa to enter Qatar. We assist with tourist, and visit visas.' },
  { q: 'What types of Qatar visas do you assist with?',
    a: 'We help with tourist visas, family visit visas, and multiple-entry visas.' },
  { q: 'Can I apply for a Qatar Visa from India?',
    a: 'Yes, Qatar offers Visa services, and we guide you through the online application and document submission process.' },
  { q: 'What documents are needed for a Qatar visa?',
    a: 'Generally, a valid passport, recent photographs, travel itinerary, hotel bookings, and financial proof are required. We provide a detailed checklist.' },
  { q: 'How long does Qatar visa processing take?',
    a: 'Processing typically takes 3 to 7 working days depending on visa type and embassy workload.' },
  { q: 'Do I need to visit the Qatar embassy in person?',
    a: 'Most applications can be processed online or through agents. We assist to avoid embassy visits unless necessary.' },
  { q: 'Is your Qatar visa assistance available PAN-India?',
    a: 'Yes, our services cover clients nationwide. You can submit documents digitally and communicate remotely.' },
  { q: 'What happens if my Qatar visa application is rejected?',
    a: 'If your application is rejected, we review the reasons and help with reapplication or alternative visa options.' },
  { q: 'What are your charges for Qatar visa assistance?',
    a: 'Our fees depend on visa type and service level. Contact us for a clear and transparent quote.' },
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
        <Link href="/qatar-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function QatarVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Qatar Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/qatar hero.jpg" alt="Qatar" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Qatar Visa for Indians</h1>
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
          <Link href="/qatar-visa-form" className="btn-amber uae-hero-btn">
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
              <h2>Documents Required For Qatar Visa</h2>
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
                  <li><strong style={{ color: '#F7A418' }}>Rs. ₹3,850/-</strong> For Qatar E-Visa</li>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Qatar Visa for Indians</h2>
            <p className="ins-body-p">Going to Qatar from India for fun, work, or to be with family means you need the right Qatar visa. Its big cities, deep culture, and strong money pull in many Indian visitors each year. Yet, sorting out visa kinds, required documents, and embassy tasks is tough. That's why we step in—we simplify your Qatar visa process and help you get your visa quickly.</p>
            <p className="ins-body-p">Our team helps Indian passport owners get tourist visas, work visas, and family visit visas to Qatar. We give a list of needed papers, help fill out forms, check papers for right info, and send them in — you won't have to wait in long lines or go to embassies. With our up-to-date tracking and help that answers fast, we keep you in the loop until your visa is good to go.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Your Trusted Partner for Qatar Visa Assistance from India</h2>
            <p className="ins-body-p">Getting a Qatar visa from India can be hard due to always changing needs, types, and ways. At MakeMyDocuments, we make this quick, clear, and sure. Be it a short fun trip, a work trip, or seeing your loved ones, our visa pros help you get the right papers, dodge mistakes, and ensure on-time hand-in — so you think about your journey, not files.</p>

            <h3 className="ins-body-h3">Help From Pros for All Visa Types</h3>
            <p className="ins-body-p">We help with Tourist, and Family Visit Visas based on why you go. Our team helps you pick the right visa type and know the new rules and who can go.</p>

            <h3 className="ins-body-h3">No Mistakes in Your Papers</h3>
            <p className="ins-body-p">Wrong or lost papers are a big cause for no's. We look over your passport, photos, tickets, bank stuff, and any invites well to make sure all is right before we send them in.</p>

            <h3 className="ins-body-h3">We Handle Your Online Form</h3>
            <p className="ins-body-p">No need to sweat over hard forms or tech steps. We fill in and send your Qatar visa form online, follow where it stands, and keep you in the loop — so you're worry-free.</p>

            <h3 className="ins-body-h3">Clear Steps with New News</h3>
            <p className="ins-body-p">We give full clear info on time needed, costs, and steps of making it. You'll hear from us often on status, and our help team is here all the time to answer questions or help more.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Types of Qatar Visas We Assist With</h2>

            <h3 className="ins-body-h3">Tourist Visa</h3>
            <p className="ins-body-p">Plan to take a trip to Doha, have a luxe stay, or go on a desert ride? We make getting your Qatar tourist visa easy. We guide you on how to fill out your forms right, put them in fast, and keep you in the know all the time—so you can just enjoy your trip.</p>

            <h3 className="ins-body-h3">Business Visa</h3>
            <p className="ins-body-p">Going to Qatar for talks, shows, or work events? We help with all the right forms, make sure you have good invite letters, and get things done on time to stop any last-minute hold-ups or no's.</p>

            <h3 className="ins-body-h3">Family Visit Visa</h3>
            <p className="ins-body-p">Going to see your family in Qatar? It does not matter if it's close or far family, we help you get all the right papers and fill out every form with ease.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Qatar Visa Application Process for Indians</h2>

            <p className="ins-body-p"><strong>â€¢ Meet &amp; Check If You Can Go</strong><br />First off, we sit down for a quick meet to learn why you want to travel and see if you're fit for the right Qatar visa.</p>

            <p className="ins-body-p"><strong>â€¢ Gather &amp; Check Papers</strong><br />Our crew helps pull together all needed papers and checks them well to dodge usual slip-ups that might slow things down or lead to nos.</p>

            <p className="ins-body-p"><strong>â€¢ Fill Out Forms</strong><br />We fill in your visa forms—on the net or by hand—making sure all fits with your papers and fits what the embassy asks for.</p>

            <p className="ins-body-p"><strong>â€¢ Send to Embassy or Online</strong><br />Dependent on what visa you need, we send your form either through the net or to the right embassy setting.</p>

            <p className="ins-body-p"><strong>â€¢ Updates as They Happen</strong><br />You'll get news by email or WhatsApp, so you always know what is up with your app.</p>

            <p className="ins-body-p"><strong>â€¢ Get Your Visa by Email or Post</strong><br />Once it's a yes, we send your visa by email or by mail, based on how you applied and the type of visa.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose MakeMyDocuments for Qatar Visa Services?</h2>
            <p className="ins-body-p">We give more than just visa help — we make sure you are at ease. Our group looks after every small detail, making your Qatar visa process quick, easy, and free from stress.</p>

            <p className="ins-body-p"><strong>â€¢ Help from Experts All the Way</strong><br />We check each paper to the final step, our visa pros are with you at all steps with help just for you.</p>

            <p className="ins-body-p"><strong>â€¢ See-through Costs</strong><br />No shocks. You'll know just what you pay for—from the start and with clarity.</p>

            <p className="ins-body-p"><strong>â€¢ No Extra Fees</strong><br />We keep it plain and true—what you see is what you pay.</p>

            <p className="ins-body-p"><strong>â€¢ Help Across India</strong><br />No matter where you are in India, we help folks from all towns by phone, email, and WhatsApp.</p>

            <p className="ins-body-p"><strong>â€¢ Quick Work and Constant Check-ins</strong><br />We care about your time. Our group makes sure they work on your form fast with steady updates and nudges.</p>

            <p className="ins-body-p"><strong>â€¢ Help for Quick/Emergency Needs</strong><br />Need to go fast? We help with quick work and push your visa if you can get it fast.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

