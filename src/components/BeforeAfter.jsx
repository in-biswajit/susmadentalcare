import { useState } from 'react'
import Icon from './Icon'
import { useLang } from '../i18n'
import { IkatField, Kumbha, palette } from './Motifs'
import Reveal, { SplitHeading } from './Reveal'

export default function BeforeAfter() {
  const { t } = useLang()
  const r = t.results
  const [pos, setPos] = useState(50)
  return (
    <section className="results section" id="results">
      <Kumbha className="sec-kumbha top" fill={palette.ink} inner={palette.teal} dot={palette.haldi} />
      <IkatField className="results-ikat" color="#cdebe1" opacity={0.06} size={64} />
      <div className="wrap results-grid">
        <div className="results-copy">
          <Reveal><span className="kicker light">{r.kicker}</span></Reveal>
          <SplitHeading className="h2 light" text={r.title} />
          <Reveal delay={0.1}>
            <p className="lead light-p">{r.lead}</p>
          </Reveal>
          <Reveal delay={0.2} className="results-list">
            {r.points.map((p) => (
              <span key={p}><Icon name="check" size={16} stroke={2.4} /> {p}</span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="ba" style={{ '--pos': `${pos}%` }}>
          <img className="ba-img" src="/teeth-before.webp" alt={r.before} draggable="false" />
          <img className="ba-img ba-after-img" src="/teeth-after.webp" alt={r.after} draggable="false" />
          <span className="ba-label l">{r.before}</span>
          <span className="ba-label r">{r.after}</span>
          <div className="ba-handle"><span><Icon name="arrow" size={14} stroke={2.4} /></span></div>
          <input
            type="range"
            min="0"
            max="100"
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={r.aria}
          />
        </Reveal>
      </div>
      <Kumbha className="sec-kumbha bottom" flip fill={palette.ink} inner={palette.teal} dot={palette.haldi} />
    </section>
  )
}
