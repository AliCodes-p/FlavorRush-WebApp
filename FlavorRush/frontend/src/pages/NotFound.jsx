import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Common/Button'

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🥺
        </motion.div>

        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Page Not Found
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Sorry! The page you're looking for doesn't exist. Let's get you back to ordering!
        </p>

        <div className="space-y-4">
          <Link to="/">
            <Button size="full">🏠 Go to Home</Button>
          </Link>
          <Link to="/menu">
            <Button size="full" variant="outline">🍽️ Browse Menu</Button>
          </Link>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 text-6xl"
        >
          🚀
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
