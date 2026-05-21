import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Button from '../../components/Common/Button'
import Input from '../../components/Common/Input'
import toast from 'react-hot-toast'

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuthStore()
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      signup(
        { name: formData.name, email: formData.email, id: '123' },
        'dummy-token'
      )
      toast.success('Account created successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 pt-20">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join FlavorRush</h1>
            <p className="text-gray-600 dark:text-gray-400">Create your account and start ordering</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              placeholder="John Doe"
              icon="👤"
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              placeholder="your@email.com"
              icon="📧"
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              placeholder="••••••••"
              icon="🔒"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              placeholder="••••••••"
              icon="🔒"
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="w-4 h-4" />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the Terms & Conditions
              </label>
            </div>

            <Button size="full" loading={isLoading}>
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-gray-500">Or sign up with</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Social Signup */}
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
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
