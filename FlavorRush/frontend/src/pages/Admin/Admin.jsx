import { motion } from 'framer-motion'
import Button from '../../components/Common/Button'
import { Link } from 'react-router-dom'

export const Admin = () => {
  const stats = [
    { label: 'Total Orders', value: '2,450', icon: '📦', color: 'primary' },
    { label: 'Revenue', value: '₹8,45,000', icon: '💰', color: 'success' },
    { label: 'Active Users', value: '1,234', icon: '👥', color: 'secondary' },
    { label: 'Delivery Rate', value: '98.5%', icon: '✓', color: 'warning' },
  ]

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold">🛠️ Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your FlavorRush platform</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
            >
              <p className="text-4xl mb-3">{stat.icon}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <th className="text-left py-2">Order ID</th>
                      <th className="text-left py-2">Customer</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['ORD-001', 'ORD-002', 'ORD-003'].map((id) => (
                      <tr key={id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 font-semibold">{id}</td>
                        <td>Customer {id}</td>
                        <td className="text-primary font-bold">₹599</td>
                        <td><span className="px-3 py-1 bg-success bg-opacity-20 text-success rounded-full text-xs">Delivered</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Products Management */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Products</h2>
                <Button size="sm">+ Add Product</Button>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total Products: 45</p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md space-y-3">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <Button size="full" variant="primary">📊 View Analytics</Button>
              <Button size="full" variant="secondary">👥 Manage Users</Button>
              <Button size="full" variant="outline">🏪 Manage Restaurants</Button>
              <Button size="full" variant="outline">📝 Manage Orders</Button>
            </div>

            {/* System Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">System Status</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>API Server</span>
                  <span className="text-success font-bold">🟢 Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Database</span>
                  <span className="text-success font-bold">🟢 Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Gateway</span>
                  <span className="text-success font-bold">🟢 Online</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Admin
