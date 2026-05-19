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
  { type: 'Tourist Visa', entry: 'Single Entry', price: '₹3,850', tag: 'Most Popular', tagColor: '#F7A418', gradient: 'linear-gradient(135deg,#1a4da8,#2E68B1)' },
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
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',      desc: 'Visa delivered in 4–7 working days with real-time WhatsApp status updates.'  },
  { Icon: BadgeCheck, title: '99% Delivered on Time', desc: 'Expert document review ensures near-perfect on-time delivery.'              },
  { Icon: Headphones, title: '24/7 Support',          desc: 'Dedicated WhatsApp support team available around the clock.'                },
  { Icon: Lock,       title: '100% Secure',           desc: 'Your data is handled with bank-grade security and full privacy.'            },
]

const REVIEWS = [
  { av: 'D', name: 'Sameer Malhotra', svc: 'Russia Visa',         text: '"Efficient Russia visa service. Make My Documents helped me with document preparation and submission. The process was smooth and timely, and I received my visa without any issues."' },
  { av: 'R', name: 'Shweta Singh',    svc: 'Russia Visa',         text: '"Very professional and helpful. Their team guided me through the complex requirements and ensured all my documents were in order. They were responsive and supportive throughout."' },
  { av: 'M', name: 'Manoj Gupta',     svc: 'Russia Visa',         text: '"Great support for first-time applicants. As a first-time traveler to Russia, their clear instructions and personalized help made the process easy to understand and follow."' },
  { av: 'A', name: 'Anand Krishnaswamy', svc: 'Russia Tourist Visa', text: '"Planning a trip to Moscow and St. Petersburg felt overwhelming until I contacted Make My Documents. They broke down the entire Russia visa process into clear steps — invitation letter, insurance, hotel bookings, and all. My visa arrived in just 6 working days. Outstanding support!"' },
  { av: 'N', name: 'Nandita Sharma',  svc: 'Russia e-Visa',       text: '"Applied for Russia e-visa for a short trip to Kaliningrad. The team guided me on e-visa eligibility and made sure I met all the requirements. Got my e-visa approved quickly. The process was completely paperless and very well managed."' },
  { av: 'R', name: 'Ranjit Singh',    svc: 'Russia Visa',         text: '"Was worried about the Russia visa because of the invitation letter requirement. Make My Documents arranged a tourist invitation letter through their network and handled the full application. My visa was approved without any complications. Highly trustworthy service!"' },
  { av: 'U', name: 'Uma Shankar',     svc: 'Russia Tourist Visa', text: '"Visited Russia during the White Nights festival. Make My Documents ensured my visa application was complete — travel insurance, hotel bookings, and correct photos as per Russian specifications. Zero issues at the Russian embassy. Brilliant service and very knowledgeable staff."' },
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
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa'                      },
]

