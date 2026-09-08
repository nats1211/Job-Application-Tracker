import { SignOutButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <SignOutButton>
        <button>Log Out</button>
      </SignOutButton>
    </>
  );
}
