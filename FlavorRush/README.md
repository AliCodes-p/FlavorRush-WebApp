# 🚀 FlavorRush - Premium Food Delivery Platform

A modern, high-end food ordering and delivery platform built with cutting-edge technologies. FlavorRush delivers premium fast-food experience with beautiful UI/UX, smooth animations, and seamless user experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen.svg)

## ✨ Features

### 🎯 Core Features
- **Intuitive Food Browsing** - Beautiful product cards with rich details
- **Smart Search & Filtering** - Real-time search with category filters and sorting
- **Customizable Orders** - Add customizations, ingredients, and preferences
- **Smooth Cart Management** - Drag-and-drop cart with real-time updates
- **Multi-Step Checkout** - Secure, user-friendly checkout process
- **Order Tracking** - Real-time order status with live ETA
- **User Authentication** - Secure login/signup with JWT
- **Order History** - View past orders and reorder easily

### 🎨 Design Features
- **Glassmorphism UI** - Modern glass effect components
- **Dark Mode Support** - Full dark mode implementation
- **Smooth Animations** - Framer Motion animations throughout
- **Responsive Design** - Mobile-first, works on all devices
- **Accessibility** - WCAG compliant, screen reader friendly
- **Premium Typography** - Modern font choices and hierarchy
- **Soft Shadows** - Subtle depth and elevation
- **Hover Animations** - Interactive, engaging elements

### 🚀 Advanced Features
- **AI Recommendations** - Suggested items based on preferences
- **Favorites/Wishlist** - Save favorite foods
- **Promo Code System** - Support for discount codes
- **Rating & Reviews** - User reviews and ratings
- **Multiple Payment Options** - Card, UPI, Wallet, COD
- **Multiple Delivery Options** - Standard, Express, Scheduled
- **Admin Dashboard** - Manage products, orders, users
- **Analytics** - Track orders, revenue, and metrics

## 🏗️ Project Structure

```
FlavorRush/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Common/        # Button, Card, Modal, Input, etc.
│   │   │   ├── Layout/        # Navbar, Footer
│   │   │   ├── FoodCard/      # Product card component
│   │   │   ├── SearchBar/     # Search functionality
│   │   │   └── ProductQuickView/
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Auth/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── OrderTracking.jsx
│   │   │   └── Admin/
│   │   ├── store/            # Zustand state management
│   │   │   ├── cartStore.js
│   │   │   ├── authStore.js
│   │   │   ├── themeStore.js
│   │   │   └── filterStore.js
│   │   ├── utils/            # Utility functions
│   │   │   ├── api.js        # Axios API setup
│   │   │   └── helpers.js    # Helper functions
│   │   ├── data/            # Static data
│   │   │   └── dummyData.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── server.js
│   ├── config.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **Animations**: Framer Motion 10.16
- **State Management**: Zustand 4.4
- **HTTP Client**: Axios 1.5
- **Routing**: React Router DOM 6.16
- **UI Components**: Lucide React, React Hot Toast
- **Type Safety**: ESLint

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18
- **Database**: MongoDB
- **Authentication**: JWT + Bcrypt
- **Validation**: Express Validator
- **Payment**: Stripe Integration (Optional)
- **File Upload**: Multer

## 📋 Prerequisites

- Node.js 16+ and npm 8+
- MongoDB 5.0+ (local or Atlas)
- Git
- Modern web browser with ES6 support

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/FlavorRush.git
cd FlavorRush
```

### 2. Setup Frontend

```bash
cd frontend
npm install

# Create .env file if needed
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Setup Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and other configs
nano .env

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

## 📦 Key Dependencies

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.16.0",
  "framer-motion": "^10.16.1",
  "zustand": "^4.4.1",
  "tailwindcss": "^3.3.3",
  "axios": "^1.5.0",
  "react-hot-toast": "^2.4.1"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.1.0",
  "cors": "^2.8.5"
}
```

## 🎯 Usage Guide

### Browsing Food
1. Navigate to the Menu page
2. Use search bar to find items
3. Filter by categories
4. Sort by popularity, rating, or price
5. Click "View" for detailed product information

### Placing Orders
1. Add items to cart with customizations
2. Adjust quantities
3. Enter delivery address
4. Choose delivery & payment method
5. Review and place order
6. Track order in real-time

### User Account
1. Sign up with email
2. Access dashboard
3. View order history
4. Save favorite foods
5. Manage addresses
6. Update profile

### Admin Features
1. Access admin dashboard
2. View analytics and revenue
3. Manage products
4. Monitor orders
5. View user statistics

## 🎨 Customization

### Theme Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#FF6B35',    // Change primary color
  secondary: '#004E89',  // Change secondary color
  accent: '#F7931E',     // Change accent color
}
```

### Animations
Customize animations in component files using Framer Motion props.

### Typography
Modify font families in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Poppins', 'sans-serif'],
  heading: ['Montserrat', 'sans-serif'],
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 641px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first design approach.

## 🔐 Security

- Password hashing with bcryptjs
- JWT authentication
- CORS enabled
- Input validation on frontend and backend
- Environment variables for sensitive data
- SQL injection prevention with Mongoose

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/search` - Search products

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/items/:id` - Update quantity
- `DELETE /api/cart/items/:id` - Remove item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/:id/track` - Track order

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
mongod

# Or use MongoDB Atlas connection string in .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flavorRush
```

### Port Already in Use
```bash
# Frontend (change port in vite.config.js)
# Backend (change PORT in .env)
```

### CORS Issues
Ensure backend has correct frontend URL in CORS configuration.

## 📈 Performance Optimizations

- Image lazy loading
- Code splitting with React Router
- Zustand for optimized state management
- CSS animations using GPU acceleration
- Optimized bundle with Vite
- Database indexing on MongoDB

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist folder to Vercel
```

### Backend (Heroku/Railway/Render)
```bash
# Push to your deployment platform
# Ensure environment variables are set
```

## 📝 Notes

- Demo credentials: demo@flavorush.com / demo123
- Promo codes: FIRST50, SAVE10
- Orders have simulated real-time tracking
- Mock payment processing in place

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ by the FlavorRush Team

## 📞 Support

For support, email support@flavorRush.com or create an issue in the GitHub repository.

---

**Made with 🚀 and ☕ by a passionate developer**
