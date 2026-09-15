import { auth } from "@clerk/nextjs/server";

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
