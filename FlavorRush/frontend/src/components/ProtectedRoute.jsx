import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";
import LoadingSkeleton from "./Common/LoadingSkeleton";

export const ProtectedRoute = ({ children, allowPublic = false }) => {
  const { isAuthenticated, redirectTo, setRedirectTo, isHydrating } =
    useAuthStore();

  useEffect(() => {
    if (!isHydrating && !isAuthenticated && !allowPublic) {
      toast.error("Please login to continue", {
        duration: 3,
        icon: "🔐",
      });

      if (!redirectTo) {
        setRedirectTo(window.location.pathname);
      }
    }
  }, [allowPublic, isAuthenticated, isHydrating, redirectTo, setRedirectTo]);

  if (isHydrating) {
    return <LoadingSkeleton />;
  }

  if (!isAuthenticated && !allowPublic) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
