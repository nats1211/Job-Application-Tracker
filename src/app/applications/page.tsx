import { ApplicationsClient } from "./applications-client";

export default function ApplicationPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your job applications.
        </p>
      </div>
      <ApplicationsClient />
    </div>
  );
}
