import config from "@/config.json";
import FeatureLoader from "@/shared/components/features/FeatureLoader";
import DashboardWelcome from "@/shared/components/tenants/DashboardWelcome";
import NoFeatures from "@/shared/components/features/NoFeatures";
import enUS from "@shared/locales/en_US.json";

export const metadata = {
  title: enUS.metadata.dashboardTitle,
  description: enUS.metadata.dashboardDescription,
};

export default async function TenantDashboard({ params }) {
  const tenant = params.tenant;
  const tenantConfig = config.tenants[tenant];
  const features = tenantConfig?.features || [];

  return (
    <main className="p-8">
      <DashboardWelcome name={tenant} />
      {features.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureLoader key={feature} feature={feature} />
          ))}
        </div>
      ) : (
        <NoFeatures />
      )}
    </main>
  );
}
