import { motion } from 'framer-motion'

export const LoadingSkeleton = ({ count = 3, type = 'product' }) => {
  const skeletonVariant = {
    loading: {
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      }
    }
  }

  if (type === 'product') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div key={i} variants={skeletonVariant} animate="loading" className="rounded-lg overflow-hidden">
            <div className="bg-gray-300 dark:bg-gray-600 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded mb-2 w-3/4"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded w-1/2"></div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <motion.div variants={skeletonVariant} animate="loading" className="bg-gray-300 dark:bg-gray-600 h-20 rounded-lg"></motion.div>
  )
}

export default LoadingSkeleton
