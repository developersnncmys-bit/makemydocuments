'use client'

import Link from 'next/link'

const SERVICES = [
  { label: 'Passport',                     path: '/passport'            },
  { label: 'PAN Card',                     path: '/pan-card'            },
  { label: 'Visa Assistance',              path: '/tourist-visa'        },
  { label: 'Police Clearance',             path: '/police-clearance'    },
  { label: 'Rental Agreement',             path: '/rental-agreement'    },
  { label: 'Insurance',                    path: '/insurance'           },
]

const COMPANY = [
  { label: 'About Us',   path: '/about-us'  },
  { label: 'Blogs',      path: '/blogs'     },
  { label: 'Contact Us', path: '/contact-us'},
]

// Pages that are fully built
const BUILT = new Set(['/', '/insurance', '/pan-card', '/pan-card-form'])

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">

        {/* Brand */}
        <div className="f-brand">
          <img src="/logo.png" alt="MakeMyDocuments" className="f-logo-img" />
          <p className="f-desc">
            India's most trusted document services platform.
            Serving 1 Lakh+ customers since 2013.
          </p>
          <div className="f-socials">
            {['f', 'in', 'tw'].map(s => (
              <a key={s} className="fsoc" href="#">{s}</a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="fcol-lbl">Services</div>
          <ul className="flinks">
            {SERVICES.map(({ label, path }) =>
              BUILT.has(path)
                ? <li key={label}><Link href={path}>{label}</Link></li>
                : <li key={label}><a href="#">{label}</a></li>
            )}
          </ul>
        </div>

        {/* Company */}
        <div>
          <div className="fcol-lbl">Company</div>
          <ul className="flinks">
            {COMPANY.map(({ label, path, external }) =>
              external
                ? <li key={label}><a href={path} target="_blank" rel="noreferrer">{label}</a></li>
                : <li key={label}><Link href={path}>{label}</Link></li>
            )}
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <div className="fcol-lbl">Legal</div>
          <ul className="flinks">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions">Terms &amp; Conditions</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="fcopy">
          © 2025 MakeMyDocuments. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
