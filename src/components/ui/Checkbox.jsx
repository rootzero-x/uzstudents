export default function Checkbox({ checked, onChange, children, required }) {
  return (
    <label className="flex items-start gap-3 text-sm text-gray-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-200"
      />
      <span className="leading-5">{children}</span>
    </label>
  );
}
