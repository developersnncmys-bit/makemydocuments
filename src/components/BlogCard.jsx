'use client'

import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '../data/blogPosts'

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

export default function BlogCard({ slug }) {
  const post = BLOG_POSTS.find(p => p.slug === slug)
  if (!post) return null
  const { Icon } = post
  return (
    <Link href={`/blogs/${post.slug}`} className="bl-card">
      <div className="bl-img" style={{ background: post.gradient }}>
        <div className="bl-img-overlay" />
        <Icon size={52} strokeWidth={0.8} color="rgba(255,255,255,.18)" className="bl-img-ico" />
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
