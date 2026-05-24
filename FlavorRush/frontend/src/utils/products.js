import { dummyProducts } from '../data/dummyData'

/** Resolve product by route param (string or number id). */
export function getProductById(id) {
  if (id == null || id === '') return undefined
  const numericId = Number(id)
  if (!Number.isNaN(numericId)) {
    const byNumber = dummyProducts.find((p) => p.id === numericId)
    if (byNumber) return byNumber
  }
  return dummyProducts.find((p) => String(p.id) === String(id))
}

export function getAllProducts() {
  return dummyProducts
}
