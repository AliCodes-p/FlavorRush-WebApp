export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price)
}

export const calculateDiscount = (originalPrice, discountedPrice) => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/
  return re.test(phone.replace(/\D/g, ''))
}

export const generateOrderId = () => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

export const calculateDeliveryTime = (prepTime = 15, distance = 5) => {
  const prepMinutes = parseInt(prepTime)
  const deliveryMinutes = Math.ceil(distance * 2)
  return prepMinutes + deliveryMinutes
}

export const getSpiceEmoji = (level) => {
  const emojis = ['🟩', '🟨', '🟧', '🟥', '🌶️']
  return Array(level).fill(0).map((_, i) => emojis[Math.min(i, 4)]).join('')
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const debounce = (func, delay) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
