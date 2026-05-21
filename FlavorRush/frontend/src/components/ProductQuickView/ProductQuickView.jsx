import { motion } from 'framer-motion'
import { useState } from 'react'
import Modal from '../Common/Modal'
import Button from '../Common/Button'
import { formatPrice } from '../../utils/helpers'

export const ProductQuickView = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedCustomizations, setSelectedCustomizations] = useState({})

  const customizationOptions = {
    size: ['Small', 'Medium', 'Large'],
    cheese: [{ label: 'No Cheese', value: 0 }, { label: 'Single', value: 50 }, { label: 'Double', value: 100 }],
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedCustomizations)
    onClose()
    setQuantity(1)
    setSelectedCustomizations({})
  }

  if (!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="font-semibold text-gray-900 dark:text-white">{product.rating}</span>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          {/* Nutrition */}
          {product.nutrition && (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm">
              <p className="font-semibold mb-2">Nutrition (per serving):</p>
              <div className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                <div>🔥 {product.nutrition.calories} cal</div>
                <div>💪 {product.nutrition.protein} protein</div>
                <div>🥑 {product.nutrition.fat} fat</div>
                <div>🌾 {product.nutrition.carbs} carbs</div>
              </div>
            </div>
          )}

          {/* Customizations */}
          <div className="space-y-3">
            {Object.entries(customizationOptions).map(([key, options]) => (
              <div key={key}>
                <label className="block font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                  {key}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {options.map((option, idx) => {
                    const value = typeof option === 'string' ? option : option.label
                    const optionValue = typeof option === 'string' ? option : option.value
                    return (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCustomizations(prev => ({ ...prev, [key]: value }))}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                          selectedCustomizations[key] === value
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
                        }`}
                      >
                        {value}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-lg font-bold"
              >
                −
              </motion.button>
              <span className="px-4 py-1 font-semibold">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-lg font-bold"
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between bg-primary bg-opacity-10 rounded-lg p-3">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price * quantity)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button size="full" onClick={handleAddToCart}>
            🛒 Add to Cart
          </Button>
        </motion.div>
      </div>
    </Modal>
  )
}

export default ProductQuickView
