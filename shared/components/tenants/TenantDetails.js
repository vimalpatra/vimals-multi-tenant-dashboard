import React from "react";
import enUS from "@shared/locales/en_US.json";

export default function TenantDetails({ config }) {
  const { lease, address, subscriptionPlan, supportLevel } = config;

  return (
    <section className="my-6 p-4 border rounded bg-white-100">
      <h2 className="text-lg font-semibold mb-2">{enUS.tenant.infoTitle}</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>
          <strong>{enUS.tenant.lease}:</strong> {lease.startDate} -{" "}
          {lease.endDate}
        </li>
        <li>
          <strong>{enUS.tenant.address}:</strong> {address.street},{" "}
          {address.city}, {address.state} {address.zip}, {address.country}
        </li>
        <li>
          <strong>{enUS.tenant.plan}:</strong> {subscriptionPlan}
        </li>
        <li>
          <strong>{enUS.tenant.support}:</strong> {supportLevel}
        </li>
      </ul>
    </section>
  );
}
