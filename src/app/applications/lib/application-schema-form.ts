import { ALL_STATUSES } from "@/types/application";
import { z } from "zod";

const emptyToUndefined = (val: unknown) =>
  val === "" || val == null ? undefined : val;

export const applicationFormSchema = z.object({
  company: z.string().min(1, "Company is required").max(255),
  role: z.string().min(1, "Role is required").max(255),
  status: z.enum(ALL_STATUSES),
  jobPostingUrl: z.string().min(1, "Job posting URL is required").max(255),
  location: z.string().max(255).optional(),
  salary: z.preprocess(emptyToUndefined, z.coerce.number().int().nonnegative()),
  notes: z.string().max(255).optional(),
  appliedAt: z.preprocess(emptyToUndefined, z.coerce.date()),
});

// What the form HOLDS — all strings, matching the <Input> elements
export type ApplicationFormInput = z.input<typeof applicationFormSchema>;
// What onSubmit RECEIVES after coercion — salary: number, appliedAt: Date
export type ApplicationFormOutput = z.output<typeof applicationFormSchema>;

export const defaultApplicationFormValues: ApplicationFormInput = {
  company: "",
  role: "",
  status: "applied",
  jobPostingUrl: "",
  location: "",
  salary: 0,
  notes: "",
  appliedAt: new Date(),
};
