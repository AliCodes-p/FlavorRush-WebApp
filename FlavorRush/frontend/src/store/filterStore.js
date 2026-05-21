import { create } from 'zustand'

export const useFilterStore = create((set) => ({
  searchQuery: '',
  selectedCategory: null,
  sortBy: 'popular',
  priceRange: [0, 500],
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setPriceRange: (range) => set({ priceRange: range }),
  
  resetFilters: () => set({
    searchQuery: '',
    selectedCategory: null,
    sortBy: 'popular',
    priceRange: [0, 500]
  })
}))
