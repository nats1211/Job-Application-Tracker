import { Application, Status } from "@/types/application";
import { useMemo, useState } from "react";

const PAGE_SIZE = 8;

export function useApplicationFilters(application: Application[]) {
  const [status, setStatus] = useState<Status | "All">("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filterApplications = useMemo(() => {
    if (status === "All") {
      return application;
    }

    return application.filter((application) => application.status === status);
  }, [application, status]);

  const visibleApplications = filterApplications.slice(0, visibleCount);

  const hasMore = visibleCount < filterApplications.length;

  const remainingCount = Math.max(filterApplications.length - visibleCount, 0);

  const changeStatus = (newStatus: Status | "All") => {
    setStatus(newStatus);
    setVisibleCount(PAGE_SIZE);
  };

  const loadMore = () => {
    setVisibleCount((current) => current + PAGE_SIZE);
  };

  return {
    status,
    visibleApplications,
    filteredCount: filterApplications.length,
    hasMore,
    remainingCount,
    changeStatus,
    loadMore,
  };
}
