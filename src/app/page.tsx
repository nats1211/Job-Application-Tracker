import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <Link href="./sign-in">Sign In</Link>
    </main>
  );
}
