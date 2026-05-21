import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import toast from 'react-hot-toast'

export const Dashboard = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuthStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      total: 599,
      status: 'Delivered',
      items: 'Burger, Pizza, Fries',
    },
    {
      id: 'ORD-002',
      date: '2024-01-18',
      total: 799,
      status: 'Delivered',
      items: 'Kebab, Nachos, Shake',
    },
    {
      id: 'ORD-003',
      date: '2024-01-15',
      total: 449,
      status: 'Delivered',
      items: 'Sandwich, Fries, Coke',
    },
  ]

  const handleSaveProfile = () => {
    updateProfile(editData)
    setEditMode(false)
    toast.success('Profile updated!')
  }

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold">👤 My Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}!</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              logout()
              navigate('/')
              toast.success('Logged out successfully')
            }}
            className="px-6 py-2 bg-danger text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            🚪 Logout
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md sticky top-24">
              <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
                <div className="text-6xl mb-3">👤</div>
                <p className="font-bold text-lg">{user?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>

              <nav className="p-4 space-y-2">
                {[
                  { id: 'orders', label: '📦 My Orders', icon: '📦' },
                  { id: 'addresses', label: '📍 Addresses', icon: '📍' },
                  { id: 'favorites', label: '❤️ Favorites', icon: '❤️' },
                  { id: 'profile', label: '⚙️ Profile', icon: '⚙️' },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold mb-6">📦 Your Orders</h2>
                {recentOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    variants={itemVariant}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                        <p className="font-bold">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                        <p className="font-bold">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Items</p>
                        <p className="font-bold text-sm">{order.items}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                        <p className="font-bold text-primary">₹{order.total}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="px-3 py-1 bg-success bg-opacity-20 text-success rounded-full text-sm font-semibold">
                          ✓ {order.status}
                        </span>
                        <Button variant="outline" size="sm">Track</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                {!editMode ? (
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                      <p className="text-lg font-semibold">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="text-lg font-semibold">{user?.email}</p>
                    </div>
                    <Button onClick={() => setEditMode(true)}>✏️ Edit Profile</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                    <Input
                      label="Phone"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                    <div className="flex gap-4">
                      <Button onClick={handleSaveProfile}>💾 Save Changes</Button>
                      <Button variant="ghost" onClick={() => setEditMode(false)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">📍 Saved Addresses</h2>
                  <Button>+ Add Address</Button>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                    No addresses saved yet
                  </p>
                </div>
              </motion.div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6">❤️ Favorite Foods</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  You haven't added any favorites yet
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
