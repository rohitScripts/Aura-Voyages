import mongoose from 'mongoose'

const DEFAULT_URI = 'mongodb://127.0.0.1:27017/goget'
const DEFAULT_OPTIONS = { serverSelectionTimeoutMS: 10000 }

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return

  const uri = process.env.MONGODB_URI || DEFAULT_URI
  const family = process.env.MONGODB_FAMILY ? Number(process.env.MONGODB_FAMILY) : undefined
  const connectOptions = { ...DEFAULT_OPTIONS, ...(family ? { family } : {}) }

  try {
    await mongoose.connect(uri, connectOptions)
    console.log('Connected to MongoDB')
    return
  } catch (error) {
    console.error('MongoDB connection error:', error)

    if (!family) {
      console.warn('Retrying MongoDB connection using IPv6 family...')
      try {
        await mongoose.connect(uri, { ...DEFAULT_OPTIONS, family: 6 })
        console.log('Connected to MongoDB (IPv6)')
        return
      } catch (fallbackError) {
        console.error('MongoDB IPv6 fallback error:', fallbackError)
      }
    }

    process.exit(1)
  }
}
