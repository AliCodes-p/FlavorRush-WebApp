import express from 'express'
import Order from '../models/Order.js'

const router = express.Router()

// Create order
router.post('/', async (req, res) => {
  try {
    const { userId, items, deliveryAddress, total } = req.body

    const order = new Order({
      orderId: `ORD-${Date.now()}`,
      userId,
      items,
      deliveryAddress,
      total,
      status: 'pending',
    })

    await order.save()
    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all orders for user
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Track order
router.get('/:id/track', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json({
      status: order.status,
      estimatedTime: order.estimatedDeliveryTime,
      deliveryPartner: order.deliveryPartner
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Cancel order
router.post('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    )
    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
