const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://694fc8f1e1918.myxvest1.ru/uzstudents/api";

async function req(path, options = {}) {
  const r = await fetch(`${API_BASE}${path}`, { credentials: "include", ...options });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j?.ok === false) throw new Error(j?.message || "Request failed");
  return j;
}

export const groupsApi = {
  my: () => req("/groups/my/index.php"),
  join: (code) =>
    req("/groups/join/index.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }),
};
