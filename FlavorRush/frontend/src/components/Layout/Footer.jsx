import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Press']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'Feedback', 'FAQs']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy']
    },
    {
      title: 'Download App',
      links: ['iOS App', 'Android App', 'Web App']
    }
  ]

  return (
    <footer className="bg-gradient-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🚀</span>
              <span className="font-heading text-2xl font-bold">FlavorRush</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Fast, fresh, and delicious food delivery at your doorstep.
            </p>
            <div className="flex gap-3 text-xl">
              <motion.a href="#" whileHover={{ scale: 1.2 }}>📘</motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }}>🐦</motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }}>📷</motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }}>▶️</motion.a>
            </div>
          </motion.div>

          {/* Links Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: '#FF6B35' }}
                      className="text-gray-400 text-sm transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} FlavorRush. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
            >
              🌍 English
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
            >
              ₹ INR
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
