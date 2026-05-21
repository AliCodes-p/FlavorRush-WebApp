import { motion } from 'framer-motion'
import { useState } from 'react'

export const Rating = ({ value = 0, onChange = null, readonly = false, size = 'md' }) => {
  const [hoverValue, setHoverValue] = useState(0)

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.2 }}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          onClick={() => !readonly && onChange && onChange(star)}
          disabled={readonly}
          className={`${sizes[size]} cursor-pointer transition-colors ${readonly ? 'cursor-default' : ''}`}
        >
          <span className={`text-lg ${(hoverValue || value) >= star ? 'text-warning' : 'text-gray-300'}`}>
            ★
          </span>
        </motion.button>
      ))}
    </div>
  )
}

export default Rating
