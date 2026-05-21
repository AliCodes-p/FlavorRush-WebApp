# 📚 API Reference - FlavorRush

Complete API documentation for all endpoints.

---

## 🔗 Base URL
```
http://localhost:5000/api
```

## 🔐 Authentication

### JWT Token
Include token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Demo Credentials
```
Email: demo@flavorush.com
Password: demo123
```

---

## 🔑 Authentication Endpoints

### POST `/auth/signup`
Register a new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `400` - Email already exists or missing fields
- `500` - Server error

---

### POST `/auth/login`
User login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `400` - Invalid credentials or missing fields
- `404` - User not found

---

### GET `/auth/profile`
Get current user profile

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011"
}
```

**Errors:**
- `401` - Unauthorized (missing/invalid token)

---

## 🍔 Products Endpoints

### GET `/products`
Get all products with filtering

**Query Parameters:**
```
?category=burgers       - Filter by category
&sortBy=popular        - Sort by: popular|rating|price-asc|price-desc
&search=burger         - Search query
```

**Response (200):**
```json
{
  "products": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Spicy Chicken Burger",
      "category": "burgers",
      "price": 299,
      "image": "url",
      "rating": 4.5,
      "ingredients": ["chicken", "lettuce"],
      "nutrition": {
        "calories": 450,
        "protein": "25g",
        "fat": "20g",
        "carbs": "40g"
      },
      "isSpicy": true,
      "spiceLevel": 3,
      "bestseller": true,
      "prepTime": "15 mins"
    }
  ]
}
```

---

### GET `/products/:id`
Get single product details

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Spicy Chicken Burger",
  "category": "burgers",
  "price": 299,
  "description": "Delicious crispy fried chicken...",
  "image": "url",
  "rating": 4.5,
  "reviews": [
    {
      "userId": "507f1f77bcf86cd799439012",
      "rating": 5,
      "comment": "Delicious!",
      "createdAt": "2024-01-20T10:00:00Z"
    }
  ],
  "ingredients": ["chicken", "lettuce", "tomato"],
  "nutrition": {
    "calories": 450,
    "protein": "25g",
    "fat": "20g",
    "carbs": "40g"
  },
  "isSpicy": true,
  "spiceLevel": 3,
  "bestseller": true,
  "prepTime": "15 mins"
}
```

**Errors:**
- `404` - Product not found

---

### GET `/products/search?q=burger`
Search products

**Query Parameters:**
```
?q=burger    - Search term
```

**Response (200):**
```json
{
  "results": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Spicy Chicken Burger",
      "price": 299,
      "image": "url"
    }
  ]
}
```

---

## 🛒 Cart Endpoints

### GET `/cart`
Get user's cart

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "items": [
    {
      "id": "cart-item-1",
      "productId": "507f1f77bcf86cd799439011",
      "name": "Chicken Burger",
      "price": 299,
      "quantity": 2,
      "customizations": {
        "size": "Large",
        "cheese": "Double"
      }
    }
  ],
  "total": 598
}
```

---

### POST `/cart/add`
Add item to cart

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 1,
  "customizations": {
    "size": "Large",
    "cheese": "Double",
    "sauce": "Spicy Mayo"
  }
}
```

**Response (201):**
```json
{
  "message": "Item added to cart",
  "cartItem": {
    "id": "cart-item-1",
    "productId": "507f1f77bcf86cd799439011",
    "name": "Chicken Burger",
    "price": 299,
    "quantity": 1,
    "customizations": { ... }
  }
}
```

---

### PUT `/cart/items/:itemId`
Update cart item quantity

**Request:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "message": "Item updated",
  "cartItem": {
    "id": "cart-item-1",
    "quantity": 3
  }
}
```

---

### DELETE `/cart/items/:itemId`
Remove item from cart

**Response (200):**
```json
{
  "message": "Item removed"
}
```

---

### DELETE `/cart`
Clear entire cart

**Response (200):**
```json
{
  "message": "Cart cleared"
}
```

---

## 📦 Orders Endpoints

### POST `/orders`
Create new order

**Request:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "name": "Chicken Burger",
      "price": 299,
      "quantity": 2,
      "customizations": {
        "size": "Large"
      }
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "deliveryType": "express",
  "paymentMethod": "card",
  "total": 598
}
```

