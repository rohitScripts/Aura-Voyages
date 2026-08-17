import { Star } from 'lucide-react'
import PropTypes from 'prop-types'

/**
 * RatingStars Component
 * Displays interactive star rating (1-5)
 */
export default function RatingStars({ rating, setRating, disabled = false }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !disabled && setRating(star)}
          disabled={disabled}
          className={`transition-all duration-200 ${
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-110'
          }`}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={32}
            className={`${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-slate-300'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  )
}

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}
