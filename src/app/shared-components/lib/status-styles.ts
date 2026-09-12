import { Status } from "@/types/application";

export const STATUS_STYLES: Record<Status, string> = {
  wishlist: "bg-muted text-muted-foreground",
  applied: "bg-blue-100 text-blue-800",
  interviewing: "bg-amber-100 text-amber-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  accepted: "bg-zinc-200 text-zinc-700",
};
