import express from 'express'
import { submitFeedback } from '../controllers/feedbackController.js'

const router = express.Router()

/**
 * Public Routes
 */

// Submit feedback (no auth required)
router.post('/', submitFeedback)

export default router
