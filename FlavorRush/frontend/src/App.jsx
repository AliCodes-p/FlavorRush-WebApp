import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/themeStore'

// Layouts
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

// Pages
import Home from './pages/Home'
import Menu from './pages/Menu'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard'
import OrderTracking from './pages/OrderTracking'
import Admin from './pages/Admin/Admin'
import NotFound from './pages/NotFound'

function App() {
  const { isDark, initTheme } = useThemeStore()

  useEffect(() => {
    initTheme()
  }, [])

  return (
    <BrowserRouter>
      <div className={isDark ? 'dark' : ''}>
        <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
