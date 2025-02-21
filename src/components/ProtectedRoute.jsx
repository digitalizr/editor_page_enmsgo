import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
