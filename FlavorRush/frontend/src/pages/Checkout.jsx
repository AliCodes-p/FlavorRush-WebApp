import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/Common/Button";
import Input from "../components/Common/Input";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { getErrorMessage, ordersAPI } from "../utils/api";
import { formatPrice } from "../utils/helpers";

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryType: "standard",
    paymentMethod: "card",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const validateStep = (step) => {
    const nextErrors = {};

    if (step >= 1) {
      if (!formData.fullName) nextErrors.fullName = "Name is required";
      if (!formData.phone) nextErrors.phone = "Phone is required";
      if (!formData.email) nextErrors.email = "Email is required";
    }

    if (step >= 2) {
      if (!formData.address) nextErrors.address = "Address is required";
      if (!formData.city) nextErrors.city = "City is required";
      if (!formData.zipCode) nextErrors.zipCode = "ZIP code is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) return;

    setIsProcessing(true);

    try {
      const deliveryFee =
        formData.deliveryType === "express"
          ? 80
          : formData.deliveryType === "scheduled"
            ? 30
            : 40;
      const subtotal = getTotal();
      const total =
        subtotal +
        Math.round(subtotal * 0.05) +
        (subtotal > 500 ? 0 : deliveryFee);

      const response = await ordersAPI.create({
        userId: user?.id,
        items: items.map((item) => ({
          productId: item.productId || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          customizations: item.customizations || {},
        })),
        total,
        deliveryAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          deliveryType: formData.deliveryType,
        },
        paymentMethod: formData.paymentMethod,
      });

      await clearCart();

      const placedOrder = response.data?.order;
      const trackingId = placedOrder?.id || placedOrder?.orderId;

      if (!trackingId) {
        throw new Error("Order created but tracking id missing");
      }

      toast.success("Order placed successfully!");
      navigate(`/order-tracking/${trackingId}`);
    } catch (error) {
      toast.error(
        getErrorMessage(error) || "Order placement failed. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getTotal();
  const tax = Math.round(subtotal * 0.05);
  const delivery =
    subtotal > 500
      ? 0
      : formData.deliveryType === "express"
        ? 80
        : formData.deliveryType === "scheduled"
          ? 30
          : 40;
  const total = subtotal + tax + delivery;

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          💳 Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex gap-4 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <motion.div
                  key={step}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    step <= currentStep
                      ? "bg-gradient-primary"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-md"
                >
                  <h2 className="text-2xl font-bold">
                    📋 Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      error={errors.fullName}
                      placeholder="John Doe"
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      error={errors.phone}
                      placeholder="9876543210"
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    error={errors.email}
                    placeholder="john@example.com"
                  />

                  <div className="flex justify-end">
                    <Button onClick={handleNext}>
                      Next: Delivery Address →
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-md"
                >
                  <h2 className="text-2xl font-bold">📍 Delivery Address</h2>
                  <Input
                    label="Street Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    error={errors.address}
                    placeholder="123 Main Street"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      error={errors.city}
                      placeholder="New York"
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      placeholder="NY"
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      error={errors.zipCode}
                      placeholder="10001"
                    />
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-2 text-primary font-semibold hover:text-primary hover:underline"
                    >
                      ← Back
                    </motion.button>
                    <Button onClick={handleNext}>Next: Delivery Type →</Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-md"
                >
                  <h2 className="text-2xl font-bold">🚗 Delivery & Payment</h2>

                  <div>
                    <label className="block font-semibold mb-3">
                      Select Delivery Type
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "standard",
                          label: "Standard Delivery",
                          desc: "30-45 mins",
                          price: 40,
                        },
                        {
                          id: "express",
                          label: "Express Delivery",
                          desc: "15-20 mins",
                          price: 80,
                        },
                        {
                          id: "scheduled",
                          label: "Scheduled Delivery",
                          desc: "Choose time",
                          price: 30,
                        },
                      ].map((option) => (
                        <motion.button
                          key={option.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              deliveryType: option.id,
                            })
                          }
                          className={`w-full p-4 rounded-lg border-2 transition-all flex justify-between items-center ${
                            formData.deliveryType === option.id
                              ? "border-primary bg-primary bg-opacity-10"
                              : "border-gray-300 dark:border-gray-600 hover:border-primary"
                          }`}
                        >
                          <div className="text-left">
                            <p className="font-semibold">{option.label}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {option.desc}
                            </p>
                          </div>
                          <span className="text-lg font-bold">
                            ₹{option.price}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-3">
                      Payment Method
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "card", label: "💳 Credit/Debit Card" },
                        { id: "upi", label: "📱 UPI" },
                        { id: "wallet", label: "💰 Digital Wallet" },
                        { id: "cod", label: "💵 Cash on Delivery" },
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              paymentMethod: method.id,
                            })
                          }
                          className={`w-full p-3 rounded-lg border-2 transition-all text-left font-semibold ${
                            formData.paymentMethod === method.id
                              ? "border-primary bg-primary bg-opacity-10"
                              : "border-gray-300 dark:border-gray-600 hover:border-primary"
                          }`}
                        >
                          {method.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2 text-primary font-semibold hover:underline"
                    >
                      ← Back
                    </motion.button>
                    <Button onClick={handleNext}>Next: Review Order →</Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md"
                >
                  <h2 className="text-2xl font-bold mb-6">
                    🧾 Review Your Order
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Customer
                      </p>
                      <p className="font-semibold">{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Contact
                      </p>
                      <p className="font-semibold">
                        {formData.email} • {formData.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Delivery
                      </p>
                      <p className="font-semibold">
                        {formData.address}, {formData.city}, {formData.state}{" "}
                        {formData.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.backendId ?? ""}`}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty {item.quantity} •{" "}
                            {Object.values(item.customizations || {}).join(
                              ", ",
                            ) || "Standard"}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>{formatPrice(delivery)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2 text-primary font-semibold hover:underline"
                    >
                      ← Back
                    </motion.button>
                    <Button onClick={handlePlaceOrder} loading={isProcessing}>
                      Confirm Order
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.backendId ?? ""}`}
                    className="flex justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500">Qty {item.quantity}</p>
                    </div>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{formatPrice(delivery)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
