import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

const setStoredToken = (token) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
};

const buildPath = (path) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.replace(/\/+$/, "") || "/";
};

const getErrorMessage = (error) => {
  const data = error?.response?.data;
  if (typeof data?.error === "string") return data.error;
  if (typeof data?.message === "string") return data.message;
  if (error?.response?.status === 308) {
    return "API route mismatch (redirect). Contact support.";
  }
  if (error?.message) return error.message;
  return "Request failed";
};

api.interceptors.request.use((config) => {
  if (config.url) {
    config.url = buildPath(config.url);
  }

  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      setStoredToken(null);
    }
    error.userMessage = getErrorMessage(error);
    return Promise.reject(error);
  },
);

export { getStoredToken, setStoredToken, getErrorMessage };

export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  signup: (userData) => api.post("/auth/signup", userData),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (userData) => api.put("/auth/profile", userData),
};

export const productsAPI = {
  getAll: (filters) => api.get("/products", { params: filters }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get("/products/search", { params: { q: query } }),
};

export const cartAPI = {
  getCart: () => api.get("/cart"),
  addItem: (productId, quantity, customizations) =>
    api.post("/cart/add", { productId, quantity, customizations }),
  updateItem: (itemId, quantity) =>
    api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clearCart: () => api.delete("/cart"),
};

export const ordersAPI = {
  create: (orderData) => api.post("/orders", orderData),
  getAll: () => api.get("/orders"),
  getById: (id) => api.get(`/orders/${id}`),
  track: (id) => api.get(`/orders/${id}/track`),
  cancel: (id) => api.post(`/orders/${id}/cancel`),
};

export const paymentsAPI = {
  createPaymentIntent: (amount) => api.post("/payments/intent", { amount }),
  confirmPayment: (paymentId, paymentMethodId) =>
    api.post("/payments/confirm", { paymentId, paymentMethodId }),
};

export const addressesAPI = {
  getAll: () => api.get("/addresses"),
  create: (addressData) => api.post("/addresses", addressData),
  update: (id, addressData) => api.put(`/addresses/${id}`, addressData),
  delete: (id) => api.delete(`/addresses/${id}`),
  setDefault: (id) => api.post(`/addresses/${id}/default`),
};

export const favoritesAPI = {
  getAll: () => api.get("/favorites"),
  add: (productId) => api.post("/favorites", { productId }),
  remove: (productId) => api.delete(`/favorites/${productId}`),
  isFavorite: (productId) => api.get(`/favorites/${productId}/check`),
};

export const reviewsAPI = {
  create: (productId, reviewData) =>
    api.post(`/products/${productId}/reviews`, reviewData),
  getByProduct: (productId) => api.get(`/products/${productId}/reviews`),
};

export default api;
