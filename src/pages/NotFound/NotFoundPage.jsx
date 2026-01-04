import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const loc = useLocation();

  return (
    <div className="min-h-[90dvh] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />
        <div className="p-7 sm:p-10">
          <div className="flex items-start gap-5">
            <div className="h-14 w-14 rounded-2xl bg-orange-500 text-white grid place-items-center font-black shadow-[0_12px_30px_rgba(249,115,22,.35)]">
              U
            </div>

            <div className="flex-1">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                404 — Sahifa topilmadi
              </div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                Siz izlagan manzil mavjud emas yoki o‘chirib yuborilgan bo‘lishi
                mumkin.
                <span className="block mt-1 text-xs text-slate-400">
                  Path: <span className="font-mono">{loc.pathname}</span>
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(249,115,22,.35)] hover:bg-orange-600 active:scale-[0.99] transition"
                >
                  Bosh sahifa
                </Link>
                <Link
                  to="/courses"
                  className="rounded-2xl px-5 py-3 text-sm font-extrabold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 active:scale-[0.99] transition"
                >
                  Kurslar
                </Link>
                <Link
                  to="/contact"
                  className="rounded-2xl px-5 py-3 text-sm font-extrabold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 active:scale-[0.99] transition"
                >
                  Contact
                </Link>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4">
                <div className="text-xs font-bold text-slate-700">
                  Tezkor yordam
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Agar bu xato deb o‘ylasangiz, Support sahifasiga o‘ting yoki
                  qayta urinib ko‘ring.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 text-xs text-slate-400">
            UzStudents • Premium UX • Secure routing
          </div>
        </div>
      </div>
    </div>
  );
}
