import { useEffect, useState } from 'react'
import Icon from './Icon'

// Shows the total number of site visits (see api/visits.js).
// One visit is counted per browser tab session, so refreshing the same
// tab doesn't inflate the number. Hidden if the counter isn't reachable
// (e.g. on localhost, or before the storage is connected on Vercel).
export default function VisitCounter({ label }) {
  const [count, setCount] = useState(null)

  useEffect(() => {
    let isNewVisit = true
    try {
      isNewVisit = !sessionStorage.getItem('susma-visit')
      sessionStorage.setItem('susma-visit', '1')
    } catch {
      /* storage blocked: count the visit anyway */
    }
    const ctrl = new AbortController()
    fetch(isNewVisit ? '/api/visits?hit=1' : '/api/visits', {
      method: isNewVisit ? 'POST' : 'GET',
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && Number.isFinite(d.count) && setCount(d.count))
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  if (count === null) return null
  return (
    <span className="visits" title={label}>
      <Icon name="eye" size={15} /> <b>{count.toLocaleString('en-IN')}</b> {label}
    </span>
  )
}
