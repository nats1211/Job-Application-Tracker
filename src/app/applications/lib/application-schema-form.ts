import { ALL_STATUSES } from "@/types/application";
import { z } from "zod";

export const applicationFormSchema = z.object({
  company: z.string().min(1, "Company is required").max(255),
  role: z.string().min(1, "Role is required").max(255),
  status: z.enum(ALL_STATUSES),
  jobPostingUrl: z.string().min(1, "Job posting URL is required").max(255),
  location: z.string().max(255).optional(),
  salary: z.number().int().nonnegative().optional(),
  notes: z.string().max(255).optional(),
  appliedAt: z.string().optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export const defaultApplicationFormValues: ApplicationFormValues = {
  company: "",
  role: "",
  status: "applied",
  jobPostingUrl: "",
  location: "",
  salary: undefined,
  notes: "",
  appliedAt: "",
};
