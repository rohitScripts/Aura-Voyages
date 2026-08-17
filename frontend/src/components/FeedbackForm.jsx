import { useState } from 'react'
import { Send, Loader } from 'lucide-react'
import RatingStars from './RatingStars'
import PropTypes from 'prop-types'

/**
 * FeedbackForm Component
 * Displays feedback form with validation
 */
export default function FeedbackForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    category: 'Suggestion',
    message: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await onSubmit(formData)
    
    // Reset form after successful submission (if needed)
    // This will be handled by parent component via callback
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          disabled={loading}
          className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none ${
            errors.name
              ? 'border-red-500 bg-red-50 focus:border-red-500'
              : 'border-slate-200 bg-white focus:border-sky-500'
          } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          disabled={loading}
          className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none ${
            errors.email
              ? 'border-red-500 bg-red-50 focus:border-red-500'
              : 'border-slate-200 bg-white focus:border-sky-500'
          } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>


      {/* Rating Field */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-3">
          Rating <span className="text-red-500">*</span>
        </label>
        <RatingStars rating={formData.rating} setRating={(value) => {
          setFormData((prev) => ({ ...prev, rating: value }))
          if (errors.rating) {
            setErrors((prev) => ({ ...prev, rating: '' }))
          }
        }} disabled={loading} />
        {errors.rating && <p className="mt-2 text-sm text-red-500">{errors.rating}</p>}
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
          className={`w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 transition-all focus:outline-none focus:border-sky-500 ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          <option value="Suggestion">Suggestion</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Compliment">Compliment</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us your thoughts... (minimum 10 characters)"
          rows={6}
          disabled={loading}
          className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none resize-none ${
            errors.message
              ? 'border-red-500 bg-red-50 focus:border-red-500'
              : 'border-slate-200 bg-white focus:border-sky-500'
          } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
        <div className="mt-2 flex justify-between items-center">
          <div>
            {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
          </div>
          <p className="text-xs text-slate-500">
            {formData.message.length}/2000
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg py-3 font-semibold text-white transition-all flex items-center justify-center gap-2 ${
          loading
            ? 'bg-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 active:scale-95'
        }`}
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Feedback
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-500">
        We value your feedback and will review it shortly.
      </p>
    </form>
  )
}

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}
