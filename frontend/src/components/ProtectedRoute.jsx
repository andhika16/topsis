import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authState");
  console.log(token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;
