import config from "@/config.json";
import FeatureLoader from "@/shared/components/features/FeatureLoader";
import DashboardWelcome from "@/shared/components/tenants/DashboardWelcome";
import NoFeatures from "@/shared/components/features/NoFeatures";

export const metadata = {
  title: "Tenant Dashboard",
  description: "Multi-tenant dashboard with features",
};

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
