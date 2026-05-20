'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  ShieldCheck, Plane, Home, FileText, BookOpen, CreditCard,
  Users, BadgeCheck, Building2, ClipboardCheck, Scale, ChevronDown, X, Menu,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const SERVICES = [
  { label: 'Insurance',                    path: '/insurance',            Icon: ShieldCheck    },
  { label: 'Tourist Visa',                 path: '/tourist-visa',          Icon: Plane          },
  { label: 'Rental Agreement',             path: '/rental-agreement',      Icon: Home           },
  { label: 'Lease Agreement',              path: '/lease-agreement',       Icon: FileText       },
  { label: 'Passport',                     path: '/passport',              Icon: BookOpen       },
  { label: 'Pancard',                      path: '/pan-card',              Icon: CreditCard     },
  { label: 'Senior Citizen Card',          path: '/senior-citizen-card',   Icon: Users          },
  { label: 'Police Verification',          path: '/police-verification',   Icon: BadgeCheck     },
  { label: 'MSME Certificate',             path: '/msme-registration',     Icon: Building2      },
  { label: 'Police Clearance Certificate', path: '/police-clearance',      Icon: ClipboardCheck },
  { label: 'Affidavits / Annexure',        path: '/affidavits',            Icon: Scale          },
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const WaIcon = () => <FaWhatsapp size={16} />

export default function Nav() {
  const navRef              = useRef(null)
  const [open, setOpen]     = useState(false)
  const [mob,  setMob]      = useState(false)
  const [mobSvc, setMobSvc] = useState(false)
  const router   = useRouter()
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  useEffect(() => {
    const nav = navRef.current
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.nav-services-wrap') && !e.target.closest('.nav-dropdown'))
        setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mob ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mob])

  const closeAll = () => { setOpen(false); setMob(false) }

  return (
    <>
      <nav ref={navRef} style={{ overflow: 'visible' }}>
        <div className="nav-w">

          <Link className="logo" href="/" onClick={closeAll}>
            <img src="/logo.png" alt="MakeMyDocuments" className="logo-img" />
          </Link>

          <ul className="nav-links">
            <li>
              <Link href="/" className={isActive('/') ? 'nav-active' : ''}>Home</Link>
            </li>

            <li className="nav-services-wrap">
              <button
                className={`nav-services-btn${open ? ' open' : ''}`}
                onClick={() => setOpen(o => !o)}
              >
                Services
                <ChevronDown size={14} className={`nav-chevron${open ? ' rot' : ''}`} />
              </button>
            </li>

            <li>
              <Link href="/about-us" className={isActive('/about-us') ? 'nav-active' : ''}>About Us</Link>
            </li>
            <li>
              <Link href="/blogs" className={isActive('/blogs') ? 'nav-active' : ''}>Blogs</Link>
            </li>
            <li>
              <Link href="/contact-us" className={isActive('/contact-us') ? 'nav-active' : ''}>Contact Us</Link>
            </li>
          </ul>


          <button className="nav-ham" onClick={() => setMob(o => !o)} aria-label="Menu">
            {mob ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

        {/* Dropdown â€” direct child of <nav> so position:absolute uses nav as anchor */}
        {open && (
          <div className="nav-dropdown">
            <div className="nav-dd-header">
              <span className="nav-dd-label">Our Services</span>
              <span className="nav-dd-sub">Government &amp; legal document services</span>
            </div>
            <div className="nav-dropdown-grid">
              {SERVICES.map(({ label, path, Icon }) => (
                <Link
                  key={path}
                  href={path}
                  className={`nav-drop-item${isActive(path) ? ' nav-drop-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-drop-ico">
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* â”€â”€ Mobile drawer â”€â”€ */}
      <div className={`nav-mob-overlay${mob ? ' visible' : ''}`} onClick={() => setMob(false)} />
      <div className={`nav-mob-drawer${mob ? ' open' : ''}`}>

        {/* Header */}
        <div className="nav-mob-head">
          <img src="/logo.png" alt="MakeMyDocuments" className="logo-img" style={{ height: 34 }} />
          <button className="nav-mob-close" onClick={() => setMob(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable links */}
        <div className="nav-mob-scroll">
          <Link href="/" className={`nav-mob-link${isActive('/') ? ' active' : ''}`} onClick={closeAll}>
            Home
          </Link>

          <button className={`nav-mob-svc-btn${mobSvc ? ' open' : ''}`} onClick={() => setMobSvc(o => !o)}>
            <span>Services</span>
            <ChevronDown size={15} className={`nav-chevron${mobSvc ? ' rot' : ''}`} />
          </button>

          {mobSvc && (
            <div className="nav-mob-svc-list">
              {SERVICES.map(({ label, path, Icon }) => (
                <Link key={path} href={path} className={`nav-mob-svc-item${isActive(path) ? ' active' : ''}`} onClick={closeAll}>
                  <span className="nav-mob-svc-ico"><Icon size={14} strokeWidth={2} /></span>
                  {label}
                </Link>
              ))}
            </div>
          )}

          <Link href="/about-us" className={`nav-mob-link${isActive('/about-us') ? ' active' : ''}`} onClick={closeAll}>
            About Us
          </Link>
          <Link href="/blogs" className={`nav-mob-link${isActive('/blogs') ? ' active' : ''}`} onClick={closeAll}>
            Blogs
          </Link>
          <Link href="/contact-us" className={`nav-mob-link${isActive('/contact-us') ? ' active' : ''}`} onClick={closeAll}>
            Contact Us
          </Link>
        </div>


      </div>
    </>
  )
}

