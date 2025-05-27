import config from "@/config.json";
import FeatureLoader from "@components/FeatureLoader";
import DashboardWelcome from "@/shared/components/tenants/DashboardWelcome";
import NoFeatures from "@/shared/components/tenants/NoFeatures";

export default async function TenantPage({ params }) {
  const tenantKey = (await params).tenant;
  const tenant = config.tenants[tenantKey];
  const features = tenant?.features || [];

  return (
    <main className="p-8">
      <DashboardWelcome name={tenant.name} />
      {features.map((f) => (
        <FeatureLoader key={f} feature={f} />
      ))}

      {!features.length && <NoFeatures />}
    </main>
  );
}
