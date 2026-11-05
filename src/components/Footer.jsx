import Icon from './Icon'
import Logo from './Logo'
import { SareeBorder } from './Motifs'
import { clinic } from '../data'
import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const links = t.nav.links.slice(0, 4)
  return (
    <>
      <footer className="footer">
        <SareeBorder />
        <div className="wrap">
          <div className="foot-top">
            <div>
              <Logo />
              <p className="foot-line">{f.line1}<br /><em>{f.line2}</em></p>
            </div>
            <div className="foot-cols">
              <div>
                <h4>{f.explore}</h4>
                {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
              </div>
              <div>
                <h4>{f.contact}</h4>
                <a href={`tel:${clinic.phone.replace(/\s/g, '')}`}>{clinic.phone}</a>
                {clinic.email && <a href={`mailto:${clinic.email}`}>{clinic.email}</a>}
                <span>{t.address}</span>
              </div>
              <div>
                <h4>{f.follow}</h4>
                <a href={clinic.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
                <a href={clinic.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
              </div>
            </div>
          </div>
          <div className="foot-word" aria-hidden="true">{f.word}</div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} {t.name}</span>
            <a href="#top">{f.top}</a>
          </div>
        </div>
      </footer>

      <a className="wa-fab" href={`https://wa.me/${clinic.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <Icon name="whatsapp" size={26} />
      </a>
    </>
  )
}