**Response (201):**
```json
{
  "orderId": "ORD-1234567890",
  "userId": "507f1f77bcf86cd799439011",
  "items": [...],
  "deliveryAddress": {...},
  "subtotal": 550,
  "tax": 48,
  "delivery": 0,
  "total": 598,
  "status": "pending",
  "deliveryType": "express",
  "paymentMethod": "card",
  "paymentStatus": "pending",
  "estimatedDeliveryTime": "2024-01-20T16:30:00Z",
  "createdAt": "2024-01-20T15:30:00Z"
}
```

---

### GET `/orders`
Get all user orders

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "orders": [
    {
      "orderId": "ORD-1234567890",
      "status": "delivered",
      "total": 598,
      "createdAt": "2024-01-20T15:30:00Z",
      "items": [...]
    }
  ]
}
```

---

### GET `/orders/:id`
Get specific order details

**Response (200):**
```json
{
  "orderId": "ORD-1234567890",
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "name": "Chicken Burger",
      "price": 299,
      "quantity": 2
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "subtotal": 550,
  "tax": 48,
  "delivery": 0,
  "total": 598,
  "status": "out_for_delivery",
  "paymentMethod": "card",
  "paymentStatus": "completed",
  "estimatedDeliveryTime": "2024-01-20T16:30:00Z",
  "createdAt": "2024-01-20T15:30:00Z"
}
```

**Errors:**
- `404` - Order not found

---

### GET `/orders/:id/track`
Track order status

**Response (200):**
```json
{
  "orderId": "ORD-1234567890",
  "status": "out_for_delivery",
  "statusCode": 3,
  "estimatedDeliveryTime": "2024-01-20T16:30:00Z",
  "deliveryPartner": {
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "vehicle": "Bike",
    "vehicleNumber": "MH02AB1234"
  },
  "timeline": [
    {
      "status": "pending",
      "timestamp": "2024-01-20T15:30:00Z",
      "icon": "🕐"
    },
    {
      "status": "preparing",
      "timestamp": "2024-01-20T15:35:00Z",
      "icon": "👨‍🍳"
    },
    {
      "status": "ready",
      "timestamp": "2024-01-20T15:50:00Z",
      "icon": "📦"
    },
    {
      "status": "out_for_delivery",
      "timestamp": "2024-01-20T16:00:00Z",
      "icon": "🏍️"
    }
  ]
}
```

---

### POST `/orders/:id/cancel`
Cancel order

**Response (200):**
```json
{
  "message": "Order cancelled",
  "orderId": "ORD-1234567890",
  "status": "cancelled",
  "refundAmount": 598
}
```

**Errors:**
- `400` - Cannot cancel delivered/already cancelled order
- `404` - Order not found

---

## ✅ Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 🔍 Order Status Values

```
pending           - Order received, waiting for preparation
preparing         - Restaurant preparing order
ready             - Order ready for pickup/delivery
out_for_delivery  - Delivery partner on the way
delivered         - Order delivered
cancelled         - Order cancelled
```

---

## 🔒 Error Response Format

```json
{
  "error": "Descriptive error message",
  "code": "ERROR_CODE",
  "status": 400
}
```

---

## 🧪 Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Products
```bash
curl -X GET "http://localhost:5000/api/products?category=burgers&sortBy=popular"
```

### Create Order (with token)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "items": [...],
    "deliveryAddress": {...},
    "total": 598
  }'
```

---

## 📋 Promo Codes

Available test promo codes:
- `FIRST50` - 50% off first order
- `SAVE10` - 10% off any order

---

## 🔗 Related Documentation

- [Main README](./README.md)
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Development Guide](./DEVELOPMENT.md)

---

**Last Updated**: January 2024
