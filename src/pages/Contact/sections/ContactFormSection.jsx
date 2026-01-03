import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  Instagram,
  Send,
  Bot,
  CheckCircle2,
  ShieldAlert,
  X,
} from "lucide-react";
import { contactInfo } from "../data/contactData";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

const inputBase =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100";

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <p className="text-[13px] font-semibold text-gray-800">{label}</p>
      {children}
    </div>
  );
}

/** Premium interactive card */
function InfoCard({ icon: Icon, title, text, href, target, rel, onlyMobile }) {
  const isClickable = !!href;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-lg bg-gray-50">
        <Icon className="h-5 w-5 text-gray-700" />
      </div>

      {title ? (
        <p className="mb-1 text-[12px] font-semibold text-gray-900/70">
          {title}
        </p>
      ) : null}

      {!isClickable ? (
        <p className="text-[14px] text-gray-700">{text}</p>
      ) : (
        <>
          <a
            href={href}
            target={target}
            rel={rel}
            className={[
              "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2",
              "text-[14px] font-semibold text-gray-800 transition",
              "hover:bg-gray-50 hover:text-gray-900",
              "focus:outline-none focus:ring-4 focus:ring-orange-100",
              onlyMobile ? "md:hidden" : "",
            ].join(" ")}
          >
            {text}
          </a>

          {/* Desktopda phone klik bo‘lmasin (talabingiz) */}
          {onlyMobile ? (
            <p className="mt-2 hidden text-[13px] text-gray-600 md:block">
              {text}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}

/** Premium toast (no emojis) */
function PremiumToast({ type = "success", title, message, onClose }) {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className={[
        "pointer-events-auto w-full max-w-[520px] overflow-hidden rounded-2xl border",
        "bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
        isSuccess ? "border-emerald-200" : "border-red-200",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <div
          className={[
            "mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl",
            isSuccess ? "bg-emerald-50" : "bg-red-50",
          ].join(" ")}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          ) : (
            <ShieldAlert className="h-5 w-5 text-red-600" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-[14px] font-extrabold text-gray-900">{title}</p>
          <p className="mt-1 text-[13px] font-medium leading-5 text-gray-600">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-orange-100"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Premium gradient progress bar */}
      <div className="h-1 w-full bg-gray-100">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 4.0, ease: "linear" }}
          className={[
            "h-full",
            isSuccess
              ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-orange-400"
              : "bg-gradient-to-r from-red-500 via-red-400 to-orange-400",
          ].join(" ")}
        />
      </div>
    </motion.div>
  );
}

export default function ContactFormSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    ok: false,
    error: "",
  });

  const [toast, setToast] = useState(null);

  const canSend = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const phoneOk = /^\d{7,15}$/.test(form.phone.trim()); // only digits
    const minMsg = form.message.trim().length >= 10;

    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      emailOk &&
      phoneOk &&
      form.subject.trim() &&
      minMsg
    );
  }, [form]);

  function sanitizeText(v) {
    // React already escapes text, but we still normalize and strip control chars
    return String(v ?? "")
      .replace(/[\u0000-\u001F\u007F]/g, "")
      .trim();
  }

  function onChange(e) {
    const { name, value } = e.target;
    setStatus({ loading: false, ok: false, error: "" });

    // phone: digits only
    if (name === "phone") {
      const digitsOnly = value.replace(/[^\d]/g, "");
      setForm((p) => ({ ...p, phone: digitsOnly }));
      return;
    }

    setForm((p) => ({ ...p, [name]: sanitizeText(value) }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSend || status.loading) return;

    try {
      setStatus({ loading: true, ok: false, error: "" });
      setToast(null);

      const payload = {
        firstName: sanitizeText(form.firstName),
        lastName: sanitizeText(form.lastName),
        email: sanitizeText(form.email),
        phone: sanitizeText(form.phone),
        subject: sanitizeText(form.subject),
        message: sanitizeText(form.message),
      };

      const res = await fetch(`${API_BASE}/api/contact/contact.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.message || "Something went wrong. Please try again."
        );
      }

      setStatus({ loading: false, ok: true, error: "" });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setToast({
        type: "success",
        title: "Sent successfully",
        message:
          "Your message has been delivered. Our team will get back to you shortly.",
      });

      // auto-close toast
      setTimeout(() => setToast(null), 4200);
    } catch (err) {
      setStatus({
        loading: false,
        ok: false,
        error: err.message || "Failed to send.",
      });

      setToast({
        type: "error",
        title: "Send failed",
        message:
          err.message || "We couldn’t deliver your message. Please try again.",
      });

      setTimeout(() => setToast(null), 5200);
    }
  }

  // ✅ Requirements data (your exact values)
  const EMAIL = "uzstudents.official@gmail.com";
  const PHONE_DISPLAY = "+998 88 205 85 08";
  const PHONE_DIAL = "+998882058508";
  const MAPS_URL = "https://maps.app.goo.gl/8NaWGHR4UpTZoauKA";

  return (
    <section className="relative w-full bg-gray-50">
      {/* Premium Toast host (top-center) */}
      <div className="pointer-events-none fixed left-1/2 top-4 z-[9999] w-full -translate-x-1/2 px-4 sm:top-6">
        <AnimatePresence>
          {toast ? (
            <div className="mx-auto flex w-full max-w-[1200px] justify-center">
              <PremiumToast
                type={toast.type}
                title={toast.title}
                message={toast.message}
                onClose={() => setToast(null)}
              />
            </div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-gray-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px]">
            {/* LEFT: FORM */}
            <div className="p-6 sm:p-10 lg:p-12">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field label="First Name">
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={onChange}
                      className={inputBase}
                      placeholder="Enter First Name"
                      autoComplete="given-name"
                      required
                      maxLength={60}
                      inputMode="text"
                    />
                  </Field>

                  <Field label="Last Name">
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={onChange}
                      className={inputBase}
                      placeholder="Enter Last Name"
                      autoComplete="family-name"
                      required
                      maxLength={60}
                      inputMode="text"
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className={inputBase}
                      placeholder="Enter your Email"
                      autoComplete="email"
                      required
                      inputMode="email"
                      type="email"
                      maxLength={120}
                    />
                  </Field>

                  <Field label="Phone">
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className={inputBase}
                      placeholder="Enter Phone Number"
                      autoComplete="tel"
                      required
                      inputMode="numeric"
                      pattern="^\d{7,15}$"
                      maxLength={15}
                    />
                    <p className="text-[12px] font-medium text-gray-500">
                      Digits only (7–15).
                    </p>
                  </Field>
                </div>

                <Field label="Subject">
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="Enter your Subject"
                    required
                    maxLength={120}
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    className={`${inputBase} min-h-[140px] resize-none`}
                    placeholder="Enter your Message here..."
                    required
                    minLength={10}
                    maxLength={4000}
                  />
                </Field>

                <div className="pt-2">
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={!canSend || status.loading}
                      className={[
                        "inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-8 py-3 text-[13px] font-semibold text-white",
                        "shadow-[0_10px_22px_rgba(249,115,22,0.18)] transition",
                        "hover:bg-orange-600 active:scale-[0.99]",
                        "disabled:cursor-not-allowed disabled:opacity-60",
                      ].join(" ")}
                    >
                      {status.loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Your Message"
                      )}
                    </button>
                  </div>

                  {/* Keep inline fallback text (optional), toast already premium */}
                  <div className="mt-4 text-center">
                    {status.error && (
                      <p className="text-[13px] font-medium text-red-600">
                        {status.error}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* RIGHT: INFO */}
            <div className="border-t border-gray-100 p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="space-y-6">
                {/* 1) EMAIL: opens mail app */}
                <InfoCard
                  icon={Mail}
                  title="Email"
                  text={EMAIL}
                  href={`mailto:${EMAIL}`}
                />

                {/* 2) PHONE: only mobile tap-to-call */}
                <InfoCard
                  icon={Phone}
                  title="Phone"
                  text={PHONE_DISPLAY}
                  href={`tel:${PHONE_DIAL}`}
                  onlyMobile
                />

                {/* 3) LOCATION: opens maps */}
                <InfoCard
                  icon={MapPin}
                  title="Location"
                  text="Surkhandarya, Uzbekistan"
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                />

                {/* Socials (kept your design) */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                  <div className="mx-auto mb-3 flex items-center justify-center gap-3">
                    <a
                      className="grid h-10 w-10 place-items-center rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-100"
                      href={contactInfo.socials[0].href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5 text-gray-700" />
                    </a>
                    <a
                      className="grid h-10 w-10 place-items-center rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-100"
                      href={contactInfo.socials[1].href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Telegram"
                    >
                      <Send className="h-5 w-5 text-gray-700" />
                    </a>
                    <a
                      className="grid h-10 w-10 place-items-center rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-100"
                      href={contactInfo.socials[2].href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Bot"
                    >
                      <Bot className="h-5 w-5 text-gray-700" />
                    </a>
                  </div>
                  <p className="text-[14px] font-semibold text-gray-800">
                    Social Profiles
                  </p>
                  <p className="mt-1 text-[12px] font-medium text-gray-500">
                    Stay connected with UzStudents.
                  </p>
                </div>

                {/* Security hint (subtle) */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-[12px] font-semibold text-gray-800">
                    Security
                  </p>
                  <p className="mt-1 text-[12px] font-medium text-gray-600">
                    Inputs are validated and protected. Phone accepts digits only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
