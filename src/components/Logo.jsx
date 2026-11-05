// Brand logo: the clinic's own mark (public/logo.png) + wordmark.
export function LogoMark({ size = 48 }) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }}>
      <img src="/logo.png" alt="" width={size} height={size} />
    </span>
  )
}

export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo-light' : ''}`}>
      <LogoMark />
      <span className="logo-text">
        <span className="logo-name">Susma</span>
        <span className="logo-sub">Dental <i>·</i> Care</span>
      </span>
    </span>
  )
}
