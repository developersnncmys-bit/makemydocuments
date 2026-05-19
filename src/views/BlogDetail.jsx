'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Clock, Calendar, Tag, Share2, Phone, ArrowRight } from 'lucide-react'
import { getBlogBySlug, getRelatedPosts } from '../data/blogPosts'
import { getStates, getDistricts, validatePincode } from '../data/locationData'

const SERVICES = [
  'Insurance', 'Tourist Visa', 'Rental Agreement', 'Lease Agreement',
  'Passport', 'PAN Card', 'Senior Citizen Card', 'Police Verification',
  'MSME Certificate', 'Police Clearance Certificate', 'Affidavits / Annexure',
]

const CAT_STYLE = {
  'Passport':                     { bg: 'var(--teal-bg)',  bd: 'var(--teal-bd)',  color: 'var(--teal-dk)' },
  'Tourist Visa':                 { bg: 'var(--amber-bg)', bd: 'var(--amber-bd)', color: '#92570a'         },
  'PAN Card':                     { bg: '#ede9fe',         bd: '#c4b5fd',         color: '#6d28d9'         },
  'Senior Citizen Card':          { bg: 'var(--green-bg)', bd: 'var(--green-bd)', color: 'var(--green)'    },
  'Insurance':                    { bg: '#e0f2fe',         bd: '#7dd3fc',         color: '#0369a1'         },
  'Rental Agreement':             { bg: '#fff7ed',         bd: '#fed7aa',         color: '#c2410c'         },
  'Lease Agreement':              { bg: '#fdf4ff',         bd: '#d8b4fe',         color: '#86198f'         },
  'Police Verification':          { bg: '#f0fdf4',         bd: '#86efac',         color: '#166534'         },
  'MSME Certificate':             { bg: '#eef2ff',         bd: '#a5b4fc',         color: '#3730a3'         },
  'Police Clearance Certificate': { bg: '#eff6ff',         bd: '#93c5fd',         color: '#1d4ed8'         },
  'Affidavits / Annexure':        { bg: 'var(--surf)',     bd: 'var(--line)',      color: 'var(--ink3)'     },
}
function catStyle(cat) {
  const s = CAT_STYLE[cat] || { bg: 'var(--surf)', bd: 'var(--line)', color: 'var(--ink3)' }
  return { background: s.bg, borderColor: s.bd, color: s.color }
}

function ContactForm() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', service: '', state: '', district: '', pincode: '' })
  const [pincodeError, setPincodeError] = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = e => {
    const { name, value } = e.target
    setForm(f => {
      const next = { ...f, [name]: value, ...(name === 'state' ? { district: '', pincode: '' } : {}) }
      if (name === 'state') setPincodeError('')
      if (name === 'pincode' && pincodeError) setPincodeError(validatePincode(value, next.state, next.district) ?? '')
      if (name === 'district' && f.pincode) setPincodeError(validatePincode(f.pincode, f.state, value) ?? '')
      return next
    })
  }

  const onPincodeBlur = () => {
    setPincodeError(validatePincode(form.pincode, form.state, form.district) ?? '')
  }

  const onSubmit = e => {
    e.preventDefault()
    const err = validatePincode(form.pincode, form.state, form.district)
    if (err) { setPincodeError(err); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1000)
  }

  if (sent) return (
    <div className="bd-form-success">
      <div className="bd-form-success-ico">✓</div>
      <h4>Thank you!</h4>
      <p>We'll get back to you within 24 hours.</p>
    </div>
  )

  return (
    <form className="bd-contact-form" onSubmit={onSubmit}>
      <div className="bd-form-field">
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} placeholder="Your full name" required />
      </div>
      <div className="bd-form-field">
        <label>Phone Number</label>
        <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="Your phone number" required />
      </div>
      <div className="bd-form-field">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Your email address" required />
      </div>
      <div className="bd-form-field">
        <label>State</label>
        <select name="state" value={form.state} onChange={onChange} required>
          <option value="">Select a State</option>
          {getStates().map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="bd-form-field">
        <label>District</label>
        <select name="district" value={form.district} onChange={onChange} required disabled={!form.state}>
          <option value="">Select a District</option>
          {getDistricts(form.state).map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="bd-form-field">
        <label>Pincode</label>
        <input
          name="pincode" type="text" inputMode="numeric" maxLength={6}
          value={form.pincode} onChange={onChange} onBlur={onPincodeBlur}
          placeholder="Enter 6-digit pincode" required
          className={pincodeError ? 'bd-input-error' : ''}
        />
        {pincodeError && (
          <span className="bd-field-error">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/><circle cx="8" cy="11" r=".9" fill="currentColor"/></svg>
            {pincodeError}
          </span>
        )}
      </div>
      <div className="bd-form-field">
        <label>Service</label>
        <select name="service" value={form.service} onChange={onChange} required>
          <option value="">Select a Service</option>
          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <button type="submit" className="bd-form-submit" disabled={loading}>
        {loading ? 'Submitting…' : 'Get Free Consultation'}
      </button>
    </form>
  )
}

