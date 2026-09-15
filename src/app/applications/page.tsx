import { ApplicationsClient } from "./applications-client";

export default function ApplicationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          Track and manage your job applications.
        </p>
      </div>
      <ApplicationsClient />
    </div>
  );
}
