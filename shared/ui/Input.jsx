export function Input({ label, icon: Icon, ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
            <Icon size={16} />
          </span>
        )}
        <input
          className={`w-full border rounded py-2 px-3 
               ${Icon ? "pl-8" : "pl-3"} focus:outline-none focus:ring-2`}
          {...props}
        />
      </div>
    </div>
  );
}
