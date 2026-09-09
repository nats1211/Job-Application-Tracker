import { Status } from "Types/application";

export const STATUS_STYLES: Record<Status, { pill: string; dot: string }> = {
  wishlist: { pill: "bg-zinc-100 text-zinc-500", dot: "bg-zinc-400" },
  applied: { pill: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  interviewing: { pill: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  offer: { pill: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  rejected: { pill: "bg-red-50 text-red-500", dot: "bg-red-400" },
  accepted: { pill: "bg-zinc-100 text-zinc-400", dot: "bg-zinc-300" },
};
