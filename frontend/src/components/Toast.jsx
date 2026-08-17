import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import PropTypes from 'prop-types'

/**
 * Toast Component
 * Displays temporary notification messages
 */
export default function Toast({ message, type = 'success', onClose, autoClose = true }) {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'
  const icon = type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />

  // Auto close after 4 seconds
  if (autoClose) {
    setTimeout(onClose, 4000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`${bgColor} fixed bottom-6 right-6 rounded-lg px-6 py-4 text-white shadow-lg flex items-center gap-3 z-50`}
    >
      {icon}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-80 transition-opacity"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </motion.div>
  )
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
  onClose: PropTypes.func.isRequired,
  autoClose: PropTypes.bool,
}
