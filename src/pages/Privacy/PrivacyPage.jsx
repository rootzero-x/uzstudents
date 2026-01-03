// src/pages/Privacy/PrivacyPage.jsx
import Container from "../../components/ui/Container";

export default function PrivacyPage() {
  return (
    <Container className="py-12 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          UzStudents sizning shaxsiy ma’lumotlaringizni himoya qilishga jiddiy
          yondashadi.
        </p>

        <h2 className="font-bold text-slate-900">
          Qanday ma’lumotlar yig‘iladi?
        </h2>
        <p>Ism, email, login turi (Google yoki oddiy), profil rasmi.</p>

        <h2 className="font-bold text-slate-900">
          Ma’lumotlar qanday ishlatiladi?
        </h2>
        <p>
          Akkauntni boshqarish, xavfsizlikni ta’minlash va platforma
          xizmatlarini yaxshilash uchun.
        </p>

        <h2 className="font-bold text-slate-900">
          Ma’lumotlar uchinchi shaxslarga beriladimi?
        </h2>
        <p>
          Yo‘q. UzStudents foydalanuvchi ma’lumotlarini uchinchi tomonlarga
          sotmaydi.
        </p>

        <h2 className="font-bold text-slate-900">Xavfsizlik</h2>
        <p>
          Biz zamonaviy xavfsizlik choralaridan foydalanamiz (HTTPS, HttpOnly
          cookies, session-based auth).
        </p>
      </div>
    </Container>
  );
}
