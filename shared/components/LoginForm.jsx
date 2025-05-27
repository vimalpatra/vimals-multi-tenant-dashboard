"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config.json";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Select } from "@shared/ui/Select";
import { Toast } from "@shared/ui/Toast";
import { Users, User, Lock } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/constants";
import enUS from "@shared/locales/en_US.json";

export default function LoginForm() {
  const router = useRouter();
  const tenants = Object.keys(config.tenants);
  const [tenant, setTenant] = useState(tenants[0] || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ tenant, username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(enUS.login.success);
        setTimeout(() => router.push(`/${tenant}`), 1000);
      } else {
        setError(data.error || enUS.login.invalidCredentials);
      }
    } catch (err) {
      setError(enUS.login.genericError);
    }
  };

  return (
    <>
      {success && <Toast message={success} onClose={() => setSuccess("")} />}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold">{enUS.login.title}</h2>

        <Select
          label={enUS.login.tenantLabel}
          icon={Users}
          options={tenants.map((t) => ({
            value: t,
            label: config.tenants[t].name,
          }))}
          value={tenant}
          onChange={(e) => setTenant(e.target.value)}
        />

        <Input
          label={enUS.login.usernameLabel}
          icon={User}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={enUS.login.usernamePlaceholder}
          required
        />

        <Input
          label={enUS.login.passwordLabel}
          icon={Lock}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={enUS.login.passwordPlaceholder}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full">
          {enUS.login.loginButton}
        </Button>
      </form>
    </>
  );
}
