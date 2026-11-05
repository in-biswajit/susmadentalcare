import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import Reveal, { SplitHeading, ease } from './Reveal'
import { clinic } from '../data'
import { useLang } from '../i18n'

export default function Faq() {
  const { t } = useLang()
  const f = t.faq
  const [open, setOpen] = useState(0)
  return (
    <section className="faq section">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <Reveal><span className="kicker">{f.kicker}</span></Reveal>
          <SplitHeading className="h2" text={f.title} />
          <Reveal delay={0.1} className="faq-help">
            <p>{f.help}</p>
            <a className="btn btn-ink" href={`https://wa.me/${clinic.whatsapp}`} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size={18} /> {f.ask}
            </a>
          </Reveal>
        </div>

        <div className="faq-list">
          {f.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.06} className={`qa ${open === i ? 'open' : ''}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="qa-n">0{i + 1}</span>
                <span className="qa-q">{item.q}</span>
                <span className="qa-ico"><Icon name="plus" size={18} stroke={2} /></span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="qa-a"
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
