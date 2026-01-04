// src/pages/Privacy/PrivacyPage.jsx
import Container from "../../components/ui/Container";

export default function PrivacyPage() {
  return (
    <Container className="py-12 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        {/* ===== INTRO ===== */}
        <p>
          UzStudents foydalanuvchilarning shaxsiy ma’lumotlarini himoya qilishga
          jiddiy yondashadi. Ushbu Privacy Policy UzStudents veb-sayti va
          rasmiy Telegram botidan foydalanish jarayonida yig‘iladigan
          ma’lumotlarga nisbatan amal qiladi.
        </p>

        {/* ===== WEBSITE PRIVACY ===== */}
        <h2 className="text-base font-bold text-slate-900">
          1. Veb-sayt orqali qanday ma’lumotlar yig‘iladi?
        </h2>
        <p>
          UzStudents veb-platformasida quyidagi ma’lumotlar yig‘ilishi mumkin:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ism va familiya</li>
          <li>Email manzil</li>
          <li>Login turi (Google yoki oddiy login)</li>
          <li>Profil rasmi (agar mavjud bo‘lsa)</li>
        </ul>

        <h2 className="text-base font-bold text-slate-900">
          2. Veb-sayt ma’lumotlari qanday ishlatiladi?
        </h2>
        <p>
          Ushbu ma’lumotlar akkauntni boshqarish, xavfsizlikni ta’minlash,
          foydalanuvchi tajribasini yaxshilash va platforma xizmatlarini
          rivojlantirish uchun ishlatiladi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          3. Veb-sayt ma’lumotlari uchinchi shaxslarga beriladimi?
        </h2>
        <p>
          Yo‘q. UzStudents foydalanuvchi ma’lumotlarini uchinchi tomonlarga
          sotmaydi va tarqatmaydi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          4. Veb-sayt xavfsizligi
        </h2>
        <p>
          Biz zamonaviy xavfsizlik choralaridan foydalanamiz: HTTPS,
          HttpOnly cookies, session-based authentication va server-side
          himoya mexanizmlari.
        </p>

        {/* ===== TELEGRAM BOT PRIVACY ===== */}
        <h2 className="text-base font-bold text-slate-900 pt-4">
          5. Telegram Bot Privacy Policy
        </h2>
        <p>
          UzStudents rasmiy Telegram botidan foydalanilganda quyidagi
          ma’lumotlar avtomatik tarzda olinishi mumkin:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Telegram user ID</li>
          <li>Ism va username (agar mavjud bo‘lsa)</li>
          <li>Botga yuborilgan xabarlar</li>
        </ul>

        <h2 className="text-base font-bold text-slate-900">
          6. Telegram bot ma’lumotlari qanday ishlatiladi?
        </h2>
        <p>
          Telegram bot orqali yuborilgan xabarlar faqatgina UzStudents
          administratorlariga yetkaziladi va foydalanuvchilarga javob
          berish hamda texnik yordam ko‘rsatish uchun ishlatiladi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          7. Telegram bot ma’lumotlari uchinchi tomonlarga beriladimi?
        </h2>
        <p>
          Yo‘q. Telegram bot orqali olingan ma’lumotlar faqatgina
          vakolatli adminlar tomonidan ko‘riladi va uchinchi shaxslarga
          uzatilmaydi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          8. Ma’lumotlarni saqlash muddati
        </h2>
        <p>
          Biz faqat xizmatni ta’minlash va xavfsizlik maqsadlari uchun zarur
          bo‘lgan minimal ma’lumotlarni saqlaymiz. Foydalanuvchi istagiga
          ko‘ra ma’lumotlar o‘chirilishi mumkin.
        </p>

        {/* ===== CONTACT ===== */}
        <h2 className="text-base font-bold text-slate-900">
          9. Bog‘lanish
        </h2>
        <p>
          Agar ushbu Privacy Policy bo‘yicha savollaringiz bo‘lsa,
          quyidagi email orqali bog‘lanishingiz mumkin:
        </p>
        <p className="font-medium text-slate-900">
          uzstudents.official@gmail.com
        </p>
      </div>
    </Container>
  );
}
