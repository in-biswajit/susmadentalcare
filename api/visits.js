// Vercel serverless function: total site-visit counter.
// Storage: Upstash Redis (connect it to the project from the Vercel dashboard;
// Vercel then adds KV_REST_API_URL / KV_REST_API_TOKEN automatically).
//   POST /api/visits?hit=1  -> add one visit, return the new total
//   GET  /api/visits        -> return the current total
const KEY = 'susma:visits'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    res.status(503).json({ error: 'Visit counter storage is not connected yet' })
    return
  }

  const hit = req.method === 'POST' && req.query.hit === '1'
  try {
    const r = await fetch(`${url}/${hit ? 'incr' : 'get'}/${KEY}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await r.json()
    if (!r.ok || data.error) throw new Error(data.error || `HTTP ${r.status}`)
    res.status(200).json({ count: Number(data.result) || 0 })
  } catch (err) {
    res.status(502).json({ error: 'Counter unavailable' })
  }
}
