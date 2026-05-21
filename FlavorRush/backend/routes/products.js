import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, search, sortBy } = req.query

    let query = {}
    if (category) query.category = category
    if (search) query.name = { $regex: search, $options: 'i' }

    let products = await Product.find(query)

    // Sorting
    if (sortBy === 'price-asc') products.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') products.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') products.sort((a, b) => b.rating - a.rating)

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search products
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
