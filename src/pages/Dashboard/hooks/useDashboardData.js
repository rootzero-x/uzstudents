import { useCallback, useEffect, useMemo, useState } from "react";

export default function useDashboardData(userId) {
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    "https://694fc8f1e1918.myxvest1.ru/uzstudents/api";

  const groupsBase = useMemo(() => `${API_BASE}/groups`, [API_BASE]);
  const studentBase = useMemo(() => `${API_BASE}/student`, [API_BASE]);

  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsErr, setGroupsErr] = useState("");

  const refreshGroups = useCallback(async () => {
    setGroupsErr("");
    setGroupsLoading(true);
    try {
      const r = await fetch(`${groupsBase}/my/`, {
        method: "GET",
        credentials: "include",
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j?.ok === false)
        throw new Error(j?.message || "Request failed");
      setGroups(j?.groups || []);
    } catch (e) {
      setGroupsErr(e?.message || "Failed to load groups");
      setGroups([]);
    } finally {
      setGroupsLoading(false);
    }
  }, [groupsBase]);

  useEffect(() => {
    if (userId) refreshGroups();
  }, [userId, refreshGroups]);

  return {
    API_BASE,
    groupsBase,
    studentBase,
    groups,
    groupsLoading,
    groupsErr,
    refreshGroups,
  };
}
