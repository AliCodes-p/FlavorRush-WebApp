import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { formatPrice, getSpiceEmoji } from "../../utils/helpers";
import FoodImage from "../Common/FoodImage";
import { ShoppingCart, Eye, Star, Clock, Flame } from "lucide-react";

export const FoodCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const cardRef = useRef(null);

  // Subtle 3-D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setIsHovered(false);
  };

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    onAddToCart(product);
    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        className="card h-full flex flex-col overflow-hidden transition-shadow duration-300"
        style={{
          boxShadow: isHovered
            ? "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)"
            : "0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        {/* ── Image ──────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800/60 aspect-[4/3] shrink-0">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/product/${product.id}`} className="block w-full h-full">
              <FoodImage
                src={product.image}
                alt={product.name}
                productId={product.id}
                category={product.category}
                className="w-full h-full object-cover"
              />
            </Link>
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.bestseller && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] font-semibold shadow-sm">
                <Star className="w-2.5 h-2.5 fill-white" />
                Bestseller
              </span>
            )}
            {product.isSpicy && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500 text-white text-[11px] font-semibold shadow-sm">
                <Flame className="w-2.5 h-2.5 fill-white" />
                Spicy
              </span>
            )}
          </div>

          {/* Rating pill */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm shadow-sm">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-[12px] font-semibold text-gray-900 dark:text-white">
              {product.rating}
            </span>
          </div>

          {/* Quick view overlay */}
          <AnimatedOverlay visible={isHovered} product={product} />
        </div>

        {/* ── Content ────────────────────────────────── */}
        <div className="flex-1 flex flex-col p-4 gap-3">
          {/* Title + prep time */}
          <div>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-semibold text-[15px] text-gray-900 dark:text-white leading-snug line-clamp-1 tracking-[-0.01em] hover:text-[#FF5722] transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-[12px] text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {product.prepTime}
            </span>
            {product.isSpicy && (
              <span className="flex items-center gap-1 text-red-400">
                <Flame className="w-3 h-3" />
                {getSpiceEmoji(product.spiceLevel)}
              </span>
            )}
          </div>

          {/* Price + actions */}
          <div className="mt-auto pt-1 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wide font-medium mb-0.5">
                Price
              </p>
              <p className="text-lg font-bold tracking-[-0.02em] text-[#FF5722]">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/product/${product.id}`}
                aria-label={`View details for ${product.name}`}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-black/8 dark:border-white/8 bg-transparent hover:bg-black/4 dark:hover:bg-white/6 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </Link>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleAddToCart}
                disabled={adding}
                className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl grad-bg text-white text-[13px] font-semibold btn-glow transition-all disabled:opacity-70"
              >
                <motion.div
                  animate={adding ? { rotate: [0, -15, 15, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </motion.div>
                {adding ? "Added!" : "Add"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function AnimatedOverlay({ visible, product }) {
  return (
    <AnimatePresenceLocal visible={visible}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 z-10 flex items-end p-3 pointer-events-none"
      >
        <Link
          to={`/product/${product.id}`}
          className="w-full pointer-events-auto"
        >
          <motion.div
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            exit={{ y: 8 }}
            className="w-full py-2 rounded-xl bg-white/90 dark:bg-black/70 backdrop-blur-sm text-center text-[13px] font-semibold text-gray-900 dark:text-white"
          >
            View details →
          </motion.div>
        </Link>
      </motion.div>
    </AnimatePresenceLocal>
  );
}

// Tiny wrapper to avoid top-level AnimatePresence import issues
function AnimatePresenceLocal({ visible, children }) {
  if (!visible) return null;
  return children;
}

export default FoodCard;
