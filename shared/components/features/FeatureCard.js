export default function FeatureCard({ children, className = "" }) {
  return (
    <section
      className={`mb-3 p-6 bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {children}
    </section>
  );
}
