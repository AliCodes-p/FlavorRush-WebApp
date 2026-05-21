import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Button from '../../components/Common/Button'
import Input from '../../components/Common/Input'
import toast from 'react-hot-toast'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      login(
        { name: 'John Doe', email, id: '123' },
        'dummy-token'
      )
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 opacity-10 bg-pattern -z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-5xl mb-3">🚀</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your FlavorRush account</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="your@email.com"
              icon="📧"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              icon="🔒"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full text-right text-sm text-primary hover:underline font-semibold"
            >
              Forgot password?
            </motion.button>

            <Button size="full" loading={isLoading}>
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-gray-500">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold hover:shadow-lg transition-all text-2xl"
            >
              📘
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold hover:shadow-lg transition-all text-2xl"
            >
              🔵
            </motion.button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">Demo Credentials:</p>
          <p className="text-xs text-gray-500">Email: demo@flavorush.com</p>
          <p className="text-xs text-gray-500">Password: demo123</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
