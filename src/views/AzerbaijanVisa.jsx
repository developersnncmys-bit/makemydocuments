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
  { val: '7–10',   lbl: 'Working Days'       },
  { val: '24/7',   lbl: 'WhatsApp Support'   },
]

const VISA_PLANS = [
  { type: '30 Days', entry: 'Single Entry', price: '₹4,498', tag: 'Most Popular', tagColor: '#F7A418', gradient: 'linear-gradient(135deg,#1a4da8,#2E68B1)' },
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',               desc: 'Fill all the basic details in the application on our secure portal.'   },
  { Icon: Upload,      title: 'Upload Documents',              desc: 'Submit the required documents via WhatsApp or email.'                   },
  { Icon: ShieldCheck, title: 'Documents Verification',        desc: 'Our experts review your documents for accuracy and compliance.'         },
  { Icon: CreditCard,  title: 'Payment',                       desc: 'Complete the payment securely to process your application.'             },
  { Icon: Mail,        title: 'Receive your E-Visa via E-mail', desc: 'Get your approved E-Visa conveniently delivered to your inbox.'        },
]

const DOCUMENTS = [
  'Clear scanned copy of passport front page (colour scanner)',
  'Clear scanned copy of passport back page (colour scanner)',
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',    desc: 'Visa delivered in 7–10 working days with real-time WhatsApp status updates.'  },
  { Icon: BadgeCheck, title: '99% Delivered on Time', desc: 'Expert document review ensures near-perfect on-time delivery.'             },
  { Icon: Headphones, title: '24/7 Support',        desc: 'Dedicated WhatsApp support team available around the clock.'                 },
  { Icon: Lock,       title: '100% Secure',         desc: 'Your data is handled with bank-grade security and full privacy.'             },
]

const REVIEWS = [
  { av: 'A', name: 'Akash Gupta',   svc: 'Azerbaijan Visa',         text: '"Transparent service with no hidden charges. I appreciated their upfront pricing and regular updates throughout my visa application process. Very trustworthy."' },
  { av: 'R', name: 'Ravi Menon',    svc: 'Azerbaijan Visa',         text: '"Super efficient and reliable. I got my Azerbaijan visa without any hassle, and their team followed up at every step. Definitely using them again for future travel."' },
  { av: 'K', name: 'Anita Reddy K', svc: 'Azerbaijan Visa',         text: '"Helpful and professional. They walked me through every document required and made sure everything was perfect before submission. The process was seamless."' },
  { av: 'S', name: 'Swati Nair',    svc: 'Azerbaijan ASAN Visa',    text: '"Wanted to explore Baku and the Caucasus region. Make My Documents helped me get the Azerbaijan ASAN e-visa quickly. Clear instructions, fast processing, and the visa arrived in my inbox well before my departure. Highly recommended!"' },
  { av: 'T', name: 'Tarun Kapoor',  svc: 'Azerbaijan Tourist Visa', text: '"Was planning a trip to Azerbaijan for their fire temples and Old City. The team ensured all my travel documents were in order and submitted the visa application immediately. My visa was approved in 6 days. Wonderful experience!"' },
  { av: 'G', name: 'Geeta Ramesh',  svc: 'Azerbaijan Visa',         text: '"First time visiting a Central Asian country and was unsure about the visa process. Make My Documents was incredibly helpful — they guided me through the ASAN portal and ensured I met all the requirements. Got my visa approved without any rejections."' },
  { av: 'M', name: 'Mohan Prabhu',  svc: 'Azerbaijan e-Visa',       text: '"My travel agent couldn\'t sort the Azerbaijan visa so I turned to Make My Documents. They submitted my application the same day and I received the e-visa approval within 5 working days. Saved my trip! Will always use them for future international travel."' },
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
  { name: 'Oman',                 flag: '🇴🇲', path: '/oman-visa' },
  { name: 'Morocco',              flag: '🇲🇦', path: '/morocco-visa' },
  { name: 'Bahrain',              flag: '🇧🇭', path: '/bahrain-visa' },
  { name: 'Qatar',                flag: '🇶🇦', path: '/qatar-visa' },
  { name: 'Russia',               flag: '🇷🇺', path: '/russia-visa' },
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa' },
]

