"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Plus, Search } from "lucide-react";

interface ApplicationToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export function ApplicationToolbar({
  search,
  onSearchChange,
  onAddClick,
}: ApplicationToolbarProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search company or position..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Button onClick={onAddClick} className="shrink-0">
        <Plus className="mr-2 h-4 w-4" /> New Application
      </Button>
    </div>
  );
}
