import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../../../components/ui/Input";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, login } from "../../../services/api/auth";
import { useAuth } from "../../../context/AuthContext";

export default function LoginContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notice, setNotice] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

 // ✅ Signup yoki ForgotPassword’dan kelgan notice'ni ko‘rsatish (state + query)
useEffect(() => {
  const fromState = location.state?.notice;

  const params = new URLSearchParams(location.search);
  const fromQuery = params.get("notice");

  const msg = fromState || fromQuery;

  if (msg) {
    setNotice(String(msg));

    // ✅ state va query'ni tozalash (reload/back’da qayta chiqmasin)
    navigate(location.pathname, { replace: true, state: null });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  // ✅ premium: notice chiroyli yo‘qolsin (layout itarmasdan)
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4200);
    return () => clearTimeout(t);
  }, [notice]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const em = email.trim();

    if (!em || !password) {
      setErr("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const data = await login({ email: em, password });
      if (data?.user) setUser(data.user);
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.message || "Login failed");
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

  return (
    <section className="w-full bg-white pb-16 pt-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="grid grid-cols-1 place-items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative w-full max-w-[520px] rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5"
          >
            {/* ✅ Overlay Notice (layout itarmaydi) */}
            <div className="pointer-events-none absolute left-4 right-4 top-[80px] z-20 flex justify-center">
              <AnimatePresence>
                {notice ? (
                  <motion.div
                    key="notice"
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="pointer-events-auto w-full max-w-[460px] rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-900 ring-1 ring-emerald-200 shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
                    role="status"
                    aria-live="polite"
                  >
                    {notice}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* ✅ content: notice chiqsa ham layout siljimaydi */}
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900">Login</h1>
              <p className="mt-2 text-sm text-gray-500">
                Welcome back. Please enter your details.
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
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
                autoComplete="current-password"
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

              {err ? (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                  {err}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Please wait..." : "Login"}
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs font-semibold text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-black/5">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setErr("Google sign-in failed")}
                  useOneTap={false}
                  text="signin_with"
                  shape="rectangular"
                  size="large"
                  width="100%"
                />
              </div>

              <p className="pt-1 text-center text-sm text-gray-600">
                <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                  <span>Don&apos;t have an account?</span>
                  <Link
                    to="/signup"
                    className="font-semibold text-gray-900 underline"
                  >
                    Sign Up
                  </Link>
                  <span aria-hidden>↗</span>

                  <span className="mx-1 text-gray-300" aria-hidden>
                    •
                  </span>

                  <Link
                    to="/forgot-password"
                    className="font-semibold text-gray-900 underline"
                  >
                    Forgot password?
                  </Link>
                </span>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
