import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export default function Reveal({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

// Splits a heading into words that slide up one by one.
export function SplitHeading({ text, className, as = 'h2', delay = 0 }) {
  const Comp = motion[as]
  // Supports *multi word italic* phrases.
  let inItalic = false
  const words = text.split(' ').map((raw) => {
    let w = raw
    const starts = w.startsWith('*')
    if (starts) { inItalic = true; w = w.slice(1) }
    const italic = inItalic
    if (w.endsWith('*')) { inItalic = false; w = w.slice(0, -1) }
    return { w, italic }
  })
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map(({ w, italic }, i) => {
        return (
          <span key={i}>
            <span className="word-mask">
              <motion.span
                className={italic ? 'it' : undefined}
                style={{ display: 'inline-block' }}
                variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
                transition={{ duration: 0.8, ease }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </Comp>
  )
}
