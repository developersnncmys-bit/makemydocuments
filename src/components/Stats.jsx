'use client'

const STATS = [
  { num: '1L+',          lbl: 'Customers Served' },
  { num: <>4.8<span className="stat-accent">★</span></>, lbl: 'Google Rating' },
  { num: '10+',          lbl: 'Years of Experience' },
  { num: <span className="stat-accent">CSC</span>, lbl: 'Gov. Approved' },
]

export default function Stats() {
  return (
    <div className="stats">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div key={i} className="stat-item rv">
            <div className="stat-num">{s.num}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
