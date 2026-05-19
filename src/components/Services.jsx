'use client'

import Link from 'next/link'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const SERVICES = [
  // Row 1: Insurance, Tourist Visa, Rental Agreement, Lease Agreement, Affidavits, PAN Card
  {
    icon: '🛡️',
    title: 'Insurance Policies',
    path: '/insurance',
    desc: 'Bike, car, health and life insurance – issued digitally, quickly, with best-rate comparisons. Policy delivered in days, zero paperwork stress.',
    tags: ['Bike & Car', 'Health', 'Life Insurance'],
    price: 'Best Rates',
    applyLabel: 'Get Quote →',
  },
  {
    icon: '✈️',
    title: 'Visa Assistance',
    path: '/tourist-visa',
    desc: 'Expert documentation for tourist, business and student visas to USA, UK, Schengen, Canada, Australia and more. Full guidance, near-zero rejections.',
    tags: ['Tourist Visa'],
    price: 'From ₹1,999',
    applyLabel: 'Apply →',
  },
  {
    icon: '🏠',
    title: 'Rental Agreement',
    path: '/rental-agreement',
    desc: 'Legally drafted, e-stamped rental and lease agreements prepared and delivered to your doorstep. No notary visits, no wasted time.',
    tags: ['Rental Agreement', 'e-Stamp'],
    price: 'From ₹350',
    applyLabel: 'Apply →',
  },
  {
    icon: '📋',
    title: 'Lease Agreement',
    path: '/lease-agreement',
    desc: 'Professionally drafted lease agreements for commercial and residential properties, e-stamped and legally valid. Quick turnaround, doorstep delivery.',
    tags: ['Lease Agreement', 'Commercial', 'Residential'],
    price: 'From ₹350',
    applyLabel: 'Apply →',
  },
  {
    icon: '⚖️',
    title: 'Affidavits / Annexure',
    path: '/affidavits',
    desc: 'Legally valid affidavits and annexures drafted and notarised for name change, date of birth, address proof, income declaration and more.',
    tags: ['Affidavit', 'Annexure', 'Notarised'],
    price: 'From ₹500',
    applyLabel: 'Apply →',
  },
  {
    icon: '🪪',
    title: 'PAN Card',
    path: '/pan-card',
    desc: 'Fast PAN card services – new applications, Aadhaar linking, corrections and duplicate issuance for individuals and businesses.',
    tags: ['New PAN', 'Correction', 'Duplicate', 'Aadhaar Link'],
    price: 'From ₹350',
    applyLabel: 'Apply →',
  },
  // Row 2: Passport, Senior Citizen Card, Police Verification, MSME, Police Clearance
  {
    icon: '🛂',
    title: 'Passport Services',
    path: '/passport',
    desc: 'End-to-end passport assistance – new applications, renewals, Tatkal, lost passport. We handle the PSK appointment, police verification, and final delivery.',
    tags: ['New Application', 'Renewal', 'Tatkal', 'Lost / Damaged'],
    price: 'From ₹2,499',
    applyLabel: 'Apply →',
  },
  {
    icon: '👴',
    title: 'Senior Citizen Card',
    path: '/senior-citizen-card',
    desc: 'Hassle-free Senior Citizen Card applications for Karnataka residents. Avail government benefits, concessions and priority services with ease.',
    tags: ['Senior Citizen Card', 'Karnataka', 'Govt. Benefits'],
    price: 'From ₹300',
    applyLabel: 'Apply →',
  },
  {
    icon: '🔍',
    title: 'Police Verification Certificate (PVC)',
    path: '/police-verification',
    desc: 'Police Verification Certificates (PVC) for tenant verification, domestic help, and other background verification requirements in Bangalore.',
    tags: ['Police Verification', 'Tenant Check', 'Background'],
    price: 'From ₹750',
    applyLabel: 'Apply →',
  },
  {
    icon: '🏭',
    title: 'MSME Certificate',
    path: '/msme-registration',
    desc: 'Register your Micro, Small or Medium Enterprise and obtain the Udyam Registration Certificate. Unlock government schemes, subsidies and priority lending.',
    tags: ['Udyam Registration', 'MSME', 'Small Business'],
    price: 'Contact Us',
    applyLabel: 'Apply →',
  },
  {
    icon: '🔒',
    title: 'Police Clearance Certificate (PCC)',
    path: '/police-clearance',
    desc: 'Police Clearance Certificates (PCC) processed smoothly for employment abroad, immigration and visa applications.',
    tags: ['PCC', 'Employment Abroad', 'Immigration'],
    price: 'From ₹1,000',
    applyLabel: 'Apply →',
  },
]

export default function Services() {
  return (
    <section className="svcs" id="services">
      <div className="mx">
        <div className="shead between rv">
          <div>
            <div className="eyebrow">What We Offer</div>
            <h2>Every Document.<br />One Place. Done Right.</h2>
          </div>
        </div>

        <div className="svcs-grid">
          {SERVICES.map(({ icon, title, path, desc, tags, price, applyLabel, priceStyle, applyStyle }) => (
            <Link key={title} href={path} className="svc rv not-p" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="svc-head">
                <div className="svc-ico">{icon}</div>
                <span className="svc-arr">↗</span>
              </div>
              <h3>{title}</h3>
              <p className="svc-desc">{desc}</p>
              <div className="svc-tags">
                {tags.map(t => <span key={t} className="svc-tag">{t}</span>)}
              </div>
              <div className="svc-foot">
                <span className="svc-price" style={priceStyle}>{price}</span>
                <span className="svc-apply" style={applyStyle}>
                  {applyLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
