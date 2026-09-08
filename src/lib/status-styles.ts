import { Status } from "Types/applications";

export const STATUS_STYLES: Record<Status, { pill: string; dot: string }> = {
  Wishlist: { pill: "bg-zinc-100 text-zinc-500", dot: "bg-zinc-400" },
  Applied: { pill: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  Interviewing: { pill: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  Offer: { pill: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  Rejected: { pill: "bg-red-50 text-red-500", dot: "bg-red-400" },
  Accepted: { pill: "bg-zinc-100 text-zinc-400", dot: "bg-zinc-300" },
};
