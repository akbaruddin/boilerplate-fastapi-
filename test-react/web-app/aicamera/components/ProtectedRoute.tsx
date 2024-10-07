import React from "react";
import { Navigate } from "@tanstack/react-router";
import useAuthStore from "../stores/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
