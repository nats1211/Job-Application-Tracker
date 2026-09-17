import { Status } from "@/types/application";

export const STATUS_STYLES: Record<Status, string> = {
  wishlist: "border-muted-foreground/30 bg-muted text-muted-foreground",
  applied: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  interviewing:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  offer: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300",
  rejected: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
  accepted: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300",
};
