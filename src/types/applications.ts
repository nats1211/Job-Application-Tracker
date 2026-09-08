export type Status =
  | "Wishlist"
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Accepted";

export const ALL_STATUSES: Status[] = [
  "Wishlist",
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
  "Accepted",
];

export interface Application {
  id: string;
  company: string;
  role: string;
  status: Status;
  jobPostingUrl: string;
  location: string;
  salary: string;
  notes: string;
  appliedAt: string;
  createdAt: number;
}

export type NewApplicationInput = Pick<
  Application,
  "company" | "role" | "status"
>;
