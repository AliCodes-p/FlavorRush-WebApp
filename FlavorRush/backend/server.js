import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import productsRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import ordersRoutes from './routes/orders.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flavorRush')
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', ordersRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FlavorRush API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
