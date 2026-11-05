import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { Chakra } from './Motifs'
import Reveal, { ease } from './Reveal'
import { clinic } from '../data'
import { useLang } from '../i18n'

export default function Testimonials() {
  const { t, lang } = useLang()
  const r = t.reviews
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setI((x) => (x + 1) % r.items.length), 6500)
    return () => clearTimeout(id)
  }, [i, r.items.length])

  const item = r.items[i]

  return (
    <section className="reviews section" id="reviews">
      <div className="wrap">
        <Reveal className="review-card">
          <Chakra className="review-chakra" size={380} color="#136f63" />
          <div className="pasapali review-strip" />
          <div className="review-left">
            <span className="kicker">{r.kicker}</span>
            <div className="quote-mark">“</div>
            <div className="review-g">
              <b>{clinic.rating}</b>
              <div>
                <div className="stars">{Array.from({ length: 5 }).map((_, k) => <Icon key={k} name="star" size={16} />)}</div>
                <small>{r.avg}</small>
              </div>
            </div>
          </div>

          <div className="review-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
                transition={{ duration: 0.6, ease }}
              >
                <p className="review-text">{item.text}</p>
                <div className="review-who">
                  <span className="who-av">{item.name.charAt(0)}</span>
                  <div><b>{item.name}</b><small>{item.treatment}</small></div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="review-nav">
              {r.items.map((x, k) => (
                <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={r.aria(x.name)}>
                  <span />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
