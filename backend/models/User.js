import mongoose from 'mongoose'

const WishlistItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  checked: { type: Boolean, default: false },
})

const ActivityItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
})

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  visitedCountries: { type: [String], default: [] },
  favoriteCountries: { type: [String], default: [] },
  wishlist: { type: [WishlistItemSchema], default: [] },
  activity: { type: [ActivityItemSchema], default: [] },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema, 'first')
export default User
