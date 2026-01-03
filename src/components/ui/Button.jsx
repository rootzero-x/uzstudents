export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  return (
    <Comp className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
