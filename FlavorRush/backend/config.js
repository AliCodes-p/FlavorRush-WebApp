import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/flavorRush',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  STRIPE_SECRET: process.env.STRIPE_SECRET || 'sk_test_...',
  NODE_ENV: process.env.NODE_ENV || 'development',
}
