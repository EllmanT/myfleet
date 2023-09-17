import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const DelProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (!loading) {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (
      !isAuthenticated &&
      (user.role !== "Deliverer Manager" ||
        user.role !== "Deliverer Admin" ||
        user.role !== "Super Admin")
    ) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default DelProtectedRoutes;
