'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReviewSlider from '../components/ReviewSlider'
import useScrollReveal from '../hooks/useScrollReveal'
import BlogCard from '../components/BlogCard'
import {
  UserPlus, FileText, CreditCard, CalendarDays, ClipboardCheck, Package,
  CheckCircle2, ChevronRight, Headphones, BadgeCheck, Zap, Lock,
} from 'lucide-react'

const TRUST_STATS = [
  { val: '10,000+', lbl: 'Visas Approved'    },
  { val: '99%',     lbl: 'Delivered on Time'  },
  { val: '15–20',   lbl: 'Working Days'       },
  { val: '24/7',    lbl: 'WhatsApp Support'   },
]

const DOCUMENTS = [
  'Original Passport',
  'Original passport with 06 months validity from the date of travel. + Old Passports if any.',
  '02 Colour photographs with white background, matte finish size 35 mm X 45 mm 80% face size.',
  'Covering letter mentioning your travel details and stay details while in the UK.',
  'Original Bank statement for the last 6 months updated with healthy and sufficient balance.',
  'Income tax / Form 16 for the last 3 years.',
  'Salary Slips for the last 6 months – if employed.',
  'Original Leave letter from employer / school / college.',
  'Retirement Letter if retired.',
  'School / College ID proof – if student.',
  'Other financial papers (NSC, PPF, Bonds, FD, shares, property papers, etc.)',
  "Minor travelers: a minor accompanied by one parent shall provide an original notarized NOC by the other parent, plus copies of parents' passports or ID.",
  "Minor travelers: a minor traveling alone shall provide an original notarized NOC by both parents/legal guardians, plus copies of parents' passports or ID.",
  'Visiting Card (if your own business)',
  'School ID card copy (if you are a student)',
  'Last 3 months Bank statement.',
]

const HOW_STEPS = [
  { Icon: UserPlus,       title: 'Register Online',                        desc: 'Fill your basic details on our secure portal.'           },
  { Icon: FileText,       title: 'Door Step Documents Pickup & Verification', desc: 'We pick up and verify your documents at your doorstep.' },
  { Icon: CreditCard,     title: 'Payment',                                desc: 'Complete the payment securely to process your application.' },
  { Icon: CalendarDays,   title: 'Get Appointment',                        desc: 'We book your VFS Global appointment at a convenient time.' },
  { Icon: ClipboardCheck, title: 'Visit For Documents Verification',       desc: 'Attend the VFS centre for biometrics and verification.'    },
  { Icon: Package,        title: 'Get Delivered',                          desc: 'Receive your passport with the UK visa delivered to you.'  },
]

const WHY_US = [
  { Icon: Zap,        title: 'Expert Guidance',       desc: 'Step-by-step support from document prep to VFS appointment booking.'   },
  { Icon: BadgeCheck, title: '99% Approval Rate',     desc: 'Expert document review ensures near-perfect visa delivery on time.'     },
  { Icon: Headphones, title: 'VFS Appointment Help',  desc: 'We handle your VFS appointment scheduling at the nearest centre.'      },
  { Icon: Lock,       title: '100% Secure',           desc: 'Your data is handled with bank-grade security and full privacy.'        },
]

const REVIEWS = [
  { av: 'R', name: 'Ramesh Chandra',  svc: 'UK Tourist Visa',     text: '"Reliable and professional service. They guided me step-by-step for my UK tourist visa. The checklist they provided was clear, and their team patiently answered all my queries."' },
  { av: 'N', name: 'Neha Suri',       svc: 'UK Tourist Visa',     text: '"Saved me so much time. The Make My Documents team was quick, professional, and made sure everything was in order before submission. My visa was approved in 5 days!"' },
  { av: 'S', name: 'Sanjay Tiwari',   svc: 'UK Tourist Visa',     text: '"Perfect for first-time applicants. As a first-time UK visa applicant, I was nervous. But their team reviewed my documents, helped with my final form, and booked my VFS appointment too."' },
  { av: 'A', name: 'Aparna Krishnan', svc: 'UK Standard Visitor Visa', text: '"My UK visa application had a complex travel history and I was worried about rejections. Make My Documents thoroughly reviewed my profile, helped draft a strong covering letter explaining my travel history, and submitted a complete application. Visa approved on the first attempt. Beyond grateful!"' },
  { av: 'D', name: 'Dinesh Prabhu',   svc: 'UK Family Visit Visa', text: '"My parents wanted to visit my sister in London. Make My Documents handled their UK family visit visa applications with all the supporting documents — invitation letter, sponsorship declaration, financial proofs. Both visas were approved smoothly. Excellent service for elderly applicants."' },
  { av: 'K', name: 'Kaveri Sharma',   svc: 'UK Student Visa',     text: '"Got my UK Student Visa for a postgraduate course at Edinburgh. The team helped prepare my CAS letter, bank statements, maintenance funds evidence, and ATAS certificate documentation. Very knowledgeable about student visa requirements. My visa was approved without any queries from UKVI."' },
  { av: 'S', name: 'Sudesh Rao',      svc: 'UK Tourist Visa',     text: '"Applied for a UK tourist visa for a London trip. The VFS appointment booking, document checklist, and covering letter were all handled perfectly by Make My Documents. The entire interaction was via WhatsApp and email — no office visits. My stamped passport was couriered to me. Superb experience!"' },
]

