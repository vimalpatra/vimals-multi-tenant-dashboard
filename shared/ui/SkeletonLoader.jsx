export function SkeletonLoader({ className = "" }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}
