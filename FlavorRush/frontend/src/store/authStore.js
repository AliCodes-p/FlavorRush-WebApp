import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authAPI, getStoredToken, setStoredToken } from "../utils/api";
import { useCartStore } from "./cartStore";

const normalizeUser = (userData = {}) => ({
  id: userData.id || userData._id || null,
  name: userData.name || userData.fullName || "",
  email: userData.email || "",
  phone: userData.phone || "",
  profilePicture: userData.profilePicture || null,
});

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrating: true,
      redirectTo: null,

      login: async (credentials) => {
        const response = await authAPI.login(
          credentials.email,
          credentials.password,
        );
        const { token, user } = response.data;

        setStoredToken(token);
        set({
          user: normalizeUser(user),
          token,
          isAuthenticated: true,
          isHydrating: false,
        });

        try {
          await useCartStore.getState().mergeLocalCartToBackend();
          await useCartStore.getState().syncWithBackend();
        } catch {
          // Cart sync is non-blocking after login
        }

        return response.data;
      },

      signup: async (userData) => {
        const response = await authAPI.signup(userData);
        const { token, user } = response.data;

        setStoredToken(token);
        set({
          user: normalizeUser(user),
          token,
          isAuthenticated: true,
          isHydrating: false,
        });

        try {
          await useCartStore.getState().mergeLocalCartToBackend();
          await useCartStore.getState().syncWithBackend();
        } catch {
          // Cart sync is non-blocking after signup
        }

        return response.data;
      },

      bootstrapAuth: async () => {
        const persistedToken = get().token;
        const token = getStoredToken() || persistedToken;

        if (!token) {
          set({
            isHydrating: false,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return null;
        }

        setStoredToken(token);

        try {
          const response = await authAPI.getProfile();
          set({
            user: normalizeUser(response.data),
            token,
            isAuthenticated: true,
            isHydrating: false,
          });

          try {
            await useCartStore.getState().syncWithBackend();
          } catch {
            // Cart sync failures should not log the user out
          }

          return response.data;
        } catch {
          setStoredToken(null);
          useCartStore.getState().replaceItems([]);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isHydrating: false,
          });
          return null;
        }
      },

      logout: () => {
        setStoredToken(null);
        useCartStore.getState().replaceItems([]);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isHydrating: false,
          redirectTo: null,
        });
      },

      updateProfile: async (userData) => {
        const response = await authAPI.updateProfile(userData);
        const updatedUser = normalizeUser(response.data);

        set({ user: updatedUser });
        return updatedUser;
      },

      setUser: (userData) => {
        set({
          user: normalizeUser(userData),
          isAuthenticated: !!userData,
        });
      },

      setRedirectTo: (path) => {
        const authPages = ["/login", "/signup", "/admin"];
        if (!authPages.includes(path)) {
          set({ redirectTo: path });
        }
      },

      getRedirectPath: () => get().redirectTo || "/",

      clearRedirectTo: () => set({ redirectTo: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        redirectTo: state.redirectTo,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          setStoredToken(state.token);
        }
      },
    },
  ),
);
