"use client";

import { ALL_STATUSES, Status } from "@/types/application";
import { selectCls, SelectWrapper } from "./ui/select-wrapper";

interface ApplicationToolbarProps {
  count: number;
  isLoading: boolean;
  status: Status | "All";
  onStatusChange: (status: Status | "All") => void;
}

export function ApplicationToolbar({
  count,
  isLoading,
  status,
  onStatusChange,
}: ApplicationToolbarProps) {
  const label = count === 1 ? "application" : "applications";

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-zinc-400 font-medium">
        {isLoading ? "Loading..." : `${count} ${label}`}
      </span>

      <SelectWrapper className="w-40">
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as Status | "All")
          }
          className={`${selectCls} w-full text-xs`}
        >
          <option value="All">All Statuses</option>
          {ALL_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </SelectWrapper>
    </div>
  );
}
