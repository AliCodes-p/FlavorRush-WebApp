import { useState } from 'react'
import { motion } from 'framer-motion'

export const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange = () => {},
  error = '',
  label = '',
  icon = null,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <motion.div
        className={`relative flex items-center ${focused ? 'ring-2 ring-primary' : ''} rounded-lg transition-all`}
      >
        {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-2.5 ${icon ? 'pl-10' : ''} bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:text-white transition-all ${className} ${error ? 'border-red-500' : ''}`}
          {...props}
        />
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default Input
