import { motion } from 'framer-motion'
import Icon from './Icon'
import { IkatField, Kumbha, palette } from './Motifs'
import Reveal, { SplitHeading, ease } from './Reveal'
import { useLang } from '../i18n'

export default function Services() {
  const { t } = useLang()
  const s = t.services
  return (
    <section className="services section" id="services">
      <div className="wrap">
        <div className="sec-head split">
          <div>
            <Reveal><span className="kicker">{s.kicker}</span></Reveal>
            <SplitHeading className="h2" text={s.title} />
          </div>
          <Reveal delay={0.15}>
            <p className="sec-sub">{s.sub}</p>
          </Reveal>
        </div>

        <div className="bento">
          {s.items.map((item, i) => (
            <motion.a
              href="#contact"
              key={i}
              className={`tile ${item.featured ? 'tile-feat' : ''}`}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: (i % 4) * 0.08 }}
            >
              <div className="tile-top">
                <span className="tile-ico"><Icon name={item.icon} size={item.featured ? 34 : 26} stroke={1.5} /></span>
                <span className="tile-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="tile-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <span className="tile-arrow"><Icon name="arrowUpRight" size={18} stroke={2} /></span>
              {item.featured && (
                <>
                  <IkatField className="tile-ikat" color="#ffffff" opacity={0.1} size={60} />
                  <div className="tile-orb" />
                  <div className="tile-anchal"><Kumbha fill={palette.cream} inner={palette.sindoor} dot={palette.haldi} /></div>
                </>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
