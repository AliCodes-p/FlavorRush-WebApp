import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import { useAuthStore } from "../../store/authStore";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login, getRedirectPath, clearRedirectTo, redirectTo } =
    useAuthStore();
  const navigate = useNavigate();

  const validate = () => {
    const nextErrors = {};
    if (!email) nextErrors.email = "Email is required";
    if (!password) nextErrors.password = "Password is required";
    if (email && !email.includes("@"))
      nextErrors.email = "Invalid email format";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success("Login successful! 🎉");

      const redirectPath = getRedirectPath();
      clearRedirectTo();

      if (redirectPath && redirectPath !== "/") {
        navigate(redirectPath);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 opacity-10 bg-pattern -z-10" />

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
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your FlavorRush account
            </p>
            {redirectTo && (
              <p className="text-xs text-primary mt-2 font-semibold">
                You need to login to access that page
              </p>
            )}
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="your@email.com"
              icon="📧"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              icon="🔒"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full text-right text-sm text-primary hover:underline font-semibold"
            >
              Forgot password?
            </motion.button>

            <Button size="full" loading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-gray-500">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold hover:shadow-lg transition-all text-2xl"
              disabled={isLoading}
            >
              📘
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold hover:shadow-lg transition-all text-2xl"
              disabled={isLoading}
            >
              🔵
            </motion.button>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">
            Demo Credentials:
          </p>
          <p className="text-xs text-gray-500">Email: demo@flavorush.com</p>
          <p className="text-xs text-gray-500">Password: demo123</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
