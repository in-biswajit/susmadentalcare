import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Icon from './Icon'
import Tooth3D from './Tooth3D'
import { IkatField, Kumbha, Phula, palette } from './Motifs'
import { Jhalar } from './Diwali'
import { ease } from './Reveal'
import { clinic } from '../data'
import { useLang } from '../i18n'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease, delay },
})

export default function Hero() {
  const { t, lang } = useLang()
  const h = t.hero
  const [w, setW] = useState(0)
  const { scrollY } = useScroll()
  const toothY = useTransform(scrollY, [0, 700], [0, -120])
  const archY = useTransform(scrollY, [0, 700], [0, 60])

  useEffect(() => {
    const id = setInterval(() => setW((x) => (x + 1) % h.words.length), 2400)
    return () => clearInterval(id)
  }, [h.words.length])

  return (
    <section className="hero" id="top">
      <div className="hero-glow g1" />
      <div className="hero-glow g2" />
      <Jhalar className="jhalar-hero" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.div className="pill" {...fadeUp(0.3)}>
            <span className="pulse" /> <b className="juhar">{h.greet}</b> {h.pill}
          </motion.div>

          <h1 className="hero-title" key={lang}>
            <motion.span className="line" {...fadeUp(0.4)}>{h.before}</motion.span>
            <span className="line rotator">
              <AnimatePresence mode="wait">
                <motion.em
                  key={h.words[w % h.words.length]}
                  initial={{ y: '100%', opacity: 0, rotateX: -60 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: '-100%', opacity: 0, rotateX: 60 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {h.words[w % h.words.length]}
                </motion.em>
              </AnimatePresence>
            </span>
            <motion.span className="line" {...fadeUp(0.55)}>{h.after}</motion.span>
          </h1>

          <motion.p className="hero-lead" {...fadeUp(0.7)}>{h.lead}</motion.p>

          <motion.div className="hero-cta" {...fadeUp(0.85)}>
            <a href="#contact" className="btn btn-coral">
              {h.cta} <span className="btn-ico"><Icon name="arrow" size={16} stroke={2} /></span>
            </a>
            <a href="#services" className="link-under">{h.explore}</a>
          </motion.div>

          <motion.div className="hero-proof" {...fadeUp(1)}>
            <div className="avatars">
              {['P', 'R', 'A', 'S'].map((l, i) => (
                <span key={l} style={{ '--i': i }}>{l}</span>
              ))}
            </div>
            <div>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={14} />)}
                <b>{clinic.rating}</b>
              </div>
              <small>{h.loved}</small>
            </div>
          </motion.div>
        </div>

        <div className="hero-art">
          <motion.div
            className="arch"
            style={{ y: archY }}
            initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 40px 40px)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 40px 40px)' }}
            transition={{ duration: 1.4, ease, delay: 0.3 }}
          >
            <IkatField className="arch-ikat" color="#ffffff" opacity={0.17} size={60} />
            <div className="arch-anchal">
              <Kumbha fill={palette.cream} inner={palette.sindoor} dot={palette.haldi} />
              <div className="pasapali" />
            </div>
            <motion.div style={{ y: toothY }} className="tooth-wrap">
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease, delay: 0.8 }}
              >
                <Tooth3D className="tooth-3d" />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="spin-badge" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#circ" textLength="486" lengthAdjust="spacing">{h.badge}</textPath>
              </text>
            </svg>
            <span className="spin-core"><Icon name="heart" size={22} stroke={2} /></span>
          </div>

          <motion.div className="chip chip-1" {...fadeUp(1.2)}>
            <span className="chip-ico mint"><Icon name="shield" size={18} /></span>
            <div><b>{h.chip1[0]}</b><small>{h.chip1[1]}</small></div>
          </motion.div>
          <motion.div className="chip chip-2" {...fadeUp(1.35)}>
            <span className="chip-ico coral"><Icon name="calendar" size={18} /></span>
            <div><b>{h.chip2[0]}</b><small>{h.chip2[1]}</small></div>
          </motion.div>
          <motion.div className="chip chip-3" {...fadeUp(1.5)}>
            <b className="big">{clinic.experience}+</b>
            <small>{h.chip3[0]}<br />{h.chip3[1]}</small>
          </motion.div>
        </div>
      </div>

      <div className="marquee-wrap" aria-hidden="true">
        <Kumbha fill={palette.ink} inner={palette.teal} dot={palette.haldi} />
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div className="marquee-set" key={k}>
                {t.services.items.map((s) => (
                  <span key={s.title}>{s.title} <i><Phula size={22} /></i></span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pasapali dark" />
      </div>
    </section>
  )
}
