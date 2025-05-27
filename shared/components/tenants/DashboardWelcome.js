export default function DashboardWelcome({ name }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome to {name}’s Dashboard!
      </h1>
      <p>This is where your modules will load.</p>
    </div>
  );
}
