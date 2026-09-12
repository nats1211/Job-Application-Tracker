"use client";

import { getApplicationsAction } from "@/features/application/actions/application";
import { useQuery } from "@tanstack/react-query";
import { applicationKeys } from "../lib/query-keys";

export function useApplicationQuery() {
  return useQuery({
    queryKey: applicationKeys.lists(),
    queryFn: () => getApplicationsAction(),
  });
}
