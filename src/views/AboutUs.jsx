'use client'

import Link from 'next/link'
import {
  ShieldCheck, Zap, LayoutGrid, BadgeCheck, HeartHandshake,
  Target, Eye, Users, Star, Landmark, CalendarDays,
  CreditCard, BookOpen, Plane, Home, CheckCircle2, Clock,
} from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'

const SERVICES_GRID = [
  { Icon: CreditCard, label: 'PAN Card',  price: '₹350',    time: '3–5 days',  bg: 'var(--green-bg)',  bd: 'var(--green-bd)',  ic: 'var(--green)'   },
  { Icon: BookOpen,   label: 'Passport',  price: '₹2,499',  time: '7–14 days', bg: 'var(--teal-bg)',   bd: 'var(--teal-bd)',   ic: 'var(--teal)'    },
  { Icon: Plane,      label: 'Visa',      price: '₹1,999+', time: 'Varies',    bg: 'var(--amber-bg)',  bd: 'var(--amber-bd)',  ic: 'var(--amber)'   },
  { Icon: Home,       label: 'Rental Agr.', price: '₹999',  time: '48 hrs',    bg: 'var(--teal-bg)',   bd: 'var(--teal-bd)',   ic: 'var(--teal)'    },
]

const WHY_CHOOSE = [
  {
    n: '01', Icon: ShieldCheck, label: 'Expert Guidance',
    text: 'Our team consists of experienced professionals who are well-versed in the intricacies of document processing. We provide expert guidance to ensure that you navigate the application process smoothly.',
  },
  {
    n: '02', Icon: Zap, label: 'Efficiency at its Best',
    text: 'Time is valuable, and we understand that. With Make My Documents, you can expect prompt and efficient services. We work diligently to expedite the processing of your documents, saving you time and effort.',
  },
  {
    n: '03', Icon: LayoutGrid, label: 'Comprehensive Services',
    text: "Whether you need assistance with PAN cards, passports, visas, or other essential documents, we've got you covered. Our comprehensive range of services is designed to meet all your document-related needs under one roof.",
  },
  {
    n: '04', Icon: BadgeCheck, label: 'CSC Approved',
    text: 'Make My Documents is registered and approved by the Common Service Center (CSC) — e-Governance Services India Limited, Government of India. Our CSC ID: 132254620016 ensures that you can trust us with your document requirements.',
  },
  {
    n: '05', Icon: HeartHandshake, label: 'Customer-Centric Approach',
    text: 'Your satisfaction is our priority. We take a customer-centric approach, tailoring our services to meet your specific needs. Our friendly and responsive customer support team is always ready to assist you.',
  },
]

const STATS = [
  { Icon: Users,        val: '1L+',  lbl: 'Customers Served' },
  { Icon: Star,         val: '4.8',  lbl: 'Google Rating'    },
  { Icon: CalendarDays, val: '10+',  lbl: 'Years of Trust'   },
  { Icon: Landmark,     val: 'CSC',  lbl: 'Gov. Approved'    },
]

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function AboutUs() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 66 }}>

      {/* -- HERO -- */}
      <section className="au-hero">
        <div className="hero-bg">
          <div className="blob1" />
          <div className="blob2" />
          <div className="blob3" />
        </div>

        <div className="au-hero-inner mx">
          <div className="au-hero-left">
            <h1 className="rv" style={{ letterSpacing: '-2px' }}>
              Your Trusted Partner<br />
              for <span className="teal">Hassle-Free</span><br />
              <span className="amber">Documents.</span>
            </h1>
            <p className="hero-sub rv" style={{ maxWidth: 480 }}>
              Welcome to Make My Documents — simplifying PAN cards, passports, visas,
              agreements and more since 2013.
            </p>
            <div className="au-hero-stats rv">
              {STATS.map(({ Icon, val, lbl }) => (
                <div className="au-hs-item" key={lbl}>
                  <Icon size={15} strokeWidth={2} color="var(--teal-dk)" />
                  <span className="au-hs-val">{val}</span>
                  <span className="au-hs-lbl">{lbl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="au-hero-right rv-r">


            {/* Main dashboard card */}
            <div className="au-dash-card">

              {/* Header */}
              <div className="au-dash-header">
                <div className="au-dash-header-left">
                  <div className="au-dash-online">
                    <span className="live-dot" />
                    We're Online
                  </div>
                  <div className="au-dash-title">Expert Document Services</div>
                  <div className="au-dash-sub">11 services · Fastest turnaround</div>
                </div>
              </div>

              {/* Body */}
              <div className="au-dash-body">
                <div className="au-dash-label">Popular Services</div>
                <div className="au-svc-grid">
                  {SERVICES_GRID.map(({ Icon, label, price, time, bg, bd, ic }) => (
                    <div className="au-svc-item" key={label}>
                      <div className="au-svc-ico" style={{ background: bg, borderColor: bd }}>
                        <Icon size={18} strokeWidth={1.8} color={ic} />
                      </div>
                      <div className="au-svc-name">{label}</div>
                      <div className="au-svc-price">{price}</div>
                      <div className="au-svc-time">
                        <Clock size={10} strokeWidth={2} color="var(--ink4)" />
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer trust strip */}
              <div className="au-dash-footer">
                <div className="au-dash-stat">
                  <Users size={13} strokeWidth={2} color="var(--teal)" />
                  <span className="au-ds-val">1L+</span>
                  <span className="au-ds-lbl">Customers</span>
                </div>
                <div className="au-dash-divider" />
                <div className="au-dash-stat">
                  <Star size={13} strokeWidth={2} color="var(--amber)" />
                  <span className="au-ds-val">4.8</span>
                  <span className="au-ds-lbl">Rating</span>
                </div>
              </div>
            </div>

            {/* Floating rating pill */}
            <div className="au-float-rating">
              <Star size={13} strokeWidth={2.5} color="#fff" fill="#fff" />
              <span>4.8 Google Rating</span>
            </div>

          </div>
        </div>
      </section>

      {/* -- INTRO BAND -- */}
      <section className="au-intro">
        <div className="mx">
          <div className="au-intro-card rv">
            <div className="au-intro-accent" />
            <div className="au-intro-text">
              <div className="eyebrow">Who We Are</div>
              <p>
                At Make My Documents, we understand the challenges and complexities that often come with
                obtaining essential documents like PAN cards, passports, travel visas, senior citizen cards,
                police clearance certificates (PCC), police verification certificates (PVC), and various
                insurance policies, including those for bikes, cars, health, and life. We also assist in
                securing rental agreements and lease agreements. That's why we are here to simplify the
                process for you. As a dedicated document solutions company, we take pride in being your
                reliable and efficient partner on your journey to acquiring crucial documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -- WHY CHOOSE -- */}
      <section className="au-why">
        <div className="mx">
          <div className="shead center rv">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Why Choose Us</div>
            <h2>Why Choose Make My Documents?</h2>
            <p className="sec-desc">
              Choose Make My Documents for a hassle-free and efficient experience in obtaining your
              essential documents. Let us be your trusted partner on your journey to a document-ready future!
            </p>
          </div>

          <div className="au-why-grid">
            {WHY_CHOOSE.map(({ n, Icon, label, text }) => (
              <div key={n} className="au-why-card rv">
                <div className="au-why-num">{n}</div>
                <div className="au-why-ico-wrap">
                  <Icon size={22} strokeWidth={1.8} color="var(--teal)" />
                </div>
                <h3 style={{ marginBottom: 8 }}>{label}</h3>
                <p className="au-why-desc">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- MISSION + VISION -- */}
      <section className="au-mv-section">
        <div className="mx">
          <div className="shead center rv">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Purpose</div>
            <h2>Mission &amp; Vision</h2>
          </div>

          <div className="au-mv-grid">

            {/* Mission */}
            <div className="au-mv-card au-mv-amber rv">
              <div className="au-mv-topbar" />
              <div className="au-mv-inner">
                <div className="au-mv-pill amber">
                  <Target size={12} strokeWidth={2.5} />
                  Our Mission
                </div>
                <h2 className="au-mv-heading">Mission</h2>
                <p className="au-mv-text">
                  Our mission is to empower individuals by providing seamless and expedited services for
                  document procurement. We strive to eliminate the stress and confusion often associated
                  with government paperwork, allowing you to focus on what matters most.
                </p>
                <div className="au-mv-divider" />
                <div className="au-mv-quote">
                  "Simplifying paperwork for every Indian."
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="au-mv-card au-mv-teal rv">
              <div className="au-mv-topbar" />
              <div className="au-mv-inner">
                <div className="au-mv-pill teal">
                  <Eye size={12} strokeWidth={2.5} />
                  Our Vision
                </div>
                <h2 className="au-mv-heading">Vision</h2>
                <p className="au-mv-text">
                  To create a better everyday life for many people. Our business idea supports this vision
                  by offering a wide range of document services at prices so low that as many people as
                  possible will be able to afford them.
                </p>
                <div className="au-mv-divider" />
                <div className="au-mv-quote">
                  "Documents for everyone, at prices that make sense."
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -- CTA -- */}
      <section className="au-cta-section">
        <div className="mx">
          <div className="au-cta rv">
            <h2 style={{ color: '#fff', marginBottom: 12 }}>Ready to Get Started?</h2>
            <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
              Let our experts handle your documents so you can focus on what matters most.
            </p>
            <div className="au-cta-btns">
              <a href="https://wa.me/919980097315" target="_blank" rel="noreferrer" className="btn-teal">
                WhatsApp Us →
              </a>
              <Link href="/" onClick={() => setTimeout(() => scrollTo('services'), 100)} className="au-cta-ghost">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

