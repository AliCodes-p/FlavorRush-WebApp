# Quick Start Guide - FlavorRush

## 🚀 5-Minute Setup

### Prerequisites
- Node.js 16+ 
- MongoDB running locally or MongoDB Atlas account
- npm 8+

### Step 1: Clone & Navigate
```bash
git clone <repository-url>
cd FlavorRush
```

### Step 2: Frontend Setup (Terminal 1)
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

### Step 3: Backend Setup (Terminal 2)
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/flavorRush

npm run dev
```
Backend running on http://localhost:5000

### Step 4: Start Ordering! 🎉
1. Go to http://localhost:5173
2. Create account or use demo credentials
3. Browse menu
4. Add items to cart
5. Complete checkout

## 📱 Demo Credentials
- Email: demo@flavorush.com
- Password: demo123

## 🎯 Test Features

### 1. Menu & Search
- Browse menu by categories
- Search for items
- Sort by popularity, rating, price

### 2. Shopping Cart
- Add items with customizations
- Update quantities
- Apply promo codes: FIRST50, SAVE10

### 3. Checkout
- Fill delivery address
- Choose delivery method
- Select payment option
- Place order

### 4. Order Tracking
- Track order in real-time
- View ETA
- Driver information
- Order details

### 5. User Dashboard
- View order history
- Manage addresses
- Edit profile
- View favorites

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9

# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
mongod

# Or use MongoDB Atlas connection string
```

### CORS Error
- Backend CORS is configured for localhost:5173
- Update if frontend runs on different port

## 🎨 Customize

### Change Primary Color
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#FF6B35',  // Change this to your color
}
```

### Add New Products
Add to `frontend/src/data/dummyData.js`:
```javascript
{
  id: 13,
  name: 'Your Item',
  category: 'category',
  price: 299,
  image: 'image-url',
  // ... other fields
}
```

## 🚀 Next Steps

1. **Database Setup**: Connect to MongoDB Atlas
2. **API Integration**: Connect to real backend
3. **Authentication**: Implement real JWT auth
4. **Payments**: Integrate Stripe payment
5. **Deployment**: Deploy frontend & backend
6. **Testing**: Add unit and integration tests

## 📚 Learn More

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [Main README](./README.md)

## 💡 Pro Tips

1. Use Redux DevTools browser extension
2. Check Network tab to debug API calls
3. Use React DevTools to inspect components
4. Enable Source Maps in devtools
5. Test on mobile using device preview

## 📞 Need Help?

- Check README.md files
- Read error messages carefully
- Check browser console
- Check network tab
- Review code comments

Happy coding! 🎉
