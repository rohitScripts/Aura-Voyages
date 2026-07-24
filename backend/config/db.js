import mongoose from 'mongoose'

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/goget'
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}
