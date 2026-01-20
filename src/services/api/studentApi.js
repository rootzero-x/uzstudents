// src/services/api/studentApi.js

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://694fc8f1e1918.myxvest1.ru/uzstudents/api";

async function jfetch(url, opts = {}) {
  const r = await fetch(url, {
    credentials: "include", // ✅ HAR DOIM COOKIE BORADI
    ...opts,
  });

  const ct = r.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const j = isJson ? await r.json().catch(() => ({})) : {};

  if (!r.ok || j?.ok === false) {
    throw new Error(j?.message || `Request failed (${r.status})`);
  }
  return j;
}

export const studentApi = {
  // groups
  myGroups: () => jfetch(`${API_BASE}/groups/my/`),

  // assignments
  listAssignments: (group_id) =>
    jfetch(
      `${API_BASE}/student/assignments/list/?group_id=${encodeURIComponent(group_id)}`,
    ),

  // compatibility
  assignments: (group_id) => studentApi.listAssignments(group_id),

  // upload tmp
  uploadSubmissionTmp: async ({ file, signal } = {}) => {
    const fd = new FormData();
    fd.append("file", file);

    const r = await fetch(`${API_BASE}/student/submissions/upload/`, {
      method: "POST",
      body: fd,
      credentials: "include", // ✅ COOKIE
      signal,
    });

    const ct = r.headers.get("content-type") || "";
    const j = ct.includes("application/json")
      ? await r.json().catch(() => ({}))
      : {};

    if (!r.ok || j?.ok === false) {
      throw new Error(j?.message || `Upload failed (${r.status})`);
    }
    return j;
  },

  // create submission
  createSubmission: (payload) =>
    jfetch(`${API_BASE}/student/submissions/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  // my submissions
  mySubmissions: (group_id) =>
    jfetch(
      `${API_BASE}/student/submissions/my/?group_id=${encodeURIComponent(group_id)}`,
    ),

  // FINAL submit: multipart (1 call)
submitAnswer: async ({ assignment_id, answer_text, file, signal } = {}) => {
    if (!file) throw new Error("Answer file required");
  const fd = new FormData();
  fd.append("assignment_id", String(assignment_id));
  fd.append("file", file);

  const r = await fetch(`${API_BASE}/student/submissions/submit/index.php`, {
    method: "POST",
    body: fd,
    credentials: "include",
    signal,
});


  const ct = r.headers.get("content-type") || "";
  const j = ct.includes("application/json")
    ? await r.json().catch(() => ({}))
    : {};

  if (!r.ok || j?.ok === false) {
    throw new Error(j?.message || `Submit failed (${r.status})`);
  }
  return j;
},
};
