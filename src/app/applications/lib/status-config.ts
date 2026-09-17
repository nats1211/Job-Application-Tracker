import {
  BriefcaseBusiness,
  CheckCircle2,
  Gift,
  MessageSquare,
  Send,
  XCircle,
} from "lucide-react";

export const STATUS_CONFIG = {
  wishlist: { label: "Wishlist", icon: BriefcaseBusiness },
  applied: { label: "In Review", icon: Send },
  interviewing: { label: "Interview", icon: MessageSquare },
  offer: { label: "Offer", icon: Gift },
  rejected: { label: "Rejected", icon: XCircle },
  accepted: { label: "Accepted", icon: CheckCircle2 },
} as const;
