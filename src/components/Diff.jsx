'use client'

const CARDS = [
  {
    n: '01', ico: '🎯',
    title: 'Expert. Not Automated.',
    desc:  'A real human expert manages your case – not a bot, not a ticket queue. You speak to someone who actually knows your file inside out.',
  },
  {
    n: '02', ico: '📱',
    title: '100% Online. Zero Office Visits.',
    desc:  'Upload documents from your phone, track your application in real time, and receive updates on WhatsApp. The entire process happens without you stepping out once.',
  },
  {
    n: '03', ico: '✅',
    title: 'Zero Rejection Policy.',
    desc:  'We verify every document before submission. Our meticulous process means virtually zero rejections – and we fix it free if one happens.',
  },
  {
    n: '04', ico: '💰',
    title: 'Transparent Pricing. No Surprises.',
    desc:  'You see the full cost before you commit – no hidden charges, no last-minute add-ons. What we quote is what you pay.',
  },
  {
    n: '05', ico: '⚡',
    title: 'Fastest Turnaround.',
    desc:  'Tatkal Passport in days. PAN Card in 72 hours. Rental Agreement in 48 hours. We know every legitimate shortcut in the system.',
  },
  {
    n: '06', ico: '🤝',
    title: 'One Expert. Your Entire Case.',
    desc:  'No handoffs, no re-explaining. The same person who takes your brief sees it through to completion – so nothing falls through the cracks.',
  },
]

export default function Diff() {
  return (
    <section className="diff">
      <div className="mx">
        <div className="shead rv">
          <div className="eyebrow">How We're Different</div>
          <h2>
            Not an Agent. Not a Portal.<br />
            <span style={{ color: 'var(--amber2)' }}>Your Dedicated Partner.</span>
          </h2>
          <p className="sec-desc">
            Six clear reasons why MakeMyDocuments is the only choice that makes real sense.
          </p>
        </div>

        <div className="diff-grid">
          {CARDS.map(({ n, ico, title, desc }) => (
            <div key={n} className="diff-card rv">
              <div className="diff-big-num">{n}</div>
              <span className="diff-ico">{ico}</span>
              <h3 className="diff-h3">{title}</h3>
              <p className="diff-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
