import { fetchJson } from './api.js'

/**
 * Submit feedback to the API
 * @param {Object} feedbackData - Feedback form data
 * @returns {Promise<Object>} Response from server
 */
export async function submitFeedback(feedbackData) {
  return fetchJson('/feedback', {
    method: 'POST',
    body: feedbackData,
  })
}
