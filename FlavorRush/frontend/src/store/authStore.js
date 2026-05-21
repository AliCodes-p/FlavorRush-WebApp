import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (userData, authToken) => {
        set({
          user: userData,
          token: authToken,
          isAuthenticated: true
        })
      },
      
      signup: (userData, authToken) => {
        set({
          user: userData,
          token: authToken,
          isAuthenticated: true
        })
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })
      },
      
      updateProfile: (userData) => {
        set({
          user: { ...userData }
        })
      },
      
      setUser: (userData) => {
        set({
          user: userData,
          isAuthenticated: !!userData
        })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated })
    }
  )
)
