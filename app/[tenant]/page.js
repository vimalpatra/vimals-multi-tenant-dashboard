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

  return (
    <main className="p-8">
      <DashboardWelcome name={tenant} />
      {config.tenants[tenant]?.features?.length > 0 ? (
        <FeatureLoader tenant={tenant} />
      ) : (
        <NoFeatures />
      )}
    </main>
  );
}
