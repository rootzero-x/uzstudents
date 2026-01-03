import { Mail, Phone, MapPin } from "lucide-react";

const safeExternalProps = { target: "_blank", rel: "noopener noreferrer" };

export default function CourseOpenFooter({ footer }) {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* left */}
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white font-black">
              U
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="opacity-70" />
                <a className="hover:text-gray-900" href={`mailto:${footer.email}`}>
                  {footer.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="opacity-70" />
                <a className="hover:text-gray-900" href={`tel:${footer.phone.replace(/\s/g, "")}`}>
                  {footer.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="opacity-70" />
                <span>{footer.location}</span>
              </div>
            </div>
          </div>

          {/* middle links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm font-bold text-gray-900">Home</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                {footer.links.home.map((t) => (
                  <li key={t} className="hover:text-gray-900 cursor-pointer">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-bold text-gray-900">About Us</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                {footer.links.about.map((t) => (
                  <li key={t} className="hover:text-gray-900 cursor-pointer">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* right socials */}
          <div>
            <div className="text-sm font-bold text-gray-900">Social Profiles</div>
            <div className="mt-4 flex items-center gap-3">
              <a
                {...safeExternalProps}
                href="https://facebook.com"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                {...safeExternalProps}
                href="https://x.com"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100"
                aria-label="Twitter/X"
              >
                x
              </a>
              <a
                {...safeExternalProps}
                href="https://linkedin.com"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-gray-100" />
        <div className="pt-6 text-center text-xs text-gray-400">{footer.copyright}</div>
      </div>
    </footer>
  );
}
