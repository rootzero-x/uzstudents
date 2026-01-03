import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const API_BASE = "https://694fc8f1e1918.myxvest1.ru/uzstudents/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  async function refreshMe() {
    try {
      const res = await fetch(`${API_BASE}/auth/me/index.php`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.user) setUser(data.user);
      else setUser(null);
    } finally {
      setBooting(false);
    }
  }

  useEffect(() => {
    refreshMe();
  }, []);

  const value = useMemo(
  () => ({
    user,
    isAuthed: Boolean(user),

    booting,
    loading: booting, // ✅ ProtectedRoute bilan moslash

    setUser,
    refreshMe,
    logout: async () => {
      try {
        await fetch(`${API_BASE}/auth/logout/index.php`, {
          method: "POST",
          credentials: "include",
        });
      } finally {
        setUser(null);
      }
    },
  }),
  [user, booting]
);


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
