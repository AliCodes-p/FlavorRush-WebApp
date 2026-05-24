import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Sparkles,
  Star,
  Truck,
  Zap,
  MapPin,
  Shield,
  ChefHat,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import FoodCard from "../components/FoodCard/FoodCard";
import FoodImage from "../components/Common/FoodImage";
import { FOOD_IMAGES } from "../utils/foodImages";
import {
  dummyProducts,
  categories,
  testimonials,
  promotions,
} from "../data/dummyData";
import Button from "../components/Common/Button";
import toast from "react-hot-toast";

/* ─── Constants ──────────────────────────────────────────── */
const TICKER = [
  "Free delivery over ₹500",
  "30-min average delivery",
  "1,000+ partner restaurants",
  "4.8★ customer rating",
  "Fresh ingredients daily",
  "Live order tracking",
  "Secure checkout",
];

const STATS = [
  { value: "1,000+", label: "Restaurants", icon: MapPin },
  { value: "50K+", label: "Happy users", icon: TrendingUp },
  { value: "4.8", label: "App rating", icon: Star, suffix: "★" },
];

const STEPS = [
  {
    icon: ChefHat,
    title: "Pick your cravings",
    desc: "Browse curated menus from the best kitchens near you.",
  },
  {
    icon: Zap,
    title: "Checkout in seconds",
    desc: "One-tap ordering with saved addresses and payments.",
  },
  {
    icon: Truck,
    title: "Track live delivery",
    desc: "Real-time updates until your meal arrives hot.",
  },
];

const TRUST = [
  "No hidden fees",
  "30-min guarantee",
  "Top-rated restaurants",
  "Fresh every order",
];

/* ─── Motion variants ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

/* ─── Sub-components ─────────────────────────────────────── */
function EyebrowTag({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20 mb-5">
      <Sparkles className="w-3 h-3" />
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, subtitle, align = "center" }) {
  const cls = align === "left" ? "text-left" : "text-center items-center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col mb-14 md:mb-20 ${cls}`}
    >
      <EyebrowTag>{eyebrow}</EyebrowTag>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.025em] text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "" }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {value}
      {suffix}
    </motion.span>
  );
}

function Ticker() {
  const doubled = [...TICKER, ...TICKER];
  return (
    <div className="relative py-3.5 border-y border-black/6 dark:border-white/6 bg-white/60 dark:bg-white/[0.02] overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--surface)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--surface)] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap select-none">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-10 inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCartStore();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    setFeaturedProducts(dummyProducts.filter((p) => p.bestseller).slice(0, 6));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added!`);
  };
  const copyPromoCode = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success(`Code "${code}" copied!`);
  };

  return (
    <div className="bg-[var(--surface)] text-gray-900 dark:text-white overflow-hidden">
      {/* ══ HERO ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[92svh] flex items-center px-5 sm:px-8 lg:px-12 py-20 mesh-bg noise overflow-hidden"
      >
        {/* Ambient orbs */}
        <div className="absolute top-[10%] -left-40 w-[520px] h-[520px] rounded-full bg-[#FF5722]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] -right-40 w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />

        {/* Decorative ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#FF5722]/5 animate-spin-slow pointer-events-none"
          style={{ borderStyle: "dashed" }}
        />

        <motion.div
          style={{ y: smoothY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/8 border border-black/6 dark:border-white/10 shadow-sm mb-8"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                Now delivering in your area
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.03em] text-gray-900 dark:text-white mb-6">
              Food that <span className="italic grad-text">arrives</span> before
              the craving fades
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
              FlavorRush connects you to the best local restaurants. Order in
              seconds, track in real time, eat in minutes.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {TRUST.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-white/6 border border-black/6 dark:border-white/8 text-[12px] font-medium text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 h-12 px-7 rounded-2xl grad-bg text-white text-[15px] font-semibold btn-glow transition-shadow"
                >
                  Order now
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 h-12 px-7 rounded-2xl border border-black/10 dark:border-white/15 bg-[var(--card)] text-[var(--ink)] text-[15px] font-semibold shadow-sm hover:opacity-90 transition-opacity"
                >
                  Browse menu
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-black/6 dark:border-white/6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                >
                  <p className="font-display text-3xl lg:text-4xl tracking-[-0.03em] text-gray-900 dark:text-white">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — floating food visuals */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Main plate */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-[380px] h-[380px] rounded-[40px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)]"
            >
              <FoodImage
                src={dummyProducts[0]?.image || FOOD_IMAGES.hero}
                alt="Featured dish"
                productId={1}
                category="burgers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </motion.div>

            {/* Floating card 1 — delivery time */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.8,
              }}
              className="absolute -left-10 top-12 card px-4 py-3 flex items-center gap-3 shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <Truck className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  Delivery time
                </p>
                <p className="text-[14px] font-semibold text-gray-900 dark:text-white">
                  ~28 min
                </p>
              </div>
            </motion.div>

            {/* Floating card 2 — rating */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5.5,
                ease: "easeInOut",
                delay: 0.4,
              }}
              className="absolute -right-8 bottom-20 card px-4 py-3 flex items-center gap-3 shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  Avg rating
                </p>
                <p className="text-[14px] font-semibold text-gray-900 dark:text-white">
                  4.8 / 5.0
                </p>
              </div>
            </motion.div>

            {/* Floating card 3 — orders */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: 1.2,
              }}
              className="absolute -right-4 top-0 card px-4 py-3 flex items-center gap-3 shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FF5722]/10 flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-[#FF5722]" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  Orders today
                </p>
                <p className="text-[14px] font-semibold text-gray-900 dark:text-white">
                  12,400+
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ TICKER ═══════════════════════════════════════ */}
      <Ticker />

      {/* ══ HOW IT WORKS ══════════════════════════════════ */}
      <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps to your table"
            subtitle="Getting great food delivered shouldn't be complicated."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {STEPS.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} custom={i}>
                <div className="card p-8 h-full group hover:border-[#FF5722]/20 transition-colors duration-300">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF5722]/10 group-hover:bg-[#FF5722]/16 flex items-center justify-center transition-colors">
                      <step.icon className="w-6 h-6 text-[#FF5722]" />
                    </div>
                    <span className="absolute top-0 right-0 w-7 h-7 rounded-full grad-bg text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl tracking-[-0.02em] text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[15px]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ PROMOTIONS ════════════════════════════════════ */}
      {promotions?.length > 0 && (
        <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-12 bg-black/[0.02] dark:bg-white/[0.015]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Limited time"
              title="Today's deals"
              subtitle="Exclusive promo codes — tap to copy, use at checkout."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {promotions.map((promo, i) => (
                <motion.article
                  key={promo.id}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -5 }}
                  className="card overflow-hidden group"
                >
                  <div className="relative overflow-hidden aspect-[16/7]">
                    <FoodImage
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {promo.discount > 0 && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full grad-bg text-white text-[11px] font-bold shadow-sm">
                        {promo.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-[15px] text-gray-900 dark:text-white mb-1.5">
                      {promo.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                      {promo.description}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => copyPromoCode(promo.code)}
                        className="font-mono text-[13px] font-bold text-[#FF5722] bg-[#FF5722]/10 hover:bg-[#FF5722]/18 px-3.5 py-2 rounded-xl transition-colors"
                      >
                        {promo.code}
                      </button>
                      <Link to="/menu">
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="h-9 px-4 rounded-xl grad-bg text-white text-[13px] font-semibold btn-glow transition-shadow"
                        >
                          Redeem
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ══ CATEGORIES ════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Explore"
            title="What are you craving?"
            subtitle="Jump straight into your favourite category."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((cat, i) => (
              <motion.div key={cat.id} variants={fadeUp} custom={i}>
                <Link to="/menu">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="card flex flex-col items-center gap-4 p-6 group cursor-pointer hover:border-[#FF5722]/20 hover:shadow-md transition-all duration-300"
                  >
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </span>
                    <p className="font-medium text-[13px] text-center text-gray-700 dark:text-gray-300 group-hover:text-[#FF5722] transition-colors">
                      {cat.name}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ BESTSELLERS ══════════════════════════════════ */}
      <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-12 bg-black/[0.02] dark:bg-white/[0.015]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <EyebrowTag>Fan favourites</EyebrowTag>
              <h2 className="font-display text-4xl md:text-5xl tracking-[-0.025em] text-gray-900 dark:text-white mb-3">
                Bestsellers
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-[17px] max-w-xl leading-relaxed">
                The dishes our community orders again and again.
              </p>
            </motion.div>
            <Link to="/menu" className="shrink-0 self-start md:self-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-black/10 dark:border-white/15 bg-[var(--card)] text-[var(--ink)] text-[14px] font-semibold hover:opacity-90 transition-opacity"
              >
                View full menu
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} variants={fadeUp} custom={i}>
                <FoodCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════ */}
      <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF5722]/8 blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionHeader
            eyebrow="Community"
            title="Loved by foodies"
            subtitle="Real stories from people who order with FlavorRush every week."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="card p-8 relative"
              >
                {/* Big quote mark */}
                <span
                  className="absolute top-5 right-7 text-[72px] leading-none select-none text-[#FF5722]/10 font-display"
                  aria-hidden
                >
                  "
                </span>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array(t.rating)
                    .fill(0)
                    .map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-amber-500 fill-amber-500"
                      />
                    ))}
                </div>

                <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
                  {t.text}
                </p>

                <footer className="flex items-center gap-3.5">
                  <FoodImage
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FF5722]/20"
                    fallback={FOOD_IMAGES.avatar1}
                  />
                  <div>
                    <cite className="not-italic font-semibold text-[14px] text-gray-900 dark:text-white block">
                      {t.name}
                    </cite>
                    <span className="text-[12px] text-gray-400 dark:text-gray-500">
                      {t.role}
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto relative rounded-[2rem] overflow-hidden"
        >
          {/* Gradient bg */}
          <div className="absolute inset-0 grad-bg opacity-95" />
          {/* Soft blobs */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-300/20 blur-3xl" />
          {/* Noise */}
          <div
            className="absolute inset-0 noise"
            style={{ borderRadius: "2rem" }}
          />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center text-white">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 mb-8">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-[-0.025em] mb-4">
              Ready for your next meal?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto leading-relaxed">
              Join 50,000+ people who get restaurant-quality food delivered in
              under 30 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 h-12 px-8 rounded-2xl bg-white text-[#FF5722] text-[15px] font-bold shadow-xl hover:bg-white/95 transition-colors"
                >
                  Start ordering
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 h-12 px-8 rounded-2xl bg-white/15 text-white text-[15px] font-semibold border border-white/25 hover:bg-white/20 transition-colors"
                >
                  Create free account
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