const OTHER_COUNTRIES = [
  { name: 'United Arab Emirates', flag: '🇦🇪', path: '/dubai-tourist-visa' },
  { name: 'Singapore',            flag: '🇸🇬', path: '/singapore-visa'     },
  { name: 'Australia',            flag: '🇦🇺', path: '/australia-visa' },
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
  { q: 'What types of UK visas do you assist with?',
    a: 'We only assist with UK Tourist Visas and Family Visit Visas. We do not assist with Travel visas.' },
  { q: 'Do I need to visit your office for UK visa assistance?',
    a: 'No, our entire process can be handled online or via WhatsApp/phone. You can upload documents digitally, and we guide you through every step remotely.' },
  { q: 'How long does the UK visa application process take?',
    a: 'The standard UK tourist visa processing takes 15–20 working days. Priority and super priority services are available for faster processing.' },
  { q: 'What documents are required for a UK Tourist Visa from India?',
    a: "Typically, you'll need a valid passport, financial proofs, travel itinerary, accommodation details, employment letter, and cover letter. We'll share a personalized checklist." },
  { q: 'Do you help with appointment booking at VFS Global?',
    a: 'Yes, we handle appointment booking at VFS and assist with selecting the nearest location and suitable time slot.' },
  { q: 'Can you help me write a cover letter for the UK visa?',
    a: 'Absolutely. We draft professional and personalized cover letters tailored to your purpose of travel, enhancing your visa approval chances.' },
  { q: 'Do you offer priority or express visa application support?',
    a: 'Yes, we assist with both standard and priority UK visa applications, subject to availability from the UK visa center.' },
  { q: 'Is your service available in all Indian cities?',
    a: "Yes, our visa assistance is available PAN-India. Whether you're in a metro or a small town, we support clients nationwide." },
  { q: 'How much do you charge for UK visa assistance?',
    a: 'We do not disclose service charges in advance. Please contact our team for a consultation based on your travel needs.' },
  { q: 'What happens if my UK visa gets rejected?',
    a: 'If your visa is refused, we help you understand the rejection reason and guide you with re-application, corrections, or appeal if needed.' },
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
        <Link href="/uk-visa-form" className="pan-apply-btn">
          Apply Now <ChevronRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}

