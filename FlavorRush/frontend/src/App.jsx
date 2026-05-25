import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import OrderTracking from "./pages/OrderTracking";
import Admin from "./pages/Admin/Admin";
import { useThemeStore } from "./store/themeStore";
import { useAuthStore } from "./store/authStore";
import { useCartStore } from "./store/cartStore";

function App() {
  const { isDark, initTheme } = useThemeStore();
  const { bootstrapAuth } = useAuthStore();
  const { syncWithBackend } = useCartStore();

  useEffect(() => {
    initTheme();
    let mounted = true;

    bootstrapAuth()
      .catch(() => undefined)
      .finally(() => {
        if (mounted) {
          syncWithBackend().catch(() => undefined);
        }
      });

    return () => {
      mounted = false;
    };
  }, [bootstrapAuth, initTheme, syncWithBackend]);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-tracking/:orderId"
              element={
                <ProtectedRoute>
                  <OrderTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default App;
