import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  FALLBACK_FOOD_IMAGE,
  getProductImageChain,
} from '../../utils/foodImages'

/**
 * Loads product image with a chain of fallbacks when CDN URLs fail.
 */
export const FoodImage = ({
  src,
  alt = 'Food',
  className = '',
  productId,
  category,
  fallback,
  ...props
}) => {
  const uniqueChain = useMemo(() => {
    const chain =
      productId != null
        ? getProductImageChain(productId, category)
        : [src, fallback, FALLBACK_FOOD_IMAGE].filter(Boolean)
    return [...new Set(src ? [src, ...chain] : chain)]
  }, [src, productId, category, fallback])

  const [index, setIndex] = useState(0)
  const currentSrc = uniqueChain[index] || FALLBACK_FOOD_IMAGE

  useEffect(() => {
    setIndex(0)
  }, [src, productId, category])

  const handleError = useCallback(() => {
    setIndex((i) => {
      if (i < uniqueChain.length - 1) return i + 1
      return i
    })
  }, [uniqueChain.length])

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={handleError}
      {...props}
    />
  )
}

export default FoodImage
