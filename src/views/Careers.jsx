'use client'

import Link from 'next/link'
import {
  Briefcase, MapPin, Clock, ArrowRight, Users, Star,
  TrendingUp, HeartHandshake, Zap, ShieldCheck, GraduationCap,
  Coffee, Laptop, IndianRupee, Medal, ChevronRight,
} from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'

const OPEN_ROLES = [
  {
    title: 'Document Verification Executive',
    dept: 'Operations',
    type: 'Full-time',
    location: 'Bangalore, KA',
    exp: '1–3 years',
    bg: 'var(--teal-bg)',
    bd: 'var(--teal-bd)',
    ic: 'var(--teal)',
    desc: 'Verify and process customer document applications — PAN cards, passports, police clearance certificates and more.',
    tags: ['Documentation', 'KYC', 'Government Portals'],
  },
  {
    title: 'Customer Support Associate',
    dept: 'Support',
    type: 'Full-time',
    location: 'Bangalore, KA',
    exp: '0–2 years',
    bg: 'var(--amber-bg)',
    bd: 'var(--amber-bd)',
    ic: 'var(--amber)',
    desc: 'Be the first point of contact for our 1L+ customers. Guide them through service queries over WhatsApp, phone and email.',
    tags: ['Customer Service', 'WhatsApp', 'CRM'],
  },
  {
    title: 'Digital Marketing Specialist',
    dept: 'Marketing',
    type: 'Full-time',
    location: 'Bangalore, KA',
    exp: '2–4 years',
    bg: 'var(--green-bg)',
    bd: 'var(--green-bd)',
    ic: 'var(--green)',
    desc: 'Drive organic and paid growth across Google, Instagram and Meta. Manage SEO, run performance campaigns, and grow our brand.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Content'],
  },
  {
    title: 'Field Relationship Officer',
    dept: 'Sales & BD',
    type: 'Full-time',
    location: 'Pan India',
    exp: '1–3 years',
    bg: 'var(--teal-bg)',
    bd: 'var(--teal-bd)',
    ic: 'var(--teal)',
    desc: 'On-board new CSC partners and field agents across India. Build and maintain relationships with local business owners.',
    tags: ['Field Sales', 'CSC Partners', 'BD'],
  },
]

const PERKS = [
  { Icon: IndianRupee, label: 'Competitive Pay',    text: 'Market-rate salaries reviewed every year, with performance bonuses.' },
  { Icon: TrendingUp,  label: 'Fast Growth',        text: 'Flat hierarchy — your impact is visible and promotions come quickly.' },
  // { Icon: GraduationCap, label: 'Learning Budget',  text: 'Annual upskilling allowance for courses, certifications and workshops.' },
  // { Icon: Laptop,      label: 'Flexible Work',      text: 'Hybrid work model — 3 days office, 2 days remote after probation.' },
  { Icon: Coffee,      label: 'Great Culture',      text: 'Team lunches, celebrations, and a genuinely friendly work environment.' },
  { Icon: ShieldCheck, label: 'Health Cover',       text: 'Mediclaim insurance for you and your immediate family from day one.' },
]

const VALUES = [
  { n: '01', Icon: HeartHandshake, label: 'Customer First',   text: 'Every decision we make starts with "how does this help our customer?".' },
  { n: '02', Icon: Zap,            label: 'Bias for Action',  text: 'We move fast, iterate quickly, and learn from doing.' },
  { n: '03', Icon: Medal,          label: 'Own It',           text: 'We take full ownership of outcomes — good or bad — and grow from them.' },
  { n: '04', Icon: Users,          label: 'Team Over Self',   text: 'We win together. Collaboration always beats individual heroics.' },
]

const STATS = [
  { Icon: TrendingUp, val: '3×', lbl: 'Growth in 2 yrs' },
  { Icon: Briefcase, val: '11+', lbl: 'Departments'     },
]

