import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router = express.Router()
router.use(authenticate)

function serializeUser(user) {
  const serialized = user.toObject ? user.toObject() : { ...user }
  const { _id, passwordHash, __v, ...rest } = serialized
  return { id: _id?.toString?.() ?? _id, ...rest }
}

router.get('/me', (req, res) => {
  res.json(serializeUser(req.user))
})

router.put('/profile', async (req, res, next) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ message: 'Name is required.' })
    }
    req.user.name = name.trim()
    await req.user.save()
    res.json(serializeUser(req.user))
  } catch (error) {
    next(error)
  }
})

router.post('/favorites', async (req, res, next) => {
  try {
    const { countryId, name } = req.body
    if (!countryId || !name) {
      return res.status(400).json({ message: 'Country ID and name are required.' })
    }
    const exists = req.user.favoriteCountries.includes(countryId)
    req.user.favoriteCountries = exists ? req.user.favoriteCountries.filter((id) => id !== countryId) : [...req.user.favoriteCountries, countryId]
    req.user.activity.unshift({ text: exists ? `Removed ${name} from favorites` : `Added ${name} to favorites`, timestamp: new Date() })
    await req.user.save()
    res.json(serializeUser(req.user))
  } catch (error) {
    next(error)
  }
})

router.post('/wishlist', async (req, res, next) => {
  try {
    const { countryId, name } = req.body
    if (!countryId || !name) {
      return res.status(400).json({ message: 'Country ID and name are required.' })
    }
    const exists = req.user.wishlist.some((item) => item.id === countryId)
    if (!exists) {
      req.user.wishlist.unshift({ id: countryId, name, checked: false })
      req.user.activity.unshift({ text: `Saved ${name} to wishlist`, timestamp: new Date() })
      await req.user.save()
    }
    res.json(serializeUser(req.user))
  } catch (error) {
    next(error)
  }
})

router.patch('/wishlist/:countryId', async (req, res, next) => {
  try {
    const { countryId } = req.params
    const item = req.user.wishlist.find((entry) => entry.id === countryId)
    if (!item) {
      return res.status(404).json({ message: 'Wishlist item not found.' })
    }
    item.checked = !item.checked
    req.user.activity.unshift({ text: `${item.checked ? 'Checked' : 'Unchecked'} ${item.name} on wishlist`, timestamp: new Date() })
    await req.user.save()
    res.json(serializeUser(req.user))
  } catch (error) {
    next(error)
  }
})

router.post('/visited', async (req, res, next) => {
  try {
    const { countryId } = req.body
    if (!countryId) {
      return res.status(400).json({ message: 'Country ID is required.' })
    }
    if (!req.user.visitedCountries.includes(countryId)) {
      req.user.visitedCountries.push(countryId)
      req.user.activity.unshift({ text: `Marked ${countryId} as visited`, timestamp: new Date() })
      await req.user.save()
    }
    res.json(serializeUser(req.user))
  } catch (error) {
    next(error)
  }
})

router.post('/activity', async (req, res, next) => {
  try {
    const { text } = req.body
    if (!text) {
      return res.status(400).json({ message: 'Activity text is required.' })
    }
    req.user.activity.unshift({ text, timestamp: new Date() })
    await req.user.save()
    res.json(serializeUser(req.user))
  } catch (error) {
    next(error)
  }
})

export default router
