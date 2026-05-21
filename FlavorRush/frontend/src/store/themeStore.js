import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  isDark: false,
  
  toggleTheme: () => {
    set((state) => {
      const newDark = !state.isDark
      localStorage.setItem('theme', newDark ? 'dark' : 'light')
      return { isDark: newDark }
    })
  },
  
  setTheme: (isDark) => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    set({ isDark })
  },
  
  initTheme: () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark
    set({ isDark })
  }
}))
