import { motion } from 'framer-motion'

export const Badge = ({ 
  children, 
  variant = 'primary',
  className = ''
}) => {
  const variants = {
    primary: 'bg-primary bg-opacity-20 text-primary',
    success: 'bg-success bg-opacity-20 text-success',
    warning: 'bg-warning bg-opacity-20 text-warning',
    danger: 'bg-danger bg-opacity-20 text-danger',
  }

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  )
}

export default Badge
