import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import Icon from './Icon'
import { IkatField } from './Motifs'
import Reveal, { SplitHeading } from './Reveal'
import { clinic } from '../data'
import { useLang } from '../i18n'

function Counter({ n, suffix, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, n, { duration: 2, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [inView, n])
  return (
    <span ref={ref}>
      {decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')}
      <em>{suffix}</em>
    </span>
  )
}

const statValues = [
  { n: clinic.experience, suffix: '+' },
  { n: clinic.patients, suffix: '+' },
  { n: 15, suffix: '+' },
  { n: clinic.rating, suffix: '★', decimals: 1 },
]

export default function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <section className="about section" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-art">
          <div className="portrait">
            {clinic.doctorPhoto ? (
              <>
                <IkatField className="portrait-ikat" color="#136f63" opacity={0.12} size={60} />
                <div className="portrait-sun" />
                <img className="portrait-img" src={clinic.doctorPhoto} alt={t.doctor} loading="lazy" />
              </>
            ) : (
              <>
                <IkatField className="portrait-ikat" color="#136f63" opacity={0.1} size={60} />
                <div className="portrait-ph">
                  <Icon name="smile" size={70} stroke={1.2} />
                  <span>{a.photo}</span>
                </div>
              </>
            )}
          </div>
          <div className="portrait-tag">
            <span className="sig">{t.doctor}</span>
            <small>{t.role}</small>
          </div>
          <IkatField className="about-ikat" color="#136f63" opacity={0.22} size={44} />
        </Reveal>

        <div className="about-copy">
          <Reveal><span className="kicker">{a.kicker}</span></Reveal>
          <SplitHeading className="h2" text={a.title} />
          <Reveal delay={0.1}>
            <p className="lead">{a.lead(t.doctor, clinic.experience)}</p>
            <p>{a.body(t.name)}</p>
          </Reveal>
          <Reveal delay={0.2} className="quals">
            {t.qualification.map((q) => <span key={q}>{q}</span>)}
          </Reveal>
          <Reveal delay={0.3}>
            <blockquote className="about-quote">{a.quote}</blockquote>
          </Reveal>
        </div>
      </div>

      <div className="wrap">
        <div className="stats">
          {statValues.map((s, i) => (
            <Reveal className="stat" key={i} delay={i * 0.08}>
              <Counter n={s.n} suffix={s.suffix} decimals={s.decimals} />
              <small>{t.stats[i]}</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
