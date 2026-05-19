'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const curRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const cur  = curRef.current
    const ring = ringRef.current
    const p    = pos.current
    let rafId

    const handleMouseMove = (e) => {
      p.mx = e.clientX
      p.my = e.clientY
      cur.style.left = p.mx + 'px'
      cur.style.top  = p.my + 'px'
    }

    const animRing = () => {
      p.rx += (p.mx - p.rx) * 0.12
      p.ry += (p.my - p.ry) * 0.12
      ring.style.left = p.rx + 'px'
      ring.style.top  = p.ry + 'px'
      rafId = requestAnimationFrame(animRing)
    }
    rafId = requestAnimationFrame(animRing)
    document.addEventListener('mousemove', handleMouseMove)

    const SELECTOR = 'a, button, .chip, .pcard, .svc, .rev, .tc, .htab, .diff-card'
    const expand = (e) => {
      if (e.target.closest(SELECTOR)) {
        cur.style.width      = '16px'
        cur.style.height     = '16px'
        cur.style.background = 'var(--amber)'
        ring.style.width     = '52px'
        ring.style.height    = '52px'
        ring.style.opacity   = '.3'
      }
    }
    const shrink = (e) => {
      if (e.target.closest(SELECTOR)) {
        cur.style.width      = '10px'
        cur.style.height     = '10px'
        cur.style.background = 'var(--teal)'
        ring.style.width     = '36px'
        ring.style.height    = '36px'
        ring.style.opacity   = '.5'
      }
    }
    document.addEventListener('mouseover', expand)
    document.addEventListener('mouseout',  shrink)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', expand)
      document.removeEventListener('mouseout',  shrink)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cursor"      ref={curRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
