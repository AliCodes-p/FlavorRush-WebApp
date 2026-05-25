import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../components/Common/Button";
import { getErrorMessage, ordersAPI } from "../utils/api";
import { formatPrice } from "../utils/helpers";

const STATUS_STEPS = {
  pending: 1,
  preparing: 2,
  ready: 3,
  out_for_delivery: 4,
  delivered: 5,
};

const STATUS_LABELS = [
  { id: 1, status: "pending", label: "Order Confirmed", icon: "✓" },
  { id: 2, status: "preparing", label: "Preparing", icon: "👨‍🍳" },
  { id: 3, status: "ready", label: "Ready for Delivery", icon: "📦" },
  { id: 4, status: "out_for_delivery", label: "Out for Delivery", icon: "🚗" },
  { id: 5, status: "delivered", label: "Delivered", icon: "✓" },
];

export const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eta, setEta] = useState(25);

  useEffect(() => {
    let mounted = true;

    const loadOrder = async () => {
      setLoading(true);
      setError("");

      try {
        const [orderResponse, trackResponse] = await Promise.all([
          ordersAPI.getById(orderId),
          ordersAPI.track(orderId),
        ]);

        if (mounted) {
          setOrder(orderResponse.data);
          setTracking(trackResponse.data);

          const estimated = orderResponse.data?.estimatedDeliveryTime;
          if (estimated) {
            const diff = Math.max(
              0,
              Math.ceil((new Date(estimated) - new Date()) / 60000),
            );
            setEta(diff);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(getErrorMessage(err) || "Unable to load your order.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadOrder();
    const interval = setInterval(loadOrder, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [orderId]);

  const currentStatus = STATUS_STEPS[tracking?.status] || STATUS_STEPS.pending;

  if (loading) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8 pb-20 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading your order…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8 pb-20 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const delivery = order?.deliveryAddress || {};

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">🚗 Track Your Order</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Order ID: {order?.orderId || orderId}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-8">Order Status</h2>

            <div className="space-y-8">
              {STATUS_LABELS.map((status, idx) => (
                <motion.div
                  key={status.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      animate={{
                        scale: currentStatus >= status.id ? 1.2 : 1,
                        backgroundColor:
                          currentStatus >= status.id ? "#FF6B35" : "#E0E0E0",
                      }}
                      className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg transition-all"
                    >
                      {status.icon}
                    </motion.div>

                    <div className="flex-1 pt-2">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`font-bold text-lg mb-1 ${
                          currentStatus >= status.id
                            ? "text-primary"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {status.label}
                      </motion.h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {currentStatus > status.id ? (
                          <span className="text-success font-semibold">
                            ✓ Completed
                          </span>
                        ) : currentStatus === status.id ? (
                          <span className="text-primary font-semibold">
                            ⏳ In Progress
                          </span>
                        ) : (
                          <span>Pending</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {idx < STATUS_LABELS.length - 1 && (
                    <div className="absolute left-7 top-14 w-0.5 h-12 bg-gray-300 dark:bg-gray-700" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-primary text-white rounded-xl p-6 shadow-lg"
            >
              <p className="text-sm opacity-90 mb-2">Estimated Delivery</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold">{Math.ceil(eta)}</span>
                <span className="text-lg">mins</span>
              </div>
              <p className="text-sm opacity-90">Getting there soon! 🚀</p>
            </motion.div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold mb-4">👨‍💼 Delivery Partner</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Name
                  </p>
                  <p className="font-semibold">
                    {tracking?.deliveryPartner?.name || "Rajesh Kumar"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vehicle
                  </p>
                  <p className="font-semibold">
                    {tracking?.deliveryPartner?.vehicle ||
                      "Bike • DL-01 AB 1234"}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="primary" className="flex-1">
                    📞 Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    💬 Chat
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold mb-4">📦 Order Details</h3>
              <div className="space-y-2 text-sm">
                {(order?.items || []).map((item) => (
                  <div
                    key={`${item.productId}-${item.quantity}`}
                    className="flex justify-between gap-3"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.name || item.productId} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(
                        Number(item.price || 0) * Number(item.quantity || 1),
                      )}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatPrice(Number(order?.total || 0))}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-bold mb-3">📍 Delivery Address</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {delivery.fullName || "Customer"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {delivery.address || "Address pending"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {delivery.city || ""} {delivery.state || ""}{" "}
                {delivery.zipCode || ""}
              </p>
            </div>

            <Button size="full" variant="outline">
              🤝 Need Help?
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-96"
        >
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-2">🗺️</p>
              <p className="text-gray-600 dark:text-gray-400">
                Live Map Coming Soon
              </p>
              <p className="text-sm text-gray-500">
                Your order is being tracked in real-time
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTracking;
