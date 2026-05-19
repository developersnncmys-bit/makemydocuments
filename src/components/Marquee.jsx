'use client'

const ITEMS = [
  'Passport New/Renewal', 'PAN Card', 'Tatkal Passport', 'Visa Assistance',
  'Police Clearance PCC', 'Police Verification PVC', 'Senior Citizen Card',
  'Rental Agreement', 'FSSAI Food License', 'Bike Insurance',
  'Car Insurance', 'Health Insurance', 'Life Insurance',
]

const ALL_ITEMS = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="mq-label">All Services</div>
      <div className="mq-track">
        <div className="mq-row">
          {ALL_ITEMS.map((item, i) => (
            <span key={i} className="mq-item">
              <span className="mq-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
