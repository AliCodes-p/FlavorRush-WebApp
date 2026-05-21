import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

// Register
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get Profile
router.get('/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    res.json({ id: decoded.id })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
