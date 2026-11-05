import { useState } from 'react'
import Icon from './Icon'
import { IkatField, Kumbha, palette } from './Motifs'
import Reveal, { SplitHeading } from './Reveal'
import { clinic } from '../data'
import { useLang } from '../i18n'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', message: '' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const today = new Date().toISOString().split('T')[0]

  const submit = (e) => {
    e.preventDefault()
    window.open(`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(c.wa(form, t.name))}`, '_blank')
  }

  const tel = `tel:${clinic.phone.replace(/\s/g, '')}`

  return (
    <section className="contact section" id="contact">
      <div className="wrap">
        <div className="contact-box">
          <div className="contact-glow" />
          <IkatField className="contact-ikat" color="#cdebe1" opacity={0.06} size={64} />
          <Kumbha className="contact-kumbha" fill={palette.teal} inner={palette.sindoor} dot={palette.haldi} flip />
          <div className="contact-copy">
            <Reveal><span className="kicker light">{c.kicker}</span></Reveal>
            <SplitHeading className="h2 light xl" text={c.title} />
            <Reveal delay={0.1}>
              <p className="light-p">{c.sub}</p>
            </Reveal>

            <Reveal delay={0.2} className="contact-list">
              <a href={tel}><span><Icon name="phone" size={18} /></span><div><small>{c.call}</small>{clinic.phone}</div></a>
              {clinic.email && <a href={`mailto:${clinic.email}`}><span><Icon name="mail" size={18} /></span><div><small>{c.email}</small>{clinic.email}</div></a>}
              <div><span><Icon name="pin" size={18} /></span><div><small>{c.visit}</small>{t.address}</div></div>
              <div>
                <span><Icon name="clock" size={18} /></span>
                <div>
                  <small>{c.hours}</small>
                  {t.timings.map((x) => <p key={x.day}><b>{x.day}</b> {x.time}</p>)}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} as="form" className="form" onSubmit={submit}>
            <h3>{c.formTitle}</h3>
            <div className="f-row">
              <label className="field">
                <input name="name" value={form.name} onChange={update} required placeholder=" " />
                <span>{c.fName}</span>
              </label>
              <label className="field">
                <input name="phone" type="tel" value={form.phone} onChange={update} required placeholder=" " />
                <span>{c.fPhone}</span>
              </label>
            </div>
            <div className="f-row">
              <label className="field">
                <select name="service" value={form.service} onChange={update} className={form.service ? 'has' : ''}>
                  <option value="" />
                  {t.services.items.map((s) => <option key={s.title}>{s.title}</option>)}
                </select>
                <span>{c.fTreatment}</span>
              </label>
              <label className="field">
                <input name="date" type="date" min={today} value={form.date} onChange={update} className="has" />
                <span>{c.fDate}</span>
              </label>
            </div>
            <label className="field">
              <textarea name="message" rows="3" value={form.message} onChange={update} placeholder=" " />
              <span>{c.fMessage}</span>
            </label>
            <button className="btn btn-coral full" type="submit">
              <Icon name="whatsapp" size={18} /> {c.submit}
            </button>
            <small className="form-note">{c.note}</small>
          </Reveal>
        </div>

        <Reveal className="map">
          <iframe title={t.name} src={clinic.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>
      </div>
    </section>
  )
}
