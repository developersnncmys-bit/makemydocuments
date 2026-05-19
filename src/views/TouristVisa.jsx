'use client'

import { useState } from 'react'
import Link from 'next/link'
import useScrollReveal from '../hooks/useScrollReveal'
import ReviewSlider from '../components/ReviewSlider'
import {
  CheckCircle2, FileText, Upload, ShieldCheck,
  CreditCard, Mail, Globe, Users, Award
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

const COUNTRIES = [
  { name: 'United Arab Emirates', code: 'ae', img: '/UAE.jpg',        tag: '200K+ Visas Approved', type: 'e-Visa · Online Apply',     path: '/dubai-tourist-visa' },
  { name: 'Singapore',            code: 'sg', img: '/Singapore.jpg',  tag: '84K+ Visas Approved',  type: 'e-Visa · Expert Guided',    path: '/singapore-visa' },
  { name: 'United Kingdom',       code: 'gb', img: '/UK.jpg',         tag: '74K+ Visas Approved',  type: 'Sticker Visa · Full Support', path: '/uk-visa' },
  { name: 'Australia',            code: 'au', img: '/Aus.jpg',        tag: '20K+ Visas Approved',  type: 'e-Visa · Expert Help',       path: '/australia-visa' },
  { name: 'Malaysia',             code: 'my', img: '/Malaysia.jpg',   tag: '61K+ Visas Approved',  type: 'e-Visa · Easy Process',     path: '/malaysia-visa' },
  { name: 'Egypt',                code: 'eg', img: '/egypt.jpg',      tag: '15K+ Visas Approved',  type: 'VOA · Expert Guided',        path: '/egypt-visa' },
  { name: 'Vietnam',              code: 'vn', img: '/vietnam.jpg',    tag: '74K+ Visas Approved',  type: 'e-Visa · Quick Apply',      path: '/vietnam-tourist-visa' },
  { name: 'Hong Kong',            code: 'hk', img: '/hongkong.jpg',   tag: '30K+ Visas Approved',  type: 'e-Visa · Online Apply',      path: '/hong-kong-tourist-visa-for-indians' },
  { name: 'Indonesia',            code: 'id', img: '/indonesia.jpg',  tag: '61K+ Visas Approved',  type: 'VOA · Hassle-Free',         path: '/indonesia-tourist-visa-for-indians' },
  { name: 'Azerbaijan',           code: 'az', img: '/azerbaijan.jpg', tag: '10K+ Visas Approved',  type: 'e-Visa · Easy Process',      path: '/azerbaijan-visa' },
  { name: 'Oman',                 code: 'om', img: '/oman.jpg',       tag: '12K+ Visas Approved',  type: 'e-Visa · Quick Apply'       , path: '/oman-visa' },
  { name: 'Morocco',              code: 'ma', img: '/morocco.jpg',    tag: '8K+ Visas Approved',   type: 'Sticker Visa · Full Help',   path: '/morocco-visa' },
  { name: 'Bahrain',              code: 'bh', img: '/bahrain.jpg',    tag: '18K+ Visas Approved',  type: 'e-Visa · Fast Apply',        path: '/bahrain-visa' },
  { name: 'Qatar',                code: 'qa', img: '/qatar.jpg',      tag: '22K+ Visas Approved',  type: 'e-Visa · Online Apply'      , path: '/qatar-visa' },
  { name: 'Russia',               code: 'ru', img: '/russia.jpg',     tag: '5K+ Visas Approved',   type: 'Sticker Visa · Guided',      path: '/russia-visa' },
  { name: 'Uzbekistan',           code: 'uz', img: '/uzbekistan.jpg', tag: '3K+ Visas Approved',   type: 'e-Visa · Easy Process'      , path: '/uzbekistan-visa' },
]

const REVIEWS = [
  { av: 'R', name: 'Ramesh K',      svc: 'Tourist Visa',       text: '"Excellent service! The team was quick, professional, and made the entire process smooth and stress-free."' },
  { av: 'R', name: 'Rathik KR',     svc: 'Dubai Visa',         text: '"Good service I got my Dubai visa with 2 days thanks to make my documents and team."' },
  { av: 'D', name: 'Dhyan',         svc: 'Tourist Visa',       text: '"It was good experience they r very fasting in collecting and submitting details, its good no waiting long."' },
  { av: 'S', name: 'Shriya Menon',  svc: 'Thailand Visa',      text: '"Applied for a Thailand tourist visa for my family of 4 through Make My Documents. They collected all our documents, prepared the application, and submitted it on our behalf. All 4 visas were approved in 3 days. Incredible service — booking my next trip already!"' },
  { av: 'A', name: 'Ajay Nair',     svc: 'Singapore Visa',     text: '"The team handled my Singapore visa application end-to-end. They told me exactly which documents to provide and submitted the application immediately. Got my visa approved within 5 working days. Would highly recommend for first-time travellers."' },
  { av: 'T', name: 'Tanvi Kulkarni',svc: 'Malaysia Visa',      text: '"Very impressed with how efficiently they processed my Malaysia visa. Got regular WhatsApp updates throughout the process. The final visa was emailed to me well before my travel date. Professional and reliable — 10 out of 10!"' },
  { av: 'N', name: 'Nikhil Verma',  svc: 'Multiple-Country Visa', text: '"I was travelling to UAE, Singapore, and Australia in the same month and needed three visas at once. Make My Documents handled all three applications simultaneously without any confusion. All visas came through on time. Absolutely outstanding coordination!"' },
]

const HOW_STEPS = [
  { Icon: FileText,  title: 'Register Online',              desc: 'The first step will be to provide your basic details in our online visa application portal, which is completely secure.' },
  { Icon: Upload,    title: 'Upload Documents',             desc: 'Sending your passport, photos, and travel details can be done in a matter of minutes using WhatsApp or email.' },
  { Icon: ShieldCheck,title:'Documents Verification',      desc: 'Our visa issue specialists verify all the details in the visa application and ensure it fulfills the requirements of the diplomatic mission, thus lowering the probability of refusal.' },
  { Icon: CreditCard,title: 'Make a Secure Payment',       desc: 'Quickly and without hassle, payment can be made through a secure, fully encrypted network for the visa application without any delay.' },
  { Icon: Mail,      title: 'Receive Your E-Visa via Email',desc: 'When your e-visa application is successful, the e-visa file will be sent directly to your email. You can download it to your computer or print it out and be good to go.' },
]

const WHY_US = [
  { n: '01', Icon: Globe,  title: 'Complete Online Process', desc: 'Upload your documents in minutes and leave the entire visa process to us — no office visits needed.' },
  { n: '02', Icon: Users,  title: 'Dedicated Expert Team',   desc: 'A team of visa specialists tracks your application and sends you real-time updates at every stage.' },
  { n: '03', Icon: Award,  title: '99% Approval Rate',       desc: 'Our meticulous document review process ensures near-perfect approval rates across all destinations.' },
]

const DOCUMENTS = [
  { title: 'Valid Passport (6+ Months Validity)',       desc: 'Make sure your passport has at least six months of validity and enough blank pages for any visa stamp.' },
  { title: 'Passport-Size Photographs',                desc: 'Recent pictures of yourself corresponding to the size and format set by the embassy.' },
  { title: 'Confirmed Flight Tickets & Hotel Bookings',desc: 'A certificate of round-trip tickets and hotel reservations to show your traveling itinerary.' },
  { title: 'Proof of Funds or Bank Statements',        desc: 'Some countries request bank statements to make sure the traveler has enough money for the trip.' },
  { title: 'Travel Insurance (If Required)',           desc: 'If the destination is a country from the Schengen area, travel insurance will be obligatory for the stay.' },
  { title: 'Additional Embassy-Specific Forms',        desc: 'You may also need to submit additional paperwork or a declaration depending on where you are going.' },
]

const FAQS = [
  { q: 'When should I apply for a tourist visa?',
    a: "It's best to apply 3–4 weeks before your travel date to ensure enough time for document verification and embassy processing." },
  { q: 'Is the tourist visa application process 100% online?',
    a: 'Yes! You can apply online, upload documents, and make secure payments without visiting an office.' },
  { q: 'How long does it take to get a tourist visa approved?',
    a: 'Processing time varies by destination but typically takes 3–15 working days. Some countries may issue e-visas in as little as 48 hours.' },
  { q: 'Will I need to visit an embassy in person?',
    a: "Not always. Many destinations allow online applications and e-visas. For countries requiring biometrics or interviews, we'll guide you step-by-step." },
  { q: 'What happens if my tourist visa is delayed or rejected?',
    a: 'Our team will review your application, identify errors, and assist with reapplication to increase your chances of approval.' },
  { q: 'Which countries require travel insurance for tourist visas?',
    a: "Countries like Schengen states, UAE, and some European destinations make travel insurance mandatory. We'll inform you based on your destination." },
  { q: 'Can I apply for a tourist visa if my passport is about to expire?',
    a: 'Most countries require your passport to have at least 6 months of validity. Renew your passport before applying if needed.' },
  { q: 'Do I need confirmed flight tickets before applying?',
    a: 'Yes, most embassies require proof of round-trip flight bookings and hotel reservations to process your visa.' },
  { q: 'Can I get a tourist visa if I have no travel history?',
    a: 'Yes! We help first-time travelers with proper documentation and guidance to get their tourist visa approved.' },
  { q: 'How do I track my visa application status?',
    a: 'We keep you updated with real-time notifications and provide embassy or consulate tracking details where applicable.' },
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

export default function TouristVisa() {
  useScrollReveal()
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Tourist Visa</div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="svc-hero-wrap">
        <div className="hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <div className="dots" /><div className="blob1" /><div className="blob2" />
        </div>
        <div className="mx svc-hero-content">
          <div className="svc-hero-left">
            <div className="hero-pill">
              <span className="live-dot" />
              Tourist Visa Services &nbsp;·&nbsp; 16+ Countries &nbsp;·&nbsp; Online
            </div>
            <h1 className="svc-h1">
              Tourist Visa<br />
              <span className="teal">Services </span>
              <span className="amber">Made Simple.</span>
            </h1>
            <p className="svc-hero-sub">
              Apply online with ease — UAE, Singapore, UK, Australia and more. Expert documentation, zero rejections, fast processing.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ⏱ 3–15 Working Days
              </span>
              <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '5px 14px', fontSize: 12, color: '#fff', fontWeight: 600 }}>
                ✈️ e-Visa Delivered by Email
              </span>
            </div>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '16+',  lbl: 'Countries Covered' },
              { val: '4.8★', lbl: 'Google Rating'     },
              { val: '48hrs',lbl: 'e-Visa Delivery'   },
              { val: '0',    lbl: 'Rejections'         },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="svc-stat-card">
                <div className="svc-stat-val">{val}</div>
                <div className="svc-stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="svc-hero-wave" />
      </div>

      {/* â”€â”€ Countries Grid â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow">Destinations We Cover</div>
            <h2>Apply for Visa to Any of These Countries</h2>
            <p className="sec-desc">We handle end-to-end tourist visa documentation for all major destinations.</p>
          </div>
          <div className="tv-countries-grid">
            {COUNTRIES.map(({ name, code, img, tag, type, path }, i) => (
              path ? (
              <Link
                key={name}
                href={path}
                className="tv-country-card"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <img
                  src={img || `https://flagcdn.com/w320/${code}.png`}
                  alt={name}
                  className="tv-card-bg-img"
                />
                <div className="tv-card-overlay" />
                <div className="tv-card-content">
                  <span className="tv-card-badge">{tag}</span>
                  <div className="tv-card-bottom">
                    <div className="tv-card-cname">{name}</div>
                  </div>
                </div>
              </Link>
              ) : (
              <a
                key={name}
                href="https://wa.me/919980097315"
                className="tv-country-card"
                target="_blank"
                rel="noreferrer"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <img
                  src={img || `https://flagcdn.com/w320/${code}.png`}
                  alt={name}
                  className="tv-card-bg-img"
                />
                <div className="tv-card-overlay" />
                <div className="tv-card-content">
                  <span className="tv-card-badge">{tag}</span>
                  <div className="tv-card-bottom">
                    <div className="tv-card-cname">{name}</div>
                  </div>
                </div>
              </a>
              )
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Why Make My Documents â”€â”€ */}
      <section className="ins-section-dark">
        <div className="mx">
          <div className="shead center" style={{ marginBottom: 48 }}>
            <div className="eyebrow" style={{ borderColor: 'rgba(255,255,255,.25)', color: 'rgba(255,255,255,.65)' }}>Why Choose Us</div>
            <h2 style={{ color: '#fff' }}>Why <span style={{ color: '#F7A418' }}>Make My Documents?</span></h2>
          </div>
          <div className="tv-why-grid">
            {WHY_US.map(({ n, Icon, title, desc }) => (
              <div key={n} className="tv-why-card">
                <div className="tv-why-icon-wrap">
                  <Icon size={20} color="#fff" strokeWidth={1.8} />
                </div>
                <div className="tv-why-num">{n}</div>
                <h3 className="tv-why-title">{title}</h3>
                <p className="tv-why-desc">{desc}</p>
                <div className="tv-why-divider" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Reviews â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow">Client Reviews</div>
            <h2>Our Client Reviews</h2>
          </div>
          <ReviewSlider reviews={REVIEWS} />
        </div>
      </section>

      {/* â”€â”€ Long-form content â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="ins-body-wrap">

            <h2 className="ins-body-h2">Tourist Visa Services – Apply Online With Ease</h2>
            <h3 className="ins-body-h3">Your Dream Trip, Just a Few Clicks Away</h3>
            <p className="ins-body-p">Are you thinking about traveling abroad? To free you up to devote more time to organizing your trip, we handle all the formalities of your tourist visa in a fast and simple way, making the whole process less stressful.</p>
            <p className="ins-body-p">We at Make My Documents are the best in the business when it comes to providing tourist visa services. We provide the most reliable and safest support to travelers going to Dubai, Singapore, the UK, USA, and other popular destinations.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Get the Best Tourist Visa Assistance</h2>
            <p className="ins-body-p">Looking for fast and reliable tourist visa assistance? At Make My Documents, we specialize in helping travelers get their tourist visas approved quickly and hassle-free. Whether you're planning a trip to Dubai, Singapore, the UK, USA, Canada, Australia, or Schengen countries, our team provides end-to-end support from document preparation to final visa approval. Our easy online visa application process ensures you can apply from the comfort of your home without worrying about embassy procedures.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Trusted Agents for Tourist Visas</h2>
            <p className="ins-body-p">We are known as one of the most trusted tourist visa agents, with a track record of assisting thousands of travelers. From first-time travelers to frequent flyers, our tourist visa consultants provide accurate guidance, secure document handling, and timely updates to make your travel plans stress-free. We stay updated on embassy rules, visa requirements, and processing timelines, giving you a smooth and reliable experience.</p>

            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How We Help as Your Tourist Visa Agents</h2>
            <p className="ins-body-p">As your tourist visa agents, we do more than just process paperwork. We provide step-by-step assistance, including:</p>
            <ul className="pan-bullet-list" style={{ marginBottom: 16 }}>
              <li><strong>Document Verification &amp; Guidance:</strong> We review your application and ensure compliance with embassy standards.</li>
              <li><strong>Secure Online Submissions:</strong> Apply tourist visas online without visiting multiple offices.</li>
              <li><strong>Multi-Destination Coverage:</strong> Whether it's a Dubai tourist visa, Schengen visa, or Singapore e-visa or any other country we've got you covered.</li>
              <li><strong>Timely Updates &amp; Support:</strong> Get real-time updates and personalized help at every step.</li>
              <li><strong>Reapplication Assistance:</strong> If needed, we guide you through correcting errors and reapplying.</li>
            </ul>
            <p className="ins-body-p">Our goal is to make us your go-to visa consultants, so you can travel confidently without worrying about delays or rejections.</p>

            {/* How It Works */}
            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>How It Works – Simple 5-Step Process</h2>
            <p className="ins-body-p">If you are out of time or just don't feel like queuing, take a trip online. An online tourist visa application with Make My Documents is a perfect solution. We will take you through our step-by-step process, which is guaranteed to be accurate, safe, and quicker to get the approvals:</p>
            <div className="sol-steps" style={{ marginBottom: 36 }}>
              {HOW_STEPS.map(({ Icon, title, desc }, i) => (
                <div key={i} className="sol-step">
                  <div className="sol-connector" />
                  <div className="sol-n ins-step-n"><I icon={Icon} size={16} color="#fff" /></div>
                  <div>
                    <h4>{title}</h4>
                    <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.65, marginTop: 4 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents */}
            <h2 className="ins-body-h2" style={{ color: 'var(--teal)' }}>Documents You'll Need</h2>
            <p className="ins-body-p">To get a tourist visa online, the most important thing is the documents to be in the right order. This will be the essentials you are usually expected to present:</p>
            {DOCUMENTS.map(({ title, desc }) => (
              <div key={title} style={{ marginBottom: 20 }}>
                <p className="ins-body-p" style={{ marginBottom: 4 }}><strong style={{ color: 'var(--ink)' }}>{title}</strong></p>
                <p className="ins-body-p" style={{ marginBottom: 0 }}>{desc}</p>
              </div>
            ))}

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


    </div>
  )
}

