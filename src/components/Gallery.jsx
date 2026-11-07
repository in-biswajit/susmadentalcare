import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { IkatField } from './Motifs'
import Reveal, { SplitHeading, ease } from './Reveal'
import { clinic } from '../data'
import { useLang } from '../i18n'

export default function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const items = g.items.map((caption, i) => ({ caption, src: clinic.gallery[i] || '' }))
  const photos = items.map((x, i) => ({ ...x, i })).filter((x) => x.src)
  const [open, setOpen] = useState(-1) // index into `photos`

  const close = useCallback(() => setOpen(-1), [])
  const step = useCallback((d) => setOpen((o) => (o + d + photos.length) % photos.length), [photos.length])

  useEffect(() => {
    if (open < 0) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  const current = photos[open]

  return (
    <section className="gallery section" id="gallery">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <Reveal><span className="kicker">{g.kicker}</span></Reveal>
            <SplitHeading className="h2" text={g.title} />
          </div>
          <Reveal delay={0.15}>
            <p className="sec-sub">{g.sub}</p>
          </Reveal>
        </div>

        <div className="gal-grid">
          {items.map((item, i) => (
            <motion.figure
              key={i}
              className={`gal-tile g${i + 1} ${item.src ? 'has-photo' : 'is-empty'}`}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: (i % 3) * 0.08 }}
            >
              {item.src ? (
                <button className="gal-btn" onClick={() => setOpen(photos.findIndex((p) => p.i === i))} aria-label={item.caption}>
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </button>
              ) : (
                <div className="gal-empty">
                  <IkatField color="#ffffff" opacity={0.12} size={56} />
                  <span className="gal-ico"><Icon name="camera" size={26} stroke={1.5} /></span>
                  <figcaption>
                    <b>{item.caption}</b>
                    <small>{g.soon}</small>
                  </figcaption>
                </div>
              )}
            </motion.figure>
          ))}
        </div>

        <Reveal className="gal-more">
          <a className="btn btn-ink" href={clinic.social.instagram} target="_blank" rel="noreferrer">
            <Icon name="instagram" size={18} /> {g.more}
            <span className="btn-ico"><Icon name="arrowUpRight" size={16} stroke={2} /></span>
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
          >
            <motion.figure
              key={current.src}
              className="lb-figure"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={current.src} alt={current.caption} />
              <figcaption>{current.caption}</figcaption>
            </motion.figure>
            <button className="lb-close" onClick={close} aria-label={g.close}><Icon name="close" size={24} /></button>
            {photos.length > 1 && (
              <>
                <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label={g.prev}><Icon name="chevL" size={26} stroke={2} /></button>
                <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label={g.next}><Icon name="chevR" size={26} stroke={2} /></button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
