import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootPage() {
  await auth.protect();

  redirect("/applications");
}
