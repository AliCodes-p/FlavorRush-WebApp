import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import { dummyProducts } from '../data/dummyData'
import { formatPrice, getSpiceEmoji } from '../utils/helpers'
import Button from '../components/Common/Button'
import Badge from '../components/Common/Badge'
import Rating from '../components/Common/Rating'
import toast from 'react-hot-toast'

export const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedCustomizations, setSelectedCustomizations] = useState({})
  const [userRating, setUserRating] = useState(0)
  const { addToCart } = useCartStore()

  useEffect(() => {
    const found = dummyProducts.find(p => p.id === parseInt(id))
    if (found) {
      setProduct(found)
    } else {
      navigate('/menu')
    }
  }, [id, navigate])

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedCustomizations)
    toast.success(`${product.name} added to cart!`)
  }

  if (!product) return null

  const customizationOptions = {
    size: ['Small', 'Medium', 'Large'],
    cheese: [{ label: 'No Cheese', value: 0 }, { label: 'Single', value: 50 }, { label: 'Double', value: 100 }],
    sauce: ['Mayo', 'Mustard', 'BBQ', 'Mix'],
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center gap-2 text-gray-600 dark:text-gray-400"
        >
          <button onClick={() => navigate('/menu')} className="hover:text-primary">Menu</button>
          <span>/</span>
          <span className="text-primary font-semibold">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.bestseller && <Badge variant="warning">⭐ Bestseller</Badge>}
                {product.isSpicy && <Badge variant="danger">🌶️ Spicy</Badge>}
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Description */}
            <div>
              <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">{product.description}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-3xl">⭐</span>
                <span className="text-2xl font-bold">{product.rating}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Based on {product.reviews} reviews
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-bold text-lg mb-3">🥘 Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-primary bg-opacity-20 text-primary px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {ingredient}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Nutrition */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">📊 Nutrition (per serving)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Calories</p>
                  <p className="text-xl font-bold">{product.nutrition.calories}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Protein</p>
                  <p className="text-xl font-bold">{product.nutrition.protein}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Fat</p>
                  <p className="text-xl font-bold">{product.nutrition.fat}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Carbs</p>
                  <p className="text-xl font-bold">{product.nutrition.carbs}</p>
                </div>
              </div>
            </div>

            {/* Spice Level */}
            {product.isSpicy && (
              <div>
                <h3 className="font-bold text-lg mb-2">Spice Level</h3>
                <div className="text-lg">
                  {getSpiceEmoji(product.spiceLevel)}
                  <span className="ml-2">({product.spiceLevel}/5)</span>
                </div>
              </div>
            )}

            {/* Customizations */}
            <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold text-lg">🎨 Customize</h3>
              {Object.entries(customizationOptions).map(([key, options]) => (
                <div key={key}>
                  <label className="block font-semibold mb-2 capitalize">{key}</label>
                  <div className="flex gap-2 flex-wrap">
                    {options.map((option, idx) => {
                      const value = typeof option === 'string' ? option : option.label
                      return (
                        <motion.button
                          key={idx}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCustomizations(prev => ({ ...prev, [key]: value }))}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            selectedCustomizations[key] === value
                              ? 'bg-primary text-white'
                              : 'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
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
              <span className="font-semibold text-lg">Quantity:</span>
              <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all"
                >
                  −
                </motion.button>
                <span className="px-6 py-2 text-xl font-bold">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between bg-gradient-primary text-white rounded-lg p-4 mt-8">
              <div>
                <p className="text-sm opacity-90">Total Price</p>
                <p className="text-3xl font-bold">{formatPrice(product.price * quantity)}</p>
              </div>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleAddToCart}
                className="bg-white text-primary hover:bg-gray-100"
              >
                🛒 Add to Cart
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">📝 Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={`https://i.pravatar.cc/150?img=${idx}`}
                    alt="Reviewer"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Customer {idx + 1}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2 days ago</p>
                  </div>
                </div>
                <Rating value={5} readonly size="sm" />
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Great taste and fresh delivery. Highly recommended!
                </p>
              </motion.div>
            ))}
          </div>

          {/* Add Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
          >
            <h3 className="font-bold text-lg mb-4">Share Your Experience</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Your Rating</label>
                <Rating value={userRating} onChange={setUserRating} size="lg" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Your Review</label>
                <textarea
                  placeholder="Tell us what you think..."
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary"
                  rows="4"
                ></textarea>
              </div>
              <Button size="md">✍️ Submit Review</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail
