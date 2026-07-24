import { fetchJson } from './api.js'
import * as authService from './authService.js'

export async function toggleFavorite(userId, country) {
  const token = authService.getToken()
  const response = await fetchJson('/users/favorites', { method: 'POST', token, body: { countryId: country.id, name: country.name } })
  return response
}

export async function addToWishlist(userId, country) {
  const token = authService.getToken()
  const response = await fetchJson('/users/wishlist', { method: 'POST', token, body: { countryId: country.id, name: country.name } })
  return response
}

export async function toggleWishlistItem(userId, countryId) {
  const token = authService.getToken()
  const response = await fetchJson(`/users/wishlist/${countryId}`, { method: 'PATCH', token })
  return response
}

export async function markVisited(userId, countryId) {
  const token = authService.getToken()
  const response = await fetchJson('/users/visited', { method: 'POST', token, body: { countryId } })
  return response
}

export async function addActivity(userId, text) {
  const token = authService.getToken()
  const response = await fetchJson('/users/activity', { method: 'POST', token, body: { text } })
  return response
}
