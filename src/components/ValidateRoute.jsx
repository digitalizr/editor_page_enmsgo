import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ValidateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (auth && !toast.isActive("already-logged-in")) {
      toast.success("You're Already Logged In, Logout First To Go to Login Page", {
        toastId: "already-logged-in",
      });
    }
  }, [auth]); 

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ValidateRoute;
