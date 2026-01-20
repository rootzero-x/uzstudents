import React, { useEffect, useMemo, useState } from "react";
import { studentApi } from "../../../services/api/studentApi";

function normGroup(g) {
  const id = Number(g?.id || 0);

  // Backendlar turlicha field qaytarishi mumkin — hammasini qo‘llab ketamiz
  const name =
    g?.name ||
    g?.title ||
    g?.group_name ||
    g?.group_title ||
    (id ? `Group #${id}` : "Group");

  const teacher =
    g?.teacher_name ||
    g?.teacher_full_name ||
    g?.teacher ||
    g?.owner_name ||
    "—";

  const code = g?.code || g?.join_code || g?.group_code || "";

  return { id, name, teacher, code };
}

export default function MyGroupsCard() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await studentApi.myGroups();
      const arr = Array.isArray(res?.groups) ? res.groups : [];
      setGroups(arr);
    } catch (e) {
      setGroups([]);
      setErr(e?.message || "Groups yuklab bo‘lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const list = useMemo(() => (groups || []).map(normGroup), [groups]);

  return (
    <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-extrabold text-slate-900">My Groups</h2>

        <button
          onClick={load}
          className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-extrabold text-white hover:bg-slate-800 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {err ? (
        <div className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-700 ring-1 ring-red-100">
          ⚠️ {err}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-[88px] rounded-2xl bg-slate-50 ring-1 ring-slate-100 animate-pulse"
            />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="mt-3 text-sm text-slate-600">
          Hozircha group yo‘q. <b>Join Group</b> orqali kod kiriting.
        </div>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {list.map((g) => (
            <div
              key={g.id}
              className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
            >
              <div className="text-sm font-extrabold text-slate-900">
                {g.name}
              </div>

              <div className="mt-1 text-xs text-slate-600">
                Teacher: <b>{g.teacher}</b>
              </div>

              {g.code ? (
                <div className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-slate-700 ring-1 ring-slate-200">
                  Code: {g.code}
                </div>
              ) : (
                <div className="mt-2 text-[11px] font-bold text-slate-500">
                  Code: —
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
