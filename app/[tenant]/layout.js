import config from "@/config.json";
import "@/app/globals.css";
import TenantDetails from "@/components/TenantDetails";
import Image from "next/image";

export default async function TenantLayout({ children, params }) {
  const tenant = (await params).tenant;
  const tenantConfig = config.tenants[tenant];

  if (!tenantConfig) {
    return <h1 className="p-8 text-xl">❌ Tenant “{tenant}” not found</h1>;
  }

  const { name, logo, theme } = tenantConfig;
  const { background, text, header } = theme;

  return (
    <html lang="en">
      <body className={`${background} ${text} min-h-screen`}>
        <header className={`${header} p-4 flex items-center space-x-4`}>
          <Image src={logo} alt={name} width={48} height={48} />
          <h1 className="text-xl font-bold">{name}</h1>
        </header>

        <TenantDetails config={tenantConfig} />

        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
