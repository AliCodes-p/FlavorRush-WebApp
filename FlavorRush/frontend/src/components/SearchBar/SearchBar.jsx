import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFilterStore } from '../../store/filterStore'

export const SearchBar = ({ onSearch }) => {
  const { searchQuery, setSearchQuery } = useFilterStore()
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch?.(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex items-center ${isFocused ? 'ring-2 ring-primary' : ''} bg-white dark:bg-gray-800 rounded-full transition-all px-4 py-3`}
    >
      <span className="text-gray-400 mr-3 text-xl">🔍</span>
      <input
        type="text"
        placeholder="Search for food, restaurants..."
        value={searchQuery}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 bg-transparent dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
      />
      {searchQuery && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setSearchQuery('')
            onSearch?.('')
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2"
        >
          ✕
        </motion.button>
      )}
    </motion.div>
  )
}

export default SearchBar
