import { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService.js'
import * as userService from '../services/userService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      await authService.initialize()
      setCurrentUser(authService.getCurrentUser())
      setLoading(false)
    }

    loadUser()
  }, [])

  const signup = async (name, email, password) => {
    const user = await authService.signup({ name, email, password })
    setCurrentUser(user)
    return user
  }

  const login = async (email, password) => {
    const user = await authService.login(email, password)
    setCurrentUser(user)
    return user
  }

  const logout = () => {
    authService.logout()
    setCurrentUser(null)
  }

  const forgotPassword = async (email) => {
    return authService.forgotPassword(email)
  }

  const updateProfile = async (updates) => {
    if (!currentUser) throw new Error('No user logged in')
    const user = await authService.updateProfile(currentUser.id, updates)
    setCurrentUser(user)
    return user
  }

  const markVisited = async (countryId) => {
    if (!currentUser) return null
    const user = await userService.markVisited(currentUser.id, countryId)
    setCurrentUser(user)
    return user
  }

  const toggleFavorite = async (country) => {
    if (!currentUser) return null
    const user = await userService.toggleFavorite(currentUser.id, country)
    setCurrentUser(user)
    return user
  }

  const addToWishlist = async (country) => {
    if (!currentUser) return null
    const user = await userService.addToWishlist(currentUser.id, country)
    setCurrentUser(user)
    return user
  }

  const toggleWishlistItem = async (countryId) => {
    if (!currentUser) return null
    const user = await userService.toggleWishlistItem(currentUser.id, countryId)
    setCurrentUser(user)
    return user
  }

  const addActivity = async (text) => {
    if (!currentUser) return null
    const user = await userService.addActivity(currentUser.id, text)
    setCurrentUser(user)
    return user
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isAuthenticated: Boolean(currentUser),
        signup,
        login,
        logout,
        forgotPassword,
        updateProfile,
        markVisited,
        toggleFavorite,
        addToWishlist,
        toggleWishlistItem,
        addActivity,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
