// src/ProtectedRoute.js

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import SideBar from "./SideBar";

const ProtectedRoutes = () => {
  const { authState } = useAuthContext();
  console.log(authState.isLoggedIn);
  // Cek apakah pengguna sudah login
  if (!authState.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Jika sudah login, tampilkan sidebar dan outlet (halaman terkait)
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
