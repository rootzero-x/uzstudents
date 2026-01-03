export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rightSlot,
  name,
  autoComplete,
  inputMode,
  pattern,
  required,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-900">
        {label}
      </span>

      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          pattern={pattern}
          required={required}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
        {rightSlot ? (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightSlot}
          </div>
        ) : null}
      </div>
    </label>
  );
}
