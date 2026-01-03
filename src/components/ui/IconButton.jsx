export default function IconButton({ className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
