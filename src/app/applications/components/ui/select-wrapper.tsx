"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { cn } from "cn";

export interface selectOption {
  label: string;
  value: string;
}

interface SelectWrapperProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: selectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export function SelectWrapper({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
  disabled,
  id,
}: SelectWrapperProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value !== null) onValueChange?.(value);
      }}
      disabled={disabled}
    >
      <SelectTrigger id={id} className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((options) => (
          <SelectItem key={options.value} value={options.value}>
            {options.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
