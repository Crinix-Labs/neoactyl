import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider"; // Adjust the path as needed

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Get auth status from context

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
