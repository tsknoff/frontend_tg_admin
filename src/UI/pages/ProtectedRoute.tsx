// src/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute: React.FC = () => {
  const ssbUser = Cookies.get("ssb_user");

  console.log(ssbUser);

  if (!ssbUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;