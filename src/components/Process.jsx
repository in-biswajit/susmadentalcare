import Reveal, { SplitHeading } from './Reveal'
import { DiamondMark, palette } from './Motifs'
import { useLang } from '../i18n'

export default function Process() {
  const { t } = useLang()
  const p = t.process
  return (
    <section className="process section">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal><span className="kicker">{p.kicker}</span></Reveal>
          <SplitHeading className="h2" text={p.title} />
        </div>
        <div className="steps">
          {p.steps.map((s, i) => (
            <Reveal className="step" key={i} delay={i * 0.12}>
              <span className="step-num">0{i + 1}</span>
              <span className="step-dot"><DiamondMark size={24} color={palette.sindoor} /></span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
