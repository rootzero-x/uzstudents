// src/pages/Support/SupportPage.jsx
import Container from "../../components/ui/Container";

export default function SupportPage() {
  return (
    <Container className="py-12 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Support</h1>

      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          Agar sizda savol yoki muammo bo‘lsa, biz bilan bog‘lanishingiz mumkin.
        </p>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <p className="font-bold text-slate-900">Email</p>
          <p className="mt-1">uzstudents.official@gmail.com</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <p className="font-bold text-slate-900">Telegram Bot</p>
          <p className="mt-1">@uzstudents_official_bot</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <p className="font-bold text-slate-900">Platforma holati</p>
          <p className="mt-1">
            UzStudents hozirda{" "}
            <span className="font-semibold text-orange-600">Beta</span> rejimda.
            Tez orada OpenAI integratsiyasi qo‘shiladi.
          </p>
        </div>
      </div>
    </Container>
  );
}
