import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    customizations: Object,
  }],
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  subtotal: Number,
  tax: Number,
  delivery: Number,
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryType: String,
  paymentMethod: String,
  paymentStatus: String,
  estimatedDeliveryTime: Date,
  deliveryPartner: {
    name: String,
    phone: String,
    vehicle: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Order', orderSchema)
