const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const defaultApiHost = hostname === 'localhost' || hostname === '127.0.0.1' ? 'http://localhost:4000' : `${protocol}//${hostname}:4000`
const API_BASE = import.meta.env.VITE_API_BASE || `${defaultApiHost}/api`

export async function fetchJson(path, options = {}) {
  const { method = 'GET', body, token } = options
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }
  return data
}