const FAQS = [
  { q: 'Do Indian citizens need a visa to visit Azerbaijan?',
    a: 'Yes, Indian passport holders require a visa to enter Azerbaijan. We assist with tourist, and Visa applications.' },
  { q: 'What types of Azerbaijan visas do you help with?',
    a: 'We assist with tourist visas, transit visas, and Visas based on your travel purpose.' },
  { q: 'Can I apply for an Azerbaijan Visa from India?',
    a: 'Yes, Indian citizens are eligible to apply for an Azerbaijan Visa. We guide you through the online application and document submission.' },
  { q: 'What documents are needed for an Azerbaijan visa?',
    a: 'Typically, you need a valid passport, recent photographs, travel itinerary, hotel bookings, and financial proofs. We provide a detailed checklist.' },
  { q: 'How long does Azerbaijan visa processing take?',
    a: 'Processing times usually range from 3 to 7 working days, depending on the visa type and embassy workload.' },
  { q: 'Do I need to visit the Azerbaijan embassy?',
    a: 'In most cases, visa applications can be submitted online or via agents. We assist you to avoid any embassy visits where possible.' },
  { q: 'Is your service available across India?',
    a: 'Yes, we offer visa assistance PAN-India. You can apply from any city by sharing documents digitally.' },
  { q: 'What if my Azerbaijan visa application is rejected?',
    a: 'If rejected, we analyze the reasons and assist with reapplication or alternative visa options.' },
  { q: 'How much do you charge for Azerbaijan visa assistance?',
    a: 'Our fees depend on the visa type and service level. Contact us for a detailed and transparent quote.' },
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
        <Link href="/azerbaijan-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function AzerbaijanVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Azerbaijan Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/azerbaijan hero.jpg" alt="Azerbaijan Baku Skyline" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Azerbaijan Visa for Indians</h1>
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
              <div className="uae-stat-val">₹4,498/-</div>
            </div>
          </div>
          <Link href="/azerbaijan-visa-form" className="btn-amber uae-hero-btn">
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
              <h2>Documents Required For Azerbaijan Visa</h2>
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
                  <li><strong style={{ color: '#F7A418' }}>Rs. 4,498/-</strong> For Azerbaijan 30 days Single Entry E-Visa</li>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Azerbaijan Visa for Indians</h2>
            <p className="ins-body-p">Going to Azerbaijan as an Indian needs a visa before you get there. If you're off on a fun trip, going to a work meet, or seeing family, getting a visa is easy now. Azerbaijan lets you get an visa, making things simple by cutting out trips to the embassy and lots of forms. With the right papers and help, most from India can get their visa in just a few days.</p>
            <p className="ins-body-p">At MakeMyDocuments, we make your Azerbaijan visa process smooth from start to end. Our pros check your papers, send in forms, and keep you updated to make sure your trip has no hold-ups or mix-ups. We help with all you need for tourist and work visas, so you can just think about your trip while we do the rest.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Types of Azerbaijan Visas for Indian Citizens</h2>
            <p className="ins-body-p">Azerbaijan has many visa types based on why you want to go there. If you hold an Indian passport, you can pick a visa that fits your travel need. This could be for fun trips, work meets, or short stays. Each visa comes with its own set of rules and time limits. It's key to pick the right one.</p>

            <p className="ins-body-p"><strong>Tourist Visa</strong><br />
            Good for fun trips, seeing family, and looking around. This visa usually lasts 30 days and lets you go into Azerbaijan once.</p>

            <p className="ins-body-p"><strong>Business Visa</strong><br />
            For Indian workers going to talks, trade shows, or work talks. You might need to show an invite letter from someone in Azerbaijan.</p>

            <p className="ins-body-p"><strong>Transit Visa</strong><br />
            For Indian folk passing through Azerbaijan to get to another place. You need this visa if your stop is more than 24 hours or if you leave the airport.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How to Apply for an Azerbaijan Visa from India</h2>
            <p className="ins-body-p">People from India can ask for a visa to Azerbaijan through many sure ways. Each choice fits a different need—from quick trips to more tough plans like work or long stays.</p>

            <p className="ins-body-p"><strong>â€¢ ASAN Visa Site</strong><br />
            It's the main online place by the Azerbaijan Government. Most from India like it for being easy, letting them put in and get an okay in three work days.</p>

            <p className="ins-body-p"><strong>â€¢ With MakeMyDocuments</strong><br />
            Our pros look after your full ask—from filling forms, checking pictures and papers, to staying on it—making sure all is right and no turns down.</p>

            <p className="ins-body-p"><strong>â€¢ Embassy or Office Asks</strong><br />
            Needed for types like long, work, or set-purpose visas. You must set a time to meet and give your papers in person.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Documents Required for Azerbaijan Visa (Indians)</h2>
            <p className="ins-body-p">Before applying, make sure you have the following documents ready in digital format. Incomplete or unclear uploads may lead to delays or rejection.</p>
            <p className="ins-body-p">â€¢ <strong>Passport:</strong> Valid for at least 6 months from the intended date of arrival in Azerbaijan</p>
            <p className="ins-body-p">â€¢ <strong>Photograph:</strong> Recent passport-size photo with a white background (scanned copy)</p>
            <p className="ins-body-p">â€¢ <strong>Flight Itinerary:</strong> Confirmed return or onward ticket</p>
            <p className="ins-body-p">â€¢ <strong>Accommodation Details:</strong> Hotel reservation or a host invitation letter</p>
            <p className="ins-body-p">â€¢ <strong>Email Address:</strong> Active email ID to receive the visa</p>
            <p className="ins-body-p">â€¢ <strong>Visa Application Form:</strong> Accurately filled and submitted through the official portal or by a consultant</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Processing Time for Azerbaijan Visa</h2>
            <p className="ins-body-p">â€¢ <strong>Standard Visa:</strong> Processed within 06 to 07 business days under normal circumstances</p>
            <p className="ins-body-p">â€¢ <strong>Express Visa:</strong> Issued within 6 hours if you opt for the express service (extra charges apply)</p>
            <p className="ins-body-p">â€¢ <strong>Possible Delays:</strong> Application may take longer if documents are incomplete, payment fails, or during national/public holidays</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Azerbaijan Visa for Indian Passport Holders</h2>
            <p className="ins-body-p">The Azerbaijan Visa is the most convenient option for Indian citizens planning short trips. The entire process is online and can be completed from the comfort of your home.</p>
            <p className="ins-body-p">Step-by-Step Process:</p>
            <p className="ins-body-p">â€¢ <strong>Apply Online:</strong> Fill out the visa form on the official ASAN portal or through trusted agents</p>
            <p className="ins-body-p">â€¢ <strong>Upload Documents:</strong> Submit your passport scan, photo, and travel details</p>
            <p className="ins-body-p">â€¢ <strong>Make Payment:</strong> Pay securely via card</p>
            <p className="ins-body-p">â€¢ <strong>Receive Visa by Email:</strong> Get your visa in PDF format within the selected processing time</p>
            <p className="ins-body-p">â€¢ <strong>Carry a Printout:</strong> Present it at immigration upon arrival</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose MakeMyDocuments for Azerbaijan Visa Assistance?</h2>
            <p className="ins-body-p">Applying for an Azerbaijan visa doesn't have to be stressful. MakeMyDocuments provides a seamless experience for Indian travelers by managing every step of the visa application process. Whether you're traveling for tourism, or just passing through, their visa experts ensure your paperwork is complete, accurate, and submitted on time. With transparent pricing, expert review, and real-time updates, you can focus on your travel plans while they handle the rest.</p>
            <p className="ins-body-p">Key Benefits:</p>
            <p className="ins-body-p">â€¢ Personalized support from experienced visa consultants</p>
            <p className="ins-body-p">â€¢ Fast documentation review and error-proof application filing</p>
            <p className="ins-body-p">â€¢ Express and urgent visa processing available</p>
            <p className="ins-body-p">â€¢ Secure and fully online submission process</p>
            <p className="ins-body-p">â€¢ Assistance for all visa types: tourist, and transit</p>
            <p className="ins-body-p">â€¢ Real-time updates and prompt communication throughout the process</p>
            <p className="ins-body-p">â€¢ Trusted by hundreds of Indian applicants for Azerbaijan visas</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Azerbaijan Tourist Visa Validity for Indians</h2>
            <p className="ins-body-p">The Azerbaijan Visa issued to Indian travelers is typically valid for short-term stays. It allows for a single entry and must be used within a specific time window from the date of approval.</p>
            <p className="ins-body-p">â€¢ <strong>Validity Duration:</strong> 30 days from the date of entry into Azerbaijan</p>
            <p className="ins-body-p">â€¢ <strong>Type:</strong> Single-entry visa by default</p>
            <p className="ins-body-p">â€¢ <strong>Entry Window:</strong> You must enter Azerbaijan within 90 days from the date the visa is issued</p>

          </div>
        </div>
      </section>

    </div>
  )
}

