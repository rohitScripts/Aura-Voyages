import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Heart, CheckCircle } from 'lucide-react'
import FeedbackForm from '../components/FeedbackForm'
import Toast from '../components/Toast'
import * as feedbackService from '../services/feedbackService'

/**
 * Feedback Page
 * Allows users to submit feedback about Aura Voyages
 */
export default function FeedbackPage() {
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [formResetKey, setFormResetKey] = useState(0)

  const handleSubmitFeedback = async (formData) => {
    try {
      setLoading(true)

      // Submit feedback via API
      const response = await feedbackService.submitFeedback(formData)

      if (response.success) {
        setSubmitted(true)
        setFormResetKey((prev) => prev + 1)
        setToast({
          type: 'success',
          message: 'Thank you! Your feedback has been received.',
        })
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setToast({
        type: 'error',
        message: error.message || 'Failed to submit feedback. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-16 sm:px-10 lg:px-16 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-700 text-white shadow-xl"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
            <Send size={18} />
            <span className="text-sm font-semibold">Share Your Experience</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Help Us Improve Aura Voyages</h1>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">
            Your feedback is invaluable. Whether it's a suggestion, bug report, or compliment, we'd love to hear from you. Every piece of feedback helps us create a better travel experience.
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Why Feedback Matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-4">
              <Heart className="text-sky-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">We Care About You</h3>
            <p className="text-slate-600">
              Your experience matters to us. Every suggestion helps us build better features.
            </p>
          </motion.div>

          {/* Responsive Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Quick & Easy</h3>
            <p className="text-slate-600">
              Fill out our simple form and submit your feedback in under 2 minutes.
            </p>
          </motion.div>

          {/* Global Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-white p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Global Voice</h3>
            <p className="text-slate-600">
              Help shape Aura Voyages for travelers around the world.
            </p>
          </motion.div>
        </div>

        {/* Feedback Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-white p-10 shadow-2xl border border-slate-100"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Send Us Your Feedback</h2>
            <p className="text-slate-600">
              Please fill out the form below. All fields marked with <span className="text-red-500">*</span> are required.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Your feedback has been received successfully. We appreciate you taking the time to help us improve Aura Voyages.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Send another feedback
              </button>
            </motion.div>
          ) : (
            <FeedbackForm key={formResetKey} onSubmit={handleSubmitFeedback} loading={loading} />
          )}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly will my feedback be reviewed?",
                answer: "We review all feedback within 24-48 hours. Critical bug reports are prioritized immediately."
              },
              {
                question: "Can I track the status of my feedback?",
                answer: "Currently, feedback status is managed internally. In the future, we'll add user-side tracking."
              },
              {
                question: "What types of feedback do you accept?",
                answer: "We welcome suggestions, bug reports, compliments, and any other feedback to help us improve."
              },
              {
                question: "Will I receive a response?",
                answer: "For bug reports and significant suggestions, we'll follow up via email within 1 week."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="rounded-xl bg-slate-50 p-6 border border-slate-200"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          autoClose={true}
        />
      )}
    </div>
  )
}
