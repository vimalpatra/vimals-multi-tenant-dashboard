"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config.json";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Select } from "@shared/ui/Select";
import { Toast } from "@shared/ui/Toast";
import { Users, User, Lock } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const tenants = Object.keys(config.tenants);
  const [tenant, setTenant] = useState(tenants[0] || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ tenant, username, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setSuccess("Login successful! Redirecting…");
      setTimeout(() => {
        router.push(`/${tenant}`);
      }, 800);
    } else {
      setError(data.error || "Invalid credentials");
    }
  }

  return (
    <>
      {success && <Toast message={success} onClose={() => setSuccess("")} />}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold">Tenant Login</h2>

        <Select
          label="Tenant"
          icon={Users}
          options={tenants.map((t) => ({
            value: t,
            label: config.tenants[t].name,
          }))}
          value={tenant}
          onChange={(e) => setTenant(e.target.value)}
        />

        <Input
          label="Username"
          icon={User}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <Input
          label="Password"
          icon={Lock}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </>
  );
}
