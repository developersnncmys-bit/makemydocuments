'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck, Plane, Home, FileText, BookOpen, CreditCard,
  Users, BadgeCheck, Building2, ClipboardCheck, Scale,
  Star, Landmark, CalendarDays,
} from 'lucide-react'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const CHIPS = [
  { label: 'Passport',            path: '/passport',            Icon: BookOpen       },
  { label: 'PAN Card',            path: '/pan-card',            Icon: CreditCard     },
  { label: 'Visa Assistance',     path: '/tourist-visa',        Icon: Plane          },
  { label: 'Police Clearance',    path: '/police-clearance',    Icon: ClipboardCheck },
  { label: 'Rental Agreement',    path: '/rental-agreement',    Icon: Home           },
  { label: 'Insurance',           path: '/insurance',           Icon: ShieldCheck    },
  { label: 'Senior Citizen Card', path: '/senior-citizen-card', Icon: Users          },
  { label: 'Police Verification', path: '/police-verification', Icon: BadgeCheck     },
  { label: 'MSME Certificate',    path: '/msme-registration',   Icon: Building2      },
  { label: 'Lease Agreement',     path: '/lease-agreement',     Icon: FileText       },
  { label: 'Affidavits',          path: '/affidavits',          Icon: Scale          },
]

const PANEL_CARDS = [
  { Icon: ShieldCheck,  bg: 'var(--teal-bg)',  name: 'Insurance Policies',          time: '⏱ Instant Policy',     price: 'Best Rates', badge: 'Most Popular', badgeCls: 'b-teal',  path: '/insurance'        },
  { Icon: Plane,        bg: 'var(--amber-bg)', name: 'Visa Assistance',              time: '⏱ Depends on country', price: '₹1,999+',    badge: 'Expert Help',  badgeCls: 'b-amber', path: '/tourist-visa'     },
  { Icon: CreditCard,   bg: 'var(--green-bg)', name: 'PAN Card – New / Correction',  time: '⏱ 3–5 working days',   price: '₹350',       badge: 'Fast',         badgeCls: 'b-green', path: '/pan-card'         },
  { Icon: BookOpen,     bg: 'var(--teal-bg)',  name: 'Passport – New / Renewal',     time: '⏱ 7–14 working days',  price: '₹2,499',     badge: 'Trusted',      badgeCls: 'b-teal',  path: '/passport'         },
  { Icon: ClipboardCheck, bg: 'var(--green-bg)', name: 'PCC / PVC', time: '⏱ 5–10 working days', price: 'Best Rates', badge: 'Hassle Free', badgeCls: 'b-green', path: '/police-clearance' },
]

const TRUST = [
  { Icon: Users,        val: '1L+',  lbl: 'Customers'    },
  { Icon: Star,         val: '4.8★', lbl: 'Google Rating' },
  { Icon: Landmark,     val: 'CSC',  lbl: 'Gov. Approved' },
  { Icon: CalendarDays, val: '10+',  lbl: 'Years Active'  },
]

export default function Hero() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) scrollTo('services')
  }

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="blob1" />
        <div className="blob2" />
        <div className="blob3" />
      </div>
      <div className="hero-inner">
        {/* LEFT */}
        <div>
          <h1>
            Stop Wasting Time<br />
            on <span className="strike-wrap">Paperwork.</span><br />
            <span className="teal">We Handle It </span>
            <span className="amber">All.</span>
          </h1>
          <p className="hero-sub">
            We are India's <strong>#1<sup>*</sup></strong> Online Documents Consultancy.
          </p>

          {/* Search */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a service…"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>

          {/* Service chips */}
          <div className="chips">
            {CHIPS.map(({ label, path, Icon }) => (
              <Link key={path} href={path} className="chip">
                <Icon size={12} strokeWidth={2.5} color="var(--teal-dk)" />
                {label}
              </Link>
            ))}
          </div>

          {/* Trust strip */}
          <div className="hero-trust">
            {TRUST.map(({ Icon, val, lbl }) => (
              <div className="ht" key={lbl}>
                <div className="ht-ico">
                  <Icon size={16} strokeWidth={2} color="var(--teal-dk)" />
                </div>
                <div>
                  <div className="ht-val">{val}</div>
                  <div className="ht-lbl">{lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – card panel */}
        <div className="hero-panel rv-r">
          <div className="panel-top">
            <div>
              <div className="panel-top-title">Popular Services</div>
              <div className="panel-top-sub">Click any service to apply instantly</div>
            </div>
            <div className="online-badge">
              <span className="live-dot" style={{ width: 6, height: 6 }} />
              Open Now
            </div>
          </div>
          <div className="panel-body">
            {PANEL_CARDS.map(({ Icon, bg, name, time, price, badge, badgeCls, path }) => (
              <Link key={name} href={path} className="pcard">
                <div className="pc-ico" style={{ background: bg }}>
                  <Icon size={20} strokeWidth={2} color="var(--teal-dk)" />
                </div>
                <div className="pc-body">
                  <div className="pc-name">{name}</div>
                  <div className="pc-time">{time}</div>
                </div>
                <div className="pc-right">
                  <div className="pc-price">{price}</div>
                  {badge && <span className={`pc-badge ${badgeCls}`}>{badge}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
