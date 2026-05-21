import { motion } from 'framer-motion'

export const Card = ({ 
  children, 
  className = '',
  hover = true,
  onClick = null,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: '0 20px 25px rgba(0,0,0,0.15)' } : {}}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg overflow-hidden transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
