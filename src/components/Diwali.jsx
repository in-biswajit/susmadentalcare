import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { ease } from './Reveal'
import { useLang } from '../i18n'

// Festive Diwali greeting + fireworks.
// Shows automatically until DIWALI_END, then disappears on its own.
// Add ?diwali=1 to the URL to preview it any time.
const DIWALI_END = new Date('2026-11-10T00:00:00+05:30')
const COLORS = ['#ffd36b', '#ffa94d', '#ff6b8b', '#9ff5d8', '#ffffff', '#ff5a4e', '#c9a2ff', '#ffe9a8']

export function isDiwaliTime() {
  try {
    if (new URLSearchParams(window.location.search).get('diwali') === '1') return true
  } catch {
    /* ignore */
  }
  return new Date() < DIWALI_END
}

function Fireworks({ runId, duration = 7000 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!runId) return
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

    const rockets = []
    const sparks = []
    const start = performance.now()
    let lastLaunch = 0
    let lastFrame = start
    let raf = 0

    const launch = () => {
      const x = w * (0.15 + Math.random() * 0.7)
      rockets.push({
        x, y: h, vx: (Math.random() - 0.5) * 1.5,
        vy: -(h * 0.011 + Math.random() * h * 0.004),
        color: COLORS[(Math.random() * COLORS.length) | 0],
        targetY: h * (0.15 + Math.random() * 0.3),
      })
    }

    const explode = (r) => {
      const count = 80 + ((Math.random() * 40) | 0)
      const power = 2.6 + Math.random() * 2.4
      const second = Math.random() < 0.4 ? COLORS[(Math.random() * COLORS.length) | 0] : null
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2
        const s = power * (0.6 + Math.random() * 0.6)
        sparks.push({
          x: r.x, y: r.y, px: r.x, py: r.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          life: 1, decay: 0.008 + Math.random() * 0.01,
          color: second && i % 2 ? second : Math.random() < 0.15 ? '#ffffff' : r.color,
        })
      }
    }

    const tick = (now) => {
      const elapsed = now - start
      // Time-based motion: same speed on slow and fast devices (k = frames at 60fps).
      const k = Math.min(3, (now - lastFrame) / 16.67)
      lastFrame = now
      if (elapsed < duration && now - lastLaunch > 380) {
        launch()
        if (Math.random() < 0.35) launch()
        lastLaunch = now
      }
      ctx.clearRect(0, 0, w, h)
      // Soft "night sky" so the fireworks glow on the light page.
      const fadeIn = Math.min(1, elapsed / 700)
      const fadeOut = elapsed > duration ? Math.max(0, 1 - (elapsed - duration) / 1500) : 1
      ctx.fillStyle = `rgba(8, 16, 26, ${0.65 * fadeIn * fadeOut})`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        const ox = r.x
        const oy = r.y
        r.x += r.vx * k
        r.y += r.vy * k
        r.vy += 0.06 * k
        ctx.strokeStyle = r.color
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(ox - r.vx * 4, oy - r.vy * 4)
        ctx.lineTo(r.x, r.y)
        ctx.stroke()
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r)
          rockets.splice(i, 1)
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]
        const drag = Math.pow(0.985, k)
        p.px = p.x
        p.py = p.y
        p.x += p.vx * k
        p.y += p.vy * k
        p.vx *= drag
        p.vy = p.vy * drag + 0.045 * k
        p.life -= p.decay * k
        if (p.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.globalAlpha = Math.min(1, p.life * 1.4)
        ctx.strokeStyle = p.color
        ctx.lineWidth = 2.2
        ctx.beginPath()
        ctx.moveTo(p.px - p.vx * 2.5, p.py - p.vy * 2.5)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      if (elapsed < duration + 1500 || rockets.length || sparks.length) raf = requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, w, h)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [runId, duration])

  return <canvas ref={ref} className="fireworks" aria-hidden="true" />
}

function Diya({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="diya">
      <defs>
        <radialGradient id="diya-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0" stopColor="#ffe08a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffb547" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="15" r="13" fill="url(#diya-glow)" />
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

export default function Diwali() {
  const { t } = useLang()
  const d = t.diwali
  const [active] = useState(isDiwaliTime)
  const [open, setOpen] = useState(() => {
    try {
      return sessionStorage.getItem('susma-diwali-closed') !== '1'
    } catch {
      return true
    }
  })
  const [runId, setRunId] = useState(0)

  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!active || reduced) return
    const id = setTimeout(() => setRunId(1), 900)
    return () => clearTimeout(id)
  }, [active, reduced])

  const replay = useCallback(() => {
    if (!reduced) setRunId((n) => n + 1)
  }, [reduced])

  const close = () => {
    setOpen(false)
    try {
      sessionStorage.setItem('susma-diwali-closed', '1')
    } catch {
      /* ignore */
    }
  }

  if (!active) return null

  return (
    <>
      {!reduced && <Fireworks key={runId} runId={runId} />}
      <AnimatePresence>
        {open && (
          <motion.aside
            className="diwali-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.7, ease, delay: 1.2 }}
            aria-label={d.title}
          >
            <div className="diwali-diyas"><Diya /><Diya size={40} /><Diya /></div>
            <div className="diwali-text">
              <b>{d.title}</b>
              <span>{d.sub}</span>
            </div>
            {!reduced && (
              <button className="diwali-replay" onClick={replay}>🎆 {d.replay}</button>
            )}
            <button className="diwali-close" onClick={close} aria-label={d.close}><Icon name="close" size={16} stroke={2} /></button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
