import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product, quantity = 1, customizations = {}) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id && JSON.stringify(item.customizations) === JSON.stringify(customizations))
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id && JSON.stringify(item.customizations) === JSON.stringify(customizations)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, { ...product, quantity, customizations }]
          })
        }
      },
      
      removeFromCart: (productId, customizations) => {
        set({
          items: get().items.filter(item =>
            !(item.id === productId && JSON.stringify(item.customizations) === JSON.stringify(customizations))
          )
        })
      },
      
      updateQuantity: (productId, customizations, quantity) => {
        if (quantity === 0) {
          set({
            items: get().items.filter(item =>
              !(item.id === productId && JSON.stringify(item.customizations) === JSON.stringify(customizations))
            )
          })
        } else {
          set({
            items: get().items.map(item =>
              item.id === productId && JSON.stringify(item.customizations) === JSON.stringify(customizations)
                ? { ...item, quantity }
                : item
            )
          })
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)
