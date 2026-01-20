export default function WelcomeHero() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
          Welcome to UzStudents Dashboard
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          UzStudents — universitet talabalari uchun masofaviy ta'lim
          platformasi. Hozirda <b>Beta</b> rejimda: kurslar, assignment yuklash,
          tekshiruv va kelajakda <b>OpenAI</b> integratsiyasi (obyektiv scoring,
          feedback, audit log, token nazorati, teacher panel).
        </p>
      </div>

      <div className="sm:block">
        <div className="rounded-2xl bg-orange-50 px-4 py-3 ring-1 ring-orange-100">
          <div className="text-xs font-bold text-orange-700">Upcoming</div>
          <div className="mt-0.5 text-sm font-extrabold text-orange-900">
            AI Checking + Scoring
          </div>
          <div className="mt-1 text-xs text-orange-700/90">
            Token-based • Rubric • Feedback
          </div>
        </div>
      </div>
    </div>
  );
}
