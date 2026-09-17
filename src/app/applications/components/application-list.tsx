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
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Eye,
  Gift,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Send,
  Trash2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/badge";
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
  onAdd: () => void;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}

export function ApplicationList({
  applications,
  isLoading,
  isError,
  error,
  hasSearch,
  onAdd,
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
      <div className="flex min-h-56 flex-col items-center justify-center text-center">
        <BriefcaseBusiness className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">
          {hasSearch ? "No matching applications" : "No applications yet"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasSearch
            ? "Try a different search term."
            : "Add your first application to start tracking it here."}
        </p>
        {!hasSearch && (
          <Button onClick={onAdd} size="sm" className="mt-4">
            Add application
          </Button>
        )}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 hover:bg-muted/50">
          <TableHead className="px-4 py-3">Company</TableHead>
          <TableHead className="px-4 py-3">Position</TableHead>
          <TableHead className="px-4 py-3">Status</TableHead>
          <TableHead className="px-4 py-3">Applied</TableHead>
          <TableHead className="px-4 py-3">Location</TableHead>
          <TableHead className="w-15 px-4 py-3" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => {
          const status = STATUS_CONFIG[application.status];
          const StatusIcon = status.icon;

          return (
            <TableRow
              key={application.id}
              className="h-16 hover:bg-muted/30"
            >
              <TableCell className="px-4 py-3 font-medium">
                {application.jobPostingUrl ? (
                  <a
                    href={application.jobPostingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {application.company}
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                ) : (
                  application.company
                )}
              </TableCell>
              <TableCell className="px-4 py-3">{application.role}</TableCell>
              <TableCell className="px-4 py-3">
                <Badge
                  className={STATUS_STYLES[application.status]}
                  variant="outline"
                >
                  <StatusIcon />
                  {status.label}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3">
                {application.appliedAt
                  ? new Date(application.appliedAt).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell className="px-4 py-3">
                {application.location ?? "-"}
              </TableCell>
              <TableCell className="px-4 py-3">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="h-8 w-8" />
                    }
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      disabled={!application.jobPostingUrl}
                      onClick={() => {
                        if (application.jobPostingUrl) {
                          window.open(
                            application.jobPostingUrl,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }
                      }}
                    >
                      <Eye />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(application)}>
                      <Pencil />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete(application)}
                    >
                      <Trash2 />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const STATUS_CONFIG = {
  wishlist: { label: "Wishlist", icon: BriefcaseBusiness },
  applied: { label: "In Review", icon: Send },
  interviewing: { label: "Interview", icon: MessageSquare },
  offer: { label: "Offer", icon: Gift },
  rejected: { label: "Rejected", icon: XCircle },
  accepted: { label: "Accepted", icon: CheckCircle2 },
} as const;
