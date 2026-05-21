# 🍽️ FlavorRush - Frontend Documentation

Modern React + Vite food delivery web application with beautiful UI/UX and smooth animations.

## 📋 Table of Contents
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [State Management](#state-management)
- [Styling](#styling)
- [Animations](#animations)

## 🚀 Setup

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📁 Project Structure

### `/components`
Reusable React components organized by category:

- **Common/** - Generic components (Button, Card, Modal, Input, Rating, Badge, LoadingSkeleton)
- **Layout/** - Page layout components (Navbar, Footer)
- **FoodCard/** - Product display component
- **SearchBar/** - Search functionality
- **ProductQuickView/** - Product preview modal

### `/pages`
Page-level components:

- `Home.jsx` - Landing page with hero, promotions, categories, testimonials
- `Menu.jsx` - Menu with filtering and searching
- `ProductDetail.jsx` - Detailed product view with reviews
- `Cart.jsx` - Shopping cart management
- `Checkout.jsx` - Multi-step checkout process
- `Auth/Login.jsx` - User login page
- `Auth/Signup.jsx` - User registration page
- `Dashboard.jsx` - User profile and order history
- `OrderTracking.jsx` - Real-time order tracking
- `Admin/Admin.jsx` - Admin dashboard
- `NotFound.jsx` - 404 error page

### `/store`
Zustand state management:

- `cartStore.js` - Cart state and operations
- `authStore.js` - Authentication state
- `themeStore.js` - Dark mode toggling
- `filterStore.js` - Menu filtering state

### `/utils`
Utility functions and configurations:

- `api.js` - Axios API instance with interceptors
- `helpers.js` - Helper functions (formatting, validation, etc.)

### `/data`
Static data:

- `dummyData.js` - Products, categories, testimonials, promotions

## 🧩 Components Guide

### Common Components

#### Button
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

Props:
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg' | 'full'
- `loading`: boolean
- `disabled`: boolean

#### Card
```jsx
<Card hover onClick={handleClick}>
  <img src="..." />
  <h3>Title</h3>
</Card>
```

#### Input
```jsx
<Input 
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
  error={errorMessage}
  icon="📧"
/>
```

#### Modal
```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Title" size="md">
  Modal content
</Modal>
```

#### Rating
```jsx
<Rating value={rating} onChange={handleRatingChange} readonly={false} />
```

#### Badge
```jsx
<Badge variant="primary">Bestseller</Badge>
```

## 📄 Pages Guide

### Home Page
- Hero section with CTA
- Promotions carousel
- Category buttons
- Featured products
- Testimonials
- Footer CTA

### Menu Page
- Search functionality
- Category filters
- Sort options (popular, rating, price)
- Food cards grid
- Empty state handling

### Product Detail
- Large product image
- Detailed information
- Ingredients list
- Nutrition facts
- Spice level indicator
- Customization options
- User reviews and ratings
- Add to cart button

### Cart Page
- List of cart items
- Quantity controls
- Remove items
- Promo code application
- Order summary
- Checkout CTA

### Checkout Page
Multi-step form:
1. Personal Information
2. Delivery Address
3. Delivery & Payment Options
4. Order Review & Confirmation

### Order Tracking
- Status timeline
- ETA counter
- Driver information
- Order details
- Chat and call buttons
- Support option

## 🎯 State Management

### Cart Store
```javascript
useCartStore()
├── items[]
├── addToCart(product, quantity, customizations)
├── removeFromCart(productId, customizations)
├── updateQuantity(productId, customizations, quantity)
├── clearCart()
├── getTotal()
└── getTotalItems()
```

### Auth Store
```javascript
useAuthStore()
├── user
├── token
├── isAuthenticated
├── login(userData, token)
├── signup(userData, token)
├── logout()
├── updateProfile(userData)
└── setUser(userData)
```

### Theme Store
```javascript
useThemeStore()
├── isDark
├── toggleTheme()
├── setTheme(isDark)
└── initTheme()
```

### Filter Store
```javascript
useFilterStore()
├── searchQuery
├── selectedCategory
├── sortBy
├── priceRange
├── setSearchQuery(query)
├── setSelectedCategory(category)
├── setSortBy(sort)
├── setPriceRange(range)
└── resetFilters()
```

## 🎨 Styling

### Tailwind CSS
- Custom color palette in `tailwind.config.js`
- Custom animations and keyframes
- Glassmorphism utilities
- Dark mode support

### Custom Colors
```javascript
colors: {
  primary: '#FF6B35',      // Orange - Main brand color
  secondary: '#004E89',    // Blue - Secondary brand
  accent: '#F7931E',       // Gold - Accent
  dark: '#1A1A1A',         // Dark background
  light: '#F5F5F5',        // Light background
}
```

### Global Styles
Located in `src/index.css`:
- Custom scrollbar
- Smooth scrolling
- Glassmorphism effect
- Selection styling
- Toast positioning

## ✨ Animations

### Framer Motion Usage

#### Fade In
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</motion.div>
```

#### Scale
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Button
</motion.button>
```

#### Stagger Children
```jsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }}
>
  {items.map(item => (...))}
</motion.div>
```

### Built-in Animations
- `fadeIn` - Fade in effect
- `slideUp` - Slide up from bottom
- `pulse-slow` - Slow pulsing
- `bounce-slow` - Slow bounce

## 🔗 API Integration

### Axios Setup
```javascript
import { api } from '../utils/api'

// API calls with automatic token attachment
const response = await api.get('/endpoint')
```

### Available API Methods
- `authAPI` - Login, signup, profile
- `productsAPI` - Get products, search
- `cartAPI` - Cart operations
- `ordersAPI` - Order management
- `addressesAPI` - Address management
- `favoritesAPI` - Favorites management
- `reviewsAPI` - Reviews management

## 📱 Responsive Design

All components use Tailwind responsive prefixes:
- `sm:` - Small screens (640px)
- `md:` - Medium screens (768px)
- `lg:` - Large screens (1024px)

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (...))}
</div>
```

## 🌙 Dark Mode

Toggle dark mode anywhere in your app:
```jsx
import { useThemeStore } from '../store/themeStore'

function MyComponent() {
  const { isDark, toggleTheme } = useThemeStore()
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
```

## 🐛 Debugging

### React DevTools
Install React DevTools extension for Chrome/Firefox to inspect components and state.

### Zustand Debugging
Store mutations are logged to console in development mode.

### Network Debugging
Open browser DevTools Network tab to monitor API calls.

## 📚 Best Practices

1. **Component Organization**: Keep related components in folders
2. **State Management**: Use Zustand stores for global state
3. **Performance**: Memoize expensive components with React.memo
4. **Accessibility**: Use semantic HTML and ARIA labels
5. **Loading States**: Always handle loading and error states
6. **Responsive Design**: Mobile-first approach
7. **Code Splitting**: Use React.lazy for route-based splitting
8. **Error Boundaries**: Wrap routes with error boundaries

## 🚀 Performance Tips

- Use `React.memo()` for expensive components
- Lazy load images with `loading="lazy"`
- Use `useCallback` and `useMemo` sparingly
- Split large components into smaller ones
- Defer non-critical CSS
- Optimize bundle size with tree-shaking

## 📞 Support

For issues or questions, please refer to the main README.md file.
