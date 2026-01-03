// src/services/api/client.js

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "https://694fc8f1e1918.myxvest1.ru/uzstudents/api/";

function withSlash(url) {
  return url.endsWith("/") ? url : url + "/";
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiPost(path, body, { signal } = {}) {
  const base = withSlash(API_BASE);
  const cleanPath = String(path).replace(/^\/+/, ""); // faqat boshidagi /

  const url = base + cleanPath;

  console.debug("[API POST]", url);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
    signal,
  });

  const data = await safeJson(res);

  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export { API_BASE };
