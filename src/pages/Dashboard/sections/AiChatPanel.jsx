import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const msgWrap = {
  hidden: { opacity: 0, y: 10, scale: 0.99, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export default function AiChatPanel() {
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    "https://694fc8f1e1918.myxvest1.ru/uzstudents/api";

  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMsgs, setAiMsgs] = useState([
    {
      role: "assistant",
      text: "Salom! Men UzStudents AI Assistantman. Savolingizni yozing — qisqa va aniq javob beraman.",
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiErr, setAiErr] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const visibleMsgs = useMemo(() => {
    if (showHistory) return aiMsgs;
    return aiMsgs.length > 6 ? aiMsgs.slice(-6) : aiMsgs;
  }, [aiMsgs, showHistory]);

  useEffect(() => {
    if (!aiOpen) setShowHistory(false);
  }, [aiOpen]);

  const sendAi = async () => {
    const text = aiInput.trim();
    if (!text || aiLoading) return;

    setAiErr("");
    setAiInput("");
    setAiMsgs((p) => [...p, { role: "user", text }]);
    setAiLoading(true);

    try {
      const r = await fetch(`${API_BASE}/ai/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: text }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j?.message || "AI error");

      setAiMsgs((p) => [...p, { role: "assistant", text: j.reply || "—" }]);
    } catch (e) {
      setAiErr(e?.message || "Network error");
    } finally {
      setAiLoading(false);
    }
  };

  const clearChat = () => {
    setAiErr("");
    setAiInput("");
    setShowHistory(false);
    setAiMsgs([
      {
        role: "assistant",
        text: "Chat tozalandi. Yangi savol yozishingiz mumkin.",
      },
    ]);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
      <button
        type="button"
        onClick={() => setAiOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-slate-900">
            AI Chat (Test)
          </div>
          <div className="mt-1 text-xs leading-relaxed text-slate-600">
            Ulanish:{" "}
            <span className="font-bold">Dashboard → Backend → OpenAI</span>
          </div>
        </div>
        <span className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-extrabold text-white">
          {aiOpen ? "Close" : "Open"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {aiOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="border-t border-slate-100"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-extrabold text-slate-900">
                  Live chat
                </div>
                <div className="flex items-center gap-2">
                  {aiMsgs.length > 6 && (
                    <button
                      onClick={() => setShowHistory((v) => !v)}
                      className="rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                    >
                      {showHistory ? "Hide history" : "Show history"}
                    </button>
                  )}
                  <button
                    onClick={clearChat}
                    className="rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="mt-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100 sm:p-4">
                <div className="space-y-3 text-sm">
                  <AnimatePresence initial={false}>
                    {visibleMsgs.map((m, idx) => (
                      <motion.div
                        key={`${m.role}-${idx}-${m.text.slice(0, 12)}`}
                        variants={msgWrap}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className={
                          m.role === "user"
                            ? "ml-auto w-fit max-w-full rounded-2xl bg-white px-4 py-2 text-slate-900 ring-1 ring-slate-200 break-words"
                            : "mr-auto w-fit max-w-full rounded-2xl bg-orange-50 px-4 py-2 text-slate-900 ring-1 ring-orange-100 break-words"
                        }
                      >
                        {m.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {aiLoading && (
                    <div className="mr-auto w-fit rounded-2xl bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700 ring-1 ring-orange-100">
                      Javob tayyorlanmoqda…
                    </div>
                  )}
                </div>
              </div>

              {aiErr && (
                <div className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-700 ring-1 ring-red-100">
                  ⚠️ {aiErr}
                </div>
              )}

              <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                <input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendAi()}
                  disabled={aiLoading}
                  placeholder="Savol yozing…"
                  className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <button
                  onClick={sendAi}
                  disabled={aiLoading}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800 disabled:opacity-60 sm:w-auto"
                >
                  Send
                </button>
              </div>

              <div className="mt-2 text-[11px] text-slate-500">
                🔑 OpenAI key faqat <b>serverda</b>. Frontendda token yo‘q.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
