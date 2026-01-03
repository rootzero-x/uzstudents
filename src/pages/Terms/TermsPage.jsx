// src/pages/Terms/TermsPage.jsx
import Container from "../../components/ui/Container";

export default function TermsPage() {
  return (
    <Container className="py-12 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
        Terms of Service
      </h1>

      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          UzStudents platformasidan foydalanish orqali siz ushbu shartlarga
          rozilik bildirasiz.
        </p>

        <h2 className="font-bold text-slate-900">1. Akkaunt</h2>
        <p>
          Siz kiritgan ma’lumotlar to‘g‘ri bo‘lishi kerak. Akkaunt xavfsizligi
          uchun javobgarlik sizga tegishli.
        </p>

        <h2 className="font-bold text-slate-900">
          2. Platformadan foydalanish
        </h2>
        <p>
          Platformadan noqonuniy, zararli yoki boshqa foydalanuvchilarga salbiy
          ta’sir qiluvchi maqsadlarda foydalanish taqiqlanadi.
        </p>

        <h2 className="font-bold text-slate-900">3. Xizmatlar</h2>
        <p>
          UzStudents Beta rejimda ishlaydi. Xizmatlar vaqt o‘tishi bilan
          o‘zgarishi yoki yangilanishi mumkin.
        </p>

        <h2 className="font-bold text-slate-900">4. Javobgarlik</h2>
        <p>
          Platformadan foydalanish natijasida yuzaga keladigan muammolar uchun
          UzStudents cheklangan javobgarlikka ega.
        </p>
      </div>
    </Container>
  );
}
