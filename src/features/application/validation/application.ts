import { ALL_STATUSES } from "@/types/application";
import z from "zod";

export const createApplicationInputSchema = z.object({
  company: z.string().trim().min(1).max(255),
  role: z.string().trim().min(1).max(255),
  status: z.enum(ALL_STATUSES),
  jobPostingUrl: z.string().trim().min(1).max(255).nullable().optional(),
  location: z.string().trim().max(255).nullable().optional(),
  salary: z.number().int().nonnegative().nullable().optional(),
  notes: z.string().max(255).nullable().optional(),
  appliedAt: z.coerce.date().nullable().optional(),
});
