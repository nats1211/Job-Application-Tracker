import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#4F46E5",
            colorBackground: "#FFFFFF",
            borderRadius: "10px",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "14px",
          },
          elements: {
            card: "shadow-sm border border-[#E4E4E0]",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton:
              "border border-[#E4E4E0] hover:bg-zinc-50 transition-colors",
            formButtonPrimary:
              "bg-indigo-600 hover:bg-indigo-700 transition-colors",
            footerActionLink: "text-indigo-600 hover:text-indigo-700",
          },
        }}
      />
    </main>
  );
}
