import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import {
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  User,
  LayoutDashboard,
  LogOut,
  Zap,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Offers", path: "/menu?offers=true" },
  { name: "Contact", path: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const cartCount = getTotalItems();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <>
      <motion.header
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "bg-white/90 dark:bg-[#0D1117]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.07)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)]"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">
            {/* ── Logo ───────────────────────────────── */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-8 h-8 rounded-xl grad-bg flex items-center justify-center shadow-md"
              >
                <Zap className="w-4 h-4 text-white fill-white" />
              </motion.div>
              <span className="font-semibold text-[17px] tracking-[-0.02em] text-gray-900 dark:text-white">
                Flavor<span className="grad-text">Rush</span>
              </span>
            </Link>

            {/* ── Desktop nav ─────────────────────────── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ name, path }) => {
                const active =
                  location.pathname === path ||
                  (path !== "/" &&
                    location.pathname.startsWith(path.split("?")[0]));
                return (
                  <Link key={path} to={path}>
                    <motion.span
                      whileHover={{ color: "#FF5722" }}
                      className={`
                        relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer block
                        ${
                          active
                            ? "text-[#FF5722]"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }
                      `}
                    >
                      {name}
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-[#FF5722]/10 dark:bg-[#FF5722]/15 -z-10"
                        />
                      )}
                    </motion.span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right controls ──────────────────────── */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? "sun" : "moon"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Cart */}
              <Link to="/cart">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
                  aria-label={`Cart (${cartCount} items)`}
                >
                  <ShoppingBag className="w-[18px] h-[18px]" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full grad-bg text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
                      >
                        {cartCount > 9 ? "9+" : cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="relative hidden sm:block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 h-9 pl-3 pr-2.5 rounded-xl bg-black/5 dark:bg-white/8 hover:bg-black/8 dark:hover:bg-white/12 transition-colors text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    <div className="w-5 h-5 rounded-full grad-bg flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span>{user?.name?.split(" ")[0]}</span>
                    <motion.div
                      animate={{ rotate: isProfileOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-52 card py-1.5 z-50"
                      >
                        <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/6 mb-1">
                          <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
                            {user?.name}
                          </p>
                          <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/4 dark:hover:bg-white/6 rounded-lg mx-1.5 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 text-gray-400" />
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 w-full px-3.5 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mx-1.5 transition-colors"
                          style={{ width: "calc(100% - 12px)" }}
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="h-9 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Log in
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="h-9 px-4 text-sm font-semibold text-white grad-bg rounded-xl btn-glow transition-shadow"
                    >
                      Sign up
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Mobile toggle */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/8 transition-colors ml-1"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ─────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-[#0D1117]/95 backdrop-blur-xl border-t border-black/5 dark:border-white/5"
            >
              <div className="max-w-7xl mx-auto px-5 pb-6 pt-3 space-y-1">
                {NAV_LINKS.map(({ name, path }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={path}
                      className="flex items-center h-11 px-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-black/4 dark:hover:bg-white/6 hover:text-[#FF5722] transition-colors"
                    >
                      {name}
                    </Link>
                  </motion.div>
                ))}

                {!isAuthenticated && (
                  <div className="flex gap-3 pt-3">
                    <Link to="/login" className="flex-1">
                      <button className="w-full h-11 rounded-xl border border-black/10 dark:border-white/10 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-black/4 dark:hover:bg-white/6 transition-colors">
                        Log in
                      </button>
                    </Link>
                    <Link to="/signup" className="flex-1">
                      <button className="w-full h-11 rounded-xl grad-bg text-white text-sm font-semibold btn-glow transition-shadow">
                        Sign up
                      </button>
                    </Link>
                  </div>
                )}
                {isAuthenticated && (
                  <div className="flex gap-3 pt-3">
                    <Link to="/dashboard" className="flex-1">
                      <button className="w-full h-11 rounded-xl border border-black/10 dark:border-white/10 text-sm font-semibold text-gray-800 dark:text-gray-200 transition-colors">
                        Dashboard
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex-1 h-11 rounded-xl border border-red-200 dark:border-red-800/50 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-16 lg:h-[68px]" />
    </>
  );
};

export default Navbar;
