"use client";

import { Application } from "@/types/application";
import { useMemo, useState } from "react";
import { useApplicationQuery } from "./hooks/use-applications-query";
import { ApplicationToolbar } from "./components/application-toolbar";
import { ApplicationList } from "./components/application-list";
import { ApplicationFormDialog } from "./components/application-form-dialog";
import { DeleteApplicationDialog } from "./components/delete-application-dialog";
import { Card, CardContent, CardHeader } from "@/components/card";

export function ApplicationsClient() {
  const [search, setSearch] = useState<string>("");
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] = useState<
    Application | undefined
  >(undefined);

  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useApplicationQuery();

  const filteredApplications = useMemo(() => {
    if (!applications) return applications;

    const q = search.trim().toLowerCase();
    if (!q) return applications;

    return applications.filter(
      (application) =>
        application.company.toLowerCase().includes(q) ||
        application.role?.toLowerCase().includes(q),
    );
  }, [applications, search]);

  const handleAdd = () => {
    setSelectedApplication(undefined);
    setFormOpen(true);
  };

  const handleEdit = (application: Application) => {
    setSelectedApplication(application);
    setFormOpen(true);
  };

  const handleDelete = (application: Application) => {
    setSelectedApplication(application);
    setDeleteOpen(true);
  };

  return (
    <div>
      <Card className="gap-0">
        <CardHeader className="flex grid-rows-none flex-row items-center justify-between gap-4">
          <ApplicationToolbar
            search={search}
            onSearchChange={setSearch}
            onAddClick={handleAdd}
          />
        </CardHeader>
        <CardContent className="pt-0">
          <ApplicationList
            applications={filteredApplications}
            isLoading={isLoading}
            isError={isError}
            error={error}
            hasSearch={search.trim().length > 0}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <ApplicationFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        application={selectedApplication}
      />

      <DeleteApplicationDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        application={selectedApplication}
      />
    </div>
  );
}
