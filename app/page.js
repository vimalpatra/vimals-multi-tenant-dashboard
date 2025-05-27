import LoginForm from "@shared/components/LoginForm";
import enUS from "@shared/locales/en_US.json";

export const revalidate = 3600;

export const metadata = {
  title: enUS.metadata.loginTitle,
  description: enUS.metadata.loginDescription,
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}
