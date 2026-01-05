import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestOnlyRoute() {
  const { isAuthed, booting } = useAuth();

  if (booting) {
    return (
     <div className="relative w-full">
      {/* Stabil balandlik: layout shift bo‘lmasin */}
      <div className="h-[70dvh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Premium spinner */}
          <div className="relative h-14 w-14">
            {/* soft glow */}
            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md animate-pulse" />

            {/* ring */}
            <div
              className="
                absolute inset-0 rounded-full
                border-4 border-orange-500/20
                border-t-orange-500
                animate-spin
              "
              style={{ willChange: "transform" }}
            />

            {/* center dot */}
            <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.55)]" />
          </div>

          {/* Text (fixed sizing to avoid jumping) */}
          <div className="text-center">
            <div className="text-sm font-extrabold text-slate-900 tracking-wide">
              UzStudents
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Session tekshirilmoqda...
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // ✅ Agar session active bo'lsa -> login/signup ko'rsatmaymiz
  if (isAuthed) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
