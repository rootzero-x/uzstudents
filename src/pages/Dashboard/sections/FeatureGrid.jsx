function FeatureCard({ title, desc, tag }) {
  const tagTone =
    tag === "Ready"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : tag === "In progress"
        ? "bg-orange-50 text-orange-700 ring-orange-100"
        : tag === "Planned"
          ? "bg-slate-100 text-slate-700 ring-slate-200"
          : "bg-white text-slate-700 ring-slate-200";

  return (
    <div className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 transition-transform duration-150 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
        <div
          className={`rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${tagTone}`}
        >
          {tag}
        </div>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>

      <div className="mt-3 h-px w-full bg-slate-200/70" />

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-bold text-slate-500">UzStudents roadmap</span>
        <span className="font-extrabold text-slate-900 group-hover:text-orange-600">
          Details →
        </span>
      </div>
    </div>
  );
}

export default function FeatureGrid() {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <FeatureCard
        title="Courses"
        desc="Kurslarni ko'rib chiqish va o'rganish. Student sahifalari tayyor: Home/About/Contact/Course."
        tag="Ready"
      />
      <FeatureCard
        title="Assignments"
        desc="Student vazifani yuklaydi, o'qituvchi tekshiradi. Tez orada AI avtomatik tahlil qo'shiladi."
        tag="In progress"
      />
      <FeatureCard
        title="Objective Scoring"
        desc="OpenAI token integratsiyasi orqali rubrika asosida ball berish va aniq feedback."
        tag="Planned"
      />
      <FeatureCard
        title="Secure Auth + RBAC"
        desc="Google sign-in, email verification, protected route va Student/Teacher/Admin rollari."
        tag="Next"
      />
    </div>
  );
}
