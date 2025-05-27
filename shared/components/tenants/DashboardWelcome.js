import enUS from "@shared/locales/en_US.json";

export default function DashboardWelcome({ name }) {
  const welcomeMessage = enUS.dashboard.welcome.replace("{{name}}", name);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{welcomeMessage}</h1>
    </div>
  );
}
