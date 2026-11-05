// A glossy, illustrated tooth used as the hero centrepiece.
export default function Tooth3D({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 240" aria-hidden="true">
      <defs>
        <radialGradient id="t-body" cx="38%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f3f7f5" />
          <stop offset="100%" stopColor="#c9ddd6" />
        </radialGradient>
        <linearGradient id="t-shade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#7fb3a6" stopOpacity=".35" />
        </linearGradient>
        <filter id="t-shadow" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#0b3b36" floodOpacity=".28" />
        </filter>
      </defs>
      <g filter="url(#t-shadow)">
        <path
          d="M100 30C80 14 40 12 28 40c-12 28-2 60 8 84 8 22 10 52 16 80 4 18 18 22 24 4 6-20 8-48 24-48s18 28 24 48c6 18 20 14 24-4 6-28 8-58 16-80 10-24 20-56 8-84-12-28-52-26-72-10z"
          fill="url(#t-body)"
        />
        <path
          d="M100 30C80 14 40 12 28 40c-12 28-2 60 8 84 8 22 10 52 16 80 4 18 18 22 24 4 6-20 8-48 24-48s18 28 24 48c6 18 20 14 24-4 6-28 8-58 16-80 10-24 20-56 8-84-12-28-52-26-72-10z"
          fill="url(#t-shade)"
        />
      </g>
      <ellipse cx="64" cy="58" rx="16" ry="26" fill="#fff" opacity=".9" transform="rotate(-24 64 58)" />
      <circle cx="84" cy="40" r="5" fill="#fff" />
    </svg>
  )
}
