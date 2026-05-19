'use client'

import { useState, useEffect, useRef } from 'react'

const TABS = [
  {
    title: 'Tell us what you need',
    sub:   'Call · WhatsApp · Online form',
    icon:  '💬',
    step:  'Step 01 of 04',
    pTitle:'Tell Us Exactly What You Need',
    desc:  "Reach us through WhatsApp, phone or our online form. Our team understands your requirement in minutes and tells you exactly what to do next – no runaround, no confusion.",
    checks:['WhatsApp chat open Mon–Fri, 10 AM – 5 PM', 'We speak Kannada, Hindi and English', 'Same-day response, always'],
  },
  {
    title: 'Submit your documents',
    sub:   'Digital upload',
    icon:  '📄',
    step:  'Step 02 of 04',
    pTitle:'Submit Your Documents Digitally',
    desc:  "We give you a precise list of exactly what's needed. Upload documents via WhatsApp or visit our Bangalore office. No unnecessary paperwork, no wasted trips.",
    checks:['Exact document checklist provided upfront', 'Digital upload via WhatsApp – no scanning needed', 'In-person submission'],
  },
  {
    title: 'We process everything',
    sub:   'Expert team · Authority follow-up',
    icon:  '⚙️',
    step:  'Step 03 of 04',
    pTitle:'We Handle Everything – End to End',
    desc:  "Our expert team processes your application, follows up with government authorities and handles every complication that arises. You stay updated via WhatsApp throughout.",
    checks:['Dedicated case manager assigned to your file', 'Authority follow-ups handled entirely by us', 'Real-time WhatsApp status updates at every stage'],
  },
  {
    title: 'Doorstep delivery',
    sub:   'Sit back · We deliver',
    icon:  '🚪',
    step:  'Step 04 of 04',
    pTitle:'Your Document Delivered to Your Door',
    desc:  "Once ready, your document is delivered directly to your home or office. Zero trips required. Zero follow-up calls needed from your side. Just open the door.",
    checks:['Doorstep delivery across Bangalore', "You'll be notified before the delivery arrives", 'Post-delivery support if any correction is needed'],
  },
]

export default function HowItWorks() {
  const [active, setActive]   = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)

  const switchTab = (i) => {
    setVisible(false)
    setTimeout(() => { setActive(i); setVisible(true) }, 250)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % 4
        setVisible(false)
        setTimeout(() => setVisible(true), 250)
        return next
      })
    }, 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleTabClick = (i) => {
    clearInterval(timerRef.current)
    switchTab(i)
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % 4
        setVisible(false)
        setTimeout(() => setVisible(true), 250)
        return next
      })
    }, 4000)
  }

  const tab = TABS[active]

  return (
    <section className="hiw" id="how-it-works">
      <div className="mx">
        <div className="shead rv">
          <div className="eyebrow">Simple Process</div>
          <h2>Your Document in 4 Steps.<br />We Do the Heavy Lifting.</h2>
        </div>
        <div className="hiw-layout">
          <div className="hiw-tabs rv-l">
            {TABS.map((t, i) => (
              <button
                key={i}
                className={`htab${active === i ? ' on' : ''}`}
                onClick={() => handleTabClick(i)}
              >
                <div className="tab-n">{String(i + 1).padStart(2, '0')}</div>
                <div className="tab-txt">
                  <div className="tab-title">{t.title}</div>
                  <div className="tab-sub">{t.sub}</div>
                </div>
                <span className="tab-arr">→</span>
              </button>
            ))}
          </div>

          <div className="hiw-panel rv-r">
            <div className={`panel-content ${visible ? 'in' : 'out'}`}>
              <span className="p-icon">{tab.icon}</span>
              <div className="p-step">{tab.step}</div>
              <div className="p-title">{tab.pTitle}</div>
              <p className="p-desc">{tab.desc}</p>
              <div className="p-checks">
                {tab.checks.map((c, i) => (
                  <div key={i} className="pc">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
