/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#F7931E',
        dark: '#1A1A1A',
        light: '#F5F5F5',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #004E89 0%, #1B598E 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
