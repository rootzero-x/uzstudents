import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../../../components/ui/Input";
import Checkbox from "../../../components/ui/Checkbox";
import TestimonialCard from "../../../components/ui/TestimonialCard";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, signUp } from "../../../services/api/auth";
import { useAuth } from "../../../context/AuthContext";

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
      title: "Students Testimonials",
      desc:
        "Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.",
      quote:
        "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
      name: "Sarah L",
    }),
    []
  );

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

      // ✅ backend user qaytarsa saqlaymiz
      if (data?.user) setUser(data.user);

      // ✅ signupdan keyin login yoki dashboard
navigate("/login", { state: { notice: "We sent a verification link to your email." } });
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

      // ✅ muvaffaqiyatli bo‘lsa home yoki dashboard
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white pb-16 pt-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT: Testimonials (desktopda chapda, mobilda pastga tushadi) */}
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
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                buttonLabel="Read Full Story"
              />
            </div>

            {/* arrows */}
            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-xl bg-gray-50 text-gray-700 ring-1 ring-black/5 hover:bg-gray-100"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-xl bg-gray-50 text-gray-700 ring-1 ring-black/5 hover:bg-gray-100"
                aria-label="Next testimonial"
              >
                →
              </button>
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
                  <a
                    className="font-medium text-gray-700 underline hover:text-black"
                    href="/terms"
                  >
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a
                    className="font-medium text-gray-700 underline hover:text-black"
                    href="/privacy"
                  >
                    Privacy Policy
                  </a>
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

                {/* OR divider */}
                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-xs font-semibold text-gray-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                {/* Google (custom-looking button, but official component triggers securely) */}
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
