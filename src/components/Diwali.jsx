import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { Kumbha, palette } from './Motifs'
import { ease } from './Reveal'
import { useLang } from '../i18n'

// =========================================================
//  Diwali decorations: jhalar lights, light fireworks behind
//  the content, tiny ones at the edges, and a greeting popup.
//  Everything disappears on its own after DIWALI_END.
//  Add ?diwali=1 to the URL to preview any time.
// =========================================================
const DIWALI_END = new Date('2026-11-10T00:00:00+05:30')
const COLORS = ['#f0a500', '#ff7a2f', '#e8447a', '#1f8a7b', '#8b5cf6', '#d93a2b', '#f7c948']
const BULBS = ['#ffcc33', '#ff5a4e', '#4fd1a5', '#ff8fb1', '#ffffff', '#ffa94d', '#9ad0ff']

export function isDiwaliTime() {
  try {
    if (new URLSearchParams(window.location.search).get('diwali') === '1') return true
  } catch {
    /* ignore */
  }
  return new Date() < DIWALI_END
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const rand = (a, b) => a + Math.random() * (b - a)

// ---------- Fireworks (canvas) ----------
// layer "back": small bursts behind all content, every few seconds.
// layer "front": tiny bursts near the screen edges, now and then.
function Fireworks({ layer }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = 'round'
    }
    resize()
    window.addEventListener('resize', resize)

    const back = layer === 'back'
    const mobile = () => w < 700
    const rockets = []
    const sparks = []
    let nextLaunch = performance.now() + (back ? 600 : 3500)
    let lastFrame = performance.now()
    let raf = 0

    const launch = () => {
      let x
      if (back) x = w * rand(0.06, 0.94)
      else x = Math.random() < 0.5 ? w * rand(0.03, 0.15) : w * rand(0.85, 0.97)
      const top = back ? rand(0.12, 0.5) : rand(0.18, 0.4)
      rockets.push({
        x, y: h + 10, vx: rand(-0.6, 0.6), vy: -Math.sqrt(2 * 0.06 * h * (1 - top)),
        color: COLORS[(Math.random() * COLORS.length) | 0],
      })
    }

    const explode = (r) => {
      const small = mobile() || !back
      const count = back ? (small ? 34 : 50) : 22
      const power = back ? rand(1.6, small ? 2.4 : 3) : rand(1.1, 1.6)
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + rand(-0.05, 0.05)
        const s = power * rand(0.6, 1.1)
        sparks.push({
          x: r.x, y: r.y, px: r.x, py: r.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          life: 1, decay: rand(0.011, 0.02), color: Math.random() < 0.2 ? '#f7c948' : r.color,
        })
      }
    }

    const tick = (now) => {
      const k = Math.min(3, (now - lastFrame) / 16.67)
      lastFrame = now
      if (now >= nextLaunch && !document.hidden) {
        launch()
        nextLaunch = now + (back ? rand(1500, 2800) * (mobile() ? 1.4 : 1) : rand(6000, 9000))
      }
      ctx.clearRect(0, 0, w, h)

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        const ox = r.x
        const oy = r.y
        r.x += r.vx * k
        r.y += r.vy * k
        r.vy += 0.06 * k
        ctx.globalAlpha = 0.8
        ctx.strokeStyle = r.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(ox - r.vx * 3, oy - r.vy * 3)
        ctx.lineTo(r.x, r.y)
        ctx.stroke()
        if (r.vy >= -0.4) {
          explode(r)
          rockets.splice(i, 1)
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]
        const drag = Math.pow(0.975, k)
        p.px = p.x
        p.py = p.y
        p.x += p.vx * k
        p.y += p.vy * k
        p.vx *= drag
        p.vy = p.vy * drag + 0.035 * k
        p.life -= p.decay * k
        if (p.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.globalAlpha = Math.min(1, p.life * 1.5)
        ctx.strokeStyle = p.color
        ctx.lineWidth = back ? 2.6 : 1.8
        ctx.beginPath()
        ctx.moveTo(p.px - p.vx * 2, p.py - p.vy * 2)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [layer])

  return <canvas ref={ref} className={`fireworks fw-${layer}`} aria-hidden="true" />
}

