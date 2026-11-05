import { motion } from 'framer-motion'
import { useLang } from '../i18n'

const options = [
  { code: 'en', label: 'EN' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
]

export default function LangToggle({ id = 'nav', dark = false }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`lang-toggle ${dark ? 'dark' : ''}`} role="group" aria-label="Language">
      {options.map((o) => (
        <button
          key={o.code}
          className={lang === o.code ? 'on' : ''}
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          lang={o.code}
        >
          {lang === o.code && (
            <motion.span layoutId={`lang-pill-${id}`} className="lang-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
          )}
          <span className="lang-label">{o.label}</span>
        </button>
      ))}
    </div>
  )
}
