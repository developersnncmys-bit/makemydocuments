'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ReviewSlider({ reviews }) {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.rev-slide')
    const cardWidth = card ? card.offsetWidth + 18 : 340
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }

  return (
    <div className="rev-slider-wrap">
      <button className="rev-arrow rev-arrow-l" onClick={() => scroll(-1)} aria-label="Previous">
        <ChevronLeft size={20} strokeWidth={2} />
      </button>

      <div className="rev-track" ref={trackRef}>
        {reviews.map(({ av, name, svc, text }) => (
          <div key={name + svc} className="rev rev-slide ins-rev-enhanced">
            <div className="rev-top">
              <div className="stars">★★★★★</div>
              <div className="rev-verified">✓ Google Verified</div>
            </div>
            <p className="rev-text">{text}</p>
            <div className="rev-meta">
              <div className="rev-av">{av}</div>
              <div>
                <div className="rev-name">{name}</div>
                <div className="rev-svc">{svc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="rev-arrow rev-arrow-r" onClick={() => scroll(1)} aria-label="Next">
        <ChevronRight size={20} strokeWidth={2} />
      </button>
    </div>
  )
}
