import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../../../components/ui/Input";
import { Link } from "react-router-dom";
import {
  requestPasswordReset,
  verifyResetCode,
  changePassword,
} from "../../../services/api/auth";

function maskEmail(email) {
  const e = String(email || "").trim();
  const [u, d] = e.split("@");
  if (!u || !d) return e;
  const head = u.slice(0, 2);
  const tail = u.slice(-1);
  return `${head}${"*".repeat(Math.max(2, u.length - 3))}${tail}@${d}`;
}

function strengthScore(pw) {
  const p = pw || "";
  if (!p) return { score: 0, label: "Very weak", hint: "Enter a password." };

  const len = p.length;
  const hasLetter = /[a-zA-Z]/.test(p);
  const hasNumber = /\d/.test(p);
  const hasSymbol = /[#$&%@!]/.test(p);
  const hasOtherSymbol = /[^a-zA-Z0-9]/.test(p);

  let score = 0;
  if (len >= 8) score++;
  if (len >= 12) score++;
  if (hasLetter && hasNumber) score++;
  if (hasSymbol || hasOtherSymbol) score++;

  // Normalize to 0..3
  score = Math.min(3, score);

  if (score === 0)
    return {
      score: 0,
      label: "Very weak",
      hint: "Use at least 8 characters.",
    };
  if (score === 1)
    return {
      score: 1,
      label: "Weak",
      hint: "Add numbers and make it longer.",
    };
  if (score === 2)
    return {
      score: 2,
      label: "Medium",
      hint: "Good. Add a symbol to make it stronger (optional).",
    };
  return { score: 3, label: "Strong", hint: "Great password." };
}

export default function ForgotPasswordContent() {
  const [step, setStep] = useState(1); // 1=email, 2=code, 3=new pass
  const [email, setEmail] = useState("");

  const [notice, setNotice] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // step2
  const [code, setCode] = useState("");
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [expiresLeft, setExpiresLeft] = useState(0);

  // step3
  const [resetToken, setResetToken] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [showPass, setShowPass] = useState(false);

  const strength = useMemo(() => strengthScore(p1), [p1]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4200);
    return () => clearTimeout(t);
  }, [notice]);

  // cooldown timer
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const t = setInterval(
      () => setCooldownLeft((v) => Math.max(0, v - 1)),
      1000
    );
    return () => clearInterval(t);
  }, [cooldownLeft]);

  // code TTL timer
  useEffect(() => {
    if (expiresLeft <= 0) return;
    const t = setInterval(
      () => setExpiresLeft((v) => Math.max(0, v - 1)),
      1000
    );
    return () => clearInterval(t);
  }, [expiresLeft]);

  const submitEmail = async (e) => {
    e.preventDefault();
    setErr("");
    setNotice("");

    const em = email.trim().toLowerCase();
    if (!em) return setErr("Please enter your email.");

    try {
      setLoading(true);
      const res = await requestPasswordReset({ email: em });

      // backend aniq message qaytaradi (siz so‘raganidek)
      setNotice(res?.message || "Code sent. Check your email.");
      setStep(2);
      setCode("");
      setCooldownLeft(res?.resend_after_seconds ?? 120);
      setExpiresLeft(res?.code_expires_seconds ?? 90);
    } catch (error) {
      setErr(error?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setErr("");
    setNotice("");

    const em = email.trim().toLowerCase();
    if (!em) return setErr("Email missing.");

    try {
      setLoading(true);
      const res = await requestPasswordReset({ email: em });
      setNotice(res?.message || "Code resent. Check your email.");
      setCooldownLeft(res?.resend_after_seconds ?? 120);
      setExpiresLeft(res?.code_expires_seconds ?? 90);
    } catch (error) {
      setErr(error?.message || "Resend failed");
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async (e) => {
    e.preventDefault();
    setErr("");
    setNotice("");

    const em = email.trim().toLowerCase();
    const c = code.trim().toUpperCase();

    if (!c || c.length !== 6) return setErr("Enter the 6-character code.");

    try {
      setLoading(true);
      const res = await verifyResetCode({ email: em, code: c });

      setResetToken(res?.reset_token || "");
      setStep(3);
      setNotice("Code verified. Now set a new password.");
      setP1("");
      setP2("");
    } catch (error) {
      setErr(error?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    setErr("");
    setNotice("");

    const em = email.trim().toLowerCase();

    if (!p1 || !p2) return setErr("Please fill in both password fields.");
    if (p1 !== p2) return setErr("Passwords do not match.");
    if (strength.score < 2) {
      return setErr("Password is too weak. Please make it stronger.");
    }

    try {
      setLoading(true);
      await changePassword({
        email: em,
        reset_token: resetToken,
        password: p1,
      });

      // ✅ tarixni “tozalash”: reset flow'ga back qilolmaydi
      // window.location.replace replace qiladi — browser back bilan qaytolmaydi.
      window.location.replace(
     "/login?notice=" +
    encodeURIComponent("Password updated, Now login with your new password.")
    );
    } catch (error) {
      setErr(error?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  const bars = useMemo(() => {
    // 0 red, 1 red, 2 yellow, 3 green
    const s = strength.score;
    const cls = (idx) => {
      if (s <= 1) return idx <= s ? "bg-red-500" : "bg-gray-100";
      if (s === 2) return idx <= s ? "bg-yellow-500" : "bg-gray-100";
      return idx <= s ? "bg-emerald-500" : "bg-gray-100";
    };
    return [0, 1, 2].map((i) => cls(i));
  }, [strength.score]);

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
            {/* ✅ Overlay Notice */}
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

            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900">
                Forgot Password
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {step === 1 &&
                  "Enter your email to receive a 6-character code."}
                {step === 2 && `Enter the code sent to ${maskEmail(email)}.`}
                {step === 3 && "Set your new password."}
              </p>
            </div>

            {err ? (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                {err}
              </div>
            ) : null}

            {/* STEP 1 */}
            {step === 1 ? (
              <form onSubmit={submitEmail} className="mt-8 space-y-5">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Please wait..." : "Send code"}
                </button>

                <p className="pt-1 text-center text-sm text-gray-600">
                  Remembered?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-gray-900 underline"
                  >
                    Back to login
                  </Link>{" "}
                  <span aria-hidden>↗</span>
                </p>
              </form>
            ) : null}

            {/* STEP 2 */}
            {step === 2 ? (
              <form onSubmit={submitCode} className="mt-8 space-y-5">
                <Input
                  label="6-character code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) =>
                    setCode(
                      e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "")
                        .slice(0, 6)
                    )
                  }
                  placeholder="ABC123"
                  autoComplete="one-time-code"
                  required
                />

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                  <span>
                    Code expires in:{" "}
                    <b
                      className={
                        expiresLeft <= 10 ? "text-red-600" : "text-gray-800"
                      }
                    >
                      {expiresLeft}s
                    </b>
                  </span>
                  <button
                    type="button"
                    onClick={resendCode}
                    disabled={loading || cooldownLeft > 0}
                    className="rounded-lg px-3 py-1.5 font-semibold text-gray-900 underline disabled:opacity-50"
                  >
                    {cooldownLeft > 0
                      ? `Resend in ${cooldownLeft}s`
                      : "Resend code"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Please wait..." : "Verify code"}
                </button>

                <div className="text-center text-sm text-gray-600">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErr("");
                      setNotice("");
                      setCode("");
                      setCooldownLeft(0);
                      setExpiresLeft(0);
                    }}
                    className="font-semibold text-gray-900 underline"
                  >
                    Change email
                  </button>
                </div>
              </form>
            ) : null}

            {/* STEP 3 */}
            {step === 3 ? (
              <form onSubmit={submitNewPassword} className="mt-8 space-y-5">
                <Input
                  label="New password"
                  name="new_password"
                  type={showPass ? "text" : "password"}
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                  placeholder="Enter a new password"
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

                {/* Strength meter */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className={`h-2 flex-1 rounded-full ${bars[0]}`} />
                    <div className={`h-2 flex-1 rounded-full ${bars[1]}`} />
                    <div className={`h-2 flex-1 rounded-full ${bars[2]}`} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-800">
                      {strength.label}
                    </span>
                    <span className="text-gray-500">{strength.hint}</span>
                  </div>
                  {strength.score < 2 ? (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      Password is too weak. Use at least 8+ characters and add
                      numbers.
                    </div>
                  ) : null}
                </div>

                <Input
                  label="Confirm password"
                  name="confirm_password"
                  type={showPass ? "text" : "password"}
                  value={p2}
                  onChange={(e) => setP2(e.target.value)}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Please wait..." : "Change password"}
                </button>
              </form>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
