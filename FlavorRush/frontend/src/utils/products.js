import { dummyProducts } from "../data/dummyData";

export function normalizeProduct(product = {}) {
  const reviewItems = Array.isArray(product.reviews) ? product.reviews : [];

  return {
    ...product,
    id: product.id ?? product._id ?? product.productId ?? null,
    _id: product._id ?? product.id ?? null,
    name: product.name || "FlavorRush Item",
    category: product.category || "uncategorized",
    price: Number(product.price ?? 0),
    image: product.image || "",
    description: product.description || "",
    rating: Number(product.rating ?? 0),
    reviews: reviewItems.length,
    reviewItems,
    ingredients: Array.isArray(product.ingredients) ? product.ingredients : [],
    nutrition: product.nutrition || {},
    prepTime: product.prepTime || "15 mins",
    isSpicy: Boolean(product.isSpicy),
    spiceLevel: Number(product.spiceLevel ?? 0),
    bestseller: Boolean(product.bestseller),
  };
}

/** Resolve product by route param (string or number id). */
export function getProductById(id) {
  if (id == null || id === "") return undefined;
  const numericId = Number(id);
  if (!Number.isNaN(numericId)) {
    const byNumber = dummyProducts.find((p) => p.id === numericId);
    if (byNumber) return byNumber;
  }
  return dummyProducts.find((p) => String(p.id) === String(id));
}

export function getAllProducts() {
  return dummyProducts;
}
