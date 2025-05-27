"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@shared/ui/Button";

export default function TenantHeader({ name, logo, theme }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  }

  const { header } = theme;
  return (
    <header
      className={`${header} p-4 flex justify-between items-center space-x-4`}
    >
      <div className="flex items-center space-x-4">
        <Image src={logo} alt={name} width={48} height={48} />
        <h1 className="text-xl font-bold">{name}</h1>
      </div>
      <Button
        onClick={handleLogout}
        className="cursor-pointer bg-red-600 hover:bg-red-700"
      >
        Logout
      </Button>
    </header>
  );
}