const FAQS = [
  { q: 'Do Indian citizens require a visa to travel to Russia?',
    a: 'Yes, Indian passport holders need a visa to enter Russia. We assist with tourist visa applications.' },
  { q: 'What types of Russia visas do you help with?',
    a: 'We assist with tourist visas.' },
  { q: 'What documents are required for a Russia visa?',
    a: 'Typically, a valid passport, recent photographs, travel itinerary, invitation letter, and financial proofs are needed. We provide a detailed checklist.' },
  { q: 'How long does Russia visa processing take?',
    a: 'Processing times usually range from 7 to 15 working days depending on visa type and embassy workload.' },
  { q: 'Do I need to visit the Russian embassy in person?',
    a: 'Some visa types require a personal visit, while others can be processed through agents. We guide you through the requirements.' },
  { q: 'Is your Russia visa assistance available across India?',
    a: 'Yes, our services cover clients from all Indian cities. Documents can be shared digitally for a hassle-free process.' },
  { q: 'What happens if my Russia visa application is rejected?',
    a: 'If rejected, we analyze the reasons and assist with reapplication or alternative visa options.' },
  { q: 'Can you help with invitation letters for Russia visa?',
    a: 'Yes, we assist in obtaining and preparing invitation letters required for tourist visas.' },
  { q: 'What are your charges for Russia visa assistance?',
    a: 'Our fees depend on the visa type and services provided. Contact us for a detailed and transparent quote.' },
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
        <Link href="/russia-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function RussiaVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Russia Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/russia hero.jpg" alt="Russia Saint Basil Cathedral" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Russia Visa for Indians</h1>
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
          <Link href="/russia-visa-form" className="btn-amber uae-hero-btn">
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
                    <li><ChevronRight size={14} color="var(--teal)" strokeWidth={2} /> Expert Assistance</li>
                    <li><ChevronRight size={14} color="var(--teal)" strokeWidth={2} /> Invitation Letter Help</li>
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
              <h2>Documents Required For Russia Visa</h2>
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
                  <li><strong style={{ color: '#F7A418' }}>Rs. ₹3,850/-</strong> For Russia E-Visa</li>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Russia Visa for Indians</h2>
            <p className="ins-body-p">Planning a visit to Russia for tourism, or family travel requires Indian citizens to obtain a valid visa before departure. At Make My Documents, we provide complete assistance for the Russia visa for Indians, including tourist, and visa categories. We help with all tasks needed to get a Russia visa: filling out forms, checking papers, and setting up times to meet. We also give the needed visa help letter. We make sure every key paper like a good passport, new photo, set travel plans, and invite letters are right. People who can use it may also go for the Russia visa for Indian passport users. This is good for short trips and comes in an email in just a few work days.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How to Apply for a Russia Tourist Visa from India</h2>
            <p className="ins-body-p">If you are from India and want to go to Russia, you need to get a visa before you go. You can't get one when you arrive. You must have the right papers, an invite, and you must follow the rules of the Russian consulate. At Make My Documents, we make every step easy. We check your trip plans, work with the visa place, or we can do it all by sending it around with our mail service. You can ask for a normal tourist visa or a quick visa, and we make sure all is done right and on time.</p>

            <p className="ins-body-p"><strong>Give Us Your Passport and Trip Plans</strong><br />
            We start by taking a copy of your passport and your trip plans. We need these to fill in your forms and get your invite from Russia.</p>

            <p className="ins-body-p"><strong>Get the Tourist Invite</strong><br />
            Every tourist who wants to visit Russia needs an invite. It comes from a travel group or hotel in Russia that is allowed to give one. We can get this for you in one or two days.</p>

            <p className="ins-body-p"><strong>Fill Out the Visa Form</strong><br />
            Our group fills in your visa form right on the Russian visa site. This cuts down on mistakes.</p>

            <p className="ins-body-p"><strong>Send In Your Forms</strong><br />
            You can take your forms to the visa place yourself, or let our trusty mail service take and bring back your papers.</p>

            <p className="ins-body-p"><strong>Get Your Visa and Passport</strong><br />
            After you send in your form, it takes about 7 to 12 work days to process. Then, we send you your passport with the visa right to your door.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)', marginTop: 36 }}>Russia Visa Requirements for Indian Citizens</h2>
            <p className="ins-body-p">Before getting a Russia visa, Indian folk need to check all the rules and needed papers are right. The Russian office has set rules for how long a passport lasts, what photos look like, and other papers. If you want a tourist or work visa, you must meet these things to get your visa fast and without trouble. At Make My Documents, we check all your details to dodge slow-downs or no's.</p>

            <p className="ins-body-p"><strong>Valid Passport with At Least 6 Months Left</strong><br />
            Your passport should be good for six months past when you plan to come to Russia. It needs at least two blank pages for visa stamps.</p>

            <p className="ins-body-p"><strong>Passport-Size Photo</strong><br />
            You need a new color photo with a white back. It must be 35mm by 45mm big, and it can't have glasses or hats, as said by the embassy.</p>

            <p className="ins-body-p"><strong>Filled-Out Visa Form</strong><br />
            We help fill out the online Russian visa form right. It must match what's in your passport and other papers.</p>

            <p className="ins-body-p"><strong>Tourist Inviting Letter from Russia</strong><br />
            You need a tourist invite letter from a Russia hotel or tour operator. This paper is a must for the visa to be okay.</p>

            <p className="ins-body-p"><strong>Flight and Hotel Booking Proof</strong><br />
            Show your booked flights and places to stay. This shows why you are traveling and how long you plan to stay.</p>

            <p className="ins-body-p"><strong>Travel Insurance (Suggested)</strong><br />
            It's a good idea to have travel insurance for all your time in Russia. It makes your visa form stronger and helps in trouble.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)', marginTop: 36 }}>Russia Visa for Indian Passport Holders</h2>
            <p className="ins-body-p">People from India can't get a visa when they reach Russia. They must get a visa before they go. They can use the online visa way or get a normal visa with a sticker through the office or a visa center. Russia does not permit entry without pre-arranged documentation for Indian passport holders.</p>

            <ul className="pan-bullet-list" style={{ marginTop: 12 }}>
              <li><strong>No Visa on Arrival:</strong> Entry without a pre-issued visa is not permitted under any circumstances.</li>
              <li><strong>Choose Between E-Visa or Sticker Visa</strong></li>
              <li>E-Visa allows short visits (up to 16 days) and arrives via email without embassy visits.</li>
              <li>Sticker Visa (tourist) is issued by Russian consulate and stamped into your passport.</li>
              <li><strong>Application Must Be Completed in Advance:</strong> Whether applying online or through an agent, your visa must be processed and approved before departure.</li>
            </ul>

            <p className="ins-body-p" style={{ marginTop: 16 }}>At Make My Documents, we help you select the appropriate visa type, assist with form filling, document submission, and tracking—ensuring smooth compliance with all Russian entry requirements.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)', marginTop: 36 }}>Best Russia Visa Agent in India</h2>
            <p className="ins-body-p">Going on a trip to Russia from India might sound hard, but with the right help, it's easy. Make My Documents is here for you to get a Russia visa without trouble. We work out of Mysore and help people all over Bangalore, Hubli, and other big cities in India. We are good at making the visa process smooth for tourists, folks, and visa needs.</p>

            <p className="ins-body-p">We know all about Russia's visa rules and give full help, from getting your papers ready to talking with the embassy. Whether it's your first trip or you go often, our pros make sure your form is right, full, and turned in on time.</p>

            <p className="ins-body-p"><strong>Why Choose Make My Documents for Your Russia Visa Help</strong></p>
            <ul className="pan-bullet-list" style={{ marginTop: 8 }}>
              <li><strong>Top Visa Help:</strong> Our crew knows the newest visa rules, ways, and what papers you need. This helps you dodge usual errors that might get your form denied.</li>
              <li><strong>All Visa Types:</strong> We help with tourist visas (even the ones where you can go many times), and Russia visas for specific places.</li>
              <li><strong>Fast &amp; Right:</strong> We make your visa process fast by checking every detail before we send it. Quick and top-priority options are ready.</li>
              <li><strong>Clear Steps:</strong> No hidden costs. We tell you all about fees before you start.</li>
              <li><strong>Made For You:</strong> We give you a special list, tips for your trip, and help set up times to talk with the embassy about your travel plans.</li>
            </ul>

          </div>
        </div>
      </section>

    </div>
  )
}

