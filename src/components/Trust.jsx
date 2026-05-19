'use client'

const CMP_ROWS = [
  { feature: 'CSC Government Approved',              others: '✗',         ours: '✓' },
  { feature: '100% Online. Zero Office Visits.',     others: '✗',         ours: '✓' },
  { feature: 'Transparent Pricing – No Hidden Fees', others: '✗',         ours: '✓' },
  { feature: 'Dedicated Case Manager',               others: '✗',         ours: '✓' },
  { feature: 'WhatsApp Real-Time Updates',           others: '✗',         ours: '✓' },
  { feature: '10+ Years Experience',                 others: '✗',         ours: '✓' },
  { feature: 'Verified 4.8★ Google Reviews',         others: '✗',         ours: '✓' },
]

const TRUST_CARDS = [
  {
    ico: '🏛️', cls: 'ico-teal',
    h3:  'CSC ID: 132254620016',
    h4:  'Government of India – Registered',
    p:   'Approved by Common Service Center, e-Governance Services India Ltd. Your documents are handled by an officially recognised agency.',
  },
  {
    ico: '⭐', cls: 'ico-amber',
    h3:  '4.8 / 5 on Google Reviews',
    h4:  '1,000+ Verified Customer Reviews',
    p:   'Built on 10+ years of honest, accurate, professional service. Real people, real results – visible publicly on Google.',
  },
  {
    ico: '✅', cls: 'ico-green',
    h3:  'Zero Hidden Charges – Ever',
    h4:  'What We Quote Is Exactly What You Pay',
    p:   'We tell you the complete cost upfront. No surprises, no add-ons at the last step. Full transparency from day one.',
  },
  {
    ico: '📱', cls: 'ico-teal',
    h3:  'Real-Time WhatsApp Updates',
    h4:  'Never Left in the Dark',
    p:   'Track every stage of your document – submission to delivery – via WhatsApp. No follow-up calls needed.',
  },
]

export default function Trust() {
  return (
    <section className="trust" id="why-us">
      <div className="mx">
        <div className="shead rv">
          <div className="eyebrow">Trust Signals</div>
          <h2>Why 1 Lakh+ People Choose Us<br />Over Everyone Else.</h2>
          <p className="sec-desc">
            We're not just another agent. We're government-approved, experienced,
            and built entirely around your success.
          </p>
        </div>

        <div className="trust-layout">
          {/* Comparison table */}
          <div className="cmp rv-l">
            <div className="cmp-head">
              <div className="cmp-col">
                <div className="cmp-col-lbl">Feature</div>
                <div className="cmp-col-val">What Matters</div>
              </div>
              <div className="cmp-col">
                <div className="cmp-col-lbl">Others</div>
                <div className="cmp-col-val">Agents / Portals</div>
              </div>
              <div className="cmp-col">
                <div className="cmp-col-lbl">Us</div>
                <div className="cmp-col-val us">MakeMyDocuments</div>
              </div>
            </div>

            {CMP_ROWS.map(({ feature, others, maybe }) => (
              <div key={feature} className="cmp-row">
                <div className="cmp-cell">{feature}</div>
                <div className="cmp-cell">
                  {maybe
                    ? <span className="maybe">{others}</span>
                    : <span className="cross">{others}</span>}
                </div>
                <div className="cmp-cell ours"><span className="tick">✓</span></div>
              </div>
            ))}
          </div>

          {/* Trust cards */}
          <div className="trust-cards rv-r">
            {TRUST_CARDS.map(({ ico, cls, h3, h4, p }) => (
              <div key={h3} className="tc">
                <div className={`tc-ico ${cls}`}>{ico}</div>
                <div>
                  <h3 style={{ fontSize: 15, marginBottom: 4 }}>{h3}</h3>
                  <h4 style={{ color: 'var(--ink4)', fontSize: 12, fontWeight: 500, marginBottom: 7 }}>{h4}</h4>
                  <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.6 }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
