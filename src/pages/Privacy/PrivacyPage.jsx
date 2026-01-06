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
          jiddiy yondashadi. Ushbu Privacy Policy UzStudents veb-sayti, rasmiy
          Telegram bot va platformadagi AI funksiyalaridan foydalanish jarayonida
          yig‘iladigan hamda qayta ishlanadigan ma’lumotlarga nisbatan amal
          qiladi.
        </p>

        {/* ===== WEBSITE PRIVACY ===== */}
        <h2 className="text-base font-bold text-slate-900">
          1. Veb-sayt orqali qanday ma’lumotlar yig‘iladi?
        </h2>
        <p>UzStudents veb-platformasida quyidagi ma’lumotlar yig‘ilishi mumkin:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ism va familiya</li>
          <li>Email manzil</li>
          <li>Login turi (Google yoki oddiy login)</li>
          <li>Profil rasmi (agar mavjud bo‘lsa)</li>
          <li>Texnik ma’lumotlar: qurilma turi, brauzer, IP (xavfsizlik va audit uchun)</li>
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
          UzStudents foydalanuvchi ma’lumotlarini sotmaydi. Biroq, xizmatni
          ko‘rsatish uchun zarur bo‘lgan holatlarda (masalan, AI funksiyasi)
          ma’lumotlar cheklangan tarzda xizmat provayderlariga uzatilishi mumkin.
          Bunday uzatish faqat xizmatni ishlatish va xavfsizlik maqsadlarida
          amalga oshiriladi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          4. Veb-sayt xavfsizligi
        </h2>
        <p>
          Biz zamonaviy xavfsizlik choralaridan foydalanamiz: HTTPS, HttpOnly
          cookies, session-based authentication va server-side himoya
          mexanizmlari. Shunga qaramay, internet orqali uzatiladigan ma’lumotlar
          100% kafolat bilan himoyalangan deb aytib bo‘lmaydi — biz esa risklarni
          minimal darajaga tushirish uchun doimiy ishlaymiz.
        </p>

        {/* ===== AI PRIVACY + TERMS ===== */}
        <h2 className="text-base font-bold text-slate-900 pt-4">
          5. AI (UzStudents AI Assistant) bo‘yicha Privacy va foydalanish shartlari
        </h2>
        <p>
          UzStudents AI Assistant — platforma ichida (Dashboard) ishlaydigan
          yordamchi funksiyadir. AI funksiyasi orqali yuborilgan xabarlar
          javob qaytarish uchun qayta ishlanadi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          6. AI orqali qanday ma’lumotlar qayta ishlanishi mumkin?
        </h2>
        <p>
          AI chatga yozganingiz quyidagilarni o‘z ichiga olishi mumkin va
          qayta ishlanadi:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>AI chatga yuborilgan matn (savol/xabar)</li>
          <li>AI tomonidan qaytarilgan javob</li>
          <li>Texnik ma’lumotlar: vaqt, so‘rov holati (status), model nomi, limit/audit uchun kerakli loglar</li>
          <li>Foydalanuvchi identifikatori: user_id va/yoki email (rate limit va xavfsizlik uchun)</li>
        </ul>

        <h2 className="text-base font-bold text-slate-900">
          7. AI xabarlar maxfiyligi va uchinchi tomon (OpenAI)
        </h2>
        <p>
          AI javoblarini olish uchun UzStudents tashqi AI provayderi (OpenAI)
          servisidan foydalanishi mumkin. AI’ga yuborilgan matnlar javobni
          shakllantirish maqsadida ushbu servisda qayta ishlanadi. UzStudents
          API kalitlarini foydalanuvchiga ko‘rsatmaydi va ular faqat serverda
          saqlanadi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          8. AI’dan foydalanish qoidalari (taqiqlangan mavzular)
        </h2>
        <p>
          AI funksiyasidan foydalanishda quyidagi mavzular taqiqlanadi. Bunday
          so‘rovlar rad etilishi mumkin:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ekstremizm, terrorizm, zo‘ravonlik targ‘iboti</li>
          <li>Pornografiya yoki jinsiy mazmundagi kontent (ayniqsa voyaga yetmaganlar bilan bog‘liq)</li>
          <li>Qonunga zid faoliyat: firibgarlik, o‘g‘irlik, qurol-yarog‘, narkotiklar, piratlik</li>
          <li>Hacking/malware/akkaunt buzish yoki himoyani chetlab o‘tish bo‘yicha yo‘riqnoma</li>
          <li>Nafrat, kamsitish, tahqirlash (protected guruhlarga nisbatan)</li>
          <li>O‘ziga zarar yetkazish bo‘yicha yo‘riqnoma</li>
        </ul>
        <p>
          Agar so‘rovingiz ushbu qoidalarga mos kelmasa, AI “policy bo‘yicha ruxsat
          etilmagan” degan mazmunda javob qaytaradi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          9. AI limitlar (Beta) va sabab
        </h2>
        <p>
          UzStudents hozirda Beta (test) rejimda. AI xizmatlari real xarajat talab
          qilgani uchun vaqtinchalik limitlar mavjud:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Matn uzunligi: maksimal <b>1200 ta belgi</b></li>
          <li>So‘rovlar soni: <b>10–15 ta</b> (foydalanuvchi bo‘yicha)</li>
          <li>Limit tugasa: AI chat <b>14 soatga</b> vaqtincha yopiladi</li>
        </ul>
        <p>
          Bu cheklovlar foydalanuvchilar uchun AI resurslarini adolatli taqsimlash
          va platformani barqaror rivojlantirish uchun qo‘yilgan. Kelajakda limitlar
          bosqichma-bosqich oshiriladi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          10. Loglar va saqlash muddati (AI audit)
        </h2>
        <p>
          Xizmat sifatini oshirish va xavfsizlik uchun biz AI so‘rovlari bo‘yicha
          minimal audit ma’lumotlarini saqlashimiz mumkin (so‘rov va javob,
          vaqt, model, foydalanuvchi identifikatori, status). Bu ma’lumotlar
          faqat platformani rivojlantirish, tahlil va xavfsizlik maqsadlarida
          ishlatiladi.
        </p>

        {/* ===== TELEGRAM BOT PRIVACY ===== */}
        <h2 className="text-base font-bold text-slate-900 pt-4">
          11. Telegram Bot Privacy Policy
        </h2>
        <p>
          UzStudents rasmiy Telegram botidan foydalanilganda quyidagi ma’lumotlar
          avtomatik tarzda olinishi mumkin:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Telegram user ID</li>
          <li>Ism va username (agar mavjud bo‘lsa)</li>
          <li>Botga yuborilgan xabarlar</li>
        </ul>

        <h2 className="text-base font-bold text-slate-900">
          12. Telegram bot ma’lumotlari qanday ishlatiladi?
        </h2>
        <p>
          Telegram bot orqali yuborilgan xabarlar texnik yordam ko‘rsatish,
          ma’lumot berish va aloqa uchun ishlatiladi.
        </p>

        <h2 className="text-base font-bold text-slate-900">
          13. Ma’lumotlarni saqlash muddati
        </h2>
        <p>
          Biz xizmatni ta’minlash va xavfsizlik maqsadlari uchun zarur bo‘lgan
          minimal ma’lumotlarni saqlaymiz. Foydalanuvchi istagiga ko‘ra
          ma’lumotlar o‘chirilishi mumkin (qonuniy talablar bundan mustasno).
        </p>

        {/* ===== CONTACT ===== */}
        <h2 className="text-base font-bold text-slate-900">
          14. Bog‘lanish
        </h2>
        <p>
          Agar ushbu Privacy Policy bo‘yicha savollaringiz bo‘lsa, quyidagi email
          orqali bog‘lanishingiz mumkin:
        </p>
        <p className="font-medium text-slate-900">
          uzstudents.official@gmail.com
        </p>
      </div>
    </Container>
  );
}
