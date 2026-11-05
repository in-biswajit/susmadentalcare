import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import Logo from './Logo'
import LangToggle from './LangToggle'
import { clinic } from '../data'
import { useLang } from '../i18n'
import { ease } from './Reveal'

export default function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
      >
        <a href="#top" className="brand" aria-label={t.name}>
          <Logo />
        </a>

        <nav className="nav-links">
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <LangToggle />

        <a href="#contact" className="btn btn-ink nav-cta">
          {t.nav.cta} <span className="btn-ico"><Icon name="arrowUpRight" size={16} stroke={2} /></span>
        </a>

        <button className="nav-burger" onClick={() => setOpen(true)} aria-label={t.nav.open}>
          <Icon name="menu" size={22} stroke={2} />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 5%)' }}
            animate={{ clipPath: 'circle(150% at 92% 5%)' }}
            exit={{ clipPath: 'circle(0% at 92% 5%)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="mm-logo"><Logo light /></div>
            <button className="mm-close" onClick={() => setOpen(false)} aria-label={t.nav.close}>
              <Icon name="close" size={26} />
            </button>
            <nav>
              {t.nav.links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease }}
                >
                  <span>0{i + 1}</span>{l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mm-foot">
              <LangToggle id="mm" dark />
              <a href={`tel:${clinic.phone.replace(/\s/g, '')}`}>{clinic.phone}</a>
              {clinic.email && <a href={`mailto:${clinic.email}`}>{clinic.email}</a>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
