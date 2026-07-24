import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://10.29.191.64:5173'
]

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Server error' })
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
