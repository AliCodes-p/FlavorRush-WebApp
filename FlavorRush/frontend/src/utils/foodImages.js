/**
 * Product images — URLs verified with HTTP 200 (May 2026).
 * Mix of Unsplash + Pexels for reliability; each id matches the dish name.
 */

const pexels = (id, w = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${w}&dpr=1`

const unsplash = (slug, w = 600) =>
  `https://images.unsplash.com/photo-${slug}?auto=format&fit=crop&w=${w}&h=${w}&q=80`

/** Local images (bundled in /public — always load reliably) */
const local = (filename) => `/images/products/${filename}`

/** Primary image per menu item (id 1–12) */
export const PRODUCT_IMAGES = {
  1: unsplash('1568901346375-23c9450c58cd'), // Crispy Chicken Burger
  2: pexels(70497), // Classic Cheeseburger
  3: pexels(1059943), // Spicy Chicken Wings
  4: pexels(1583884), // Cheese Fries
  5: pexels(1639562), // Grilled Chicken Sandwich
  6: unsplash('1513104890138-7c749659a591'), // Double Layered Pizza
  7: pexels(1893556), // Masala Fries
  8: pexels(825661), // Veggie Supreme Pizza
  9: local('loaded-nachos.png'), // Loaded Nachos
  10: local('chicken-kebab.png'), // Chicken Kebab
  11: local('chocolate-lava-cake.png'), // Chocolate Lava Cake
  12: local('strawberry-cheesecake.png'), // Strawberry Cheesecake
}

/** Backup URLs if primary fails (tried in order) */
export const PRODUCT_IMAGE_FALLBACKS = {
  1: [pexels(1199957), pexels(70497)],
  2: [unsplash('1568901346375-23c9450c58cd'), pexels(1199957)],
  3: [pexels(60616), pexels(2338407)],
  4: [pexels(1893556), pexels(1583884)],
  5: [pexels(1267320), pexels(1639562)],
  6: [pexels(1146760), pexels(2619970)],
  7: [pexels(1583884), pexels(1893556)],
  8: [pexels(1146760), unsplash('1513104890138-7c749659a591')],
  9: [local('loaded-nachos.png')],
  10: [local('chicken-kebab.png')],
  11: [local('chocolate-lava-cake.png')],
  12: [local('strawberry-cheesecake.png')],
}

export const FALLBACK_FOOD_IMAGE = PRODUCT_IMAGES[1]

export const getProductImage = (productId, category = '') => {
  if (PRODUCT_IMAGES[productId]) return PRODUCT_IMAGES[productId]
  const byCategory = {
    burgers: PRODUCT_IMAGES[1],
    pizza: PRODUCT_IMAGES[6],
    sandwiches: PRODUCT_IMAGES[5],
    starters: PRODUCT_IMAGES[3],
    sides: PRODUCT_IMAGES[4],
    desserts: PRODUCT_IMAGES[11],
  }
  return byCategory[category] || FALLBACK_FOOD_IMAGE
}

/** All URLs to try for a product (primary + backups) */
export const getProductImageChain = (productId, category = '') => {
  const primary = getProductImage(productId, category)
  const backups = PRODUCT_IMAGE_FALLBACKS[productId] || []
  return [...new Set([primary, ...backups, FALLBACK_FOOD_IMAGE])]
}

export const FOOD_IMAGES = {
  hero: PRODUCT_IMAGES[1],
  promoDessert: local('chocolate-lava-cake.png'),
  promoBurger: PRODUCT_IMAGES[1],
  promoCheeseburger: PRODUCT_IMAGES[2],
  avatar1:
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
  avatar2:
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
  avatar3:
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
}
