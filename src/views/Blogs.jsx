'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Clock, Search,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  AlertCircle, RefreshCw,
} from 'lucide-react'
import { fetchBlogPosts } from '../data/blogPosts'
import useScrollReveal from '../hooks/useScrollReveal'

const CATS = [
  'All', 'Passport', 'Tourist Visa', 'PAN Card', 'Senior Citizen Card',
  'Insurance', 'Rental Agreement', 'Lease Agreement',
  'Police Verification', 'MSME Certificate',
  'Police Clearance Certificate', 'Affidavits / Annexure',
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

const PER_PAGE = 6

/* ── Skeleton card ── */
function SkeletonCard({ large }) {
  return (
    <div className={`bl-card bl-skeleton${large ? ' bl-card-large' : ''}`}>
      <div className="bl-img bl-sk-img" />
      <div className="bl-body" style={{ gap: 10 }}>
        <div className="bl-sk-line" style={{ width: '35%', height: 12 }} />
        <div className="bl-sk-line" style={{ width: '90%', height: 16 }} />
        <div className="bl-sk-line" style={{ width: '75%', height: 16 }} />
        <div className="bl-sk-line" style={{ width: '55%', height: 13, marginTop: 4 }} />
        <div className="bl-sk-line" style={{ width: '40%', height: 13 }} />
      </div>
    </div>
  )
}

/* ── Blog card ── */
function BlogCard({ post, large }) {
  const { Icon } = post
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`bl-card${large ? ' bl-card-large' : ''}`}
    >
      <div className="bl-img" style={{ background: post.gradient }}>
        <div className="bl-img-overlay" />
        <Icon size={large ? 72 : 52} strokeWidth={.8} color="rgba(255,255,255,.18)" className="bl-img-ico" />
        <div className="bl-img-top">
          <span className="bl-cat-tag" style={catStyle(post.cat)}>{post.cat}</span>
          <span className="bl-date-tag"><Clock size={11} strokeWidth={2} />{post.date}</span>
        </div>
        {large && <div className="bl-featured-label">Featured</div>}
      </div>
      <div className="bl-body">
        <div className="bl-read-time"><Clock size={11} strokeWidth={2} />{post.readTime} read</div>
        <h3 className={`bl-title${large ? ' bl-title-lg' : ''}`}>{post.title}</h3>
        <p className="bl-excerpt">{post.excerpt}</p>
        <div className="bl-link">Read More <ArrowRight size={13} strokeWidth={2.5} /></div>
      </div>
    </Link>
  )
}

/* ── Pagination ── */
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null
  const delta = 2
  let start = Math.max(1, current - delta)
  let end   = Math.min(total, current + delta)
  if (end - start < 4) {
    if (start === 1) end   = Math.min(total, start + 4)
    else             start = Math.max(1, end - 4)
  }
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const go = (p) => { onChange(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="bl-pagination">
      <button className="bl-pg-btn bl-pg-arrow" onClick={() => go(1)}         disabled={current === 1}>    <ChevronsLeft  size={15} strokeWidth={2.5} /></button>
      <button className="bl-pg-btn bl-pg-arrow" onClick={() => go(current-1)} disabled={current === 1}>    <ChevronLeft   size={15} strokeWidth={2.5} /></button>

      {start > 1 && <><button className="bl-pg-btn" onClick={() => go(1)}>1</button>{start > 2 && <span className="bl-pg-ellipsis">…</span>}</>}
      {pages.map(p => (
        <button key={p} className={`bl-pg-btn${p === current ? ' bl-pg-active' : ''}`} onClick={() => go(p)}>{p}</button>
      ))}
      {end < total && <>{end < total - 1 && <span className="bl-pg-ellipsis">…</span>}<button className="bl-pg-btn" onClick={() => go(total)}>{total}</button></>}

      <button className="bl-pg-btn bl-pg-arrow" onClick={() => go(current+1)} disabled={current === total}><ChevronRight  size={15} strokeWidth={2.5} /></button>
      <button className="bl-pg-btn bl-pg-arrow" onClick={() => go(total)}     disabled={current === total}><ChevronsRight size={15} strokeWidth={2.5} /></button>
    </div>
  )
}

/* ── Page ── */
export default function Blogs() {
  useScrollReveal()

  const [posts,     setPosts]     = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [activeCat, setActiveCat] = useState('All')
  const [query,     setQuery]     = useState('')
  const [page,      setPage]      = useState(1)

  const load = () => {
    setLoading(true); setError(null)
    fetchBlogPosts()
      .then(data => { setPosts(data); setLoading(false) })
      .catch(err  => { setError(err.message || 'Failed to load articles.'); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const reset = () => setPage(1)

  const filtered = posts.filter(p => {
    const matchCat   = activeCat === 'All' || p.cat === activeCat
    const matchQuery = !query || p.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage   = Math.min(page, totalPages)
  const pagePosts  = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)
  const gridCards  = pagePosts

  return (
    <main style={{ paddingTop: 66 }}>

      {/* ── HERO ── */}
      <section className="bl-hero">
        <div className="bl-hero-bg" />
        <div className="bl-hero-content">
          <h1 className="bl-hero-h1">Guides. Tips. Insights.</h1>
          <p className="bl-hero-sub">Expert knowledge on every Indian document service — written by our specialists.</p>

          <div className="bl-search-wrap">
            <Search size={17} strokeWidth={2} className="bl-search-ico" />
            <input
              type="text"
              placeholder="Search by topic or keyword — Passport, Visa, PAN Card…"
              value={query}
              onChange={e => { setQuery(e.target.value); reset() }}
              className="bl-search-inp"
            />
          </div>

          <div className="bl-cats">
            {CATS.map(c => (
              <button
                key={c}
                className={`bl-cat-btn${activeCat === c ? ' active' : ''}`}
                onClick={() => { setActiveCat(c); reset() }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="bl-section">
        <div className="mx">

          {/* Loading skeletons */}
          {loading && (
            <div className="bl-grid">
              <SkeletonCard /><SkeletonCard /><SkeletonCard />
              <SkeletonCard /><SkeletonCard /><SkeletonCard />
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="bl-error">
              <AlertCircle size={40} strokeWidth={1.4} color="#f87171" />
              <p>{error}</p>
              <button className="bl-retry" onClick={load}>
                <RefreshCw size={14} strokeWidth={2.5} /> Retry
              </button>
            </div>
          )}

          {/* Posts */}
          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="bl-empty">
                  <Search size={40} strokeWidth={1.2} color="var(--ink4)" />
                  <p>No articles found for <strong>"{query || activeCat}"</strong>.</p>
                  <button className="cu-reset" onClick={() => { setQuery(''); setActiveCat('All'); reset() }}>
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  {gridCards.length > 0 && (
                    <div className="bl-grid">
                      {gridCards.map(p => <BlogCard key={p.id} post={p} />)}
                    </div>
                  )}

                  <Pagination current={safePage} total={totalPages} onChange={setPage} />

                  <div className="bl-post-count">
                    Showing {Math.min(safePage * PER_PAGE, filtered.length)} of {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                  </div>
                </>
              )}
            </>
          )}

          {/* CTA */}
          {!loading && !error && (
            <div className="bl-cta">
              <div>
                <div className="bl-cta-title">Need help with your documents?</div>
                <div className="bl-cta-sub">Our experts handle everything — fast, online, hassle-free.</div>
              </div>
              <Link href="/contact-us" className="btn-teal">Talk to an Expert →</Link>
            </div>
          )}

        </div>
      </section>

    </main>
  )
}
