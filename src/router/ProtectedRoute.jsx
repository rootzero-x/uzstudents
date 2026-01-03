import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthed, booting } = useAuth();
  const location = useLocation();

  if (booting) {
    return (
      <div className="min-h-[60dvh] flex items-center justify-center">
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
          <div className="text-sm font-extrabold text-slate-900">Loading...</div>
          <div className="text-xs text-slate-500 mt-1">Checking session</div>
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