// ---------- Jhalar (string lights) ----------
const SEG = 120
const BULB_T = [0.1, 0.3, 0.5, 0.7, 0.9]
export function Jhalar({ className = '' }) {
  if (!isDiwaliTime()) return null
  return (
    <div className={`jhalar ${className}`} aria-hidden="true">
      {Array.from({ length: 22 }).map((_, s) => (
        <svg key={s} width={SEG} height="46" viewBox={`0 0 ${SEG} 46`}>
          <path d={`M0 4 Q${SEG / 2} 30 ${SEG} 4`} stroke="#6b5a3a" strokeWidth="1.3" fill="none" />
          {BULB_T.map((t, i) => {
            const n = s * BULB_T.length + i
            const x = SEG * t
            const y = 4 + 52 * t * (1 - t)
            return (
              <g key={i} className="bulb" transform={`translate(${x} ${y})`}
                style={{ color: BULBS[n % BULBS.length], '--d': `${((n * 7) % 11) * 0.18}s` }}>
                <rect x="-1.8" y="0" width="3.6" height="3.4" rx="0.8" fill="#6b5a3a" />
                <circle className="bulb-glow" cx="0" cy="9" r="8" fill="currentColor" />
                <ellipse cx="0" cy="8.6" rx="3.4" ry="4.6" fill="currentColor" />
              </g>
            )
          })}
        </svg>
      ))}
    </div>
  )
}

// ---------- Greeting popup ----------
function Diya({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="diya">
      <circle cx="20" cy="15" r="13" fill="#ffd36b" opacity=".25" />
      <path className="diya-flame" d="M20 4c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" fill="#ffb547" />
      <path d="M20 10c1.4 2.6 2.4 4.1 2.4 5.6a2.4 2.4 0 0 1-4.8 0c0-1.5 1-3 2.4-5.6z" fill="#fff3c4" />
      <path d="M5 24h30c-1.5 7-7.5 11-15 11S6.5 31 5 24z" fill="#a7322a" />
      <path d="M8 24h24c-.6 2.2-2 3.5-4 4.2H12c-2-.7-3.4-2-4-4.2z" fill="#e39b36" />
      <circle cx="14" cy="30" r="1.2" fill="#ffd36b" />
      <circle cx="20" cy="31" r="1.2" fill="#ffd36b" />
      <circle cx="26" cy="30" r="1.2" fill="#ffd36b" />
    </svg>
  )
}

function Greeting() {
  const { t } = useLang()
  const d = t.diwali
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('susma-diwali-seen') === '1'
    } catch {
      /* ignore */
    }
    if (seen) return
    const show = setTimeout(() => setOpen(true), 1200)
    return () => clearTimeout(show)
  }, [])

  useEffect(() => {
    if (!open) return
    try {
      sessionStorage.setItem('susma-diwali-seen', '1')
    } catch {
      /* ignore */
    }
    const auto = setTimeout(() => setOpen(false), 9000)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(auto)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dw-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="dw-pop"
            role="dialog"
            aria-modal="true"
            aria-label={d.title}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.6, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="dw-close" onClick={() => setOpen(false)} aria-label={d.close}>
              <Icon name="close" size={18} stroke={2} />
            </button>
            <div className="dw-diyas"><Diya size={36} /><Diya size={48} /><Diya size={36} /></div>
            <h2 className="dw-title">{d.title}</h2>
            <p className="dw-sub">{d.sub}</p>
            <p className="dw-sign">{d.sign}</p>
            <button className="btn btn-coral dw-ok" onClick={() => setOpen(false)}>{d.ok}</button>
            <div className="dw-border"><Kumbha fill={palette.teal} inner={palette.sindoor} dot={palette.haldi} /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Diwali() {
  const [active] = useState(isDiwaliTime)
  const [reduced] = useState(prefersReducedMotion)
  if (!active) return null
  return (
    <>
      {!reduced && <Fireworks layer="back" />}
      {!reduced && <Fireworks layer="front" />}
      <Greeting />
    </>
  )
}
