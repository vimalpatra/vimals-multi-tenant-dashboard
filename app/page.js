import LoginForm from "@shared/components/LoginForm";

export const revalidate = 3600;

export const metadata = {
  title: "Login - Multi-Tenant Dashboard",
  description: "Login for tenants",
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}
