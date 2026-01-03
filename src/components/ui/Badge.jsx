export default function Badge({ className = "", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 ${className}`}
    >
      {children}
    </span>
  );
}
