import config from "@/config.json";
import FeatureLoader from "@components/FeatureLoader";

export default async function TenantPage({ params }) {
  const tenantKey = (await params).tenant;
  const tenant = config.tenants[tenantKey];
  const features = tenant?.features || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome to {tenant.name}’s Dashboard!
      </h1>
      {features.map((f) => (
        <FeatureLoader key={f} feature={f} />
      ))}

      {features.length === 0 && (
        <p className="italic text-gray-500">No features to display.</p>
      )}
    </div>
  );
}
