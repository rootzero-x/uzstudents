import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function RowStat({ label, value, valueClass = "text-slate-900" }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 ring-1 ring-slate-200/60 backdrop-blur">
      <span className="text-xs sm:text-sm text-slate-600">{label}</span>
      <span
        className={`truncate text-sm sm:text-base font-extrabold ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function ProfileCard({ profile, onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        relative
        w-full
        max-w-full
        sm:max-w-md
        lg:max-w-sm
        overflow-hidden
        rounded-3xl
        bg-white/80
        shadow-lg
        ring-1 ring-slate-200/60
        backdrop-blur-xl
      "
    >
      {/* ===== Soft glow ===== */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-orange-300/30 blur-3xl" />

      {/* ===== Scrollable content ===== */}
      <div
        className="
          relative
          flex
          max-h-[80vh]
          flex-col
          overflow-y-auto
          px-4
          py-5
          sm:px-6
          scrollbar-thin
        "
      >
        {/* ===== Avatar & Identity ===== */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.15 }}
            className="
              relative
              h-20 w-20
              sm:h-24 sm:w-24
              overflow-hidden
              rounded-full
              bg-slate-100
              ring-1 ring-slate-300
            "
          >
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="h-full w-full object-cover object-center"
              onError={(e) => (e.currentTarget.src = "/default.jpg")}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/50" />
          </motion.div>

          <div className="mt-3 w-full min-w-0">
            <div className="truncate text-base sm:text-lg font-extrabold text-slate-900">
              {profile.full_name}
            </div>
            <div className="truncate text-xs sm:text-sm text-slate-600">
              {profile.email}
            </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-[11px] sm:text-xs font-extrabold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {profile.provider === "google"
                ? "Google Account"
                : "Password Account"}
            </div>
          </div>
        </div>

        {/* ===== Stats ===== */}
        <div className="mt-5 grid gap-2">
          <RowStat
            label="Status"
            value="Active"
            valueClass="text-emerald-600"
          />
          <RowStat label="Access" value="Student" />
          <RowStat
            label="Mode"
            value="Beta"
            valueClass="text-orange-600"
          />
        </div>

        {/* ===== Actions ===== */}
        <div className="mt-4 grid gap-2">
          <Link
            to="/support"
            className="
              rounded-xl
              bg-slate-50
              px-4 py-3
              text-xs sm:text-sm
              font-extrabold
              text-slate-900
              ring-1 ring-slate-200
              transition
              hover:bg-slate-100
            "
          >
            Support{" "}
            <span className="ml-2 text-[10px] sm:text-xs font-bold text-slate-500">
              (help / feedback)
            </span>
          </Link>

          <Link
            to="/contact"
            className="
              rounded-xl
              bg-orange-50
              px-4 py-3
              text-xs sm:text-sm
              font-extrabold
              text-orange-900
              ring-1 ring-orange-200
              transition
              hover:bg-orange-100
            "
          >
            Contact UzStudents{" "}
            <span className="ml-2 text-[10px] sm:text-xs font-bold text-orange-700">
              (official)
            </span>
          </Link>

          <button
            onClick={onLogout}
            className="
              rounded-xl
              bg-slate-900
              px-4 py-3
              text-xs sm:text-sm
              font-extrabold
              text-white
              transition
              hover:bg-slate-800
            "
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
}
