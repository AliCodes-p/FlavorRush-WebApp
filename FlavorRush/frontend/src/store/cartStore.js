import { create } from "zustand";
import { persist } from "zustand/middleware";

import { cartAPI, getStoredToken } from "../utils/api";

const hasAuthToken = () => Boolean(getStoredToken());

const normalizeCartItem = (item = {}, index = 0) => ({
  id: item.productId || item.id || item._id || String(index),
  productId: item.productId || item.id || item._id || String(index),
  quantity: item.quantity ?? 1,
  customizations: item.customizations || {},
  name: item.name || "FlavorRush Item",
  price: Number(item.price ?? 0),
  image: item.image || "",
  backendId: index,
});

const applyLocalAdd = (currentItems, product, quantity, customizations) => {
  const key = JSON.stringify(customizations || {});
  const productKey = product.id || product.productId || product._id;
  const existingItem = currentItems.find(
    (item) =>
      item.id === productKey &&
      JSON.stringify(item.customizations || {}) === key,
  );

  if (existingItem) {
    return currentItems.map((item) =>
      item.id === productKey &&
      JSON.stringify(item.customizations || {}) === key
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }

  return [
    ...currentItems,
    {
      id: productKey,
      productId: productKey,
      name: product.name || "FlavorRush Item",
      price: Number(product.price ?? 0),
      image: product.image || "",
      quantity,
      customizations: customizations || {},
    },
  ];
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      syncWithBackend: async () => {
        if (!hasAuthToken()) {
          return get().items;
        }

        try {
          const response = await cartAPI.getCart();
          const items = Array.isArray(response.data.items)
            ? response.data.items.map(normalizeCartItem)
            : [];
          set({ items });
          return items;
        } catch (error) {
          if (error?.response?.status === 401) {
            return get().items;
          }
          return get().items;
        }
      },

      mergeLocalCartToBackend: async () => {
        if (!hasAuthToken()) {
          return get().items;
        }

        const localItems = get().items;
        if (!localItems.length) {
          return get().syncWithBackend();
        }

        try {
          for (const item of localItems) {
            await cartAPI.addItem(
              item.productId || item.id,
              item.quantity ?? 1,
              item.customizations || {},
            );
          }
          return get().syncWithBackend();
        } catch {
          return get().items;
        }
      },

      replaceItems: (items) => set({ items }),

      addToCart: async (product, quantity = 1, customizations = {}) => {
        const currentItems = get().items;
        const localItems = applyLocalAdd(
          currentItems,
          product,
          quantity,
          customizations,
        );

        if (!hasAuthToken()) {
          set({ items: localItems });
          return localItems;
        }

        try {
          await cartAPI.addItem(
            product.id || product.productId || product._id,
            quantity,
            customizations,
          );
          const items = await get().syncWithBackend();
          return items;
        } catch (error) {
          if (error?.response?.status === 401) {
            set({ items: localItems });
            return localItems;
          }
          throw error;
        }
      },

      removeFromCart: async (productId, customizations) => {
        const currentItems = get().items;
        const key = JSON.stringify(customizations || {});
        const match = currentItems.find(
          (item) =>
            item.id === productId &&
            JSON.stringify(item.customizations || {}) === key,
        );

        if (!hasAuthToken() || match?.backendId === undefined) {
          set({
            items: currentItems.filter(
              (item) =>
                !(
                  item.id === productId &&
                  JSON.stringify(item.customizations || {}) === key
                ),
            ),
          });
          return get().items;
        }

        await cartAPI.removeItem(match.backendId);
        return get().syncWithBackend();
      },

      updateQuantity: async (productId, customizations, quantity) => {
        const currentItems = get().items;
        const key = JSON.stringify(customizations || {});
        const match = currentItems.find(
          (item) =>
            item.id === productId &&
            JSON.stringify(item.customizations || {}) === key,
        );

        if (!hasAuthToken() || match?.backendId === undefined) {
          if (quantity === 0) {
            set({
              items: currentItems.filter(
                (item) =>
                  !(
                    item.id === productId &&
                    JSON.stringify(item.customizations || {}) === key
                  ),
              ),
            });
          } else {
            set({
              items: currentItems.map((item) =>
                item.id === productId &&
                JSON.stringify(item.customizations || {}) === key
                  ? { ...item, quantity }
                  : item,
              ),
            });
          }
          return get().items;
        }

        if (quantity === 0) {
          await cartAPI.removeItem(match.backendId);
        } else {
          await cartAPI.updateItem(match.backendId, quantity);
        }

        return get().syncWithBackend();
      },

      clearCart: async () => {
        if (!hasAuthToken()) {
          set({ items: [] });
          return [];
        }

        try {
          await cartAPI.clearCart();
          set({ items: [] });
          return [];
        } catch (error) {
          if (error?.response?.status === 401) {
            set({ items: [] });
            return [];
          }
          throw error;
        }
      },

      getTotal: () =>
        get().items.reduce(
          (total, item) =>
            total + Number(item.price || 0) * Number(item.quantity || 0),
          0,
        ),

      getTotalItems: () =>
        get().items.reduce(
          (total, item) => total + Number(item.quantity || 0),
          0,
        ),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
