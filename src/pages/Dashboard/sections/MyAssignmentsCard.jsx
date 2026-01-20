import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useIntervalWhenVisible from "../hooks/useIntervalWhenVisible";
import { studentApi } from "../../../services/api/studentApi";

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

function Pill({ tone = "slate", children }) {
  const map = {
    slate: "bg-slate-50 text-slate-700 ring-slate-200",
    orange: "bg-orange-50 text-orange-700 ring-orange-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-extrabold ring-1 ${map[tone] || map.slate}`}
    >
      {children}
    </span>
  );
}

function ScoreBlock({ title, score, max, tone, note }) {
  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-100">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs font-extrabold text-slate-900">{title}</div>
        <Pill tone={tone}>{score != null ? `${score}/${max}` : "—"}</Pill>
      </div>
      <div className="text-xs text-slate-500">{note}</div>
    </div>
  );
}

function StageLine({ submittedAt, aiAt, teacherAt }) {
  const Step = ({ ok, label }) => (
    <div className="flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${ok ? "bg-emerald-500" : "bg-slate-300"}`}
      />
      <span
        className={`text-[11px] font-bold ${ok ? "text-slate-900" : "text-slate-400"}`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
      <Step ok={!!submittedAt} label="1) Submitted" />
      <span className="text-slate-300">→</span>
      <Step ok={!!aiAt} label="2) AI graded" />
      <span className="text-slate-300">→</span>
      <Step ok={!!teacherAt} label="3) Teacher final" />
    </div>
  );
}

export default function MyAssignmentsCard() {
  const { attach, visible } = useIntervalWhenVisible(3500);

  const [groups, setGroups] = useState([]);
  const [gLoading, setGLoading] = useState(true);
  const [groupId, setGroupId] = useState(0);

  const [assignments, setAssignments] = useState([]);
  const [subsByAssignment, setSubsByAssignment] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [auto, setAuto] = useState(true);

  // submit modal
  const [open, setOpen] = useState(false);
  const [activeA, setActiveA] = useState(null);
  const fileRef = useRef(null);
  const [busySubmit, setBusySubmit] = useState(false);
  const [submitErr, setSubmitErr] = useState("");

  // load groups once
  useEffect(() => {
    (async () => {
      try {
        setGLoading(true);
        const res = await studentApi.myGroups();
        const arr = res?.groups || [];
        setGroups(arr);
        const first = arr?.[0]?.id ? Number(arr[0].id) : 0;
        setGroupId((prev) => (prev ? prev : first));
      } catch (e) {
        setGroups([]);
      } finally {
        setGLoading(false);
      }
    })();
  }, []);

  const refresh = async () => {
    if (!groupId) return;
    setErr("");
    setLoading(true);
    try {
      const aRes = await studentApi.listAssignments(groupId);
      const list = aRes?.assignments || [];
      setAssignments(list);

      // submissions list (for stage + ai/teacher/final)
      const sRes = await studentApi.mySubmissions(groupId);
      const subs = sRes?.submissions || [];

      const map = {};
      for (const s of subs) {
        const aid = Number(s.assignment_id);
        if (!map[aid]) map[aid] = [];
        map[aid].push(s);
      }
      setSubsByAssignment(map);
    } catch (e) {
      setErr(e?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  // initial + realtime polling (visible only)
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  useEffect(() => {
    if (!auto || !visible || !groupId) return;
    const t = setInterval(() => refresh(), 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, visible, groupId]);

  const groupOptions = useMemo(() => {
    return groups.map((g) => ({
      id: Number(g.id),
      title: g.title || g.name || `Group #${g.id}`,
    }));
  }, [groups]);

  const openSubmit = (a) => {
    setActiveA(a);
    setSubmitErr("");
    if (fileRef.current) fileRef.current.value = "";
    setOpen(true);
  };

  const doSubmit = async () => {
    if (!activeA?.id) return;
    const assignment_id = Number(activeA.id);
    const file = fileRef.current?.files?.[0] || null;

    setSubmitErr("");
    setBusySubmit(true);
    try {
      if (!file) throw new Error("Fayl tanlang (majburiy).");

      await studentApi.submitAnswer({
        assignment_id,
        file,
      });

      setOpen(false);
      await refresh();
    } catch (e) {
      setSubmitErr(e?.message || "Submit failed");
    } finally {
      setBusySubmit(false);
    }
  };

  return (
    <div ref={attach} className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold text-slate-900">
            Assignments
          </div>
          <div className="text-xs text-slate-500">
            Vazifalar + topshirish + AI/Teacher baho — hammasi shu yerda.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
            <input
              type="checkbox"
              checked={auto}
              onChange={(e) => setAuto(e.target.checked)}
            />
            Auto refresh
          </label>

          <button
            onClick={refresh}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
            disabled={!groupId || loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-orange-300 sm:max-w-[360px]"
          value={groupId || 0}
          onChange={(e) => setGroupId(Number(e.target.value))}
          disabled={gLoading || groupOptions.length === 0}
        >
          {groupOptions.length === 0 ? (
            <option value={0}>No groups</option>
          ) : (
            groupOptions.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))
          )}
        </select>

        {err ? (
          <div className="w-full rounded-xl bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 ring-1 ring-rose-200">
            {err}
          </div>
        ) : null}
      </div>

      <div className="grid gap-3">
        {assignments.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-100">
            Hozircha vazifa yo'q.
          </div>
        ) : (
          assignments.map((a) => {
            const list = subsByAssignment[Number(a.id)] || [];
            const sub =
              list
                .slice()
                .sort(
                  (x, y) =>
                    (Number(y.updated_at) || 0) - (Number(x.updated_at) || 0),
                )[0] || null;

            const max = Number(a.max_score || 100);

            const aiScore = sub?.ai_score ?? null;
            const tScore = sub?.teacher_score ?? null;

            const finalScore =
              tScore != null
                ? Number(tScore)
                : aiScore != null
                  ? Number(aiScore)
                  : null;

            const submittedAt = sub?.created_at || sub?.updated_at || null;
            const aiAt =
              sub?.ai_score != null
                ? sub?.graded_at || sub?.updated_at || null
                : null;
            const teacherAt =
              sub?.teacher_score != null
                ? sub?.graded_at || sub?.updated_at || null
                : null;

            // Teacher attachment from assignment
            const hasTeacherFile = !!a.download_url;
            const teacherFileUrl = a.download_url;
            const teacherFileName = a.attachment_name || "assignment_file";


            // Student submission file
            const hasStudentFile = sub?.file_url || sub?.download_url;
            const studentFileUrl = sub?.file_url || sub?.download_url;
            const studentFileName = sub?.file_name || "submission_file";

            return (
              <motion.div
                key={a.id}
                variants={fade}
                initial="hidden"
                animate="show"
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold text-slate-900">
                      {a.title}
                    </div>
                    {a.description ? (
                      <div className="mt-1 line-clamp-2 text-xs text-slate-600">
                        {a.description}
                      </div>
                    ) : null}

                    {hasTeacherFile && (
  <a
    href={teacherFileUrl}
    download={teacherFileName}
    className="mt-2 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-extrabold text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100"
  >
    📎 Download assignment file
  </a>
)}


                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Pill tone="slate">Max: {max}</Pill>
                      {sub?.status ? (
                        <Pill tone="blue">{String(sub.status)}</Pill>
                      ) : (
                        <Pill tone="slate">Not submitted</Pill>
                      )}
                    </div>

                    {hasStudentFile && (
                      <div className="mt-2 flex items-center gap-2">
                        <Pill tone="emerald">✅ Your submission</Pill>
                        <a
                          href={studentFileUrl}
                          download={studentFileName}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          {studentFileName}
                        </a>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => openSubmit(a)}
                    className="rounded-xl bg-orange-500 px-4 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-orange-600"
                  >
                    Submit / Resubmit
                  </button>
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <StageLine
                    submittedAt={submittedAt}
                    aiAt={aiAt}
                    teacherAt={teacherAt}
                  />

                  <div className="grid gap-2 sm:grid-cols-3">
                    <ScoreBlock
                      title="AI score"
                      score={aiScore}
                      max={max}
                      tone="orange"
                      note="AI tekshiradi (auto)."
                    />
                    <ScoreBlock
                      title="Teacher score"
                      score={tScore}
                      max={max}
                      tone="blue"
                      note="O'qituvchi tasdiqlaydi / tahrirlaydi."
                    />
                    <ScoreBlock
                      title="Final score"
                      score={finalScore}
                      max={max}
                      tone="emerald"
                      note="Studentga shu ball hisoblanadi."
                    />
                  </div>
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-2xl bg-orange-50 p-3 ring-1 ring-orange-100">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-xs font-extrabold text-orange-900">
                        AI Feedback
                      </div>
                      <Pill tone="orange">
                        {aiScore != null ? "Ready" : "Pending"}
                      </Pill>
                    </div>
                    <div className="text-xs text-orange-900/80">
                      {sub?.ai_feedback
                        ? sub.ai_feedback
                        : "AI hali tekshirmagan (yoki navbatda)."}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-xs font-extrabold text-slate-900">
                        Teacher Feedback
                      </div>
                      <Pill tone="blue">
                        {tScore != null ? "Final" : "Not final"}
                      </Pill>
                    </div>
                    <div className="text-xs text-slate-700">
                      {sub?.teacher_feedback
                        ? sub.teacher_feedback
                        : "O'qituvchi hali yakunlamagan."}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* ===== Submit Modal (FILE ONLY) ===== */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-xl"
            >
              <div className="text-lg font-extrabold text-slate-900">
                Submit Answer
              </div>
              <div className="mt-1 text-sm text-slate-500">
                {activeA?.title || "—"}
              </div>

              <div className="mt-4">
                <div className="text-xs font-bold text-slate-700 mb-2">
                  Answer file (required)
                </div>

                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-orange-200 transition">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-slate-900">
                      Fayl yuklash
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      PDF/DOCX/TXT/PNG/JPG (AI tekshirishi formatga bog'liq)
                    </div>
                  </div>

                  <span className="shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white">
                    Choose file
                  </span>

                  <input ref={fileRef} type="file" className="hidden" />
                </label>

                {fileRef.current?.files?.[0] && (
                  <div className="mt-2 text-xs text-slate-600">
                    Selected:{" "}
                    <span className="font-bold text-slate-900">
                      {fileRef.current.files[0].name}
                    </span>
                  </div>
                )}

                <div className="mt-2 text-[11px] text-slate-500">
                  ✅ Faqat fayl yuboriladi. Text yozish shart emas.
                </div>
              </div>

              {submitErr ? (
                <div className="mt-3 rounded-2xl bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 ring-1 ring-rose-200">
                  {submitErr}
                </div>
              ) : null}

              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-900 hover:bg-slate-200"
                  disabled={busySubmit}
                >
                  Cancel
                </button>
                <button
                  onClick={doSubmit}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white hover:bg-slate-800 disabled:opacity-60"
                  disabled={busySubmit}
                >
                  {busySubmit ? "Submitting..." : "Submit"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
