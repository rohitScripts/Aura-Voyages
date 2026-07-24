import { fetchJson } from './api.js'

const STORAGE_SESSION = 'goget_session'

function getSession() {
  const stored = localStorage.getItem(STORAGE_SESSION)
  return stored ? JSON.parse(stored) : { token: null, user: null }
}

function setSession(session) {
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(session))
}

export function getToken() {
  return getSession().token
}

export function getCurrentUser() {
  return getSession().user
}

export function saveSession(user, token) {
  setSession({ user, token })
}

export function clearSession() {
  localStorage.removeItem(STORAGE_SESSION)
}

export async function initialize() {
  const token = getToken()
  if (!token) return

  try {
    const user = await fetchJson('/users/me', { token })
    saveSession(user, token)
  } catch {
    clearSession()
  }
}

export async function signup({ name, email, password }) {
  const response = await fetchJson('/auth/signup', { method: 'POST', body: { name, email, password } })
  saveSession(response.user, response.token)
  return response.user
}

export async function login(email, password) {
  const response = await fetchJson('/auth/login', { method: 'POST', body: { email, password } })
  saveSession(response.user, response.token)
  return response.user
}

export function logout() {
  clearSession()
}

export async function forgotPassword(email) {
  return fetchJson('/auth/forgot-password', { method: 'POST', body: { email } })
}

export async function updateProfile(userId, updates) {
  const token = getToken()
  const user = await fetchJson('/users/profile', { method: 'PUT', token, body: updates })
  saveSession(user, token)
  return user
}
