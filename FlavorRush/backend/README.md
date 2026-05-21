# 🚀 FlavorRush - Backend Documentation

Node.js + Express + MongoDB API server for the FlavorRush food delivery platform.

## 📋 Table of Contents
- [Setup](#setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Authentication](#authentication)
- [Database](#database)

## 🚀 Setup

### Installation
```bash
npm install
```

### Environment Configuration
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Development Server
```bash
npm run dev
```

### Production Server
```bash
npm start
```

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js          # User schema
│   ├── Product.js       # Product schema
│   └── Order.js         # Order schema
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── products.js      # Product routes
│   ├── cart.js          # Cart routes
│   └── orders.js        # Order routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── server.js            # Main server file
├── config.js            # Configuration
├── .env.example         # Environment variables template
└── package.json         # Dependencies
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer jwt_token

Response: {
  "id": "user_id"
}
```

### Products Routes (`/api/products`)

#### Get All Products
```
GET /api/products?category=burgers&sortBy=popular

Query Parameters:
- category: Filter by category
- search: Search by name
- sortBy: popular|rating|price-asc|price-desc
```

#### Get Single Product
```
GET /api/products/:id

Response: {
  "id": "product_id",
  "name": "Chicken Burger",
  "price": 299,
  "category": "burgers",
  ...
}
```

#### Search Products
```
GET /api/products/search?q=burger

Query Parameters:
- q: Search query
```

### Cart Routes (`/api/cart`)

#### Get Cart
```
GET /api/cart
Authorization: Bearer jwt_token
```

#### Add to Cart
```
POST /api/cart/add
Content-Type: application/json
Authorization: Bearer jwt_token

{
  "productId": "product_id",
  "quantity": 1,
  "customizations": {
    "size": "Large",
    "cheese": "Double"
  }
}
```

#### Update Cart Item
```
PUT /api/cart/items/:itemId
Content-Type: application/json
Authorization: Bearer jwt_token

{
  "quantity": 2
}
```

#### Remove from Cart
```
DELETE /api/cart/items/:itemId
Authorization: Bearer jwt_token
```

#### Clear Cart
```
DELETE /api/cart
Authorization: Bearer jwt_token
```

### Orders Routes (`/api/orders`)

#### Create Order
```
POST /api/orders
Content-Type: application/json
Authorization: Bearer jwt_token

{
  "userId": "user_id",
  "items": [
    {
      "productId": "product_id",
      "name": "Burger",
      "price": 299,
      "quantity": 1,
      "customizations": {}
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "total": 599
}

Response: {
  "orderId": "ORD-123456",
  "status": "pending"
}
```

#### Get All Orders
```
GET /api/orders
Authorization: Bearer jwt_token
```

#### Get Single Order
```
GET /api/orders/:id
Authorization: Bearer jwt_token
```

#### Track Order
```
GET /api/orders/:id/track
Authorization: Bearer jwt_token

Response: {
  "status": "out_for_delivery",
  "estimatedTime": "2024-01-20T15:30:00",
  "deliveryPartner": {
    "name": "Rajesh Kumar",
    "phone": "9876543210"
  }
}
```

#### Cancel Order
```
POST /api/orders/:id/cancel
Authorization: Bearer jwt_token
```

## 📊 Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  profilePicture: String,
  addresses: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isDefault: Boolean
  }],
  favorites: [ObjectId],
  createdAt: Date (auto)
}
```

### Product Schema
```javascript
{
  name: String (required),
  description: String,
  category: String,
  price: Number (required),
  image: String,
  rating: Number (default: 0),
  reviews: [{
    userId: ObjectId,
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  ingredients: [String],
  nutrition: {
    calories: Number,
    protein: String,
    fat: String,
    carbs: String
  },
  isSpicy: Boolean,
  spiceLevel: Number,
  bestseller: Boolean,
  prepTime: String,
  createdAt: Date (auto)
}
```

### Order Schema
```javascript
{
  orderId: String (unique, required),
  userId: ObjectId (required),
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    customizations: Object
  }],
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  subtotal: Number,
  tax: Number,
  delivery: Number,
  total: Number,
  status: String (enum: pending|preparing|ready|out_for_delivery|delivered|cancelled),
  deliveryType: String,
  paymentMethod: String,
  paymentStatus: String,
  estimatedDeliveryTime: Date,
  deliveryPartner: {
    name: String,
    phone: String,
    vehicle: String
  },
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔐 Authentication

### JWT Implementation
- Token generated on login/signup
- Token expires in 7 days
- Sent in Authorization header: `Bearer <token>`
- Verified on protected routes

### Password Security
- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Compared during login

### Token Storage
Frontend stores token in localStorage and sends with each request via Axios interceptor.

## 💾 Database

### MongoDB Connection
```javascript
// Local MongoDB
mongodb://localhost:27017/flavorRush

// MongoDB Atlas (Cloud)
mongodb+srv://username:password@cluster.mongodb.net/flavorRush
```

### Collections
- users
- products
- orders
- carts (optional)
- reviews (optional)

### Indexing
Recommended indexes:
```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })

// Products
db.products.createIndex({ category: 1 })
db.products.createIndex({ name: "text" })

// Orders
db.orders.createIndex({ userId: 1 })
db.orders.createIndex({ orderId: 1 }, { unique: true })
```

## ⚙️ Configuration

### Environment Variables
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flavorRush
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
STRIPE_SECRET=sk_test_...
```

## 🚀 Deployment

### Heroku
```bash
heroku create flavorush-api
git push heroku main
heroku config:set MONGODB_URI=mongodb+srv://...
```

### Railway
```bash
railway link
railway up
```

### Render
```bash
# Connect GitHub repository to Render
# Set environment variables in dashboard
```

## 📈 Performance

### Optimization Tips
- Database indexing on frequently queried fields
- Pagination for large result sets
- Caching with Redis (optional)
- Load balancing with multiple instances
- CDN for static assets

### Monitoring
- Monitor API response times
- Track database performance
- Monitor error rates
- Set up alerts for critical errors

## 🐛 Error Handling

### Standard Error Responses
```javascript
// Success
{ success: true, data: {...} }

// Error
{
  error: "Error message",
  code: "ERROR_CODE",
  status: 400
}
```

## 🔒 Security Best Practices

1. **Input Validation** - Validate all user inputs
2. **SQL Injection Prevention** - Use Mongoose parameterized queries
3. **XSS Prevention** - Sanitize outputs
4. **Rate Limiting** - Implement rate limiting on sensitive endpoints
5. **HTTPS** - Use HTTPS in production
6. **CORS** - Configure CORS properly
7. **Environment Variables** - Never commit secrets
8. **JWT Secret** - Use strong, random secret key

## 📝 Example Workflow

1. **User Registration**
   - POST /api/auth/signup
   - Password hashed and stored
   - JWT token returned

2. **Browse Products**
   - GET /api/products
   - GET /api/products/:id

3. **Add to Cart**
   - POST /api/cart/add (with auth token)

4. **Create Order**
   - POST /api/orders
   - Order created with status 'pending'

5. **Track Order**
   - GET /api/orders/:id/track
   - Real-time status updates

## 📞 Support

For issues or questions, refer to the main README.md file.
