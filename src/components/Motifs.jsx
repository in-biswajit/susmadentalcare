// =========================================================
//  Sambalpuri textile motifs (Bandha / Ikat inspired)
//  - Kumbha  : temple-spire border seen on saree borders
//  - Pasapali: chessboard pattern
//  - Ikat    : stepped diamonds with "feathered" bleed edges
//  - Phula / Chakra : flower and wheel motifs
// =========================================================
import { useId } from 'react'

export const palette = {
  ink: '#0e2a2b',
  teal: '#136f63',
  green: '#1f8a7b',
  mint: '#cdebe1',
  cream: '#faf6f0',
  sindoor: '#a7322a',
  haldi: '#e39b36',
}

// Stepped (pixelated) diamond polygon, as woven in ikat.
function stepped(cx, cy, r, s) {
  const n = Math.round(r / s)
  const q = [[0, -r]]
  for (let k = 0; k < n; k++) {
    q.push([(k + 1) * s, -r + k * s], [(k + 1) * s, -r + (k + 1) * s])
  }
  const pts = []
  let cur = q
  for (let i = 0; i < 4; i++) {
    pts.push(...cur)
    cur = cur.map(([x, y]) => [-y, x])
  }
  return pts.map(([x, y]) => `${cx + x},${cy + y}`).join(' ')
}

// Repeating ikat lattice as a CSS background-image value.
export function ikatBg(color = '#ffffff', opacity = 0.16, size = 56) {
  const c = size / 2
  const feather = (x, y, dir) =>
    [0, 1, 2]
      .map((i) => `<rect x="${dir > 0 ? x + i * 1 : x - 6 - i * 2}" y="${y - 1 + (i - 1) * 3}" width="${6 - i * 1.5}" height="1.4"/>`)
      .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <g fill="${color}" fill-opacity="${opacity}">
      <polygon fill-rule="evenodd" points="${stepped(c, c, 18, 3)} ${stepped(c, c, 12, 3)}"/>
      <polygon points="${stepped(c, c, 4, 2)}"/>
      ${[[0, 0], [size, 0], [0, size], [size, size]].map(([x, y]) => `<polygon points="${stepped(x, y, 7, 2)}"/>`).join('')}
      ${feather(c + 19, c, 1)}${feather(c - 19, c, -1)}
    </g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export function IkatField({ color, opacity, size, className = '' }) {
  return <div className={`ikat-field ${className}`} style={{ backgroundImage: ikatBg(color, opacity, size) }} aria-hidden="true" />
}

// Kumbha (temple spire) border strip.
export function Kumbha({ fill = palette.ink, inner = palette.sindoor, dot = palette.haldi, flip = false, className = '' }) {
  const id = 'k' + useId().replace(/:/g, '')
  return (
    <svg className={`kumbha ${flip ? 'flip' : ''} ${className}`} width="100%" height="34" aria-hidden="true">
      <defs>
        <pattern id={id} width="36" height="34" patternUnits="userSpaceOnUse">
          <rect y="29" width="36" height="5" fill={fill} />
          <polygon points="1,30 18,5 35,30" fill={fill} />
          <polygon points="9,30 18,16 27,30" fill={inner} />
          <polygon points="14,30 18,23.5 22,30" fill={dot} />
          <circle cx="18" cy="3" r="2.4" fill={dot} />
        </pattern>
      </defs>
      <rect width="100%" height="34" fill={`url(#${id})`} />
    </svg>
  )
}

// Saree-style border: thin lines + kumbha + pasapali checker.
export function SareeBorder({ flip = false, className = '' }) {
  return (
    <div className={`saree ${flip ? 'flip' : ''} ${className}`} aria-hidden="true">
      <Kumbha />
      <div className="pasapali" />
      <div className="saree-lines" />
    </div>
  )
}

export function Phula({ size = 22, color = palette.haldi, center = palette.ink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="phula">
      {[0, 45, 90, 135].map((a) => (
        <ellipse key={a} cx="12" cy="12" rx="2.6" ry="10.5" transform={`rotate(${a} 12 12)`} fill={color} />
      ))}
      <circle cx="12" cy="12" r="3.4" fill={center} />
      <circle cx="12" cy="12" r="1.3" fill={color} />
    </svg>
  )
}

export function Chakra({ size = 120, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true" fill="none" stroke={color}>
      <circle cx="50" cy="50" r="46" strokeWidth="2" />
      <circle cx="50" cy="50" r="38" strokeWidth="1" strokeDasharray="3 4" />
      <circle cx="50" cy="50" r="9" strokeWidth="2" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8
        return <line key={i} x1={50 + 9 * Math.cos(a)} y1={50 + 9 * Math.sin(a)} x2={50 + 38 * Math.cos(a)} y2={50 + 38 * Math.sin(a)} strokeWidth="1.4" />
      })}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8 + Math.PI / 16
        return <circle key={`d${i}`} cx={50 + 42 * Math.cos(a)} cy={50 + 42 * Math.sin(a)} r="1.6" fill={color} stroke="none" />
      })}
    </svg>
  )
}

export function DiamondMark({ size = 14, color = palette.teal }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <polygon points={stepped(10, 10, 9, 3)} fill={color} />
      <polygon points={stepped(10, 10, 3, 1.5)} fill={palette.cream} />
    </svg>
  )
}
