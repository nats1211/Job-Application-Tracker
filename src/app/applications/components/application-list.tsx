"use client";

import { Skeleton } from "@/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Application } from "@/types/application";
import {
  Badge,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { STATUS_STYLES } from "../../shared-components/lib/status-styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Button } from "@/components/button";

interface ApplicationListProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  hasSearch: boolean;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}

export function ApplicationList({
  applications,
  isLoading,
  isError,
  error,
  hasSearch,
  onEdit,
  onDelete,
}: ApplicationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        Couldnt load application
        {error instanceof Error ? `: ${error.message}` : "."}
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border border-dashed py-16 text-center">
        <p className="text-sm font-medium">
          {hasSearch ? "No matching applications" : "No applications yet"}
        </p>
        <p className="text-sm text-muted-foreground">
          {hasSearch
            ? "Try a different search term."
            : "Add your first application to start tracking it here."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-15" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">
                {application.jobPostingUrl ? (
                  <a
                    href={application.jobPostingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {application.company}
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </a>
                ) : (
                  application.company
                )}
              </TableCell>
              <TableCell>{application.role}</TableCell>
              <TableCell>
                <Badge
                  className={STATUS_STYLES[application.status]}
                  fontVariant="secondary"
                >
                  {application.status}
                </Badge>
              </TableCell>
              <TableCell>
                {application.appliedAt
                  ? new Date(application.appliedAt).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell>{application.location ?? "-"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="h-8 w-8" />
                    }
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(application)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(application)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
