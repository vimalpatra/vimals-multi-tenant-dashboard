export function Toast({ message, onClose }) {
  return (
    <div className="fixed top-4 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">
      <span className="text-xl">{message}</span>
      <button onClick={onClose} className="ml-2 font-bold">
        ×
      </button>
    </div>
  );
}