function RelatedCard({ post }) {
  const { Icon } = post
  return (
    <Link href={`/blogs/${post.slug}`} className="bl-card">
      <div className="bl-img" style={{ background: post.gradient }}>
        <div className="bl-img-overlay" />
        <Icon size={52} strokeWidth={.8} color="rgba(255,255,255,.18)" className="bl-img-ico" />
        <div className="bl-img-top">
          <span className="bl-cat-tag" style={catStyle(post.cat)}>{post.cat}</span>
          <span className="bl-date-tag"><Clock size={11} strokeWidth={2} />{post.date}</span>
        </div>
      </div>
      <div className="bl-body">
        <div className="bl-read-time"><Clock size={11} strokeWidth={2} />{post.readTime} read</div>
        <h3 className="bl-title">{post.title}</h3>
        <p className="bl-excerpt">{post.excerpt}</p>
        <div className="bl-link">Read More <ArrowRight size={13} strokeWidth={2.5} /></div>
      </div>
    </Link>
  )
}

export default function BlogDetail() {
  const { slug }    = useParams()
  const router      = useRouter()
  const [post, setPost]       = useState(null)
  const [related, setRelated] = useState([])
  const [copied, setCopied]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    const found = getBlogBySlug(slug)
    if (!found) { router.replace('/blogs'); return }
    setPost(found)
    setRelated(getRelatedPosts(found.id, found.cat, 3))
    setPageUrl(window.location.href)
    window.scrollTo(0, 0)
  }, [slug, router])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const top = el.scrollTop || document.body.scrollTop
      const h = el.scrollHeight - el.clientHeight
      setProgress(h > 0 ? (top / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!post) return null

  const cs = CAT_STYLE[post.cat] || { bg: '#F3F4F6', color: '#374151' }
  const { Icon } = post

  return (
    <div className="bd-page">

      {/* Reading progress */}
      <div className="bd-progress" style={{ width: `${progress}%` }} />

      {/* ── Hero ── */}
      <div className="bd-mag-hero">
        <div className="bd-mag-hero-inner">

          {/* Breadcrumb */}
          <nav className="bd-breadcrumb">
            <Link href="/"><span>Home</span></Link>
            <span className="bd-bc-sep">/</span>
            <Link href="/blogs"><span>Blogs</span></Link>
            <span className="bd-bc-sep">/</span>
            <span className="bd-breadcrumb-cur">{post.title}</span>
          </nav>

          {/* Category + Meta row */}
          <div className="bd-mag-top">
            <span className="bd-mag-cat" style={{ background: cs.bg, color: cs.color }}>
              <Tag size={11} strokeWidth={2.5} /> {post.cat}
            </span>
            <div className="bd-mag-meta">
              <span><Calendar size={13} strokeWidth={2} /> {post.date}</span>
              <span className="bd-meta-dot" />
              <span><Clock size={13} strokeWidth={2} /> {post.readTime} read</span>
            </div>
          </div>

          {/* Title + excerpt */}
          <h1 className="bd-mag-title">{post.title}</h1>
          <p className="bd-mag-excerpt">{post.excerpt}</p>

          {/* Gradient accent strip */}
          <div className="bd-mag-strip" style={{ background: post.gradient }} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="bd-body-wrap">
        <div className="bd-body-grid">

          {/* Article */}
          <article className="bd-article">

            {/* Featured visual */}
            <div className="bd-feat-visual" style={{ background: post.gradient }}>
              <div className="bd-feat-icon-wrap">
                <Icon size={80} color="rgba(255,255,255,.22)" strokeWidth={1} />
              </div>
              <div className="bd-feat-overlay" />
              <div className="bd-feat-dots" />
            </div>

            {/* Content */}
            <div className="bd-content" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Share */}
            <div className="bd-share-bar">
              <div className="bd-share-left">
                <Share2 size={15} strokeWidth={2} color="var(--teal)" />
                <span className="bd-share-label">Share this article</span>
              </div>
              <div className="bd-share-actions">
                <button className="bd-share-btn" onClick={handleShare}>
                  {copied ? '✓ Copied!' : 'Copy Link'}
                </button>
                {pageUrl && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + pageUrl)}`}
                    target="_blank" rel="noreferrer" className="bd-share-wa"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="bd-sidebar">
            <div className="bd-contact-card">
              <div className="bd-contact-head">
                <div className="bd-contact-head-icon">
                  <Phone size={16} strokeWidth={2.5} color="#fff" />
                </div>
                <div>
                  <h3 className="bd-contact-title">Contact Us</h3>
                  <p className="bd-contact-subtitle">Free consultation, no commitment</p>
                </div>
              </div>
              <ContactForm />
            </div>

            {/* Trust badges */}
            <div className="bd-trust-strip">
              <div className="bd-trust-item"><span className="bd-trust-ico">✓</span> Expert Guidance</div>
              <div className="bd-trust-item"><span className="bd-trust-ico">✓</span> 100% Secure</div>
              <div className="bd-trust-item"><span className="bd-trust-ico">✓</span> Fast Processing</div>
            </div>
          </aside>

        </div>
      </div>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <section className="bd-related-sec">
          <div className="bd-related-inner">
            <div className="bd-related-head">
              <div>
                <h2 className="bd-related-h2">Related Articles</h2>
                <p className="bd-related-sub">More guides to help you</p>
              </div>
              <Link href="/blogs" className="bd-related-all">View All →</Link>
            </div>
            <div className="bd-related-grid">
              {related.map(p => <RelatedCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
