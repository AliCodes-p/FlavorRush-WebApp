import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import { useAuthStore } from "../../store/authStore";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup, getRedirectPath, clearRedirectTo } = useAuthStore();
  const navigate = useNavigate();

  const validate = () => {
    const nextErrors = {};
    if (!formData.name) nextErrors.name = "Name is required";
    if (!formData.email) nextErrors.email = "Email is required";
    if (!formData.password) nextErrors.password = "Password is required";
    if (formData.password.length < 6)
      nextErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      nextErrors.confirmPassword = "Passwords do not match";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully!");
      const redirectPath = getRedirectPath();
      clearRedirectTo();
      navigate(redirectPath && redirectPath !== "/" ? redirectPath : "/");
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Signup failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-5xl mb-3">🚀</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Join FlavorRush
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your account and start ordering
            </p>
          </motion.div>

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
              placeholder="John Doe"
              icon="👤"
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
              placeholder="your@email.com"
              icon="📧"
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              placeholder="••••••••"
              icon="🔒"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
              placeholder="••••••••"
              icon="🔒"
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="w-4 h-4" />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                I agree to the Terms & Conditions
              </label>
            </div>

            <Button size="full" loading={isLoading}>
              Create Account
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-gray-500">Or sign up with</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold hover:shadow-lg transition-all text-2xl"
            >
              📘
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold hover:shadow-lg transition-all text-2xl"
            >
              🔵
            </motion.button>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