export default function UKVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link> / <Link href="/tourist-visa">Tourist Visa</Link> / UK Tourist Visa for Indians
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="uae-hero">
        <Image src="/UK hero.png" alt="United Kingdom" fill priority sizes="100vw" className="uae-hero-bg" />
        <div className="uae-hero-overlay" />
        <div className="uae-hero-content mx">
          <h1 className="uae-hero-h1">UK Tourist Visa for Indians</h1>
          <div className="uae-hero-badge">
            <span style={{ color: '#F7A418' }}>★</span> 99% Delivered on time
          </div>
          <div className="uae-hero-stats">
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Processing time</div>
              <div className="uae-stat-val">15–20 working days</div>
            </div>
            <div className="uae-stat-box">
              <div className="uae-stat-lbl">Starting from</div>
              <div className="uae-stat-val">₹12,499/-</div>
            </div>
          </div>
          <Link href="/uk-visa-form" className="btn-amber uae-hero-btn">
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
            <h2>UK Visa Charges</h2>
            <p className="sec-desc">Transparent pricing with no hidden charges.</p>
          </div>
          <div className="sgp-charges-wrap">
            <div className="sgp-charge-card">
              <div className="sgp-charge-header" style={{ background: 'linear-gradient(135deg, #012169, #c8102e)' }}>
                <span className="sgp-charge-tag">Normal Application</span>
                <div className="sgp-charge-price">₹12,499<span>/-</span></div>
                <div className="sgp-charge-sub">per person</div>
              </div>
              <div className="sgp-charge-body">
                <ul className="uae-plan-features">
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Tourist & Family Visit Visa</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Expert Document Assistance</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> VFS Appointment Booking</li>
                  <li><CheckCircle2 size={14} color="var(--teal)" strokeWidth={2} /> Cover Letter Drafting</li>
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
              <h2>Documents Required For United Kingdom Visa</h2>
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
                <div className="uae-steps-grid" style={{ marginTop: 20, gridTemplateColumns: 'repeat(3, 1fr)' }}>
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

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>UK Tourist Visa for Indians</h2>
            <p className="ins-body-p">Applying for a UK tourist visa can be hard, more so for those doing it for the first time. At Make My Documents, we help people from India get their UK tourist visa easily. If you're going to London, seeing Scotland, or having fun in the English land, we let you live out your travel wish without stress and keep your visa work easy.</p>
            <p className="ins-body-p">Our team gives tips on picking the right type of visa, gets all papers ready without mistakes, and makes sure they are sent in on time. We keep you updated all the way, so you never feel lost. With our help, travelers from India can just plan their tour while we take care of the visa work.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How to Apply for a UK Tourist Visa from India</h2>
            <p className="ins-body-p">Asking for a UK tourist visa from India might look hard, but with Make My Documents, it gets easy and calm. Our visa pros help you at each step—from knowing the right visa kind to getting your papers ready and setting up a VFS meet. With up-to-date news and full help, we make sure your form is right, on time, and free from stress.</p>

            <h3 className="ins-body-h3">Visa Type &amp; Check if You Can Get It</h3>
            <p className="ins-body-p">We start with looking at why you want to go to the UK, how long you want to stay, and what you are like. Our team helps you pick the right visa type and checks if you can get it by the UK government's rules. This cuts down the risk of them saying no and saves you both time and worry.</p>

            <h3 className="ins-body-h3">Gather &amp; Check Papers</h3>
            <p className="ins-body-p">Our group helps you get all the papers you need for the UK tourist visa, like money proofs, travel plans, and ID proofs. We make sure each paper is right and fits what the UK embassy needs—keeping clear of small mistakes that cause long waits.</p>

            <h3 className="ins-body-h3">Fill Out Forms Online &amp; Set Up a Meet</h3>
            <p className="ins-body-p">When your papers are set, we fill out your UK tourist visa form online and put up all needed files safely. We then set up the time to meet at the nearest VFS Global place. We make sure this time fits with when you want to travel and when the embassy can see you.</p>

            <h3 className="ins-body-h3">Watch &amp; Tell You</h3>
            <p className="ins-body-p">After we send it in, we keep an eye on your UK tourist visa by the UK government's paths. You'll get news as it goes so you always know what's up. From when they look at it to when you get your passport back, we tell you all until you have your visa.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>UK Visitor Visa Requirements for Indian Citizens</h2>
            <p className="ins-body-p">People from India who want to visit the UK need to meet some rules from UK Visas and Immigration (UKVI). At Make My Documents, we help you know and meet these rules—so your form is right, full, and free from holds or denials.</p>

            <h3 className="ins-body-h3">Clear Visit Plan</h3>
            <p className="ins-body-p">To get a UK visitor visa, your trip must be clear—like seeing places, meeting kin, or going to an event. We help you show the needed papers that make your travel aim clear, making it easy for the office to say yes to your form without doubts.</p>

            <h3 className="ins-body-h3">Needed Money</h3>
            <p className="ins-body-p">You must show you have enough money to take care of yourself in the UK. Bank notes or money records are needed to prove you won't need public help. Our team makes sure your money papers match UKVI's needs for an easy visa process.</p>

            <h3 className="ins-body-h3">Home Links</h3>
            <p className="ins-body-p">UK visa staff need to know you will go back home. Owning a job, land, or having close family in India shows strong links. We help you show these links well to prove your visit is short and that you have strong reasons to return.</p>

            <h3 className="ins-body-h3">Plan to Return</h3>
            <p className="ins-body-p">A big need for the UK guest visa is to show that you plan to go back home after your visit. You can do this by showing a return flight ticket or a full travel plan. We help make this proof to make sure the UK visa staff believe your trip is just for a short time.</p>

            <h3 className="ins-body-h3">Clean Visa Record</h3>
            <p className="ins-body-p">A good past with visas helps. If you've kept to visa rules before and have no crime record, your UK visitor visa odds get better. We check your past visa record and make sure there's nothing that could cause issues in your form review.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>UK Tourist Visa Fees and Processing Time in India</h2>
            <p className="ins-body-p">UK tourist visa processing time may vary depending on service speed. At Make My Documents, we guide you on timelines and steps involved, keeping the process smooth—no hidden steps, no confusion.</p>
            <ul className="pan-bullet-list" style={{ marginBottom: 4 }}>
              <li><strong>Standard 6-Month Tourist Visa:</strong> ₹12,000 – ₹24,000 (End price might shift a bit due to current money rates and VFS fees.)</li>
              <li><strong>Priority Visa Service (Optional):</strong> Additional fee for faster processing</li>
              <li><strong>Super Priority Visa Service:</strong> Available in select cities at a higher cost</li>
            </ul>
            <p className="ins-body-p">We also offer complete breakdowns of government fees and our service charges before the application begins.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Papers for Indian People</h2>
            <p className="ins-body-p">To Get a UK Tourist Visa, Indian folks need to give all needed papers. These show why you visit, your money, health, and your plan to go back. At Make My Documents, we help make every paper just right to meet UKVI rules and stop no's.</p>

            <h3 className="ins-body-h3">Valid Passport</h3>
            <p className="ins-body-p">Your passport must be good for six months past your trip and have one open page for the visa. This is key for a UK tourist visa, and we make sure it's right before we begin your ask.</p>

            <h3 className="ins-body-h3">New Passport-Sized Photos</h3>
            <p className="ins-body-p">Photos should follow UKVI rules—white behind, new, and your full face seen. Our group makes sure your photo fits the size and look needed to stop slow downs or ask to send again during the UK visa steps.</p>

            <h3 className="ins-body-h3">Sure Return Flight Tickets</h3>
            <p className="ins-body-p">A back flight ticket shows you plan to leave the UK after your visit. This makes visa folks sure your stay is short. We help you add the right travel show in your UK tourist visa ask.</p>

            <h3 className="ins-body-h3">Hotel Book or Call Note</h3>
            <p className="ins-body-p">You need to show where you'll stay in the UK. This can be a hotel book or a call note from a friend or kin there. We show you how to give the right show, made right as per embassy needs.</p>

            <h3 className="ins-body-h3">Last 6 Months Bank Papers</h3>
            <p className="ins-body-p">Bank papers are a must to show you can pay for your travel and stay in the UK. We help you show your money papers right, pointing out enough cash and steady money, which make your visa ask stronger.</p>

            <h3 className="ins-body-h3">Money Proof (Pay Notes / ITR)</h3>
            <p className="ins-body-p">New pay stubs, tax forms, or Form 16s show you have a job and are money sure. These papers show your ties to India, which is key for a UK tourist visa okay. We help set them up right.</p>

            <h3 className="ins-body-h3">Cover Note</h3>
            <p className="ins-body-p">A well-done cover note tells why you're going to the UK, your travel plan, how you'll pay for it, and why you will go back to India. Our team helps you write a short, clear note that adds to your task.</p>

            <h3 className="ins-body-h3">Travel Past (if needed)</h3>
            <p className="ins-body-p">If you've been to other lands before, show visas or stamps can prove you travel safe. It's not a must but does help. We check if your past travel helps your UK visa ask and guide you on how to add it right.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Step-by-Step UK Tourist Visa Application Process</h2>
            <p className="ins-body-p">Getting a UK tourist visa from India is now easy with the right help. At Make My Documents, we help you at each step with care. From picking the right visa type, to uploading files and going for VFS meet-ups, we make sure your form is right, complete, and worry-free.</p>

            <h3 className="ins-body-h3">Visa Type Confirmation</h3>
            <p className="ins-body-p">We begin by checking why you are traveling—may it be for fun, family visits, or an event—and pick the best UK tourist visa type. This makes sure your form fits your plan and ups your chance of quick, sure yes from UK Visas and Immigration (UKVI).</p>

            <h3 className="ins-body-h3">Customized Document Checklist</h3>
            <p className="ins-body-p">Each person is unique. That's why we give you a list of documents that are set just for you, based on your job, money, past travels, and reason for visit. You will know just what you need, this stops you from missing files or making errors that could slow or stop the process.</p>

            <h3 className="ins-body-h3">Online Application Form Assistance</h3>
            <p className="ins-body-p">Our team fills your UK tourist visa form on the official GOV.UK site with care. Every part—from your info to your travel plans—is checked to meet UKVI rules, cutting down on errors and ensuring a solid form send-off.</p>

            <h3 className="ins-body-h3">Document Upload on TLScontact/VFS Portal</h3>
            <p className="ins-body-p">We help in putting all needed files on the TLS contact or VFS site. Each file is set up and named right, following embassy rules. This step is key to avoid embassy 'no' due to bad file quality or wrong uploads.</p>

            <h3 className="ins-body-h3">VFS Appointment Scheduling</h3>
            <p className="ins-body-p">Your biometric meet-up is set up at the closest VFS Global place, when it works for you. We make sure it fits your plan and tell you what to bring for the meet-up, like slips and real files.</p>

            <h3 className="ins-body-h3">Ongoing Updates and Support</h3>
            <p className="ins-body-p">After sending it off, we watch your UK tourist visa status and share news at each part. From start to end, we let you know. Our help goes on until you get your passport back—now with a visa and all set for your UK trip.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Eligibility Criteria for UK Travel Visa (India)</h2>
            <p className="ins-body-p">If you need a UK travel visa and you're from India, you must follow the rules of UK Visas and Immigration (UKVI). At Make My Documents, we check your profile, papers, and travel plans closely to make sure you fit all needs and hand in a full, strong visa form.</p>

            <h3 className="ins-body-h3">Plan a real trip to the UK</h3>
            <p className="ins-body-p">Your visit to the UK must be for a real reason—like travel, seeing family, or going to an event. UKVI wants a clear aim with proof. We help show your travel plans in a way that meets visa rules, making getting it okayed easier.</p>

            <h3 className="ins-body-h3">Can pay for your time there</h3>
            <p className="ins-body-p">You need to prove you have enough money for your trip, stay, and day-to-day costs when in the UK. We help set up and show money proof—like bank notes or pay proof—that fits UKVI needs and shows you can pay for your visit.</p>

            <h3 className="ins-body-h3">Plan to go back to India after your trip</h3>
            <p className="ins-body-p">A solid UK travel visa form needs proof that you will go back to India after your visit. This could be a job, home tasks, owning land, or ongoing duties. We guide you in how to show these links well to make your case strong and dodge doubts of staying too long.</p>

            <h3 className="ins-body-h3">Put in a full and true form</h3>
            <p className="ins-body-p">It's key to hand in a form that's fully filled and honest. Mistakes, missing info, or false facts can cause no's or bans. Our team makes sure all your info and papers are spot on, helping you hand in a clean form to the UKVI with no risks.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Why Choose Make My Documents for Your UK Tourist Visa Application?</h2>
            <p className="ins-body-p">When you want to go to the UK for a trip from India, you need people who know the steps and care about your travel plans. At Make My Documents, we bring expert know-how, quick help, and close attention to make your UK visa form easy, right, and free of stress.</p>

            <h3 className="ins-body-h3">Over 10,000 Visa Wins</h3>
            <p className="ins-body-p">We've helped more than 10,000 Indian travelers get their UK travel visas on time. Our knowledge and high pass rate prove that we know what the UK Visas and Immigration (UKVI) looks for and how to meet those needs the right way.</p>

            <h3 className="ins-body-h3">Expert Team with Personal Help</h3>
            <p className="ins-body-p">Every visitor has their own reasons to go to the UK. Our skilled visa advisers give one-on-one help, shaping the process based on your need—be it sightseeing, family visits, or events—so your form is done with care and right detail.</p>

            <h3 className="ins-body-h3">Quick Papers &amp; Checklist Help</h3>
            <p className="ins-body-p">We give you a custom list of documents and fast check of your papers. This cuts down on usual hold-ups, stops rejection, and checks all boxes. You don't have to guess what is needed—we set up everything early.</p>

            <h3 className="ins-body-h3">Up-to-Date App Updates</h3>
            <p className="ins-body-p">From start to finish, you'll get live info on your UK travel visa form through WhatsApp and email. Be it approval, paper status, or embassy reply, you'll always be in the know without needing to ask. Stay updated via WhatsApp and email from the beginning to the end of your visa trip.</p>

            <h3 className="ins-body-h3">Sticks to UKVI Rules</h3>
            <p className="ins-body-p">We stick to the latest UKVI rules to make sure your form is fully right. Our group keeps up with visa rule changes, so you face no surprises, tech mistakes, or last-minute paper issues that could change your visa outcome.</p>

            <h3 className="ins-body-h3">Quick Options Based on Travel Plans</h3>
            <p className="ins-body-p">Pick from standard or fast-track options based on your planned travel date. Whether early or urgent, we guide you with the right process speed to fit your schedule—with no fee disclosure.</p>

            <h3 className="ins-body-h3">Help All the Way – Online &amp; In Person</h3>
            <p className="ins-body-p">Whether you need help online or face-to-face, we're here for you through your UK travel visa path. From making papers to setting your VFS meet and tracking your passport, Make My Documents does it all—so you don't have to.</p>

          </div>
        </div>
      </section>

    </div>
  )
}

