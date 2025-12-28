export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 px-4">
      <div className="max-w-2xl w-full text-center bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/20">
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <span className="text-sm uppercase tracking-widest text-white/80">
            Coming soon
          </span>
        </div>

        {/* Brand */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Uzstudents
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
          Masofaviy o‘quv platformasi
          <br className="hidden sm:block" />
          <span className="text-white/70">
            Zamonaviy bilimlar — har kim uchun, har joyda
          </span>
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-white/20 mb-8"></div>

        {/* Description */}
        <p className="text-white/80 text-base">
          Platforma ustida ish olib borilmoqda.
          <br />
          Yaqin orada ishga tushadi.
        </p>

        {/* Footer */}
        <div className="mt-10 text-sm text-white/60">
          © {new Date().getFullYear()} Uzstudents. All rights reserved.
        </div>
      </div>
    </div>
  );
}
