export function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 
           text-white font-semibold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
}
