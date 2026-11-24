// Vercel serverless function: total site-visit counter.
//   POST /api/visits?hit=1  -> add one visit, return the new total
//   GET  /api/visits        -> return the current total
//
// Works with either storage connected from the Vercel dashboard:
//   - Redis (Redis Cloud)  -> env REDIS_URL
//   - Upstash Redis (REST) -> env KV_REST_API_URL + KV_REST_API_TOKEN
import { createClient } from 'redis'

const KEY = 'susma:visits'
let client // reused across warm invocations

async function viaRedisUrl(hit) {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL || process.env.KV_URL,
      // Fail fast instead of retrying forever, so a request never hangs.
      socket: { connectTimeout: 4000, reconnectStrategy: (retries) => (retries >= 1 ? new Error('Redis unreachable') : 200) },
    })
    client.on('error', () => {})
  }
  if (!client.isOpen) await client.connect()
  return hit ? client.incr(KEY) : client.get(KEY)
}

async function viaRest(hit, url, token) {
  const r = await fetch(`${url}/${hit ? 'incr' : 'get'}/${KEY}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await r.json()
  if (!r.ok || data.error) throw new Error(data.error || `HTTP ${r.status}`)
  return data.result
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const restUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const restToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  const redisUrl = process.env.REDIS_URL || process.env.KV_URL

  if (!redisUrl && !(restUrl && restToken)) {
    res.status(503).json({ error: 'Visit counter storage is not connected yet' })
    return
  }

  const hit = req.method === 'POST' && req.query.hit === '1'
  try {
    const result = restUrl && restToken ? await viaRest(hit, restUrl, restToken) : await viaRedisUrl(hit)
    res.status(200).json({ count: Number(result) || 0 })
  } catch (err) {
    console.error('visit counter error:', err?.message)
    res.status(502).json({ error: 'Counter unavailable' })
  }
}
