import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/Common/Button";
import Input from "../components/Common/Input";
import { useAuthStore } from "../store/authStore";
import { getErrorMessage, ordersAPI } from "../utils/api";
import { formatPrice } from "../utils/helpers";

export const Dashboard = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;

    let mounted = true;

    const loadOrders = async () => {
      setOrdersLoading(true);
      setOrdersError("");

      try {
        const response = await ordersAPI.getAll();
        const payload = response.data;
        const orderList = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.orders)
            ? payload.orders
            : [];

        if (mounted) {
          setOrders(orderList);
        }
      } catch (error) {
        if (mounted) {
          setOrdersError(
            getErrorMessage(error) || "Unable to load your orders.",
          );
        }
      } finally {
        if (mounted) {
          setOrdersLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editData);
      setEditMode(false);
      toast.success("Profile updated!");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Profile update failed.");
    }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold">👤 My Account</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.name}!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all shadow-lg"
          >
            🚪 Logout
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md sticky top-24">
              <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
                <div className="text-6xl mb-3">👤</div>
                <p className="font-bold text-lg">{user?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>

              <nav className="p-4 space-y-2">
                {[
                  { id: "orders", label: "📦 My Orders" },
                  { id: "addresses", label: "📍 Addresses" },
                  { id: "favorites", label: "❤️ Favorites" },
                  { id: "profile", label: "⚙️ Profile" },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === item.id
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {activeTab === "orders" && (
              <motion.div
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold mb-6">📦 Your Orders</h2>

                {ordersLoading ? (
                  <p className="text-gray-500">Loading your past orders…</p>
                ) : ordersError ? (
                  <p className="text-red-500">{ordersError}</p>
                ) : orders.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      No orders found yet.
                    </p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <motion.div
                      key={order.id || order.orderId}
                      variants={itemVariant}
                      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Order ID
                          </p>
                          <p className="font-bold">
                            {order.orderId || order.id}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Date
                          </p>
                          <p className="font-bold">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Items
                          </p>
                          <p className="font-bold text-sm">
                            {(order.items || [])
                              .map((item) => item.name || item.productId)
                              .join(", ")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Total
                          </p>
                          <p className="font-bold text-primary">
                            {formatPrice(Number(order.total || 0))}
                          </p>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="px-3 py-1 bg-success bg-opacity-20 text-success rounded-full text-sm font-semibold">
                            ✓ {order.status}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(
                                `/order-tracking/${order.id || order.orderId}`,
                              )
                            }
                          >
                            Track
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                {!editMode ? (
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Full Name
                      </p>
                      <p className="text-lg font-semibold">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-lg font-semibold">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="text-lg font-semibold">
                        {user?.phone || "Not provided"}
                      </p>
                    </div>
                    <Button onClick={() => setEditMode(true)}>
                      ✏️ Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                    <Input
                      label="Phone"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                    />
                    <div className="flex gap-4">
                      <Button onClick={handleSaveProfile}>
                        💾 Save Changes
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "addresses" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">📍 Saved Addresses</h2>
                  <Button>+ Add Address</Button>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                    No addresses saved yet
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "favorites" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6">❤️ Favorite Foods</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  You haven't added any favorites yet
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
