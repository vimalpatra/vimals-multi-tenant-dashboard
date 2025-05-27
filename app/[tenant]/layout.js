import config from "@/config.json";
import "@/app/globals.css";
import TenantHeader from "@/shared/components/tenants/TenantHeader";
import TenantDetails from "@/shared/components/tenants/TenantDetails";
import enUS from "@shared/locales/en_US.json";

export default async function TenantLayout({ children, params }) {
  const tenant = (await params).tenant;
  const tenantConfig = config.tenants[tenant];

  if (!tenantConfig) {
    const notFoundMessage = enUS.tenant.notFoundMessage.replace(
      "{{tenant}}",
      tenant
    );
    return <h1 className="p-8 text-xl">{notFoundMessage}</h1>;
  }

  const { name, logo, theme } = tenantConfig;
  const { background, text } = theme;

  return (
    <div className={`${background} ${text} min-h-screen flex flex-col`}>
      <TenantHeader name={name} logo={logo} theme={theme} />
      <TenantDetails config={tenantConfig} />
      {children}
    </div>
  );
}
