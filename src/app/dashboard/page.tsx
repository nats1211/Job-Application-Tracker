import { Show, SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  await auth.protect();

  return (
    <Show when="signed-in">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <SignOutButton>Log Out</SignOutButton>
      </div>
    </Show>
  );
}
