'use client'

const LOGOS = [
  { name: 'Paytm',        src: '/paytm.png',          height: 52 },
  { name: 'CSC',          src: '/csc.png'              },
  { name: 'Gromo',        src: '/gromo.png'            },
  { name: 'Digital India',src: '/digital india.png'    },
  { name: 'GoDaddy',      src: '/Godaddy.png',        height: 52 },
  { name: 'Turtlemint',   src: '/turtle mint pro.png'  },
]

const ALL = [...LOGOS, ...LOGOS]

export default function Partners() {
  return (
    <section className="partners-sec">
      <p className="partners-eyebrow">Associated With</p>
      <div className="partners-track-wrap">
        <div className="partners-track">
          {ALL.map(({ name, src, height }, i) => (
            <div key={i} className="partners-logo">
              <img src={src} alt={name} style={height ? { height } : undefined} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
