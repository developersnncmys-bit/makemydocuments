'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReviewSlider from '../components/ReviewSlider'
import {
  Bike, Car, Truck, HeartPulse, Users,
  ShieldCheck, Wallet, Smile, Scale, TrendingUp,
  Zap, Handshake, BadgeDollarSign, Compass, Download,
  UserPlus, FileText, GitCompare, CreditCard,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const I = ({ icon: Icon, size = 22, color = 'var(--teal)' }) => (
  <Icon size={size} color={color} strokeWidth={1.8} />
)

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const TYPES = [
  { Icon: Bike,       label: 'Two – Wheeler'      },
  { Icon: Car,        label: 'Four – Wheeler'      },
  { Icon: Truck,      label: 'Commercial\nVehicle' },
  { Icon: HeartPulse, label: 'Health'              },
  { Icon: Users,      label: 'Life'                },
]

const PARTNERS = [
  { name: 'Aditya Birla Capital',    src: '/aditya birla logo.png' },
  { name: 'ICICI Lombard',           src: '/icici logo.png'        },
  { name: 'HDFC ERGO',               src: '/HDFC logo.png'         },
  { name: 'Bajaj Allianz',           src: '/bajaj logo.png'        },
  { name: 'Future Generali',         src: '/futuregenerali.png'    },
  { name: 'Digit Insurance',         src: '/digit insurance.png'   },
  { name: 'HDFC Life',               src: '/hdfclife.png'          },
  { name: 'IDBI Federal Life',       src: '/idbi.png'              },
  { name: 'ICICI Prudential Life',   src: '/iciciprudential.png'   },
  { name: 'IFFCO-Tokio General',     src: '/IIFco.png'             },
  { name: 'Kotak General Insurance', src: '/kotak.png'             },
  { name: 'Liberty General',         src: '/liberty.png'           },
  { name: 'LIC of India',            src: '/lic.png'               },
  { name: 'Max Bupa Health',         src: '/maxbupa.png'           },
  { name: 'Max Life Insurance',      src: '/maxlife.png'           },
  { name: 'Raheja QBE',              src: '/raheja.png'            },
]

const REVIEWS = [
  { av: 'R', name: 'Ramesh K.',    svc: 'Two-Wheeler Insurance',  text: '"Renewing my bike insurance with Make My Documents was so simple! Got multiple quotes and downloaded my policy."' },
  { av: 'P', name: 'Priya R.',     svc: 'Health Insurance',       text: '"Excellent customer support and clear guidance. I was able to switch to a better health plan that suited my family\'s needs perfectly."' },
  { av: 'R', name: 'Rajesh T.',    svc: 'Car Insurance',          text: '"Very professional service! I renewed my car insurance without any hassle, and the team followed up to ensure I got my documents instantly."' },
  { av: 'S', name: 'Suresh M.',    svc: 'Commercial Vehicle',     text: '"The best part about Make My Documents is their quick response. I received quotes for my commercial vehicle insurance within an hour and finalized everything online."' },
  { av: 'P', name: 'Priya R.',     svc: 'Travel Insurance',       text: '"Applying for travel insurance was super easy! The team explained every detail and I had my policy in hand the same day."' },
  { av: 'R', name: 'Rajesh T.',    svc: 'Two-Wheeler Insurance',  text: '"Make My Documents made my two-wheeler insurance renewal seamless. No paperwork headaches and instant confirmation!"' },
  { av: 'A', name: 'Anil Kapoor',  svc: 'Term Life Insurance',    text: '"I was confused between so many term insurance plans. The team at Make My Documents compared all the options and helped me choose the right cover for my family. The whole process was online and the policy was issued within 24 hours. Very professional."' },
  { av: 'S', name: 'Smitha Nair',  svc: 'Family Health Insurance',text: '"Switched our family health insurance to a better plan with their help. They found us a higher cover at almost the same premium by comparing across top insurers. The claim process guidance was also excellent. Will definitely renew through them."' },
  { av: 'V', name: 'Vivek Sharma', svc: 'Car Insurance',          text: '"My car insurance had lapsed and I needed to renew it urgently. Got 5 quotes within minutes and picked the best one. Zero paperwork — everything was done digitally. Got the policy document on WhatsApp instantly. Brilliant service!"' },
  { av: 'K', name: 'Kavya Menon',  svc: 'Health Insurance',       text: '"The team helped me understand the difference between individual and floater plans very clearly. Ended up getting a comprehensive family floater at a great price. The customer support was available on weekends too. Truly amazing experience."' },
]

const BENEFITS = [
  { Icon: Wallet,      n: '01', title: 'Financial Protection',
    desc: 'Insurance works as the core financial prosthesis that will be covering the unexpected costs that come with the likes of, medical bills, the accidental destruction of your property, and the stealing of your valuable assets. Health, vehicle, and life policies with the word comprehensive in them will go a long way in securing your finances and in avoiding the turning into suddenly financial burdens.',
    color: '#2E68B1', bg: '#EBF2FB' },
  { Icon: ShieldCheck, n: '02', title: 'Risk Management',
    desc: 'For an individual, family, or business, having a well-chosen insurance plan is like having a shield that will nearly eliminate all the risks. Be it a vehicle accident, hospitalization, or property damage, insurance will always let you bounce back quickly without breaking your bank account.',
    color: '#7C3AED', bg: '#F5F3FF' },
  { Icon: Smile,       n: '03', title: 'Peace of Mind',
    desc: 'After knowing that your car, bike, health, and family are all covered under a solid insurance plan, you wont have any trouble living and travelling with confidence. Make My Documents will give you the correct cover for every need thus eliminating panic and uncertainty.',
    color: '#059669', bg: '#ECFDF5' },
  { Icon: Scale,       n: '04', title: 'Legal Compliance',
    desc: 'The Indian law states that owning a car without insurance is illegal and as for business, the latter helps you to meet the standards set by the authorities. Our platform will do all the work for you in the process of staying compliant by simply renewing your policies online and avoiding any kind of punishment or legal trouble.',
    color: '#DC2626', bg: '#FEF2F2' },
  { Icon: TrendingUp,  n: '05', title: 'Future Security',
    desc: 'Life and health insurance are a great way for your family to get the needed financial assistance in the unfortunate cases of emergencies. Basically, through temporary schemes, health care, and mix-investment policies, a person is made capable to continue the family flow even in unpredicted events.',
    color: '#F7A418', bg: '#FFF8EC' },
]

const INS_TYPES_CONTENT = [
  { Icon: Bike,       color: '#2E68B1', title: 'Two-Wheeler Insurance',
    desc: 'Insure your two-wheeler against mishaps, theft, the forces of nature, and other liabilities with a comprehensive two-wheeler insurance plan. You can generate the duplicate policy online in just a few minutes, along with the premium amount, and also get the benefit of a cashless claim settlement procedure at any of your automobile network garages. Enjoy a safe ride because we are always there for you.' },
  { Icon: Car,        color: '#7C3AED', title: 'Four-Wheeler Insurance',
    desc: 'With our car insurance package, you are safe and secure against the risks of the accident, the theft of your vehicle, fire, and any other type of calamity. Also included are complete comprehensive cover and third-party injury cover. It is our pleasure to provide assistance in online buying or renewing of car insurance where you can get competitive premiums, a policy for instant downloading, and get support anytime.' },
  { Icon: Truck,      color: '#DC2626', title: 'Commercial Vehicle Insurance',
    desc: 'Commercial vehicle insurance is a great way to protect your business investments and equipment such as trucks, vans, cabs, as well as delivery vehicles. Our insurance plans will cover you against any damage, theft, or accidents, thus ensuring smooth business operations and protecting your revenue and assets.' },
  { Icon: HeartPulse, color: '#059669', title: 'Health Insurance',
    desc: 'Sign up for a reasonably priced yet comprehensive health insurance plan that includes hospitalization, surgery, treatment for very serious diseases (such as cancer), and medical emergencies all at a reasonable rate. Moreover, there is an option for individuals and families to buy medical insurance plans to make sure the people you care about have the best treatment and the financial burden is minimized.' },
  { Icon: Users,      color: '#F7A418', title: 'Life Insurance',
    desc: "The most relieving part of life, other than the presence of your loved ones, is assuring that your absence will not disrupt your family's lives or their standard of living. A well thought-out life insurance policy plan such as term insurance, money-saving plans, and investment-oriented policies will provide monetary support to them and also become the reason for achieving your long-term objectives." },
]

const WHY_US = [
  { Icon: Zap,             color: '#F7A418', title: 'Quick & Easy Process',
    desc: 'You can no longer do paperwork or stand in long queues—just a few clicks online and your insurance policy will be bought or renewed. The use of our basic platform will save you both time and energy.' },
  { Icon: Handshake,       color: '#2E68B1', title: 'Trusted Insurance Partners',
    desc: 'We have the support of the best insurance companies in India such as HDFC Ergo, ICICI Lombard, Bajaj Allianz, and others, to provide safe policies that you can have confidence in.' },
  { Icon: BadgeDollarSign, color: '#059669', title: 'Competitive Premiums',
    desc: 'It is really easy to compare different insurance policies side by side and choose the plan that meets your budget without lessening the coverage.' },
  { Icon: Compass,         color: '#7C3AED', title: 'Expert Guidance',
    desc: 'Our experienced team will always be by your side to help you identify the right plan and understand policy benefits clearly.' },
  { Icon: Download,        color: '#DC2626', title: 'Instant Policy Delivery',
    desc: 'After you finish making your payment, it will be sent to your email or WhatsApp right away; thus, you can download it and use it easily.' },
]

const STEPS = [
  { n: 1, Icon: UserPlus,   title: 'Register Online',           desc: 'Enter your personal information and the kind of policy you require to proceed further.' },
  { n: 2, Icon: FileText,   title: 'Get Quotation',             desc: 'Tailored quotes can be sent to you either through e-mail or WhatsApp.' },
  { n: 3, Icon: GitCompare, title: 'Compare Policies',          desc: 'Look at the coverage options, premiums, and benefits of the top insurers.' },
  { n: 4, Icon: CreditCard, title: 'Make Payment',              desc: 'We accept your payment online through our secure transaction system.' },
  { n: 5, Icon: Download,   title: 'Download Policy Instantly', desc: 'Your insurance policy shall be handed over to you immediately via email or WhatsApp.' },
]

const DOCS = [
  'If you are going to buy or renew an insurance policy, the first step would be to have the necessary documents at hand.',
  'Vehicle Registration Certificate (RC) – In the case of two-wheeler, four-wheeler, and commercial vehicle insurances.',
  'Old Policy Details – In case you want to renew the policy you already have.',
  'Identity Proof – Aadhaar, PAN, Passport, or Driving License (for all insurance services).',
  'Address Proof – A utility bill, Aadhaar, or Passport for the identification process.',
  'Medical/Health Records – For health and life insurance plans (if applicable).',
]

const FAQS = [
  { q: 'Can I renew my two-wheeler or four-wheeler insurance online?',  a: 'Yes, you can renew your vehicle insurance in just a few clicks through our online portal.' },
  { q: 'How long does it take to get the insurance policy?',            a: "Once payment is made, you'll receive your policy instantly via email or WhatsApp." },
  { q: 'Do I need to submit physical documents?',                       a: 'No. You can upload documents digitally, making the entire process seamless.' },
  { q: 'Can I compare multiple policies before buying?',                a: 'Absolutely! We provide multiple quotes so you can choose the best plan at the best price.' },
  { q: 'Do you provide assistance in case of claims?',                  a: 'Yes, our team will guide you through the entire claim process and connect you with your insurer.' },
  { q: 'What if my vehicle insurance has expired?',                     a: 'You can still renew it online. In some cases, a vehicle inspection may be required.' },
  { q: 'Can I buy life or health insurance for my family?',             a: 'Yes, we offer health and life insurance policies for individuals, couples, and families.' },
  { q: 'Are your services available across India?',                     a: 'Yes, Make My Documents offers insurance services to customers across India.' },
  { q: 'Which insurance companies do you work with?',                   a: 'We partner with top insurers like HDFC Ergo, ICICI Lombard, Bajaj Allianz, and more.' },
  { q: 'Do you charge extra for your services?',                        a: 'No, there are no hidden charges. You pay only for the insurance premium.' },
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

/* â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function Insurance() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx"><Link href="/">Home</Link> / Insurance</div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div className="svc-hero-wrap">
        <div className="hero-bg" style={{ position: 'absolute', inset: 0 }}>
          <div className="dots" />
          <div className="blob1" />
          <div className="blob2" />
        </div>
        <div className="mx svc-hero-content">
          <div className="svc-hero-left">
            <div className="hero-pill">
              <span className="live-dot" />
              Insurance Services &nbsp;·&nbsp; Best Rates &nbsp;·&nbsp; Instant Policy
            </div>
            <h1 className="svc-h1">
              Protect Your Future<br />
              <span className="teal">with </span>
              <span className="amber">Ease.</span>
            </h1>
            <p className="svc-hero-sub">
              Insurance applications made simple and stress-free.
            </p>
          </div>
          <div className="svc-hero-badges">
            {[
              { val: '5+',   lbl: 'Insurance Types'  },
              { val: '4.8★', lbl: 'Google Rating'    },
              { val: '1L+',  lbl: 'Customers Served' },
              { val: 'Zero', lbl: 'Claim Rejections'  },
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

      {/* â”€â”€ Pick Type â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow">Choose Your Plan</div>
            <h2>Pick the Type of Insurance</h2>
          </div>
          <div className="ins-types-grid">
            {TYPES.map(({ Icon, label }) => (
              <div key={label} className="ins-type-v2">
                <div className="ins-type-v2-top" />
                <div className="ins-type-v2-icon">
                  <I icon={Icon} size={30} color="var(--teal)" />
                </div>
                <h3 className="ins-type-v2-label">{label}</h3>
                <a href="https://wa.me/919980097315" className="ins-type-v2-btn" target="_blank" rel="noreferrer">
                  Get Quotes →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Associated With â”€â”€ */}
      <section className="ins-partners-amber">
        <div className="mx">
          <div className="shead center" style={{ marginBottom: 40 }}>
            <div className="eyebrow">Our Network</div>
            <h2>Associated With</h2>
          </div>
          <div className="ins-marquee-wrap">
            <div className="ins-marquee-track">
              {[...PARTNERS, ...PARTNERS].map(({ name, src }, i) => (
                <div key={i} className="ins-partner-logo-bare">
                  <img src={src} alt={name} className="ins-partner-logo-img"
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                  <span className="ins-partner-logo-fallback">{name}</span>
                </div>
              ))}
            </div>
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

      {/* â”€â”€ Insurance Services Intro â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx ins-content-wrap">
          <div className="shead">
            <div className="eyebrow">About Our Service</div>
            <h2>Insurance Services – Buy/Renew Insurance Online</h2>
          </div>
          <div className="ins-callout-box">
            <p className="ins-body-p">Insurance is a big step in ensuring your future and the safety of people you care about. Through challenging situations, a proper coverage plan of the car, health or family will provide you with monetary safety. Make My Documents is your best bet to getting an easy and straightforward insurance plan. In only a few minutes, you can obtain quotes, evaluate policies, and buy insurance with no trouble.</p>
          </div>
        </div>
      </section>

      {/* â”€â”€ Benefits â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead">
            <div className="eyebrow">Why Insurance Matters</div>
            <h2>Benefits of Insurance</h2>
          </div>
          <p className="ins-body-p" style={{ marginBottom: 48, maxWidth: 860 }}>
            Insurance is definitely not just a mandatory requirement by law—it should be viewed as a very important financial instrument that guarantees both your future and your loved ones while keeping your mind at rest in the middle of life's changes. Diseases, an accident with a car, theft, or a natural catastrophe–when fitted with the perfect insurance policy, there is never a moment where you are left caught off guard. In Make My Documents, we present to you a variety of insurance programs composed to give you the maximum potential of protection and of a stressless life with cheap premiums.
          </p>
          <div className="ins-benefits-grid">
            {BENEFITS.map(({ Icon, n, title, desc, color, bg }) => (
              <div key={title} className="ins-benefit-card" style={{ '--b-color': color, '--b-bg': bg }}>
                <div className="ins-benefit-num">{n}</div>
                <div className="ins-benefit-icon">
                  <I icon={Icon} size={24} color={color} />
                </div>
                <h3 className="ins-benefit-title">{title}</h3>
                <p className="ins-benefit-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Types of Insurance â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead">
            <div className="eyebrow">Coverage Options</div>
            <h2>Types of Insurance We Offer</h2>
          </div>
          <div className="ins-types-content-grid">
            {INS_TYPES_CONTENT.map(({ Icon, color, title, desc }) => (
              <div key={title} className="ins-type-content-card" style={{ '--tc-color': color }}>
                <div className="ins-type-content-ico" style={{ background: `${color}18`, border: `1.5px solid ${color}33` }}>
                  <I icon={Icon} size={24} color={color} />
                </div>
                <div>
                  <h3 style={{ marginBottom: 8, color: 'var(--ink)' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--ink3)', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Why Choose Us â”€â”€ */}
      <section className="ins-section-white">
        <div className="mx">
          <div className="shead">
            <div className="eyebrow">Why Choose Us</div>
            <h2>Why Choose Our Insurance Services?</h2>
          </div>
          <p className="ins-body-p" style={{ marginBottom: 48, maxWidth: 860 }}>
            Make My Documents is a company that is dedicated to simplifying, demystifying, and removing the stress from the process of insurance. If you are the first person to buy a policy or simply a last-minute renewal, our platform promises that you will receive the ideal coverage at the most reasonable price without any inconvenience.
          </p>
          <div className="ins-why-grid">
            {WHY_US.map(({ Icon, color, title, desc }) => (
              <div key={title} className="ins-why-card" style={{ '--w-color': color }}>
                <div className="ins-why-icon" style={{ background: `${color}18`, border: `1.5px solid ${color}33` }}>
                  <I icon={Icon} size={22} color={color} />
                </div>
                <h3 className="ins-why-title">{title}</h3>
                <p className="ins-why-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ How It Works + Docs â”€â”€ */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="sol-layout">
            <div>
              <div className="eyebrow">Simple Process</div>
              <h2>How Make My Documents Works</h2>
              <p className="sec-desc" style={{ marginBottom: 12 }}>
                We have made it very easy to buy and renew your insurance in the case of a two-wheeler, four-wheeler, commercial vehicles, health, or life insurance. Basically, our method is simple, easy to understand, and without any worry. Just by filling out a form with your details, you can research the best insurance providers to get the best plan at once without any paper work or a long wait.
              </p>
              <h3 style={{ margin: '28px 0 16px', fontSize: 16 }}>Simple Steps to Get Any Insurance Policy</h3>
              <div className="sol-steps">
                {STEPS.map(({ n, Icon, title, desc }) => (
                  <div key={n} className="sol-step">
                    <div className="sol-connector" />
                    <div className="sol-n ins-step-n">
                      <I icon={Icon} size={16} color="#fff" />
                    </div>
                    <div>
                      <h4>{title}</h4>
                      <p style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.65, marginTop: 4 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="enquiry" style={{ position: 'sticky', top: 86 }}>
              <div className="eq-top">
                <h3>Documents Required for Insurance Services</h3>
                <p>Keep these handy before you apply</p>
              </div>
              <div className="eq-body">
                {DOCS.map((doc, i) => (
                  <div key={i} className="pc" style={{ marginBottom: 12, alignItems: 'flex-start' }}>{doc}</div>
                ))}
                <div style={{ marginTop: 20 }}>
                  <a href="https://wa.me/919980097315" className="eq-wa" target="_blank" rel="noreferrer">
                    <FaWhatsapp size={16} />
                    WhatsApp for Instant Quote
                  </a>
                </div>
              </div>
            </div>
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

      {/* â”€â”€ Keywords â”€â”€ */}
      <section style={{ background: 'var(--surf)', padding: '48px 5%', borderTop: '1px solid var(--line)' }}>
        <div className="mx">
          {[
            { label: 'Motor Insurance',  links: ['Car Insurance','Second-Hand Car Insurance','Comprehensive Car Insurance','Third-Party Car Insurance','Car Insurance Calculator','Compare Car Insurance','Zero Depreciation Car Insurance','Renew Expired Car Insurance','No Claim Bonus (NCB)','Standalone OD Car Insurance','Return to Invoice Cover','Insured Declared Value (IDV)','Two-Wheeler Insurance','Bike Insurance Calculator','Comprehensive Two-Wheeler Insurance','Third-Party Two-Wheeler Insurance','Compare Two-Wheeler Insurance','Standalone OD Bike Insurance','Vehicle Insurance','Commercial Vehicle Insurance','Multi-Year Two-Wheeler Insurance','Break-In Policy Renewal','Pay As You Drive Car Insurance','Engine Protection Cover (Car & Bike)','Roadside Assistance Cover','Scooter Insurance','NCB in Bike Insurance','RTI in Bike Insurance'] },
            { label: 'Health Insurance', links: ['Individual Health Insurance','Family Health Insurance','Senior Citizen Health Insurance','Parents Health Insurance','Health Insurance Renewal','Cashless Health Insurance','Health Insurance Premium Calculator','Critical Illness Insurance','Top-Up Health Plans','Personal Accident Cover','Health Wallet Insurance (Family & Individual)','Arogya Sanjeevani Plan','Health Insurance Portability','Diabetes & Hypertension Plans','Cancer Care Insurance','Maternity & Women Health Plans','BMI Calculator','Optima Restore (Family & Individual)','Optima Secure (Individual, Family & Global)','Optima Lite','Optima Super Secure Plan','Comprehensive Medical Coverage','Hospital Cash Benefit Plans','Daily Cash Health Cover'] },
            { label: 'Life Insurance',   links: ['Term Life Insurance','Whole Life Insurance','Endowment Plans','Retirement Plans','ULIPs (Unit Linked Insurance Plans)','Child Education Plans','Income Protection Plans','Life Cover with Investment Benefits','Savings & Protection Plans','Guaranteed Return Plans'] },
          ].map(({ label, links }) => (
            <div key={label} className="ins-keywords-row">
              <span className="ins-keywords-label">{label} : </span>
              {links.map((link, i) => (
                <span key={link}>
                  <a href="#" className="ins-keyword-link">{link}</a>
                  {i < links.length - 1 && <span className="ins-keyword-sep"> | </span>}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

