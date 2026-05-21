import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { formatPrice, generateOrderId } from '../utils/helpers'
import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import toast from 'react-hot-toast'

export const Checkout = () => {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryType: 'standard',
    paymentMethod: 'card',
  })

  const [errors, setErrors] = useState({})

  const validateStep = (step) => {
    const newErrors = {}

    if (step >= 1) {
      if (!formData.fullName) newErrors.fullName = 'Name is required'
      if (!formData.phone) newErrors.phone = 'Phone is required'
      if (!formData.email) newErrors.email = 'Email is required'
    }

    if (step >= 2) {
      if (!formData.address) newErrors.address = 'Address is required'
      if (!formData.city) newErrors.city = 'City is required'
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) return

    setIsProcessing(true)
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    const orderId = generateOrderId()
    toast.success('Order placed successfully!')
    clearCart()
    setIsProcessing(false)

    // Navigate to order tracking
    navigate(`/order-tracking/${orderId}`)
  }

  const subtotal = getTotal()
  const tax = Math.round(subtotal * 0.05)
  const delivery = subtotal > 500 ? 0 : 40
  const total = subtotal + tax + delivery

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          💳 Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Steps Indicator */}
            <div className="flex gap-4 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <motion.div
                  key={step}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    step <= currentStep
                      ? 'bg-gradient-primary'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-md"
                >
                  <h2 className="text-2xl font-bold">📋 Personal Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      error={errors.fullName}
                      placeholder="John Doe"
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      error={errors.phone}
                      placeholder="9876543210"
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    placeholder="john@example.com"
                  />

                  <div className="flex justify-end">
                    <Button onClick={handleNext}>Next: Delivery Address →</Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Delivery Address */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-md"
                >
                  <h2 className="text-2xl font-bold">📍 Delivery Address</h2>

                  <Input
                    label="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    error={errors.address}
                    placeholder="123 Main Street"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      error={errors.city}
                      placeholder="New York"
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="NY"
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      error={errors.zipCode}
                      placeholder="10001"
                    />
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-2 text-primary font-semibold hover:text-primary hover:underline"
                    >
                      ← Back
                    </motion.button>
                    <Button onClick={handleNext}>Next: Delivery Type →</Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Delivery & Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-md"
                >
                  <h2 className="text-2xl font-bold">🚗 Delivery & Payment</h2>

                  {/* Delivery Type */}
                  <div>
                    <label className="block font-semibold mb-3">Select Delivery Type</label>
                    <div className="space-y-2">
                      {[
                        { id: 'standard', label: 'Standard Delivery', desc: '30-45 mins', price: 40 },
                        { id: 'express', label: 'Express Delivery', desc: '15-20 mins', price: 80 },
                        { id: 'scheduled', label: 'Scheduled Delivery', desc: 'Choose time', price: 30 },
                      ].map((option) => (
                        <motion.button
                          key={option.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, deliveryType: option.id })}
                          className={`w-full p-4 rounded-lg border-2 transition-all flex justify-between items-center ${
                            formData.deliveryType === option.id
                              ? 'border-primary bg-primary bg-opacity-10'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary'
                          }`}
                        >
                          <div className="text-left">
                            <p className="font-semibold">{option.label}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                          </div>
                          <span className="text-lg font-bold">₹{option.price}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block font-semibold mb-3">Payment Method</label>
                    <div className="space-y-2">
                      {[
                        { id: 'card', label: '💳 Credit/Debit Card' },
                        { id: 'upi', label: '📱 UPI' },
                        { id: 'wallet', label: '💰 Digital Wallet' },
                        { id: 'cod', label: '💵 Cash on Delivery' },
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                          className={`w-full p-3 rounded-lg border-2 transition-all text-left font-semibold ${
                            formData.paymentMethod === method.id
                              ? 'border-primary bg-primary bg-opacity-10'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary'
                          }`}
                        >
                          {method.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2 text-primary font-semibold hover:underline"
                    >
                      ← Back
                    </motion.button>
                    <Button onClick={handleNext}>Next: Review Order →</Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review & Confirm */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-md"
                >
                  <h2 className="text-2xl font-bold">✓ Review Your Order</h2>

                  {/* Order Summary */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold">Delivery Details</h3>
                    <p>{formData.fullName}</p>
                    <p>{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>📞 {formData.phone}</p>
                    <p>📧 {formData.email}</p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2 text-primary font-semibold hover:underline"
                    >
                      ← Back
                    </motion.button>
                    <Button onClick={handlePlaceOrder} loading={isProcessing}>
                      🎉 Place Order
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 sticky top-24 h-fit"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
              <h2 className="text-2xl font-bold">📦 Order Summary</h2>

              <div className="max-h-64 overflow-y-auto space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                {items.map((item, idx) => (
                  <motion.div key={idx} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-2xl font-bold bg-gradient-primary bg-opacity-10 text-primary rounded-lg p-4 border-2 border-primary">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
