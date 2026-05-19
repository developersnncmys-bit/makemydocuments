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
  { val: '5,000+', lbl: 'Visas Approved'   },
  { val: '99%',    lbl: 'Delivered on Time' },
  { val: '20–25',  lbl: 'Working Days'      },
  { val: '24/7',   lbl: 'WhatsApp Support'  },
]

const DOCUMENTS = [
  'Original Passport',
  'Aadhar card',
  '02 photos with white background and no border (35mm X 45mm)',
  'Invitee passport & visa copy',
  "Invitee's one residence proof",
  "Applicant's 6 months bank statement (with stamp & signature and sufficient funds)",
  '3 months pay slips',
  '2-3 years Income Tax Return (ITR)',
  'Previous travel passport stamped copy',
  'Any investment documents like fixed deposits or property documents (optional)',
  'Flight booking confirmation (optional)',
  'Covering letter (Given by us)',
  'Company leave approval letter',
]

const HOW_STEPS = [
  { Icon: UserPlus,    title: 'Register Online',              desc: 'Fill your basic details on our secure portal.'           },
  { Icon: Upload,      title: 'Upload Documents',             desc: 'Submit the required documents via WhatsApp or email.'    },
  { Icon: ShieldCheck, title: 'Documents Verification',       desc: 'Our experts review your documents for accuracy.'         },
  { Icon: CreditCard,  title: 'Payment',                      desc: 'Complete the payment securely to process your application.' },
  { Icon: Mail,        title: 'Receive your E-Visa via E-mail', desc: 'Get your approved e-Visa delivered to your inbox.'     },
]

const WHY_US = [
  { Icon: Zap,        title: 'Fast Processing',    desc: 'Visa delivered in 20–25 working days with real-time WhatsApp updates.'  },
  { Icon: BadgeCheck, title: '99% Approval Rate',  desc: 'Expert document review ensures near-perfect visa delivery on time.'      },
  { Icon: Headphones, title: '24/7 Support',       desc: 'Dedicated WhatsApp support team available around the clock.'             },
  { Icon: Lock,       title: '100% Online Process', desc: 'From consultation to submission, everything is handled remotely.'       },
]

const REVIEWS = [
  { av: 'A', name: 'Aarav Sharma',   svc: 'Australia Tourist Visa', text: '"Make My Documents made the Australia visa process incredibly simple. I was worried about getting all my papers in order, but their team walked me through everything. My tourist visa came through faster than I expected. Very professional service."' },
  { av: 'R', name: 'Rohan Patel',    svc: 'Australia Student Visa', text: '"I got my student visa approved without any hassle. As a first-time applicant, I wasn\'t sure where to start. They helped me compile my financial documents, SOP, and even booked my biometric appointment. Super helpful and friendly."' },
  { av: 'I', name: 'Ishita Singh',   svc: 'Australia Visa',         text: '"Fast communication and smooth coordination. Every time I had a question, they responded quickly. From document review to tracking my application, everything was managed efficiently."' },
  { av: 'P', name: 'Preethi Menon',  svc: 'Australia Family Visa',  text: '"Applied for a family visit visa for my parents to attend my graduation in Sydney. The team guided us on every supporting document needed including financial and relationship proofs. Both visas were approved without any issues. Absolutely reliable service!"' },
  { av: 'S', name: 'Suresh Pillai',  svc: 'Australia Tourist Visa', text: '"I needed an Australia visa for a short business trip. Make My Documents helped me prepare a strong covering letter and ensured all financial documents were in the right format. Got my visa in under 3 weeks. Highly recommend them!"' },
  { av: 'N', name: 'Namrata Joshi',  svc: 'Australia eTA / ETA',    text: '"Needed an Australian ETA for a transit stop and was not sure how to apply. The team explained the process very clearly and submitted my application the same day. Received approval within 24 hours. Brilliant and responsive service!"' },
  { av: 'V', name: 'Venkatesan R.',  svc: 'Australia Visa',         text: '"Third time using Make My Documents for my Australia visa renewal and every experience has been flawless. They remember my profile details and the renewal was sorted with minimal effort from my side. The best visa service team in India!"' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa' },
  { name: 'Singapore',            flag: '🇸🇬', path: '/singapore-visa'     },
  { name: 'United Kingdom',       flag: '🇬🇧', path: '/uk-visa'            },
  { name: 'Malaysia',             flag: '🇲🇾', path: '/malaysia-visa' },
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
  { q: 'What types of Australia visas do you assist with?',
    a: 'We provide assistance for tourist visas.' },
  { q: 'Do you offer complete Australia visa application support?',
    a: 'Yes, we assist with document preparation, application form filling, appointment booking, cover letter writing, and ongoing support until you receive your visa.' },
  { q: 'Can I apply for an Australia visa without visiting your office?',
    a: "Yes, our services are fully remote. You can share your documents online, and we'll guide you through the entire process via call, WhatsApp, or email." },
  { q: 'What is the processing time for an Australia Tourist Visa from India?',
    a: 'Standard tourist visa processing usually takes 15–30 days depending on the volume at the embassy. We help ensure your application is complete to avoid delays.' },
  { q: 'What documents do I need for an Australia visa?',
    a: "You'll need a valid passport, financial documents, travel itinerary, invitation letter (if applicable), employment proofs, and more. We provide a detailed checklist customized to your case." },
  { q: 'Do you help with booking appointments and biometric scheduling?',
    a: 'Yes, we handle biometric appointment booking at VFS centers and guide you on what to carry and how to prepare.' },
  { q: 'Can you help students applying for an Australian study visa?',
    a: 'Absolutely. We assist with preparing your Statement of Purpose (SOP), gathering required academic and financial documents, and managing the visa filing.' },
  { q: 'Is visa consultation available for dependent or family visas?',
    a: 'Yes, we assist with dependent, spouse, and family visit visas for Australia, ensuring all supporting documents are properly arranged.' },
  { q: 'How much does your Australia visa assistance cost?',
    a: 'Our charges vary depending on the visa type and services required. Get in touch with us for a detailed cost breakdown—no hidden fees.' },
  { q: 'What if my Australia visa application gets rejected?',
    a: 'In case of rejection, we analyze the refusal reasons and guide you on how to strengthen your documents for reapplication or appeal, if applicable.' },
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
        <Link href="/australia-visa-form" className="pan-apply-btn">
          Apply Now <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function AustraliaVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / Australia Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/Australia hero.jpg" alt="Australia" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">Australia Visa for Indians</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Delivered on time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">20–25 working days</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹10,999/-</div>
            </div>
          </div>
          <Link href="/australia-visa-form" className="btn-amber uae-hero-btn">
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
            <h2>Australia Visa Charges</h2>
            <p className="sec-desc">Transparent pricing with no hidden charges.</p>
          </div>
          <div className="sgp-charges-wrap">
            <div className="sgp-charge-card">
              <div className="sgp-charge-header" style={{ background: 'linear-gradient(135deg, #00843D, #016a30)' }}>
                <span className="sgp-charge-tag">Normal Application</span>
                <div className="sgp-charge-price">₹10,999<span>/-</span></div>
                <div className="sgp-charge-sub">per person</div>
              </div>
              <div className="sgp-charge-body">
                <ul className="uae-plan-features">
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Tourist / Student / Visitor Visa</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Expert Document Assistance</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Biometric Appointment Booking</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Covering Letter (Given by us)</li>
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
              <h2>Documents Required For Australia Visa</h2>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Australia Visa for Indians</h2>
            <p className="ins-body-p">Thinking of going to Australia, If you go for fun, work, or to learn, the visa process can be hard. At Make My Documents, we make the Australia visa form easy for Indian people. We guide you step by step, give support just for you, and help with all the papers needed. Our team makes sure your form meets the new rules of immigration, giving you a top chance to get it okayed—no stress.</p>

            <h3 className="ins-body-h3">Tourist Visa</h3>
            <p className="ins-body-p">The Australian tourist visa is for Indian folks looking to see Australia for fun, holidays, or to hang out with family and friends. Based on why you travel, you might stay for 3, 6, or 12 months. We help you apply with the right papers and plans.</p>

            <h3 className="ins-body-h3">Business Visa</h3>
            <p className="ins-body-p">The Australia business visa is for Indians going to meetings, confabs, shows, or looking for business chances. This visa won't let you work or sell stuff. Our team makes sure your papers fit what Australia needs and show clearly what you plan, so you get a yes fast and easy.</p>

            <h3 className="ins-body-h3">Student Visa</h3>
            <p className="ins-body-p">Indian students who want to study more in Australia can go for the student visa. This visa lets you study full-time and work a bit on the side. We help with it all—papers that show where you'll study, money details, and that you're really just staying for a while for study.</p>

            <h3 className="ins-body-h3">Dependent &amp; Family Visas</h3>
            <p className="ins-body-p">If you're moving to be with your spouse, child, or kin in Australia, pick a dependent or family visa. We help Indians show their family ties, shared papers, and letters from sponsors to make sure your ask to stay for a while or forever in Australia is all good.</p>

            <h3 className="ins-body-h3">Visitor Visa</h3>
            <p className="ins-body-p">The Australian visitor visa is made for short trips that are not about work. This includes family things, helping someone who's sick, or just for kicks. It often gets mixed up with the tourist visa but is kind of different. We guide Indian folks in picking the right kind of visitor visa and getting all forms ready.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How to Apply for an Australia Tourist Visa from India</h2>
            <p className="ins-body-p">Trying to get a tourist visa for Australia from India might seem hard because there are many steps and you need a lot of papers. But, if you know the right way, it gets a lot easier. Here is an easy guide to help you get through it with sure steps:</p>

            <h3 className="ins-body-h3">See if You Can Get the Visa</h3>
            <p className="ins-body-p">Before you apply, make sure you fit the visa needs. You should have an Indian passport that is good to use, a clear plan for your visit, enough money, and a strong reason to go back to India. Our team checks all this so you start right.</p>

            <h3 className="ins-body-h3">Get All Needed Papers</h3>
            <p className="ins-body-p">You need to have some key papers like a copy of your passport, new photos like those in passports, details of your money, proof of income, your travel plans, and where you work. We give you a full list and help you set all in order to meet rules from Australia.</p>

            <h3 className="ins-body-h3">Fill in Visa Form 1419</h3>
            <p className="ins-body-p">Form 1419 is the needed form to ask for an Australian visitor visa (subclass 600). We help you through every part, making sure you dodge common slips that could slow down or risk getting your visa. Everything you write is checked twice by our pros before you send it in.</p>

            <h3 className="ins-body-h3">Set a Time for Your Biometrics</h3>
            <p className="ins-body-p">Most people from India need to give biometrics – prints from fingers and a photo – at the nearest VFS Global center. We help in setting your visit when it works for you and tell you what will happen there.</p>

            <h3 className="ins-body-h3">Send and Watch Your Application</h3>
            <p className="ins-body-p">After you send your application and biometrics, we keep an eye on your visa status through the official site and update you often. If more papers are needed or a problem comes up, we act fast to keep your visa try moving well.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Australia Visa Requirements for Indians</h2>
            <p className="ins-body-p">If you plan to go to Australia from India, you need to get all your papers right. Even a small miss can hold up your visa. Here is a short list of what you need for an Australia tourist visa as an Indian:</p>

            <h3 className="ins-body-h3">Valid Passport</h3>
            <p className="ins-body-p">Your passport should be good for at least six months from when you go and must have two blank pages for the visa stamp. Check that it's not old or about to run out.</p>

            <h3 className="ins-body-h3">Recent Passport-Sized Photo</h3>
            <p className="ins-body-p">You need two new, color photos with a white back, no dark spots, and a plain face. These should be less than six months old and the right size.</p>

            <h3 className="ins-body-h3">Cover Letter</h3>
            <p className="ins-body-p">Write a note to the Australian High Commission. Tell them why you are going, how long you will stay, where you get your money, and your strong links to India that make you sure to go back.</p>

            <h3 className="ins-body-h3">Proof of Funds</h3>
            <p className="ins-body-p">Add six months of bank papers, pay slips, tax returns, and other money papers to show you can pay for your trip. This shows you don't need cash help while there.</p>

            <h3 className="ins-body-h3">Travel Plan or Flight Bookings</h3>
            <p className="ins-body-p">Share a basic plan with maybe flight dates and what you want to see. You don't need full tickets yet, but this shows your trip outline and aim.</p>

            <h3 className="ins-body-h3">Where You Will Stay</h3>
            <p className="ins-body-p">Show hotel spots, Airbnb details, or a letter if staying with friends. This tells the visa person where you'll be in Australia.</p>

            <h3 className="ins-body-h3">Job or Business Info</h3>
            <p className="ins-body-p">If you work, give a NOC from your boss, a job letter, and pay slips. If you own a business, show GST stuff, proof you own it, and money details to show steady cash flow and strong ties back home.</p>

            <h3 className="ins-body-h3">Invite Letter (if needed)</h3>
            <p className="ins-body-p">If you are going to see family or friends, add a letter from them with their details and proof they are okay in Australia. This backs up why you are going.</p>

            <h3 className="ins-body-h3">Fill Visa Form (Form 1419)</h3>
            <p className="ins-body-p">Complete Form 1419 well and fully. This is the main visa form for Indian tourists to Australia. Any mistakes or left out bits can hold up or mess up your visa result.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Australia Visa Fees and Processing Time (India)</h2>
            <p className="ins-body-p">Are you off to Australia, You should know about visa fees and the time it takes to get them. Here is a simple guide on common visa types, what they cost, and usual wait times for applications from India.</p>

            <h3 className="ins-body-h3">Visa Processing Time</h3>
            <p className="ins-body-p">Tourist &amp; Travel Visas – typically processed within 15 to 30 working days depending on the destination country and embassy workload.</p>
            <p className="ins-body-p">Note: Processing time may vary based on the embassy and document verification process.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Step-by-Step Australia Visa Application Process</h2>
            <p className="ins-body-p">Getting an Australian visa from India might look hard—but with our help, it gets easy and calm. Here's how we help you at each step:</p>

            <h3 className="ins-body-h3">First Talk</h3>
            <p className="ins-body-p">We start with a face-to-face talk to know why you want to travel—may be for fun, school, work, or to see family. Based on what you want and your time plan, we pick the best visa for Australia and explain the whole thing to you clearly.</p>

            <h3 className="ins-body-h3">Gathering Papers</h3>
            <p className="ins-body-p">You don't have to come to us. Just send your papers by email or WhatsApp, and we'll check all for fullness and right info. This way of doing it from afar saves time and makes sure you give only what you really need for a smooth try.</p>

            <h3 className="ins-body-h3">Form Filling &amp; Letter Writing</h3>
            <p className="ins-body-p">Our group fills out your visa forms right and writes a strong letter for your visit's reason. We know what the Australian office looks for, so we make sure your try is well-done from the first step to the last.</p>

            <h3 className="ins-body-h3">Biometrics Time Setting</h3>
            <p className="ins-body-p">After your papers are set, we pick a time for your VFS biometrics at the place nearest you. We also give full tips on what to bring, how to get ready, and what goes on at the time to keep off any mix-ups or waiting.</p>

            <h3 className="ins-body-h3">Sending Files &amp; Watching</h3>
            <p className="ins-body-p">We send in your try and watch it closely. From the first nod to news, we tell you about each thing so you don't have to ask or worry about where your visa try stands.</p>

            <h3 className="ins-body-h3">Help After Sending</h3>
            <p className="ins-body-p">After we send it, we're not done. We help with embassy questions, need for more papers (if any), and tell you right when a choice is made. We stay with you until your visa is fully okay and you have it.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Eligibility Criteria for Australia Visit Visa from India</h2>
            <p className="ins-body-p">Before you try to get a visa for going to Australia, check if you fit the main needs set by the Department of Home Affairs. Here are the things you must have to qualify:</p>

            <h3 className="ins-body-h3">Plan to Go</h3>
            <p className="ins-body-p">You need to show that your visit is just for a short time—for fun, to see family or pals, or to go to events. Good proof of your travel plans and that you will go back helps show you won't stay too long or work without permission in Australia.</p>

            <h3 className="ins-body-h3">Money Proof</h3>
            <p className="ins-body-p">You should prove you have enough money for your whole trip, this means your flight both ways, where you stay, food, local rides, and daily costs. Bank notes, pay slips, or letters of help might be needed to show that you won't need public money in Australia.</p>

            <h3 className="ins-body-h3">Strong Links to India</h3>
            <p className="ins-body-p">To make the visa officer believe you will go back home, you need documents that show deep ties to India—like a solid job, school work, family bonds, or owning land. These ties show you have reasons to return after your visit.</p>

            <h3 className="ins-body-h3">No Bad Record</h3>
            <p className="ins-body-p">You should not have done any major bad things or stayed longer than allowed on a visa—in Australia or elsewhere. Police checks or old travel papers might be looked at to show you're right for Australia's laws on character.</p>

            <h3 className="ins-body-h3">Stay Well</h3>
            <p className="ins-body-p">If you're going to stay a while, they might ask you to get a health check. This could be an X-ray or another test to ensure you're not sick. For short trips, you often don't need a full check-up unless they say so.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose Make My Documents for Your Australia Visa Services?</h2>
            <p className="ins-body-p">At Make My Documents, we're committed to making your visa journey smooth, stress-free, and successful. Here's why travelers across India trust us with their Australia visa needs:</p>

            <h3 className="ins-body-h3">Visitor Visa</h3>
            <p className="ins-body-p">Every application is unique. We assess your profile individually and provide custom visa advice based on your travel purpose.</p>

            <h3 className="ins-body-h3">100% Online Process</h3>
            <p className="ins-body-p">You don't need to visit us. From consultation to document submission, everything is handled remotely through WhatsApp, email, and calls.</p>

            <h3 className="ins-body-h3">Expert Team</h3>
            <p className="ins-body-p">Our visa consultants have years of hands-on experience handling Australia tourist visa.</p>

            <h3 className="ins-body-h3">Error-Free Applications</h3>
            <p className="ins-body-p">We double-check every detail—forms, letters, documents—to minimize chances of delay or rejection.</p>

            <h3 className="ins-body-h3">Transparent Pricing</h3>
            <p className="ins-body-p">No confusing fees. You get clear cost breakdowns upfront—no hidden charges, no last-minute surprises.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Australia eVisitor Visa vs. Visitor Visa – What's Best for You?</h2>
            <p className="ins-body-p">When you plan a trip to Australia, you need to know the right visa type. The eVisitor Visa and Visitor Visa (Subclass 600) let you in, but they are not the same in who can use them and why.</p>

            <h3 className="ins-body-h3">eVisitor Visa</h3>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li><strong>Who can use:</strong> Only for people with passports from certain European countries.</li>
              <li><strong>Not for India:</strong> People from India can't get the eVisitor visa.</li>
              <li><strong>How to get it:</strong> You must apply online on the Australian Government site.</li>
              <li><strong>Cost:</strong> Usually free or very low.</li>
            </ul>

            <h3 className="ins-body-h3">Visitor Visa</h3>
            <ul className="pan-bullet-list">
              <li><strong>Who can use:</strong> Needed for people with Indian passports.</li>
              <li><strong>Why use it:</strong> Good for travel, seeing family, work talks, or short study.</li>
              <li><strong>How long you can stay:</strong> Often up to 3, 6, or 12 months, as allowed.</li>
              <li><strong>How long it takes:</strong> Depends on the type (Tourist)</li>
              <li><strong>How to apply:</strong> Uses VFS, needs biometric and papers.</li>
            </ul>

          </div>
        </div>
      </section>

    </div>
  )
}

