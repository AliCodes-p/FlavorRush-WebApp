import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { orderStatuses } from '../data/dummyData'
import Button from '../components/Common/Button'

export const OrderTracking = () => {
  const { orderId } = useParams()
  const [currentStatus, setCurrentStatus] = useState(1)
  const [eta, setEta] = useState(25)

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStatus(prev => Math.min(prev + 1, 5))
      setEta(prev => Math.max(prev - Math.random() * 3, 0))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">🚗 Track Your Order</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Order ID: {orderId}</p>
        </motion.div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-8">Order Status</h2>

            <div className="space-y-8">
              {orderStatuses.map((status, idx) => (
                <motion.div
                  key={status.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6">
                    {/* Timeline Circle */}
                    <motion.div
                      animate={{
                        scale: currentStatus >= status.id ? 1.2 : 1,
                        backgroundColor: currentStatus >= status.id ? '#FF6B35' : '#E0E0E0'
                      }}
                      className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg transition-all"
                    >
                      {status.icon}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`font-bold text-lg mb-1 ${
                          currentStatus >= status.id
                            ? 'text-primary'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {status.label}
                      </motion.h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {currentStatus > status.id ? (
                          <span className="text-success font-semibold">✓ Completed</span>
                        ) : currentStatus === status.id ? (
                          <span className="text-primary font-semibold">⏳ In Progress</span>
                        ) : (
                          <span>Pending</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Line */}
                  {idx < orderStatuses.length - 1 && (
                    <div className="absolute left-7 top-14 w-0.5 h-12 bg-gray-300 dark:bg-gray-700"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar - Delivery Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* ETA Card */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-primary text-white rounded-xl p-6 shadow-lg"
            >
              <p className="text-sm opacity-90 mb-2">Estimated Delivery</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold">{Math.ceil(eta)}</span>
                <span className="text-lg">mins</span>
              </div>
              <p className="text-sm opacity-90">Getting there soon! 🚀</p>
            </motion.div>

            {/* Driver Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold mb-4">👨‍💼 Delivery Partner</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="font-semibold">Rajesh Kumar</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Vehicle</p>
                  <p className="font-semibold">Bike • DL-01 AB 1234</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="primary" className="flex-1">
                    📞 Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    💬 Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold mb-4">📦 Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Chicken Burger x1</span>
                  <span className="font-semibold">₹299</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fries x1</span>
                  <span className="font-semibold">₹149</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹599</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <Button size="full" variant="outline">
              🤝 Need Help?
            </Button>
          </motion.div>
        </div>

        {/* Map Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-96"
        >
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-2">🗺️</p>
              <p className="text-gray-600 dark:text-gray-400">Live Map Coming Soon</p>
              <p className="text-sm text-gray-500">Your order is being tracked in real-time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderTracking
