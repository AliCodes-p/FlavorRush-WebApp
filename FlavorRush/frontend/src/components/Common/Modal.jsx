import { motion } from 'framer-motion'

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md'
}) => {
  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl ${sizes[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {title && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          )}
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal
