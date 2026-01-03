// src/pages/FAQ/FAQPage.jsx
import Container from "../../components/ui/Container";

const faqs = [
  {
    q: "UzStudents nima?",
    a: "UzStudents — universitet talabalari uchun masofaviy ta’lim platformasi. Bu yerda kurslar, vazifalar va AI asosidagi baholash tizimi bo‘ladi."
  },
  {
    q: "Ro‘yxatdan o‘tish bepulmi?",
    a: "Ha. Platforma hozirda Beta rejimda va foydalanish bepul."
  },
  {
    q: "Google orqali login xavfsizmi?",
    a: "Ha. Biz Google OAuth’dan foydalanamiz va parolingiz bizda saqlanmaydi."
  },
  {
    q: "Email tasdiqlash nima uchun kerak?",
    a: "Bu akkaunt xavfsizligi va begona shaxslar oldini olish uchun kerak."
  },
  {
    q: "Vazifalar qanday tekshiriladi?",
    a: "Hozircha qo‘lda. Tez orada OpenAI asosida avtomatik tekshiruv qo‘shiladi."
  }
];

export default function FAQPage() {
  return (
    <Container className="py-12 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
        FAQ — Ko‘p beriladigan savollar
      </h1>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
          >
            <h3 className="font-bold text-slate-900">{f.q}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
