export default function TenantPage({ params }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome to {params.tenant}’s Dashboard!
      </h1>
      <p>This is where your modules will load.</p>
    </div>
  );
}
