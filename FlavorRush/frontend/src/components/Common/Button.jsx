import { motion } from 'framer-motion'

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:scale-105',
    secondary: 'bg-gradient-secondary text-white hover:shadow-lg hover:scale-105',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary hover:bg-opacity-10',
    danger: 'bg-danger text-white hover:shadow-lg hover:scale-105',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    full: 'px-6 py-3 w-full text-base',
  }
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {loading && <span className="animate-spin">⏳</span>}
      {children}
    </motion.button>
  )
}

export default Button
