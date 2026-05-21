import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    createdAt: Date,
  }],
  ingredients: [String],
  nutrition: {
    calories: Number,
    protein: String,
    fat: String,
    carbs: String,
  },
  isSpicy: Boolean,
  spiceLevel: Number,
  bestseller: Boolean,
  prepTime: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Product', productSchema)
