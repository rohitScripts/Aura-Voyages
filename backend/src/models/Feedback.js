import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  country: {
    type: String,
    trim: true,
    default: null,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    enum: [1, 2, 3, 4, 5],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Suggestion', 'Bug Report', 'Compliment', 'Other'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'In Progress', 'Resolved'],
    default: 'New',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update updatedAt before saving
FeedbackSchema.pre('save', function () {
  this.updatedAt = Date.now()
})

const Feedback = mongoose.model('Feedback', FeedbackSchema, 'feedback')
export default Feedback
