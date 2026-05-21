import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()
  const { getTotalItems } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const cartCount = getTotalItems()

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/')
  }

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Offers', path: '/menu?offers=true' },
    { name: 'Contact', path: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 backdrop-blur-md bg-white bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              🚀
            </motion.div>
            <span className="hidden sm:inline font-heading text-xl font-bold text-gray-900 dark:text-white">
              FlavorRush
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.span
                  whileHover={{ color: '#FF6B35' }}
                  className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer transition-colors"
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-yellow-500"
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>

            {/* Cart */}
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative p-2"
              >
                <span className="text-2xl">🛒</span>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-danger text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary bg-opacity-20 rounded-lg text-primary font-semibold"
                >
                  <span>👤</span>
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50"
                    >
                      <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-danger"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div className="hidden sm:flex gap-2">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 text-primary font-semibold"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-primary text-white rounded-lg font-semibold"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-2xl"
            >
              {isOpen ? '✕' : '☰'}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="px-4 py-2 flex gap-2">
                  <Link to="/login" className="flex-1">
                    <motion.button className="w-full py-2 border-2 border-primary text-primary rounded-lg font-semibold">
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <motion.button className="w-full py-2 bg-gradient-primary text-white rounded-lg font-semibold">
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
