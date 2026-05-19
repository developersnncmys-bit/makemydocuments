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
  { val: '05–07',   lbl: 'Working Days'      },
  { val: '24/7',    lbl: 'WhatsApp Support'  },
]

const DOCUMENTS = [
  'Clear scanned copy of passport front and back copy in colour scanner',
  'Hotel Address Information',
  'Return Flight Ticket',
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
  { Icon: Zap,        title: 'Fast Processing',     desc: 'Visa delivered in just 05–07 working days with real-time updates.'  },
  { Icon: BadgeCheck, title: '99% Approval Rate',   desc: 'Expert document review ensures near-perfect visa delivery on time.' },
  { Icon: Headphones, title: '24/7 Support',        desc: 'Dedicated WhatsApp support team available around the clock.'        },
  { Icon: Lock,       title: '100% Online Process', desc: 'From consultation to submission, everything is handled remotely.'   },
]

const REVIEWS = [
  { av: 'N', name: 'Neeraja V',    svc: 'Indonesia Visa',      text: '"I had no issues applying for my Indonesia Tourist Visa for Indians. The step-by-step guidance was perfect, and the support team was always there to help."' },
  { av: 'K', name: 'Karthik C',   svc: 'Indonesia Visa',      text: '"This was the fastest Indonesia Tourist Visa for Indians application I\'ve ever done. The whole procedure took just a few days, and I was able to focus on my trip without any worries."' },
  { av: 'D', name: 'Divya P',     svc: 'Indonesia Visa',      text: '"I had a great experience applying for my Indonesia Tourist Visa for Indians through this service. The process was smooth, and I received my visa in just 5 days."' },
  { av: 'A', name: 'Aruna Reddy', svc: 'Bali Visa on Arrival', text: '"Planning a Bali trip was exciting but visa formalities seemed daunting. Make My Documents helped me understand the Visa on Arrival process fully — what to carry, how much USD to keep, what form to fill. My Bali arrival was seamless. Loved the service!"' },
  { av: 'S', name: 'Srinivasan K.',svc: 'Indonesia e-Visa',    text: '"Applied for an Indonesia e-visa for a Jakarta business trip. The team submitted all documents on my behalf and I received the e-visa approval within 5 working days. Very efficient and professional. Will definitely use them again for my next trip."' },
  { av: 'M', name: 'Manasa Rao',  svc: 'Indonesia Visa',      text: '"Went to Lombok and Komodo Island for a 10-day trip. Make My Documents sorted both my Indonesia visa and the supporting travel itinerary. They also helped with the photo specifications that the immigration required. Zero issues at arrival. Superb service!"' },
  { av: 'R', name: 'Rajan Iyer',  svc: 'Indonesia VOA',       text: '"Was unsure if I should go for a VOA or pre-approved e-visa for Indonesia. The team advised me based on my travel dates and entry point. Their recommendation saved me money and time. Got through immigration without any hiccups at Bali airport."' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa'        },
  { name: 'Singapore',            flag: '🇸🇬', path: '/singapore-visa'            },
  { name: 'United Kingdom',       flag: '🇬🇧', path: '/uk-visa'                   },
  { name: 'Australia',            flag: '🇦🇺', path: '/australia-visa'            },
  { name: 'Malaysia',             flag: '🇲🇾', path: '/malaysia-visa'             },
  { name: 'Egypt',                flag: '🇪🇬', path: '/egypt-visa' },
  { name: 'Hong Kong',            flag: '🇭🇰', path: '/hong-kong-tourist-visa-for-indians' },
  { name: 'Vietnam',              flag: '🇻🇳', path: '/vietnam-tourist-visa'      },
  { name: 'Azerbaijan',           flag: '🇦🇿', path: '/azerbaijan-visa' },
  { name: 'Oman',                 flag: '🇴🇲', path: '/oman-visa' },
  { name: 'Morocco',              flag: '🇲🇦', path: '/morocco-visa' },
  { name: 'Bahrain',              flag: '🇧🇭', path: '/bahrain-visa' },
  { name: 'Qatar',                flag: '🇶🇦', path: '/qatar-visa' },
  { name: 'Russia',               flag: '🇷🇺', path: '/russia-visa' },
  { name: 'Uzbekistan',           flag: '🇺🇿', path: '/uzbekistan-visa' },
]

const FAQS = [
  { q: 'What should I do if my passport is not valid for six months?',
    a: "Your passport must be valid for at least 6 months from the date of application. If it's not, renew your passport before applying for the visa." },
  { q: 'Can I use the Indonesia Tourist Visa for business purposes?',
    a: 'No, the Indonesia Tourist Visa is strictly for tourism purposes, if you need to attend meetings or conferences, a business visa is required.' },
  { q: 'Do I need to visit the Indonesian embassy for visa processing?',
    a: 'No, you do not need to visit the embassy in person, you can apply for the Indonesia Tourist Visa online or through an authorized agent.' },
  { q: 'Can I travel to Indonesia with a valid multiple-entry visa?',
    a: 'No, the Indonesia Tourist Visa is typically issued as a single-entry visa for tourism. For multiple entries, a different visa type is required.' },
  { q: 'Can I extend my Indonesia Tourist Visa?',
    a: 'Yes, you can extend your Indonesia Tourist Visa for an additional 30 days by applying at the immigration office in Indonesia before your initial visa expires.' },
  { q: 'What happens if my Indonesia Tourist Visa application is rejected?',
    a: 'If your visa application is rejected, you will need to correct any errors or missing documents and reapply for the visa.' },
  { q: 'Can I travel to Indonesia with a single-entry visa?',
    a: "Yes, the Indonesia Tourist Visa is usually a single-entry visa, allowing you to enter the country once within the visa's validity period." },
  { q: 'Is there any age restriction for applying for an Indonesia Tourist Visa?',
    a: 'There is no specific age restriction for the Indonesia Tourist Visa; however, minors may need additional documents like a birth certificate and consent letter from parents.' },
  { q: 'Can I apply for an Indonesia Tourist Visa if I have a pending travel ban?',
    a: 'If you have a travel ban or previous immigration issues, it may impact your eligibility. Consult with the Indonesian embassy before applying for the Indonesia Tourist Visa.' },
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
        <Link href="/indonesia-visa-form" className="pan-apply-btn">
          Apply Online <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function IndonesiaVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Indonesia Tourist Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/indonesia hero.jpg" alt="Indonesia" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Indonesia Tourist Visa for Indians</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Visa Approved on Time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">05 – 07 working days</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹5,109/-</div>
            </div>
          </div>
          <Link href="/indonesia-visa-form" className="btn-amber uae-hero-btn">
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
              <h2>Documents Required For Indonesia Tourist Visa for Indians</h2>
              <ul className="pan-bullet-list" style={{ marginTop: 16 }}>
                {DOCUMENTS.map((d, i) => (
                  <li key={i}>- {d}</li>
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
                  <li>Indonesia 30 Days Single Entry E-Visa <strong style={{ color: '#F7A418' }}>Rs. 5,109/-</strong></li>
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
            <h2>Our Other Country Visa Services</h2>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Indonesia Tourist Visa for Indians – A Complete Guide</h2>
            <p className="ins-body-p">Indian passport holders are required to apply for a tourist visa to visit Indonesia. Our service simplifies the process of obtaining an Indonesia Tourist Visa, ensuring a quick and hassle-free experience. We guide you through every step of the application, from document submission to visa approval, so you can focus on planning your trip.</p>

            <h3 className="ins-body-h3">What are the Types of Indonesia Visa</h3>
            <p className="ins-body-p">Indonesia offers several types of visas depending on the purpose of your visit. Here's a breakdown of the main visa types:</p>

            <h4 className="ins-body-h3">Tourist Visa</h4>
            <p className="ins-body-p">A Tourist Visa is required for those traveling to Indonesia for leisure or tourism. It allows you to explore the country and enjoy its cultural and natural attractions.</p>

            <h4 className="ins-body-h3">Business Visa</h4>
            <p className="ins-body-p">A Business Visa is essential for individuals traveling to Indonesia for business purposes. Whether attending meetings, conferences, or business-related events, this visa facilitates professional engagements in the country.</p>

            <h4 className="ins-body-h3">Social-Cultural Visa</h4>
            <p className="ins-body-p">The Social-Cultural Visa is designed for visitors traveling for family visits, cultural exchanges, or social purposes. It allows you to stay in Indonesia for personal reasons, such as visiting relatives or participating in cultural programs.</p>

            <h4 className="ins-body-h3">Work Visa</h4>
            <p className="ins-body-p">If you are planning to work in Indonesia, you will need a Work Visa. This visa is required for employment purposes and ensures you can legally work while in the country.</p>

            <h4 className="ins-body-h3">Transit Visa</h4>
            <p className="ins-body-p">The Transit Visa is for travelers who are passing through Indonesia on their way to another destination. It allows a short stay in the country while you wait for your next flight or onward journey.</p>

            <h3 className="ins-body-h3">Indonesia Visa Extension and Renewal</h3>
            <p className="ins-body-p">If you're planning to extend your stay in Indonesia, you can apply for an extension or renewal of your visa through the appropriate channels. Our team can assist in guiding you through the necessary steps to ensure your stay is extended smoothly.</p>

            <h3 className="ins-body-h3">How to Avoid Indonesia Visa Rejection?</h3>
            <p className="ins-body-p">To avoid Indonesia visa rejection, ensure that you:</p>
            <p className="ins-body-p">- Submit accurate and complete documents.</p>
            <p className="ins-body-p">- Apply well in advance of your travel date.</p>
            <p className="ins-body-p">- Double-check your passport validity (it should be valid for at least 6 months).</p>
            <p className="ins-body-p">- Provide proof of sufficient funds for your stay in Indonesia.</p>
            <p className="ins-body-p">- Ensure that your return flight and hotel booking are confirmed.</p>

            <h3 className="ins-body-h3">Is there an Indonesia Visa on Arrival for Indian Passport Holders?</h3>
            <p className="ins-body-p">Yes, Indonesia offers a Visa on Arrival (VoA) for Indian passport holders. The Visa on Arrival is available for tourism and business purposes, allowing you to stay for a maximum of 30 days, extendable by another 30 days. Ensure that you have the necessary documents, including a valid passport, return flight ticket, and sufficient funds.</p>

            <h3 className="ins-body-h3">Is travel insurance required for an Indonesia Visa Application?</h3>
            <p className="ins-body-p">Travel insurance is not mandatory when applying for an Indonesia Tourist Visa, but it is highly recommended. Insurance helps cover unexpected events such as medical emergencies, cancellations, or delays, ensuring a safe and stress-free trip.</p>

            <h3 className="ins-body-h3">Why Choose Make My Document to Apply for an Indonesia Tourist Visa?</h3>
            <p className="ins-body-p">Choosing Make My Document for your Indonesia Tourist Visa application ensures a smooth and hassle-free experience. We provide:</p>
            <p className="ins-body-p">- Quick and reliable service</p>
            <p className="ins-body-p">- Expert guidance throughout the application process</p>
            <p className="ins-body-p">- Secure document submission and verification</p>
            <p className="ins-body-p">- Fast processing and delivery of your visa</p>

            <h3 className="ins-body-h3">Things to Know Before Traveling to Indonesia</h3>
            <p className="ins-body-p">Before traveling to Indonesia, consider the following tips:</p>
            <p className="ins-body-p"><strong>Currency:</strong> The local currency is the Indonesian Rupiah (IDR). It's a good idea to carry some local currency for small expenses.</p>
            <p className="ins-body-p"><strong>Language:</strong> Bahasa Indonesia is the official language, but English is widely spoken in tourist areas.</p>
            <p className="ins-body-p"><strong>Health:</strong> Check if any vaccinations are required or recommended before your trip.</p>
            <p className="ins-body-p"><strong>Cultural Etiquette:</strong> Indonesians are known for their hospitality, but be mindful of local customs, especially in temples and rural areas.</p>
            <p className="ins-body-p"><strong>Weather:</strong> Indonesia has a tropical climate, so pack light, comfortable clothes and be prepared for rain if traveling during the wet season.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

