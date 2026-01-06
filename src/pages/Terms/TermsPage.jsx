// src/pages/Terms/TermsPage.jsx
import Container from "../../components/ui/Container";

export default function TermsPage() {
  return (
    <Container className="py-12 max-w-4xl">
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">
        Terms of Service
      </h1>

      <div className="space-y-5 text-sm leading-relaxed text-slate-600">
        <p>
          Ushbu Terms of Service (“Shartlar”) UzStudents platformasidan
          (“Platforma”) foydalanish qoidalarini belgilaydi. Platformadan
          foydalanish orqali siz ushbu shartlarga to‘liq rozilik bildirasiz.
        </p>

        <h2 className="font-bold text-slate-900">
          1. Akkaunt va ro‘yxatdan o‘tish
        </h2>
        <p>
          Foydalanuvchi ro‘yxatdan o‘tishda to‘g‘ri, dolzarb va aniq
          ma’lumotlarni taqdim etishi shart. Akkaunt xavfsizligi, login
          ma’lumotlari va akkauntdan amalga oshirilgan barcha harakatlar uchun
          foydalanuvchi shaxsan javobgar hisoblanadi.
        </p>
        <p>
          Google orqali ro‘yxatdan o‘tilgan akkauntlar parolsiz ishlashi mumkin.
          Bunday holatda tizimga kirish Google autentifikatsiyasi orqali amalga
          oshiriladi.
        </p>

        <h2 className="font-bold text-slate-900">
          2. Platformadan foydalanish
        </h2>
        <p>
          Platformadan qonunga zid, zararli, aldovchi yoki boshqa
          foydalanuvchilarga salbiy ta’sir ko‘rsatadigan maqsadlarda foydalanish
          qat’iyan taqiqlanadi.
        </p>
        <p>
          Foydalanuvchi Platforma xavfsizligini buzishga, ruxsatsiz kirishga
          yoki texnik cheklovlarni chetlab o‘tishga urinish huquqiga ega emas.
        </p>

        <h2 className="font-bold text-slate-900">
          3. Xizmatlar va AI funksiyalar
        </h2>
        <p>
          UzStudents platformasi ta’limga oid xizmatlarni, jumladan sun’iy
          intellekt (AI) asosidagi tekshiruv va tahlil funksiyalarini taqdim
          etishi mumkin. AI tomonidan berilgan natijalar maslahat xarakteriga
          ega bo‘lib, yakuniy akademik yoki huquqiy qaror sifatida qabul
          qilinmasligi kerak.
        </p>
        <p>
          Platforma hozirda <b>Beta</b> rejimda ishlashi mumkin. Shu sababli
          funksiyalar vaqt o‘tishi bilan o‘zgartirilishi, cheklanishi yoki
          yangilanishi mumkin.
        </p>

        <h2 className="font-bold text-slate-900">4. Maxfiylik va xavfsizlik</h2>
        <p>
          Foydalanuvchilarning shaxsiy ma’lumotlari Privacy Policy asosida qayta
          ishlanadi. UzStudents foydalanuvchi ma’lumotlarini himoya qilish uchun
          texnik va tashkiliy choralarni qo‘llaydi, biroq internet muhitida
          mutlaq xavfsizlik kafolatlanmaydi.
        </p>

        <h2 className="font-bold text-slate-900">5. Javobgarlikni cheklash</h2>
        <p>
          Platformadan foydalanish natijasida yuzaga kelishi mumkin bo‘lgan
          to‘g‘ridan-to‘g‘ri yoki bilvosita zararlar uchun UzStudents maksimal
          darajada qonun doirasida cheklangan javobgarlikka ega.
        </p>

        <h2 className="font-bold text-slate-900">
          6. Akkauntni cheklash yoki yopish
        </h2>
        <p>
          Ushbu shartlar buzilgan taqdirda UzStudents foydalanuvchi akkauntini
          vaqtincha cheklash yoki butunlay o‘chirish huquqini o‘zida saqlab
          qoladi.
        </p>

        <h2 className="font-bold text-slate-900">7. Shartlarning o‘zgarishi</h2>
        <p>
          UzStudents ushbu Terms of Service’ni istalgan vaqtda yangilash yoki
          o‘zgartirish huquqiga ega. Yangilangan shartlar platformada e’lon
          qilingan paytdan boshlab kuchga kiradi.
        </p>

        <p className="pt-2 text-xs text-slate-500">
          Oxirgi yangilanish: {new Date().toLocaleDateString()}
        </p>
      </div>
    </Container>
  );
}
