import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  profilePicture: String,
  addresses: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isDefault: Boolean,
  }],
  favorites: [mongoose.Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('User', userSchema)
