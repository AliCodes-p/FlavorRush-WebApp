import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
}

// Products API
export const productsAPI = {
  getAll: (filters) => api.get('/products', { params: filters }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products/search', { params: { q: query } }),
}

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addItem: (productId, quantity, customizations) => 
    api.post('/cart/add', { productId, quantity, customizations }),
  updateItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clearCart: () => api.delete('/cart'),
}

// Orders API
export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  track: (id) => api.get(`/orders/${id}/track`),
  cancel: (id) => api.post(`/orders/${id}/cancel`),
}

// Payments API
export const paymentsAPI = {
  createPaymentIntent: (amount) => api.post('/payments/intent', { amount }),
  confirmPayment: (paymentId, paymentMethodId) => 
    api.post('/payments/confirm', { paymentId, paymentMethodId }),
}

// Addresses API
export const addressesAPI = {
  getAll: () => api.get('/addresses'),
  create: (addressData) => api.post('/addresses', addressData),
  update: (id, addressData) => api.put(`/addresses/${id}`, addressData),
  delete: (id) => api.delete(`/addresses/${id}`),
  setDefault: (id) => api.post(`/addresses/${id}/default`),
}

// Favorites API
export const favoritesAPI = {
  getAll: () => api.get('/favorites'),
  add: (productId) => api.post('/favorites', { productId }),
  remove: (productId) => api.delete(`/favorites/${productId}`),
  isFavorite: (productId) => api.get(`/favorites/${productId}/check`),
}

// Reviews API
export const reviewsAPI = {
  create: (productId, reviewData) => api.post(`/products/${productId}/reviews`, reviewData),
  getByProduct: (productId) => api.get(`/products/${productId}/reviews`),
}

export default api
