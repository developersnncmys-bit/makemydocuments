'use client'

import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div id="progress" ref={barRef} />
}
