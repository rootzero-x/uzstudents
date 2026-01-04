import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestOnlyRoute() {
  const { isAuthed, booting } = useAuth();

  if (booting) {
    return (
      <div className="min-h-[70dvh] flex items-center justify-center">
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
          <div className="text-sm font-extrabold text-slate-900">
            Loading...
          </div>
          <div className="text-xs text-slate-500 mt-1">Checking session</div>
        </div>
      </div>
    );
  }

  // ✅ Agar session active bo'lsa -> login/signup ko'rsatmaymiz
  if (isAuthed) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
