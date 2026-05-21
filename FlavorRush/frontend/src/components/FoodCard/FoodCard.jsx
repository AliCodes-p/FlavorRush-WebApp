import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, getSpiceEmoji } from '../../utils/helpers'
import Badge from '../Common/Badge'

export const FoodCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl dark:hover:shadow-2xl transition-all">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700 h-48">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex gap-2 flex-wrap">
            {product.bestseller && <Badge variant="warning">⭐ Bestseller</Badge>}
            {product.isSpicy && <Badge variant="danger">🌶️ Spicy</Badge>}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-lg px-2 py-1 flex items-center gap-1 shadow-md">
            <span>⭐</span>
            <span className="font-semibold text-sm">{product.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>

          {product.isSpicy && (
            <div className="text-xs text-red-600 dark:text-red-400 mb-2">
              {getSpiceEmoji(product.spiceLevel)}
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            ⏱️ {product.prepTime}
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between mt-auto">
            <div className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </div>
            <div className="flex gap-2">
              <Link to={`/product/${product.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-secondary bg-opacity-20 text-secondary rounded-lg text-sm font-semibold hover:bg-opacity-30 transition-all"
                >
                  👁️ View
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(product)}
                className="px-3 py-1.5 bg-gradient-primary text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
              >
                🛒 Add
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FoodCard
