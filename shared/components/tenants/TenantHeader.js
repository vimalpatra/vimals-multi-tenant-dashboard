import Image from "next/image";

export default function TenantHeader({ name, logo, theme }) {
  const { header } = theme;
  return (
    <header className={`${header} p-4 flex items-center space-x-4`}>
      <Image src={logo} alt={name} width={48} height={48} />
      <h1 className="text-xl font-bold">{name}</h1>
    </header>
  );
}
