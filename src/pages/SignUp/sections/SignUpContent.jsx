import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../../../components/ui/Input";
import Checkbox from "../../../components/ui/Checkbox";
import TestimonialCard from "../../../components/ui/TestimonialCard";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, signUp } from "../../../services/api/auth";
import { useAuth } from "../../../context/AuthContext";

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 18 : -18 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -18 : 18 }),
};

export default function SignUpContent() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [agree, setAgree] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const testimonial = useMemo(
    () => ({
      title: "UzStudents • Community Stories",
      desc: "UzStudents — masofaviy ta’limni soddalashtiradigan platforma. Kurslar, topshiriqlar va baholash jarayonlarini bir joyga jamlab, talaba va o‘qituvchi o‘rtasidagi ishlashni tezlashtiramiz.",
      items: [
        {
          quote:
            "UzStudents orqali kurslarni tartibli o‘rganish osonlashdi: materiallar bir joyda, topshiriqlar aniq, va jarayon juda tushunarli. Eng yoqqani — o‘qituvchi bilan aloqa tez va muammosiz bo‘ldi.",
          name: "Student • 1-kurs",
          buttonLabel: "Read Full Story",
        },
        {
          quote:
            "Topshiriq topshirish va natijalarni ko‘rish endi ancha qulay. Platforma dizayni yengil, tez ishlaydi va telefonlarda ham toza ko‘rinadi. O‘qish jarayonim tartibga tushdi.",
          name: "Student • 2-kurs",
          buttonLabel: "Read Full Story",
        },
        {
          quote:
            "UzStudents bizga masofadan turib ham samarali o‘qitish imkonini berdi. Kurslar bo‘limi, nazorat ishlari va baholash oqimi bir xil standartda. Bu esa vaqtni tejaydi va adolatni oshiradi.",
          name: "Teacher • Mentor",
          buttonLabel: "Read Full Story",
        },
        {
          quote:
            "Platformadagi xavfsizlik va maxfiylik tamoyillari menga ishonch berdi. Ma’lumotlar ehtiyotkorlik bilan boshqariladi, foydalanuvchi tajribasi esa premium darajada — ayniqsa mobil qurilmalarda.",
          name: "Community • Reviewer",
          buttonLabel: "Read Full Story",
        },
      ],
    }),
    []
  );

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const total = testimonial.items.length;

  const prev = () => {
    setDir(-1);
    setIdx((i) => (i - 1 + total) % total);
  };

  const next = () => {
    setDir(1);
    setIdx((i) => (i + 1) % total);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const fn = fullName.trim();
    const em = email.trim();

    if (!fn || !em || !password) {
      setErr("Please fill in all fields.");
      return;
    }
    if (!agree) {
      setErr("Please agree to Terms of Use and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);
      const data = await signUp({ fullName: fn, email: em, password });
      if (data?.user) setUser(data.user);

      navigate("/login", {
        state: { notice: "We sent a verification link to your email." },
      });
    } catch (error) {
      setErr(error?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setErr("");
    try {
      setLoading(true);
      const credential = credentialResponse?.credential;
      if (!credential) throw new Error("Google credential missing");

      const data = await googleLogin(credential);
      if (data?.user) setUser(data.user);
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const current = testimonial.items[idx];

  return (
    <section className="w-full bg-white pb-16 pt-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT: Testimonials slider */}
          <div className="order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45 }}
              className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl"
            >
              {testimonial.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-4 max-w-xl text-sm leading-6 text-gray-600"
            >
              {testimonial.desc}
            </motion.p>

            <div className="mt-10">
              <div className="relative rounded-2xl">
                {/* ✅ Card area: mobile’da balandlikni oshirdik */}
                <div className="relative min-h-[280px] sm:min-h-[220px]">
                  <AnimatePresence mode="wait" initial={false} custom={dir}>
                    <motion.div
                      key={idx}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <TestimonialCard
                        quote={current.quote}
                        name={current.name}
                        buttonLabel={current.buttonLabel}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ✅ Controls: mobile’da pastda, overlap bo‘lmaydi */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* dots */}
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    {Array.from({ length: total }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setDir(i > idx ? 1 : -1);
                          setIdx(i);
                        }}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          i === idx
                            ? "bg-orange-500"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* arrows */}
                  <div className="flex items-center justify-center gap-3 sm:justify-end">
                    <button
                      type="button"
                      onClick={prev}
                      className="grid h-11 w-11 place-items-center rounded-xl bg-gray-50 text-gray-700 ring-1 ring-black/5 hover:bg-gray-100 active:translate-y-[1px] sm:h-12 sm:w-12"
                      aria-label="Previous testimonial"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="grid h-11 w-11 place-items-center rounded-xl bg-gray-50 text-gray-700 ring-1 ring-black/5 hover:bg-gray-100 active:translate-y-[1px] sm:h-12 sm:w-12"
                      aria-label="Next testimonial"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Sign up card */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mx-auto w-full max-w-[520px] rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5"
            >
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900">
                  Sign Up
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Create an account to unlock exclusive features.
                </p>
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your Name"
                  autoComplete="name"
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  autoComplete="email"
                  required
                />

                <Input
                  label="Password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  autoComplete="new-password"
                  required
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      👁
                    </button>
                  }
                />

                <Checkbox
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                >
                  I agree with{" "}
                  <Link
                    className="font-medium text-gray-700 underline hover:text-black"
                    to="/terms"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="font-medium text-gray-700 underline hover:text-black"
                    to="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </Checkbox>

                {err ? (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {err}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Please wait..." : "Sign Up"}
                </button>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-xs font-semibold text-gray-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-black/5">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setErr("Google sign-in failed")}
                    useOneTap={false}
                    text="signup_with"
                    shape="rectangular"
                    size="large"
                    width="100%"
                  />
                </div>

                <p className="pt-1 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-gray-900 underline"
                  >
                    Login
                  </Link>{" "}
                  <span aria-hidden>↗</span>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
