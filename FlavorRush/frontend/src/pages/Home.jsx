import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import FoodCard from '../components/FoodCard/FoodCard'
import { dummyProducts, categories, testimonials, promotions } from '../data/dummyData'
import Button from '../components/Common/Button'
import toast from 'react-hot-toast'

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const { addToCart } = useCartStore()

  useEffect(() => {
    // Get top 6 bestsellers
    const featured = dummyProducts.filter(p => p.bestseller).slice(0, 6)
    setFeaturedProducts(featured)
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    toast.success(`${product.name} added to cart!`)
  }

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
    <div className="bg-light dark:bg-dark text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight"
            >
              Your Cravings,
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Our Delivery</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
            >
              Premium food delivered fresh to your doorstep. Order now and enjoy your favorite meals with unprecedented speed and quality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-4 flex-col sm:flex-row"
            >
              <Link to="/menu">
                <Button size="lg" className="w-full sm:w-auto">
                  🍽️ Order Now
                </Button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
              >
                📱 Download App
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8 mt-12 text-center sm:text-left"
            >
              <div>
                <p className="text-3xl font-bold text-primary">1000+</p>
                <p className="text-gray-600 dark:text-gray-400">Restaurants</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-gray-600 dark:text-gray-400">Happy Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4.8★</p>
                <p className="text-gray-600 dark:text-gray-400">Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-full blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop"
                alt="Hero Food"
                className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16 px-4 bg-gradient-secondary bg-opacity-5 dark:bg-opacity-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🎉 Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((promo, idx) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{promo.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{promo.description}</p>
                  <div className="flex justify-between items-center">
                    <code className="bg-primary bg-opacity-20 text-primary px-3 py-1 rounded font-bold text-sm">
                      {promo.code}
                    </code>
                    <Button variant="primary" size="sm">Apply</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all"
              >
                <span className="text-5xl">{cat.icon}</span>
                <p className="font-semibold text-center">{cat.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">⭐ Bestsellers</h2>
              <p className="text-gray-600 dark:text-gray-400">Our most loved dishes</p>
            </div>
            <Link to="/menu">
              <Button variant="primary">View All</Button>
            </Link>
          </div>
          
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariant}>
                <FoodCard 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the fastest food delivery service in your city
          </p>
          <Link to="/menu">
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
              🚀 Order Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