export default function Careers() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 66 }}>

      {/* ── HERO ── */}
      <section className="car-hero">
        <div className="hero-bg">
          <div className="blob1" />
          <div className="blob2" />
          <div className="blob3" />
        </div>

        <div className="car-hero-inner mx">
          <div className="car-hero-left">
            <div className="hero-pill">
              <span className="live-dot" />
              We&apos;re Hiring
            </div>

            <h1 style={{ letterSpacing: '-2px' }}>
              Build India&apos;s<br />
              Most Trusted<br />
              <span className="teal">Document</span>{' '}
              <span className="amber">Platform.</span>
            </h1>

            <p className="hero-sub" style={{ maxWidth: 480 }}>
              Join a team that has served <strong>1 Lakh+ Indians</strong> with
              faster, simpler document services since 2013. We&apos;re growing —
              come grow with us.
            </p>

            <div className="car-hero-stats rv">
              {STATS.map(({ Icon, val, lbl }) => (
                <div className="car-hs-item" key={lbl}>
                  <Icon size={15} strokeWidth={2} color="var(--teal-dk)" />
                  <span className="car-hs-val">{val}</span>
                  <span className="car-hs-lbl">{lbl}</span>
                </div>
              ))}
            </div>

            <div className="car-hero-btns rv">
              <a href="#open-roles" className="btn-teal">
                See Open Roles <ArrowRight size={15} />
              </a>
              <a href="https://wa.me/919980097315" target="_blank" rel="noreferrer" className="btn-ghost">
                Talk to HR
              </a>
            </div>
          </div>

          <div className="car-hero-right rv-r">
            <div className="car-hero-card">
              <div className="car-hc-header">
                <div className="au-dash-online">
                  <span className="live-dot" />
                  Actively Hiring
                </div>
                <div className="car-hc-title">Open Positions</div>
                <div className="car-hc-sub">{OPEN_ROLES.length} roles across {' '}
                  {[...new Set(OPEN_ROLES.map(r => r.dept))].length} departments
                </div>
              </div>

              <div className="car-hc-list">
                {OPEN_ROLES.map(role => (
                  <div key={role.title} className="car-hc-item">
                    <div className="car-hc-ico" style={{ background: role.bg, borderColor: role.bd }}>
                      <Briefcase size={16} strokeWidth={1.8} color={role.ic} />
                    </div>
                    <div className="car-hc-info">
                      <div className="car-hc-name">{role.title}</div>
                      <div className="car-hc-meta">
                        <MapPin size={10} strokeWidth={2} color="var(--ink4)" />
                        {role.location}
                      </div>
                    </div>
                    <ChevronRight size={14} strokeWidth={2} color="var(--ink4)" />
                  </div>
                ))}
              </div>

              <div className="car-hc-footer">
                <Users size={13} strokeWidth={2} color="var(--teal)" />
                <span className="car-hf-val">50+</span>
                <span className="car-hf-lbl">Team members across India</span>
              </div>
            </div>

            <div className="au-float-rating" style={{ bottom: 'auto', top: 24 }}>
              <Star size={13} strokeWidth={2.5} color="#fff" fill="#fff" />
              <span>Great Place to Work</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section className="car-roles" id="open-roles">
        <div className="mx">
          <div className="shead center rv">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Open Positions</div>
            <h2>Find Your Role at MakeMyDocuments</h2>
            <p className="sec-desc">
              We&apos;re building a passionate team that genuinely cares about making
               documents accessible to every Indian. See if there&apos;s a fit.
            </p>
          </div>

          <div className="car-roles-grid">
            {OPEN_ROLES.map((role, i) => (
              <div key={role.title} className="car-role-card rv" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="car-role-top">
                  <div className="car-role-ico" style={{ background: role.bg, borderColor: role.bd }}>
                    <Briefcase size={20} strokeWidth={1.8} color={role.ic} />
                  </div>
                  <div className="car-role-dept" style={{ color: role.ic, background: role.bg, borderColor: role.bd }}>
                    {role.dept}
                  </div>
                </div>

                <h3 className="car-role-title">{role.title}</h3>
                <p className="car-role-desc">{role.desc}</p>

                <div className="car-role-meta">
                  <span className="car-meta-pill">
                    <MapPin size={11} strokeWidth={2} /> {role.location}
                  </span>
                  <span className="car-meta-pill">
                    <Clock size={11} strokeWidth={2} /> {role.exp}
                  </span>
                  <span className="car-meta-pill">
                    <Briefcase size={11} strokeWidth={2} /> {role.type}
                  </span>
                </div>

                <div className="car-role-tags">
                  {role.tags.map(t => (
                    <span key={t} className="car-tag">{t}</span>
                  ))}
                </div>

                <a
                  href={`https://wa.me/919980097315?text=Hi, I'm interested in the ${encodeURIComponent(role.title)} role at MakeMyDocuments.`}
                  target="_blank"
                  rel="noreferrer"
                  className="car-apply-btn"
                >
                  Apply via WhatsApp <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          <div className="car-roles-note rv">
            Don&apos;t see a matching role?{' '}
            <a
              href="mailto:developersnnc@gmail.com"
              className="car-mail-link"
            >
              Send us your resume anyway →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN US ── */}
      <section className="car-why">
        <div className="mx">
          <div className="shead center rv">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Perks &amp; Benefits</div>
            <h2>Why Work With Us?</h2>
            <p className="sec-desc">
              We invest in our people the same way we invest in our customers — fully.
            </p>
          </div>

          <div className="car-perks-grid">
            {PERKS.map(({ Icon, label, text }, i) => (
              <div key={label} className="car-perk-card rv" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="car-perk-ico">
                  <Icon size={22} strokeWidth={1.8} color="var(--teal)" />
                </div>
                <h3 className="car-perk-title">{label}</h3>
                <p className="car-perk-desc">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="car-values">
        <div className="mx">
          <div className="shead center rv">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Culture</div>
            <h2>What We Believe In</h2>
            <p className="sec-desc">
              These aren&apos;t just values on a wall — they&apos;re how we make decisions every day.
            </p>
          </div>

          <div className="car-values-grid">
            {VALUES.map(({ n, Icon, label, text }) => (
              <div key={n} className="car-val-card rv">
                <div className="car-val-num">{n}</div>
                <div className="car-val-ico">
                  <Icon size={22} strokeWidth={1.8} color="#fff" />
                </div>
                <h3>{label}</h3>
                <p className="car-val-desc">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="au-cta-section">
        <div className="mx">
          <div className="au-cta rv">
            <h2 style={{ color: '#fff', marginBottom: 12 }}>Ready to Join Us?</h2>
            <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
              Drop us a message on WhatsApp or send your CV directly. We respond within 24 hours.
            </p>
            <div className="au-cta-btns">
              <a href="https://wa.me/919980097315?text=Hi, I'd like to apply for a role at MakeMyDocuments." target="_blank" rel="noreferrer" className="btn-teal">
                WhatsApp Us →
              </a>
              <Link href="/about-us" className="au-cta-ghost">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
