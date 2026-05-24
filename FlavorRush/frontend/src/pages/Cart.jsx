import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/helpers'
import Button from '../components/Common/Button'
import toast from 'react-hot-toast'
import FoodImage from '../components/Common/FoodImage'

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FIRST50') {
      setDiscount(getTotal() * 0.5)
      toast.success('Promo code applied!')
    } else if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(getTotal() * 0.1)
      toast.success('Promo code applied!')
    } else {
      toast.error('Invalid promo code')
    }
  }

  const subtotal = getTotal()
  const tax = Math.round((subtotal - discount) * 0.05)
  const delivery = subtotal > 500 ? 0 : 40
  const total = subtotal - discount + tax + delivery

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-6xl mb-4">🛒</p>
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Looks like you haven't added anything yet. Start ordering!
            </p>
            <Link to="/menu">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          🛒 Your Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 flex gap-4 shadow-md hover:shadow-lg transition-all"
              >
                <FoodImage
                  src={item.image}
                  alt={item.name}
                  productId={item.id}
                  category={item.category}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {Object.entries(item.customizations || {}).map(([k, v]) => `${k}: ${v}`).join(', ') || 'Standard'}
                  </p>
                  <p className="text-primary font-semibold">{formatPrice(item.price)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.customizations, Math.max(1, item.quantity - 1))}
                    className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    −
                  </motion.button>
                  <span className="px-3 font-semibold">{item.quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.id, item.customizations, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    +
                  </motion.button>
                </div>

                {/* Total */}
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFromCart(item.id, item.customizations)}
                    className="text-danger hover:text-red-700 text-sm font-semibold mt-2"
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {/* Continue Shopping */}
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
              >
                ← Continue Shopping
              </motion.button>
            </Link>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 sticky top-24 h-fit"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              {/* Promo Code */}
              <div className="space-y-2">
                <label className="block font-semibold text-sm">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Apply
                  </motion.button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Try: FIRST50, SAVE10</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 border-t border-b border-gray-200 dark:border-gray-700 py-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'FREE 🎉' : formatPrice(delivery)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-2xl font-bold bg-gradient-primary bg-opacity-10 text-primary rounded-lg p-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <Button size="full">🚀 Proceed to Checkout</Button>
              </Link>

              {/* Clear Cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  clearCart()
                  toast.success('Cart cleared')
                }}
                className="w-full py-2 text-danger hover:bg-danger hover:bg-opacity-10 rounded-lg font-semibold transition-all"
              >
                🗑️ Clear Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart
