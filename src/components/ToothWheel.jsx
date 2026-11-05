import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Tooth3D from './Tooth3D'
import { palette } from './Motifs'

// A big tooth set inside a Konark-style wheel, fixed to the side of the
// page. It rolls like a wheel as the visitor scrolls.
function Wheel() {
  const c = 100
  const at = (r, a) => [c + r * Math.cos(a), c + r * Math.sin(a)]
  return (
    <svg viewBox="0 0 200 200" className="tw-wheel" aria-hidden="true">
      <circle cx={c} cy={c} r="96" fill={palette.cream} fillOpacity=".55" stroke={palette.teal} strokeWidth="5" />
      <circle cx={c} cy={c} r="87" fill="none" stroke={palette.teal} strokeWidth="1.2" strokeDasharray="2 3" />
      {/* rim beads */}
      {Array.from({ length: 32 }).map((_, i) => {
        const [x, y] = at(91.5, (i / 32) * Math.PI * 2)
        return <circle key={`b${i}`} cx={x} cy={y} r="1.9" fill={i % 2 ? palette.sindoor : palette.haldi} />
      })}
      {/* spokes: 8 thick + 8 thin, like the Konark wheel */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2
        const [x1, y1] = at(52, a)
        const [x2, y2] = at(84, a)
        const thick = i % 2 === 0
        return (
          <line key={`s${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={thick ? palette.teal : palette.green} strokeWidth={thick ? 6 : 2} strokeLinecap="round" />
        )
      })}
      {/* ikat diamonds on thick spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        const [x, y] = at(68, a)
        return <rect key={`d${i}`} x={x - 4} y={y - 4} width="8" height="8" fill={palette.haldi} stroke={palette.ink} strokeWidth="1"
          transform={`rotate(${(a * 180) / Math.PI + 45} ${x} ${y})`} />
      })}
      {/* hub */}
      <circle cx={c} cy={c} r="52" fill={palette.mint} fillOpacity=".75" stroke={palette.teal} strokeWidth="3" />
      <circle cx={c} cy={c} r="46" fill="none" stroke={palette.teal} strokeWidth="1" strokeDasharray="1.5 3" opacity=".7" />
    </svg>
  )
}

export default function ToothWheel() {
  const { scrollY, scrollYProgress } = useScroll()
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1080]), { stiffness: 70, damping: 20 })
  const opacity = useTransform(scrollY, [250, 650], [0, 0.9])
  const x = useTransform(scrollY, [250, 650], [120, 0])

  return (
    <motion.div className="tooth-wheel" style={{ opacity, x }} aria-hidden="true">
      <motion.div className="tw-spin" style={{ rotate }}>
        <Wheel />
        <Tooth3D className="tw-tooth" />
      </motion.div>
    </motion.div>
  )
}
