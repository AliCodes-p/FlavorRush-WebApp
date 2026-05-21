import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useFilterStore } from '../store/filterStore'
import { useCartStore } from '../store/cartStore'
import { dummyProducts, categories } from '../data/dummyData'
import SearchBar from '../components/SearchBar/SearchBar'
import FoodCard from '../components/FoodCard/FoodCard'
import Button from '../components/Common/Button'
import toast from 'react-hot-toast'

export const Menu = () => {
  const { searchQuery, selectedCategory, sortBy, setSortBy, setSelectedCategory } = useFilterStore()
  const { addToCart } = useCartStore()
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts)

  // Filter and search logic
  useEffect(() => {
    let products = [...dummyProducts]

    // Filter by category
    if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
      default:
        products.sort((a, b) => b.reviews - a.reviews)
        break
    }

    setFilteredProducts(products)
  }, [searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    toast.success(`${product.name} added to cart!`)
  }

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    }
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">🍽️ Our Menu</h1>
          <p className="text-gray-600 dark:text-gray-400">Explore our delicious selection of food</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SearchBar />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Category Filter */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      !selectedCategory
                        ? 'bg-primary text-white font-semibold'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    All Items
                  </motion.button>
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-white font-semibold'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="font-bold text-lg mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">😔 No items found</p>
                <p className="text-gray-500 dark:text-gray-500">Try adjusting your filters or search</p>
              </motion.div>
            ) : (
              <>
                {/* Results Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 flex justify-between items-center"
                >
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </motion.div>

                {/* Product Grid */}
                <motion.div
                  variants={containerVariant}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <motion.div key={product.id} variants={itemVariant}>
                      <FoodCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Menu
