import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Flame, Star } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Button from "../components/Common/Button";
import FoodImage from "../components/Common/FoodImage";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { productsAPI, reviewsAPI } from "../utils/api";
import { formatPrice, getSpiceEmoji } from "../utils/helpers";
import { normalizeProduct } from "../utils/products";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const loadProduct = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const [productResponse, reviewResponse] = await Promise.all([
          productsAPI.getById(id),
          reviewsAPI.getByProduct(id).catch(() => ({ data: [] })),
        ]);

        if (mounted) {
          setProduct(normalizeProduct(productResponse.data));
          setReviews(
            Array.isArray(reviewResponse.data) ? reviewResponse.data : [],
          );
        }
      } catch (error) {
        if (mounted) {
          setProduct(null);
          setNotFound(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    await addToCart(product, quantity, selectedCustomizations);
    toast.success(`${product.name} added to cart!`);
  };

  const handleSubmitReview = async () => {
    if (!product) return;

    if (!isAuthenticated) {
      toast.error("Please login to leave a review.");
      return;
    }

    if (!userRating) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please add a short comment.");
      return;
    }

    setIsSubmittingReview(true);

    try {
      const response = await reviewsAPI.create(product.id, {
        rating: userRating,
        comment: reviewText.trim(),
      });

      const review = response.data;
      setReviews((current) => [review, ...current]);
      setProduct((current) =>
        current
          ? {
              ...current,
              reviews: (current.reviews || 0) + 1,
              reviewItems: [review, ...(current.reviewItems || [])],
            }
          : current,
      );
      setReviewText("");
      setUserRating(0);
      toast.success("Review posted successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Unable to post your review right now.",
      );
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const customizationOptions = {
    size: ["Small", "Medium", "Large"],
    cheese: [
      { label: "No Cheese", value: 0 },
      { label: "Single", value: 50 },
      { label: "Double", value: 100 },
    ],
    sauce: ["Mayo", "Mustard", "BBQ", "Mix"],
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#FF5722] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Loading dish details…
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] pt-28 pb-16 px-4 flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-semibold mb-2">Dish not found</p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          We couldn&apos;t find a menu item with that ID.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl grad-bg text-white font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] pt-24 md:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <Link
            to="/menu"
            className="hover:text-[#FF5722] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Menu
          </Link>
          <span>/</span>
          <span className="text-[#FF5722] font-semibold">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="card overflow-hidden sticky top-28">
              <FoodImage
                src={product.image}
                alt={product.name}
                productId={product.id}
                category={product.category}
                className="w-full aspect-square md:aspect-[4/5] object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                {product.bestseller && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                    Bestseller
                  </span>
                )}
                {product.isSpicy && (
                  <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    Spicy
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 capitalize">
                {product.category}
              </p>
              <h1 className="font-display text-4xl md:text-5xl tracking-[-0.03em] text-gray-900 dark:text-white mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-black/8 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-2xl font-bold">{product.rating}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {product.reviews} reviews
              </p>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                {product.prepTime}
              </span>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                Ingredients
              </h2>
              <div className="flex flex-wrap gap-2">
                {(product.ingredients || []).map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h2 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                Nutrition (per serving)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(product.nutrition || {}).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs uppercase text-gray-400 dark:text-gray-500 capitalize">
                      {key}
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {product.isSpicy && (
              <div>
                <h2 className="font-semibold text-lg mb-2">Spice level</h2>
                <p className="text-lg">
                  {getSpiceEmoji(product.spiceLevel)}{" "}
                  <span className="text-gray-500">
                    ({product.spiceLevel}/5)
                  </span>
                </p>
              </div>
            )}

            <div className="card p-5 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                Customize your order
              </h2>
              {Object.entries(customizationOptions).map(([key, options]) => (
                <div key={key}>
                  <label className="block font-medium mb-2 capitalize text-gray-700 dark:text-gray-300">
                    {key}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {options.map((option, idx) => {
                      const value =
                        typeof option === "string" ? option : option.label;
                      const selected = selectedCustomizations[key] === value;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setSelectedCustomizations((prev) => ({
                              ...prev,
                              [key]: value,
                            }))
                          }
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                            selected
                              ? "grad-bg text-white"
                              : "border border-black/10 dark:border-white/15 bg-[var(--card)] text-[var(--ink)]"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <div className="flex items-center gap-3 card px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg font-bold hover:bg-black/5 dark:hover:bg-white/10"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-lg">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg font-bold hover:bg-black/5 dark:hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl grad-bg p-5 text-white">
              <div>
                <p className="text-sm opacity-90">Total</p>
                <p className="text-3xl font-bold">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="!bg-white !text-[#FF5722] hover:!bg-gray-100 w-full sm:w-auto"
              >
                Add to cart
              </Button>
            </div>
          </motion.div>
        </div>

        <section className="card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="font-display text-2xl mb-2 text-gray-900 dark:text-white">
                Customer reviews
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Rated {product.rating} from {product.reviews} reviews.
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Real feedback from FlavorRush customers
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No reviews yet. Be the first to share your experience.
              </p>
            ) : (
              reviews.map((review, idx) => (
                <div
                  key={review._id || review.id || `${review.createdAt}-${idx}`}
                  className="rounded-2xl border border-black/8 dark:border-white/10 p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <span key={starIdx}>
                          {starIdx < Number(review.rating || 0) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "Just now"}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.comment || "No comment provided."}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-black/8 dark:border-white/10 pt-4">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  className="text-2xl"
                  aria-label={`Rate ${star} stars`}
                >
                  {star <= userRating ? "★" : "☆"}
                </button>
              ))}
            </div>
            <textarea
              placeholder="Share your experience…"
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/15 bg-[var(--card)] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[#FF5722]/40 mb-3"
            />
            <Button
              size="md"
              variant="primary"
              onClick={handleSubmitReview}
              loading={isSubmittingReview}
            >
              Submit review
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
