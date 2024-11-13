import * as z from "zod";
export const AssignTaxCodeValidator = z.object({
  taxCodeId: z.string(),
});
export type AssignTaxCode = z.infer<typeof AssignTaxCodeValidator>;
