export function Select({ label, options = [], ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <select
        className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}
