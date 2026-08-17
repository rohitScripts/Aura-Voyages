import Feedback from '../models/Feedback.js'

/**
 * @route   POST /api/feedback
 * @desc    Submit new feedback
 * @access  Public
 */
export async function submitFeedback(req, res, next) {
  try {
    console.log('submitFeedback called with body:', req.body)
    console.log('submitFeedback next type:', typeof next)
    const { name, email, country, rating, category, message } = req.body

    // Validation
    if (!name || !email || !rating || !category || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, rating, category, and message',
      })
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      })
    }

    // Validate rating (1-5)
    if (![1, 2, 3, 4, 5].includes(Number(rating))) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      })
    }

    // Validate category
    const validCategories = ['Suggestion', 'Bug Report', 'Compliment', 'Other']
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${validCategories.join(', ')}`,
      })
    }

    // Validate message length
    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long',
      })
    }

    // Create feedback document
    const feedback = new Feedback({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      country: country ? country.trim() : null,
      rating: Number(rating),
      category,
      message: message.trim(),
      status: 'New',
      userId: req.user?.id || null,
    })

    // Save to database
    await feedback.save()

    res.status(201).json({
      success: true,
      message: 'Thank you! Your feedback has been received successfully.',
      data: feedback,
    })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    // defensive: some callers may not provide next correctly; respond here
    return res.status(500).json({ error: error.message || 'Server error', stack: error.stack })
  }
}
