import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

function createToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
}

function serializeUser(user) {
  const serialized = user.toObject ? user.toObject() : { ...user }
  const { _id, passwordHash, __v, ...rest } = serialized
  return { id: _id?.toString?.() ?? _id, ...rest }
}

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() })
    if (existing) {
      return res.status(409).json({ message: 'Email already in use.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      activity: [{ text: 'Joined Aura Voyages', timestamp: new Date() }],
    })

    const token = createToken(user)
    res.status(201).json({ user: serializeUser(user), token })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const token = createToken(user)
    res.json({ user: serializeUser(user), token })
  } catch (error) {
    next(error)
  }
})

router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' })
    }
    await User.findOne({ email: email.toLowerCase().trim() })
    res.json({ message: 'If that email exists, reset instructions have been sent.' })
  } catch (error) {
    next(error)
  }
})

export default router
